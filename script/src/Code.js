function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('DataCleaner')
      .addItem('Open', 'openDataCleaner')
      .addToUi();
}

function openDataCleaner() {
  const html = HtmlService
      .createHtmlOutputFromFile('dialog')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setWidth(400)
      .setHeight(300);

  SpreadsheetApp.getUi().showModelessDialog(html, 'DataCleaner');
}

function getActiveRangeValues() {
  return SpreadsheetApp.getActiveRange().getValues();
}

function highlightExactRows(rowIndexes) {
  if (!rowIndexes || rowIndexes.length === 0) return;
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const ranges = rowIndexes.map(i => sheet.getRange(i + 1, 1, 1, lastCol).getA1Notation());
  sheet.getRangeList(ranges).setBackground('#F28B82');
}
