# Thiệp cưới Trung Đức & Thanh Nga

Thiệp cưới online, một trang HTML tĩnh, chạy trên GitHub Pages.

## Mời đích danh khách

Thêm `?to=Tên khách` vào cuối link, ví dụ:

```
https://<tên-tài-khoản>.github.io/<tên-repo>/?to=Anh Hoàng
```

## Nhạc nền

Đặt file `music.mp3` cạnh `index.html`. Nhạc phát khi khách bấm "Mở thiệp".

## Lưu xác nhận tham dự vào Google Sheet

1. Tạo một Google Sheet mới (ví dụ đặt tên "Khách mời đám cưới").
2. Trong Sheet, vào **Tiện ích mở rộng → Apps Script**.
3. Xóa hết mã có sẵn, dán toàn bộ nội dung file [google-apps-script/Code.gs](google-apps-script/Code.gs), bấm **Lưu**.
4. Bấm **Triển khai → Tùy chọn triển khai mới**, chọn loại **Ứng dụng web**:
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
5. Bấm **Triển khai**, cấp quyền cho tài khoản Google của bạn. Google sẽ cảnh báo "ứng dụng chưa được xác minh": bấm **Nâng cao → Đi tới ... (không an toàn)**. Đây là script của chính bạn.
6. Sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
7. Trong `index.html`, tìm dòng `var RSVP_URL = '';` và dán URL vào giữa hai dấu nháy.

Mỗi câu trả lời của khách sẽ thành một dòng trong trang tính "Xác nhận".

Khi `RSVP_URL` để trống, form được ẩn và khách thấy lời nhắn báo trực tiếp với gia đình.

Nếu sau này sửa `Code.gs`, vào **Triển khai → Quản lý triển khai → Chỉnh sửa → Phiên bản mới** để giữ nguyên URL.
