// src/assets/js/components/toggle.js
var toggleButtons = document.querySelectorAll('.toggle-button');
function toggleElement(targetElement) {
	const isHidden = targetElement.classList.contains('close');
	document.querySelectorAll('.close').forEach((element) => {
		if (element !== targetElement) {
			element.classList.add('close');
			element.classList.remove('open');
		}
	});
	targetElement.classList.toggle('close', !isHidden);
	targetElement.classList.toggle('open', isHidden);
	handleOverlayState();
	if (isHidden) {
		const inputField = targetElement.querySelector("input[type='search']");
		if (inputField) {
			inputField.focus();
		}
	}
}
function handleOverlayState() {
	const overlayElement = document.getElementById('overlay');
	if (overlayElement && overlayElement.classList.contains('open')) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = '';
	}
}
toggleButtons.forEach((button) => {
	button.addEventListener('click', function () {
		const targetIds = this.getAttribute('data-target').split(' ');
		targetIds.forEach((targetId) => {
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				toggleElement(targetElement);
			}
		});
	});
});
document.addEventListener('click', function (event) {
	const targetElements = Array.from(document.querySelectorAll('.open'));
	const clickedOutsideAllTargets = targetElements.every((element) => {
		return !element.contains(event.target) && !event.target.closest('.toggle-button');
	});
	if (clickedOutsideAllTargets) {
		targetElements.forEach((element) => {
			element.classList.remove('open');
			element.classList.add('close');
		});
		handleOverlayState();
	}
	const clickedDismiss = event.target.closest('.dismiss');
	if (clickedDismiss && event.target === clickedDismiss) {
		targetElements.forEach((element) => {
			element.classList.remove('open');
			element.classList.add('close');
		});
		handleOverlayState();
	}
});
