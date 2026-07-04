# Pehtheme

Pehtheme adalah proyek template HTML statis yang dibangun dengan **Eleventy (11ty)**, **Nunjucks**, dan **Tailwind CSS**.

Repositori ini dirancang sebagai **sumber template HTML siap pakai + output yang bisa didistribusikan**:

- `src/` berisi berkas sumber untuk pengembangan
- `dist/` berisi HTML final yang sudah digenerate beserta CSS hasil kompilasi, siap untuk disalin, di-preview, atau di-deploy

Pehtheme tidak hanya berfungsi sebagai repositori starter HTML — proyek ini bisa langsung digunakan untuk membangun **landing page**, **company profile site**, atau **website marketing statis kecil**, lalu di-deploy ke platform static hosting seperti **Cloudflare Pages**.

---

## Tujuan proyek

Pehtheme berfokus pada pembangunan template website statis yang bersih dengan partial yang reusable dan arsitektur CSS modular.

Target template saat ini:

- Home
- About
- Services
- Page
- Contact
- Single article template

---

## Tech stack

- [Eleventy (11ty)](https://www.11ty.dev/) — static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) — templating
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS
- [PNPM](https://pnpm.io/) — package manager

---

## Struktur proyek

```text
.
├── archive/
│   └── pre-11ty-template/
├── dist/
│   ├── index.html
│   ├── about/
│   ├── contact/
│   ├── page/
│   ├── services/
│   ├── single/
│   └── assets/
│       ├── css/
│       └── images/
├── src/
│   ├── _data/
│   │   └── site.json
│   ├── _includes/
│   │   ├── layouts/
│   │   ├── partials/
│   │   └── sections/
│   ├── assets/
│   │   ├── css/
│   │   └── images/
│   ├── about.njk
│   ├── contact.njk
│   ├── index.njk
│   ├── page.njk
│   ├── services.njk
│   └── single.njk
├── .eleventy.js
├── package.json
└── README.md
```

---

## Arsitektur CSS

Pehtheme menggunakan struktur CSS modular di atas Tailwind CSS.

```text
src/assets/css/
├── app.css
├── critical.css
├── home.css
├── page.css
├── single.css
├── services.css
├── contact.css
└── core
    ├── base.css
    ├── theme.css
    └── components
        ├── button.css
        ├── card.css
        ├── header.css
        ├── navigation.css
        ├── navigation-mobile.css
        ├── page-header.css
        └── pagination.css
```

### Peran masing-masing file CSS

| File           | Peran                                             |
| -------------- | ------------------------------------------------- |
| `app.css`      | Entry file utama Tailwind sekaligus agregator CSS |
| `critical.css` | Helper layout global dan gaya struktural bersama  |
| `home.css`     | Gaya khusus halaman home                          |
| `page.css`     | Gaya untuk halaman generik                        |
| `single.css`   | Gaya untuk template artikel/single                |
| `services.css` | Gaya untuk halaman services                       |
| `contact.css`  | Gaya untuk halaman contact                        |

Di dalam `core/`:

| File               | Peran                                      |
| ------------------ | ------------------------------------------ |
| `base.css`         | Styling elemen dasar                       |
| `theme.css`        | Token level tema dan aturan visual bersama |
| `components/*.css` | Gaya komponen yang reusable                |

---

## Cara pakai

### 1) Clone repositori

```bash
git clone https://github.com/fauzanmy/pehtheme.git
cd pehtheme
```

### 2) Install dependencies

```bash
pnpm install
```

### 3) Jalankan mode development

```bash
pnpm dev
```

Perintah ini akan menjalankan:

- Eleventy development server
- Tailwind CSS watch build

URL development lokal default:

```
http://localhost:8081
```

### 4) Edit sumber template

Sumber pengembangan utama berada di:

- `src/` → halaman, layout, partial, section, data global
- `src/assets/css/` → sumber CSS modular berbasis Tailwind
- `src/assets/images/` → gambar/aset template

Berkas yang biasanya diedit:

- `src/index.njk` → template homepage
- `src/about.njk` → halaman about
- `src/services.njk` → halaman services
- `src/contact.njk` → halaman contact
- `src/page.njk` → template halaman generik
- `src/single.njk` → template artikel single
- `src/_data/site.json` → metadata situs dan nilai global yang reusable

### 5) Build output statis final

```bash
pnpm build
```

Berkas hasil generate akan ditulis ke:

```
dist/
```

---

## Distribusi dan penggunaan

Pehtheme bisa digunakan dengan dua cara.

### Opsi A — Digunakan sebagai proyek sumber pengembangan

Mode ini direkomendasikan jika ingin mengkustomisasi landing page atau membangun full static site.

Alur kerja:

1. clone repositori
2. edit berkas di `src/`
3. jalankan `pnpm dev` selama pengembangan
4. jalankan `pnpm build`
5. gunakan output hasil generate dari `dist/`

### Opsi B — Hanya menggunakan output HTML siap pakai

Jika tidak ingin bekerja dengan berkas sumber 11ty/Nunjucks/Tailwind, cukup gunakan berkas hasil generate di dalam:

```
dist/
```

Isi `dist/` dapat disalin ke:

- shared hosting
- static web server
- CDN/static bucket
- deployment source Cloudflare Pages
- lingkungan apa pun yang bisa menyajikan HTML/CSS/aset statis

---

## Build output

Direktori `dist/` berisi output website final hasil generate, termasuk:

- halaman HTML yang digenerate
- CSS hasil kompilasi
- aset statis yang disalin

Halaman yang saat ini digenerate:

- `/`
- `/about/`
- `/services/`
- `/page/`
- `/contact/`
- `/single/`

Karena repositori ini dirancang untuk berfungsi baik sebagai source code maupun output template siap pakai, direktori `dist/` sengaja di-commit ke repositori.

---

## Deploy ke Cloudflare Pages

Pehtheme dapat di-deploy langsung ke Cloudflare Pages sebagai static site.

### Pendekatan deployment yang direkomendasikan

Gunakan repositori sebagai sumber dan biarkan Cloudflare Pages melakukan build proyek secara otomatis.

**Pengaturan Cloudflare Pages:**

- Framework preset: `None / Static site`
- Build command:
    ```bash
    pnpm build
    ```
- Build output directory:
    ```
    dist
    ```

**Catatan untuk Cloudflare Pages:**

- pastikan proyek menggunakan Node.js dengan dukungan PNPM di environment build Cloudflare Pages
- berkas final yang dipublikasikan berasal dari direktori `dist/`
- karena Pehtheme adalah static site, proyek ini tidak memerlukan server runtime

### Alternatif pendekatan deployment

Jika lebih memilih untuk tidak membiarkan Cloudflare membangun proyek, kamu juga bisa:

1. jalankan `pnpm build` secara lokal
2. upload folder `dist/` hasil generate sebagai artifact deployment

Hal ini membuat Pehtheme cocok untuk:

- landing page
- situs agency/company profile
- microsite produk
- situs statis mirip dokumentasi
- website marketing sederhana

---

## Konvensi repositori penting

Repositori ini menyimpan baik berkas sumber maupun output build final.

**Source of truth:**

- `src/` → sumber pengembangan
- `.eleventy.js` → konfigurasi Eleventy
- `package.json` → scripts dan dependencies

**Output distribusi final:**

- `dist/` → HTML + CSS hasil kompilasi yang siap pakai

Karena repositori ini dimaksudkan untuk digunakan sebagai paket template HTML, direktori `dist/` di-commit ke repositori dan harus tetap disinkronkan dengan sumbernya.

### Alur kerja yang direkomendasikan sebelum commit

Setelah melakukan perubahan template atau CSS:

```bash
pnpm build
git add .
git commit -m "your message"
```

---

## Archive

Direktori `archive/` menyimpan versi template lama sebelum migrasi ke Eleventy:

```
archive/
└── pre-11ty-template/
```

---

## Catatan

- stack aktif saat ini adalah 11ty + Nunjucks + Tailwind CSS
- `dist/` sengaja di-commit karena berfungsi sebagai output template siap pakai
- `archive/pre-11ty-template/` menyimpan template lama sebelum migrasi
- Pehtheme dapat langsung digunakan sebagai proyek landing page statis dan di-deploy ke platform seperti Cloudflare Pages
