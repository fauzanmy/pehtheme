document.addEventListener('DOMContentLoaded', function () {
	const lightbox = document.querySelector('.lightbox');
	const closeLightboxBtn = document.querySelector('.close-lightbox');
	const lightboxFigures = document.querySelectorAll('.lightbox-content figure');
	const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
	const galleryItems = document.querySelectorAll('.gallery-item'); // Gambar dalam galeri di halaman
	let currentLightboxSlide = 0;

	// Fungsi untuk membuka lightbox dan menampilkan slide yang diklik
	function openLightbox(index) {
		lightbox.classList.remove('hidden'); // Buka lightbox dengan menghapus class 'hidden'
		showLightboxSlide(index);
		document.body.classList.add('overflow-hidden');
	}

	// Fungsi untuk menutup lightbox
	function closeLightbox() {
		lightbox.classList.add('hidden'); // Tutup lightbox dengan menambahkan kembali class 'hidden'
		document.body.classList.remove('overflow-hidden');
	}

	// Fungsi untuk menampilkan slide berdasarkan index
	function showLightboxSlide(index) {
		lightboxFigures.forEach((figure, i) => {
			if (i === index) {
				figure.classList.remove('hidden');
				figure.classList.add('block');
			} else {
				figure.classList.add('hidden');
				figure.classList.remove('block');
			}
		});
		lightboxThumbnails.forEach((thumbnail, i) => {
			if (i === index) {
				thumbnail.classList.add('active'); // Tambahkan class 'active' ke thumbnail yang terkait
			} else {
				thumbnail.classList.remove('active');
			}
		});
		currentLightboxSlide = index;
	}

	// Event listener untuk klik thumbnail di dalam lightbox
	lightboxThumbnails.forEach((thumbnail, index) => {
		thumbnail.addEventListener('click', function () {
			showLightboxSlide(index);
		});
	});

	// Menutup lightbox ketika mengklik tombol close atau klik di luar lightbox
	closeLightboxBtn.addEventListener('click', closeLightbox);
	lightbox.addEventListener('click', function (e) {
		if (e.target === lightbox) {
			closeLightbox();
		}
	});

	// Event listener untuk klik gambar di dalam galeri (gallery-item)
	galleryItems.forEach((galleryItem, index) => {
		galleryItem.addEventListener('click', function () {
			openLightbox(index); // Buka lightbox dan tampilkan gambar sesuai index yang diklik
		});
	});

	// Event listener untuk keyboard (Esc untuk close, panah kiri/kanan untuk navigasi)
	document.addEventListener('keydown', function (e) {
		if (!lightbox.classList.contains('hidden')) {
			if (e.key === 'Escape') {
				closeLightbox();
			} else if (e.key === 'ArrowRight') {
				currentLightboxSlide = (currentLightboxSlide + 1) % lightboxFigures.length;
				showLightboxSlide(currentLightboxSlide);
			} else if (e.key === 'ArrowLeft') {
				currentLightboxSlide =
					(currentLightboxSlide - 1 + lightboxFigures.length) % lightboxFigures.length;
				showLightboxSlide(currentLightboxSlide);
			}
		}
	});
});
