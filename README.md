# WEBSITE CHÍNH THỨC CA SĨ ANH TƯ — PREMIUM V2

Website tĩnh HTML/CSS/JavaScript phiên bản Premium V2, có art direction điện ảnh, featured release, marquee nghệ sĩ, hiệu ứng vinyl, gallery cao cấp và tối ưu cho điện thoại/GitHub Pages.

## 1. Các file quan trọng

- `index.html`: bản chính, dùng `css/style.css` và `js/script.js`.
- `index-doc-lap.html`: CSS và JavaScript đã nhúng trực tiếp trong HTML; vẫn dùng thư mục `images/` để bạn thay ảnh dễ dàng.
- `images/`: ảnh placeholder `.JPG`.
- `music/`: đặt file nhạc nếu muốn bổ sung HTML5 Audio.
- `videos/`: có thể lưu video local, nhưng khuyến nghị dùng YouTube để website nhẹ.
- `.nojekyll`: giúp GitHub Pages phục vụ website tĩnh đúng cách.

## 2. Thông tin đã tích hợp

- Tên ca sĩ: **Anh Tư**
- YouTube: `https://youtube.com/@anhtu.singer?si=0LS_VZOnsgvDQR4O`
- Bài hát “Chỉ Còn Tình Yêu”: `https://youtu.be/u54UZOcwMfM?si=AmgCuxg1ZcNE-pr9`
- Bài hát “Sợ Yêu”: `https://youtu.be/Wemc37ra_a8?si=svrLl5hcquKblQeB`
- Fanpage: `https://www.facebook.com/share/1BjugcaA9f/?mibextid=wwXIfr`
- Hotline/Zalo: **033.2023.909**

## 3. Danh sách tên ảnh cần thay

Giữ đúng tên file, đúng chữ hoa `.JPG` vì GitHub Pages phân biệt chữ hoa/chữ thường:

1. `images/anh-bia.JPG` — ảnh hero toàn màn hình, nên dùng ảnh ngang 1920×1080.
2. `images/chan-dung.JPG` — ảnh phần giới thiệu, nên dùng ảnh dọc tỷ lệ 4:5.
3. `images/bieu-dien-01.JPG` — ảnh biểu diễn 1.
4. `images/bieu-dien-02.JPG` — ảnh biểu diễn 2.
5. `images/phong-thu-01.JPG` — ảnh phòng thu.
6. `images/doi-thuong-01.JPG` — ảnh đời thường 1.
7. `images/doi-thuong-02.JPG` — ảnh đời thường 2.
8. `images/su-kien-01.JPG` — poster sự kiện 1, ảnh dọc.
9. `images/su-kien-02.JPG` — poster sự kiện 2, ảnh dọc.
10. `images/bao-chi-01.JPG` — ảnh bài báo 1.
11. `images/bao-chi-02.JPG` — ảnh bài báo 2.
12. `images/og-anh-tu.JPG` — ảnh chia sẻ Facebook/Zalo, nên dùng 1200×630.

**Lưu ý:** Bạn từng yêu cầu tên ảnh giới thiệu là `chan-dung.jpg`. Trong bộ mã nguồn này file được dùng là `chan-dung.JPG` để đáp ứng yêu cầu đuôi `.JPG`. Hãy giữ đúng chữ hoa khi tải lên GitHub.

## 4. Mở website trên iPhone

### Cách đơn giản
1. Tải file ZIP về ứng dụng **Tệp (Files)**.
2. Chạm vào ZIP để iPhone tự giải nén.
3. Mở thư mục vừa giải nén.
4. Nhấn giữ `index.html` → **Chia sẻ** → mở bằng trình duyệt hoặc ứng dụng hỗ trợ xem HTML.

Safari trên iPhone có thể hạn chế một số chức năng khi mở trực tiếp file local. Cách ổn định nhất là upload lên GitHub Pages hoặc dùng ứng dụng chạy web server local như Kodex/Textastic.

## 5. Thay ảnh nghệ sĩ

1. Chuẩn bị ảnh JPG.
2. Đổi tên ảnh đúng theo danh sách ở mục 3.
3. Chép đè vào thư mục `images/`.
4. Không thay đổi phần mở rộng và chữ hoa/thường.
5. Ảnh nên được nén trước khi upload:
   - Hero: dưới 500 KB nếu có thể.
   - Gallery: 150–350 KB/ảnh.
   - Dùng WebP sẽ nhẹ hơn, nhưng khi đổi sang WebP phải sửa đường dẫn trong HTML/CSS.

## 6. Thay bài hát

Các bài hiện được phát từ YouTube.

Trong `index.html`, tìm:
- `u54UZOcwMfM` — ID video “Chỉ Còn Tình Yêu”.
- `Wemc37ra_a8` — ID video “Sợ Yêu”.

Để thêm bài:
1. Sao chép một khối `<article class="track reveal">...</article>`.
2. Thay tên bài, tác giả, năm phát hành.
3. Thay YouTube video ID trong `data-video-id`.
4. Thay URL YouTube và thumbnail:
   - `https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg`

Nếu muốn dùng file MP3 local, đặt file trong `music/`, rồi thêm:

```html
<audio controls preload="none">
  <source src="music/ten-bai-hat.mp3" type="audio/mpeg">
</audio>
```

## 7. Thay hoặc thêm video/MV

Trong phần `#mv`, sao chép một nút có class `video-card`.
Thay:
- `data-video-id="VIDEO_ID"`
- Thumbnail `https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg`
- Tên MV trong thẻ `<strong>`.

## 8. Thay email booking

Website đang dùng email placeholder:

`booking.anhtu@example.com`

Hãy thay ở **hai vị trí**:
1. Trong `index.html`, phần liên hệ.
2. Trong `js/script.js`, dòng:
   `const BOOKING_EMAIL = "booking.anhtu@example.com";`

Với `index-doc-lap.html`, tìm trực tiếp chuỗi email trên và thay toàn bộ.

Do GitHub Pages là hosting tĩnh, form không tự gửi vào cơ sở dữ liệu. Bản hiện tại mở ứng dụng email. Muốn nhận form tự động, có thể kết nối Formspree, Getform hoặc backend riêng.

## 9. Upload lên GitHub Pages

1. Đăng nhập GitHub.
2. Tạo repository mới, ví dụ: `anh-tu-official`.
3. Upload toàn bộ **nội dung bên trong thư mục** `website-ca-si-anh-tu`.
4. Vào **Settings → Pages**.
5. Trong **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. Nhấn **Save**.
7. Website sẽ có dạng:
   `https://TEN-TAI-KHOAN.github.io/anh-tu-official/`

Sau đó sửa trong `<head>` của `index.html`:
- `canonical`
- `og:url`

thành URL GitHub Pages thật.

## 10. Gắn tên miền riêng

1. Mua tên miền tại nhà cung cấp bạn chọn.
2. Trong GitHub repository → **Settings → Pages → Custom domain**.
3. Nhập tên miền, ví dụ `anhtusinger.com`.
4. Cấu hình DNS tại nhà cung cấp tên miền:

### Dùng tên miền gốc
Tạo 4 bản ghi A trỏ tới:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### Dùng www
Tạo CNAME:
- Host: `www`
- Value: `TEN-TAI-KHOAN.github.io`

5. Bật **Enforce HTTPS** sau khi DNS cập nhật.
6. Sửa `canonical` và `og:url` sang tên miền chính thức.

## 11. Chỉnh nội dung nhanh

Tìm trong `index.html` các cụm:
- `Anh Tư`
- `cập nhật`
- `placeholder`
- `booking.anhtu@example.com`
- `15 THÁNG 08 2026`
- `06 THÁNG 09 2026`

để thay tiểu sử, tác giả, năm phát hành, sự kiện và bài báo.

## 12. Kiểm tra trước khi công khai

- Mở website trên iPhone Safari, Android Chrome và máy tính.
- Kiểm tra menu, popup video, lightbox, form.
- Kiểm tra ảnh không vượt quá dung lượng cần thiết.
- Thay toàn bộ nội dung `cập nhật` và `placeholder`.
- Đảm bảo bạn có quyền sử dụng mọi hình ảnh, âm thanh và video đăng tải.
