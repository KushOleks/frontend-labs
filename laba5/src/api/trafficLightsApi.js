const deployedUrl = 'https://script.google.com/macros/s/AKfycbyVo3pEZ5R6JyP0cZ_vFHtJXtiop6SjmAFOmjaFVeyZtjOy2I7ZWPhlms2p6QbI8DQIzw/exec';
const apiUrl = import.meta.env.VITE_GAS_API_URL?.trim() || deployedUrl;

function endpoint() {
  return new URL(apiUrl);
}

async function parseEnvelope(response) {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const payload = await response.json().catch(() => {
    throw new Error('GAS повернув відповідь, яку не вдалося прочитати як JSON.');
  });
  if (payload?.ok !== true || !payload.data) {
    throw new Error(payload?.error?.message || 'Некоректна відповідь GAS.');
  }
  return payload.data;
}

export async function listTrafficLights({ signal } = {}) {
  const url = endpoint();
  url.searchParams.set('action', 'list');
  const data = await parseEnvelope(await fetch(url, { signal, cache: 'no-store' }));
  if (!Array.isArray(data.trafficLights)) throw new Error('Відсутня колекція світлофорів.');
  return data.trafficLights;
}

export async function updateTrafficLightState(id, currentSignal) {
  const response = await fetch(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'updateState', id, currentSignal }),
  });
  return (await parseEnvelope(response)).trafficLight;
}
