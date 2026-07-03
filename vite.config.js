import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const rootDir = process.cwd();
const tempDir = path.join(rootDir, '.temp');

function collectHtmlInputs(dir, entries = {}) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      collectHtmlInputs(fullPath, entries);
      continue;
    }

    if (!item.isFile() || !item.name.endsWith('.html')) {
      continue;
    }

    const relative = path.relative(tempDir, fullPath).replace(/\\/g, '/');
    const key = relative.replace(/\/index\.html$/, '').replace(/\.html$/, '') || 'index';

    entries[key] = fullPath;
  }

  return entries;
}

export default defineConfig({
  root: '.temp',
  publicDir: false,
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: collectHtmlInputs(tempDir),
    },
  },
});