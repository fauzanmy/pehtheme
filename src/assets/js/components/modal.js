// Mendapatkan elemen-elemen yang dibutuhkan
const images = document.querySelectorAll('.zoom img');

// Fungsi untuk membuat modal secara dinamis
function createModal() {
	const modalOverlay = document.createElement('div');
	modalOverlay.id = 'modalin';
	modalOverlay.className = 'flex modal hidden';
	modalOverlay.innerHTML = `
		<figure class="relative">
			<button id="closeBtn" class="absolute w-6 h-6 rounded-full -top-2 -right-2 flex items-center justify-center bg-black text-white">&#x2715;</button>
			<img id="modal-img" class="modal-content" src="" alt="">
		</figure>
	`;

	document.body.appendChild(modalOverlay);

	const closeBtn = modalOverlay.querySelector('#closeBtn');

	// Menambahkan event listener untuk tombol close
	closeBtn.addEventListener('click', closeModal);

	// Menutup modal saat klik di luar area gambar
	window.addEventListener('click', function (event) {
		if (event.target === modalOverlay) {
			closeModal();
		}
	});

	return modalOverlay;
}

// Fungsi untuk membuka modal
function openModal(imgSrc, imgAlt) {
	let modalOverlay = document.getElementById('modalin');

	// Jika modal belum ada, buat modal
	if (!modalOverlay) {
		modalOverlay = createModal();
	}

	const modalImg = modalOverlay.querySelector('#modal-img');
	modalOverlay.classList.remove('hidden');
	modalImg.src = imgSrc;
	modalImg.alt = imgAlt;
}

// Fungsi untuk menutup modal
function closeModal() {
	const modalOverlay = document.getElementById('modalin');
	if (modalOverlay) {
		modalOverlay.classList.add('hidden');
		const modalImg = modalOverlay.querySelector('#modal-img');
		modalImg.src = '';
		modalImg.alt = '';
	}
}

// Menambahkan event listener untuk setiap gambar
images.forEach(function (image) {
	image.addEventListener('click', function () {
		openModal(this.src, this.alt);
	});
});
