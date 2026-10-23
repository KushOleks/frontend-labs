import TrafficLights from '../TrafficLights';
import StatsBar from '../StatsBar';
import { labels } from '../Light';
import { cycle, useTrafficLights } from '../TrafficLightsContext';

export default function TrafficLightPage() {
  const { phaseIndex, currentSignal, isAutomatic, setIsAutomatic, direction,
    setDirection, intervalMs, setIntervalMs, counts, selectSignal } = useTrafficLights();
  return <><h2 className="page-title">Керування світлофором</h2>
    <div className="workspace">
      <section className="stage" aria-label="Демонстрація світлофора">
        <span className={`mode ${isAutomatic ? 'running' : ''}`}>{isAutomatic ? 'Автоматичний режим' : 'Ручний режим'}</span>
        <div className="signal-space"><TrafficLights direction={direction} currentSignal={currentSignal} isAutomatic={isAutomatic} onSelect={selectSignal}/></div>
        <p className="current" role="status">{labels[currentSignal]} · Фаза {phaseIndex + 1} / 4</p>
        <p className="hint">{isAutomatic ? 'Щоб обрати сигнал вручну, зупини цикл.' : 'Натисни на лампу, щоб обрати сигнал.'}</p>
      </section>
      <aside><section className="controls"><h2>Керування</h2>
        <div className="buttons"><button className="primary" disabled={isAutomatic} onClick={() => setIsAutomatic(true)}>Запустити</button><button disabled={!isAutomatic} onClick={() => setIsAutomatic(false)}>Зупинити</button></div>
        <label>Орієнтація<select value={direction} onChange={event => setDirection(event.target.value)}><option value="vertical">Вертикальна</option><option value="horizontal">Горизонтальна</option></select></label>
        <label>Тривалість фази<select value={intervalMs} onChange={event => setIntervalMs(Number(event.target.value))}><option value={500}>0,5 секунди</option><option value={1500}>1,5 секунди</option><option value={3000}>3 секунди</option></select></label>
        <p>Зміна тривалості починає новий повний відлік поточної фази.</p>
      </section><StatsBar counts={counts}/></aside>
    </div>
    <div className="phase-cycle" aria-label="Послідовність фаз">{cycle.map((color, index) => <span key={index} className={phaseIndex === index ? 'selected' : ''} aria-current={phaseIndex === index ? 'step' : undefined}>{index + 1}. {labels[color]}{index < cycle.length - 1 ? ' →' : ' ↻'}</span>)}</div>
  </>;
}
