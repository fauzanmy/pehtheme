/*
 * Script name  : Toggle Button with dismiss Close
 * Description  : This script enables smooth toggling (open/close) of elements when buttons are clicked,
 *                while ensuring that only one element is open at a time. It also adds functionality to
 *                close open elements when clicking outside or on an dismiss element.
 * Version      : 0.7.0
 * Author       : Fauzan My
 * Date         : 2024-10-08
 * Last Update  : 2025-01-13
 * License      : MIT
 *
 * Features:
 * 1. Smooth open/close transitions for elements controlled by buttons with the class 'toggle-button'.
 * 2. Allows toggling multiple target elements using a 'data-target' attribute.
 * 3. Automatically closes open elements when clicking outside of them.
 * 4. Supports focusing input fields (like search bars) when an element is opened.
 * 5. Closes elements when an dismiss element is clicked.
 *
 * Usage:
 * - Assign the class 'toggle-button' to buttons that will trigger toggling.
 * - Use the 'data-target' attribute on buttons to specify the target element's ID(s).
 * - Ensure target elements have classes 'open' (visible) and 'close' (hidden) for transitions.
 * - Add a class 'dismiss' to any element that should close the open elements when clicked.
 *
 * Changelog:
 * - v0.7.0: Added support for handling body overflow when an overlay is active.
 *      - Introduced a new function `handleOverlayState` that checks the state of an element with ID `overlay`.
 *      - If the `overlay` element has the class `open`, the body element's overflow is set to `hidden` to prevent scrolling.
 *      - If the `overlay` element has the class `close`, the body element's overflow is reset to its default.
 *      - `handleOverlayState` is called within the `toggleElement` function and the click event listener to ensure consistent state management.
 * - v0.6.0: Added support for closing elements when clicking on an dismiss element.
 * - v0.5.0: Implemented smooth toggle transitions and focus handling for search inputs.
 * - v0.4.0: Basic toggling logic for open/close elements.
 */

// Get all elements with the "toggle-button" class
const toggleButtons = document.querySelectorAll('.toggle-button');

// Function to toggle the state of an element (open/close) with smooth transition
function toggleElement(targetElement) {
	const isHidden = targetElement.classList.contains('close');

	// Hide all elements except the target with smooth transition
	document.querySelectorAll('.close').forEach((element) => {
		if (element !== targetElement) {
			element.classList.add('close'); // Hide the element
			element.classList.remove('open'); // Close previously open elements
		}
	});

	// Toggle the state of the target element
	targetElement.classList.toggle('close', !isHidden);
	targetElement.classList.toggle('open', isHidden);

	// Check and handle the overlay state
	handleOverlayState();

	// Set focus to the input field when opening the search bar
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

// Add event listener to the document to close elements when a click occurs outside of open elements
document.addEventListener('click', function (event) {
	const targetElements = Array.from(document.querySelectorAll('.open'));
	const clickedOutsideAllTargets = targetElements.every((element) => {
		return !element.contains(event.target) && !event.target.closest('.toggle-button');
	});

	if (clickedOutsideAllTargets) {
		targetElements.forEach((element) => {
			element.classList.remove('open'); // Close open elements
			element.classList.add('close'); // Hide elements
		});
		handleOverlayState(); // Check overlay state after closing elements
	}

	// Check if the click occurred on the element with class 'dismiss', but ignore clicks on its child elements
	const clickedDismiss = event.target.closest('.dismiss');
	if (clickedDismiss && event.target === clickedDismiss) {
		targetElements.forEach((element) => {
			element.classList.remove('open'); // Close open elements
			element.classList.add('close'); // Hide elements
		});
		handleOverlayState(); // Check overlay state after dismissing
	}
});
