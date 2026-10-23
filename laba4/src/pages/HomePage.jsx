import { Link } from 'react-router';

export default function HomePage() {
  return <section className="overview"><p className="eyebrow">ОДИН ЗАСТОСУНОК · СПІЛЬНИЙ СТАН</p>
    <h2>Керуй. Спостерігай. Перемикай сторінки.</h2>
    <p>Обирай сигнали вручну або запускай автоматичний цикл. Статистика, орієнтація та режим залишаться з тобою під час навігації.</p>
    <div className="home-cards"><Link to="/traffic-light"><strong>01 / Світлофор</strong><span>Ручний вибір та автоматичний цикл →</span></Link>
      <Link to="/stats"><strong>02 / Статистика</strong><span>Лічильники та спільні параметри →</span></Link>
      <Link to="/status"><strong>03 / Стан</strong><span>Компактний огляд лише для читання →</span></Link></div>
    <p className="hint">Після повного перезавантаження вкладки стан починається заново.</p>
  </section>;
}
