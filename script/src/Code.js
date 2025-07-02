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
        .setWidth(600)
        .setHeight(560);
    SpreadsheetApp.getUi().showModelessDialog(html, 'DataCleaner');
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

function getActiveRangeA1() {
    return SpreadsheetApp.getActiveRange().getA1Notation();
}

function getInitialRangeA1() {
    const sel = SpreadsheetApp.getActiveRange();
    if (sel.getNumRows() > 1 || sel.getNumColumns() > 1) {
        return sel.getA1Notation();
    }
    return SpreadsheetApp.getActiveSheet().getDataRange().getA1Notation();
}

function highlightPossibleRows(rowIdxArr) {
    if (!rowIdxArr || !rowIdxArr.length) return;
    const sheet = SpreadsheetApp.getActiveSheet();
    const width = sheet.getLastColumn();
    rowIdxArr.forEach(i =>
        sheet.getRange(i + 1, 1, 1, width).setBackground('#FFF59D'));
}

function highlightCanonRows(rowIdxArr) {
    if (!rowIdxArr || !rowIdxArr.length) return;
    const sh = SpreadsheetApp.getActiveSheet();
    const cols = sh.getLastColumn();
    rowIdxArr.forEach(i => {
        const r = sh.getRange(i + 1, 1, 1, cols);
        r.setBackground('#FFFBEA')
            .setBorder(true, false, false, false, false, false,
                '#F28B82',
                SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    });
}

function highlightRows(rowIdxArr, color) {
    if (!rowIdxArr || !rowIdxArr.length) return;
    const sheet = SpreadsheetApp.getActiveSheet();
    const width = sheet.getLastColumn();
    rowIdxArr.forEach(i =>
        sheet.getRange(i + 1, 1, 1, width).setBackground(color));
}



