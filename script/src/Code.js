/** UI-меню ******************************************************************/
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('DataCleaner')
      .addItem('Open', 'openDataCleaner')
      .addToUi();
}

/** Запуск диалога **********************************************************/
function openDataCleaner() {
  const html = HtmlService
      .createHtmlOutputFromFile('dialog')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)     // сторонние скрипты разрешены
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setWidth(400)
      .setHeight(300);

  SpreadsheetApp.getUi().showModelessDialog(html, 'DataCleaner');
}

/** RPC: читаем выделенный диапазон ******************************************/
function getActiveRangeValues() {
  return SpreadsheetApp.getActiveRange().getValues();
}

/** RPC: подсветка найденных точных дублей **********************************/
function highlightExactRows(rowIndexes) {
  if (!rowIndexes || rowIndexes.length === 0) return;
  const sheet   = SpreadsheetApp.getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const ranges  = rowIndexes.map(i =>
      sheet.getRange(i + 1, 1, 1, lastCol).getA1Notation());
  sheet.getRangeList(ranges).setBackground('#F28B82');
}
