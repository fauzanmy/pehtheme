/**
 * insertCarousel.js - Simple Vanilla JS Carousel
 *
 * Version      : 0.2.0
 * Author       : Fauzan My
 * Date         : 2024-09-15
 * Last Update  : 2025-02-15
 * License      : MIT
 *
 * @description
 *   A lightweight JavaScript module for creating a simple image or content carousel with
 *   next/prev navigation and optional auto-slide functionality. It includes fade transitions
 *   and supports pausing auto-slide on mouse hover.
 *
 * @usage
 *	1.	Include this script in your project.
 *	2.	Ensure your HTML structure follows:
 *		<div class="carousel" data-ride="carousel" data-interval="3000">
 * 			<div class="slide-item active">Slide 1</div>
 *			<div class="slide-item">Slide 2</div>
 *			<div class="slide-item">Slide 3</div>
 *			<button class="prev">‹</button>
 *			<button class="next">›</button>
 *		</div>
 *	3.	Call `initializeCarousel(carouselElement)` for individual carousels, or the script
 *		will automatically initialize all `.carousel` elements on page load.
 *	4.	CSS
 *
 * @features
 *	- Vanilla JavaScript, no dependencies
 *	- Next/Prev navigation
 *	- Auto-slide with customizable interval
 *	- Pause auto-slide on hover
 *	- Smooth fade animations
 *
 * @changelog
 * v0.2.0 (2025-02-15)
 *	- Added pause auto-slide feature on hover (`mouseenter` and `mouseleave`).
 *	- Using `dataset.ride` to get `data-ride` value more cleanly.
 *	- Hide navigation buttons (`next` & `prev`) if there is only one slide.
 *
 * v0.1.0 (2024-09-15)
 *	- Initial release
 */

function initializeCarousel(carousel) {
	const slides = carousel.querySelectorAll('.slide-item');
	const nextButton = carousel.querySelector('.next');
	const prevButton = carousel.querySelector('.prev');
	let currentIndex = 0;

	// Function to update active slide with transition effect
	function updateSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});
	}

	// Function to show next slide
	function showNextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
		updateSlide(currentIndex);
	}

	// Function to show previous slide
	function showPrevSlide() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		updateSlide(currentIndex);
	}

	// Add event listeners for next and prev buttons
	nextButton.addEventListener('click', showNextSlide);
	prevButton.addEventListener('click', showPrevSlide);

	// Hide buttons if there is only one slide
	if (slides.length < 2) {
		nextButton.style.display = 'none';
		prevButton.style.display = 'none';
	}

	// Auto-slide feature with pause on hover
	const autoSlide = carousel.dataset.ride === 'carousel';
	const intervalTime = parseInt(carousel.dataset.interval, 10) || 3000; // Default 3000ms jika tidak ada `data-interval`
	let interval;

	if (autoSlide) {
		interval = setInterval(showNextSlide, intervalTime);

		carousel.addEventListener('mouseenter', () => clearInterval(interval));
		carousel.addEventListener('mouseleave', () => {
			interval = setInterval(showNextSlide, intervalTime);
		});
	}
}

// Initialize all carousels on the page
document.querySelectorAll('.carousel').forEach((carousel) => {
	initializeCarousel(carousel);
});
