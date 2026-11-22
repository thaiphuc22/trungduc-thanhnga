# Thiệp cưới Trung Đức & Thanh Nga

Thiệp cưới online, một trang HTML tĩnh, chạy trên GitHub Pages.

## Mời đích danh khách

Thêm `?to=Tên khách` vào cuối link, ví dụ:

```
https://<tên-tài-khoản>.github.io/<tên-repo>/?to=Anh Hoàng
```

## Nhạc nền

Đặt file `music.mp3` cạnh `index.html`. Nhạc phát khi khách bấm "Mở thiệp".

## Nối form xác nhận tham dự với Google Form

1. Tạo Google Form có 4 câu hỏi dạng **Trả lời ngắn**: Họ tên, Tham dự, Số người, Lời nhắn.
2. Bấm ⋮ → **Lấy đường liên kết điền sẵn**, gõ thử một giá trị vào mỗi ô rồi bấm **Lấy liên kết**.
3. Link nhận được có dạng
   `https://docs.google.com/forms/d/e/XXXX/viewform?entry.111=...&entry.222=...`
4. Trong `index.html`, tìm `var RSVP = {` và điền:
   - `formUrl`: link trên, đổi `viewform?...` thành `formResponse`
   - `fields`: mã `entry.xxx` tương ứng với từng ô
5. Câu trả lời sẽ về Google Form. Bấm **Liên kết với Trang tính** để xem dạng bảng.

Khi `formUrl` để trống, form được ẩn và khách thấy lời nhắn báo trực tiếp với gia đình.
