import { NavLink, Outlet } from 'react-router';
import { useTrafficLights } from './TrafficLightsContext';

export default function AppLayout() {
  const { load, reloadTrafficLights } = useTrafficLights();
  return <div className="app">
    <header><p className="eyebrow">FRONTEND / ЛАБОРАТОРНА №5</p><h1>Світлофор</h1><p>Асинхронні дані та GAS API</p></header>
    <nav className="navigation" aria-label="Головна навігація">
      <NavLink to="/" end>Головна</NavLink>
      <NavLink to="/traffic-light">Світлофор</NavLink>
      <NavLink to="/stats">Статистика</NavLink>
      <NavLink to="/status">Стан</NavLink>
    </nav>
    <main id="main-content">
      {load.status === 'loading' ? <p role="status">Завантаження даних світлофора…</p> : <>
        {load.status === 'error' && <section className="controls">
          <p role="alert">Не вдалося завантажити збережений серверний стан. {load.error}</p>
          <button onClick={reloadTrafficLights}>Повторити</button>
        </section>}
        <Outlet />
      </>}
    </main>
    <footer>CP5 · Поточний сигнал можна зберегти в Google Sheets.</footer>
  </div>;
}
