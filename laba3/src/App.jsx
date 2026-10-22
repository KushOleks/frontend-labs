import { useEffect, useState } from 'react';
import TrafficLights from './TrafficLights';
import StatsBar from './StatsBar';
import { labels } from './Light';
import './App.css';

const cycle = ['red', 'yellow', 'green', 'yellow'];

export default function App() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [direction, setDirection] = useState('vertical');
  const [intervalMs, setIntervalMs] = useState(1500);
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const currentSignal = cycle[phaseIndex];

  useEffect(() => {
    if (!isAutomatic) return;
    const timerId = setInterval(() => {
      setPhaseIndex(previous => (previous + 1) % cycle.length);
    }, intervalMs);
    // Очищаємо саме ресурс цього запуску ефекту при зміні режиму/інтервалу й демонтуванні.
    return () => clearInterval(timerId);
  }, [isAutomatic, intervalMs]);

  function selectSignal(color) {
    if (isAutomatic) return;
    // Ручний жовтий завжди означає фазу 1: наступною буде зелена.
    setPhaseIndex(cycle.indexOf(color));
    setCounts(previous => ({ ...previous, [color]: previous[color] + 1 }));
  }

  return <main className="app">
    <header><p className="eyebrow">FRONTEND / ЛАБОРАТОРНА №3</p><h1>Світлофор</h1><p>Стан, ефекти та поведінка в часі</p></header>
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
    <footer aria-label="Послідовність фаз">{cycle.map((color, index) => <span key={index} className={phaseIndex === index ? 'selected' : ''} aria-current={phaseIndex === index ? 'step' : undefined}>{index + 1}. {labels[color]}{index < cycle.length - 1 ? ' →' : ' ↻'}</span>)}</footer>
  </main>;
}
