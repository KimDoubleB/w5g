import { openLightbox } from '../components/lightbox';
import { GALLERY_COUNT, IMG_EXT } from '../data/wedding';

export function renderGallery(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section gallery';
  const base = import.meta.env.BASE_URL;
  const images = Array.from(
    { length: GALLERY_COUNT },
    (_, i) => `${base}img/gallery/${String(i + 1).padStart(2, '0')}.${IMG_EXT}`,
  );

  section.innerHTML = `
    <div class="section__title">
      <div class="eng section__sub">GALLERY</div>
      <div class="section__name">갤러리</div>
    </div>
    <div class="gallery__grid">
      ${images
        .map(
          (src, i) => `
            <button type="button" class="gallery__cell" data-index="${i}" aria-label="갤러리 ${i + 1}번째 사진">
              <img loading="lazy" src="${src}" alt="" />
            </button>
          `,
        )
        .join('')}
    </div>
  `;
  section.querySelectorAll<HTMLButtonElement>('.gallery__cell').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.index);
      openLightbox(images, i);
    });
  });
  return section;
}
