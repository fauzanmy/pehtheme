import fs from 'node:fs/promises';
import path from 'node:path';
import nunjucks from 'nunjucks';
import fse from 'fs-extra';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const PAGES_DIR = path.join(SRC_DIR, 'pages');
const TEMP_DIR = path.join(ROOT, '.temp');
const SITE_DATA_FILE = path.join(SRC_DIR, 'data', 'site.json');

const env = nunjucks.configure(SRC_DIR, {
	autoescape: false,
	noCache: true,
});

async function ensureDir(dir) {
	await fs.mkdir(dir, { recursive: true });
}

async function emptyDir(dir) {
	await fs.rm(dir, { recursive: true, force: true });
	await fs.mkdir(dir, { recursive: true });
}

async function collectPages(dir, pages = []) {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
	const fullPath = path.join(dir, entry.name);

	if (entry.isDirectory()) {
		await collectPages(fullPath, pages);
		continue;
	}

	if (entry.isFile() && entry.name.endsWith('.njk')) {
		pages.push(fullPath);
	}
	}

	return pages;
}

function getOutputHtmlPath(pageFile) {
	const relative = path.relative(PAGES_DIR, pageFile);
	const withoutExt = relative.replace(/\.njk$/, '.html');
	return path.join(TEMP_DIR, withoutExt);
}

function getTemplateName(pageFile) {
	return path.relative(SRC_DIR, pageFile).replace(/\\/g, '/');
}

async function getSiteData() {
  const raw = await fs.readFile(SITE_DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

async function renderPages() {
  const pages = await collectPages(PAGES_DIR);
  const site = await getSiteData();

  for (const pageFile of pages) {
    const templateName = getTemplateName(pageFile);
    const outputPath = getOutputHtmlPath(pageFile);

    const html = env.render(templateName, {
      site,
      currentYear: new Date().getFullYear(),
    });

    await ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, html, 'utf8');
  }
}

async function copyStaticAssets() {
	const sourceImages = path.join(SRC_DIR, 'assets', 'images');
	const targetImages = path.join(TEMP_DIR, 'assets', 'images');

	if (await fse.pathExists(sourceImages)) {
		await fse.copy(sourceImages, targetImages);
	}
}

async function writeViteEntries() {
	const cssTargetDir = path.join(TEMP_DIR, 'assets', 'css');
	const jsTargetDir = path.join(TEMP_DIR, 'assets', 'js');

	await ensureDir(cssTargetDir);
	await ensureDir(jsTargetDir);

	await fs.writeFile(
		path.join(cssTargetDir, 'app.css'),
		'@import "../../../src/assets/css/app.css";\n',
		'utf8',
	);

	await fs.writeFile(
		path.join(jsTargetDir, 'app.js'),
		'import "../../../src/assets/js/app.js";\n',
		'utf8',
	);
}

async function main() {
	await emptyDir(TEMP_DIR);
	await renderPages();
	await copyStaticAssets();
	await writeViteEntries();
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});