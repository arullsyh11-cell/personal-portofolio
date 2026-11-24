/**
 * ==============================================================================
 * PORTFOLIO APPLICATION LOGIC (app.js)
 * ==============================================================================
 * Mengelola rendering data dinamis dari data.js, interaktivitas clipboard,
 * filter kategori proyek, interactive 3D stacked showcase (scroll/swipe/click),
 * modal detail aksesibel, serta floating quick-contact pill.
 * ==============================================================================
 */

// Tandai dukungan JavaScript pada <html> agar reveal tersembunyi hanya saat JS aktif (No-JS tetap terlihat penuh)
document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
  if (typeof portfolioData === "undefined") {
    console.error("portfolioData tidak ditemukan. Pastikan data.js dimuat sebelum app.js.");
    return;
  }

  initBrandAndNav();
  initHeroSection();
  initProjectsSection();
  initAboutSection();
  initSkillsSection();
  initExperienceSection();
  initContactSection();
  initFloatingContact();
  initScrollSpy();
  initModalListeners();
  initNavbarScroll();
  initCardSpotlight();
  initInteractiveBackground();
  initScrollChoreography();
});

/* ==============================================================================
   SVG ICONS REGISTRY (Semantic & Accessible)
   ============================================================================== */
const icons = {
  github: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`,
  linkedin: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
  twitter: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>`,
  mail: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`,
  whatsapp: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>`,
  copy: `<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`,
  check: `<svg class="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  externalLink: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  arrowDown: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`,
  info: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  close: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  layers: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  chevronLeft: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
  chevronRight: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  expand: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>`,
};

/* ==============================================================================
   TOAST HELPER
   ============================================================================== */
function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast-notice";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* ==============================================================================
   1. BRAND & NAVIGATION (Liquid Glass Capsule - Mobile & Desktop Unified)
   ============================================================================== */
let isManualScroll = false;
let manualScrollTimer = null;

function setActiveNavLink(targetHref) {
  const links = document.querySelectorAll(".nav-pill-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === targetHref) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function initBrandAndNav() {
  const monogram = portfolioData.personal.monogram || "A";
  const monogramEl = document.getElementById("nav-monogram-text");
  if (monogramEl) {
    monogramEl.textContent = monogram;
  }

  // Navigation Links (Visible on Mobile & Desktop as requested in Gambar 7)
  const navContainer = document.getElementById("nav-links-desktop");
  if (navContainer) {
    navContainer.innerHTML = portfolioData.navigation
      .map(
        (item, idx) => `
        <a href="${item.href}" class="nav-pill-link ${idx === 0 ? "active" : ""} text-[11px] sm:text-[13px] font-medium px-2 sm:px-3.5 py-1.5 rounded-full transition-colors duration-150 focus-visible:outline-none">
          ${item.label}
        </a>
      `
      )
      .join("");

    navContainer.querySelectorAll(".nav-pill-link").forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          setActiveNavLink(href);
          isManualScroll = true;
          clearTimeout(manualScrollTimer);
          manualScrollTimer = setTimeout(() => {
            isManualScroll = false;
          }, 850);
        }
      });
    });
  }

  // Desktop Email Pill Button
  const emailPillBtn = document.getElementById("nav-email-pill-btn");
  const emailDisplay = document.getElementById("nav-email-text");
  const userEmail = portfolioData.personal.email || "arullsyh11@gmail.com";

  if (emailDisplay) {
    emailDisplay.textContent = userEmail;
  }

  if (emailPillBtn) {
    emailPillBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(userEmail)
        .then(() => {
          const originalHTML = emailPillBtn.innerHTML;
          emailPillBtn.innerHTML = `${icons.check} <span class="font-sans text-xs sm:text-[13px] text-emerald-300 font-semibold ml-1">Copied!</span>`;
          showToast("Email address copied to clipboard!");
          setTimeout(() => {
            emailPillBtn.innerHTML = originalHTML;
          }, 2000);
        })
        .catch(() => {
          window.location.href = `mailto:${userEmail}`;
        });
    });
  }
}

/* ==============================================================================
   2. HERO SECTION
   ============================================================================== */
function initHeroSection() {
  const hero = portfolioData.hero;

  const statusEl = document.getElementById("hero-status-pill");
  if (statusEl) {
    statusEl.innerHTML = `
      <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 shrink-0"></span>
      <span class="font-sans text-xs font-medium tracking-tight text-slate-300">${hero.statusBadge}</span>
    `;
  }

  const headlineEl = document.getElementById("hero-headline");
  if (headlineEl) {
    headlineEl.textContent = hero.headline;
  }

  const subheadlineEl = document.getElementById("hero-subheadline");
  if (subheadlineEl) {
    subheadlineEl.textContent = hero.subheadline;
  }

  const ctaBtn = document.getElementById("hero-secondary-cta");
  if (ctaBtn && hero.ctaButton) {
    ctaBtn.href = hero.ctaButton.href;
    ctaBtn.innerHTML = `
      <span>${hero.ctaButton.label}</span>
      <span class="ml-1 text-slate-400 group-hover:text-white transition-transform duration-150 group-hover:translate-y-0.5">
        ${icons.arrowDown}
      </span>
    `;

    ctaBtn.addEventListener("click", () => {
      setActiveNavLink(hero.ctaButton.href);
      isManualScroll = true;
      clearTimeout(manualScrollTimer);
      manualScrollTimer = setTimeout(() => {
        isManualScroll = false;
      }, 850);
    });
  }

  const microNoteEl = document.getElementById("hero-micro-note");
  if (microNoteEl && hero.microNote) {
    microNoteEl.textContent = hero.microNote;
  }
}

/* ==============================================================================
   3. PROJECTS SECTION (EDITORIAL SPLIT-ROW, SCROLL REVEAL & SLIDING FILTER PILL)
   ============================================================================== */
let activeCategory = "All";
let lightboxListenersBound = false;
let lastLightboxTrigger = null;
let filterBarInitialized = false;
let projectRevealObserver = null;
let filterTransitionToken = 0;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isNonEmptyUrl(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

function getCuratedVisibleProjects() {
  const allProjects = Array.isArray(portfolioData.projects) ? portfolioData.projects : [];
  return allProjects
    .filter((p) => p.visible === true)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

function openProjectLightbox(src, title, alt, triggerEl) {
  const lightbox = document.getElementById("project-lightbox");
  const img = document.getElementById("project-lightbox-img");
  const titleEl = document.getElementById("project-lightbox-title");
  const closeBtn = document.getElementById("project-lightbox-close");
  if (!lightbox || !img) return;

  lastLightboxTrigger = triggerEl || document.activeElement;
  img.src = src;
  img.alt = alt || title || "Full size 3D render";
  if (titleEl) titleEl.textContent = title || "";

  lightbox.classList.remove("hidden");
  lightbox.classList.add("flex");
  document.body.style.overflow = "hidden";

  if (closeBtn) closeBtn.focus();
}

function closeProjectLightbox() {
  const lightbox = document.getElementById("project-lightbox");
  if (!lightbox || lightbox.classList.contains("hidden")) return;

  lightbox.classList.add("hidden");
  lightbox.classList.remove("flex");
  document.body.style.overflow = "";

  if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === "function") {
    lastLightboxTrigger.focus();
    lastLightboxTrigger = null;
  }
}

function initProjectLightbox() {
  if (lightboxListenersBound) return;
  lightboxListenersBound = true;

  const lightbox = document.getElementById("project-lightbox");
  const closeBtn = document.getElementById("project-lightbox-close");
  const gridContainer = document.getElementById("projects-grid");

  // Pastikan lightbox berada di root body agar tidak tertutup stacking context .site-content
  if (lightbox && lightbox.parentElement !== document.body) {
    document.body.appendChild(lightbox);
  }

  if (gridContainer) {
    gridContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lightbox-src]");
      if (!btn) return;
      openProjectLightbox(
        btn.getAttribute("data-lightbox-src"),
        btn.getAttribute("data-lightbox-title"),
        btn.getAttribute("data-lightbox-alt"),
        btn
      );
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!e.target.closest("#project-lightbox-img") && !e.target.closest("#project-lightbox-close")) {
        closeProjectLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.classList.contains("hidden")) {
      closeProjectLightbox();
    }
  });
}

/**
 * Mengukur posisi & lebar tombol filter aktif lalu menggeser pill putih secara mulus
 */
function updateFilterPillPosition(immediate = false) {
  const filterContainer = document.getElementById("project-category-filters");
  const pill = document.getElementById("filter-active-pill");
  if (!filterContainer || !pill) return;

  const activeBtn = filterContainer.querySelector('.category-filter-btn[aria-pressed="true"]');
  if (!activeBtn) return;

  if (immediate || prefersReducedMotion()) {
    pill.classList.add("no-transition");
  }

  pill.style.width = `${activeBtn.offsetWidth}px`;
  pill.style.transform = `translate3d(${activeBtn.offsetLeft}px, 0, 0)`;
  pill.classList.add("is-ready");

  if (immediate && !prefersReducedMotion()) {
    void pill.offsetWidth;
    pill.classList.remove("no-transition");
  }
}

/**
 * Memicu animasi scroll reveal pada satu baris project lalu melepaskan observer (berjalan sekali)
 */
function revealProjectRow(row) {
  if (!row || row.dataset.revealed === "true") return;
  row.dataset.revealed = "true";

  const targets = row.querySelectorAll(".reveal");
  if (prefersReducedMotion()) {
    targets.forEach((el) => {
      el.classList.add("is-visible", "is-settled");
    });
    return;
  }

  // Double RAF memastikan browser sempat mengecat state awal (opacity 0) sebelum transisi berjalan lembut
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      targets.forEach((el) => {
        el.classList.add("is-visible");
        const onDone = (ev) => {
          if (ev.target !== el) return;
          el.classList.add("is-settled");
          el.removeEventListener("transitionend", onDone);
        };
        el.addEventListener("transitionend", onDone);
      });
    });
  });
}

/**
 * Mengamati baris-baris project yang baru dirender menggunakan IntersectionObserver one-shot
 */
function observeProjectRows() {
  const gridContainer = document.getElementById("projects-grid");
  if (!gridContainer) return;

  const rows = Array.from(gridContainer.querySelectorAll("article.project-split-row"));
  if (rows.length === 0) return;

  if (projectRevealObserver) {
    projectRevealObserver.disconnect();
    projectRevealObserver = null;
  }

  if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
    rows.forEach((row) => revealProjectRow(row));
    return;
  }

  projectRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealProjectRow(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  rows.forEach((row) => {
    projectRevealObserver.observe(row);
  });
}

function initProjectsSection() {
  renderProjectCategoryFilters();
  renderProjectCards();
  initProjectLightbox();
}

function updateFilterButtonStates() {
  const filterContainer = document.getElementById("project-category-filters");
  if (!filterContainer) return;

  const buttons = Array.from(filterContainer.querySelectorAll(".category-filter-btn"));
  buttons.forEach((btn) => {
    const isActive = btn.getAttribute("data-category") === activeCategory;
    btn.setAttribute("aria-pressed", String(isActive));
    btn.classList.toggle("is-active", isActive);
  });
}

function switchProjectCategory(nextCategory) {
  if (nextCategory === activeCategory) return;
  activeCategory = nextCategory;

  updateFilterButtonStates();
  updateFilterPillPosition(false);

  const gridContainer = document.getElementById("projects-grid");
  if (!gridContainer) return;

  const myToken = ++filterTransitionToken;

  if (prefersReducedMotion()) {
    renderProjectCards();
    return;
  }

  const currentRows = Array.from(gridContainer.querySelectorAll("article.project-split-row"));
  if (currentRows.length === 0) {
    renderProjectCards();
    return;
  }

  // Fade out hanya baris yang tidak cocok selama 200ms sebelum diganti tanpa lompatan layout
  const nonMatchingRows =
    nextCategory === "All"
      ? []
      : currentRows.filter((row) => row.getAttribute("data-project-category") !== nextCategory);

  if (nonMatchingRows.length === 0) {
    // Kategori baru menambahkan baris (mis. Frontend -> All): pertahankan tinggi lalu render & reveal baris baru
    const lockedHeight = gridContainer.offsetHeight;
    gridContainer.style.minHeight = `${lockedHeight}px`;
    renderProjectCards();
    window.requestAnimationFrame(() => {
      if (myToken !== filterTransitionToken) return;
      gridContainer.style.minHeight = "";
    });
    return;
  }

  const lockedHeight = gridContainer.offsetHeight;
  gridContainer.style.minHeight = `${lockedHeight}px`;

  nonMatchingRows.forEach((row) => {
    row.classList.add("is-exiting");
  });

  window.setTimeout(() => {
    if (myToken !== filterTransitionToken) return;
    renderProjectCards();
    window.requestAnimationFrame(() => {
      if (myToken !== filterTransitionToken) return;
      gridContainer.style.minHeight = "";
    });
  }, 200);
}

function renderProjectCategoryFilters() {
  const filterContainer = document.getElementById("project-category-filters");
  if (!filterContainer) return;

  if (!filterBarInitialized) {
    filterBarInitialized = true;
    const categories = portfolioData.projectCategories || ["All", "Frontend", "3D"];

    filterContainer.innerHTML = `
      <span id="filter-active-pill" class="filter-active-pill" aria-hidden="true"></span>
      ${categories
        .map((cat) => {
          const isActive = cat === activeCategory;
          return `
            <button
              type="button"
              data-category="${escapeHtml(cat)}"
              class="category-filter-btn ${isActive ? "is-active" : ""} focus-visible:outline-none"
              aria-pressed="${isActive}">
              ${escapeHtml(cat)}
            </button>
          `;
        })
        .join("")}
    `;

    const buttons = Array.from(filterContainer.querySelectorAll(".category-filter-btn"));
    buttons.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        const nextCategory = btn.getAttribute("data-category") || "All";
        switchProjectCategory(nextCategory);
      });

      btn.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          const dir = e.key === "ArrowRight" ? 1 : -1;
          const nextIdx = (idx + dir + buttons.length) % buttons.length;
          const targetBtn = buttons[nextIdx];
          if (targetBtn) {
            targetBtn.focus();
            switchProjectCategory(targetBtn.getAttribute("data-category") || "All");
          }
        }
      });
    });

    window.addEventListener("resize", () => updateFilterPillPosition(true), { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updateFilterPillPosition(true));
    }

    updateFilterPillPosition(true);
  } else {
    updateFilterButtonStates();
    updateFilterPillPosition(false);
  }
}

/**
 * Menghasilkan tombol aksi per proyek:
 * - Frontend: Live Demo (primary) jika URL tersedia
 * - 3D: View Full Image (membuka lightbox dengan gambar yang sama)
 */
function renderProjectRowActionsHTML(project, imageSrc, imageAlt) {
  const hasDemo = isNonEmptyUrl(project.demoUrl);
  const is3D = project.category === "3D" && Boolean(imageSrc);

  if (!hasDemo && !is3D) return "";

  const demoBtnHTML = hasDemo
    ? `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer"
          class="btn-tap-target inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-[#08080A] font-sans font-semibold text-xs transition-colors focus-visible:outline-none"
          aria-label="Buka Live Demo ${escapeHtml(project.title)}">
        <span>Live Demo</span>
        ${icons.externalLink}
      </a>`
    : "";

  const lightboxBtnHTML = is3D
    ? `<button type="button"
          data-lightbox-src="${escapeHtml(imageSrc)}"
          data-lightbox-title="${escapeHtml(project.title)}"
          data-lightbox-alt="${escapeHtml(imageAlt)}"
          class="btn-tap-target inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.1] text-slate-100 hover:text-white font-sans font-medium text-xs transition-colors focus-visible:outline-none"
          aria-label="View Full Image: ${escapeHtml(project.title)}">
        ${icons.expand}
        <span>View Full Image</span>
      </button>`
    : "";

  return `
    <div class="reveal flex flex-wrap items-center gap-2.5 pt-1" style="--project-reveal-delay: 400ms;">
      ${demoBtnHTML}
      ${lightboxBtnHTML}
    </div>
  `;
}

/**
 * Kompatibilitas helper untuk dialog modal proyek
 */
function getActiveProjectVariant(project) {
  return {
    title: project.title,
    badge: project.badge || "",
    shortDescription: project.description || project.shortDescription || "",
    fullDescription: project.fullDescription || project.description || project.shortDescription || "",
    metrics: project.metrics || "",
    techStack: Array.isArray(project.tech) ? project.tech : project.techStack || [],
    githubUrl: project.repoUrl || project.githubUrl || "",
    liveUrl: project.demoUrl || project.liveUrl || "",
  };
}

function renderModalActionsHTML(variant) {
  const hasDemo = isNonEmptyUrl(variant.liveUrl);
  if (!hasDemo) return "";

  return `
    <div class="pt-5 border-t border-white/10 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
      <a href="${escapeHtml(variant.liveUrl)}" target="_blank" rel="noopener noreferrer"
          class="btn-tap-target w-full sm:w-auto px-5 py-2 font-sans font-semibold text-xs rounded-xl text-black bg-white hover:bg-slate-200 transition-colors">
        <span>Live Demo</span> <span class="ml-1.5">${icons.externalLink}</span>
      </a>
    </div>
  `;
}

function renderStackedDeckHTML() {
  return "";
}

function attachStackDeckInteractions() { }

function renderProjectCards() {
  const gridContainer = document.getElementById("projects-grid");
  if (!gridContainer) return;

  const curatedProjects = getCuratedVisibleProjects();
  const visibleProjects =
    activeCategory === "All"
      ? curatedProjects
      : curatedProjects.filter((p) => p.category === activeCategory);

  // Handle Empty State (R-27 Requirement)
  if (visibleProjects.length === 0) {
    gridContainer.innerHTML = `
      <div class="py-16 text-center">
        <p class="font-sans text-sm font-medium text-slate-300 mb-2">Belum ada project pada kategori "${escapeHtml(activeCategory)}".</p>
        <p class="text-xs text-slate-400 mb-5">Silakan pilih kategori lain atau tampilkan semua project.</p>
        <button 
          type="button" 
          id="reset-filter-btn" 
          class="btn-tap-target font-sans font-medium text-xs px-4 py-2 min-h-[44px] rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors focus-visible:outline-none">
          Tampilkan Semua
        </button>
      </div>
    `;

    const resetBtn = document.getElementById("reset-filter-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        switchProjectCategory("All");
      });
    }
    return;
  }

  // Render Split-Row Editorial Showcase dengan stagger reveal (gambar 0ms, teks mulai 120ms + 70ms per elemen anak)
  gridContainer.innerHTML = visibleProjects
    .map((project, idx) => {
      const indexLabel = String(idx + 1).padStart(2, "0");
      const imageSrc = project.image || "assets/images/gymflow.png";
      const imageAlt =
        project.imageAlt ||
        `Pratinjau karya ${project.category}: ${project.title}`;
      const descriptionText = project.description || project.shortDescription || "";
      const techList = Array.isArray(project.tech)
        ? project.tech
        : Array.isArray(project.techStack)
          ? project.techStack
          : [];
      const actionsMarkup = renderProjectRowActionsHTML(project, imageSrc, imageAlt);

      return `
        <article class="project-split-row group py-8 sm:py-10 lg:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start" data-project-id="${escapeHtml(project.id)}" data-project-category="${escapeHtml(project.category)}">
          <!-- Desktop Left Index Gutter (01, 02, 03, 04) -->
          <div class="reveal hidden lg:block lg:col-span-1 pt-1" style="--project-reveal-delay: 0ms;">
            <span class="font-mono text-xs font-medium text-slate-500 group-hover:text-slate-300 tabular-nums transition-colors">${indexLabel}</span>
          </div>

          <!-- Left Column: Single Representative 16:9 Image (delay 0ms) -->
          <div class="reveal md:col-span-5 lg:col-span-5" style="--project-reveal-delay: 0ms;">
            <div class="flex items-center gap-2.5 mb-3 md:hidden">
              <span class="font-mono text-xs font-medium text-slate-400 tabular-nums">${indexLabel}</span>
              <span class="text-slate-600" aria-hidden="true">·</span>
              <span class="font-mono text-[11px] uppercase tracking-widest text-slate-400">${escapeHtml(project.category)}</span>
            </div>

            <div class="project-split-media w-full aspect-video">
              <img 
                src="${escapeHtml(imageSrc)}" 
                alt="${escapeHtml(imageAlt)}" 
                width="800" 
                height="450" 
                loading="lazy" 
                class="w-full h-full object-cover" 
              />
            </div>
          </div>

          <!-- Right Column: Staggered Children (120ms, 190ms, 260ms, 330ms, 400ms) -->
          <div class="md:col-span-7 lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div class="reveal hidden md:flex items-center gap-2.5 mb-2.5" style="--project-reveal-delay: 120ms;">
                <span class="lg:hidden font-mono text-xs font-medium text-slate-400 tabular-nums">${indexLabel}</span>
                <span class="lg:hidden text-slate-600" aria-hidden="true">·</span>
                <span class="font-mono text-[11px] uppercase tracking-widest text-slate-400">${escapeHtml(project.category)}</span>
              </div>

              <h3 class="reveal text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-slate-100 transition-colors" style="--project-reveal-delay: 190ms;">
                ${escapeHtml(project.title)}
              </h3>

              <p class="reveal project-row-desc text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-5" style="--project-reveal-delay: 260ms;">
                ${escapeHtml(descriptionText)}
              </p>
            </div>

            <div class="mt-auto space-y-4">
              <div class="reveal flex flex-wrap gap-1.5" style="--project-reveal-delay: 330ms;">
                ${techList.map((tech) => `<span class="tech-pill">${escapeHtml(tech)}</span>`).join("")}
              </div>

              ${actionsMarkup}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  observeProjectRows();
}

/* ==============================================================================
   4. ABOUT SECTION
   ============================================================================== */
function initAboutSection() {
  const about = portfolioData.about;
  if (!about) return;

  const titleEl = document.getElementById("about-title");
  if (titleEl) titleEl.textContent = about.sectionTitle;

  const subtitleEl = document.getElementById("about-subtitle");
  if (subtitleEl) subtitleEl.textContent = about.sectionSubtitle;

  const bioContainer = document.getElementById("about-paragraphs");
  if (bioContainer && about.paragraphs) {
    bioContainer.innerHTML = about.paragraphs
      .map((p) => `<p class="text-sm md:text-base text-slate-300 leading-relaxed">${p}</p>`)
      .join("");
  }

  const principlesContainer = document.getElementById("about-principles");
  if (principlesContainer && about.principles) {
    principlesContainer.innerHTML = about.principles
      .map(
        (item) => `
        <div class="border border-white/10 bg-[#0E0E12] rounded-2xl p-6 sm:p-7 hover:border-white/20 transition-colors duration-200 group flex flex-col justify-start">
          <h4 class="text-base font-semibold text-white tracking-tight flex items-center gap-3 mb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-white shrink-0 transition-colors"></span>
            <span>${item.title}</span>
          </h4>
          <p class="text-sm text-slate-300 leading-relaxed">
            ${item.desc}
          </p>
        </div>
      `
      )
      .join("");
  }
}

/* ==============================================================================
   5. SKILLS / TECH STACK SECTION
   ============================================================================== */
function initSkillsSection() {
  const container = document.getElementById("skills-container");
  if (!container || !portfolioData.skills) return;

  container.innerHTML = portfolioData.skills
    .map(
      (group) => `
      <div class="border border-white/5 bg-white/[0.01] rounded-2xl p-5 hover:border-white/15 transition-colors">
        <h3 class="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3.5 flex items-center justify-between">
          <span>${group.category}</span>
          <span class="text-[10px] text-slate-600">${group.items.length} items</span>
        </h3>
        <div class="flex flex-wrap gap-2">
          ${group.items
          .map(
            (skill) => `
              <span class="font-sans text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-200 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-150">
                ${skill}
              </span>
            `
          )
          .join("")}
        </div>
      </div>
    `
    )
    .join("");
}

/* ==============================================================================
   6. EXPERIENCE SECTION
   ============================================================================== */
function initExperienceSection() {
  const container = document.getElementById("experience-timeline");
  if (!container || !portfolioData.experience) return;

  const itemsMarkup = portfolioData.experience
    .map(
      (exp) => `
      <div class="timeline-item relative pl-6 md:pl-8 pb-10 last:pb-2">
        <span class="timeline-dot absolute -left-[4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-500 border-2 border-[#08080A]"></span>

        <div class="timeline-item-body">
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <h3 class="text-base sm:text-lg font-semibold text-white tracking-tight">
              ${exp.role} <span class="text-slate-400 font-normal">at ${exp.company}</span>
            </h3>
            <span class="font-mono text-xs text-slate-400 whitespace-nowrap">
              ${exp.period}
            </span>
          </div>

          <p class="font-sans text-xs font-medium text-slate-500 mb-3">
            ${exp.location}
          </p>

          <ul class="space-y-2 mb-4 text-xs md:text-sm text-slate-300">
            ${exp.description
          .map(
            (point) => `
                <li class="flex items-start gap-2.5 leading-relaxed">
                  <span class="text-slate-500 mt-1 shrink-0">›</span>
                  <span>${point}</span>
                </li>
              `
          )
          .join("")}
          </ul>

          <div class="flex flex-wrap gap-1.5">
            ${exp.skillsUsed
          .map(
            (s) => `
                <span class="tech-pill">
                  ${s}
                </span>
              `
          )
          .join("")}
          </div>
        </div>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="experience-timeline-wrap">
      <div class="timeline-rail-track" aria-hidden="true">
        <div class="timeline-rail-progress" id="timeline-rail-progress"></div>
      </div>
      ${itemsMarkup}
    </div>
  `;
}

/* ==============================================================================
   7. CONTACT SECTION & FOOTER
   ============================================================================== */
function initContactSection() {
  const contact = portfolioData.contact;
  if (!contact) return;

  const titleEl = document.getElementById("contact-title");
  if (titleEl) titleEl.textContent = contact.sectionTitle;

  const subtitleEl = document.getElementById("contact-subtitle");
  if (subtitleEl) subtitleEl.textContent = contact.sectionSubtitle;

  const emailDisplay = document.getElementById("contact-email-text");
  if (emailDisplay) emailDisplay.textContent = contact.directEmail;

  const emailLink = document.getElementById("contact-email-btn");
  if (emailLink) {
    emailLink.href = `mailto:${contact.directEmail}`;
  }

  const copyEmailBtn = document.getElementById("contact-copy-email-btn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(contact.directEmail).then(() => {
        copyEmailBtn.innerHTML = `${icons.check} <span>Copied</span>`;
        showToast("Email address copied to clipboard!");
        setTimeout(() => {
          copyEmailBtn.innerHTML = `${icons.copy} <span>Copy</span>`;
        }, 2200);
      });
    });
  }

  const responseTimeEl = document.getElementById("contact-response-time");
  if (responseTimeEl) responseTimeEl.textContent = contact.responseTime;

  const locationNoteEl = document.getElementById("contact-location-note");
  if (locationNoteEl) locationNoteEl.textContent = contact.locationNote;

  // Footer
  const footerCopyright = document.getElementById("footer-copyright");
  if (footerCopyright && portfolioData.footer) {
    const currentYear = new Date().getFullYear();
    footerCopyright.textContent = `© ${currentYear} ${portfolioData.personal.name}. ${portfolioData.footer.copyright}`;
  }

  const footerBuilt = document.getElementById("footer-built-with");
  if (footerBuilt && portfolioData.footer) {
    footerBuilt.textContent = portfolioData.footer.builtWith;
  }
}

/* ==============================================================================
   8. FLOATING QUICK CONTACT PILL
   ============================================================================== */
function initFloatingContact() {
  const floatingConfig = portfolioData.floatingContact;
  const container = document.getElementById("floating-contact-container");
  if (!container || !floatingConfig || !floatingConfig.enabled) {
    if (container) container.style.display = "none";
    return;
  }

  const triggerBtn = document.getElementById("floating-contact-trigger");
  const menu = document.getElementById("floating-contact-menu");
  const optionsList = document.getElementById("floating-contact-options");

  if (optionsList && floatingConfig.options) {
    optionsList.innerHTML = floatingConfig.options
      .map(
        (opt) => `
        <a href="${opt.url}" 
           ${opt.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}
            class="quick-contact-option flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors font-sans">
           <span class="text-slate-400">${icons[opt.icon] || ""}</span>
           <span>${opt.label}</span>
        </a>
      `
      )
      .join("");
  }

  if (triggerBtn && menu) {
    const setMenuState = (open) => {
      triggerBtn.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      menu.classList.toggle("is-open", open);
      menu.querySelectorAll("a").forEach((link) => {
        link.tabIndex = open ? 0 : -1;
      });
    };

    // Initialize closed state cleanly for keyboard accessibility (R-32)
    setMenuState(false);

    triggerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = triggerBtn.getAttribute("aria-expanded") === "true";
      setMenuState(!isExpanded);
    });

    document.addEventListener("click", (e) => {
      if (!container.contains(e.target) && menu.classList.contains("is-open")) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setMenuState(false);
        triggerBtn.focus();
      }
    });
  }
}

/* ==============================================================================
   9. SCROLL SPY (Deterministic, Smooth Active Capsule Indicator)
   ============================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-pill-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  let ticking = false;

  function onScroll() {
    if (isManualScroll) return;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (scrollY + viewportHeight >= docHeight - 50) {
          setActiveNavLink("#contact");
          ticking = false;
          return;
        }

        const focalY = scrollY + viewportHeight * 0.35;
        let activeId = "";

        sections.forEach((sec) => {
          const secId = sec.getAttribute("id");
          if (secId === "home") return;
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (focalY >= top && focalY < top + height) {
            activeId = secId;
          }
        });

        if (!activeId && scrollY < viewportHeight * 0.65) {
          const firstLink = document.querySelector(".nav-pill-link");
          if (firstLink) {
            setActiveNavLink(firstLink.getAttribute("href"));
            ticking = false;
            return;
          }
        }

        if (activeId) {
          setActiveNavLink(`#${activeId}`);
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ==============================================================================
   10. PROJECT DETAILS MODAL DIALOG (R-26 & R-32 Accessible Dialog)
   ============================================================================== */
function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function initModalListeners() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeProjectModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeProjectModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = portfolioData.projects.find((p) => p.id === projectId);
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("project-modal-content");

  if (!project || !modal || !modalBody) return;

  const hasStack = Array.isArray(project.portfolioStack) && project.portfolioStack.length > 0;
  const variant = getActiveProjectVariant(project);

  const modalMediaMarkup = hasStack
    ? renderStackedDeckHTML(project, "modal")
    : project.image
      ? `
      <div class="relative w-full aspect-video mb-6 rounded-xl overflow-hidden border border-white/10 bg-[#121216]">
        <img 
          src="${project.image}" 
          alt="${variant.title} preview" 
          width="800" 
          height="450" 
          class="w-full h-full object-cover" 
        />
      </div>
    `
      : "";

  const modalFooterMarkup = `
    <div data-modal-links="${project.id}" class="modal-project-actions">
      ${renderModalActionsHTML(variant)}
    </div>
  `;

  modalBody.innerHTML = `
    <!-- Dedicated Header Row: Badges on Left, Close Button on Right (Zero Overlap) -->
    <div class="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-sans text-xs font-medium text-slate-300 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full">
          ${project.category}
        </span>
        ${variant.badge
      ? `<span data-modal-badge="${project.id}" class="font-sans text-xs font-medium text-slate-300 border border-white/10 px-3 py-1 rounded-full bg-white/[0.02]">
                ${variant.badge}
              </span>`
      : ""
    }
      </div>

      <button type="button" id="project-modal-close" class="modal-close-button" aria-label="Close project details dialog">
        ${icons.close}
      </button>
    </div>

    ${modalMediaMarkup}

    <h2 data-modal-title="${project.id}" class="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
      ${variant.title}
    </h2>

    <p data-modal-desc="${project.id}" class="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
      ${variant.fullDescription}
    </p>

    <div data-modal-metrics="${project.id}" class="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 font-medium ${variant.metrics ? "" : "hidden"}">
      <span class="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Key Highlight</span>
      <span data-modal-metrics-text="${project.id}">${variant.metrics || ""}</span>
    </div>

    <div class="mb-6">
      <h4 class="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Technologies & Pipeline</h4>
      <div data-modal-tech="${project.id}" class="flex flex-wrap gap-1.5">
        ${variant.techStack.map((tech) => `<span class="tech-pill">${tech}</span>`).join("")}
      </div>
    </div>

    ${modalFooterMarkup}
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const closeBtn = document.getElementById("project-modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
    closeBtn.focus();
  }

  attachStackDeckInteractions(modalBody);
}

/* ==============================================================================
   11. RESPONSIVE ANIMATIONS: FLOATING NAVBAR SCROLL ELEVATION
   ============================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById("floating-navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* ==============================================================================
   12. RESPONSIVE ANIMATIONS: SPOTLIGHT MOUSE TRACKING ON CARDS
   ============================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll(".card-project");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* ==============================================================================
   13. SMOOTH SCROLL CHOREOGRAPHY ENGINE (R-19 Motion 3)
   - Damped RAF interpolation for silky continuous scroll-linked motion
   - Bi-directional reveals that replay smoothly every time you scroll down or up
   - Scroll-drawn experience timeline rail, hero parallax, & card scale-to-focus
   ============================================================================== */
let scrollRevealObserver = null;
let scrollScrubCards = [];
let smoothScrollY = 0;
let targetScrollY = 0;
let scrollRafId = null;

function clamp01(val) {
  return Math.max(0, Math.min(1, val));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Mengumpulkan seluruh elemen animasi & mengikat IntersectionObserver bi-directional
 */
function refreshScrollMotionTargets() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Daftar grup elemen dengan karakter gerak berbeda per section (R-19)
  const motionGroups = [
    { selector: "#projects > div:first-child, #about > div:first-child > :not(#about-paragraphs), #about > div:last-child > div:first-child, #experience > div:first-child, #contact > h2, #contact > p, #contact > div:first-child", motion: "editorial", stagger: 65 },
    { selector: "#about-paragraphs > p", motion: "editorial", stagger: 85 },
    { selector: "#about-principles > div", motion: "scale", stagger: 95 },
    { selector: "#experience-timeline .timeline-item-body", motion: "slide-right", stagger: 110 },
    { selector: "#contact > .inline-flex, #contact > div:last-child", motion: "scale", stagger: 80 },
  ];

  const seen = new Set();
  motionGroups.forEach(({ selector, motion, stagger }) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((el, idx) => {
      if (seen.has(el)) return;
      seen.add(el);
      el.classList.add("scroll-reveal");
      el.setAttribute("data-motion", motion);
      el.style.setProperty("--reveal-delay", `${Math.min(idx * stagger, 260)}ms`);

      // Jika saat inisialisasi elemen sudah terlihat di viewport, langsung tampilkan
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        el.classList.add("is-inview");
      }

      if (scrollRevealObserver) {
        scrollRevealObserver.observe(el);
      }
    });
  });

  // Kartu proyek menggunakan CSS hover alami (tanpa animasi scroll berlebihan)
  scrollScrubCards = [];
  updateContinuousScrollVisuals(smoothScrollY);
}

/**
 * Memperbarui semua properti visual yang tersinkronisasi langsung dengan posisi scroll
 */
function updateContinuousScrollVisuals(currentY) {
  const vh = window.innerHeight || 800;
  const docMax = Math.max(1, document.documentElement.scrollHeight - vh);
  const docProgress = clamp01(currentY / docMax);

  // 1. Sync scroll progress with the minimalist interactive 3D contour & rim-light background
  if (typeof notifyInteractiveBgScroll === "function") {
    notifyInteractiveBgScroll(docProgress);
  }

  // 2. Parallax exit halus pada full-viewport Hero saat di-scroll turun, kembali tajam saat scroll naik
  const heroExit = clamp01(currentY / Math.max(360, vh * 0.82));
  const heroSplit = document.querySelector(".hero-split-layout");
  if (heroSplit) {
    heroSplit.style.setProperty("--hero-exit", heroExit.toFixed(4));
  }

  // 3. Continuous scroll-scrubbed scale & glide pada kartu proyek (00:10-00:15 referensi)
  // Menggunakan selisih delta agar tetap ter-damped mengikuti smoothScrollY
  const scrollDelta = window.scrollY - currentY;
  scrollScrubCards.forEach((card) => {
    const rawRect = card.getBoundingClientRect();
    const dampedTop = rawRect.top + scrollDelta;
    const dampedBottom = rawRect.bottom + scrollDelta;

    // Masuk dari bawah viewport (1.02*vh -> 0.72*vh) => progress 0 -> 1
    const enterRaw = clamp01((vh * 1.04 - dampedTop) / (vh * 0.34));
    const enterEase = easeOutCubic(enterRaw);

    // Sedikit meredup elegan saat keluar melewati batas atas viewport
    const leaveRaw = clamp01((dampedBottom - vh * 0.04) / (vh * 0.22));
    const leaveEase = easeOutCubic(leaveRaw);

    const visibility = Math.min(enterEase, leaveEase);
    const translateY = (1 - enterEase) * 34 - (1 - leaveEase) * 14;
    const scale = 0.945 + visibility * 0.055;
    const opacity = 0.16 + visibility * 0.84;

    card.style.setProperty("--card-y", `${translateY.toFixed(2)}px`);
    card.style.setProperty("--card-scale", scale.toFixed(4));
    card.style.setProperty("--card-opacity", opacity.toFixed(4));
  });

  // 4. Live scroll-drawn Experience Timeline Rail & Milestone Dot Illumination
  const timelineWrap = document.querySelector(".experience-timeline-wrap");
  if (timelineWrap) {
    const rect = timelineWrap.getBoundingClientRect();
    const dampedTop = rect.top + scrollDelta;
    const triggerY = vh * 0.68;
    const progress = clamp01((triggerY - dampedTop) / Math.max(1, rect.height));
    timelineWrap.style.setProperty("--timeline-progress", progress.toFixed(4));

    const items = timelineWrap.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      const dot = item.querySelector(".timeline-dot");
      if (!dot) return;
      const dotRect = dot.getBoundingClientRect();
      if (dotRect.top + scrollDelta <= triggerY + 12) {
        dot.classList.add("is-reached");
      } else {
        dot.classList.remove("is-reached");
      }
    });
  }
}

function tickScrollChoreography() {
  const diff = targetScrollY - smoothScrollY;
  smoothScrollY += diff * 0.12;

  if (Math.abs(diff) < 0.15) {
    smoothScrollY = targetScrollY;
    updateContinuousScrollVisuals(smoothScrollY);
    scrollRafId = null;
    return;
  }

  updateContinuousScrollVisuals(smoothScrollY);
  scrollRafId = window.requestAnimationFrame(tickScrollChoreography);
}

function scheduleScrollTick() {
  targetScrollY = window.scrollY;
  if (scrollRafId === null) {
    scrollRafId = window.requestAnimationFrame(tickScrollChoreography);
  }
}

function initScrollChoreography() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // 1. Staggered Hero entrance on load
  const heroSequence = [
    document.getElementById("hero-status-pill"),
    document.getElementById("hero-headline"),
    document.getElementById("hero-subheadline"),
    document.getElementById("hero-secondary-cta")?.parentElement,
    document.getElementById("hero-micro-note"),
    document.querySelector(".hero-profile-photo"),
  ].filter(Boolean);

  heroSequence.forEach((el, idx) => {
    el.classList.add("hero-enter");
    if (idx > 0 && idx <= 4) {
      el.classList.add(`hero-enter-delay-${idx}`);
    }
  });

  // 2. Bi-directional IntersectionObserver: re-animates cleanly every time scrolled down or back up
  scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("is-inview");
        } else {
          // Tentukan arah keluarnya elemen agar saat masuk kembali geraknya natural mengikuti arah scroll
          const isAboveViewport = entry.boundingClientRect.bottom <= 0;
          el.setAttribute("data-reveal-dir", isAboveViewport ? "up" : "down");
          el.classList.remove("is-inview");
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
  );

  smoothScrollY = window.scrollY;
  targetScrollY = window.scrollY;

  refreshScrollMotionTargets();

  window.addEventListener("scroll", scheduleScrollTick, { passive: true });
  window.addEventListener("resize", () => {
    targetScrollY = window.scrollY;
    smoothScrollY = window.scrollY;
    updateContinuousScrollVisuals(smoothScrollY);
  }, { passive: true });
}

/* ==============================================================================
   14. MINIMALIST INTERACTIVE 3D STUDIO RIM-LIGHT & CONTOUR BACKGROUND
   - Designed for a 3D Generalist / LRC (Lighting, Rendering, Compositing) portfolio
   - Demand-driven 60fps physics: animates on pointer move, click ripple, & scroll,
     then settles to zero-CPU rest when input stops (R-19 / R-39 compliant)
   - Restrained & uncluttered: 5 hair-thin 3D spline contours that magnetically
     deflect and catch a specular rim light near the cursor, plus 18 sparse depth
     vertices and subtle click light pulses
   ============================================================================== */
let notifyInteractiveBgScroll = null;

function initInteractiveBackground() {
  const canvas = document.getElementById("interactive-bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let width = window.innerWidth || 1280;
  let height = window.innerHeight || 800;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Normalized & pixel pointer coordinates with damped spring inertia
  let targetX = width * 0.68;
  let targetY = height * 0.36;
  let currentX = targetX;
  let currentY = targetY;
  let pointerPresence = 0.55;
  let targetPresence = 0.55;

  // Scroll progress (0 at top -> 1 at bottom)
  let bgScrollProgress = 0;

  // Click / Tap expanding studio light ripples
  const ripples = [];
  let bgRafId = null;

  // 5 Minimalist 3D Contour Splines (wide spacing, calm studio composition)
  const contourLines = [
    { yRatio: 0.28, amp: 26, freq: 1.05, phase: 0.4, depth: 0.45, baseAlpha: 0.026, rimAlpha: 0.16 },
    { yRatio: 0.44, amp: 34, freq: 1.18, phase: 1.35, depth: 0.65, baseAlpha: 0.032, rimAlpha: 0.2 },
    { yRatio: 0.60, amp: 42, freq: 1.28, phase: 2.25, depth: 0.85, baseAlpha: 0.04, rimAlpha: 0.25 },
    { yRatio: 0.75, amp: 36, freq: 1.12, phase: 3.1, depth: 1.0, baseAlpha: 0.045, rimAlpha: 0.28 },
    { yRatio: 0.88, amp: 28, freq: 0.96, phase: 4.05, depth: 0.72, baseAlpha: 0.032, rimAlpha: 0.18 },
  ];

  // 18 Sparse 3D Depth Vertices (deterministic studio layout, mostly peripheral so center stays clean)
  const vertices = [
    { u: 0.08, v: 0.16, z: 0.35, size: 1.2 },
    { u: 0.18, v: 0.28, z: 0.62, size: 1.5 },
    { u: 0.11, v: 0.52, z: 0.48, size: 1.3 },
    { u: 0.22, v: 0.74, z: 0.82, size: 1.6 },
    { u: 0.09, v: 0.86, z: 0.4, size: 1.2 },
    { u: 0.34, v: 0.14, z: 0.52, size: 1.3 },
    { u: 0.38, v: 0.84, z: 0.74, size: 1.5 },
    { u: 0.52, v: 0.12, z: 0.38, size: 1.2 },
    { u: 0.56, v: 0.89, z: 0.66, size: 1.4 },
    { u: 0.68, v: 0.18, z: 0.78, size: 1.6 },
    { u: 0.74, v: 0.34, z: 0.44, size: 1.2 },
    { u: 0.66, v: 0.76, z: 0.58, size: 1.4 },
    { u: 0.84, v: 0.15, z: 0.5, size: 1.3 },
    { u: 0.91, v: 0.32, z: 0.88, size: 1.7 },
    { u: 0.82, v: 0.54, z: 0.7, size: 1.5 },
    { u: 0.93, v: 0.68, z: 0.42, size: 1.2 },
    { u: 0.86, v: 0.84, z: 0.92, size: 1.7 },
    { u: 0.46, v: 0.48, z: 0.3, size: 1.1 },
  ];

  function resizeCanvas() {
    width = window.innerWidth || 1280;
    height = window.innerHeight || 800;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderFrame();
  }

  function buildSplinePoints(line) {
    const segments = width < 640 ? 20 : 30;
    const pts = [];
    const scrollOffsetY = (bgScrollProgress - 0.5) * -95 * line.depth;
    const scrollPhase = bgScrollProgress * 1.65 * line.depth;
    const parallaxX = ((currentX / Math.max(1, width)) - 0.5) * -24 * line.depth;
    const parallaxY = ((currentY / Math.max(1, height)) - 0.5) * -18 * line.depth;
    const influenceRadius = Math.min(width, height) * 0.32;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = -40 + t * (width + 80) + parallaxX;

      // Clean architectural S-curve contour
      const wave1 = Math.sin(t * Math.PI * line.freq + line.phase + scrollPhase) * line.amp;
      const wave2 = Math.cos(t * Math.PI * (line.freq * 1.7) - line.phase * 0.6 + scrollPhase * 0.7) * (line.amp * 0.38);
      let y = height * line.yRatio + wave1 + wave2 + scrollOffsetY + parallaxY;

      // Magnetic 3D spline deflection away from cursor
      const dx = x - currentX;
      const dy = y - currentY;
      const dist = Math.hypot(dx, dy);
      if (dist < influenceRadius) {
        const falloff = 1 - dist / influenceRadius;
        const smoothPush = falloff * falloff * (3 - 2 * falloff);
        const dirY = dy >= 0 ? 1 : -1;
        const pushStrength = (dy === 0 ? 1 : dirY * Math.min(1, Math.abs(dy) / 48));
        y += smoothPush * pushStrength * 26 * line.depth * pointerPresence;
      }

      // Click ripple wave deflection
      for (let r = 0; r < ripples.length; r++) {
        const rip = ripples[r];
        const rDist = Math.hypot(x - rip.x, y - rip.y);
        const band = Math.abs(rDist - rip.radius);
        if (band < 58) {
          const waveFactor = Math.cos((band / 58) * (Math.PI * 0.5));
          const sign = y >= rip.y ? 1 : -1;
          y += sign * waveFactor * rip.alpha * 22 * line.depth;
        }
      }

      pts.push({ x, y });
    }
    return pts;
  }

  function traceSmoothCurve(pts) {
    if (pts.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 0; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) * 0.5;
      const yc = (pts[i].y + pts[i + 1].y) * 0.5;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
    }
    const last = pts[pts.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  function renderFrame() {
    ctx.clearRect(0, 0, width, height);

    // 1. Soft Studio Key-Light following cursor (LRC Lighting pass)
    const lightRadius = Math.max(340, Math.min(width, height) * 0.52);
    const keyLight = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, lightRadius);
    const keyAlpha = (0.048 + pointerPresence * 0.032).toFixed(4);
    keyLight.addColorStop(0, `rgba(226, 232, 240, ${keyAlpha})`);
    keyLight.addColorStop(0.45, `rgba(148, 163, 184, ${(keyAlpha * 0.38).toFixed(4)})`);
    keyLight.addColorStop(1, "rgba(8, 8, 10, 0)");
    ctx.fillStyle = keyLight;
    ctx.fillRect(0, 0, width, height);

    // 2. Sculpted 3D Contour Splines (Base Graphite Pass + Cursor Specular Rim Pass)
    const rimRadius = Math.max(240, Math.min(width, height) * 0.34);
    for (let i = 0; i < contourLines.length; i++) {
      const line = contourLines[i];
      const pts = buildSplinePoints(line);

      // Pass A: Whisper-thin base contour
      traceSmoothCurve(pts);
      ctx.strokeStyle = `rgba(255, 255, 255, ${line.baseAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pass B: Specular Rim Reflection near cursor
      const rimGrad = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, rimRadius);
      const peakRim = (line.rimAlpha * (0.65 + pointerPresence * 0.35)).toFixed(4);
      rimGrad.addColorStop(0, `rgba(248, 250, 252, ${peakRim})`);
      rimGrad.addColorStop(0.55, `rgba(203, 213, 225, ${(peakRim * 0.35).toFixed(4)})`);
      rimGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 1.35;
      ctx.stroke();
    }

    // 3. Sparse 3D Parallax Depth Vertices
    const normX = (currentX / Math.max(1, width)) - 0.5;
    const normY = (currentY / Math.max(1, height)) - 0.5;
    for (let i = 0; i < vertices.length; i++) {
      const v = vertices[i];
      const vx = v.u * width - normX * 42 * v.z;
      let vy = (v.v * height - normY * 34 * v.z - bgScrollProgress * 75 * v.z) % height;
      if (vy < 0) vy += height;

      const dist = Math.hypot(vx - currentX, vy - currentY);
      const proximity = Math.max(0, 1 - dist / (rimRadius * 0.95));
      const alpha = 0.07 + v.z * 0.08 + proximity * 0.26 * pointerPresence;

      ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(vx, vy, v.size + proximity * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // Subtle 3D viewport vertex crosshair on illuminated nodes
      if (proximity > 0.32) {
        const crossAlpha = ((proximity - 0.32) * 0.28 * pointerPresence).toFixed(3);
        ctx.strokeStyle = `rgba(248, 250, 252, ${crossAlpha})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(vx - 4.5, vy);
        ctx.lineTo(vx + 4.5, vy);
        ctx.moveTo(vx, vy - 4.5);
        ctx.lineTo(vx, vy + 4.5);
        ctx.stroke();
      }
    }

    // 4. Interactive Click / Tap Studio Light Ripples
    for (let i = 0; i < ripples.length; i++) {
      const rip = ripples[i];
      ctx.strokeStyle = `rgba(226, 232, 240, ${(rip.alpha * 0.24).toFixed(4)})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function stepInteractiveBg() {
    if (reducedMotionQuery.matches) {
      bgRafId = null;
      renderFrame();
      return;
    }

    const dx = targetX - currentX;
    const dy = targetY - currentY;
    const dp = targetPresence - pointerPresence;

    currentX += dx * 0.09;
    currentY += dy * 0.09;
    pointerPresence += dp * 0.08;

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].radius += 6.2;
      ripples[i].alpha *= 0.93;
      if (ripples[i].alpha < 0.015 || ripples[i].radius > 340) {
        ripples.splice(i, 1);
      }
    }

    renderFrame();

    const stillMoving =
      Math.abs(dx) > 0.2 ||
      Math.abs(dy) > 0.2 ||
      Math.abs(dp) > 0.01 ||
      ripples.length > 0;

    if (stillMoving) {
      bgRafId = window.requestAnimationFrame(stepInteractiveBg);
    } else {
      bgRafId = null;
    }
  }

  function requestInteractiveFrame() {
    if (reducedMotionQuery.matches) {
      renderFrame();
      return;
    }
    if (bgRafId === null) {
      bgRafId = window.requestAnimationFrame(stepInteractiveBg);
    }
  }

  window.addEventListener(
    "pointermove",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      targetPresence = 1;
      requestInteractiveFrame();
    },
    { passive: true }
  );

  window.addEventListener(
    "pointerdown",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      targetPresence = 1;
      if (!reducedMotionQuery.matches) {
        ripples.push({ x: e.clientX, y: e.clientY, radius: 6, alpha: 1 });
        if (ripples.length > 3) ripples.shift();
      }
      requestInteractiveFrame();
    },
    { passive: true }
  );

  document.addEventListener(
    "pointerleave",
    () => {
      targetPresence = 0.45;
      requestInteractiveFrame();
    },
    { passive: true }
  );

  window.addEventListener("resize", resizeCanvas, { passive: true });

  notifyInteractiveBgScroll = (docProgress) => {
    bgScrollProgress = docProgress;
    requestInteractiveFrame();
  };

  resizeCanvas();
}
