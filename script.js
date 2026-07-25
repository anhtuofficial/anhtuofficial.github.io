/* ==========================================================
   WEBSITE CA SĨ ANH TƯ
   Không dùng thư viện ngoài
   ========================================================== */

(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const body = document.body;
  const header = $("#siteHeader");
  const menuToggle = $("#menuToggle");
  const primaryNav = $("#primaryNav");
  const backToTop = $("#backToTop");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ===== Loader =====
  window.addEventListener("load", () => {
    window.setTimeout(() => $("#loader")?.classList.add("is-hidden"), 250);
  });

  // Fallback nếu tài nguyên ngoài tải chậm
  window.setTimeout(() => $("#loader")?.classList.add("is-hidden"), 2400);

  // ===== Mobile menu =====
  function closeMenu() {
    menuToggle?.classList.remove("is-active");
    primaryNav?.classList.remove("is-open");
    header?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Mở menu");
    body.classList.remove("is-locked");
  }

  menuToggle?.addEventListener("click", () => {
    const opening = !primaryNav.classList.contains("is-open");
    menuToggle.classList.toggle("is-active", opening);
    primaryNav.classList.toggle("is-open", opening);
    header.classList.toggle("is-open", opening);
    menuToggle.setAttribute("aria-expanded", String(opening));
    menuToggle.setAttribute("aria-label", opening ? "Đóng menu" : "Mở menu");
    body.classList.toggle("is-locked", opening);
  });

  $$("#primaryNav a").forEach(link => link.addEventListener("click", closeMenu));

  // ===== Scroll state + back to top =====
  function onScroll() {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 30);
    backToTop?.classList.toggle("is-visible", y > 650);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  // ===== Scroll reveal =====
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // ===== Active menu =====
  const sections = $$("main section[id]");
  const navLinks = $$("#primaryNav a");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // ===== Parallax nhẹ, tắt trên thiết bị giảm chuyển động =====
  const parallax = $("[data-parallax]");
  if (parallax && !reduceMotion) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.12, 70);
        parallax.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
        ticking = false;
      });
    }, { passive: true });
  }

  // ===== Video modal =====
  const videoModal = $("#videoModal");
  const videoFrame = $("#videoFrame");
  let lastFocusedElement = null;

  function openVideo(videoId) {
    if (!videoModal || !videoFrame || !videoId) return;
    lastFocusedElement = document.activeElement;
    videoFrame.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0"
        title="Video ca sĩ Anh Tư"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>`;
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    body.classList.add("is-locked");
    $(".modal__close", videoModal)?.focus();
  }

  function closeVideo() {
    if (!videoModal || !videoFrame) return;
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    videoFrame.innerHTML = "";
    body.classList.remove("is-locked");
    lastFocusedElement?.focus?.();
  }

  $$(".js-video").forEach(button => button.addEventListener("click", () => openVideo(button.dataset.videoId)));
  $$("[data-close-modal]").forEach(button => button.addEventListener("click", closeVideo));

  // ===== Gallery filter + lightbox =====
  const filterButtons = $$(".gallery-filter button");
  const galleryItems = $$(".gallery-item");
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCaption = $("#lightboxCaption");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("is-active", item === button));
      galleryItems.forEach(item => {
        item.classList.toggle("is-hidden", filter !== "all" && item.dataset.category !== filter);
      });
    });
  });

  function openLightbox(item) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lastFocusedElement = document.activeElement;
    lightboxImage.src = item.dataset.src || "";
    lightboxImage.alt = item.dataset.alt || "Ảnh ca sĩ Anh Tư";
    lightboxCaption.textContent = item.dataset.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("is-locked");
    $(".lightbox__close", lightbox)?.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    body.classList.remove("is-locked");
    lastFocusedElement?.focus?.();
  }

  galleryItems.forEach(item => item.addEventListener("click", () => openLightbox(item)));
  $$("[data-close-lightbox]").forEach(button => button.addEventListener("click", closeLightbox));

  // ESC để đóng popup
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (videoModal?.classList.contains("is-open")) closeVideo();
    if (lightbox?.classList.contains("is-open")) closeLightbox();
    if (primaryNav?.classList.contains("is-open")) closeMenu();
  });

  // ===== Placeholder links: chặn nhảy về đầu trang =====
  $$("[data-placeholder-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      link.animate?.(
        [{ opacity: 1 }, { opacity: .45 }, { opacity: 1 }],
        { duration: 360 }
      );
    });
  });

  // ===== Booking form cho GitHub Pages =====
  const bookingForm = $("#bookingForm");
  const formStatus = $("#formStatus");
  const BOOKING_EMAIL = "booking.anhtu@example.com"; // THAY EMAIL THẬT TẠI ĐÂY

  function setFieldError(input, message = "") {
    const field = input.closest(".field");
    field?.classList.toggle("is-invalid", Boolean(message));
    const error = $(".field-error", field);
    if (error) error.textContent = message;
  }

  bookingForm?.addEventListener("submit", event => {
    event.preventDefault();

    const fullName = $("#fullName")?.value.trim() || "";
    const phone = $("#phone")?.value.trim() || "";
    const message = $("#message")?.value.trim() || "";
    const phoneDigits = phone.replace(/\D/g, "");

    setFieldError($("#fullName"), fullName.length < 2 ? "Vui lòng nhập họ tên." : "");
    setFieldError($("#phone"), phoneDigits.length < 9 ? "Vui lòng nhập số điện thoại hợp lệ." : "");
    setFieldError($("#message"), message.length < 10 ? "Vui lòng mô tả yêu cầu tối thiểu 10 ký tự." : "");

    if (fullName.length < 2 || phoneDigits.length < 9 || message.length < 10) {
      if (formStatus) formStatus.textContent = "Vui lòng kiểm tra lại các trường thông tin.";
      $(".field.is-invalid input, .field.is-invalid textarea")?.focus();
      return;
    }

    const subject = encodeURIComponent(`Yêu cầu booking ca sĩ Anh Tư — ${fullName}`);
    const bodyText = [
      "YÊU CẦU BOOKING CA SĨ ANH TƯ",
      "",
      `Họ tên: ${fullName}`,
      `Số điện thoại: ${phone}`,
      "",
      "Nội dung:",
      message
    ].join("\n");
    const mailto = `mailto:${BOOKING_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

    if (formStatus) formStatus.textContent = "Đang mở ứng dụng email trên thiết bị của bạn…";
    window.location.href = mailto;
  });

  // ===== Năm copyright =====
  const year = $("#currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();


/* ==========================================================
   V4 — interaction polish (progress, ripple, magnetic hover)
   ========================================================== */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Thanh tiến trình đọc ở mép trên.
  const progress = document.createElement("div");
  progress.className = "site-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  let progressTicking = false;
  const updateProgress = () => {
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(Math.max(window.scrollY / max, 0), 1);
    progress.style.transform = `scaleX(${ratio})`;
    progressTicking = false;
  };
  window.addEventListener("scroll", () => {
    if (progressTicking) return;
    progressTicking = true;
    requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();

  // Delay nhẹ theo nhóm giúp các nội dung hiện lần lượt, không dồn cùng lúc.
  document.querySelectorAll(".tracks, .video-grid, .masonry-grid, .event-list, .press-grid").forEach(group => {
    [...group.querySelectorAll(".reveal")].forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 85, 340)}ms`);
    });
  });

  // Ripple phản hồi khi chạm/click nút.
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("pointerdown", event => {
      if (reduceMotion) return;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    });
  });

  if (!finePointer || reduceMotion) return;

  // Ánh sáng mềm đi theo con trỏ trên desktop; tự tắt trên iPhone/tablet.
  const aura = document.createElement("div");
  aura.className = "cursor-aura";
  aura.setAttribute("aria-hidden", "true");
  document.body.appendChild(aura);

  let targetX = innerWidth / 2;
  let targetY = innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let auraFrame = 0;

  const animateAura = () => {
    currentX += (targetX - currentX) * .13;
    currentY += (targetY - currentY) * .13;
    aura.style.left = `${currentX}px`;
    aura.style.top = `${currentY}px`;
    auraFrame = requestAnimationFrame(animateAura);
  };

  window.addEventListener("pointermove", event => {
    targetX = event.clientX;
    targetY = event.clientY;
    aura.classList.add("is-visible");
    if (!auraFrame) auraFrame = requestAnimationFrame(animateAura);
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => aura.classList.remove("is-visible"));

  // Magnetic hover rất nhẹ cho CTA, không làm rung layout.
  document.querySelectorAll(".btn").forEach(button => {
    button.classList.add("magnetic");
    button.addEventListener("pointermove", event => {
      const rect = button.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      button.style.transform = `translate3d(${dx * .08}px, ${dy * .1 - 4}px, 0) scale(1.018)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
})();
