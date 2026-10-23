import { useTrafficLights } from '../TrafficLightsContext';
import StatsBar from '../StatsBar';
import StateSummary from '../StateSummary';

export default function StatsPage() {
  const state = useTrafficLights();
  const total = Object.values(state.counts).reduce((sum, count) => sum + count, 0);
  return <><h2 className="page-title">Статистика</h2><div className="report-grid">
    <StatsBar counts={state.counts} /><StateSummary {...state} total={total} />
  </div><p className="hint">Лише перегляд. Автоматичний цикл продовжує працювати й на цій сторінці.</p></>;
}
