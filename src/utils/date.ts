const KO_DAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] as const;

export function koreanWeekday(date: Date): string {
  return KO_DAYS[date.getDay()];
}

export function formatDateLine(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function formatTimeKorean(date: Date): string {
  const h = date.getHours();
  const ampm = h < 12 ? '오전' : '오후';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const min = date.getMinutes();
  const minPart = min === 0 ? '' : ` ${min}분`;
  return `${ampm} ${hour12}시${minPart}`;
}

/** Days between today (local midnight) and target (local midnight). Positive = future. */
export function daysUntil(target: Date, now: Date = new Date()): number {
  const a = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const b = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  return Math.round((b - a) / 86_400_000);
}

export function ddayLine(target: Date, names: { groom: string; bride: string }, now: Date = new Date()): string {
  const diff = daysUntil(target, now);
  const couple = `${names.groom} ♥ ${names.bride}`;
  if (diff > 0) return `${couple}의 결혼식이 ${diff}일 남았습니다.`;
  if (diff === 0) return `${couple}의 결혼식이 오늘입니다.`;
  return `${couple}의 결혼식이 ${-diff}일 지났습니다.`;
}
