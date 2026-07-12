/*
 * Script name  : Toggle Button with dismiss Close
 * Description  : This script enables smooth toggling (open/close) of elements when buttons are clicked,
 *                while ensuring that only one element is open at a time. It also adds functionality to
 *                close open elements when clicking outside or on a dismiss element.
 * Version      : 0.8.0
 * Author       : Fauzan My
 * Date         : 2024-10-08
 * Last Update  : 2026-07-07
 * License      : MIT
 *
 * Features:
 * 1. Smooth open/close transitions for elements controlled by buttons with the class 'toggle-button'.
 * 2. Allows toggling multiple target elements using a 'data-target' attribute.
 * 3. Automatically closes other open elements when clicking outside.
 * 4. Supports focusing input fields (like search bars) when opened.
 * 5. Closes elements when a dismiss element is clicked.
 * 6. Uses a single delegated click listener for all toggle events.
 * 7. Uses Tailwind's 'hidden' utility class as the visibility state.
 * 8. Keeps aria-expanded and aria-hidden in sync for accessibility.
 *
 * Usage:
 * - Add the class 'toggle-button' to the trigger element.
 * - Set 'data-target' with one or more target IDs (space separated).
 * - Each target must have 'data-toggle-target' and be hidden by default:
 *     <nav id="main-navigation" class="hidden" data-toggle-target>...</nav>
 * - Add the class 'dismiss' to any element that should close targets.
 *   Optionally add 'data-target' to close only specific targets.
 *
 * Changelog:
 * - v0.8.0: Refactored toggle system and improved accessibility.
 *      - Replaced custom 'open/close' classes with Tailwind's 'hidden' utility.
 *      - Added support for multiple target groups and scoped dismiss actions.
 *      - Consolidated all events into a single delegated click listener.
 *      - Improved close logic, overlay handling, and ARIA state synchronization.
 * - v0.7.0: Added support for handling body overflow when an overlay is active.
 *      - Introduced a new function `handleOverlayState` that checks the state of an element with ID `overlay`.
 *      - If the `overlay` element has the class `open`, the body element's overflow is set to `hidden` to prevent scrolling.
 *      - If the `overlay` element has the class `close`, the body element's overflow is reset to its default.
 *      - `handleOverlayState` is called within the `toggleElement` function and the click event listener to ensure consistent state management.
 * - v0.6.0: Added support for closing elements when clicking on an dismiss element.
 * - v0.5.0: Implemented smooth toggle transitions and focus handling for search inputs.
 * - v0.4.0: Basic toggling logic for open/close elements.
 */

// Cache the overlay element once; it's assumed to be static in the DOM.
const overlayElement = document.getElementById('overlay');

// Selector for elements currently visible (i.e. carrying data-toggle-target but NOT 'hidden')
const OPEN_TOGGLE_SELECTOR = '[data-toggle-target]:not(.hidden)';

// Function to toggle a GROUP of target elements together (all open or all close as one unit).
// This ensures multi-target buttons (e.g. data-target="navigation-mobile overlay") don't close
// each other when opening — only elements OUTSIDE the group are auto-closed.
function toggleTargets(targetElements, triggerButton) {
	if (targetElements.length === 0) return;

	const willOpen = targetElements[0].classList.contains('hidden');

	// Close all other currently open elements that are NOT part of this toggle group
	document.querySelectorAll(OPEN_TOGGLE_SELECTOR).forEach((element) => {
		if (!targetElements.includes(element)) {
			element.classList.add('hidden');
			element.setAttribute('aria-hidden', 'true');
		}
	});

	// Toggle every element in the group together, in sync
	targetElements.forEach((element) => {
		element.classList.toggle('hidden', !willOpen);
		element.setAttribute('aria-hidden', String(!willOpen));
	});

	if (triggerButton) {
		triggerButton.setAttribute('aria-expanded', String(willOpen));
	}

	// Check and handle the overlay state
	handleOverlayState();

	// Set focus to the input field when opening the search bar (checks the whole group)
	if (willOpen) {
		for (const element of targetElements) {
			const inputField = element.querySelector("input[type='search']");
			if (inputField) {
				inputField.focus();
				break;
			}
		}
	}
}

function closeAllOpenElements() {
	const openElements = Array.from(document.querySelectorAll(OPEN_TOGGLE_SELECTOR));
	openElements.forEach((element) => {
		element.classList.add('hidden');
		element.setAttribute('aria-hidden', 'true');
	});
	resetTriggerButtonsAriaExpanded(openElements);
	handleOverlayState();
}

// Close a SPECIFIC set of target elements (used by 'dismiss' triggers that carry their own
// data-target, e.g. a close/X button or the overlay itself), rather than closing everything open.
function closeTargets(targetElements) {
	if (targetElements.length === 0) return;
	targetElements.forEach((element) => {
		element.classList.add('hidden');
		element.setAttribute('aria-hidden', 'true');
	});
	resetTriggerButtonsAriaExpanded(targetElements);
	handleOverlayState();
}

// Whenever elements get closed (by dismiss/outside-click), find any '.toggle-button' that
// controls one of those elements and reset its aria-expanded back to 'false' so the button
// state stays in sync even when the close happened via a different trigger (X button, overlay, etc).
function resetTriggerButtonsAriaExpanded(closedElements) {
	const closedIds = closedElements.map((element) => element.id).filter(Boolean);
	if (closedIds.length === 0) return;

	document.querySelectorAll('.toggle-button[data-target]').forEach((button) => {
		const buttonTargetIds = button.getAttribute('data-target').split(' ');
		if (buttonTargetIds.some((id) => closedIds.includes(id))) {
			button.setAttribute('aria-expanded', 'false');
		}
	});
}

function handleOverlayState() {
	if (overlayElement && !overlayElement.classList.contains('hidden')) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = '';
	}
}

// Single delegated listener handles: toggle-button clicks, outside clicks, and dismiss clicks.
document.addEventListener('click', function (event) {
	const toggleButton = event.target.closest('.toggle-button');

	if (toggleButton) {
		const targetIds = toggleButton.getAttribute('data-target').split(' ');
		const targetElements = targetIds
			.map((targetId) => document.getElementById(targetId))
			.filter(Boolean);
		toggleTargets(targetElements, toggleButton);
		return;
	}

	// Close open elements when clicking outside of them
	const openElements = Array.from(document.querySelectorAll(OPEN_TOGGLE_SELECTOR));
	const clickedOutsideAllTargets = openElements.length > 0 && openElements.every((element) => {
		return !element.contains(event.target);
	});

	if (clickedOutsideAllTargets) {
		closeAllOpenElements();
		return;
	}

	// Close open elements when clicking on a dismiss trigger (button, overlay, icon inside it, etc.)
	const dismissTrigger = event.target.closest('.dismiss');
	if (dismissTrigger) {
		const targetAttr = dismissTrigger.getAttribute('data-target');
		if (targetAttr) {
			// Scoped close: only close the specific IDs listed on this dismiss trigger
			const targetIds = targetAttr.split(' ').filter(Boolean);
			const targetElements = targetIds.map((id) => document.getElementById(id)).filter(Boolean);
			closeTargets(targetElements);
		} else {
			// No data-target specified: fall back to closing everything currently open
			closeAllOpenElements();
		}
	}
});
