# Toggle Button with Dismiss Close

Script JavaScript ringan (tanpa dependency) untuk menangani buka/tutup elemen di halaman — dropdown, search bar, sidebar mobile menu, overlay, hingga modal — cukup dengan atribut HTML, tanpa perlu menulis JS tambahan tiap kali menambah komponen baru.

**Versi:** 0.8.0
**Author:** Fauzan My
**License:** MIT

---

## Kenapa versi 0.8.0 ini lebih baik dari versi sebelumnya?

| Area | Sebelumnya | v0.8.0 |
|---|---|---|
| **Class visibility** | Dua class custom `open` & `close` harus disinkron manual, dan pernah ada bug logic salah query (`.close` bukan `.open`) saat menutup elemen lain. | Cukup **satu sumber kebenaran**: class `hidden` bawaan Tailwind. Elemen ada `hidden` = tertutup, tidak ada = terlihat. Tidak ada dua class yang bisa "kelupaan" disinkron. |
| **CSS custom** | Tiap komponen (`nav`, `form`, `dark-mode`, dst) butuh aturan CSS sendiri: `.komponen { display:none } .komponen.open { display:block }`. Duplikasi terus bertambah tiap ada komponen baru. | **Tidak perlu CSS custom sama sekali** — tinggal pakai `hidden` bawaan Tailwind. |
| **Elemen yang disentuh script** | Semua elemen ber-class tertentu ikut kesentuh, termasuk elemen `hidden` yang sebenarnya tidak ada hubungannya dengan toggle (misal dipakai untuk responsive `md:hidden`). | Diberi "pagar" lewat atribut `data-toggle-target` — hanya elemen yang eksplisit diberi atribut ini yang pernah disentuh script. Class `hidden` untuk keperluan lain di halaman tetap aman. |
| **Multi-elemen sekaligus** | Beberapa target dalam satu tombol (`data-target="a b"`) saling menutup satu sama lain karena logic "tutup semua yang lain" diproses per-elemen. | Semua ID dalam satu `data-target` diproses sebagai **satu grup atomik** — buka/tutup bersamaan, tidak saling mengganggu. |
| **Tombol close & overlay-click** | Hanya ada satu perilaku dismiss: tutup **semua** yang sedang terbuka. Tidak bisa menutup elemen tertentu saja. | `dismiss` bisa diberi `data-target` sendiri untuk **menutup elemen spesifik** (misal tombol X, atau overlay yang menutup dirinya + sidebar tanpa mengganggu widget lain yang mungkin sedang terbuka). |
| **Event listener** | Listener terpisah per tombol + listener kedua untuk outside-click. | **Satu listener terdelegasi** di `document` untuk semua interaksi — otomatis kompatibel dengan tombol yang ditambahkan secara dinamis. |
| **Aksesibilitas** | Tidak ada. | `aria-expanded` (tombol) dan `aria-hidden` (target) otomatis disinkron, termasuk saat penutupan terjadi lewat trigger lain (X button/overlay/klik luar). |

---

## Instalasi

Masukkan file `toggle-button-dismiss-close.js` sebelum penutup `</body>`, atau via bundler:

```html
<script src="/path/to/toggle-button-dismiss-close.js" defer></script>
```

Pastikan Tailwind CSS sudah aktif di project (script ini bergantung pada class utility `hidden` bawaan Tailwind).

## Aturan dasar (wajib diikuti di semua skenario)

1. Tombol trigger → class `toggle-button` + atribut `data-target="idElemen"` (bisa lebih dari satu ID dipisah spasi).
2. Elemen yang ditoggle → atribut `data-toggle-target` + class `hidden` sebagai kondisi awal (tertutup).
3. Elemen yang berfungsi menutup (tombol X, overlay, dsb) → class `dismiss`, opsional tambah `data-target` untuk menutup ID tertentu saja.

---

## Skenario Penggunaan

### 1. Toggle tombol icon untuk buka search form

```html
<button class="toggle-button" data-target="search-form" aria-expanded="false">
	🔍
</button>

<div id="search-form" class="hidden" data-toggle-target>
	<form>
		<input type="search" placeholder="Cari sesuatu...">
	</form>
</div>
```

- Klik ikon → search form muncul, otomatis fokus ke `input[type="search"]` di dalamnya.
- Klik di luar form atau klik ikon lagi → tertutup kembali.

---

### 2. Trigger tombol burger menu — buka overlay + sidebar navigation-mobile bersamaan

```html
<button class="toggle-button" data-target="navigation-mobile overlay" aria-expanded="false">
	☰ Menu
</button>

<div id="overlay" class="overlay hidden dismiss" data-toggle-target data-target="navigation-mobile overlay"></div>

<nav id="navigation-mobile" class="navigation hidden" data-toggle-target>
	<button class="dismiss" data-target="navigation-mobile overlay">✕</button>
	<ul>
		<li><a href="#">Beranda</a></li>
		<li><a href="#">Tentang</a></li>
	</ul>
</nav>
```

- Klik burger → `overlay` dan `navigation-mobile` muncul **bersamaan** (satu grup, tidak saling menutup).
- Bisa ditutup lewat **3 cara berbeda**, semuanya menutup keduanya sekaligus:
  1. Klik tombol **✕** di dalam nav.
  2. Klik area **overlay** itu sendiri.
  3. Klik burger lagi, atau klik di luar keduanya.
- `aria-expanded` di tombol burger otomatis kembali `false` walau ditutup lewat tombol X atau overlay.

---

### 3. Modal picture (lightbox gambar)

```html
<button class="toggle-button" data-target="modal-picture" aria-expanded="false">
	Lihat Gambar
</button>

<div id="modal-picture" class="hidden fixed inset-0 z-50 flex items-center justify-center" data-toggle-target>
	<div class="dismiss absolute inset-0 bg-black/70"></div>

	<div class="relative bg-white p-4 rounded-lg max-w-2xl">
		<button class="dismiss" data-target="modal-picture">✕</button>
		<img src="/path/to/gambar.jpg" alt="Deskripsi gambar" class="max-h-[80vh]">
	</div>
</div>
```

- Backdrop gelap dan tombol **✕** sama-sama diberi class `dismiss`.
- Karena `modal-picture` di sini cuma satu ID (tidak digabung grup lain), `data-target` di tombol X boleh diisi eksplisit `modal-picture` atau dikosongkan — hasilnya sama karena hanya modal ini yang sedang terbuka.
- Klik di luar gambar (kena backdrop) atau tombol X → modal tertutup.

---

### 4. Box modal info/warning dengan tombol Save atau Delete

```html
<button class="toggle-button" data-target="modal-confirm-delete" aria-expanded="false">
	Hapus Data
</button>

<div id="modal-confirm-delete" class="hidden fixed inset-0 z-50 flex items-center justify-center" data-toggle-target>
	<div class="dismiss absolute inset-0 bg-black/50"></div>

	<div class="relative bg-white p-6 rounded-lg max-w-sm">
		<h2 class="font-bold text-lg">Konfirmasi Hapus</h2>
		<p class="text-gray-600 mt-2">Data yang dihapus tidak bisa dikembalikan. Lanjutkan?</p>

		<div class="mt-4 flex gap-2 justify-end">
			<button class="dismiss" data-target="modal-confirm-delete">Batal</button>
			<button type="button" onclick="handleDelete()">Ya, Hapus</button>
		</div>
	</div>
</div>
```

- Tombol **"Batal"** memakai `dismiss` untuk menutup modal tanpa aksi apa pun.
- Tombol **"Ya, Hapus"** sengaja **tidak** diberi class `dismiss` — dia hanya menjalankan fungsi `handleDelete()` milikmu sendiri (validasi, request ke server, dst). Setelah proses berhasil, kamu bisa menutup modal secara manual dari JS-mu:

```js
function handleDelete() {
	// ...proses hapus data (fetch/AJAX, dsb)...

	document.getElementById('modal-confirm-delete').classList.add('hidden');
}
```

Pola yang sama berlaku untuk tombol **Save**: biarkan tombol Save memicu fungsi validasi/simpan milikmu, lalu tutup modal secara manual setelah proses selesai (berhasil maupun gagal, sesuai kebutuhan UX-mu).

---

## Catatan Penting

- Elemen `#overlay` (kalau dipakai) otomatis mengunci scroll `body` (`overflow: hidden`) selama dia terlihat, dan mengembalikannya begitu tertutup — tidak perlu setup tambahan.
- Class `hidden` di halamanmu yang **tidak** diberi atribut `data-toggle-target` sepenuhnya aman, tidak akan pernah disentuh script ini (misal dipakai untuk keperluan responsive Tailwind `md:hidden`).
- Kalau butuh elemen dengan display khusus saat terbuka (`flex`, `grid`, dst), cukup tulis langsung di class Tailwind elemen tersebut seperti biasa (`class="hidden md:flex" `dsb) — script hanya menambah/menghapus `hidden`, tidak pernah menimpa display value lain.
