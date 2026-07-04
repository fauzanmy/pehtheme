# Pehtheme

Pehtheme is a static HTML landing page template starter powered by **Eleventy (11ty)**, **Nunjucks**, **Tailwind CSS v4**, and **esbuild**.

This repository is designed for building **static landing pages, company profile sites, and marketing pages** with a clean templating workflow and a simple asset pipeline.  
The output is generated into `dist/` and can be used directly for deployment or copied as a standalone HTML template package.

---

## Stack

- **Eleventy (11ty)** — static site generator
- **Nunjucks** — layout, partials, reusable template components
- **Tailwind CSS v4** — utility-first styling
- **esbuild** — JavaScript bundling for modular browser scripts
- **PNPM** — package manager

---

## What this project is for

Pehtheme is intended for:

- landing pages
- agency / business websites
- company profile websites
- static marketing pages
- HTML template distribution
- deployment to static hosting such as **Cloudflare Pages**

This repository is **not** a full CMS or application framework.  
It focuses on **templated static HTML output** with a comfortable developer workflow.

---

## Output structure

Build output is generated into `dist/`.

Example structure:

```text
dist/
├─ index.html
├─ about/
│  └─ index.html
├─ contact/
│  └─ index.html
├─ page/
│  └─ index.html
├─ services/
│  └─ index.html
└─ assets/
   ├─ css/
   │  └─ app.css
   └─ js/
      ├─ main.js
      ├─ home.js
      └─ chunks/
```

---

## Project structure

```text
.
├─ archive/
│  └─ pre-vite-template/
├─ dist/
├─ src/
│  ├─ _includes/
│  │  ├─ layouts/
│  │  └─ partials/
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ images/
│  │  └─ js/
│  ├─ data/
│  ├─ about.njk
│  ├─ contact.njk
│  ├─ index.njk
│  ├─ page.njk
│  ├─ services.njk
│  └─ single.njk
├─ .eleventy.js
├─ package.json
└─ README.md
```

---

# Getting started

## 1) Clone repository

```bash
git clone https://github.com/fauzanmy/pehtheme.git
cd pehtheme
```

## 2) Install dependencies

```bash
pnpm install
```

## 3) Run development server

```bash
pnpm dev
```

This starts:

- Eleventy dev server
- Tailwind CSS watch process

By default, the site is served locally by Eleventy.

---

# Available scripts

## `pnpm dev`

Run Eleventy dev server and Tailwind CSS watch.

Use this when you are working on:

- `.njk` templates
- layouts and partials
- Tailwind styling

```bash
pnpm dev
```

---

## `pnpm watch:js`

Watch and rebuild JavaScript bundles only.

Use this when you are working on:

- `src/assets/js/main.js`
- `src/assets/js/home.js`
- component scripts
- feature scripts

```bash
pnpm watch:js
```

---

## `pnpm dev:assets`

Run **Tailwind watch + JavaScript watch** together.

Use this when you are focusing on frontend assets only.

```bash
pnpm dev:assets
```

This runs:

- Tailwind CSS watch
- esbuild JavaScript watch

---

## `pnpm build`

Generate a production build into `dist/`.

This runs:

- Eleventy build
- Tailwind CSS minified build
- JavaScript bundle build

```bash
pnpm build
```

---

## `pnpm format`

Format project files using Prettier.

```bash
pnpm format
```

---

# Templating system

Pehtheme uses **Nunjucks** for layouts and reusable partials.

This gives a workflow similar to template composition patterns such as:

- header include
- footer include
- page section partials
- shared base layout

## Example layout usage

A page template can use a base layout and define front matter:

```njk
---
layout: layouts/base.njk
title: About
permalink: /about/index.html
---
```

## Example page structure

- `src/index.njk` → homepage
- `src/about.njk` → about page
- `src/contact.njk` → contact page
- `src/page.njk` → generic page
- `src/services.njk` → services page
- `src/single.njk` → article / single content page

---

# CSS architecture

The CSS source lives in:

```text
src/assets/css/
```

Current structure:

```text
src/assets/css/
├── app.css
├── critical.css
├── home.css
├── page.css
├── single.css
├── services.css
├── contact.css
└── core
    ├── base.css
    ├── theme.css
    └── components
        ├── button.css
        ├── card.css
        ├── header.css
        ├── navigation.css
        ├── navigation-mobile.css
        ├── page-header.css
        └── pagination.css
```

## Recommended usage

- `app.css` → global stylesheet entry
- `critical.css` → critical/global foundation if needed
- `home.css` → homepage-specific styling
- `page.css` → generic page styling
- `single.css` → article/single page styling
- `services.css` → services page styling
- `contact.css` → contact page styling
- `core/base.css` → base Tailwind + shared resets/utilities
- `core/theme.css` → theme-level shared styles
- `core/components/*` → reusable component styles

---

# JavaScript architecture

JavaScript source lives in:

```text
src/assets/js/
```

Current structure:

```text
src/assets/js/
├── components
│   ├── carousel.js
│   ├── gallery-lightbox.js
│   ├── marquee.js
│   ├── modal.js
│   └── toggle.js
├── features
│   ├── dark-mode.js
│   ├── relative-date.js
│   └── shadow-effect.js
├── utils
│   └── dom-ready.js
├── home.js
└── main.js
```

## Entry files

### `main.js`

Global entry for scripts that are needed on all pages.

Typical examples:

- dark mode
- header interactions
- mobile toggle
- shared UI behaviors

### `home.js`

Homepage-specific entry.

Typical examples:

- hero carousel
- marquee
- homepage interactions

---

## Async import pattern

Pehtheme uses a lightweight async import approach in entry files.

Example `main.js`:

```js
import { domReady } from './utils/dom-ready.js';

domReady(async () => {
	await import('./features/dark-mode.js');
	await import('./features/shadow-effect.js');
	await import('./components/toggle.js');
});
```

Example `home.js`:

```js
import { domReady } from './utils/dom-ready.js';

domReady(async () => {
	await import('./components/carousel.js');
	await import('./components/marquee.js');
});
```

Because of this async import pattern, esbuild may generate additional chunk files inside:

```text
dist/assets/js/chunks/
```

That is expected.

---

# Working with pages

## Add a new page

To add a new page, create a new `.njk` file inside `src/`.

Example:

```text
src/card.njk
```

Example front matter:

```njk
---
layout: layouts/base.njk
title: Card Demo
permalink: /card/index.html
---
```

Then build or run dev mode, and Eleventy will generate:

```text
dist/card/index.html
```

---

# How to edit the template

## Edit content / markup

Work in:

- `src/*.njk`
- `src/_includes/layouts/`
- `src/_includes/partials/`

## Edit styles

Work in:

- `src/assets/css/`

## Edit JavaScript

Work in:

- `src/assets/js/`

---

# Distribution workflow

This project can be used in two ways.

## 1) Use as a development starter

Clone the repository, edit templates, styles, and scripts, then build your site.

## 2) Use as a ready-to-copy HTML template

After running:

```bash
pnpm build
```

you can take the generated files from `dist/` and:

- upload them to a static host
- deploy them to Cloudflare Pages
- distribute them as a plain HTML template package
- reuse them in another project

---

# Deploying to Cloudflare Pages

Pehtheme can be deployed directly to **Cloudflare Pages**.

## Recommended settings

### Build command

```bash
pnpm build
```

### Build output directory

```text
dist
```

If your repository is connected to Cloudflare Pages, those settings are usually enough.

---

# Suggested development workflow

## When working on templates and styling

Run:

```bash
pnpm dev
```

Use this for:

- editing `.njk`
- editing Tailwind / CSS
- working on layouts and partials

---

## When working on JavaScript only

Run:

```bash
pnpm watch:js
```

Use this for:

- component behavior
- dark mode / toggle / carousel logic
- script experiments

---

## When working on frontend assets together

Run:

```bash
pnpm dev:assets
```

Use this for:

- CSS + JS work together
- interaction + styling adjustments

---

## Before deployment or distribution

Run:

```bash
pnpm build
```

Then use the contents of `dist/`.

---

# Notes

- `dist/` is part of the project output and may be committed if you want to distribute ready-built HTML template files directly from the repository.
- `archive/` stores older template iterations or abandoned stack attempts.
- This project intentionally keeps the stack small and focused on static HTML templating.

---

# License

See the `LICENSE` file in this repository.
