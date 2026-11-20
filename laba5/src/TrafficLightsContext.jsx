import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { listTrafficLights, updateTrafficLightState } from './api/trafficLightsApi';

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
  const [serverTrafficLights, setServerTrafficLights] = useState([]);
  const [load, setLoad] = useState({ status: 'loading' });
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [save, setSave] = useState({ status: 'idle' });
  const saving = useRef(false);
  const savedSignal = serverTrafficLights.find(record => record.id === 'main')?.currentSignal;

  useEffect(() => {
    const controller = new AbortController();

    async function loadTrafficLights() {
      try {
        const records = await listTrafficLights({ signal: controller.signal });
        if (controller.signal.aborted) return;
        const main = records.find(record => record?.id === 'main');
        const phase = cycle.indexOf(main?.currentSignal);
        if (phase < 0) throw new Error('Запис main відсутній або має некоректний сигнал.');
        setServerTrafficLights(records);
        setPhaseIndex(phase);
        setLoad({ status: 'success' });
      } catch (error) {
        if (!controller.signal.aborted) setLoad({ status: 'error', error: error.message });
      }
    }

    loadTrafficLights();
    return () => controller.abort();
  }, [loadAttempt]);

  function reloadTrafficLights() {
    setLoad({ status: 'loading' });
    setLoadAttempt(attempt => attempt + 1);
  }

  async function saveCurrentSignal() {
    if (saving.current || load.status !== 'success') return;
    saving.current = true;
    setSave({ status: 'saving' });
    try {
      const record = await updateTrafficLightState('main', currentSignal);
      if (record?.id !== 'main' || record.currentSignal !== currentSignal) {
        throw new Error('Сервер повернув неочікуваний запис.');
      }
      setServerTrafficLights(records => records.map(item => item.id === record.id ? record : item));
      setSave({ status: 'success' });
    } catch (error) {
      setSave({ status: 'error', error: error.message });
    } finally {
      saving.current = false;
    }
  }

  useEffect(() => {
    if (!isAutomatic || load.status === 'loading') return;
    const timerId = setInterval(() => {
      setPhaseIndex(previous => (previous + 1) % cycle.length);
    }, intervalMs);
    // Очищаємо саме ресурс цього запуску ефекту при зміні режиму/інтервалу й демонтуванні.
    return () => clearInterval(timerId);
  }, [isAutomatic, intervalMs, load.status]);

  function selectSignal(color) {
    if (isAutomatic || load.status === 'loading') return;
    // Ручний жовтий завжди означає фазу 1: наступною буде зелена.
    setPhaseIndex(cycle.indexOf(color));
    setCounts(previous => ({ ...previous, [color]: previous[color] + 1 }));
  }

  const value = { phaseIndex, currentSignal, isAutomatic, setIsAutomatic,
    direction, setDirection, intervalMs, setIntervalMs, counts, selectSignal, load, save, savedSignal, reloadTrafficLights, saveCurrentSignal };
  return <TrafficLightsContext.Provider value={value}>{children}</TrafficLightsContext.Provider>;
}
TrafficLightsProvider.propTypes = { children: PropTypes.node.isRequired };
