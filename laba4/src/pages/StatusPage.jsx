import { useTrafficLights } from '../TrafficLightsContext';
import StateSummary from '../StateSummary';

export default function StatusPage() {
  const state = useTrafficLights();
  const total = Object.values(state.counts).reduce((sum, count) => sum + count, 0);
  return <><h2 className="page-title">Огляд стану</h2><StateSummary {...state} total={total} />
    <p className="hint">Додатковий маршрут лише для читання використовує той самий Context.</p></>;
}
