import './style.css';
import { renderAccount } from './sections/account';
import { renderCalendar } from './sections/calendar';
import { renderFooter } from './sections/footer';
import { renderGallery } from './sections/gallery';
import { renderHero } from './sections/hero';
import { renderInvitation } from './sections/invitation';
import { renderLocation } from './sections/location';
import { WEDDING } from './data/wedding';
import { getWeddingPageMode } from './weddingDay';
import { renderThankYouGreeting, renderWeddingDayContacts, renderWeddingDayGreeting } from './sections/weddingDay';

const app = document.querySelector<HTMLDivElement>('#app')!;
const preview = new URLSearchParams(window.location.search).get('preview');
const getPageMode = () => getWeddingPageMode(WEDDING.date, new Date(), preview);
const pageMode = getPageMode();
app.classList.toggle('is-wedding-day', pageMode !== 'invitation');
app.classList.toggle('is-thank-you', pageMode === 'thank-you');

if (pageMode === 'thank-you') {
  app.append(renderThankYouGreeting(), renderWeddingDayContacts('전하고 싶은 말씀이 있다면 편하게 연락해 주세요.'));
} else if (pageMode === 'wedding-day') {
  app.append(renderWeddingDayGreeting(), renderLocation(true), renderWeddingDayContacts(), renderAccount(), renderFooter());
} else {
  app.append(renderHero(), renderInvitation(), renderCalendar(), renderGallery(), renderLocation(), renderAccount(), renderFooter());
}

// Switch even when the invitation has stayed open across midnight.
const checkDate = () => {
  if (getPageMode() !== pageMode) window.location.reload();
};
window.setInterval(checkDate, 30_000);
window.addEventListener('pageshow', checkDate);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) checkDate();
});
