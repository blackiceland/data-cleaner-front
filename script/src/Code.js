function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('DataCleaner')
      .addItem('Open', 'openDataCleaner')
      .addToUi();
}

function openDataCleaner() {
  const html = HtmlService
      .createHtmlOutputFromFile('dialog')
      .setWidth(640)
      .setHeight(600)
      .setTitle('DataCleaner')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  SpreadsheetApp.getUi().showModelessDialog(html);
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
