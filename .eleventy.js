export default function (eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/assets/css/');
	eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
	// eleventyConfig.addPassthroughCopy({ 'src/assets/icons': 'assets/icons' });

	return {
		dir: {
			input: 'src',
			includes: '_includes',
			data: '_data',
			output: 'dist',
		},
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
		templateFormats: ['njk', 'html'],
	};
}
