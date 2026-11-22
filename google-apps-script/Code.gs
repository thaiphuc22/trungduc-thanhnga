/**
 * Nhận xác nhận tham dự từ thiệp cưới và ghi vào Google Sheet.
 * Cách cài: xem README.md ở thư mục gốc.
 */
var SHEET_NAME = 'Xác nhận';
var HEADERS = ['Thời gian', 'Họ tên', 'Tham dự', 'Số người', 'Lời nhắn', 'Tên trên link mời', 'Trang'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      clean_(p.name, 100),
      clean_(p.attend, 30),
      clean_(p.count, 5),
      clean_(p.msg, 1000),
      clean_(p.guest, 100),
      clean_(p.page, 300)
    ]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// Mở link Web App trên trình duyệt để kiểm tra script đã chạy.
function doGet() {
  return ContentService.createTextOutput('Thiệp cưới RSVP: đang hoạt động');
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Cắt độ dài và chặn công thức (ô bắt đầu bằng = + - @) để tránh chèn công thức vào bảng tính.
function clean_(v, max) {
  v = String(v == null ? '' : v).slice(0, max);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
