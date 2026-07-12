// src/assets/js/features/theme-toggle.js
var STORAGE_KEY = "theme";
var root = document.documentElement;
var media = window.matchMedia("(prefers-color-scheme: dark)");
function syncIcons(theme) {
  document.querySelectorAll(".theme-toggle use").forEach((use) => {
    use.setAttribute("href", theme === "dark" ? "#sun" : "#moon");
  });
}
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  syncIcons(theme);
}
function handleToggleClick(e) {
  const btn = e.target.closest(".theme-toggle");
  if (!btn) return;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
}
function handleSystemChange(e) {
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(e.matches ? "dark" : "light");
  }
}
syncIcons(root.getAttribute("data-theme"));
media.addEventListener("change", handleSystemChange);
document.addEventListener("click", handleToggleClick);
