#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const [, , inputDirArg, outputFileArg] = process.argv;

if (!inputDirArg || !outputFileArg) {
	console.error('Usage: node src/assets/js/build-icons.js <input-dir> <output-file>');
	process.exit(1);
}

const inputDir = path.resolve(process.cwd(), inputDirArg);
const outputFile = path.resolve(process.cwd(), outputFileArg);

const SVG_FILE_EXT = '.svg';
const SVG_OPEN_TAG_RE = /<svg\b([^>]*)>/i;
const SVG_VIEWBOX_RE = /\bviewBox\s*=\s*["']([^"']+)["']/i;
const SVG_INNER_RE = /<svg\b[^>]*>([\s\S]*?)<\/svg>/i;
const XML_DECL_RE = /<\?xml[\s\S]*?\?>/gi;
const DOCTYPE_RE = /<!DOCTYPE[\s\S]*?>/gi;
const COMMENT_RE = /<!--[\s\S]*?-->/g;

async function main() {
	const sourceFiles = await getSvgFiles(inputDir);

	if (sourceFiles.length === 0) {
		console.warn(`[icons] No SVG files found in ${inputDir}`);
		await writeSprite(outputFile, []);
		console.log(`[icons] Built 0 icons → ${path.relative(process.cwd(), outputFile)}`);
		return;
	}

	const symbols = [];

	for (const filePath of sourceFiles) {
		const symbol = await buildSymbolFromFile(filePath);

		if (symbol) {
			symbols.push(symbol);
		}
	}

	await writeSprite(outputFile, symbols);

	console.log(
		`[icons] Built ${symbols.length} icon${symbols.length === 1 ? '' : 's'} → ${path.relative(process.cwd(), outputFile)}`
	);
}

async function getSvgFiles(dir) {
	let entries;

	try {
		entries = await fs.readdir(dir, { withFileTypes: true });
	} catch (error) {
		if (error && error.code === 'ENOENT') {
			throw new Error(`[icons] Input directory not found: ${dir}`);
		}

		throw error;
	}

	return entries
		.filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === SVG_FILE_EXT)
		.map((entry) => path.join(dir, entry.name))
		.sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
}

async function buildSymbolFromFile(filePath) {
	const raw = await fs.readFile(filePath, 'utf8');
	const cleaned = normalizeSvg(raw);

	const openTagMatch = cleaned.match(SVG_OPEN_TAG_RE);
	const innerMatch = cleaned.match(SVG_INNER_RE);

	if (!openTagMatch || !innerMatch) {
		console.warn(`[icons] Skipped invalid SVG: ${path.basename(filePath)}`);
		return null;
	}

	const svgOpenTagAttributes = openTagMatch[1] ?? '';
	const viewBox = extractViewBox(svgOpenTagAttributes);
	const innerContent = innerMatch[1].trim();

	if (!viewBox) {
		console.warn(`[icons] Skipped SVG without viewBox: ${path.basename(filePath)}`);
		return null;
	}

	if (!innerContent) {
		console.warn(`[icons] Skipped empty SVG: ${path.basename(filePath)}`);
		return null;
	}

	const symbolId = path.basename(filePath, SVG_FILE_EXT);

	return createSymbol({
		id: symbolId,
		viewBox,
		content: innerContent,
	});
}

function normalizeSvg(svg) {
	return svg
		.replace(XML_DECL_RE, '')
		.replace(DOCTYPE_RE, '')
		.replace(COMMENT_RE, '')
		.trim();
}

function extractViewBox(svgAttributes) {
	const match = svgAttributes.match(SVG_VIEWBOX_RE);

	return match ? match[1].trim() : '';
}

function createSymbol({ id, viewBox, content }) {
	const lines = [
		`<symbol id="${escapeAttribute(id)}" viewBox="${escapeAttribute(viewBox)}" fill="currentColor">`,
		indent(content, 1),
		'</symbol>',
	];

	return lines.join('\n');
}

async function writeSprite(filePath, symbols) {
	const sprite = createSprite(symbols);

	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, sprite, 'utf8');
}

function createSprite(symbols) {
	const body = symbols.length > 0 ? `\n${symbols.join('\n\n')}\n` : '\n';

	return [
		'<svg xmlns="http://www.w3.org/2000/svg">',
		body.trimEnd(),
		'</svg>',
		'',
	].join('\n');
}

function indent(value, level = 1) {
	const indentation = '\t'.repeat(level);

	return value
		.split('\n')
		.map((line) => (line.trim() ? `${indentation}${line}` : line))
		.join('\n');
}

function escapeAttribute(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});