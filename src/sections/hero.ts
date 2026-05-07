import { IMG_EXT, WEDDING } from '../data/wedding';
import { koreanWeekday } from '../utils/date';

export function renderHero(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'hero';
  const d = WEDDING.date;
  const weekday = koreanWeekday(d).slice(0, 1);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const h = d.getHours();
  const ampm = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const min = d.getMinutes();
  const minStr = min === 0 ? '00' : `${min}`.padStart(2, '0');

  section.innerHTML = `
    <div class="hero__photo">
      <img src="${import.meta.env.BASE_URL}img/main/hero.${IMG_EXT}" alt="" />
    </div>
    <div class="hero__bottom">
      <div class="hero__names">
        <span class="hero__name">${WEDDING.groom.name}</span>
        <span class="hero__heart" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 21s-7.5-4.5-9.6-9.4C1.1 8 3.7 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.7 1.2-1.6 2.8-2.7 4.8-2.7 3.5 0 6.1 3.5 4.8 7.1C19.5 16.5 12 21 12 21z"/>
          </svg>
        </span>
        <span class="hero__name">${WEDDING.bride.name}</span>
      </div>
      <div class="hero__meta">
        <div class="eng">${y}.${Number(m)}.${Number(day)} (${weekday}) ${hour12}:${minStr} ${ampm}</div>
        <div>${WEDDING.venue.name}</div>
      </div>
    </div>
  `;
  return section;
}
