/*
* Script name  : Simple JavaScript Marquee
* Description  : This script enables smooth marquee effect
* Version      : 0.3.0
* Author       : Fauzan My
* Date         : 2025-07-07
* Last Update  : 2025-07-08
* License      : MIT
* 
* Features:
* 1. Smooth and continuous scrolling
* 2. Customizable speed per element using data-scroll-speed
* 3. Pause on hover
* 4. Start only when visible (viewport lazy start)
* 
* Usage:
* - Assign class 'marquee' to the element
* - Add 'data-scroll-speed' attribute to control speed (example: data-scroll-speed="0.5")
* 
* Example:
* <div class="marquee-container" => data-scroll-speed="0.5">
* <div class="marquee-container"> => default
* 
* Changelog:
* v0.3.0 (2025-07-08)
* 	- Rewrite code
*
* v0.2.0 (2025-07-07)
* 	- Fixed image sizing compatibility
* 	- Improved width calculation
* 	- Added proper image load handling

* v0.1.0 (2025-07-07)
* 	- Initial release
*/

const scrollContainers = document.querySelectorAll('.marquee-container');

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
