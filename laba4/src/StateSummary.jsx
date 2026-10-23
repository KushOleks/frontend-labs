import PropTypes from 'prop-types';
import { labels } from './Light';

export default function StateSummary({ currentSignal, phaseIndex, isAutomatic, direction, intervalMs, total }) {
  return <section className="state-summary" aria-label="Поточний стан"><h2>Поточний стан</h2>
    <dl><div><dt>Сигнал</dt><dd className="summary-signal" role="status">{labels[currentSignal]} · Фаза {phaseIndex + 1} / 4</dd></div>
      <div><dt>Режим</dt><dd>{isAutomatic ? 'Автоматичний' : 'Ручний'}</dd></div>
      <div><dt>Орієнтація</dt><dd>{direction === 'vertical' ? 'Вертикальна' : 'Горизонтальна'}</dd></div>
      <div><dt>Тривалість фази</dt><dd>{intervalMs / 1000} с</dd></div>
      <div><dt>Ручних натискань</dt><dd>{total}</dd></div></dl>
  </section>;
}
StateSummary.propTypes = {
  currentSignal: PropTypes.string.isRequired, phaseIndex: PropTypes.number.isRequired,
  isAutomatic: PropTypes.bool.isRequired, direction: PropTypes.string.isRequired,
  intervalMs: PropTypes.number.isRequired, total: PropTypes.number.isRequired,
};
