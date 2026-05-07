import { WEDDING } from '../data/wedding';

type Row = { label: string; phone: string };

function rows(): Row[] {
  const c = WEDDING.contacts;
  return [
    { label: '신랑 김보배', phone: c.groom },
    { label: '신랑 아버지 김영칠', phone: c.groomFather },
    { label: '신랑 어머니 심재숙', phone: c.groomMother },
    { label: '신부 현기숙', phone: c.bride },
    { label: '신부 아버지 현진설', phone: c.brideFather },
    { label: '신부 어머니 윤인숙', phone: c.brideMother },
  ];
}

export function openContactModal(): void {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <button type="button" class="modal__close" aria-label="닫기">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <div class="modal__title" id="contact-title">연락하기</div>
      <ul class="contact-list">
        ${rows()
          .map((r) => {
            const has = !!r.phone;
            const tel = has ? `tel:${r.phone}` : '#';
            const sms = has ? `sms:${r.phone}` : '#';
            const dim = has ? '' : ' is-disabled';
            const display = has ? r.phone : '연락처 추후 등록';
            return `
              <li class="contact-row${dim}">
                <div class="contact-row__name">
                  <div class="contact-row__label">${r.label}</div>
                  <div class="contact-row__phone">${display}</div>
                </div>
                <div class="contact-row__actions">
                  <a class="contact-action" href="${tel}" aria-label="전화" ${has ? '' : 'aria-disabled="true"'}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
                  </a>
                  <a class="contact-action" href="${sms}" aria-label="문자" ${has ? '' : 'aria-disabled="true"'}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </a>
                </div>
              </li>
            `;
          })
          .join('')}
      </ul>
    </div>
  `;

  const close = () => {
    backdrop.classList.remove('visible');
    setTimeout(() => backdrop.remove(), 180);
    document.removeEventListener('keydown', onKey);
    document.body.classList.remove('no-scroll');
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
  };

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  backdrop.querySelector('.modal__close')!.addEventListener('click', close);
  document.addEventListener('keydown', onKey);

  document.body.classList.add('no-scroll');
  document.body.appendChild(backdrop);
  // next frame for transition
  requestAnimationFrame(() => backdrop.classList.add('visible'));
}
