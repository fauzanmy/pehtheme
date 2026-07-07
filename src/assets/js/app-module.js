import { domReady } from './utils/dom-ready.js';

domReady(async () => {
	//await import('./features/dark-mode.js');
	//await import('./features/shadow-effect.js');
	await import('./components/toggle-v8.js');
});
