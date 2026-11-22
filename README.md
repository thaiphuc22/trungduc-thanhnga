# Thiệp cưới nhà trai — Trung Đức & Thanh Nga

Thiệp báo hỷ nhà trai: Lễ thành hôn 16:00 Chủ Nhật 06/12/2026 tại Trường tiểu học Thượng Bằng La,
phân hiệu Trần Phú B, tỉnh Lào Cai. Thiệp nhà gái: https://thaiphuc22.github.io/thanhnga-trungduc/

Một trang HTML tĩnh, chạy trên GitHub Pages.

## Mời đích danh khách

Thêm `?to=Tên khách` vào cuối link, ví dụ:

```
https://<tên-tài-khoản>.github.io/<tên-repo>/?to=Anh Hoàng
```

## Nhạc nền

Nhạc nền là `music/mot-doi.mp3` (bài "Một Đời"). Muốn đổi bài, thay file này bằng file khác cùng tên. Nhạc phát khi khách bấm "Mở thiệp".

## Lưu xác nhận tham dự vào Google Sheet

1. Tạo một Google Sheet mới (ví dụ đặt tên "Khách mời đám cưới").
2. Trong Sheet, vào **Tiện ích mở rộng → Apps Script**.
3. Xóa hết mã có sẵn, dán toàn bộ nội dung file [google-apps-script/Code.gs](google-apps-script/Code.gs), bấm **Lưu**.
4. Bấm **Triển khai → Tùy chọn triển khai mới**, chọn loại **Ứng dụng web**:
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
5. Bấm **Triển khai**, cấp quyền cho tài khoản Google của bạn. Google sẽ cảnh báo "ứng dụng chưa được xác minh": bấm **Nâng cao → Đi tới ... (không an toàn)**. Đây là script của chính bạn.
6. Sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
7. Trong `index.html` của **cả hai thiệp** (repo này và repo `thanhnga-trungduc`), tìm dòng `var RSVP_URL = '';` và dán URL vào giữa hai dấu nháy.

Mỗi câu trả lời của khách sẽ thành một dòng trong trang tính "Xác nhận", cột "Thiệp" cho biết khách gửi từ thiệp nhà trai hay nhà gái. Lời chúc hiện trong "Sổ lưu bút" của thiệp nhà gái; muốn ẩn lời chúc nào, gõ `x` vào cột "Ẩn lời chúc" của dòng đó.

Khi `RSVP_URL` để trống, form được ẩn và khách thấy lời nhắn báo trực tiếp với gia đình.

Nếu sau này sửa `Code.gs`, vào **Triển khai → Quản lý triển khai → Chỉnh sửa → Phiên bản mới** để giữ nguyên URL.
