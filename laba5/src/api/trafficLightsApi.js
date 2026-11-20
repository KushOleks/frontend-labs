const apiUrl = import.meta.env.VITE_GAS_API_URL?.trim();

function endpoint() {
  if (!apiUrl) {
    throw new Error('Укажіть URL розгортання GAS у VITE_GAS_API_URL.');
  }
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
