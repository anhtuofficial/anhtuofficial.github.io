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


  
  
  
  
  
  // V46 independent fixed-playlist controller
  (() => {
    "use strict";

    const q = (selector, parent = document) => parent.querySelector(selector);
    const qa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

    const formatAudioTime = (seconds) => {
      if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    qa("[data-premium-player]").forEach((deck) => {
      const section = deck.closest(".audio-v45");
      const audio = q(".audio-v37__audio", deck);
      const toggle = q("[data-player-toggle]", deck);
      const restart = q("[data-player-restart]", deck);
      const previous = q("[data-player-previous]", deck);
      const next = q("[data-player-next]", deck);
      const seek = q("[data-player-seek]", deck);
      const volume = q("[data-player-volume]", deck);
      const current = q("[data-player-current]", deck);
      const duration = q("[data-player-duration]", deck);
      const status = q("[data-player-status]", deck);
      const format = q("[data-player-format]", deck);
      const message = q("[data-player-message]", deck);
      const title = q("[data-player-title]", deck);
      const artist = q("[data-player-artist]", deck);
      const cover = q("[data-player-cover]", deck);
      const tracks = qa("[data-track]", section || document);

      if (
        !audio ||
        !toggle ||
        !seek ||
        !current ||
        !duration ||
        tracks.length === 0
      ) {
        return;
      }

      let activeIndex = 0;
      let sourceSerial = 0;

      const showMessage = (text, state = "") => {
        if (!message) return;
        message.textContent = text;
        message.dataset.state = state;
      };

      const getTrack = (index) => {
        const element = tracks[index];
        return {
          element,
          title: element?.dataset.trackTitle || "Bài hát Anh Tư",
          artist: element?.dataset.trackArtist || "Anh Tư • Official Audio",
          src: element?.dataset.trackSrc || "",
          cover: element?.dataset.trackCover || "",
        };
      };

      const resolveAudioUrl = (relativePath) => {
        const url = new URL(relativePath, document.baseURI);
        url.searchParams.set("v", "46");
        return url.href;
      };

      const updateTrackButtons = () => {
        const isPlaying = !audio.paused && !audio.ended;

        tracks.forEach((trackButton, index) => {
          const active = index === activeIndex;
          const playing = active && isPlaying;

          trackButton.classList.toggle("is-active", active);
          trackButton.classList.toggle("is-playing", playing);
          trackButton.setAttribute("aria-current", active ? "true" : "false");

          const action = q(".audio-v42__track-action", trackButton);
          action?.classList.toggle("is-playing", playing);
        });
      };

      const updatePlayer = () => {
        const total = Number.isFinite(audio.duration) ? audio.duration : 0;
        const elapsed = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;

        seek.value = total > 0 ? String((elapsed / total) * 100) : "0";
        current.textContent = formatAudioTime(elapsed);
        duration.textContent = formatAudioTime(total);

        const playing = !audio.paused && !audio.ended;
        deck.classList.toggle("is-playing", playing);

        if (status) {
          if (playing) {
            status.textContent = "NOW PLAYING";
          } else if (audio.error) {
            status.textContent = "AUDIO FILE ERROR";
          } else {
            status.textContent = "READY TO PLAY";
          }
        }

        updateTrackButtons();
      };

      const applyTrackMeta = (track) => {
        if (title) title.textContent = track.title;
        if (artist) artist.textContent = track.artist;

        if (cover && track.cover) {
          cover.src = track.cover;
          cover.alt = `Ảnh đại diện ${track.title}`;
        }

        if (format) {
          format.textContent = track.src.toLowerCase().endsWith(".wav")
            ? "WAV"
            : "MP3";
        }
      };

      const loadTrack = (index) => {
        if (index < 0 || index >= tracks.length) return null;

        activeIndex = index;
        sourceSerial += 1;

        const track = getTrack(index);
        audio.pause();
        audio.currentTime = 0;
        applyTrackMeta(track);
        updateTrackButtons();

        if (!track.src) {
          showMessage(`Bài “${track.title}” chưa có file âm thanh.`, "error");
          return null;
        }

        const resolvedSource = resolveAudioUrl(track.src);
        audio.src = resolvedSource;
        audio.load();

        if (status) status.textContent = "LOADING AUDIO";
        showMessage(`Đang tải ${track.title}…`, "loading");
        updatePlayer();

        return {
          serial: sourceSerial,
          track,
        };
      };

      const playCurrentTrack = async () => {
        const track = getTrack(activeIndex);

        try {
          await audio.play();
          showMessage(`Đang phát ${track.title}.`, "success");
        } catch (error) {
          if (error?.name === "NotAllowedError") {
            showMessage(
              `Đã chọn ${track.title}. Chạm nút Play để Safari cho phép phát.`,
              "error"
            );
          } else {
            showMessage(
              `Không thể phát ${track.title}. Kiểm tra file ${track.src}.`,
              "error"
            );
          }
        }

        updatePlayer();
      };

      const selectAndPlay = async (index) => {
        const loaded = loadTrack(index);
        if (!loaded) return;

        /*
         * play() is called in the same user interaction as the track click.
         * This prevents Safari/iPhone from treating it as autoplay.
         */
        await playCurrentTrack();
      };

      tracks.forEach((trackButton, index) => {
        trackButton.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (index === activeIndex && audio.currentSrc) {
            if (audio.paused) {
              await playCurrentTrack();
            } else {
              audio.pause();
              updatePlayer();
            }
            return;
          }

          await selectAndPlay(index);
        });
      });

      toggle.addEventListener("click", async (event) => {
        event.preventDefault();

        if (!audio.currentSrc) {
          loadTrack(activeIndex);
        }

        if (audio.paused) {
          await playCurrentTrack();
        } else {
          audio.pause();
          updatePlayer();
        }
      });

      restart?.addEventListener("click", async (event) => {
        event.preventDefault();
        audio.currentTime = 0;
        await playCurrentTrack();
      });

      previous?.addEventListener("click", async (event) => {
        event.preventDefault();
        const index = (activeIndex - 1 + tracks.length) % tracks.length;
        await selectAndPlay(index);
      });

      next?.addEventListener("click", async (event) => {
        event.preventDefault();
        const index = (activeIndex + 1) % tracks.length;
        await selectAndPlay(index);
      });

      seek.addEventListener("input", () => {
        const total = Number.isFinite(audio.duration) ? audio.duration : 0;
        if (total <= 0) return;

        audio.currentTime = (Number(seek.value) / 100) * total;
        updatePlayer();
      });

      volume?.addEventListener("input", () => {
        audio.volume = Number(volume.value);
      });

      audio.addEventListener("loadstart", () => {
        if (status) status.textContent = "LOADING AUDIO";
      });

      audio.addEventListener("loadedmetadata", () => {
        const track = getTrack(activeIndex);
        showMessage(`${track.title} đã sẵn sàng.`, "success");
        updatePlayer();
      });

      audio.addEventListener("canplay", updatePlayer);
      audio.addEventListener("durationchange", updatePlayer);
      audio.addEventListener("timeupdate", updatePlayer);
      audio.addEventListener("play", updatePlayer);
      audio.addEventListener("pause", updatePlayer);

      audio.addEventListener("error", () => {
        const track = getTrack(activeIndex);

        if (status) status.textContent = "AUDIO FILE ERROR";

        showMessage(
          `Không đọc được ${track.src}. Hãy kiểm tra file đã được tải lên GitHub đúng thư mục music.`,
          "error"
        );

        updatePlayer();
      });

      audio.addEventListener("ended", async () => {
        const index = (activeIndex + 1) % tracks.length;
        await selectAndPlay(index);
      });

      audio.volume = volume ? Number(volume.value) : 0.82;

      // Load the first track without autoplay.
      loadTrack(0);
      showMessage(
        "Bài hát đầu tiên đã sẵn sàng. Chọn một bài hoặc nhấn Play.",
        "success"
      );
      updatePlayer();
    });
  })();
