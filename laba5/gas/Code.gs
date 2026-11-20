const SIGNALS = ['red', 'yellow', 'green'];

function json_(ok, data, error) {
  return ContentService.createTextOutput(JSON.stringify({ ok, data, error }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonOk_(data) {
  return json_(true, data, null);
}

function jsonError_(code, message) {
  return json_(false, null, { code, message });
}

function trafficLightsSheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('DB_SPREADSHEET_ID');
  if (!id) throw new Error('Не задано DB_SPREADSHEET_ID.');
  const sheet = SpreadsheetApp.openById(id).getSheetByName('TRAFFIC_LIGHTS');
  if (!sheet) throw new Error('Аркуш TRAFFIC_LIGHTS відсутній.');
  return sheet;
}

function readRows_(sheet) {
  const [header, ...rows] = sheet.getDataRange().getDisplayValues();
  if (header[0] !== 'id' || header[1] !== 'current_signal') {
    throw new Error('Очікуються стовпці id та current_signal.');
  }
  return rows;
}

function doGet(e) {
  if (e?.parameter?.action !== 'list') {
    return jsonError_('unknown_action', 'Невідома команда.');
  }
  try {
    const trafficLights = readRows_(trafficLightsSheet_())
      .filter(([id, signal]) => id || signal)
      .map(([id, currentSignal]) => {
        if (!id || !SIGNALS.includes(currentSignal)) {
          throw new Error('Аркуш містить некоректний запис.');
        }
        return { id, currentSignal };
      });
    return jsonOk_({ trafficLights });
  } catch (error) {
    console.error(error);
    return jsonError_('storage_error', 'Не вдалося прочитати аркуш TRAFFIC_LIGHTS.');
  }
}

function doPost(e) {
  let command;
  try {
    command = JSON.parse(e?.postData?.contents);
    if (!command || typeof command !== 'object' || Array.isArray(command)) {
      throw new Error('Expected an object');
    }
  } catch {
    return jsonError_('bad_request', 'Очікується JSON-об’єкт.');
  }

  const { action, id, currentSignal } = command;
  if (action !== 'updateState') return jsonError_('unknown_action', 'Невідома команда.');
  if (typeof id !== 'string' || !id.trim() || !SIGNALS.includes(currentSignal)) {
    return jsonError_('bad_request', 'Укажіть ідентифікатор та коректний сигнал.');
  }

  try {
    const sheet = trafficLightsSheet_();
    const index = readRows_(sheet).findIndex(([rowId]) => rowId === id);
    if (index < 0) return jsonError_('not_found', 'Світлофор не знайдено.');
    sheet.getRange(index + 2, 2).setValue(currentSignal);
    SpreadsheetApp.flush();
    return jsonOk_({ trafficLight: { id, currentSignal } });
  } catch (error) {
    console.error(error);
    return jsonError_('storage_error', 'Не вдалося зберегти сигнал у TRAFFIC_LIGHTS.');
  }
}
