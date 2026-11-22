/**
 * Nhận xác nhận tham dự và lời chúc từ thiệp cưới (nhà trai và nhà gái), ghi vào Google Sheet.
 * Cách cài: xem README.md ở thư mục gốc.
 *
 * POST  (form gửi từ thiệp)  -> thêm một dòng vào trang tính "Xác nhận".
 * GET   ?wishes=1             -> trả về tối đa 60 lời chúc mới nhất (họ tên, lời chúc, ngày)
 *                                để thiệp hiện trong "Sổ lưu bút". Không trả về số người hay trạng thái tham dự.
 * GET   (không tham số)       -> dòng chữ kiểm tra script đang chạy.
 */
var SHEET_NAME = 'Xác nhận';
var HEADERS = ['Thời gian', 'Thiệp', 'Họ tên', 'Tham dự', 'Số người', 'Lời nhắn', 'Tên trên link mời', 'Trang', 'Ẩn lời chúc'];
// Muốn ẩn một lời chúc khỏi sổ lưu bút: gõ chữ x vào cột "Ẩn lời chúc" của dòng đó.

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    getSheet_().appendRow([
      new Date(),
      clean_(p.card, 30),
      clean_(p.name, 100),
      clean_(p.attend, 30),
      clean_(p.count, 5),
      clean_(p.msg, 1000),
      clean_(p.guest, 100),
      clean_(p.page, 300),
      ''
    ]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (!p.wishes) return ContentService.createTextOutput('Thiệp cưới RSVP: đang hoạt động');
  var sheet = getSheet_();
  var n = sheet.getLastRow() - 1;
  var out = [];
  if (n > 0) {
    var rows = sheet.getRange(2, 1, n, HEADERS.length).getValues();
    for (var i = rows.length - 1; i >= 0 && out.length < 60; i--) {
      var r = rows[i];
      var msg = String(r[5] || '').replace(/^'/, '').trim();
      if (!msg || String(r[8]).trim()) continue;
      out.push({ name: String(r[2] || '').replace(/^'/, ''), msg: msg, at: r[0] instanceof Date ? r[0].toISOString() : '' });
    }
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
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
