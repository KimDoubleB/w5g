import { copyText, showToast } from '../utils/clipboard';

export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <button type="button" class="footer__share">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1"/>
        <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 1 0 7 7l1-1"/>
      </svg>
      <span>링크주소 복사하기</span>
    </button>
  `;
  footer.querySelector('button')!.addEventListener('click', async () => {
    const ok = await copyText(window.location.href);
    showToast(ok ? '청첩장 주소가 복사되었습니다' : '복사에 실패했어요. 직접 복사해주세요');
  });
  return footer;
}
