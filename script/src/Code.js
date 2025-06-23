function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('DataCleaner')
      .addItem('Open', 'openDataCleaner')
      .addToUi();
}

function openDataCleaner() {
  const html = HtmlService
      .createTemplateFromFile('dialog')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setWidth(620)
      .setHeight(580);

  SpreadsheetApp.getUi().showModelessDialog(html, 'DataCleaner');
}

function getActiveRangeValues() {
  return SpreadsheetApp.getActiveRange().getValues();
}

function highlightExactRows(rowIdxArr) {
  if (!rowIdxArr || !rowIdxArr.length) return;
  const r = SpreadsheetApp.getActiveRange();
  rowIdxArr.forEach(i => r.offset(i, 0, 1, r.getWidth()).setBackground('#ffeeba'));
}
