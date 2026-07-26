(() => {
  "use strict";
  const $ = (s,p=document)=>p.querySelector(s);
  const $$ = (s,p=document)=>[...p.querySelectorAll(s)];
  const body=document.body;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

  const loader=$("#loader");
  const hideLoader=()=>loader?.classList.add("hidden");
  addEventListener("load",()=>setTimeout(hideLoader,350));
  setTimeout(hideLoader,2100);

  const progress=$("#progress"), header=$("#header"), back=$("#backTop");
  const updateScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress)progress.style.width=(max>0?scrollY/max*100:0)+"%";
    header?.classList.toggle("scrolled",scrollY>35);
    back?.classList.toggle("visible",scrollY>750);
  };
  updateScroll();
  addEventListener("scroll",updateScroll,{passive:true});
  back?.addEventListener("click",()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"}));

  // Reveal left/right/up
  const revealItems=$$(".reveal");
  revealItems.forEach((el,i)=>el.style.transitionDelay=`${Math.min((i%4)*65,195)}ms`);
  if("IntersectionObserver" in window&&!reduce){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:"0px 0px -50px"});
    revealItems.forEach(el=>io.observe(el));
  } else revealItems.forEach(el=>el.classList.add("visible"));

  // Hero parallax
  const heroImg=$(".hero__image");
  if(heroImg&&!reduce){
    let raf=false;
    addEventListener("scroll",()=>{
      if(raf)return;raf=true;
      requestAnimationFrame(()=>{
        heroImg.style.transform=`translate3d(0,${Math.min(scrollY*.1,80)}px,0) scale(1.04)`;
        raf=false;
      });
    },{passive:true});
  }

  // Mouse/touch drag for horizontal rails
  $$(".drag-track").forEach(track=>{
    let down=false,startX=0,startScroll=0,moved=false;
    const start=e=>{
      down=true;moved=false;track.classList.add("dragging");
      startX=(e.touches?e.touches[0].clientX:e.clientX);
      startScroll=track.scrollLeft;
    };
    const move=e=>{
      if(!down)return;
      const x=(e.touches?e.touches[0].clientX:e.clientX);
      const dist=x-startX;
      if(Math.abs(dist)>5)moved=true;
      track.scrollLeft=startScroll-dist*1.15;
      if(e.cancelable)e.preventDefault();
    };
    const end=()=>{down=false;track.classList.remove("dragging")};
    track.addEventListener("mousedown",start);
    track.addEventListener("mousemove",move);
    addEventListener("mouseup",end);
    track.addEventListener("touchstart",start,{passive:true});
    track.addEventListener("touchmove",move,{passive:false});
    track.addEventListener("touchend",end);
    track.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation()}},true);
  });

  // Video modal
  const modal=$("#videoModal"), frame=$("#videoFrame");
  let lastFocus=null;
  let activeVideoTrigger=null;

  const syncVideoButtonState=(button,isActive=false)=>{
    if(!button)return;
    button.classList.toggle("is-active",isActive);
    button.setAttribute("aria-pressed",isActive ? "true" : "false");
    const label=button.querySelector("[data-video-button-label]");
    if(label){
      label.textContent=isActive
        ? (button.dataset.activeLabel || "Dừng video")
        : (button.dataset.defaultLabel || "Phát video");
    }
  };

  const openVideo=(id,trigger)=>{
    if(!id)return;
    if(activeVideoTrigger && activeVideoTrigger !== trigger){
      syncVideoButtonState(activeVideoTrigger,false);
    }
    activeVideoTrigger=trigger || null;
    syncVideoButtonState(activeVideoTrigger,true);

    lastFocus=document.activeElement;
    frame.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="Video ca sĩ Anh Tư" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" allowfullscreen></iframe>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    body.classList.add("locked");
  };

  const closeVideo=()=>{
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    frame.innerHTML="";
    body.classList.remove("locked");
    syncVideoButtonState(activeVideoTrigger,false);
    activeVideoTrigger?.focus?.();
    activeVideoTrigger=null;
    lastFocus?.focus?.();
  };

  $$(".js-video").forEach(el=>el.addEventListener("click",()=>{
    if(activeVideoTrigger===el && modal.classList.contains("open")){
      closeVideo();
      return;
    }
    openVideo(el.dataset.videoId,el);
  }));
  $$("[data-close-video]").forEach(el=>el.addEventListener("click",closeVideo));

  // Lightbox
  const lightbox=$("#lightbox"), lightboxImg=$("#lightboxImage"), lightboxCaption=$("#lightboxCaption");
  const openLightbox=item=>{
    lastFocus=document.activeElement;
    lightboxImg.src=item.dataset.src||"";
    lightboxImg.alt=item.dataset.caption||"Ảnh Anh Tư";
    lightboxCaption.textContent=item.dataset.caption||"";
    lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");body.classList.add("locked");
  };
  const closeLightbox=()=>{
    lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");lightboxImg.src="";body.classList.remove("locked");lastFocus?.focus?.();
  };
  $$(".gallery-item").forEach(el=>el.addEventListener("click",()=>openLightbox(el)));
  $$("[data-close-lightbox]").forEach(el=>el.addEventListener("click",closeLightbox));

  addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    if(modal.classList.contains("open"))closeVideo();
    if(lightbox.classList.contains("open"))closeLightbox();
  });

  // Static forms
  const contact=$("#contactForm"), formStatus=$("#formStatus");
  const email="booking.anhtu@gmail.com"; // THAY EMAIL THẬT
  contact?.addEventListener("submit",e=>{
    e.preventDefault();
    const data=new FormData(contact);
    const name=String(data.get("name")||"").trim();
    const phone=String(data.get("phone")||"").trim();
    const eventType=String(data.get("eventType")||"").trim();
    const eventDate=String(data.get("eventDate")||"").trim();
    const eventLocation=String(data.get("location")||"").trim();
    const message=String(data.get("message")||"").trim();

    if(name.length<2||phone.replace(/\D/g,"").length<9||message.length<10){
      formStatus.textContent="Vui lòng nhập đầy đủ họ tên, số điện thoại và nội dung chương trình.";
      contact.querySelector(":invalid")?.focus();
      return;
    }

    const subject=encodeURIComponent(`Yêu cầu booking Anh Tư — ${name}`);
    const mailBody=encodeURIComponent([
      "YÊU CẦU BOOKING CA SĨ ANH TƯ",
      "",
      `Họ tên: ${name}`,
      `Số điện thoại: ${phone}`,
      `Loại chương trình: ${eventType || "Chưa chọn"}`,
      `Ngày dự kiến: ${eventDate || "Chưa xác định"}`,
      `Địa điểm: ${eventLocation || "Chưa xác định"}`,
      "",
      "Nội dung chương trình:",
      message
    ].join("\n"));

    formStatus.textContent="Đã kiểm tra thông tin. Đang mở ứng dụng email…";
    location.href=`mailto:${email}?subject=${subject}&body=${mailBody}`;
  });

  $("#newsletterForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    $("#newsletterMessage").textContent="Cảm ơn bạn! Chức năng nhận tin cần kết nối dịch vụ email khi website chính thức hoạt động.";
  });

  $$("[data-placeholder]").forEach(el=>el.addEventListener("click",e=>e.preventDefault()));
  $("#year").textContent=new Date().getFullYear();
})();


/* =========================================================
   V9 — floating ornaments, spotlight and soft 3D lift
   ========================================================= */
(() => {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer:fine)").matches;

  // Add three decorative floating shapes to every colored section.
  if (!reduce) {
    document.querySelectorAll(".section").forEach((section) => {
      if (section.querySelector(".float-orb")) return;
      for (let i = 1; i <= 3; i += 1) {
        const orb = document.createElement("span");
        orb.className = `float-orb float-orb--${i}`;
        orb.setAttribute("aria-hidden", "true");
        section.prepend(orb);
      }
    });
  }

  const liftTargets = document.querySelectorAll(
    ".playlist-shell,.video-card,.album-card,.gallery-item,.news-feature,.contact-form,.newsletter"
  );

  // Moving highlight and a restrained 3D tilt on desktop.
  liftTargets.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--spot-x", `${x}%`);
      card.style.setProperty("--spot-y", `${y}%`);

      if (!finePointer || reduce) return;
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 3.8;
      const rotateX = -((event.clientY - rect.top) / rect.height - 0.5) * 3.2;
      card.style.transform =
        `perspective(1100px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("transform");
      card.style.setProperty("--spot-x", "50%");
      card.style.setProperty("--spot-y", "40%");
    });
  });

  // Light scroll drift for section headings.
  if (!reduce) {
    const headings = [...document.querySelectorAll(".heading")];
    let ticking = false;

    const drift = () => {
      const viewportCenter = innerHeight * 0.5;
      headings.forEach((heading) => {
        if (!heading.classList.contains("visible")) return;
        const rect = heading.getBoundingClientRect();
        const distance = (rect.top + rect.height * 0.5 - viewportCenter) / innerHeight;
        const offset = Math.max(-9, Math.min(9, distance * -13));
        heading.style.translate = `0 ${offset}px`;
      });
      ticking = false;
    };

    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(drift);
    }, { passive: true });
    drift();
  }
})();


/* V10 — contact and booking depth interaction */
(() => {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer:fine)").matches;
  if (reduce || !fine) return;

  document.querySelectorAll(".booking-overview,.booking-card").forEach((panel) => {
    panel.addEventListener("pointermove", (event) => {
      const rect = panel.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = nx * 4.6;
      const rotateX = ny * -3.8;
      panel.style.transform =
        `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    panel.addEventListener("pointerleave", () => {
      panel.style.transform = "";
    });
  });

  const submit = document.querySelector(".booking-submit");
  submit?.addEventListener("pointermove", (event) => {
    const rect = submit.getBoundingClientRect();
    submit.style.setProperty("--button-x", `${event.clientX - rect.left}px`);
    submit.style.setProperty("--button-y", `${event.clientY - rect.top}px`);
  });
})();


/* V11 — Button ripple */
(() => {
  "use strict";
  document.querySelectorAll(".ds-btn,.btn,.header__action,.booking-submit").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      if (button.disabled || button.classList.contains("is-disabled")) return;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "ds-btn__ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 620);
    });
  });
})();


/* =========================================================
   V14 — Stage play button interactions
   ========================================================= */
(() => {
  "use strict";

  document.querySelectorAll(".stage-play").forEach((button) => {
    button.addEventListener("pointerdown", () => {
      button.classList.add("is-pressed");
      window.setTimeout(() => button.classList.remove("is-pressed"), 180);
    });

    button.addEventListener("click", () => {
      button.classList.add("is-playing");
      window.setTimeout(() => button.classList.remove("is-playing"), 900);
    });
  });

  document.querySelectorAll(".stage-cta").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty("--stage-x", `${x}%`);
      button.style.setProperty("--stage-y", `${y}%`);
    });
  });
})();


/* =========================================================
   V15 — Stage atmosphere injection and depth parallax
   ========================================================= */
(() => {
  "use strict";

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = matchMedia("(pointer:coarse)").matches;
  const surfaces = [...document.querySelectorAll(".hero, main > .section")];

  const createAtmosphere = (section, sectionIndex) => {
    if (section.querySelector(":scope > .stage-atmosphere")) return;

    const atmosphere = document.createElement("div");
    atmosphere.className = "stage-atmosphere";
    atmosphere.setAttribute("aria-hidden", "true");

    const wash = document.createElement("span");
    wash.className = "stage-atmosphere__wash";

    const beams = document.createElement("span");
    beams.className = "stage-atmosphere__beams";

    const fog = document.createElement("span");
    fog.className = "stage-atmosphere__fog";

    const floor = document.createElement("span");
    floor.className = "stage-atmosphere__floor";

    const glitter = document.createElement("span");
    glitter.className = "stage-atmosphere__glitter";

    if (!reducedMotion) {
      const count = coarsePointer ? 9 : 18;
      const seed = 19 + sectionIndex * 31;

      for (let i = 0; i < count; i += 1) {
        const spark = document.createElement("i");
        spark.className = "stage-spark";

        // Deterministic pseudo-random positions to keep layout stable.
        const x = (seed * (i + 3) * 17) % 96 + 2;
        const y = (seed * (i + 5) * 23) % 88 + 4;
        const size = 2 + ((seed + i * 7) % 4);
        const duration = 1.8 + ((seed + i * 5) % 20) / 10;
        const delay = -((seed + i * 11) % 35) / 10;
        const opacity = 0.45 + ((seed + i * 3) % 45) / 100;

        spark.style.setProperty("--spark-x", `${x}%`);
        spark.style.setProperty("--spark-y", `${y}%`);
        spark.style.setProperty("--spark-size", `${size}px`);
        spark.style.setProperty("--spark-duration", `${duration}s`);
        spark.style.setProperty("--spark-delay", `${delay}s`);
        spark.style.setProperty("--spark-opacity", opacity.toFixed(2));
        glitter.appendChild(spark);
      }
    }

    atmosphere.append(wash, beams, fog, floor, glitter);
    section.prepend(atmosphere);

    const divider = document.createElement("span");
    divider.className = "section-divider-glow";
    divider.setAttribute("aria-hidden", "true");
    section.appendChild(divider);
  };

  surfaces.forEach(createAtmosphere);

  // Mouse parallax for a richer 3D stage effect on desktop.
  if (!reducedMotion && matchMedia("(pointer:fine)").matches) {
    surfaces.forEach((section) => {
      const atmosphere = section.querySelector(".stage-atmosphere");
      if (!atmosphere) return;

      section.addEventListener("pointermove", (event) => {
        const rect = section.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;

        const wash = atmosphere.querySelector(".stage-atmosphere__wash");
        const beams = atmosphere.querySelector(".stage-atmosphere__beams");
        const floor = atmosphere.querySelector(".stage-atmosphere__floor");

        if (wash) {
          wash.style.translate = `${nx * 18}px ${ny * 13}px`;
        }
        if (beams) {
          beams.style.translate = `${nx * -12}px ${ny * -8}px`;
        }
        if (floor) {
          floor.style.translate = `${nx * 7}px ${ny * 4}px`;
        }
      });

      section.addEventListener("pointerleave", () => {
        atmosphere.querySelectorAll(
          ".stage-atmosphere__wash,.stage-atmosphere__beams,.stage-atmosphere__floor"
        ).forEach((layer) => {
          layer.style.translate = "";
        });
      });
    });
  }
})();


/* =========================================================
   V16 — Luxury header interactions
   ========================================================= */
(() => {
  "use strict";

  const header = document.querySelector(".header-v16");
  const menuButton = document.querySelector("#headerMenu");
  const mobileNav = document.querySelector("#mobileNav");
  const navLinks = [
    ...document.querySelectorAll(".nav-v16 a"),
    ...document.querySelectorAll(".mobile-nav-v16__links a")
  ];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeMobileNav = () => {
    menuButton?.classList.remove("active");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Mở menu");
    mobileNav?.classList.remove("open");
    mobileNav?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
  };

  menuButton?.addEventListener("click", () => {
    const opening = !mobileNav?.classList.contains("open");
    menuButton.classList.toggle("active", opening);
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening ? "Đóng menu" : "Mở menu");
    mobileNav?.classList.toggle("open", opening);
    mobileNav?.setAttribute("aria-hidden", String(!opening));
    document.body.classList.toggle("locked", opening);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileNav();
  });

  // Spotlight follows pointer, but only on pointer-precise devices.
  if (
    header &&
    !reduceMotion &&
    matchMedia("(pointer:fine)").matches
  ) {
    header.addEventListener("pointermove", (event) => {
      const rect = header.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      header.style.setProperty("--header-spot-x", `${x}%`);
      header.style.setProperty("--header-spot-y", `${y}%`);
    });

    header.addEventListener("pointerleave", () => {
      header.style.setProperty("--header-spot-x", "72%");
      header.style.setProperty("--header-spot-y", "25%");
    });
  }

  // Active navigation item based on visible section.
  const sectionIds = [
    "gioi-thieu",
    "am-nhac",
    "mv",
    "album",
    "hinh-anh",
    "tin-tuc",
    "lien-he"
  ];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-v16 a").forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, {
      rootMargin: "-38% 0px -54% 0px",
      threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
  }
})();


/* =========================================================
   V18 — Dark luxury tilt interactions
   ========================================================= */
(() => {
  "use strict";

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer:fine)").matches;

  if (reduced || !finePointer) return;

  const tiltSelectors = [
    ".playlist-shell",
    ".video-card",
    ".album-card",
    ".gallery-item",
    ".news-feature",
    ".news-item",
    ".about__image",
    ".contact-v13__panel"
  ];

  document.querySelectorAll(tiltSelectors.join(",")).forEach((card) => {
    card.style.transformStyle = "preserve-3d";
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const rotateY = x * 8;
      const rotateX = y * -8;

      const base = getComputedStyle(card).transform === "none" ? "" : "";
      card.style.transform = `${base} perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
})();


/* =========================================================
   V19 — Inject submerged music notes layer
   ========================================================= */
(() => {
  "use strict";
  const sections = [...document.querySelectorAll(".hero, main > .section")];

  sections.forEach((section) => {
    const atmosphere = section.querySelector(":scope > .stage-atmosphere");
    if (!atmosphere) return;

    if (!atmosphere.querySelector(".stage-atmosphere__notes")) {
      const notes = document.createElement("span");
      notes.className = "stage-atmosphere__notes";

      const pattern = atmosphere.querySelector(".stage-atmosphere__pattern");
      if (pattern) {
        atmosphere.insertBefore(notes, pattern.nextSibling);
      } else {
        atmosphere.prepend(notes);
      }
    }
  });
})();


/* V21 glow pointer interaction */
(()=>{
"use strict";
if(!matchMedia("(pointer:fine)").matches)return;
document.querySelectorAll(".playlist-shell,.gallery-item,.video-card,.album-card").forEach(el=>{
el.addEventListener("pointermove",e=>{
const r=el.getBoundingClientRect();
el.style.setProperty("--mx",((e.clientX-r.left)/r.width)*100+"%");
el.style.setProperty("--my",((e.clientY-r.top)/r.height)*100+"%");
});
});
})();

/* V22 subtle section reveal */
(()=>{
 const items=document.querySelectorAll(".section,.hero");
 const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
  if(e.isIntersecting){
   e.target.classList.add("v22-visible");
  }
 });
 },{
 threshold:.12
 });
 items.forEach(i=>observer.observe(i));
})();

/* V23 cinematic hero */
(()=>{
 const hero=document.querySelector('.hero');
 if(hero) hero.classList.add('v23-ready');
})();

/* V24 smooth compact reveal */
(()=>{
"use strict";

const sections=document.querySelectorAll(".hero,.section");

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(entry.isIntersecting){
     entry.target.style.opacity="1";
     entry.target.style.transform="translateY(0)";
   }
 });
},{threshold:.08});

sections.forEach(section=>{
 section.style.opacity="0.96";
 section.style.transition="opacity .5s ease, transform .6s ease";
 section.style.transform="translateY(8px)";
 observer.observe(section);
});
})();


/* V25 compact editorial scroll polish */
(()=>{
"use strict";
document.querySelectorAll(".section,.hero").forEach(el=>{
    el.style.scrollMarginTop="70px";
});
})();


  
  
  
  // V42 fixed multi-track website playlist
  const audioTimeV42 = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  $$("[data-premium-player]").forEach((deck) => {
    const section = deck.closest(".audio-v42");
    const audio = $(".audio-v37__audio", deck);
    const toggle = $("[data-player-toggle]", deck);
    const restart = $("[data-player-restart]", deck);
    const previous = $("[data-player-previous]", deck);
    const next = $("[data-player-next]", deck);
    const seek = $("[data-player-seek]", deck);
    const volume = $("[data-player-volume]", deck);
    const current = $("[data-player-current]", deck);
    const duration = $("[data-player-duration]", deck);
    const status = $("[data-player-status]", deck);
    const format = $("[data-player-format]", deck);
    const message = $("[data-player-message]", deck);
    const title = $("[data-player-title]", deck);
    const artist = $("[data-player-artist]", deck);
    const cover = $("[data-player-cover]", deck);
    const tracks = $$("[data-track]", section || document);

    if (
      !audio ||
      !toggle ||
      !seek ||
      !current ||
      !duration ||
      !tracks.length
    ) return;

    let activeIndex = 0;
    let sourceReady = false;
    let fallbackTried = false;
    let pendingAutoPlay = false;

    const showMessage = (text, type = "") => {
      if (!message) return;
      message.textContent = text;
      message.dataset.state = type;
    };

    const activeTrack = () => tracks[activeIndex];

    const trackData = (track) => ({
      title: track.dataset.trackTitle || "Bài hát Anh Tư",
      artist: track.dataset.trackArtist || "Anh Tư • Official Audio",
      src: track.dataset.trackSrc || "",
      fallback: track.dataset.trackFallback || "",
      cover: track.dataset.trackCover || "",
    });

    const updateActiveTrackUI = () => {
      tracks.forEach((track, index) => {
        const active = index === activeIndex;
        track.classList.toggle("is-active", active);
        track.setAttribute("aria-current", active ? "true" : "false");

        const action = $(".audio-v42__track-action", track);
        if (action) {
          action.classList.toggle(
            "is-playing",
            active && !audio.paused && !audio.ended
          );
        }
      });
    };

    const updatePlayerState = () => {
      const total = Number.isFinite(audio.duration) ? audio.duration : 0;
      const elapsed = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;

      seek.value = total > 0 ? (elapsed / total) * 100 : 0;
      current.textContent = audioTimeV42(elapsed);
      duration.textContent = audioTimeV42(total);

      const playing = !audio.paused && !audio.ended;
      deck.classList.toggle("is-playing", playing);

      if (status) {
        if (playing) status.textContent = "NOW PLAYING";
        else if (sourceReady) status.textContent = "READY TO PLAY";
      }

      updateActiveTrackUI();
    };

    const loadSource = (src, autoPlay) => {
      if (!src) {
        sourceReady = false;
        if (status) status.textContent = "AUDIO FILE NOT FOUND";
        showMessage("Bài hát chưa được gắn file MP3.", "error");
        deck.classList.add("has-audio-error");
        return;
      }

      sourceReady = false;
      pendingAutoPlay = autoPlay;
      deck.classList.remove("has-audio-error");

      const separator = src.includes("?") ? "&" : "?";
      audio.src = `${src}${separator}v=42`;
      audio.load();

      if (format) {
        format.textContent = src.toLowerCase().endsWith(".wav") ? "WAV" : "MP3";
      }

      if (status) status.textContent = "LOADING AUDIO";
      showMessage(`Đang tải ${activeTrack().dataset.trackTitle}…`, "loading");
    };

    const selectTrack = (index, autoPlay = true) => {
      if (index < 0 || index >= tracks.length) return;

      activeIndex = index;
      fallbackTried = false;

      const track = activeTrack();
      const data = trackData(track);

      if (title) title.textContent = data.title;
      if (artist) artist.textContent = data.artist;
      if (cover && data.cover) {
        cover.src = data.cover;
        cover.alt = `Ảnh đại diện ${data.title}`;
      }

      audio.pause();
      audio.currentTime = 0;
      updateActiveTrackUI();
      loadSource(data.src, autoPlay);
    };

    audio.addEventListener("loadedmetadata", async () => {
      sourceReady = true;
      deck.classList.remove("has-audio-error");

      if (status) status.textContent = "READY TO PLAY";
      showMessage(
        `${activeTrack().dataset.trackTitle} đã sẵn sàng.`,
        "success"
      );

      updatePlayerState();

      if (pendingAutoPlay) {
        pendingAutoPlay = false;
        try {
          await audio.play();
        } catch (error) {
          if (status) status.textContent = "READY TO PLAY";
          showMessage(
            "Bài hát đã được chọn. Chạm nút Play nếu Safari chưa tự phát.",
            "success"
          );
        }
      }
    });

    audio.addEventListener("canplay", () => {
      sourceReady = true;
      updatePlayerState();
    });

    audio.addEventListener("error", () => {
      const data = trackData(activeTrack());

      if (!fallbackTried && data.fallback) {
        fallbackTried = true;
        loadSource(data.fallback, pendingAutoPlay);
        return;
      }

      sourceReady = false;
      deck.classList.add("has-audio-error");

      if (status) status.textContent = "AUDIO FILE NOT FOUND";
      if (format) format.textContent = "LỖI FILE";

      showMessage(
        `Không tìm thấy file của bài “${data.title}”. Kiểm tra thư mục music.`,
        "error"
      );

      updatePlayerState();
    });

    toggle.addEventListener("click", async () => {
      try {
        if (!audio.src) {
          selectTrack(activeIndex, true);
          return;
        }

        if (audio.paused) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        deck.classList.add("has-audio-error");

        if (status) status.textContent = "PLAYBACK ERROR";

        showMessage(
          "Không thể phát bài hát. Kiểm tra định dạng MP3 và tên file trong thư mục music.",
          "error"
        );
      }

      updatePlayerState();
    });

    restart?.addEventListener("click", () => {
      audio.currentTime = 0;
      updatePlayerState();
    });

    previous?.addEventListener("click", () => {
      const index = (activeIndex - 1 + tracks.length) % tracks.length;
      selectTrack(index, true);
    });

    next?.addEventListener("click", () => {
      const index = (activeIndex + 1) % tracks.length;
      selectTrack(index, true);
    });

    seek.addEventListener("input", () => {
      const total = Number.isFinite(audio.duration) ? audio.duration : 0;
      if (!total) return;

      audio.currentTime = (Number(seek.value) / 100) * total;
      updatePlayerState();
    });

    volume?.addEventListener("input", () => {
      audio.volume = Number(volume.value);
    });

    tracks.forEach((track, index) => {
      track.addEventListener("click", () => {
        if (index === activeIndex && sourceReady) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
          return;
        }

        selectTrack(index, true);
      });
    });

    audio.addEventListener("timeupdate", updatePlayerState);
    audio.addEventListener("play", updatePlayerState);
    audio.addEventListener("pause", updatePlayerState);

    audio.addEventListener("ended", () => {
      const nextIndex = (activeIndex + 1) % tracks.length;
      selectTrack(nextIndex, true);
    });

    audio.volume = volume ? Number(volume.value) : 0.82;

    // Load first fixed track without autoplay.
    selectTrack(0, false);
  });
