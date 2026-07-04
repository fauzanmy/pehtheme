// src/assets/js/features/dark-mode.js
var darkModeBtn = document.getElementById('dark-mode-btn');
var darkModeMenus = document.getElementById('dark-mode-menus');
var themeButtons = darkModeMenus.querySelectorAll('.theme-btn');
var getPreferredTheme = () => {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		return savedTheme;
	}
	return 'light';
};
var setTheme = (theme) => {
	if (theme === 'auto') {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	} else {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
	localStorage.setItem('theme', theme);
	updateButtonIcon(theme);
};
var updateButtonIcon = (theme) => {
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
themeButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const theme = button.getAttribute('data-theme');
		setTheme(theme);
		darkModeMenus.classList.remove('open');
		darkModeMenus.classList.add('close');
	});
});
setTheme(getPreferredTheme());
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
