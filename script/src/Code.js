function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('DataCleaner')
      .addItem('Open', 'openDataCleaner')
      .addToUi();
}

function openDataCleaner() {
  HtmlService.createTemplateFromFile('dialog')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setWidth(640)
      .setHeight(600)
      .setTitle('DataCleaner')
      .showModelessDialog(SpreadsheetApp.getUi());
}

function getIdToken() {
  return ScriptApp.getOAuthToken();
}

function getActiveRangeValues() {
  return SpreadsheetApp.getActiveRange().getValues();
}

function highlightExactRows(rowIdxArr) {
  if (!rowIdxArr || !rowIdxArr.length) return;
  const sheet = SpreadsheetApp.getActiveSheet();
  const width = sheet.getLastColumn();
  rowIdxArr.forEach(i =>
      sheet.getRange(i + 1, 1, 1, width).setBackground('#F28B82'));
}
