/**
 * Dark mode toggle — mendeteksi preferensi tema dari localStorage atau
 * OS (prefers-color-scheme), lalu sync icon sun/moon dan atribut
 * data-theme di <html> saat tombol .theme-toggle diklik.
 *
 * Self-executing saat modul ini di-import (lazy-load via dynamic import).
 * Pastikan inline script anti-flash di <head> sudah set data-theme lebih
 * dulu sebelum bundle ini dimuat.
 *
 * Usage:
 *   domReady(async () => {
 *     await import('./features/theme-toggle.js');
 *   });
 *
 *   <button class="theme-toggle">
 *     <svg><use href="#sun"></use></svg>
 *   </button>
 *
 * @version 0.6.0
 */

const STORAGE_KEY = 'theme';
const root = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');

function syncIcons(theme) {
  document.querySelectorAll('.theme-toggle use').forEach((use) => {
    use.setAttribute('href', theme === 'dark' ? '#sun' : '#moon');
  });
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  syncIcons(theme);
}

function handleToggleClick(e) {
  const btn = e.target.closest('.theme-toggle');
  if (!btn) return;

  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
}

function handleSystemChange(e) {
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
}

syncIcons(root.getAttribute('data-theme'));
media.addEventListener('change', handleSystemChange);
document.addEventListener('click', handleToggleClick);