# Pehtheme

Pehtheme is a static HTML template project built with **Eleventy (11ty)**, **Nunjucks**, and **Tailwind CSS**.

This repository is designed as a **ready-to-use HTML template source + distributable output**:

- `src/` contains the development source files
- `dist/` contains the final generated HTML and compiled CSS ready to copy, preview, or deploy

## Project goals

Pehtheme is focused on building a clean static website template with reusable partials and modular CSS architecture.

Current template targets:

- Home
- About
- Services
- Page
- Contact
- Single article template

## Tech stack

- [Eleventy (11ty)](https://www.11ty.dev/) — static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) — templating
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS
- [PNPM](https://pnpm.io/) — package manager

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