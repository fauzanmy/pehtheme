// src/assets/js/components/toggle.js
var overlayElement = document.getElementById("overlay");
var OPEN_TOGGLE_SELECTOR = "[data-toggle-target]:not(.hidden)";
function toggleTargets(targetElements, triggerButton) {
  if (targetElements.length === 0) return;
  const willOpen = targetElements[0].classList.contains("hidden");
  document.querySelectorAll(OPEN_TOGGLE_SELECTOR).forEach((element) => {
    if (!targetElements.includes(element)) {
      element.classList.add("hidden");
      element.setAttribute("aria-hidden", "true");
    }
  });
  targetElements.forEach((element) => {
    element.classList.toggle("hidden", !willOpen);
    element.setAttribute("aria-hidden", String(!willOpen));
  });
  if (triggerButton) {
    triggerButton.setAttribute("aria-expanded", String(willOpen));
  }
  handleOverlayState();
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
    element.classList.add("hidden");
    element.setAttribute("aria-hidden", "true");
  });
  resetTriggerButtonsAriaExpanded(openElements);
  handleOverlayState();
}
function closeTargets(targetElements) {
  if (targetElements.length === 0) return;
  targetElements.forEach((element) => {
    element.classList.add("hidden");
    element.setAttribute("aria-hidden", "true");
  });
  resetTriggerButtonsAriaExpanded(targetElements);
  handleOverlayState();
}
function resetTriggerButtonsAriaExpanded(closedElements) {
  const closedIds = closedElements.map((element) => element.id).filter(Boolean);
  if (closedIds.length === 0) return;
  document.querySelectorAll(".toggle-button[data-target]").forEach((button) => {
    const buttonTargetIds = button.getAttribute("data-target").split(" ");
    if (buttonTargetIds.some((id) => closedIds.includes(id))) {
      button.setAttribute("aria-expanded", "false");
    }
  });
}
function handleOverlayState() {
  if (overlayElement && !overlayElement.classList.contains("hidden")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
document.addEventListener("click", function(event) {
  const toggleButton = event.target.closest(".toggle-button");
  if (toggleButton) {
    const targetIds = toggleButton.getAttribute("data-target").split(" ");
    const targetElements = targetIds.map((targetId) => document.getElementById(targetId)).filter(Boolean);
    toggleTargets(targetElements, toggleButton);
    return;
  }
  const openElements = Array.from(document.querySelectorAll(OPEN_TOGGLE_SELECTOR));
  const clickedOutsideAllTargets = openElements.length > 0 && openElements.every((element) => {
    return !element.contains(event.target);
  });
  if (clickedOutsideAllTargets) {
    closeAllOpenElements();
    return;
  }
  const dismissTrigger = event.target.closest(".dismiss");
  if (dismissTrigger) {
    const targetAttr = dismissTrigger.getAttribute("data-target");
    if (targetAttr) {
      const targetIds = targetAttr.split(" ").filter(Boolean);
      const targetElements = targetIds.map((id) => document.getElementById(id)).filter(Boolean);
      closeTargets(targetElements);
    } else {
      closeAllOpenElements();
    }
  }
});
