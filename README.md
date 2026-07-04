# Pehtheme

Pehtheme is a static HTML template project built with **Eleventy (11ty)**, **Nunjucks**, and **Tailwind CSS**.

This repository is designed as a **ready-to-use HTML template source + distributable output**:

- `src/` contains the development source files
- `dist/` contains the final generated HTML and compiled CSS ready to copy, preview, or deploy

Pehtheme is not only a starter HTML template repository — it can be used directly to build a **landing page**, a **company profile site**, or a **small static marketing website**, then deployed to static hosting platforms such as **Cloudflare Pages**.

---

## Project goals

Pehtheme is focused on building a clean static website template with reusable partials and modular CSS architecture.

Current template targets:

- Home
- About
- Services
- Page
- Contact
- Single article template

---

## Tech stack

- [Eleventy (11ty)](https://www.11ty.dev/) — static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) — templating
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS
- [PNPM](https://pnpm.io/) — package manager

---

## Project structure

```text
.
├── archive/
│   └── pre-11ty-template/
├── dist/
│   ├── index.html
│   ├── about/
│   ├── contact/
│   ├── page/
│   ├── services/
│   ├── single/
│   └── assets/
│       ├── css/
│       └── images/
├── src/
│   ├── _data/
│   │   └── site.json
│   ├── _includes/
│   │   ├── layouts/
│   │   ├── partials/
│   │   └── sections/
│   ├── assets/
│   │   ├── css/
│   │   └── images/
│   ├── about.njk
│   ├── contact.njk
│   ├── index.njk
│   ├── page.njk
│   ├── services.njk
│   └── single.njk
├── .eleventy.js
├── package.json
└── README.md
```

---

## CSS architecture

Pehtheme uses a modular CSS structure on top of Tailwind CSS.

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

### CSS file roles

| File | Role |
|---|---|
| `app.css` | Main Tailwind entry file and CSS aggregator |
| `critical.css` | Global layout helpers and shared structural styles |
| `home.css` | Homepage-specific styles |
| `page.css` | Generic page styles |
| `single.css` | Article/single template styles |
| `services.css` | Services page styles |
| `contact.css` | Contact page styles |

Inside `core/`:

| File | Role |
|---|---|
| `base.css` | Base element styling |
| `theme.css` | Theme-level tokens and shared visual rules |
| `components/*.css` | Reusable component styles |

---

## How to use

### 1) Clone the repository

```bash
git clone https://github.com/fauzanmy/pehtheme.git
cd pehtheme
```

### 2) Install dependencies

```bash
pnpm install
```

### 3) Start development mode

```bash
pnpm dev
```

This will start:

- Eleventy development server
- Tailwind CSS watch build

Default local development URL:

```
http://localhost:8081
```

### 4) Edit the template source

The main development source is inside:

- `src/` → pages, layouts, partials, sections, global data
- `src/assets/css/` → Tailwind-based modular CSS source
- `src/assets/images/` → template images/assets

Typical files to edit:

- `src/index.njk` → homepage template
- `src/about.njk` → about page
- `src/services.njk` → services page
- `src/contact.njk` → contact page
- `src/page.njk` → generic page template
- `src/single.njk` → single article template
- `src/_data/site.json` → site metadata and reusable global values

### 5) Build the final static output

```bash
pnpm build
```

The final generated files will be written to:

```
dist/
```

---

## Distribution and usage

Pehtheme can be used in two ways.

### Option A — Use as a development source project

This is the recommended mode if you want to customize the landing page or build a full static site.

Workflow:

1. clone the repository
2. edit files in `src/`
3. run `pnpm dev` during development
4. run `pnpm build`
5. use the generated output from `dist/`

### Option B — Use only the ready-to-use HTML output

If you do not want to work with 11ty/Nunjucks/Tailwind source files, you can simply use the generated files inside:

```
dist/
```

You can copy the `dist/` contents to:

- shared hosting
- a static web server
- a CDN/static bucket
- Cloudflare Pages deployment source
- any environment that serves static HTML/CSS/assets

---

## Build output

The `dist/` directory contains the final generated website output, including:

- generated HTML pages
- compiled CSS
- copied static assets

Current generated pages:

- `/`
- `/about/`
- `/services/`
- `/page/`
- `/contact/`
- `/single/`

Because this repository is intended to work both as source code and ready-to-use template output, the `dist/` directory is intentionally committed to the repository.

---

## Deploy to Cloudflare Pages

Pehtheme can be deployed directly to Cloudflare Pages as a static site.

### Recommended deployment approach

Use the repository as the source and let Cloudflare Pages build the project automatically.

**Cloudflare Pages settings:**

- Framework preset: `None / Static site`
- Build command:
  ```bash
  pnpm build
  ```
- Build output directory:
  ```
  dist
  ```

**Notes for Cloudflare Pages:**

- make sure the project uses Node.js with PNPM support in the Cloudflare Pages build environment
- the final published files come from the `dist/` directory
- because Pehtheme is a static site, it does not require a server runtime

### Alternative deployment approach

If you prefer not to let Cloudflare build the project, you can also:

1. run `pnpm build` locally
2. upload the generated `dist/` folder as the deployment artifact

This makes Pehtheme suitable for:

- landing pages
- agency/company profile sites
- product microsites
- documentation-like static sites
- simple marketing websites

---

## Important repository convention

This repository keeps both source files and final build output.

**Source of truth:**

- `src/` → development source
- `.eleventy.js` → Eleventy configuration
- `package.json` → scripts and dependencies

**Final distributable output:**

- `dist/` → compiled HTML + CSS ready to use

Because this repository is intended to be used as an HTML template package, the `dist/` directory is committed to the repository and should be kept in sync with the source.

### Recommended workflow before committing

After making template or CSS changes:

```bash
pnpm build
git add .
git commit -m "your message"
```

---

## Archive

The `archive/` directory stores the legacy template version from before the Eleventy migration:

```
archive/
└── pre-11ty-template/
```

---

## Notes

- the current active stack is 11ty + Nunjucks + Tailwind CSS
- `dist/` is intentionally committed because it serves as the ready-to-use template output
- `archive/pre-11ty-template/` stores the legacy pre-11ty template
- Pehtheme can be used directly as a static landing page project and deployed to platforms like Cloudflare Pages