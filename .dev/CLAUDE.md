# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands (e.g., `astro check`, `astro add`) |

## Architecture Overview

This is an Astro-based personal website built with Tailwind CSS v4, Preact, and content collections.

### Content Collections System

The site uses Astro's content collections with the glob loader pattern. Collections are defined in `src/content.config.ts`:

- **blog** - Markdown blog posts (`.md`) in `src/collections/blog/`
  - Schema includes: title, author, description, pubDate, tags, image
  - Files prefixed with `_` are ignored by the glob loader

- **portfolio** - MDX portfolio projects (`.mdx`) in `src/collections/portfolio/`
  - Schema includes: title, client, technologies, deliverables, outcome, images, featured flag, optional liveUrl/demoUrl

- **products** - MDX product pages (`.mdx`) in `src/collections/products/`
  - Schema includes: title, tagline, cta, features, optional price and testimonials

Additional collections exist but are not exported in the config (jobs, tools, resources, skills, testimonials) - these may use JSON or be managed differently.

### Routing Architecture

- **Dynamic blog routes**: `src/pages/posts/[...slug].astro` generates individual blog post pages using `getStaticPaths()` from the blog collection
- **Tag system**: `src/pages/tags/[tag].astro` and `src/pages/tags/index.astro` handle tag filtering
- **RSS feed**: `src/pages/rss.xml.js` generates RSS from blog collection

### Layout System

- **BaseLayout.astro** - Main site wrapper with Header/Footer, loads Google Fonts (Inter), includes TailwindPlus Elements CDN, and `menu.js` script
- **MarkdownPostLayout.astro** - Layout for blog posts
- **BlogPost.astro** - Alternative blog layout
- **Printable.astro** - Print-optimized layout

### Styling & UI

- Uses Tailwind CSS v4 via Vite plugin (`@tailwindcss/vite`)
- Global styles in `src/styles/global.css`
- TailwindPlus Elements library loaded via CDN for interactive components
- Font: Inter (variable font, weights 100-900)
- Dark theme: body has `bg-gray-900` by default

### Build Configuration

- Site deployed to: `https://astro-marcus.netlify.app`
- Preact integration enabled for interactive components
- Manual chunk splitting configured for Preact bundle optimization (see `astro.config.mjs`)

### Key Patterns

- Content prefixed with `_` in collections directories is ignored (draft pattern)
- Use `getCollection()` to query collections, `render()` to get Content component
- MDX used for content requiring component flexibility (portfolio, products)
- Standard Markdown for blog posts
