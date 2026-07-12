import { domReady } from './utils/dom-ready.js';

domReady(async () => {
	await import('./features/theme-toggle.js');
	//await import('./features/shadow-effect.js');
	await import('./components/toggle.js');
});
