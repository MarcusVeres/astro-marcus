# Portfolio Lightbox - Design Guide

> **✨ MAJOR SIMPLIFICATION COMPLETE (2025-10-16)**
>
> We've completely redesigned the architecture! Gone are the days of:
> - ❌ `PortfolioLightboxCard.astro` component generating HTML strings
> - ❌ `portfolioPreview.ts` utility duplicating logic
> - ❌ Hidden divs with inline HTML scattered across the DOM
> - ❌ Manual GLightbox slide array construction
>
> **Now we have:**
> - ✅ Simple markdown files with frontmatter
> - ✅ One layout template (`PortfolioItemLayout.astro`)
> - ✅ GLightbox's native iframe support
> - ✅ Clean, maintainable, 3-file architecture

## 🎨 Architecture Overview

The lightbox system uses a SIMPLE, iframe-based approach - just 3 main files!

### File Structure

```
/src/layouts/
  └── PortfolioItemLayout.astro       👈 EDIT THIS to change design

/src/pages/
  └── portfolio.astro                 👈 Main portfolio grid
  └── portfolio/[...slug].astro       👈 Dynamic route for items

/src/styles/
  └── lightbox.css                    👈 GLightbox + iframe overrides

/src/collections/portfolio/
  └── *.md                            👈 Portfolio markdown files
```

## 🎯 How to Customize the Design

### Edit the Portfolio Item Layout
**File**: `/src/layouts/PortfolioItemLayout.astro`

This is a simple, standalone HTML template that displays in an iframe. It has:
- ✅ **Frontmatter props** for data (title, description, image, links, etc.)
- ✅ **HTML structure** with inline styles
- ✅ **Markdown slot** for content from `.md` files
- ✅ **No dependencies** - completely self-contained

**Current Design Features:**
- Hero image at top (60vh height, cover fit)
- Gradient title (yellow → pink)
- Description text
- Conditional action buttons (case study / external links)
- Markdown content area
- Social media links

**How It Works:**
1. Portfolio markdown files in `/src/collections/portfolio/*.md`
2. Dynamic route `/src/pages/portfolio/[...slug].astro` generates pages
3. Each page uses `PortfolioItemLayout.astro` as template
4. GLightbox opens these pages in an iframe
5. Simple, clean, easy to maintain!

### Tweak Global Styles
**File**: `/src/styles/lightbox.css`

Use this for:
- GLightbox library overrides
- Navigation button styling
- Iframe sizing and responsiveness
- Background overlay customization

## 🏗️ Current Design Structure

### HTML Structure
```html
<div class="lightbox-card">                    <!-- Main container -->
  <div class="lightbox-bg" />                  <!-- Background image -->

  <div class="lightbox-panel">                 <!-- Glassmorphic panel -->
    <div class="lightbox-handle">              <!-- Drag handle -->
      <div class="handle-bar" />
    </div>

    <div class="lightbox-content">             <!-- Scrollable content -->
      <h2 class="lightbox-title" />
      <p class="lightbox-description" />
      <a class="btn-lightbox btn-primary" />   <!-- Action button -->
      <div class="lightbox-social-links" />    <!-- Social links -->
    </div>
  </div>
</div>
```

### Key CSS Classes

| Class | Purpose | Current Style |
|-------|---------|---------------|
| `.lightbox-card` | Main container | 90vh height, centered |
| `.lightbox-bg` | Background image | Cover, positioned center |
| `.lightbox-panel` | Glassmorphic panel | Black 70% opacity, blur 20px |
| `.lightbox-handle` | Drag handle area | Centered, cursor grab |
| `.handle-bar` | Visual drag indicator | 48px wide, white 30% opacity |
| `.lightbox-content` | Content area | Scrollable, padding 2rem |
| `.lightbox-title` | Title text | 2rem, gradient (yellow→pink) |
| `.lightbox-description` | Description text | 1.125rem, gray-300 |
| `.btn-lightbox` | Button base | Inline-flex, rounded |
| `.btn-primary` | Primary button | Gradient bg, hover lift |
| `.social-link` | Social media links | Bordered, hover effect |

## 🎨 Design Variations to Try

### 1. Full-Screen Image with Overlay
```css
.lightbox-bg {
  filter: brightness(0.7);  /* Darken image */
}

.lightbox-panel {
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%);
  backdrop-filter: none;
}
```

### 2. Side Panel Layout
```css
.lightbox-card {
  display: grid;
  grid-template-columns: 60% 40%;
}

.lightbox-panel {
  position: relative;
  max-height: 100%;
  border-radius: 0;
}
```

### 3. Centered Card Over Blurred Background
```css
.lightbox-bg {
  filter: blur(20px) brightness(0.5);
}

.lightbox-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  border-radius: 16px;
}
```

### 4. Minimal Design
```css
.lightbox-handle {
  display: none;  /* Remove drag handle */
}

.lightbox-panel {
  background: rgba(255, 255, 255, 0.95);  /* Light glassmorphism */
  backdrop-filter: blur(30px);
  color: #000;
}

.lightbox-title {
  background: none;
  color: #000;
}
```

## 📱 Responsive Behavior

### Breakpoints
- **Mobile** (< 768px): 95vh height, panel max 70%
- **Tablet/Desktop** (≥ 768px): 90vh height, panel max 80%

### Current Mobile Optimizations
- Smaller title (1.5rem vs 2rem)
- Smaller description (1rem vs 1.125rem)
- Less padding (1.5rem vs 2rem)
- Panel takes less vertical space (70% vs 80%)

## 🎯 Props Available

The component accepts these props:

```typescript
interface Props {
  title: string;              // Required
  description: string;        // Required
  image: string;             // Required (URL)
  contentType?: string;      // 'simple' | 'case-study' | 'external' | 'iframe'
  caseStudyUrl?: string;     // Internal URL for case studies
  externalUrl?: string;      // External URL for projects
  externalLabel?: string;    // Button text for external links
  links?: Array<{            // Social/external links
    label: string;
    url: string;
    icon?: string;
  }>;
}
```

## 🔧 How Data Flows

**NEW SIMPLIFIED FLOW:**

1. **Portfolio Markdown** (`/src/collections/portfolio/*.md`) → Data defined in frontmatter
2. **portfolio.astro** → Reads collection, displays grid with iframe links
3. **portfolio/[...slug].astro** → Dynamic route generates individual pages
4. **PortfolioItemLayout.astro** → Wraps markdown content in styled template
5. **GLightbox** → Opens page URL in iframe (automatic discovery via `data-glightbox`)
6. **lightbox.css** → Styles GLightbox container and iframe

**No hidden divs. No HTML generation. Just clean, simple URLs!**

## 💡 Quick Experiments

### Change Background Behavior
```css
.lightbox-bg {
  background-size: contain;  /* Show full image, no crop */
  background-color: #000;    /* Add black background */
}
```

### Animate Panel on Open
```css
.lightbox-panel {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

### Change Color Scheme
```css
.lightbox-title {
  background: linear-gradient(to right, #00f5ff, #8b5cf6);  /* Cyan to Purple */
}

.btn-primary {
  background: linear-gradient(to right, #00f5ff, #8b5cf6);
}
```

## 🚀 Next Steps

1. **Experiment with the design** in `PortfolioLightboxCard.astro`
2. **Test on different screen sizes**
3. **Add interactions** (drag to expand panel, etc.)
4. **Consider animations** (fade in, slide up, etc.)
5. **Optimize images** for faster loading

## 📝 Notes

- The component HTML must match `portfolioPreview.ts` output
- If you change class names, update both files
- Use Tailwind classes where possible for consistency
- Scoped styles in component only affect that component
- Global styles in `lightbox.css` affect all lightboxes

---

**Happy Designing!** 🎨
