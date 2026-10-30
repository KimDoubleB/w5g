import { openContactModal } from '../components/contactModal';
import { WEDDING } from '../data/wedding';

const coupleNamesMarkup = () => `
      <div class="hero__names wedding-day-greeting__names">
        <span class="hero__name">${WEDDING.groom.name}</span>
        <span class="hero__heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 21s-7.5-4.5-9.6-9.4C1.1 8 3.7 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.7 1.2-1.6 2.8-2.7 4.8-2.7 3.5 0 6.1 3.5 4.8 7.1C19.5 16.5 12 21 12 21z"/>
          </svg>
        </span>
        <span class="hero__name">${WEDDING.bride.name}</span>
      </div>
`;

export function renderWeddingDayGreeting(): HTMLElement {
  const dateParts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(WEDDING.date);
  const part = (type: Intl.DateTimeFormatPartTypes) => dateParts.find((p) => p.type === type)!.value;
  const date = `${part('year')}.${part('month')}.${part('day')}`;
  const weekday = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', weekday: 'short' }).format(WEDDING.date);
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul', hour: 'numeric', minute: '2-digit', hour12: true,
  }).format(WEDDING.date);
  const section = document.createElement('section');
  section.className = 'section wedding-day-greeting';
  section.innerHTML = `
    <div class="section__title">
      <div class="eng section__sub">OUR WEDDING DAY</div>
      ${coupleNamesMarkup()}
      <h1 class="section__name">오늘, 저희 결혼합니다</h1>
      <div class="wedding-day-greeting__meta">
        <div class="eng">${date} (${weekday}) ${time}</div>
        <div>${WEDDING.venue.name} (5층)</div>
      </div>
    </div>
    <div class="invitation__message">
      <p>저희의 시작을 함께 축복해 주시러</p>
      <p>귀한 걸음 해주시는 모든 분께 감사드립니다.</p>
      <p>오시는 길 조심히 오세요.</p>
      <p>반가운 마음으로 기다리겠습니다.</p>
    </div>
    <a class="wedding-day-greeting__link" href="#location">오시는 길 바로 보기 <span aria-hidden="true">↓</span></a>
  `;
  return section;
}

export function renderThankYouGreeting(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section wedding-day-greeting thank-you-greeting';
  section.innerHTML = `
    <div class="section__title">
      <div class="eng section__sub">THANK YOU</div>
      ${coupleNamesMarkup()}
      <h1 class="section__name">진심으로 감사드립니다</h1>
    </div>
    <div class="invitation__message">
      <p>저희의 결혼을 축하해 주시고</p>
      <p>귀한 걸음으로 함께해 주셔서 감사합니다.</p>
      <br />
      <p>멀리서 보내주신 따뜻한 축하도</p>
      <p>소중히 마음에 간직하겠습니다.</p>
      <br />
      <p>보내주신 사랑과 축복을 기억하며</p>
      <p>서로 아끼고 사랑하며 잘 살겠습니다.</p>
    </div>
  `;
  return section;
}

export function renderWeddingDayContacts(message = '도움이 필요하시면 편하게 연락해 주세요.'): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section wedding-day-contacts';
  section.innerHTML = `
    <div class="section__title">
      <div class="eng section__sub">CONTACT</div>
      <h2 class="section__name">연락하실 곳</h2>
    </div>
    <p>${message}</p>
    <button type="button" class="btn-contact">신랑 · 신부 · 혼주에게 연락하기</button>
  `;
  section.querySelector('button')!.addEventListener('click', openContactModal);
  return section;
}
