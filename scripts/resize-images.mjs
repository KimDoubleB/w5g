// One-shot image resizer for the wedding card.
// - Hero: max long side 2000, JPG q=82
// - Gallery: max long side 1600, JPG q=80
// Reads from `public/img/{main,gallery}/*.jpg`, overwrites in place.
// Original files are backed up under `public/img/_original/` on first run.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public/img');
const BACKUP_DIR = path.join(ROOT, '_original');

const TARGETS = [
  { dir: path.join(ROOT, 'main'), longSide: 2000, quality: 82 },
  { dir: path.join(ROOT, 'gallery'), longSide: 1600, quality: 80 },
];

async function ensureBackup(filePath, relPath) {
  const dest = path.join(BACKUP_DIR, relPath);
  try {
    await fs.access(dest);
    return false; // already backed up; original preserved
  } catch {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(filePath, dest);
    return true;
  }
}

async function processDir({ dir, longSide, quality }) {
  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch {
    console.warn(`skip: ${dir} not found`);
    return;
  }
  const files = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const rel = path.relative(ROOT, filePath);
    await ensureBackup(filePath, rel);

    const buf = await fs.readFile(filePath);
    const meta = await sharp(buf).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const longest = Math.max(w, h);
    const sizeBefore = buf.length;

    if (longest <= longSide && /jpe?g/i.test(meta.format ?? '')) {
      // Already small enough and JPG — re-encode to strip EXIF & ensure quality cap.
      const out = await sharp(buf, { failOn: 'none' })
        .rotate()
        .jpeg({ quality, mozjpeg: true })
        .toBuffer();
      if (out.length < sizeBefore) {
        await fs.writeFile(filePath, out);
        console.log(`re-encode  ${rel}  ${human(sizeBefore)} → ${human(out.length)}`);
      } else {
        console.log(`keep       ${rel}  (${w}×${h}, ${human(sizeBefore)})`);
      }
      continue;
    }

    const ratio = longSide / longest;
    const targetW = Math.round(w * ratio);
    const targetH = Math.round(h * ratio);
    const out = await sharp(buf, { failOn: 'none' })
      .rotate()
      .resize(targetW, targetH, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    await fs.writeFile(filePath, out);
    console.log(
      `resized    ${rel}  ${w}×${h} → ${targetW}×${targetH}  ${human(sizeBefore)} → ${human(out.length)}`,
    );
  }
}

function human(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

async function totalSize(dir) {
  let total = 0;
  let entries = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return 0;
  }
  for (const f of entries) {
    const full = path.join(dir, f);
    const stat = await fs.stat(full);
    if (stat.isFile()) total += stat.size;
  }
  return total;
}

async function main() {
  for (const t of TARGETS) {
    const before = await totalSize(t.dir);
    await processDir(t);
    const after = await totalSize(t.dir);
    console.log(
      `\n${path.relative(process.cwd(), t.dir)}: ${human(before)} → ${human(after)} ` +
      `(${(after / before * 100).toFixed(1)}%)\n`,
    );
  }
  console.log(`Originals preserved at ${path.relative(process.cwd(), BACKUP_DIR)} (also in .gitignore).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
