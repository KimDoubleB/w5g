import './style.css';
import { renderAccount } from './sections/account';
import { renderCalendar } from './sections/calendar';
import { renderFooter } from './sections/footer';
import { renderGallery } from './sections/gallery';
import { renderHero } from './sections/hero';
import { renderInvitation } from './sections/invitation';
import { renderLocation } from './sections/location';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.append(
  renderHero(),
  renderInvitation(),
  renderCalendar(),
  renderGallery(),
  renderLocation(),
  renderAccount(),
  renderFooter(),
);
