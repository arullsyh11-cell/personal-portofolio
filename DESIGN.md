# DESIGN DIRECTION & RATIONALE (Dark Charcoal & Glossy Monochrome)

## 1. Core Identity & Philosophy
- **Identity:** Minimalist, high-performance 3D Generalist, 3D LRC Artist, and React Frontend Developer portfolio inspired by modern creative and developer tooling interfaces.
- **Tone:** Professional, precise, restrained, and authentic. No fake marketing buzzwords, no invented metrics, and no slop decoration.

## 2. Three Dials
- **ENERGY: 2 (Balanced)**. Refined and confident monochrome studio aesthetic with high contrast, crisp borders, and Apple Pearl Liquid Glass floating navigation without over-the-top agency noise.
- **RHYTHM: 2 (Balanced)**. Consistent `max-w-6xl` alignment across all sections with deliberate hierarchy breaks: a 2-column split Hero (Name & Bio on left, soft rounded-square profile photo on right), a project showcase grid with 2-column featured cards and layered stacked decks, a 3-column Core Principles grid, and a vertical career timeline.
- **MOTION: 3 (Bold - Scroll-Linked Choreography)**. Damped 60fps scroll interpolation driving diagonal glossy background drift, Hero depth parallax, continuous scroll-scrubbed project card scale-to-focus, bi-directional directional reveals that replay smoothly on every scroll pass, live scroll-drawn Experience timeline progress rail with illuminated milestone dots, and complete deference to `prefers-reduced-motion: reduce`.

## 3. Palette & Color Decisions (R-01, R-29)
- **Primary Background (`#08080A` to `#0E0E12`):** Deep charcoal base engineered to frame 3D renders and web app screenshots accurately while providing maximum contrast.
- **Glossy Light Streaks Texture:** Multi-angle linear gradient sheen simulates polished dark glass reflection without using generic blueprint or grid slop.
- **Primary Text (`#F8FAFC`):** Crisp white providing a contrast ratio of > 15:1 against `#08080A`, exceeding WCAG AA and AAA requirements.
- **Secondary Text (`#94A3B8`):** Metallic slate gray ensuring high legibility (contrast ratio > 7:1) while establishing clear typographic hierarchy.
- **Borders (`rgba(255, 255, 255, 0.08)` to `0.24`):** Hairline precision borders providing structural definition without heavy solid outlines.

## 4. Typography Decisions (R-06)
- **Headings, UI Controls, Badges & Body (`Inter`):** Clean geometric sans-serif with tight tracking (`tracking-tight`) used across headings, category badges, tech pills, and buttons to avoid the generic AI terminal-monospace look.
- **Technical Accents (`JetBrains Mono`):** Reserved strictly for section eyebrow indices, slide counters (`01 / 03`), and email address copy strings.

## 5. Layout & Component Decisions (R-05, R-14, R-31)
- **Unified Liquid Glass Floating Pill Navbar (Desktop & Mobile):** Centered capsule navigation bar (`#floating-navbar`) using optical blur and specular inner highlights. Displays the circular monogram (`A`) and inline navigation links (`Projects`, `About`, `Experience`, `Contact`) across both mobile and desktop viewports, plus a high-contrast email copy pill on desktop.
- **Hero Split Layout with Soft Rounded-Square Profile Photo:** Places the name (`Muhammad Khoirul Alamsyah`), status indicator, subheadline, and CTA on the left and the profile photo on the right inside a soft rounded-square frame (`border-radius: 1.25rem` to `2rem`) so identity and portrait are balanced without awkward circular cropping or harsh sharp corners.
- **3D & LRC Stacked Window Deck Showcase:** Replaces generic "Live Demo" external links on 3D & LRC projects with an interactive 3D layered window stack (`portfolioStack`). Users can scroll (mouse wheel), swipe/drag (touch/pointer), or click `Geser Karya` to cycle through multiple 3D renders and lighting passes in place.
- **Segmented Horizontal Category Filter Pills:** Uses a compact horizontal pill bar (`All`, `3D & LRC`, `Web Apps`) with `whitespace-nowrap` so category filters remain on a single clean line on both mobile and desktop.
- **Equal-Height Contact Action Controls:** Both `Copy` and `Send Email` buttons share an identical `44px` (`h-11`) height and `0.75rem` border-radius for visual alignment and mobile tap accessibility.

## 6. Antislop Compliance Checklist (Core & UI)
- [x] R-02 Copywriting: Zero em dashes in any UI text or documentation.
- [x] R-03 Mobile Responsiveness: Clean responsive design from 320px to 1920px+ with touch targets >= 44px.
- [x] R-04 Icons: Authentic, content-relevant inline SVGs. Zero emoji decoration in copy.
- [x] R-07 Background: Refined diagonal glass streaks, zero generic grid slop.
- [x] R-10 Glassmorphism: Capped at 2 surfaces (top liquid glass navbar and modal overlay/floating popover).
- [x] R-13 Glow: Capped at subtle hover border highlights, zero excessive neon glow.
- [x] R-16 No Buzzwords: Clear, specific descriptions without generic AI hype words.
- [x] R-17 & R-18: No fake statistics or fictional testimonials.
- [x] R-24 & R-26: All navigation items, 3D stack controls, and buttons have working behavior or real anchors.
- [x] R-27 UI States: Empty state implemented for project filtering.
- [x] R-32 Keyboard Accessibility: Visible focus rings, keyboard navigability, Escape key closing for modals and menus.
- [x] R-39 Accessible Semantics: Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), one `<h1>`, valid `<button>` and `<a>` tags.
- [x] R-40 Performance: Zero render-blocking scripts, explicit image dimensions (`width` and `height`), `fetchpriority="high"` on hero image.
