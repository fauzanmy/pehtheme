/**
 * Dark Mode Toggle Script - Default Light
 * -----------------------------------
 * Script ini mengelola pengaturan tema (gelap, terang, atau otomatis)
 * berdasarkan preferensi pengguna. Tema yang dipilih akan disimpan di
 * localStorage agar tetap konsisten di setiap kunjungan halaman.
 *
 * @author  Fauzan My
 * @version 0.5.0
 * @license MIT
 */

// Ambil elemen tombol dan menu dark mode
const darkModeBtn = document.getElementById('dark-mode-btn');
const darkModeMenus = document.getElementById('dark-mode-menus');
const themeButtons = darkModeMenus.querySelectorAll('.theme-btn');

/**
 * Mendapatkan tema yang dipilih pengguna atau menggunakan default (light).
 * @returns {string} 'dark', 'light', atau 'auto'
 */
const getPreferredTheme = () => {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		return savedTheme; // Gunakan tema yang tersimpan
	}
	// Default ke mode light jika tidak ada tema tersimpan
	return 'light';
};

/**
 * Mengatur tema berdasarkan pilihan pengguna atau preferensi sistem.
 * @param {string} theme - 'dark', 'light', atau 'auto'
 */
const setTheme = (theme) => {
	if (theme === 'auto') {
		// Mode otomatis mengikuti preferensi sistem
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	} else {
		// Mode manual (dark atau light)
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	// Simpan tema yang dipilih ke localStorage
	localStorage.setItem('theme', theme);
	// Perbarui ikon tombol sesuai tema yang dipilih
	updateButtonIcon(theme);
};

/**
 * Memperbarui ikon tombol berdasarkan tema yang dipilih.
 * @param {string} theme - 'dark', 'light', atau 'auto'
 */
const updateButtonIcon = (theme) => {
	const icon = darkModeBtn.querySelector('.theme-icon-active use');
	if (theme === 'dark') {
		icon.setAttribute('href', '#moon');
		darkModeBtn.setAttribute('aria-label', 'Toggle theme (dark)');
	} else if (theme === 'light') {
		icon.setAttribute('href', '#sun');
		darkModeBtn.setAttribute('aria-label', 'Toggle theme (light)');
	} else {
		icon.setAttribute('href', '#circle-half');
		darkModeBtn.setAttribute('aria-label', 'Toggle theme (auto)');
	}
};

// Tambahkan event listener untuk setiap tombol tema
themeButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const theme = button.getAttribute('data-theme');
		setTheme(theme);
		// Menutup menu setelah memilih tema
		darkModeMenus.classList.remove('open');
		darkModeMenus.classList.add('close');
	});
});

// Atur tema saat halaman dimuat pertama kali dengan default ke 'light'
setTheme(getPreferredTheme());
