import { copyText, showToast } from '../utils/clipboard';

export function copyButton(text: string, label = '복사'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-copy';
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2"/>
      <path d="M5 15V5a2 2 0 0 1 2-2h10"/>
    </svg>
    <span>${label}</span>
  `;
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (text === 'TODO' || !text) {
      showToast('계좌번호가 아직 등록되지 않았어요');
      return;
    }
    const ok = await copyText(text);
    showToast(ok ? '계좌번호가 복사되었습니다' : '복사에 실패했어요. 직접 선택해 복사해주세요');
  });
  return btn;
}
