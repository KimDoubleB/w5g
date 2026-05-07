import { WEDDING } from '../data/wedding';
import { ddayLine, formatDateLine, formatTimeKorean, koreanWeekday } from '../utils/date';

const HEADERS = ['일', '월', '화', '수', '목', '금', '토'];

export function renderCalendar(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'calendar';

  const d = WEDDING.date;
  const year = d.getFullYear();
  const month = d.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const targetDate = d.getDate();

  // Build cells: leading blanks, days, trailing blanks to complete weeks.
  const cells: { label: string; isTarget: boolean; dow: number }[] = [];
  for (let i = 0; i < firstDow; i += 1) cells.push({ label: '', isTarget: false, dow: i });
  for (let i = 1; i <= daysInMonth; i += 1) {
    cells.push({ label: String(i), isTarget: i === targetDate, dow: (firstDow + i - 1) % 7 });
  }
  while (cells.length % 7 !== 0) cells.push({ label: '', isTarget: false, dow: cells.length % 7 });

  const rowsHtml: string[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const row = cells
      .slice(i, i + 7)
      .map((cell) => {
        const cls = ['calendar__cell'];
        if (cell.dow === 0) cls.push('is-sun');
        if (cell.isTarget) cls.push('is-target');
        return `<td class="${cls.join(' ')}">${cell.label ? `<span>${cell.label}</span>` : ''}</td>`;
      })
      .join('');
    rowsHtml.push(`<tr>${row}</tr>`);
  }

  section.innerHTML = `
    <div class="calendar__inner">
      <div class="calendar__header">
        <div class="eng calendar__date">${formatDateLine(d)}</div>
        <div class="calendar__sub">${koreanWeekday(d)} ${formatTimeKorean(d)}</div>
      </div>
      <table class="calendar__table">
        <thead>
          <tr>${HEADERS.map((h, i) => `<th class="${i === 0 ? 'is-sun' : ''}">${h}</th>`).join('')}</tr>
        </thead>
        <tbody>${rowsHtml.join('')}</tbody>
      </table>
      <div class="calendar__divider"></div>
      <div class="calendar__dday">${ddayLine(d, { groom: WEDDING.groom.name.slice(1), bride: WEDDING.bride.name.slice(1) })}</div>
    </div>
  `;
  return section;
}
