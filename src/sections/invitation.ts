import { openContactModal } from '../components/contactModal';
import { WEDDING } from '../data/wedding';

export function renderInvitation(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section invitation';
  const groomFirst = WEDDING.groom.name.slice(1); // 보배
  const brideFirst = WEDDING.bride.name.slice(1); // 기숙
  section.innerHTML = `
    <div class="section__title">
      <div class="eng section__sub">INVITATION</div>
      <div class="section__name">초대합니다</div>
    </div>
    <div class="invitation__message">
      ${WEDDING.invitationMessage.map((line) => `<p>${line}</p>`).join('')}
    </div>
    <div class="invitation__parents">
      <div class="parents-row">
        <span class="parents-row__names">${WEDDING.groom.parents[0]} · ${WEDDING.groom.parents[1]}</span>
        <span class="parents-row__rel"><span class="suffix">의 아들</span></span>
        <span class="parents-row__child">${groomFirst}</span>
      </div>
      <div class="parents-row">
        <span class="parents-row__names">${WEDDING.bride.parents[0]} · ${WEDDING.bride.parents[1]}</span>
        <span class="parents-row__rel"><span class="suffix">의 딸</span></span>
        <span class="parents-row__child">${brideFirst}</span>
      </div>
    </div>
    <button type="button" class="btn-contact">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
      <span>연락하기</span>
    </button>
  `;
  section.querySelector('.btn-contact')!.addEventListener('click', () => openContactModal());
  return section;
}
