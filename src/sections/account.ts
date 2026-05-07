import { ARROW_DOWN_SVG, makeCollapsible } from '../components/collapsible';
import { copyButton } from '../components/copyButton';
import { WEDDING, type Account } from '../data/wedding';

function renderAccountRow(a: Account): HTMLElement {
  const row = document.createElement('div');
  row.className = 'account-row';
  const todo = a.bank === 'TODO' || a.number === 'TODO';
  row.innerHTML = `
    <div class="account-row__main ${todo ? 'is-todo' : ''}">
      <div class="account-row__top">
        <span class="account-row__bank">${a.bank}</span>
        <span class="account-row__sep">|</span>
        <span class="account-row__number">${a.number}</span>
      </div>
      <div class="account-row__bottom">
        <span class="account-row__role">${a.role}</span>
        <span class="account-row__holder">${a.holder}</span>
      </div>
    </div>
  `;
  const copyText = todo ? 'TODO' : `${a.bank} ${a.number}`;
  row.appendChild(copyButton(copyText));
  return row;
}

function renderAccountGroup(title: string): string {
  return `
    <div class="account-item">
      <div class="account-item__trigger collapsible__trigger">
        <span class="account-item__title">${title}</span>
        <span class="account-item__arrow">${ARROW_DOWN_SVG}</span>
      </div>
      <div class="account-item__panel collapsible__panel">
        <div class="account-item__body" data-side="${title}"></div>
      </div>
    </div>
  `;
}

export function renderAccount(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section account';
  section.innerHTML = `
    <div class="section__title">
      <div class="section__name">마음 전하실 곳</div>
    </div>
    <div class="account__list">
      ${renderAccountGroup('신랑측 계좌번호')}
      ${renderAccountGroup('신부측 계좌번호')}
    </div>
  `;

  // Append rows (DOM, so copy buttons keep their listeners).
  const groomBody = section.querySelector<HTMLElement>('[data-side="신랑측 계좌번호"]')!;
  WEDDING.accounts.groom.forEach((a) => groomBody.appendChild(renderAccountRow(a)));
  const brideBody = section.querySelector<HTMLElement>('[data-side="신부측 계좌번호"]')!;
  WEDDING.accounts.bride.forEach((a) => brideBody.appendChild(renderAccountRow(a)));

  section.querySelectorAll<HTMLElement>('.account-item').forEach((el) => makeCollapsible(el));
  return section;
}
