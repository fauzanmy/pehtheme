// Take the variables
let close = document.getElementById('close');
let boxer = document.querySelectorAll('.box');
let option = document.getElementById('option');
let search = document.getElementById('search');
let burger = document.getElementById('burger');
let navbar = document.getElementById('navbar');
let overlay = document.getElementById('overlay');
let sidenav = document.getElementById('sidenav');
let headerian = document.getElementById('headerian');
let searching = document.getElementById('searching');
let searcher = document.querySelector('.searcher');

// Add header shadow effect
window.onscroll = function() {
	var top = window.pageYOffset || document.documentElement.scrollTop;
	if (top > 69) {
		headerian.classList.remove("py2");
		headerian.classList.add("box-shadow", "py1", "transition");
	} else {
		headerian.classList.remove("box-shadow", "py1", "transition");
		headerian.classList.add("py2", "transition");
	}
};

// Toggle the search icon
boxer[1].addEventListener('click', function() {
	searcher.classList.toggle('active');
	search.classList.toggle('hide');
});

// Toggle main menu bar list
option.addEventListener('click', function() {
	navbar.classList.toggle('hide');
});

// Toggle burger icon to open sidebar navigation & overlay
let classOpen = [sidenav, overlay];
burger.addEventListener('click', function(e) {
	classOpen.forEach(e => e.classList.add('active'));
});

// Close button & overlay click function to hide sidebar navigation 
let classCloseClick = [overlay, close];
classCloseClick.forEach(function(el) {
	el.addEventListener('click', function(els) {
		classOpen.forEach(els => els.classList.remove('active'));
	});
});

// Enable mouse wheel to horizontal scroll
// mouseWheel.addEventListener('wheel', function(s) {
// 	const race = 15; // How many pixels to scroll

// 	if (s.deltaY > 0) // Scroll right
// 		mouseWheel.scrollLeft += race;
// 	else // Scroll left
// 		mouseWheel.scrollLeft -= race;
// 	s.preventDefault();
// });

document.querySelectorAll('.mouse-wheel').forEach( item => {
	item.addEventListener('wheel', event => {
		const race = 15; // How many pixels to scroll

	if (event.deltaY > 0) // Scroll right
		item.scrollLeft += race;
	else // Scroll left
		item.scrollLeft -= race;
	event.preventDefault();
	})
});








