// src/assets/js/components/marquee.js
var scrollContainers = document.querySelectorAll('.marquee-container');
scrollContainers.forEach((container) => {
	let isScrollingPaused = false;
	const scrollSpeed = parseFloat(container.getAttribute('data-scroll-speed')) || 1;
	let currentScroll = container.scrollLeft;
	setInterval(() => {
		if (isScrollingPaused) return;
		const first = container.querySelector('.marquee');
		if (!isElementInViewport(first)) {
			container.appendChild(first);
			currentScroll -= first.offsetWidth;
		}
		currentScroll += scrollSpeed;
		container.scrollLeft = currentScroll;
	}, 15);
	function isElementInViewport(el) {
		const rect = el.getBoundingClientRect();
		return rect.left < window.innerWidth && rect.right > 0;
	}
	function pauseScrolling() {
		isScrollingPaused = true;
	}
	function resumeScrolling() {
		isScrollingPaused = false;
	}
	container.querySelectorAll('.marquee').forEach((marquee) => {
		marquee.addEventListener('mouseenter', pauseScrolling);
		marquee.addEventListener('mouseleave', resumeScrolling);
	});
});
