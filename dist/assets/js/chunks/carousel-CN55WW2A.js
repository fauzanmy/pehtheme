// src/assets/js/components/carousel.js
function initializeCarousel(carousel) {
	const slides = carousel.querySelectorAll('.slide-item');
	const nextButton = carousel.querySelector('.next');
	const prevButton = carousel.querySelector('.prev');
	let currentIndex = 0;
	function updateSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});
	}
	function showNextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
		updateSlide(currentIndex);
	}
	function showPrevSlide() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		updateSlide(currentIndex);
	}
	nextButton.addEventListener('click', showNextSlide);
	prevButton.addEventListener('click', showPrevSlide);
	if (slides.length < 2) {
		nextButton.style.display = 'none';
		prevButton.style.display = 'none';
	}
	const autoSlide = carousel.dataset.ride === 'carousel';
	const intervalTime = parseInt(carousel.dataset.interval, 10) || 3e3;
	let interval;
	if (autoSlide) {
		interval = setInterval(showNextSlide, intervalTime);
		carousel.addEventListener('mouseenter', () => clearInterval(interval));
		carousel.addEventListener('mouseleave', () => {
			interval = setInterval(showNextSlide, intervalTime);
		});
	}
}
document.querySelectorAll('.carousel').forEach((carousel) => {
	initializeCarousel(carousel);
});
