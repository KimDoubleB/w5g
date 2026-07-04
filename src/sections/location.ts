import { ARROW_DOWN_SVG, makeCollapsible } from '../components/collapsible';
import { WEDDING } from '../data/wedding';
import { initializeNaverMap } from '../map/naverMap';

const SUBWAY_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M7 14h10"/><circle cx="9" cy="11" r=".8"/><circle cx="15" cy="11" r=".8"/><path d="M8 17l-2 4M16 17l2 4"/></svg>';
const BUS_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16"/><circle cx="8" cy="17.5" r="1.4"/><circle cx="16" cy="17.5" r="1.4"/></svg>';
const CAR_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><rect x="3" y="13" width="18" height="6" rx="1.5"/><circle cx="7.5" cy="19" r="1.4"/><circle cx="16.5" cy="19" r="1.4"/></svg>';

const ICON = (name: string, alt: string) =>
  `<img class="nav-btn__icon" src="${import.meta.env.BASE_URL}img/icons/${name}.png" alt="${alt}" width="20" height="20" />`;
const NAVER_ICON = ICON('navermap', '네이버 지도');
const KAKAO_ICON = ICON('kakaomap', '카카오맵');
const TMAP_ICON = ICON('tmap', '티맵');

const showMapFallback = (mapEl: HTMLElement): void => {
  mapEl.classList.add('is-error');
  const placeholder = mapEl.querySelector<HTMLElement>('[data-map-placeholder]');
  if (!placeholder) return;

  placeholder.innerHTML = `
    <div>지도를 표시할 수 없습니다</div>
    <div class="location__map-note">아래 지도 앱 버튼을 이용해 주세요</div>
  `;
};

const initLocationMap = (section: HTMLElement): void => {
  const mapEl = section.querySelector<HTMLElement>('[data-naver-map]');
  if (!mapEl) return;

  const schedule = window.requestAnimationFrame ?? ((callback: FrameRequestCallback) => window.setTimeout(callback, 0));
  schedule(() => {
    initializeNaverMap(mapEl, {
      clientId: import.meta.env.VITE_NAVER_MAP_NCP_KEY_ID,
      coords: WEDDING.venue.coords,
      title: WEDDING.venue.name,
      zoom: 16,
    })
      .then((isReady) => {
        if (!isReady) {
          showMapFallback(mapEl);
          return;
        }

        mapEl.classList.add('is-ready');
        mapEl.querySelector('[data-map-placeholder]')?.remove();
      })
      .catch(() => showMapFallback(mapEl));
  });
};

function renderWayItem(opts: { id: string; icon: string; title: string; bodyHtml: string }): string {
  return `
    <div class="way-item" id="${opts.id}">
      <div class="way-item__trigger collapsible__trigger">
        <span class="way-item__icon">${opts.icon}</span>
        <span class="way-item__title">${opts.title}</span>
        <span class="way-item__arrow">${ARROW_DOWN_SVG}</span>
      </div>
      <div class="way-item__panel collapsible__panel">
        <div class="way-item__body">${opts.bodyHtml}</div>
      </div>
    </div>
  `;
}

export function renderLocation(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section location';

  const subwayBody = `<ul>${WEDDING.ways.subway.map((s) => `<li>${s}</li>`).join('')}</ul>`;
  const carBody = `<ul>${WEDDING.ways.car.map((s) => `<li>${s}</li>`).join('')}</ul>`;
  const busBody = WEDDING.ways.bus
    .map(
      (g) => `
        <div class="bus-group">
          <div class="bus-group__title">${g.title}</div>
          <div class="bus-group__stop">${g.stop}</div>
          <ul>${g.lines.map((l) => `<li>${l}</li>`).join('')}</ul>
        </div>
      `,
    )
    .join('');

  section.innerHTML = `
    <div class="section__title">
      <div class="eng section__sub">LOCATION</div>
      <div class="section__name">오시는 길</div>
    </div>
    <div class="location__venue">
      <div class="location__name">${WEDDING.venue.name}</div>
      <div class="location__address">${WEDDING.venue.address}</div>
    </div>
    <div class="location__map" data-naver-map>
      <div class="location__map-placeholder" data-map-placeholder>
        <div>지도를 불러오는 중</div>
        <div class="location__map-note">표시되지 않으면 아래 지도 앱 버튼을 이용해 주세요</div>
      </div>
    </div>
    <div class="location__nav-btns">
      <a class="nav-btn" href="${WEDDING.venue.mapLinks.naver}" target="_blank" rel="noopener">${NAVER_ICON}<span>네이버 지도</span></a>
      <a class="nav-btn" href="${WEDDING.venue.mapLinks.kakao}" target="_blank" rel="noopener">${KAKAO_ICON}<span>카카오맵</span></a>
      <a class="nav-btn" href="${WEDDING.venue.mapLinks.tmap}" target="_blank" rel="noopener">${TMAP_ICON}<span>티맵</span></a>
    </div>
    <div class="location__ways">
      ${renderWayItem({ id: 'way-subway', icon: SUBWAY_ICON, title: '지하철', bodyHtml: subwayBody })}
      ${renderWayItem({ id: 'way-bus', icon: BUS_ICON, title: '버스', bodyHtml: busBody })}
      ${renderWayItem({ id: 'way-car', icon: CAR_ICON, title: '자가용', bodyHtml: carBody })}
    </div>
  `;

  section.querySelectorAll<HTMLElement>('.way-item').forEach((el) => makeCollapsible(el));
  initLocationMap(section);
  return section;
}
