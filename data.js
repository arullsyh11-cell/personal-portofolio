/**
 * ==============================================================================
 * DATA KONFIGURASI PORTOFOLIO (SINGLE SOURCE OF TRUTH)
 * ==============================================================================
 * Anda dapat mengubah seluruh teks, tautan, proyek, keahlian, dan informasi
 * kontak di bawah ini tanpa perlu mengubah tata letak HTML atau CSS.
 *
 * Petunjuk:
 * 1. Ubah teks di dalam tanda kutip sesuai dengan profil Anda.
 * 2. Tambah, ubah, atau hapus item pada array proyek atau pengalaman.
 * 3. Untuk mengganti gambar proyek, letakkan file gambar Anda di folder
 *    'assets/images/' lalu perbarui jalur pada properti 'image'.
 * 4. Simpan file ini dan refresh browser Anda untuk melihat perubahan langsung.
 * ==============================================================================
 */

const portfolioData = {
  // ----------------------------------------------------------------------------
  // 1. Profil Pribadi & Identitas Brand
  // ----------------------------------------------------------------------------
  personal: {
    name: "Muhammad Khoirul Alamsyah",
    handle: "/khoirulalamsyah",
    monogram: "A", // Inisial / logo monogram pada navbar (seperti referensi)
    role: "3D Generalist, 3D LRC Artist & Frontend Developer",
    location: "Jakarta, Indonesia (UTC+7)",
    availability: {
      status: "available", // 'available' | 'busy' | 'selective'
      label: "Available for 3D & Web Projects",
    },
    email: "arullsyh11@gmail.com",
    resumeUrl: "#", // Tautan ke file CV / Resume PDF Anda
  },

  // ----------------------------------------------------------------------------
  // 2. Navigasi Utama (Top Navigation)
  // ----------------------------------------------------------------------------
  navigation: [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  // ----------------------------------------------------------------------------
  // 3. Tautan Media Sosial & Eksternal
  // ----------------------------------------------------------------------------
  socials: [
    {
      name: "GitHub",
      url: "https://github.com",
      username: "khoirulalamsyah",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      username: "khoirul-alamsyah",
      icon: "linkedin",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com",
      username: "@khoirul_dev",
      icon: "twitter",
    },
  ],

  // ----------------------------------------------------------------------------
  // 4. Hero Section
  // ----------------------------------------------------------------------------
  hero: {
    statusBadge: "Available for 3D LRC & React Web Projects",
    headline: "Muhammad Khoirul Alamsyah",
    subheadline:
      "3D Generalist & 3D LRC (Lighting, Rendering, Compositing) Artist, also crafting responsive, clean web applications with React JS.",
    ctaButton: {
      label: "Lihat proyek pilihan",
      href: "#projects",
    },
    microNote: "3D Production Pipeline · Lighting & Rendering · React JS · Semantic HTML & Tailwind CSS",
  },

  // ----------------------------------------------------------------------------
  // 5. Selected Projects (Daftar Proyek Pilihan)
  // ----------------------------------------------------------------------------
  projectCategories: ["All", "3D & LRC", "Web Apps"],

  projects: [
    {
      id: "project-1",
      title: "GYMFlow: Fitness & Workout Tracking Web App",
      category: "Web Apps",
      featured: true, // Proyek unggulan mendapatkan ukuran kartu yang lebih luas
      badge: "React Web App",
      image: "assets/images/gymflow.png", // Ganti dengan file gambar Anda (misal: assets/images/gymflow.png)
      shortDescription:
        "Aplikasi web kebugaran untuk pelacakan volume latihan gym harian, visualisasi grafik progres mingguan, dan manajemen rutinitas latihan berbasis React JS.",
      fullDescription:
        "GYMFlow dirancang untuk mempermudah pencatatan sesi gym harian tanpa hambatan input yang rumit. Dibangun menggunakan React JS dengan arsitektur komponen modular, visualisasi grafik performa latihan, dan manajemen state reaktif untuk pelacakan volume beban latihan secara real-time.",
      techStack: ["React JS", "Tailwind CSS", "JavaScript ESNext", "Chart.js", "LocalStorage API"],
      githubUrl: "https://github.com",
      liveUrl: "https://gymflow.my.id/",
      metrics: "State-driven workout log with instant responsive telemetry",
    },
    {
      id: "project-2",
      title: "ORBIT: Minimalist Productivity & Workspace",
      category: "Web Apps",
      featured: false,
      badge: "Productivity App",
      image: "assets/images/orbit.png", // Ganti dengan file gambar Anda (misal: assets/images/orbit.png)
      shortDescription:
        "Aplikasi produktivitas berbasis web dengan sistem kanban board responsif, pelacak sprint tugas, dan mode fokus timer yang dibangun menggunakan React JS.",
      fullDescription:
        "ORBIT mengintegrasikan alur kerja produktivitas mulai dari kanban boards, prioritasi sprint tugas, hingga mode focus timer. Menggunakan React JS untuk render antarmuka yang cepat, fluid drag-and-drop, dan antarmuka monokrom yang bebas dari distraksi.",
      techStack: ["React JS", "Tailwind CSS", "React Context", "Vite", "Web Storage"],
      githubUrl: "https://github.com",
      liveUrl: "https://dayflow-flax.vercel.app/",
      metrics: "Sub-100ms interaction latency with zero UI bloat",
    },
    {
      id: "project-3",
      title: "Cinematic Environment & LookDev Showcase",
      category: "3D & LRC",
      featured: true,
      badge: "3D LRC Production",
      image: "assets/images/cinematic-lrc.jpg",
      // Daftar karya portofolio 3D & LRC yang tampil bertumpuk (Stacked Deck) dan berganti saat digeser / di-scroll:
      portfolioStack: [
        {
          title: "Final ACEScg Beauty Composite",
          image: "assets/images/cinematic-lrc.jpg",
        },
        {
          title: "Multi-Pass Lighting & Shader Breakdown",
          image: "assets/images/cinematic-lrc-2.jpg",
        },
        {
          title: "Atmosphere & Depth Compositing Pass",
          image: "assets/images/cinematic-lrc-3.jpg",
        },
        {
          title: "The Beauty of Ancient Sculptures",
          image: "assets/images/lighting.png"
        },
        {
          title: "Capturing Timeless Moments",
          image: "assets/images/Camera.png"
        },
      ],
      shortDescription:
        "Eksplorasi pencahayaan sinematik (lighting), material look development, dan compositing untuk lingkungan 3D realistis menggunakan color pipeline ACEScg.",
      fullDescription:
        "Proyek 3D Lighting, Rendering, and Compositing (LRC) yang memfokuskan pada penataan mood visual, pemodelan cahaya natural dan artificial (three-point and rim lighting), multi-pass EXR rendering (beauty, diffuse, specular, crypto, ambient occlusion), serta final grading compositing.",
      techStack: ["3D Lighting", "Rendering & Shading", "Compositing", "ACEScg Pipeline", "Blender"],
      githubUrl: null,
      liveUrl: null,
      metrics: "High dynamic range lighting with 32-bit multi-channel EXR compositing",
    },
    {
      id: "project-4",
      title: "Hard Surface Assets & Scene Assembly",
      category: "3D & LRC",
      featured: false,
      badge: "3D Generalist",
      image: "assets/images/Generalist-3d.jpg",
      // Daftar karya portofolio 3D Generalist yang tampil bertumpuk (Stacked Deck) dan berganti saat digeser / di-scroll:
      portfolioStack: [
        {
          title: "Hard Surface SubD & Quad Topology",
          image: "assets/images/Generalist-3d-4.jpg",
        },
        {
          title: "4K PBR Metallic & Weathering LookDev",
          image: "assets/images/Generalist-3d-2.jpg",
        },
        {
          title: "Full Scene Assembly & Turntable Render",
          image: "assets/images/Generalist-3d-3.jpg",
        },
        {
          title: "Engineering Heavy Machinery",
          image: "assets/images/Generalist-3d-7.png",
        },
        {
          title: "Precision in Every Detail",
          image: "assets/images/weapon-1.png",
        },
        {
          title: "Built for Heavy Operations",
          image: "assets/images/Generalist-3d-5.png",
        },
        {
          title: "Exploring Mechanical Complexity",
          image: "assets/images/Generalist-3d-6.png"
        }
      ],
      shortDescription:
        "Pemodelan 3D hard surface dengan topologi quad bersih, pemetaan UV tanpa distorsi, tekstur PBR 4K, dan integrasi assembly aset ke dalam scene utuh.",
      fullDescription:
        "Portofolio 3D Generalist yang mencakup alur kerja komprehensif mulai dari blockout, sub-division surface modeling, retopology quad bersih, baking normal map, penataan tekstur PBR procedural, hingga final stage presentation.",
      techStack: ["3D Modeling", "SubD Topology", "UV Unwrapping", "PBR Texturing", "LookDev"],
      githubUrl: null,
      liveUrl: null,
      metrics: "Production-ready clean quad topology with optimized draw calls",
    },
  ],

  // ----------------------------------------------------------------------------
  // 6. About Section (Tentang Saya & Filosofi Kerja)
  // ----------------------------------------------------------------------------
  about: {
    sectionTitle: "About Me",
    sectionSubtitle: "Blending visual art with interactive web engineering.",
    paragraphs: [
      "Saya adalah seorang 3D Generalist dan 3D LRC (Lighting, Rendering, Compositing) Artist yang juga memiliki passion kuat dalam pengembangan aplikasi web modern menggunakan React JS. Pengalaman ganda ini memberi saya perspektif unik dalam memahami estetika visual sinematik sekaligus struktur kode yang rapi dan terukur.",
      "Dalam dunia 3D, saya berfokus pada LookDev, tata pencahayaan (lighting setup), dan compositing untuk menciptakan atmosfer visual yang memikat. Di sisi web development, saya membangun aplikasi fungsional seperti GYMFlow dan ORBIT dengan mengedepankan performa cepat, interaksi intuitif, dan pengalaman pengguna yang nyaman.",
    ],
    principles: [
      {
        title: "Visual & Lighting Intentionality",
        desc: "Setiap sumber cahaya, refleksi material, dan grading warna diatur secara terarah untuk menguatkan atmosfer cerita pada karya 3D.",
      },
      {
        title: "Clean React Architecture",
        desc: "Membangun komponen web yang modular, reusable, dan hemat resource agar aplikasi web tetap responsif di berbagai perangkat.",
      },
      {
        title: "Craftsmanship & Precision",
        desc: "Menjaga kualitas detail, mulai dari topologi model 3D quad yang rapi hingga semantik kode yang mudah dipelihara.",
      },
    ],
  },

  // ----------------------------------------------------------------------------
  // 7. Tech Stack (Keahlian & Teknologi)
  // ----------------------------------------------------------------------------
  skills: [
    {
      category: "3D & Visual Production",
      items: ["3D Modeling", "Lighting & LookDev", "Rendering & Shading", "Compositing"],
    },
    {
      category: "Web & Frontend",
      items: ["React JS", "JavaScript (ESNext)", "Tailwind CSS", "HTML5 & CSS3", "Vite", "Component State"],
    },
    {
      category: "Pipeline & Software",
      items: ["Blender", "Substance Painter", "Photoshop", "Git & GitHub", "Figma"],
    },
  ],

  // ----------------------------------------------------------------------------
  // 8. Experience (Riwayat Pengalaman Kerja)
  // ----------------------------------------------------------------------------
  experience: [
    {
      role: "Magang 3D Generalist & LRC Artist",
      company: "Creative Digital Studio",
      period: "2023 - 2024",
      location: "Jakarta, Indonesia (Hybrid)",
      description: [
        "Mengerjakan pipeline tata pencahayaan (lighting), shading material, dan rendering untuk scene 3D komersial dan visual produk.",
        "Mengelola alur kerja compositing multi-pass EXR untuk mencapai mood visual dan fidelity warna berstandar industri.",
        "Berkolaborasi dengan tim art director untuk menyempurnakan look development aset 3D hard surface.",
      ],
      skillsUsed: ["3D Lighting", "LookDev", "Compositing", "Blender"],
    },
    {
      role: "Frontend Web Developer (React JS)",
      company: "Independent Web Projects",
      period: "2025 - Present",
      location: "Personal Project",
      description: [
        "Merancang dan mengembangkan aplikasi web kebugaran GYMFlow menggunakan React JS dan Tailwind CSS.",
        "Membangun aplikasi produktivitas ORBIT dengan fitur kanban board, real-time focus timer, dan manajemen state modular.",
        "Mengoptimalkan bundle size dan performa rendering frontend untuk memastikan pengalaman pengguna yang mulus.",
      ],
      skillsUsed: ["React JS", "Tailwind CSS", "JavaScript ESNext", "Vite"],
    },
  ],

  // ----------------------------------------------------------------------------
  // 9. Contact Section & Collaboration
  // ----------------------------------------------------------------------------
  contact: {
    sectionTitle: "Get in Touch",
    sectionSubtitle: "Tertarik berkolaborasi untuk proyek 3D LRC, visual render, atau pengembangan aplikasi web React? Pintu komunikasi selalu terbuka.",
    directEmailLabel: "Email Langsung",
    directEmail: "arullsyh11@gmail.com",
    calendlyUrl: "https://calendar.google.com",
    responseTime: "Biasanya membalas dalam kurun waktu 24 jam kerja",
    locationNote: "Berbasis di Jakarta (WIB / UTC+7) · Terbuka untuk opsi Remote Global",
  },

  // ----------------------------------------------------------------------------
  // 10. Floating Quick Contact Pill (Pojok Kanan Bawah)
  // ----------------------------------------------------------------------------
  floatingContact: {
    enabled: true,
    buttonLabel: "Quick Contact",
    options: [
      {
        label: "Send Email",
        url: "mailto:arullsyh11@gmail.com",
        icon: "mail",
      },
      {
        label: "LinkedIn Message",
        url: "https://www.linkedin.com/in/m-khoirul-alamsyah-2b2315450/",
        icon: "linkedin",
      },
      {
        label: "GitHub Profile",
        url: "https://github.com/arullsyh11-cell",
        icon: "github",
      },
    ],
  },

  // ----------------------------------------------------------------------------
  // 11. Footer
  // ----------------------------------------------------------------------------
  footer: {
    copyright: "Designed & engineered with clean monochrome aesthetics.",
    builtWith: "Pure Semantic HTML, Tailwind CSS & Vanilla JS. Zero tracking.",
  },
};

// Export untuk lingkungan Node.js (jika ada unit test / build tooling),
// sekaligus siap pakai di browser window globals.
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
