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
 * 2. Allows toggling multiple target elements using a 'data-target' attribute — all targets listed
 *    on the same button open/close together as one group (e.g. a mobile nav + its overlay backdrop).
 * 3. Automatically closes other open elements (outside the current button's target group) when
 *    clicking outside of them.
 * 4. Supports focusing input fields (like search bars) when a group is opened.
 * 5. Closes elements when a dismiss element is clicked.
 * 6. Single delegated click listener handles toggle buttons, outside clicks, and dismiss clicks.
 * 7. Visibility is driven entirely by Tailwind's own 'hidden' utility class — no custom CSS class
 *    or cascade-order dependency required.
 * 8. Basic aria-expanded / aria-hidden state is kept in sync for accessibility.
 *
 * Usage:
 * - Assign the class 'toggle-button' to buttons that will trigger toggling.
 * - Use the 'data-target' attribute on buttons to specify the target element's ID(s).
 * - Give every toggleable target element the 'data-toggle-target' attribute PLUS a 'hidden' class
 *   as its default (closed) state. No custom 'open'/'close' CSS classes are needed — this version
 *   toggles Tailwind's own utility class 'hidden' directly, so 'hidden' present = closed,
 *   'hidden' absent = visible (using the element's natural/Tailwind display value):
 *
 *     <nav id="main-navigation" class="navigation hidden" data-toggle-target>...</nav>
 *
 *   If an element needs a specific Tailwind display value when visible (flex, grid, etc.), set it
 *   directly on the element alongside 'hidden' as usual in Tailwind (e.g. class="hidden md:flex"
 *   patterns still apply); this script only ever adds/removes the 'hidden' class itself, it never
 *   adds a competing class, so there is no cascade-order/specificity race between utility classes.
 * - Add a class 'dismiss' to any element that should close open elements when clicked:
 *     - With a 'data-target' attribute (e.g. data-target="navigation-mobile overlay"): closes ONLY
 *       those specific IDs — use this for a close/X button, or on an overlay/backdrop element that
 *       should close its own associated group when clicked directly on it.
 *     - Without 'data-target': falls back to closing EVERY currently open toggle-target element
 *       (original/simple behavior, unchanged from earlier versions).
 *   Any '.toggle-button' whose own 'data-target' overlaps with the closed IDs automatically gets
 *   its 'aria-expanded' reset to 'false', even though the close was triggered by a different
 *   element (X button, overlay, outside-click, etc.), so the trigger button's state stays in sync.
 * - MULTI-TARGET GROUPS: if a button's 'data-target' lists more than one ID (e.g.
 *   data-target="navigation-mobile overlay"), ALL of those elements are treated as one group and
 *   open/close together in sync (based on the first target's current state). Elements outside
 *   the group that happen to be open are still auto-closed, but targets within the same group
 *   never close each other.
 *
 * Changelog:
 * - v0.8.0: Refactor pass (senior JS review) — consolidated final version.
 *      - FIX: `toggleElement`/close-all logic previously queried `.close` (already-closed
 *        elements, effectively a no-op) instead of the currently-open elements when closing
 *        elements other than the current target. Corrected so "close other open elements" always
 *        queries elements that are actually open.
 *      - BREAKING (markup/CSS): Removed the old `open`/`close` class pair entirely. Visibility is
 *        now driven directly by Tailwind's own `hidden` utility class as the single source of
 *        truth: `hidden` present = closed, `hidden` absent = visible. No custom CSS class or
 *        cascade-order dependency is needed anymore.
 *      - Every toggleable target element must carry the `data-toggle-target` attribute PLUS the
 *        `hidden` class as its default (closed) state, e.g.:
 *          <nav id="main-navigation" class="navigation hidden" data-toggle-target>...</nav>
 *        `data-toggle-target` scopes which elements this script is allowed to touch, so any other
 *        element on the page that happens to use Tailwind's `hidden` class for unrelated purposes
 *        (responsive utilities, loading states, etc.) is never affected.
 *      - MULTI-TARGET GROUPS: a button's `data-target` can list more than one ID (e.g.
 *        data-target="navigation-mobile overlay"). All of those elements are treated as one group
 *        and open/close together in sync (state derived from the first target). Elements outside
 *        the group that happen to be open are still auto-closed, but targets within the same
 *        group never close each other — handled by `toggleTargets()`.
 *      - SCOPED DISMISS: `dismiss` elements (e.g. a close/X button, or the overlay/backdrop itself)
 *        can optionally carry their own `data-target` attribute. When present, only those specific
 *        IDs are closed via `closeTargets()`, instead of closing every open element on the page.
 *        Without `data-target`, `dismiss` still falls back to closing everything currently open
 *        via `closeAllOpenElements()`.
 *      - Dismiss detection uses `event.target.closest('.dismiss')` (not a direct class check), so
 *        clicking an icon/child element inside a dismiss button (e.g. an "X" icon) still triggers
 *        the close, matching how `.toggle-button` clicks are detected.
 *      - Refactored to a single delegated `click` listener on `document` (toggle button clicks,
 *        outside-clicks, and dismiss clicks are all handled in one place) instead of separate
 *        per-button listeners plus a second document-level listener.
 *      - Cached the `#overlay` element reference once instead of querying it on every
 *        `handleOverlayState()` call.
 *      - Added `aria-expanded` (on the trigger button) and `aria-hidden` (on target elements) for
 *        basic accessibility support. `resetTriggerButtonsAriaExpanded()` also resets a trigger
 *        button's `aria-expanded` back to `false` whenever its target(s) get closed by a different
 *        trigger (X button, overlay click, outside-click), keeping button state in sync regardless
 *        of how the close happened.
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
