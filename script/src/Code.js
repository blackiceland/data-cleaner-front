function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('DataCleaner')
        .addItem('Open', 'openDataCleaner')
        .addToUi();
}

function openDataCleaner() {
    SpreadsheetApp.getUi().showModelessDialog(
        HtmlService.createHtmlOutputFromFile('dialog')
            .setWidth(620).setHeight(580),
        'DataCleaner');
}

function getActiveRangeValues() {
    return SpreadsheetApp.getActiveRange().getValues();
}

function highlightExactRows(rowIdxArr) {
    if (!rowIdxArr?.length) return;
    const r = SpreadsheetApp.getActiveRange();
    rowIdxArr.forEach(i => r.offset(i, 0, 1, r.getWidth()).setBackground('#ffeeba'));
}
