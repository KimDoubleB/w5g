export function openLightbox(images: string[], startIndex: number): void {
  let index = startIndex;

  const root = document.createElement('div');
  root.className = 'lightbox';
  root.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="닫기">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="이전">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="다음">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <img class="lightbox__img" alt="" />
    <div class="lightbox__counter"></div>
  `;

  const imgEl = root.querySelector<HTMLImageElement>('.lightbox__img')!;
  const counter = root.querySelector<HTMLDivElement>('.lightbox__counter')!;
  const update = () => {
    imgEl.src = images[index];
    counter.textContent = `${index + 1} / ${images.length}`;
  };
  const go = (delta: number) => {
    index = (index + delta + images.length) % images.length;
    update();
  };
  const close = () => {
    root.classList.remove('visible');
    setTimeout(() => root.remove(), 180);
    document.removeEventListener('keydown', onKey);
    document.body.classList.remove('no-scroll');
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  };

  root.querySelector('.lightbox__close')!.addEventListener('click', close);
  root.querySelector('.lightbox__nav--prev')!.addEventListener('click', () => go(-1));
  root.querySelector('.lightbox__nav--next')!.addEventListener('click', () => go(1));
  root.addEventListener('click', (e) => {
    if (e.target === root) close();
  });

  // Touch swipe
  let touchStartX = 0;
  root.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  root.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  });

  document.addEventListener('keydown', onKey);
  document.body.classList.add('no-scroll');
  document.body.appendChild(root);
  update();
  requestAnimationFrame(() => root.classList.add('visible'));
}
