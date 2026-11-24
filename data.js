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
    monogram: "A",
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
      "3D Generalist & 3D LRC (Lighting, Rendering, Compositing) Artist, also crafting responsive, clean web applications.",
    ctaButton: {
      label: "Lihat proyek pilihan",
      href: "#projects",
    },
    microNote: "3D Production Pipeline · Lighting & Rendering · JavaScipt · HTML & CSS",
  },

  // ----------------------------------------------------------------------------
  // 5. Selected Projects (Daftar Proyek Pilihan)
  // ----------------------------------------------------------------------------
  projectCategories: ["All", "Frontend", "3D"],

  projects: [
    {
      id: "project-gymflow",
      order: 1,
      visible: true,
      title: "GYMFlow: Fitness & Workout Tracking Web App",
      description:
        "Aplikasi web pencatat jadwal, beban latihan, dan progres gym harian yang berjalan cepat di browser dengan JavaScript dan penyimpanan LocalStorage.",
      fullDescription:
        "GYMFlow dirancang untuk mempermudah pencatatan sesi gym harian tanpa hambatan input yang rumit. Dibangun menggunakan HTML, CSS, Vanilla JavaScript, dan LocalStorage API dengan visualisasi grafik performa latihan serta pelacakan volume beban secara real-time.",
      category: "Frontend",
      tech: ["JavaScript", "HTML", "CSS", "LocalStorage API"],
      image: "assets/images/gymflow.png",
      imageAlt: "Tampilan dashboard utama aplikasi web kebugaran GYMFlow",
      demoUrl: "https://gymflow.my.id/",
      repoUrl: "https://github.com/arullsyh11-cell/arullsyh11-cell.github.io",
      featured: true,
      metrics: "State-driven workout log with instant responsive telemetry",
    },
    {
      id: "project-taskly",
      order: 2,
      visible: true,
      title: "TASKLY: Focused Task & Sprint Productivity App",
      description:
        "Aplikasi produktivitas untuk pengelolaan tugas harian, ringkasan progres sprint, pencarian label cepat, dan Focus Mode dengan antarmuka gelap yang tenang.",
      fullDescription:
        "TASKLY menghadirkan ringkasan alur kerja harian (Total & Selesai, Berjalan, Fokus Hari Ini, Terlambat), fitur Quick Add Task, perencanaan sprint, pencarian tugas instan, serta Focus Mode khusus. Dibangun menggunakan React 19, Vite 6, React Router v7, Tailwind CSS, CSS Variables Design Tokens, dan ikon Lucide React.",
      category: "Frontend",
      tech: ["React", "Vite", "Tailwind CSS", "Lucide React"],
      image: "assets/images/taskly.webp",
      imageAlt: "Tampilan dashboard utama workspace manajemen tugas TASKLY",
      demoUrl: "https://taskly-beta-opal.vercel.app/",
      repoUrl: "https://github.com/arullsyh11-cell/TASKLY",
      featured: false,
      metrics: "Token-driven dark workspace with sprint tracking & Focus Mode",
    },
    {
      id: "project-lrc",
      order: 3,
      visible: true,
      // TODO: Sesuaikan judul/deskripsi khusus karya LRC ini bila diperlukan
      title: "LRC: Lighting, Rendering & Compositing",
      description:
        "Studi tata pencahayaan dramatis, pemodelan arah bayangan natural, dan compositing multi-pass untuk membangun mood arsitektural serta kedalaman ruang 3D.",
      fullDescription:
        "Karya 3D Lighting, Rendering, and Compositing (LRC) yang berfokus pada penataan kontras cahaya terarah, jatuhnya bayangan lembut pada permukaan patung klasik, serta final grading compositing.",
      category: "3D",
      tech: ["3D Lighting", "Rendering & Shading", "Compositing", "Blender"],
      image: "assets/images/lighting.webp",
      imageAlt: "Render 3D LRC studi pencahayaan dan bayangan arsitektural pada deretan patung klasik",
      demoUrl: "",
      repoUrl: "",
      featured: false,
      metrics: "Directional light shafts and controlled shadow falloff study",
    },
    {
      id: "project-cinematic-lrc",
      order: 4,
      visible: true,
      title: "Cinematic Environment & LookDev Showcase",
      description:
        "Eksplorasi pencahayaan sinematik, material look development, dan compositing multi-pass EXR menggunakan color pipeline ACEScg untuk scene karakter 3D.",
      fullDescription:
        "Proyek 3D Lighting, Rendering, and Compositing (LRC) yang memfokuskan pada penataan mood visual, pemodelan cahaya natural dan artificial (three-point and rim lighting), multi-pass EXR rendering (beauty, diffuse, specular, crypto, ambient occlusion), serta final grading compositing.",
      category: "3D",
      tech: ["3D Lighting", "Rendering & Shading", "Compositing", "Blender"],
      image: "assets/images/cinematic-lrc.webp",
      imageAlt: "Render akhir Cinematic Environment & LookDev Showcase dengan pencahayaan senja ACEScg",
      demoUrl: "",
      repoUrl: "",
      featured: false,
      metrics: "High dynamic range lighting with 32-bit multi-channel EXR compositing",
    },
    {
      id: "project-orbit",
      order: 5,
      visible: false,
      title: "ORBIT: Minimalist Productivity & Workspace",
      description:
        "Workspace produktivitas dengan kanban board, sprint tugas, dan timer.",
      fullDescription:
        "ORBIT mengintegrasikan alur kerja produktivitas mulai dari kanban boards, prioritasi sprint tugas, hingga mode focus timer dengan antarmuka monokrom yang bersih, cepat, dan bebas dari distraksi.",
      category: "Frontend",
      tech: ["JavaScript", "HTML", "CSS", "LocalStorage API"],
      image: "assets/images/orbit.png",
      demoUrl: "https://dayflow-flax.vercel.app/",
      repoUrl: "https://github.com/arullsyh11-cell/ORBIT",
      featured: false,
      metrics: "Sub-100ms interaction latency with zero UI bloat",
    },
    {
      id: "project-hard-surface",
      order: 6,
      visible: false,
      title: "Hard Surface Assets & Scene Assembly",
      description:
        "Pemodelan 3D hard surface bertopologi quad bersih dan tekstur PBR 4K.",
      fullDescription:
        "Portofolio 3D Generalist yang mencakup alur kerja komprehensif mulai dari blockout, sub-division surface modeling, retopology quad bersih, baking normal map, penataan tekstur PBR procedural, hingga final stage presentation.",
      category: "3D",
      tech: ["3D Modeling", "SubD Topology", "3D Printing"],
      image: "assets/images/Generalist-3d.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
      metrics: "Production-ready clean quad topology with optimized draw calls",
    },
    {
      id: "project-ancient-sculptures",
      order: 7,
      visible: false,
      title: "The Beauty of Ancient Sculptures",
      description:
        "Studi tata cahaya dramatis dan kontras bayangan pada patung klasik 3D.",
      category: "3D",
      tech: ["3D Lighting", "Rendering & Shading", "Compositing", "Blender"],
      image: "assets/images/lighting.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-timeless-moments",
      order: 8,
      visible: false,
      title: "Capturing Timeless Moments",
      description:
        "Eksplorasi shading material logam kamera klasik dengan cahaya studio.",
      category: "3D",
      tech: ["3D Lighting", "LookDev", "Rendering & Shading", "Blender"],
      image: "assets/images/Camera.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-multipass-breakdown",
      order: 9,
      visible: false,
      title: "Multi-Pass Lighting & Shader Breakdown",
      description:
        "Rincian multi-pass lighting, refleksi shader, dan grading karakter 3D.",
      category: "3D",
      tech: ["3D Lighting", "Rendering & Shading", "Compositing", "Blender"],
      image: "assets/images/cinematic-lrc-2.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-atmosphere-depth",
      order: 10,
      visible: false,
      title: "Atmosphere & Depth Compositing Pass",
      description:
        "Pengolahan kabut volumetrik dan kedalaman ruang pada compositing EXR.",
      category: "3D",
      tech: ["Compositing", "3D Lighting", "Rendering & Shading", "Blender"],
      image: "assets/images/cinematic-lrc-3.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-subd-topology",
      order: 11,
      visible: false,
      title: "Hard Surface SubD & Quad Topology",
      description:
        "Struktur pemodelan SubD presisi tinggi dengan alur topologi quad rapi.",
      category: "3D",
      tech: ["3D Modeling", "SubD Topology", "Blender"],
      image: "assets/images/Generalist-3d-4.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-pbr-lookdev",
      order: 12,
      visible: false,
      title: "4K PBR Metallic & Weathering LookDev",
      description:
        "Pengembangan material logam PBR 4K lengkap dengan detail aus permukaan.",
      category: "3D",
      tech: ["3D Modeling", "LookDev", "Substance Painter", "Blender"],
      image: "assets/images/Generalist-3d-2.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-scene-turntable",
      order: 13,
      visible: false,
      title: "Full Scene Assembly & Turntable Render",
      description:
        "Perakitan komponen kendaraan 3D utuh untuk presentasi turntable studio.",
      category: "3D",
      tech: ["3D Modeling", "SubD Topology", "Rendering & Shading"],
      image: "assets/images/Generalist-3d-3.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-heavy-machinery",
      order: 14,
      visible: false,
      title: "Engineering Heavy Machinery",
      description:
        "Pemodelan proporsi mekanis dan komponen artikulasi unit alat berat 3D.",
      category: "3D",
      tech: ["3D Modeling", "SubD Topology", "3D Printing"],
      image: "assets/images/Generalist-3d-7.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-weapon-precision",
      order: 15,
      visible: false,
      title: "Precision in Every Detail",
      description:
        "Pemodelan hard surface senjata dengan bevel tajam dan detail mekanis.",
      category: "3D",
      tech: ["3D Modeling", "SubD Topology", "Blender"],
      image: "assets/images/weapon-1.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-heavy-operations",
      order: 16,
      visible: false,
      title: "Built for Heavy Operations",
      description:
        "Konstruksi bodi kendaraan taktis 3D dengan topologi siap cetak dan rig.",
      category: "3D",
      tech: ["3D Modeling", "SubD Topology", "3D Printing"],
      image: "assets/images/Generalist-3d-5.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "project-mechanical-complexity",
      order: 17,
      visible: false,
      title: "Exploring Mechanical Complexity",
      description:
        "Eksplorasi rakitan sambungan mekanik kompleks pada aset kendaraan 3D.",
      category: "3D",
      tech: ["3D Modeling", "SubD Topology", "3D Printing"],
      image: "assets/images/Generalist-3d-6.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
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
      "Dalam dunia 3D, saya berfokus pada LookDev, tata pencahayaan (lighting setup), dan compositing untuk menciptakan atmosfer visual yang memikat. Di sisi web development, saya membangun aplikasi fungsional seperti GYMFlow, ORBIT, dan TASKLY dengan mengedepankan performa cepat, interaksi intuitif, dan pengalaman pengguna yang nyaman.",
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
        "Merancang dan mengembangkan aplikasi web kebugaran GYMFlow menggunakan HTML, CSS, JavaScript.",
        "Membangun aplikasi produktivitas ORBIT dan TASKLY dengan fitur kanban board, real-time focus timer, dan manajemen state modular.",
        "Mengoptimalkan bundle size dan performa rendering frontend untuk memastikan pengalaman pengguna yang mulus.",
      ],
      skillsUsed: ["HTML", "CSS", "JavaScript", "React JS", "Vite", "Tailwind CSS"],
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
