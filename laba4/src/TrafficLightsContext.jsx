import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const cycle = ['red', 'yellow', 'green', 'yellow'];
const TrafficLightsContext = createContext(null);

export function useTrafficLights() {
  const value = useContext(TrafficLightsContext);
  if (!value) throw new Error('useTrafficLights requires TrafficLightsProvider');
  return value;
}

export function TrafficLightsProvider({ children }) {
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

  const value = { phaseIndex, currentSignal, isAutomatic, setIsAutomatic,
    direction, setDirection, intervalMs, setIntervalMs, counts, selectSignal };
  return <TrafficLightsContext.Provider value={value}>{children}</TrafficLightsContext.Provider>;
}
TrafficLightsProvider.propTypes = { children: PropTypes.node.isRequired };
