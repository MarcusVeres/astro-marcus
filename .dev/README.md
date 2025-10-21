# Development Documentation

This directory contains planning documents, architecture notes, and session summaries for the astro-marcus project.

## Files Overview

### Core Documentation

- **CLAUDE.md** - Primary guidance file for Claude Code AI assistant
  - Development commands
  - Architecture overview
  - Content collections system
  - Routing patterns
  - Key file locations

- **ARCHITECTURE_NOTES.md** - Detailed technical architecture documentation
  - Component structure
  - Data flow patterns
  - Build configuration

### Feature Implementation Plans

- **PORTFOLIO_LIGHTBOX_IMPLEMENTATION.md** - Complete portfolio system documentation
  - Original implementation plan (3 phases)
  - Grid migration strategy
  - Dual-mode layout system
  - Lightbox integration
  - Schema design
  - Testing checklists
  - **STATUS: ✅ ALL PHASES COMPLETE**

- **RESOURCES_IMPLEMENTATION_PLAN.md** - Resources section planning
  - Grid layout strategy
  - Filter system
  - Content organization

- **PORTFOLIO_GRID_AUDIT.md** - Original grid analysis
  - Hardcoded grid audit
  - Migration planning
  - Pattern identification

### Session Logs

- **SESSION_2025-10-17.md** - Detailed session summary
  - Accomplishments (6 major features)
  - Technical details
  - Files modified
  - Code patterns
  - Testing notes
  - Quick reference for future work

## Recent Updates (October 17, 2025)

### Portfolio System - COMPLETE ✅

All planned phases completed plus major enhancements:

1. **Grid Migration** - Dynamic markdown-driven grid
2. **Dual-Mode Layout** - Curated + filtered views with URL hash support
3. **Lightbox Integration** - Custom Portfoliobox component
4. **Advanced Features** - Standalone pages, social sharing, thumbnails, flexible ordering

**Key Achievements:**
- Replaced CSS grid areas with Tailwind fixed positioning
- Created floating caption panel with scroll
- Integrated ButtonAura component
- Added social share buttons (Bluesky, LinkedIn, Copy Link)
- Implemented thumbnail support (grid vs lightbox images)
- Flexible ordering system (100s increments, newest first)

**See SESSION_2025-10-17.md for complete details.**

## How to Use This Documentation

### For New Sessions
1. Read **CLAUDE.md** for project overview
2. Check latest **SESSION_*.md** for recent work
3. Review relevant feature plan for context

### For Feature Work
1. Check if feature plan exists (e.g., PORTFOLIO_LIGHTBOX_IMPLEMENTATION.md)
2. Review schema in **CLAUDE.md**
3. Reference **ARCHITECTURE_NOTES.md** for patterns

### After Each Session
1. Create/update SESSION_*.md with accomplishments
2. Update relevant feature plan with status
3. Update **CLAUDE.md** if architecture changed

## Quick Links to Key Files

### Portfolio System
- Grid page: `src/pages/portfolio.astro`
- Lightbox: `src/components/Portfoliobox.astro`
- Layout: `src/layouts/PortfolioItemLayout.astro`
- Route: `src/pages/portfolio/[...slug].astro`
- Schema: `src/content.config.ts`
- Categories: `src/utils/resourceColors.ts`

### Content
- Portfolio items: `src/collections/portfolio/*.md`
- Blog posts: `src/collections/blog/*.md`
- Products: `src/collections/products/*.mdx`
- Resources: `src/collections/resources/*.md`

### Styles
- Global: `src/styles/global.css`
- Markdown: `src/styles/markdown.css`
- Tailwind config: Uses Vite plugin (`@tailwindcss/vite`)

## Development Workflow

```bash
# Don't run these - user runs them in separate terminal
npm install       # Install dependencies
npm run dev       # Start dev server (localhost:4321)
npm run build     # Build production site
npm run preview   # Preview production build
```

## Notes

- Files prefixed with `_` in collections are ignored (draft pattern)
- Use `getCollection()` to query collections
- Markdown for blog/portfolio, MDX for products
- Portfolio uses descending order sort (newest first)
- Order values use 100s increments for insertion flexibility
- Thumbnail field is optional (falls back to image)

---

**Last Updated:** October 17, 2025
**Project Status:** Portfolio system complete, ready for content expansion
