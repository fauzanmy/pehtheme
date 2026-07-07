// src/assets/js/components/toggle-v8.js
var overlayElement = document.getElementById("overlay");
var OPEN_TOGGLE_SELECTOR = "[data-toggle-target]:not(.hidden)";
function toggleElement(targetElement, triggerButton) {
  const isHidden = targetElement.classList.contains("hidden");
  document.querySelectorAll(OPEN_TOGGLE_SELECTOR).forEach((element) => {
    if (element !== targetElement) {
      element.classList.add("hidden");
      element.setAttribute("aria-hidden", "true");
    }
  });
  targetElement.classList.toggle("hidden", !isHidden);
  targetElement.setAttribute("aria-hidden", String(!isHidden));
  if (triggerButton) {
    triggerButton.setAttribute("aria-expanded", String(isHidden));
  }
  handleOverlayState();
  if (isHidden) {
    const inputField = targetElement.querySelector("input[type='search']");
    if (inputField) {
      inputField.focus();
    }
  }
}
function closeAllOpenElements() {
  document.querySelectorAll(OPEN_TOGGLE_SELECTOR).forEach((element) => {
    element.classList.add("hidden");
    element.setAttribute("aria-hidden", "true");
  });
  handleOverlayState();
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
    targetIds.forEach((targetId) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        toggleElement(targetElement, toggleButton);
      }
    });
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
  if (event.target.classList.contains("dismiss")) {
    closeAllOpenElements();
  }
});
