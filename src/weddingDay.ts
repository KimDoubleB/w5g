const seoulDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
});

export type WeddingPageMode = 'invitation' | 'wedding-day' | 'thank-you';

export function getWeddingPageMode(
  wedding: Date,
  now: Date = new Date(),
  preview: string | null = null,
): WeddingPageMode {
  if (preview === 'wedding-day' || preview === 'invitation' || preview === 'thank-you') return preview;
  const dayKey = (date: Date) => {
    const parts = seoulDate.formatToParts(date);
    return ['year', 'month', 'day'].map((type) => parts.find((p) => p.type === type)!.value).join('-');
  };
  const weddingDay = dayKey(wedding);
  const weddingDayStart = dayKey(new Date(wedding.getTime() - 24 * 60 * 60 * 1000));
  const today = dayKey(now);
  if (today < weddingDayStart) return 'invitation';
  if (today <= weddingDay) return 'wedding-day';
  return 'thank-you';
}
