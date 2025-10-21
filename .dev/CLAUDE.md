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

**NOTE: You don't need to run `npm run dev` or `npm run build`. I'll run these myself from another terminal.**

## Architecture Overview

This is an Astro-based personal website built with Tailwind CSS v4, Preact, and content collections.

### Content Collections System

The site uses Astro's content collections with the glob loader pattern. Collections are defined in `src/content.config.ts`:

- **blog** - Markdown blog posts (`.md`) in `src/collections/blog/`
  - Schema includes: title, author, description, pubDate, tags, image
  - Files prefixed with `_` are ignored by the glob loader

- **portfolio** - Markdown portfolio projects (`.md`) in `src/collections/portfolio/`
  - Schema includes: title, description, image, thumbnail (optional), category, order, contentType, gridSpan, aspectRatio, gridPosition, showOverlay, links, caseStudyUrl, externalUrl
  - Uses custom Portfoliobox lightbox component
  - Dual-mode layout: curated (hand-crafted masonry) and filtered (auto-flowing grid)
  - Standalone pages at `/portfolio/[slug]` using PortfolioItemLayout with prose styling
  - Descending sort by order field (newest first, 100s increments for flexibility)

- **products** - MDX product pages (`.mdx`) in `src/collections/products/`
  - Schema includes: title, tagline, cta, features, optional price and testimonials

Additional collections exist but are not exported in the config (jobs, tools, resources, skills, testimonials) - these may use JSON or be managed differently.

### Routing Architecture

- **Dynamic blog routes**: `src/pages/posts/[...slug].astro` generates individual blog post pages using `getStaticPaths()` from the blog collection
- **Dynamic portfolio routes**: `src/pages/portfolio/[...slug].astro` generates standalone portfolio pages using prose styling
- **Portfolio grid page**: `src/pages/portfolio.astro` displays filterable masonry grid with custom lightbox
- **Tag system**: `src/pages/tags/[tag].astro` and `src/pages/tags/index.astro` handle tag filtering
- **RSS feed**: `src/pages/rss.xml.js` generates RSS from blog collection

### Layout System

- **BaseLayout.astro** - Main site wrapper with Header/Footer, loads Google Fonts (Inter), includes TailwindPlus Elements CDN, and `menu.js` script
- **MarkdownPostLayout.astro** - Layout for blog posts with prose styling
- **PortfolioItemLayout.astro** - Layout for standalone portfolio pages with prose styling (similar to blog posts)
- **BlogPost.astro** - Alternative blog layout
- **Printable.astro** - Print-optimized layout

### Components

- **Portfoliobox.astro** - Custom lightbox for portfolio with enhanced features:
  - Fixed positioning for buttons (left, right, top controls)
  - Floating caption panel with scroll
  - Social share buttons (Bluesky, LinkedIn, Copy Link)
  - View Project button using ButtonAura component
  - Featured links from markdown frontmatter
  - Keyboard and touch navigation support

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
