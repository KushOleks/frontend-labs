import { Link } from 'react-router';

export default function NotFoundPage() {
  return <section className="overview"><p className="eyebrow">404</p><h2>Сторінку не знайдено</h2>
    <p>Перевір адресу або повернися до світлофора. Поточний стан збережено.</p>
    <Link className="return-link" to="/traffic-light">До світлофора →</Link>
  </section>;
}
