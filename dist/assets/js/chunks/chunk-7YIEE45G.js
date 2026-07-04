// src/assets/js/utils/dom-ready.js
function domReady(callback) {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', callback, { once: true });
		return;
	}
	callback();
}

export { domReady };
