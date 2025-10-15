# Architecture Deep Dive - Marcus Veres Personal Website

**Generated:** 2025-10-15
**For:** Future Claude instances to get up to speed quickly

## Quick Reference

**Tech Stack:**
- Astro 5.13.4 (SSG)
- Tailwind CSS 4.1.13 (via Vite plugin)
- Preact 10.27.1 (for interactive components)
- TailwindPlus Elements (CDN for interactive components)

**Key Commands:**
```bash
npm run dev      # localhost:4321
npm run build    # Production build to ./dist/
npm run preview  # Preview production build
```

## Project Structure Overview

```
src/
├── collections/         # Content managed via Astro content collections
│   ├── blog/           # Markdown blog posts (*.md)
│   ├── portfolio/      # MDX portfolio projects (*.mdx)
│   └── products/       # MDX product pages (*.mdx)
├── components/         # UI components (Astro, no framework)
│   ├── atoms/         # Small reusable components (Logo, ButtonAura, ButtonGlass)
│   ├── blocks/        # Medium components (NavigationLinks, MobileMenu, SocialIcons)
│   └── sections/      # Large page sections (Hero, Features, CTAs)
├── layouts/           # Page layouts
│   ├── BaseLayout.astro          # Main site wrapper
│   ├── MarkdownPostLayout.astro  # Blog post layout (current)
│   ├── BlogPost.astro            # Alternative blog layout
│   └── Printable.astro           # Print-optimized layout
├── pages/             # Routes (file-based routing)
│   ├── posts/[...slug].astro    # Dynamic blog post pages
│   ├── tags/[tag].astro         # Dynamic tag filtering pages
│   ├── tags/index.astro         # Tag index page
│   ├── blog.astro               # Blog listing page
│   ├── portfolio.astro          # Portfolio page
│   ├── about.astro             # About page
│   └── rss.xml.js              # RSS feed
├── scripts/           # Client-side JS
│   └── menu.js       # Hamburger menu toggle
├── styles/            # CSS modules
│   ├── global.css    # Main entry point
│   ├── theme.css     # Tailwind v4 theme config (@theme)
│   ├── base.css      # Base styles
│   ├── components.css # Component utilities (.glass, .pane, etc.)
│   ├── markdown.css  # Prose/blog post styling
│   └── utilities.css # Custom utility classes
└── types/            # TypeScript types
    ├── jobs.ts
    ├── tool.ts
    └── global.d.ts
```

## Content Collections Architecture

**File:** `src/content.config.ts`

### Active Collections

#### 1. Blog Collection
```typescript
loader: glob({ pattern: '**/[^_]*.md', base: "./src/collections/blog" })
```
- **Format:** Markdown (`.md`)
- **Location:** `src/collections/blog/`
- **Draft Pattern:** Files prefixed with `_` are ignored
- **Schema:**
  - `title: string`
  - `author: string`
  - `description: string`
  - `pubDate: Date`
  - `tags: string[]`
  - `image: { url: string, alt: string }`

#### 2. Portfolio Collection
```typescript
loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/collections/portfolio" })
```
- **Format:** MDX (`.mdx`) - for component flexibility
- **Location:** `src/collections/portfolio/`
- **Schema:**
  - `title: string`
  - `client?: string` (optional for personal projects)
  - `technologies: string[]`
  - `deliverables: string[]`
  - `outcome: string`
  - `images: { url: string, alt: string }[]`
  - `featured: boolean` (default: false)
  - `liveUrl?: string`
  - `demoUrl?: string`
  - `tags: string[]`

#### 3. Products Collection
```typescript
loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/collections/products" })
```
- **Format:** MDX (`.mdx`) - for landing page components
- **Location:** `src/collections/products/`
- **Schema:**
  - `title: string`
  - `tagline: string`
  - `cta: string`
  - `features: string[]`
  - `price?: { amount: number, currency: string, display?: string }`
  - `testimonials?: { name: string, testimonial: string, date?: Date, rating?: number }[]`

### Commented Out Collections
Jobs and Tools collections exist in types but aren't currently exported. They appear to use JSON format for data management.

## Routing Patterns

### Static Routes
- `/` - Homepage (`src/pages/index.astro`)
- `/about` - About page
- `/blog` - Blog listing
- `/portfolio` - Portfolio listing
- `/resources` - Resources page
- `/services` - Services page
- `/tags` - Tag index

### Dynamic Routes

#### Blog Posts: `src/pages/posts/[...slug].astro`
```typescript
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}
```
- Uses `getCollection('blog')` to fetch all blog posts
- `post.id` becomes the URL slug
- Renders with `MarkdownPostLayout.astro`

#### Tag Pages: `src/pages/tags/[tag].astro`
```typescript
export async function getStaticPaths() {
  const allPosts = await getCollection("blog");
  const uniqueTags = [...new Set(allPosts.map((post) => post.data.tags).flat())];
  return uniqueTags.map((tag) => {
    const filteredPosts = allPosts.filter((post) =>
      post.data.tags.includes(tag)
    );
    return {
      params: { tag },
      props: { posts: filteredPosts },
    };
  });
}
```
- Extracts unique tags from all blog posts
- Creates a page for each tag showing filtered posts
- Uses `BaseLayout.astro`

#### RSS Feed: `src/pages/rss.xml.js`
- Generates RSS feed from blog collection
- Uses `@astrojs/rss` package

## Layout System

### BaseLayout.astro
**Purpose:** Main site wrapper used by all pages

**Features:**
- Loads Inter font (variable, weights 100-900) via Google Fonts with preload optimization
- Includes TailwindPlus Elements CDN: `https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1`
- Contains Header and Footer components
- Loads `menu.js` script for mobile menu
- Dark mode by default: `bg-gray-900`
- Antialiased text rendering
- Props: `pageTitle: string`

### MarkdownPostLayout.astro
**Purpose:** Current blog post layout

**Features:**
- Wraps content in `.prose` and `.prose-content` classes
- Displays frontmatter data (title, author, pubDate, description, image)
- Shows first tag as category badge
- Renders hero image if available
- Displays tag links at bottom with styled badges
- Handles all markdown rendering via slot

### BlogPost.astro
**Purpose:** Alternative blog layout (appears unused currently)

### Printable.astro
**Purpose:** Print-optimized layout (for resume, documents, etc.)

## Component Architecture

### Component Organization

#### Atoms (`src/components/atoms/`)
Small, single-purpose components:
- `Logo.astro` - Site logo
- `ButtonAura.astro` - Primary CTA button with aura effect
- `ButtonGlass.astro` - Glass-morphism button
- `IconBatteryBig.astro` - Battery icon

#### Blocks (`src/components/blocks/`)
Medium-sized, reusable components:
- `NavigationLinks.astro` - Desktop navigation menu
- `MobileMenu.astro` - Mobile menu overlay
- `SocialIcons.astro` - Social media icons
- `SocialIconsFooter.astro` - Footer social icons
- `SocialLinks.astro` - Social media links
- `MailingList.astro` - Email signup form

**NavigationLinks.astro Navigation Items:**
```javascript
const navigationItems = [
  { name: 'Work', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resources', href: '/resources' },
  { name: 'Services', href: '/services' },
];
```
- Uses TailwindPlus `<el-popover-group>` component
- Desktop only (hidden on mobile via `lg:flex`)

#### Sections (`src/components/sections/`)
Large page sections:
- `HeroSplitScreenshot.astro` - Hero with image
- `HeroImageTiles.astro` - Hero with tiled images
- `FeatureCentered2x2.astro` - 2x2 feature grid
- `BentoThreeColumn.astro` - Three-column bento layout
- `CTAGlassGlow.astro` - CTA with glass/glow effect
- `SectionBlog.astro` - Blog section for homepage
- `ThingsIDo.astro` - Skills/services section
- `ToolsIUse.astro` - Tools showcase
- `WorkExperience.astro` - Work history
- `FooterAlt.astro` - Alternative footer

### Header Component
**File:** `src/components/Header.astro`

**Features:**
- Sticky positioning (`sticky top-0 z-10`)
- Glassmorphism: `bg-gray-900/50 backdrop-blur-md`
- Animated gradient border at bottom
- Desktop navigation via `NavigationLinks`
- Mobile menu button (shows `MobileMenu` via TailwindPlus modal)
- CTA button: "Connect" → `mailto:marcus.veres@gmail.com`

**Structure:**
```astro
<header class="sticky top-0 z-10 w-full shadow-md bg-gray-900/50 backdrop-blur-md">
  <nav class="flex items-center justify-between px-6 py-6 mx-auto max-w-7xl lg:py-0">
    <Logo />
    <MobileMenuButton />
    <NavigationLinks />
    <CTAButton />
  </nav>
  <AnimatedBorder />
  <MobileMenu />
</header>
```

## Tailwind CSS v4 Architecture

### Entry Point: `src/styles/global.css`
```css
@import "tailwindcss";
@import "./theme.css";
@import "./base.css";
@import "./components.css";
@import "./markdown.css";
@import "./utilities.css";
@import "./astro-crap.css";
```

### Theme Configuration: `src/styles/theme.css`

Uses Tailwind v4's `@theme` directive:

**Custom Color System:**
- Primary scale (50-950): OKLCH-based blue/purple gradient
- Accent colors (400-600): Teal/cyan accent
- All using OKLCH color space for perceptual uniformity

**Layout Variables:**
- `--max-width-standard: 1200px`
- `--max-width-wide: 1400px`
- `--max-width-narrow: 800px`

**Custom Animations:**
```css
--animate-background: background-move ease infinite;
--animate-rotate-border: border-rotate 3s linear infinite;
--animate-rotate-border-square: border-rotate-square 5s linear infinite;
--animate-rotate-border-tall: border-rotate-tall 5s linear infinite;
--animate-rotate-border-wide: border-rotate-wide 5s linear infinite;
```

**Special border rotation animations** for different aspect ratios:
- Square (1:1) - Standard 360deg rotation
- Wide rectangles - Custom easing to counteract optical illusion
- Tall rectangles (1:2) - Fast on short sides, slow on long sides

**Dark Mode Override:**
```css
@custom-variant dark (&:where(.force-light, .force-light *));
```
Forces light mode when `.force-light` class is present

### Component Utilities: `src/styles/components.css`

**Glass Effects:**
```css
.glass-only     /* Just glass, no padding */
.glass          /* Glass with padding/margin */
.pane           /* Glass pane with extra bottom padding */
.glass-v2       /* Better browser support */
.glass-modern   /* Using color-mix() */
```

**Project Grid:**
```css
.project-grid > * /* Card hover effects for portfolio */
```

**Card Zoom Effect:**
```css
.card-zoom           /* Container */
.card-zoom-image     /* Background image that zooms */
.card-zoom-text      /* Text that scales down on hover */
```

### Markdown Prose Styling: `src/styles/markdown.css`

**Core Classes:**
- `.prose` - Container with padding
- `.prose-content` - Content wrapper with max-width and styling

**Typography Hierarchy:**
- H1: 4xl/5xl, white, semibold
- H2: 3xl, white, semibold, mt-16
- H3: 2xl, white, semibold, mt-12
- H4: xl, white, semibold, mt-8
- Body: base/7, gray-400
- Lead paragraph: First `<p>` gets xl/8

**Lists:**
- **UL:** Custom checkmark icons via CSS (`data:image/svg+xml`)
- **OL:** Numbered with indigo counters
- No bullets by default
- Flex layout for icon + text

**Code:**
- Inline: `bg-gray-800 text-indigo-300`
- Block: `bg-gray-800 text-gray-300` with overflow-x-auto

**Images:**
- `rounded-xl bg-gray-800 object-cover`
- Full width, centered

**Links:**
- `text-indigo-400 underline hover:text-indigo-300`

**Blockquotes:**
- Indigo left border, semibold white text

## Configuration Files

### astro.config.mjs
```javascript
export default defineConfig({
  integrations: [preact()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'preact-bundle': ['preact', '@astrojs/preact', 'preact/hooks']
          }
        }
      }
    },
    plugins: [tailwindcss()],
  },
  site: "https://astro-marcus.netlify.app",
});
```

**Key Points:**
- Preact integration for interactive components
- Manual chunk splitting for Preact (bundle optimization)
- Tailwind CSS via Vite plugin (no separate config file)
- Deployment target: Netlify

### package.json
```json
{
  "name": "tutorial-1",
  "type": "module",
  "version": "0.0.1",
  "dependencies": {
    "@astrojs/preact": "^4.1.0",
    "@astrojs/rss": "^4.0.12",
    "@tailwindcss/vite": "^4.1.13",
    "astro": "^5.13.4",
    "preact": "^10.27.1",
    "tailwindcss": "^4.1.13"
  }
}
```

**Note:** Project name is `tutorial-1` - likely a placeholder from tutorial origins

## Client-Side Interactivity

### menu.js
Simple hamburger menu toggle:
```javascript
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('expanded');
});
```

**Note:** Alternative version with optional chaining is commented out

### TailwindPlus Elements
CDN-loaded interactive components:
- `<el-popover-group>` - Navigation popover container
- Modal commands: `command="show-modal" commandfor="mobile-menu"`

## Content Strategy Patterns

### Draft Pattern
Files prefixed with `_` in collections are ignored by glob loader:
```
src/collections/blog/_draft-post.md  ← Not loaded
src/collections/blog/post-1.md       ← Loaded
```

### Tag System
- Tags stored as `string[]` in frontmatter
- Tag pages auto-generated via `getStaticPaths()`
- Tag UI: Styled badges with indigo color scheme
- Tag index shows all unique tags
- Tag detail shows filtered posts

### Content Rendering
```typescript
// Get collection
const posts = await getCollection('blog');

// Render individual post
const { Content } = await render(post);
```

## Design System & Styling Conventions

### Color Philosophy
- **Background:** Gray-900 (dark mode default)
- **Primary:** Indigo (400, 500, 600)
- **Accent:** Custom OKLCH-based colors
- **Text:**
  - White for headings
  - Gray-300/400 for body
  - Indigo-400 for links/CTAs

### Spacing & Layout
- **Max widths:**
  - Standard content: `max-w-7xl` (1280px)
  - Prose: `max-w-2xl` to `max-w-3xl`
  - Narrow: `max-w-xl`
- **Padding:**
  - Mobile: `px-6`
  - Desktop: `px-8`
  - Sections: `py-24 sm:py-32`

### Typography
- **Font:** Inter (variable font, weights 100-900)
- **Font loading:** Preload via Google Fonts with fallback
- **Hierarchy:**
  - Display: 4xl to 7xl
  - Headings: 2xl to 5xl
  - Body: base to lg
  - Small: sm to xs

### Effects & Interactions
- **Glassmorphism:** `bg-gray-900/30 backdrop-blur-md`
- **Borders:** `border-white/10` or `border-gray-600`
- **Shadows:** `shadow-md`, `shadow-xl`
- **Hover states:** Typically color shifts (gray-400 → white)
- **Animations:** Custom border rotations, background gradients

## Performance Optimizations

### Build Optimizations
1. **Manual Preact chunking** - Separates Preact into its own bundle
2. **Font preloading** - Non-blocking Google Fonts with preconnect
3. **Vite build process** - Fast development and optimized production builds

### Image Strategy
- Static images in `public/images/`
- Astro Image component for optimized loading
- `aspect-video` or `aspect-square` for consistent sizing
- `object-cover` for fill behavior

### CSS Strategy
- Single CSS entry point (`global.css`)
- Modular CSS files imported in order
- Tailwind JIT compilation
- Minimal custom CSS, mostly Tailwind utilities

## Common Development Patterns

### Adding a New Blog Post
1. Create `.md` file in `src/collections/blog/`
2. Add required frontmatter:
   ```yaml
   ---
   title: "Post Title"
   author: "Author Name"
   description: "Post description"
   pubDate: 2025-10-15
   tags: ["tag1", "tag2"]
   image:
     url: "/images/post-image.jpg"
     alt: "Image description"
   ---
   ```
3. Write markdown content
4. Astro will auto-generate route at `/posts/[filename]/`
5. Tags auto-populate tag system

### Creating a Draft
Prefix filename with `_`:
```
src/collections/blog/_work-in-progress.md
```

### Adding a New Page
1. Create `.astro` file in `src/pages/`
2. Import `BaseLayout`
3. Use `pageTitle` prop
4. File becomes route automatically

### Creating a Component
1. Determine size: atom, block, or section
2. Create `.astro` file in appropriate directory
3. Use Tailwind utilities for styling
4. Import and use in pages/layouts

### Using Content Collections
```typescript
import { getCollection, render } from 'astro:content';

// Get all posts
const posts = await getCollection('blog');

// Get specific post
const post = posts.find(p => p.id === 'post-1');

// Render content
const { Content } = await render(post);
```

## Troubleshooting & Gotchas

### Content Collections
- `getCollection()` must be called in `getStaticPaths()` for dynamic routes
- Draft files (`_*.md`) are automatically excluded
- Schema validation is strict - all required fields must be present

### Styling
- Dark mode is default, not toggled
- `.force-light` class overrides dark mode
- Prose styles apply automatically in `.prose-content`
- List checkmarks disabled for flex layouts (`.prose-content ul:not(.flex)`)

### Components
- TailwindPlus Elements require CDN script in `<head>`
- Mobile menu uses modal system from TailwindPlus
- `menu.js` needs `.hamburger` and `.nav-links` selectors

### Build
- Site URL must be set in `astro.config.mjs` for RSS feed
- Image paths are relative to `public/` directory
- TypeScript types in `src/types/` are project-specific

## File Naming Conventions

- **Pages:** `kebab-case.astro`
- **Components:** `PascalCase.astro`
- **Layouts:** `PascalCase.astro`
- **Blog posts:** `kebab-case.md`
- **Portfolio/Products:** `kebab-case.mdx`
- **Drafts:** `_kebab-case.md`
- **Scripts:** `kebab-case.js`
- **Styles:** `kebab-case.css`
- **Backup files:** Prefixed with `x-` (e.g., `x-about.astro`)

## Key Files to Know

**Must understand:**
- `src/content.config.ts` - Content collection schemas
- `src/layouts/BaseLayout.astro` - Main layout wrapper
- `src/styles/global.css` - CSS entry point
- `src/styles/theme.css` - Tailwind v4 theme
- `astro.config.mjs` - Build configuration

**Frequently edited:**
- `src/components/Header.astro` - Site navigation
- `src/components/blocks/NavigationLinks.astro` - Nav items
- `src/layouts/MarkdownPostLayout.astro` - Blog post layout
- `src/pages/index.astro` - Homepage content

**Reference when needed:**
- `src/styles/markdown.css` - Blog post styling
- `src/styles/components.css` - Utility classes
- `src/pages/posts/[...slug].astro` - Dynamic post routing
- `src/pages/tags/[tag].astro` - Tag filtering logic

## Future Considerations

### Collections Not Yet Active
- **Jobs** - Schema defined in types, not exported in config
- **Tools** - Schema defined in types, not exported in config
- Could be activated by uncommenting in `content.config.ts`

### Commented Navigation Items
Several navigation variations are commented out in `NavigationLinks.astro`:
- "Insights", "Resources", "Services", "Shop" set
- "Become", "Your", "Best", "Self" set (section anchors)
- May indicate future feature planning

### Unused Pages
Files prefixed with `x-` appear to be backups or alternatives:
- `x-about.astro`
- `x-index-scratchpad.astro`
- `x-index-starter.astro`
- `x-resources-1.astro`
- `x-resources-2.astro`

## Quick Tips for New Claude Instances

1. **Reading blog posts?** Check `src/collections/blog/`
2. **Styling changes?** Most styling is Tailwind utilities in components
3. **Global style changes?** Edit CSS files in `src/styles/`
4. **New content type?** Define in `src/content.config.ts`
5. **Navigation changes?** Edit `src/components/blocks/NavigationLinks.astro`
6. **Homepage updates?** Edit `src/pages/index.astro`
7. **Layout changes?** Check `src/layouts/` directory
8. **Need to test?** Run `npm run dev` and check `localhost:4321`
9. **Build issues?** Check `astro.config.mjs` and package versions
10. **Content not showing?** Verify frontmatter matches schema in `content.config.ts`

---

**Remember:** This is a **static site generator** project. No server-side runtime. All routes are pre-generated at build time via `getStaticPaths()`.
