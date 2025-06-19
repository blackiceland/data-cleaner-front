function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('DataCleaner')
      .addItem('Open', 'openDataCleaner')
      .addToUi();
}

function openDataCleaner() {
  const html = HtmlService
      .createHtmlOutputFromFile('index')
      .setWidth(620)
      .setHeight(580);
  SpreadsheetApp.getUi().showModelessDialog(html, 'DataCleaner');
}

function getActiveRangeValues() {
  return SpreadsheetApp.getActiveRange().getValues();
}

function highlightExactRows(rowIdxArr) {
  if (!rowIdxArr || rowIdxArr.length === 0) return;
  const sheet   = SpreadsheetApp.getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const rangeList = rowIdxArr.map(i =>
      sheet.getRange(i + 1, 1, 1, lastCol).getA1Notation()
  );
  sheet.getRangeList(rangeList).setBackground('#F28B82');
}
