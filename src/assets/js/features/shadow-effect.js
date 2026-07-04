const masthead = document.getElementById('masthead');
const siteBrand = document.querySelector('.site-branding');

if (masthead && siteBrand) {
	const updateHeaderShadow = () => {
		const top = window.scrollY || document.documentElement.scrollTop;

		if (top > 99) {
			masthead.classList.add('shadow-md');
			siteBrand.classList.remove('py-4');
			siteBrand.classList.add('py-2');
		} else {
			masthead.classList.remove('shadow-md');
			siteBrand.classList.remove('py-2');
			siteBrand.classList.add('py-4');
		}
	};

	updateHeaderShadow();
	window.addEventListener('scroll', updateHeaderShadow, { passive: true });
}
