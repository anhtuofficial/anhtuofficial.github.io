# WEBSITE CA SĨ ANH TƯ — FULL SOURCE V12

Bộ mã nguồn hoàn chỉnh, chạy trực tiếp bằng trình duyệt và sẵn sàng đưa lên GitHub Pages.

## Cấu trúc

```text
/
├── index.html
├── index-ban-tach-file.html
├── button-system-demo.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
├── music/
├── videos/
├── .nojekyll
├── CNAME.example.txt
└── README.md
```

## Nội dung website

- Hero toàn màn hình.
- Giới thiệu nghệ sĩ.
- Playlist và bài hát.
- MV YouTube.
- Album/release.
- Thư viện ảnh và lightbox.
- Tin tức và sự kiện.
- Contact & Booking 3D.
- Newsletter.
- Responsive hoàn chỉnh cho iPhone, tablet và desktop.

## Button Design System

Các nút chính dùng chung hệ thống:

```css
.ds-btn
.ds-btn--primary
.ds-btn--outline
.ds-btn--glass
.ds-btn--text
.ds-btn--sm
.ds-btn--lg
.ds-btn--full
```

Thông số:

- Chiều cao: 48px, 52px, 56px.
- Bo góc: 16px.
- Khoảng cách theo 8pt Grid.
- Transition: 250ms.
- Icon + Label + Arrow.
- Gradient cao cấp.
- Shadow + Glow.
- Responsive.
- Trạng thái Default, Hover, Active, Focus, Disabled.
- Ripple khi nhấn.

Mở `button-system-demo.html` để xem riêng toàn bộ hệ thống nút.

## Thông tin đã tích hợp

- Ca sĩ: Anh Tư
- Hotline/Zalo: 033.2023.909
- YouTube: https://youtube.com/@anhtu.singer
- Facebook: https://www.facebook.com/share/1BjugcaA9f/
- Chỉ Còn Tình Yêu: https://youtu.be/u54UZOcwMfM
- Sợ Yêu: https://youtu.be/Wemc37ra_a8

## Thay ảnh

Giữ đúng tên file và chữ hoa `.JPG`:

```text
images/anh-bia.JPG
images/chan-dung.JPG
images/bieu-dien-01.JPG
images/bieu-dien-02.JPG
images/phong-thu-01.JPG
images/doi-thuong-01.JPG
images/doi-thuong-02.JPG
images/su-kien-01.JPG
images/su-kien-02.JPG
images/bao-chi-01.JPG
images/bao-chi-02.JPG
images/og-anh-tu.JPG
```

## Thay email booking

Tìm chuỗi sau trong `index.html` và `js/script.js`:

```text
booking.anhtu@example.com
```

Thay bằng email thật.

## Upload GitHub Pages

1. Giải nén ZIP.
2. Upload trực tiếp toàn bộ file bên trong lên thư mục gốc repository.
3. Vào Settings → Pages.
4. Chọn Deploy from a branch.
5. Chọn `main` và `/ (root)`.
6. Lưu và chờ GitHub triển khai.

Không upload cả thư mục cha làm thư mục con.

## Gắn tên miền riêng

- Đổi nội dung `CNAME.example.txt` thành tên miền của bạn.
- Đổi tên file thành `CNAME`.
- Khai báo tên miền trong Settings → Pages → Custom domain.


## V13 — Luxury Buttons & Contact Logos
- Nút dùng bảng màu onyx, champagne, ruby và burgundy.
- Gradient sắc nét, tương phản cao và glow nhẹ.
- Icon CTA đổi sang SVG nét mảnh cao cấp.
- Contact chỉ còn nút logo chuyển hướng: Gọi điện, Zalo, Facebook, YouTube, Email.
- Không hiển thị username hoặc tên tài khoản.


## V14 — Luxury Stage Play

- Thay toàn bộ nút phát nhạc bằng nút dạng đĩa sân khấu 3D.
- Không dùng icon mũi tên trong nút Nghe nhạc.
- Nút Hero có biểu tượng nốt nhạc, equalizer và ánh sáng chạy ngang.
- Nút phát có vòng halo xoay, đĩa xoay, lõi champagne và hạt sáng lấp lánh.
- Background các khu vực âm nhạc được tăng chiều sâu bằng spotlight, sàn sân khấu và gradient chuyển màu.
- Trên mobile giảm kích thước; khi bật Reduce Motion sẽ tắt animation phụ.


## V15 — Stage Atmosphere

Toàn bộ màu nền từng mục đã được nâng cấp thành hệ sân khấu nhiều lớp:

- Gradient loang chuyển màu riêng cho từng section.
- Spotlight chuyển động.
- Sương sân khấu có màu.
- Sàn phản chiếu dạng perspective 3D.
- Hạt sáng lấp lánh với vị trí và nhịp khác nhau.
- Đường sáng phân tách giữa các section.
- Khung tiêu đề và card được nâng nổi bằng nhiều lớp shadow.
- Ánh bóng chạy qua các card lớn.
- Parallax theo con trỏ trên desktop.
- Trên iPhone số hạt sáng được giảm để giữ hiệu năng.
- Reduce Motion sẽ tắt các animation phụ.


## V16 — Luxury Stage Header

- Header nền kính nhiều lớp với onyx, burgundy, violet và champagne.
- Viền spectrum chuyển màu và ánh bóng quét ngang.
- Spotlight trong header phản ứng theo vị trí con trỏ.
- Logo có vòng orbit và hạt sáng.
- Menu desktop dạng pill nổi có số thứ tự.
- Tự đánh dấu mục đang xem.
- Nút phải được đổi thành “Đặt lịch diễn”.
- Không sử dụng dấu mũi tên.
- Nút booking dùng icon lịch có ngôi sao và equalizer chuyển động.
- Có menu mobile toàn màn hình với màu nền sân khấu.
- Tự tắt animation phụ khi bật Reduce Motion.


## V18 — Dark Mode Luxury

Thiết kế lại theo phong cách dark mode luxury:

- Tông màu chủ đạo: đen, xám đậm, đỏ sâu và xanh dương công nghệ.
- Font mới: Outfit + Sora.
- Nền nhiều lớp với glow đỏ / xanh.
- Hiệu ứng kính mờ, khối 3D nổi, glow và bóng đổ sâu.
- Layout bất đối xứng hơn ở About, Video, Album, Gallery, News.
- Phong cách bí ẩn, sang trọng, hiện đại và thiên công nghệ.
- Card có tilt nhẹ theo con trỏ trên desktop.
- Hero và các section có animation chuyển nền chậm.


## V19 — Dark Editorial

- Chuyển hướng thiết kế sang dark editorial cao cấp.
- Thu nhỏ khoảng cách giữa các section và các khối nội dung.
- Thêm lớp nốt nhạc chìm dưới nền ở các mục.
- Mục “Những khoảnh khắc đáng nhớ” được đổi màu sang tông editorial plum / midnight rose để nổi bật hơn.
- Watermark ca sĩ được làm tinh tế và chìm hơn.


## V20 — Dark Fashion Editorial

- Tiếp tục giảm khoảng trống giữa các section và giữa các khối nội dung.
- Làm mạch nội dung liền hơn bằng cách giảm padding, gap, margin-bottom.
- Đổi bảng màu toàn site sang đen, trắng, xanh dương đậm, đỏ sâu; bỏ sắc rượu/plum cũ.
- Khối playlist “Nghe Anh Tư ở đây” được đổi sang tông tech blue + deep red.
- Khối “Những khoảnh khắc đáng nhớ” được đổi sang tông dark editorial xanh dương đậm + đỏ sâu.
- Phong cách tổng thể sang hơn theo hướng fashion editorial hiện đại.


## V22 Dark Fashion Editorial Compact

- Thu nhỏ khoảng trống giữa toàn bộ section.
- Mỗi mục có bảng màu riêng.
- Hero: black + electric blue.
- About: white editorial.
- Music: navy technology.
- Video: cinema black + deep red.
- Gallery: midnight blue + deep red.
- Contact: black + neon blue.
- Phong cách fashion editorial cao cấp.


## V24 Ultra Compact

- Giảm mạnh khoảng cách giữa các section.
- Hero thấp hơn.
- Card và nội dung gọn hơn.
- Luồng cuộn liền mạch hơn.
- Giữ phong cách dark fashion editorial.


## V25 Ultra Tight Editorial Flow

- Thu hẹp mạnh padding-top và padding-bottom.
- Giảm margin-bottom giữa các section.
- Kéo gần Hero, About, Music, Gallery, Contact.
- Giảm khoảng trống giữa tiêu đề và nội dung.
- Giữ phong cách Dark Fashion Editorial.


## V26 Cover Image

- Hero đã sử dụng ảnh bìa nghệ sĩ.
- File ảnh cần đặt tại:
  images/anh-bia.JPG
- Ảnh hiển thị full screen với cinematic overlay.


## V27 — True Compact Sections

Bản này xử lý đúng nguyên nhân khoảng trống:

- Xóa `min-height` cũ của contact, video, gallery và news.
- Đổi `.hero__content` từ 100svh xuống 64–72svh tùy thiết bị.
- Không dùng margin âm để che khoảng trống.
- Card ảnh dùng `aspect-ratio`, chiều cao bám theo nội dung.
- Gỡ transform kéo card lệch làm section bị cao.
- Nền trang trí được ép `position:absolute` nên không chiếm chiều cao.


## V28 — Xóa khoảng trống đầu Hero

- Bỏ `justify-content:center` trong `.hero__content`.
- Bỏ toàn bộ `min-height` cưỡng bức của Hero trên điện thoại.
- Nội dung bắt đầu ngay dưới header cố định.
- Giảm khoảng cách phía trên, phía dưới và giữa các khối Hero.
- Ẩn vòng tròn trang trí lớn và nút cuộn dọc trên mobile.
- Giữ ảnh bìa phủ toàn bộ phần Hero.


## V29 — Tiêu đề sát đầu section

- Xóa `min-height` và chiều cao cưỡng bức của toàn bộ section còn lại.
- Đặt `padding-top: 0` cho About, Music, MV, Album, Gallery, News và Contact.
- Tiêu đề section bắt đầu ngay tại mép chuyển màu.
- Chỉ giữ khoảng cách nhỏ 5–9px giữa tiêu đề và nội dung.
- Xóa margin/padding thừa trong `.section-head`.
- Card, grid và danh sách đều dùng chiều cao tự động theo nội dung.


## V30 — Bỏ đánh số section

- Đã xóa hoàn toàn các số 01–07 khỏi cả hai file HTML.
- Đã xóa toàn bộ CSS dùng để định dạng số trang trí.
- Tiêu đề và bố cục section còn lại được giữ nguyên như V29.


## V31 — Xóa triệt để khoảng trống trước Vietnamese Vocalist

- Dùng selector ưu tiên cao để ghi đè các CSS Hero cũ.
- Bỏ hoàn toàn `display:flex`, `justify-content:center` và `min-height:100svh`.
- Dòng Vietnamese Vocalist bắt đầu ngay dưới thanh header.
- Tắt transform/reveal riêng của dòng đầu để tránh bị đẩy xuống.
- Thêm cache version V31 cho GitHub Pages.
