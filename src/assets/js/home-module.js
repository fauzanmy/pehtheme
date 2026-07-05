import { domReady } from './utils/dom-ready.js';

domReady(async () => {
	await import('./components/carousel.js');
	await import('./components/marquee.js');
});
