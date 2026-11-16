# Modern Developer Portfolio: Dark Charcoal & Glossy Monochrome

Template website portofolio satu halaman (single-page) bertema *Dark Charcoal & Glossy Monochrome*, terinspirasi dari antarmuka developer tools modern seperti Linear, Supabase, dan Raycast.

Dibangun dengan arsitektur **Zero-Build Vanilla JavaScript, Semantic HTML5, dan Tailwind CSS**, serta pemisahan data total pada `data.js` agar Anda dapat mengganti seluruh isi portofolio tanpa menyentuh kode layout atau CSS.

---

## Fitur Utama

1. **Pemisahan Data Penuh (`data.js`):**
   - Seluruh teks, link media sosial, daftar proyek, keahlian teknis (tech stack), riwayat pengalaman kerja, hingga opsi tombol kontak tersimpan rapi dalam satu file konfigurasi terpusat.
2. **Estetika Dark Charcoal & Glossy Monochrome:**
   - Latar belakang arang gelap (`#08080A` hingga `#121215`) dengan efek pantulan bilah kaca (*diagonal glossy light streaks*).
   - Tipografi geometris modern (`Inter`) dipadukan dengan aksen teknis monospace (`JetBrains Mono`).
   - Kontras warna tinggi memenuhi standar aksesibilitas WCAG AA (rasio kontras teks utama > 15:1).
3. **Hero Section Interaktif:**
   - Kotak perintah terminal / email interaktif dengan tombol **Copy to Clipboard** instan disertai feedback visual checklist dan toast notification.
4. **Selected Projects Bento & Clean Grid:**
   - Filter kategori proyek dinamis ("All", "Web Apps", "Developer Tools", "Systems & API") dengan penanganan *Empty State* yang rapi.
   - Modal dialog detail proyek yang dapat dibuka dan ditutup dengan keyboard (tombol Escape) atau klik di luar area modal.
5. **About & Tech Stack 2-Kolom:**
   - Menampilkan filosofi kerja dan badge keahlian monokrom terstruktur.
6. **Experience Timeline:**
   - Riwayat karir terstruktur dengan rincian pencapaian dan tag teknologi terkait.
7. **Floating Quick Contact:**
   - Tombol melayang di pojok kanan bawah yang dapat di-toggle untuk akses cepat ke Email, WhatsApp, LinkedIn, dan GitHub.
8. **Standar Aksesibilitas Penuh (A11y):**
   - Mendukung navigasi keyboard (`Tab`, `Shift+Tab`, `Enter`, `Escape`), indikator fokus yang jelas (`:focus-visible`), dan menghormati preferensi `prefers-reduced-motion`.

---

## Struktur File

```text
├── index.html       # Struktur semantik HTML5 & Tailwind configuration
├── data.js          # File konfigurasi utama (EDIT KONTEN ANDA DI SINI)
├── app.js           # Logika interaktivitas, rendering, clipboard, filter, & modal
├── styles.css       # Custom styles: efek glossy streaks, scrollbar, & glassmorphism
├── DESIGN.md        # Catatan keputusan desain & kepatuhan antislop
└── README.md        # Panduan penggunaan & deployment
```

---

## Cara Menjalankan Portofolio

### Opsi 1: Buka Langsung (Tanpa Instalasi Apapun)
Cukup klik dua kali (double click) file `index.html` pada File Explorer Anda, atau klik kanan lalu pilih **Open with Browser** (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).

### Opsi 2: Menggunakan Live Server di VS Code
1. Buka folder ini di Visual Studio Code.
2. Pasang ekstensi **Live Server**.
3. Klik kanan pada file `index.html` dan pilih **Open with Live Server**.

### Opsi 3: Menggunakan Python atau Node.js
Jika Anda memiliki Python atau Node.js di terminal:

```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan npx serve
npx serve .
```
Lalu buka browser Anda di `http://localhost:8000`.

---

## Cara Mengedit Konten Portofolio

Anda **tidak perlu** mengedit file `index.html` atau `styles.css`. Cukup buka file `data.js` di text editor favorit Anda:

1. **Ubah Informasi Pribadi:**
   Ganti nilai `name`, `handle`, `role`, `email`, dan `commandText` pada bagian `personal`.
2. **Ubah / Tambah Proyek:**
   Buka array `projects` di `data.js`. Setiap proyek memiliki atribut `title`, `category`, `featured`, `shortDescription`, `fullDescription`, `techStack`, `githubUrl`, dan `liveUrl`.
3. **Ubah Keahlian (Tech Stack):**
   Ubah daftar kategori dan item pada array `skills`.
4. **Ubah Riwayat Pengalaman:**
   Sesuaikan array `experience` dengan peran, perusahaan, periode, dan deskripsi tugas Anda.
5. **Ubah Informasi Kontak:**
   Perbarui bagian `contact` dan `floatingContact` (misalnya nomor WhatsApp atau tautan profil LinkedIn).
6. **Simpan file `data.js`** dan refresh browser Anda. Seluruh perubahan akan otomatis langsung terpasang.

---

## Panduan Deployment (Publikasi Online Gratis)

### Vercel / Netlify
1. Buat repositori baru di GitHub dan push file-file proyek ini.
2. Buka [Vercel](https://vercel.com) atau [Netlify](https://netlify.com).
3. Import repositori Anda. Karena proyek ini statis murni, biarkan build setting kosong/default.
4. Klik **Deploy**. Website Anda langsung live dalam hitungan detik.

### GitHub Pages
1. Push proyek ke repositori GitHub Anda.
2. Masuk ke tab **Settings** > **Pages**.
3. Pada bagian *Branch*, pilih branch `main` (atau `master`) dan folder `/ (root)`.
4. Klik **Save**. Portofolio Anda dapat diakses di `https://<username>.github.io/<nama-repo>/`.
