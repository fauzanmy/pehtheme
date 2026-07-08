# Pehtheme

Pehtheme is a static HTML template starter powered by **Eleventy (11ty)**, **Nunjucks**, **Tailwind CSS v4**, and **esbuild**.

It is designed for building **landing pages, company profile sites, marketing websites, and article/single page templates** with a clean component-based structure and a simple frontend workflow.

The final build is generated into `dist/`, so the project can be used in two ways:

1. as a **development starter** for static websites, or  
2. as a **ready-to-distribute HTML template package**.

## Live demo

Pehtheme is also available as a live demo on Cloudflare Pages:

- **https://pehtheme.pages.dev/**

## Features

- **Eleventy (11ty)** for static HTML generation
- **Nunjucks templating** for layouts, partials, reusable sections, and page components
- **Tailwind CSS v4** for utility-first styling
- **Three-layer CSS output**
  - `critical.css`
  - `page.css`
  - `single.css`
- **esbuild** for JavaScript builds
  - ES module output
  - classic bundled output
- **SVG sprite generation** from `src/assets/icons/`
- **Single article template** included
- **Static asset passthrough** for images and icons
- Output ready for:
  - direct HTML distribution
  - static hosting
  - Cloudflare Pages deployment

# Stack

- **Eleventy 3**
- **Nunjucks**
- **Tailwind CSS v4**
- **esbuild**
- **PNPM**

# What this project is for

Pehtheme is intended for:

- landing pages
- company profile websites
- agency / business websites
- static marketing websites
- article / blog post mockup pages
- HTML template distribution
- deployment to static hosting platforms such as **Cloudflare Pages**

This project is intentionally focused on **static HTML templating**, not on building a full CMS or JavaScript application.

# Output structure

Build output is generated into `dist/`.

Example final structure:

```text
# Output structure

Build output is generated into `dist/`.

Example final structure:

```text
dist/
├── about/
│   └── index.html
├── assets/
│   ├── css/
│   │   ├── critical.css
│   │   ├── page.css
│   │   └── single.css
│   ├── icons/
│   │   ├── egg-fried.svg
│   │   ├── list.svg
│   │   └── sprite.svg
│   ├── images/
│   └── js/
│       ├── app-bundle.js
│       ├── app-module.js
│       ├── home-bundle.js
│       ├── home-module.js
│       └── chunks/
├── blog-posts/
│   └── index.html
├── contact/
│   └── index.html
├── index.html
├── page/
│   └── index.html
├── services/
│   └── index.html
└── single/
    └── index.html
```

# Project structure

```text
.
├── archive/
│   └── pre-11ty-template/
├── dist/
├── src/
│   ├── _data/
│   │   ├── cards.json
│   │   ├── menu.json
│   │   ├── posts.json
│   │   ├── single.json
│   │   └── site.json
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk
│   │   ├── partials/
│   │   │   ├── card.njk
│   │   │   ├── carousel.njk
│   │   │   ├── cta.njk
│   │   │   ├── footer.njk
│   │   │   ├── header.njk
│   │   │   ├── hero.njk
│   │   │   ├── navigation.njk
│   │   │   └── search-form.njk
│   │   └── sections/
│   ├── assets/
│   │   ├── css/
│   │   ├── icons/
│   │   ├── images/
│   │   └── js/
│   ├── about.njk
│   ├── blog-posts.njk
│   ├── contact.njk
│   ├── index.njk
│   ├── page.njk
│   ├── services.njk
│   └── single.njk
├── package.json
├── pnpm-lock.yaml
├── README.md
└── README.id.md
```

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

## 3) Run development mode

### Template + Tailwind only
```bash
pnpm dev
```

### Template + Tailwind + JavaScript watch
```bash
pnpm devjs
```

# Available scripts

## `pnpm dev`

Run **Eleventy dev server** and **Tailwind CSS watch**.

Use this when you are working on:

- `.njk` templates
- layouts and partials
- page structure
- Tailwind utility classes
- CSS styling

```bash
pnpm dev
```

## `pnpm devjs`

Run:

- Eleventy dev server
- Tailwind CSS watch
- JavaScript watch via esbuild

Use this when you are working on:

- templates and styles
- JavaScript interactions
- component behavior
- dark mode, toggle, carousel, marquee, etc.

```bash
pnpm devjs
```

## `pnpm build`

Generate the final production build into `dist/`.

This runs:

- Eleventy build
- Tailwind CSS production build
- JavaScript production build

```bash
pnpm build
```

## `pnpm build:icons`

Generate the SVG sprite file from individual SVG icons stored in:

```text
src/assets/icons/
```

Output:

`dist/assets/icons/sprite.svg`

This is useful when you want to ship a single reusable SVG sprite for icon usage across templates.

### Example:

```
src/assets/icons/
├── egg-fried.svg
└── list.svg
```

### This generates:

```
dist/assets/icons/sprite.svg
```

### Typical usage

You can reference an icon from the generated sprite like this:

```
<svg aria-hidden="true">
	<use href="/assets/icons/sprite.svg#list"></use>
</svg>
```

The sprite build is also included in the full production build workflow.

## `pnpm format`

Format project files with Prettier.

```bash
pnpm format
```

# Pages included

Pehtheme currently includes these page templates:

- `/` → homepage
- `/about/`
- `/contact/`
- `/page/`
- `/services/`
- `/single/` → single article / post page template


# Templating system

Pehtheme uses **Nunjucks** with Eleventy for reusable HTML templating.

This gives a workflow similar to:

- shared base layout
- reusable header/footer partials
- page-level templates
- optional section partials

## Main layout

```text
src/_includes/layouts/base.njk
```

## Partials

```text
src/_includes/partials/
├── header.njk
└── footer.njk
```

## Page templates

```text
src/
├── index.njk
├── about.njk
├── contact.njk
├── page.njk
├── services.njk
└── single.njk
```

# Data

Pehtheme uses Eleventy global data files stored in:

```text
src/_data/
```

Current data files include:

- site.json → site title, description, footer text, general site metadata
- menu.json → navigation/menu data
- posts.json → post listing / blog card demo data
- cards.json → generic card/grid demo content
- single.json → single article page data


# CSS architecture

Source CSS lives in:

```text
src/assets/css/
```

Final build output:

```text
dist/assets/css/
├── critical.css
├── page.css
└── single.css
```


## CSS output strategy

Pehtheme uses a **three-file CSS strategy**:

### `critical.css`
Global foundation loaded on **all pages**.

Used for:
- Tailwind import/foundation
- base styles
- theme styles
- layout shell
- header
- navigation
- footer
- reusable global components/utilities

### `page.css`
Loaded on general pages such as:

- homepage
- about
- services
- contact
- generic page templates

### `single.css`
Loaded on the single article template.

Used for:
- post layout
- article header/meta
- post content typography
- related posts / sidebar / comment blocks if needed

## CSS source structure

Current source structure:

```text
src/assets/css/
├── critical.css
├── page.css
├── single.css
└── core/
    ├── base.css
    ├── layout.css
    ├── theme.css
    ├── utilities.css
    └── components/
        ├── branding.css
        ├── button.css
        ├── card.css
        ├── comment-form.css
        ├── comment-list.css
        ├── empty-state.css
        ├── footer.css
        ├── header.css
        ├── nav.css
        ├── navigation.css
        ├── navigation-mobile.css
        ├── page-header.css
        ├── pagination.css
        ├── post-card.css
        ├── post-content.css
        ├── post-content-block.css
        ├── post-content-media.css
        ├── post-footer.css
        ├── post-header.css
        ├── related-posts.css
        ├── sidebar-widget.css
        └── skip-link.css
```

# How CSS is loaded

## General pages
Pages such as `index`, `about`, `contact`, `page`, and `services` load:

```html
<link rel="stylesheet" href="/assets/css/critical.css">
<link rel="stylesheet" href="/assets/css/page.css">
```

## Single article page
`single.njk` loads:

```html
<link rel="stylesheet" href="/assets/css/critical.css">
<link rel="stylesheet" href="/assets/css/single.css">
```

This allows the project to keep:

- a shared global stylesheet
- a separate general-page stylesheet
- a dedicated single-post stylesheet

# JavaScript architecture

JavaScript source lives in:

```text
src/assets/js/
```

Current structure:

```text
src/assets/js/
├── components/
│   ├── carousel.js
│   ├── gallery-lightbox.js
│   ├── marquee.js
│   ├── modal.js
│   └── toggle.js
├── features/
│   ├── dark-mode.js
│   ├── relative-date.js
│   └── shadow-effect.js
├── utils/
│   └── dom-ready.js
├── build-icons.js
├── app-module.js
├── home-module.js
├── app-bundle.js
└── home-bundle.js
```

Module output may generate additional files in `dist/assets/js/chunks/` for async-loaded modules.

---

## JavaScript output modes

Pehtheme provides **two JavaScript output modes**:

### 1) Module build
Modern ES module output for projects that want:

- `type="module"`
- async imports
- code splitting
- chunked module loading

Output files:

```text
dist/assets/js/
├── app-module.js
├── home-module.js
└── chunks/
```

Typical usage:

```html
<script type="module" src="/assets/js/app-module.js"></script>
<script type="module" src="/assets/js/home-module.js"></script>
```

---

### 2) Static bundle build
Classic bundled output for projects that want plain static script tags without module loading.

Output files:

```text
dist/assets/js/
├── app-bundle.js
└── home-bundle.js
```

Typical usage:

```html
<script defer src="/assets/js/app-bundle.js"></script>
<script defer src="/assets/js/home-bundle.js"></script>
```

This mode is useful when you want the final HTML template to be easy to copy, distribute, or drop into a simple static hosting environment without using module script tags.

---

## JavaScript entry files

### `app-module.js`
Global JavaScript entry for all pages using **ES module output**.

Typical use:
- modern module-based global site behavior
- async imports for shared UI features

### `home-module.js`
Homepage-specific JavaScript entry for **ES module output**.

Typical use:
- homepage-only module logic
- carousel, marquee, and other home-only interactions

### `app-bundle.js`
Global JavaScript entry for **classic bundled output**.

Typical use:
- dark mode
- mobile toggle
- site-wide interactions
- classic `<script defer>` loading

### `home-bundle.js`
Homepage-specific JavaScript entry for **classic bundled output**.

Typical use:
- carousel
- marquee
- homepage-only bundled interactions

---

## Module build vs bundle build

### Module build
Use the `*-module.js` entries when you want modern ES module output.

Examples:

- `app-module.js`
- `home-module.js`

This build can produce chunk files for async-loaded modules.

### Bundle build
Use the `*-bundle.js` entries when you want classic static JavaScript files.

Examples:

- `app-bundle.js`
- `home-bundle.js`

These are intended for plain HTML usage such as:

```html
<script defer src="/assets/js/app-bundle.js"></script>
```

No automatic JavaScript mode switching is enforced by the template.  
Pehtheme simply provides both outputs, and users can decide which files they want to load in their own HTML templates.

# Editing workflow

## Edit templates
Work in:

- `src/*.njk`
- `src/_includes/layouts/`
- `src/_includes/partials/`
- `src/_includes/sections/`

## Edit site-wide data
Work in:

- `src/_data/site.json`

## Edit CSS
Work in:

- `src/assets/css/`

## Edit JavaScript
Work in:

- `src/assets/js/`

## Edit static assets
Work in:

- `src/assets/images/`
- `src/assets/icons/`

# Distribution workflow

Pehtheme can be used in two ways.

## 1) As a development starter
Clone the repository, edit the templates, CSS, JS, and content data, then build your site.

## 2) As a ready-to-copy HTML template
Run:

```bash
pnpm build
```

Then use the contents of `dist/` to:

- deploy to a static host
- upload to Cloudflare Pages
- package as a static HTML template
- copy into another project

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

That is usually enough for a standard Cloudflare Pages deployment.

# Recommended workflow

## If you are editing templates and styling
Run:

```bash
pnpm dev
```

## If you are editing templates, styling, and JavaScript interactions
Run:

```bash
pnpm devjs
```

## Before publishing or distributing
Run:

```bash
pnpm build
```

Then use the contents of `dist/`.

# Archive

The repository includes an archive of the earlier pre-Eleventy template version:

```text
archive/pre-11ty-template/
```

This is kept for reference only and is not part of the active stack.

# Notes

- `dist/` may be committed if you want the repository to include ready-built HTML template output.
- `archive/` contains the older pre-11ty version of the template.
- The active stack is now **Eleventy + Nunjucks + Tailwind CSS + esbuild**.
- The project intentionally stays focused on **static HTML template development**.

# License

See the `LICENSE` file in this repository.