# WEBSITE CA SĨ ANH TƯ — PREMIUM V4

## Lỗi trong ảnh chụp màn hình là gì?

Trang đang hiển thị kiểu HTML mặc định của trình duyệt: chữ nhỏ màu trắng/xanh, menu dồn thành dòng và ảnh không nằm đúng bố cục. Điều này cho thấy file CSS không được tải, không phải giao diện được thiết kế như vậy.

Bản V3 sửa triệt để bằng cách nhúng toàn bộ CSS và JavaScript trực tiếp vào `index.html`. Vì vậy website vẫn có đầy đủ giao diện ngay cả khi thư mục `css/` hoặc `js/` chưa được upload đúng.

## Cách upload đúng lên tài khoản anhtuofficial.github.io

1. Xóa hoặc thay thế các file cũ trong repository đang phát GitHub Pages.
2. Giải nén ZIP này.
3. Upload **toàn bộ file và thư mục bên trong ZIP vào thư mục gốc của repository**.
4. Kiểm tra ở trang Code phải thấy ngay:
   - `index.html`
   - `images/`
   - `css/`
   - `js/`
   - `.nojekyll`
5. Không upload nguyên một thư mục lồng bên ngoài rồi để `index.html` nằm sâu bên trong.
6. Chờ GitHub Pages triển khai, sau đó mở lại trang ở tab ẩn danh hoặc xóa cache Safari.

`index.html` là bản chính và đã tự chứa CSS/JavaScript. Các file trong `css/` và `js/` được giữ lại để chỉnh sửa dễ hơn nhưng không còn là điều kiện bắt buộc để giao diện hoạt động.

## Xóa cache trên iPhone

- Mở link bằng tab riêng tư để kiểm tra nhanh.
- Hoặc vào Cài đặt → Safari → Xóa lịch sử và dữ liệu trang web.
- Trên trang đang mở, nhấn nút tải lại.

## Danh sách ảnh cần thay

Giữ chính xác tên file và đuôi `.JPG`:

- `images/anh-bia.JPG`
- `images/chan-dung.JPG`
- `images/bieu-dien-01.JPG`
- `images/bieu-dien-02.JPG`
- `images/phong-thu-01.JPG`
- `images/doi-thuong-01.JPG`
- `images/doi-thuong-02.JPG`
- `images/su-kien-01.JPG`
- `images/su-kien-02.JPG`
- `images/bao-chi-01.JPG`
- `images/bao-chi-02.JPG`
- `images/og-anh-tu.JPG`

GitHub Pages phân biệt chữ hoa và chữ thường. `chan-dung.JPG` khác `chan-dung.jpg`.

## File nào dùng?

- `index.html`: dùng file này cho GitHub Pages. CSS/JS đã nhúng trực tiếp.
- `index-ban-tach-file.html`: bản tham khảo dùng `css/style.css` và `js/script.js`.
- `css/style.css`, `js/script.js`: bản mã nguồn tách riêng để chỉnh sửa.

## Thông tin đã tích hợp

- Ca sĩ: Anh Tư
- YouTube: https://youtube.com/@anhtu.singer
- Chỉ Còn Tình Yêu: https://youtu.be/u54UZOcwMfM
- Sợ Yêu: https://youtu.be/Wemc37ra_a8
- Fanpage: https://www.facebook.com/share/1BjugcaA9f/
- Hotline/Zalo: 033.2023.909

## Email booking

Email hiện vẫn là placeholder `booking.anhtu@example.com`. Tìm và thay toàn bộ chuỗi này trong `index.html` bằng email thật.


## Nâng cấp giao diện V4

- Font tiêu đề: **Playfair Display** — thanh lịch, giàu cảm xúc.
- Font nội dung: **Manrope** — hiện đại, rõ ràng trên iPhone.
- Nút CTA dạng pill, gradient champagne, shimmer, ripple và trạng thái focus rõ ràng.
- Hiệu ứng scroll reveal mềm hơn, thanh tiến trình, chuyển động nền hero và hover card.
- Hiệu ứng con trỏ/magnetic chỉ chạy trên máy tính; tự tắt trên thiết bị cảm ứng và khi bật Reduce Motion.
- `index.html` là bản an toàn nhất cho GitHub Pages vì CSS/JS đã nhúng trực tiếp.
