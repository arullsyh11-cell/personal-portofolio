/**
 * ==============================================================================
 * PORTFOLIO APPLICATION LOGIC (app.js)
 * ==============================================================================
 * Mengelola rendering data dinamis dari data.js, interaktivitas clipboard,
 * filter kategori proyek, interactive 3D stacked showcase (scroll/swipe/click),
 * modal detail aksesibel, serta floating quick-contact pill.
 * ==============================================================================
 */

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
  initScrollReveal();
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
        <a href="${item.href}" class="nav-pill-link ${idx === 0 ? "active" : ""} text-[11px] sm:text-sm font-medium text-slate-300 hover:text-white px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-150 focus-visible:outline-none">
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
          emailPillBtn.innerHTML = `${icons.check} <span class="font-sans text-xs sm:text-sm text-emerald-800 font-semibold ml-1">Copied!</span>`;
          emailPillBtn.classList.add("bg-emerald-100");
          showToast("Email address copied to clipboard!");
          setTimeout(() => {
            emailPillBtn.innerHTML = originalHTML;
            emailPillBtn.classList.remove("bg-emerald-100");
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
   3. PROJECTS SECTION & 3D LAYERED STACKED PORTFOLIO SHOWCASE
   ============================================================================== */
let activeCategory = "All";
// Menyimpan index slide aktif untuk masing-masing project 3D & LRC
const projectStackState = {};

function initProjectsSection() {
  renderProjectCategoryFilters();
  renderProjectCards();
}

function renderProjectCategoryFilters() {
  const filterContainer = document.getElementById("project-category-filters");
  if (!filterContainer) return;

  const categories = portfolioData.projectCategories || ["All"];

  filterContainer.innerHTML = categories
    .map((cat) => {
      const isActive = cat === activeCategory;
      return `
        <button 
          type="button" 
          data-category="${cat}"
          class="category-filter-btn border ${isActive
          ? "bg-white text-black border-white shadow-sm"
          : "bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-white/[0.05]"
        }"
          aria-pressed="${isActive}">
          ${cat}
        </button>
      `;
    })
    .join("");

  filterContainer.querySelectorAll(".category-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-category");
      renderProjectCategoryFilters();
      renderProjectCards();
    });
  });
}

/**
 * Menghasilkan markup 3D Stacked Window Deck (seperti referensi Gambar 2 & 3)
 */
function renderStackedDeckHTML(project, deckScopeId) {
  const stack = project.portfolioStack || [];
  if (stack.length === 0) return "";

  const currentIndex = projectStackState[project.id] || 0;
  const total = stack.length;

  const cardsMarkup = stack
    .map((item, idx) => {
      const relativePos = (idx - currentIndex + total) % total;
      const posAttr = relativePos <= 2 ? String(relativePos) : "hidden";
      const numLabel = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

      return `
        <div class="stack-window-card" data-stack-index="${idx}" data-stack-pos="${posAttr}" role="group" aria-label="${item.title}">
          <div class="stack-window-bar">
            <span class="stack-window-title">${item.title}</span>
            <span class="stack-window-index">${numLabel}</span>
          </div>
          <div class="stack-window-body">
            <img src="${item.image}" alt="${item.title}" width="800" height="450" loading="lazy" />
            ${item.subtitle
          ? `<div class="stack-window-caption">
                    <span class="text-[11px] font-medium text-slate-200 truncate">${item.subtitle}</span>
                  </div>`
          : ""
        }
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="stack-showcase-wrapper" data-deck-project="${project.id}" data-deck-scope="${deckScopeId}" aria-label="Interactive 3D Portfolio Stack. Scroll or swipe to view next artwork.">
      <div class="stack-deck-stage">
        ${cardsMarkup}
      </div>
    </div>
  `;
}

/**
 * Memperbarui posisi kartu pada seluruh deck untuk projectId tertentu
 */
function stepProjectStack(projectId, delta = 1) {
  const project = portfolioData.projects.find((p) => p.id === projectId);
  if (!project || !project.portfolioStack || project.portfolioStack.length === 0) return;

  const total = project.portfolioStack.length;
  const current = projectStackState[projectId] || 0;
  const nextIndex = (current + delta + total) % total;
  projectStackState[projectId] = nextIndex;

  // Update semua deck instance (baik di kartu maupun di dalam modal jika sedang terbuka)
  const wrappers = document.querySelectorAll(`[data-deck-project="${projectId}"]`);
  wrappers.forEach((wrapper) => {
    const cards = wrapper.querySelectorAll(".stack-window-card");
    cards.forEach((card) => {
      const idx = Number(card.getAttribute("data-stack-index"));
      const relativePos = (idx - nextIndex + total) % total;
      const posAttr = relativePos <= 2 ? String(relativePos) : "hidden";
      card.setAttribute("data-stack-pos", posAttr);
    });
  });

  // Update counter text di footer kartu & modal
  const counters = document.querySelectorAll(`[data-stack-counter="${projectId}"]`);
  counters.forEach((counterEl) => {
    counterEl.textContent = `${nextIndex + 1} / ${total}`;
  });
}

/**
 * Mengaktifkan interaksi Scroll (Wheel), Geser (Swipe / Pointer Drag), dan Klik pada 3D Stacked Deck
 */
function attachStackDeckInteractions(rootElement = document) {
  const wrappers = rootElement.querySelectorAll(".stack-showcase-wrapper");

  wrappers.forEach((wrapper) => {
    if (wrapper.dataset.bound === "true") return;
    wrapper.dataset.bound = "true";

    const projectId = wrapper.getAttribute("data-deck-project");
    let lastWheelTime = 0;
    let startX = null;
    let startY = null;
    let isDragging = false;

    // 1. Interaksi Scroll (Mouse Wheel / Trackpad)
    wrapper.addEventListener(
      "wheel",
      (e) => {
        const now = Date.now();
        if (Math.abs(e.deltaY) < 6 && Math.abs(e.deltaX) < 6) return;
        e.preventDefault();
        if (now - lastWheelTime < 360) return;
        lastWheelTime = now;

        const delta = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1;
        stepProjectStack(projectId, delta);
      },
      { passive: false }
    );

    // 2. Interaksi Geser (Pointer / Touch Drag) & Klik
    wrapper.addEventListener("pointerdown", (e) => {
      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;
    });

    wrapper.addEventListener("pointermove", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
        isDragging = true;
      }
    });

    wrapper.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.abs(dx) > 30 || Math.abs(dy) > 35) {
        // Geser kiri/atas -> karya selanjutnya; kanan/bawah -> karya sebelumnya
        const direction = dx < -25 || dy < -30 ? 1 : -1;
        stepProjectStack(projectId, direction);
      } else if (!isDragging) {
        // Klik langsung pada kartu -> pindah ke karya selanjutnya
        stepProjectStack(projectId, 1);
      }

      startX = null;
      startY = null;
      isDragging = false;
    });

    wrapper.addEventListener("pointercancel", () => {
      startX = null;
      startY = null;
      isDragging = false;
    });
  });

  // Tombol Prev / Next untuk 3D Stack
  rootElement.querySelectorAll("[data-stack-action]").forEach((btn) => {
    if (btn.dataset.bound === "true") return;
    btn.dataset.bound = "true";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute("data-project-id");
      const dir = btn.getAttribute("data-stack-action") === "prev" ? -1 : 1;
      stepProjectStack(projectId, dir);
    });
  });
}

function renderProjectCards() {
  const gridContainer = document.getElementById("projects-grid");
  if (!gridContainer) return;

  const filteredProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  // Handle Empty State (R-27 Requirement)
  if (filteredProjects.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl p-8 bg-white/[0.01]">
        <p class="font-sans text-sm font-medium text-slate-300 mb-2">No projects found in category "${activeCategory}".</p>
        <p class="text-xs text-slate-500 mb-5">Try selecting another category filter or view all projects.</p>
        <button 
          type="button" 
          id="reset-filter-btn" 
          class="font-sans font-medium text-xs px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors">
          Reset Filter to All
        </button>
      </div>
    `;

    const resetBtn = document.getElementById("reset-filter-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        activeCategory = "All";
        renderProjectCategoryFilters();
        renderProjectCards();
      });
    }
    return;
  }

  // Render Project Cards
  gridContainer.innerHTML = filteredProjects
    .map((project) => {
      const isFeatured = project.featured;
      const colSpanClass = isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1";
      const hasStack = Array.isArray(project.portfolioStack) && project.portfolioStack.length > 0;
      const currentIdx = projectStackState[project.id] || 0;
      const totalSlides = hasStack ? project.portfolioStack.length : 0;

      const mediaPreviewMarkup = hasStack
        ? renderStackedDeckHTML(project, "card")
        : project.image
          ? `
          <div class="relative w-full aspect-video mb-5 rounded-xl overflow-hidden border border-white/10 bg-[#121216] group-hover:border-white/20 transition-all">
            <img 
              src="${project.image}" 
              alt="${project.title} preview" 
              width="800" 
              height="450" 
              loading="lazy" 
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
            />
          </div>
        `
          : "";

      const footerActionsMarkup = hasStack
        ? ""
        : `
          <div class="flex items-center gap-2">
            ${project.githubUrl
          ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
                     class="w-9 h-9 min-h-[38px] inline-flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/25 bg-white/[0.03]"
                     aria-label="View source code on GitHub">
                    ${icons.github}
                  </a>`
          : ""
        }
            ${project.liveUrl
          ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" 
                     class="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] font-sans font-medium text-xs rounded-lg text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
                     aria-label="Open live project preview">
                    <span>Live Demo</span>
                    ${icons.externalLink}
                  </a>`
          : ""
        }
          </div>
        `;

      return `
        <article class="card-project rounded-2xl p-6 flex flex-col justify-between ${colSpanClass} group relative">
          <div>
            <!-- Header Card: Category & Badge (Clean Sans-Serif Typography) -->
            <div class="flex items-center justify-between gap-2 mb-4">
              <span class="font-sans text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
                ${project.category}
              </span>
              ${project.badge
          ? `<span class="font-sans text-xs font-medium text-slate-300 border border-white/10 px-3 py-1 rounded-full bg-white/[0.02]">
                      ${project.badge}
                    </span>`
          : ""
        }
            </div>

            ${mediaPreviewMarkup}

            <!-- Title -->
            <h3 class="text-lg md:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-slate-100 transition-colors">
              ${project.title}
            </h3>

            <!-- Description -->
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              ${project.shortDescription}
            </p>

            ${project.metrics
          ? `<div class="mb-5 inline-flex items-center gap-2 font-sans text-xs font-medium text-slate-300 border-l-2 border-white/25 pl-3 py-0.5">
                    ${project.metrics}
                  </div>`
          : ""
        }
          </div>

          <div>
            <!-- Tech Stack Pills -->
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${project.techStack.map((tech) => `<span class="tech-pill">${tech}</span>`).join("")}
            </div>

            <!-- Actions Footer -->
            <div class="pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
              <button 
                type="button" 
                class="open-project-modal-btn inline-flex items-center gap-1.5 font-sans font-medium text-xs text-slate-300 hover:text-white transition-colors"
                data-project-id="${project.id}">
                ${icons.info}
                <span>Details</span>
              </button>

              ${footerActionsMarkup}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // Attach modal trigger listeners
  gridContainer.querySelectorAll(".open-project-modal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pId = btn.getAttribute("data-project-id");
      openProjectModal(pId);
    });
  });

  // Attach 3D stacked deck interactions
  attachStackDeckInteractions(gridContainer);

  // Attach interactive spotlight hover to cards
  initCardSpotlight();
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

  container.innerHTML = portfolioData.experience
    .map(
      (exp) => `
      <div class="relative pl-6 md:pl-8 pb-10 border-l border-white/10 last:pb-2">
        <span class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-500 border-2 border-[#08080A]"></span>

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
    `
    )
    .join("");
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
    triggerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = triggerBtn.getAttribute("aria-expanded") === "true";
      triggerBtn.setAttribute("aria-expanded", String(!isExpanded));
      menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        menu.classList.add("hidden");
        triggerBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
        triggerBtn.setAttribute("aria-expanded", "false");
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

        const focalY = scrollY + 180;
        let activeId = "";

        sections.forEach((sec) => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (focalY >= top && focalY < top + height) {
            activeId = sec.getAttribute("id");
          }
        });

        if (!activeId && scrollY < 320) {
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
  const currentIdx = projectStackState[project.id] || 0;
  const totalSlides = hasStack ? project.portfolioStack.length : 0;

  const modalMediaMarkup = hasStack
    ? renderStackedDeckHTML(project, "modal")
    : project.image
      ? `
      <div class="relative w-full aspect-video mb-6 rounded-xl overflow-hidden border border-white/10 bg-[#121216]">
        <img 
          src="${project.image}" 
          alt="${project.title} preview" 
          width="800" 
          height="450" 
          class="w-full h-full object-cover" 
        />
      </div>
    `
      : "";

  const modalFooterMarkup = hasStack
    ? ""
    : `
      <div class="modal-project-actions pt-5 border-t border-white/10 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        ${project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
                 class="btn-tap-target w-full sm:w-auto px-4 py-2 font-sans font-medium text-xs rounded-xl text-slate-200 hover:text-white border border-white/12 hover:border-white/25 bg-white/5 transition-colors">
                ${icons.github} <span class="ml-2">Source Code</span>
              </a>`
      : ""
    }
        ${project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" 
                 class="btn-tap-target w-full sm:w-auto px-5 py-2 font-sans font-semibold text-xs rounded-xl text-black bg-white hover:bg-slate-200 transition-colors">
                <span>Visit Live Demo</span> <span class="ml-1.5">${icons.externalLink}</span>
              </a>`
      : ""
    }
      </div>
    `;

  modalBody.innerHTML = `
    <!-- Dedicated Header Row: Badges on Left, Close Button on Right (Zero Overlap) -->
    <div class="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-sans text-xs font-medium text-slate-300 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full">
          ${project.category}
        </span>
        ${project.badge
      ? `<span class="font-sans text-xs font-medium text-slate-300 border border-white/10 px-3 py-1 rounded-full bg-white/[0.02]">
                ${project.badge}
              </span>`
      : ""
    }
      </div>

      <button type="button" id="project-modal-close" class="modal-close-button" aria-label="Close project details dialog">
        ${icons.close}
      </button>
    </div>

    ${modalMediaMarkup}

    <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
      ${project.title}
    </h2>

    <p class="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
      ${project.fullDescription || project.shortDescription}
    </p>

    ${project.metrics
      ? `<div class="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 font-medium">
            <span class="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">Key Highlight</span>
            ${project.metrics}
          </div>`
      : ""
    }

    <div class="mb-6">
      <h4 class="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Technologies & Pipeline</h4>
      <div class="flex flex-wrap gap-1.5">
        ${project.techStack.map((tech) => `<span class="tech-pill">${tech}</span>`).join("")}
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
   13. RESPONSIVE ANIMATIONS: SCROLL REVEAL (INTERSECTION OBSERVER)
   ============================================================================== */
function initScrollReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const targets = document.querySelectorAll("section, .card-project, #skills-container > div, #experience-timeline > div");
  targets.forEach((el, index) => {
    if (!el.classList.contains("reveal-item")) {
      el.classList.add("reveal-item");
      if (index % 2 === 1) el.classList.add("delay-100");
      if (index % 3 === 2) el.classList.add("delay-200");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
