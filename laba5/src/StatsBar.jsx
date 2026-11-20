import PropTypes from 'prop-types';
import { labels } from './Light';

export default function StatsBar({ counts }) {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  return <section className="stats" aria-label="Статистика ручних натискань">
    <h2>Ручні натискання <span>Всього: {total}</span></h2>
    <dl>{Object.entries(counts).map(([color, count]) => <div key={color}>
      <dt><i className={`dot ${color}`} />{labels[color]}</dt><dd>{count}</dd>
    </div>)}</dl>
    <p>Автоматичні переходи не змінюють лічильники.</p>
  </section>;
}
StatsBar.propTypes = { counts: PropTypes.shape({ red: PropTypes.number.isRequired, yellow: PropTypes.number.isRequired, green: PropTypes.number.isRequired }).isRequired };
