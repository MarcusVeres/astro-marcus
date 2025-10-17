# Portfolio Lightbox Implementation Plan

**Date:** 2025-10-17
**Goal:** Transform hardcoded portfolio grid into dynamic, filterable system with custom lightbox

---

## Project Vision

### Current State
- **Grid:** Hardcoded 17 items in `portfolio.astro` with custom spans/positions
- **Lightbox:** Pandabox component using `galleries/portfolio.json` (20+ images)
- **Content:** Portfolio markdown collection (21 files) with rich metadata
- **Problem:** Three separate systems not connected

### Target State
- **Single source of truth:** Portfolio markdown collection
- **Dual-mode layout:**
  - **Curated mode (default):** Hand-crafted masonry layout, exact visual replica
  - **Filtered mode:** Dynamic auto-flowing grid, no gaps
- **Custom lightbox:** Portfoliobox component with enhanced features
- **Filterable:** By category (art, design, photography, programming, video, writing)
- **Future-ready:** Support for case studies, external links, enhanced metadata

---

## Architecture Decisions

### 1. Component Separation
- **Pandabox.astro** - Keep original for reference/other uses
- **Portfoliobox.astro** - New custom component for portfolio (already created)
- Allows comparison and preserves working code

### 2. Data Flow
```
Portfolio Markdown Files
    ↓
Astro Content Collection
    ↓
portfolio.astro (grid generation)
    ↓
Portfoliobox.astro (lightbox display)
```

### 3. Layout Strategy

#### Curated Mode (Default)
- Uses `order` field to determine sequence
- Respects `gridSpan`, `aspectRatio`, `gridPosition` from frontmatter
- Exact pixel-perfect recreation of current design
- Custom positioning for featured items

#### Filtered Mode (Active Search)
- Uniform grid layout (no custom spans)
- Auto-flowing masonry (no gaps)
- All items same size for consistency
- Smooth transitions between states

### 4. CSS Approach
```css
/* Curated mode */
.portfolio-grid[data-mode="curated"] .portfolio-item {
  /* Inline styles from frontmatter */
  grid-column: var(--grid-column);
  grid-row: var(--grid-row);
}

/* Filtered mode */
.portfolio-grid[data-mode="filtered"] .portfolio-item {
  grid-column: auto !important;
  grid-row: auto !important;
  aspect-ratio: 1.618 / 1; /* Golden ratio */
}
```

---

## Current Grid Audit

### Hardcoded Grid Items (portfolio.astro lines 71-148)

| Order | Image | Grid Classes | Aspect | Notes |
|-------|-------|--------------|--------|-------|
| 0 | (Title card) | `col-span-2 sm:col-span-3 md:col-span-2` | N/A | Not a portfolio item |
| 1 | pine.jpg | `md:col-start-3 aspect-golden` | Golden | Precise column start |
| 2 | cardinal.jpg | `aspect-golden` | Golden | |
| 3 | grandpa.jpg | `aspect-golden` | Golden | |
| 4 | lamp.jpg | `row-span-2` | Default | Tall item |
| 5 | knob.jpg | `aspect-golden` | Golden | |
| 6 | fence.jpg | `row-span-2` | Default | Tall item |
| 7 | trunk.jpg | `aspect-golden` | Golden | |
| 8 | pipes.jpg | `aspect-golden` | Golden | |
| 9 | flowers.jpg | `aspect-golden` | Golden | |
| 10 | knife.jpg | `md:col-span-2` | Default | Wide item + text overlay |
| 11 | tunnel.jpg | `aspect-golden` | Golden | |
| 12 | streetlight.jpg | `row-span-2` | Default | Tall item |
| 13 | wall.jpg | `aspect-golden` | Golden | |
| 14 | spade.jpg | `row-span-2` | Default | Tall item |
| 15 | miki.jpg | `aspect-golden` | Golden | |
| 16 | glow.jpg | `aspect-golden` | Golden | |
| 17 | shatters.jpg | `aspect-golden` | Golden | |

**Total:** 17 portfolio items + 1 title card

### Grid Patterns Identified
- **Golden ratio items:** 13 items (most common)
- **Tall items (row-span-2):** 4 items (lamp, fence, streetlight, spade)
- **Wide item (col-span-2):** 1 item (knife) - also has text overlay
- **Precise positioning:** 1 item (pine with col-start-3)
- **Special:** Knife has case study text overlay

---

## Frontmatter Schema Design

### Required Fields
```yaml
title: string          # "Pine Tree Macro"
image: string          # "/images/portfolio/pine.jpg"
category: string[]     # ["photography", "nature"]
order: number          # Position in curated layout
```

### Grid Control Fields
```yaml
# Layout behavior in curated mode
gridSpan: string       # "default", "row-span-2", "col-span-2", "md:col-span-2"
aspectRatio: string    # "golden", "square", "portrait", "landscape", "default"
gridPosition: string?  # Optional: "md:col-start-3" for precise placement
```

### Display Fields
```yaml
description: string    # For lightbox caption
contentType: enum      # "simple", "case-study", "external", "iframe"
pubDate: date?         # Optional chronological sorting
```

### Content Type Specific Fields
```yaml
# When contentType = "case-study"
caseStudyUrl: string?     # "/m/knife-design"
showOverlay: boolean?     # Show text on grid card

# When contentType = "external"
externalUrl: string?      # "https://behance.net/..."
externalLabel: string?    # "View on Behance"

# Optional social links
links: array?
  - label: string
    url: string
    icon: string          # "behance", "github", etc.
```

### Example Frontmatter

**Simple Item (pine.md):**
```yaml
---
title: "Pine Tree Macro"
description: "Detailed close-up of pine needles in natural light."
image: "/images/portfolio/pine.jpg"
category: ["photography", "nature"]
order: 1
gridSpan: "default"
aspectRatio: "golden"
gridPosition: "md:col-start-3"
contentType: "simple"
pubDate: 2024-08-15
---
```

**Case Study Item (knife-case-study.md):**
```yaml
---
title: "Knife Design Case Study"
description: "In-depth look at the design process for a custom chef's knife."
image: "/images/portfolio/knife.jpg"
category: ["design", "3d", "case-study"]
order: 10
gridSpan: "md:col-span-2"
aspectRatio: "default"
contentType: "case-study"
caseStudyUrl: "/m/case-study-knife"
showOverlay: true
pubDate: 2024-10-01
client: "Personal Project"
technologies: ["Blender", "Photoshop", "Illustrator"]
links:
  - label: "View on Behance"
    url: "https://behance.net/gallery/example"
    icon: "behance"
---
```

**Tall Item (lamp.md):**
```yaml
---
title: "Vintage Lamp Detail"
description: "Architectural lighting fixture in abandoned building."
image: "/images/portfolio/lamp.jpg"
category: ["photography", "architecture"]
order: 4
gridSpan: "row-span-2"
aspectRatio: "default"
contentType: "simple"
pubDate: 2024-09-10
---
```

---

## Implementation Phases

### **PHASE 1: Grid Migration** 🏗️
**Goal:** Recreate exact current grid using markdown data

#### Step 1.1: Audit Existing Markdown Files
- Check which files exist for current grid items
- Identify missing files (need to create)
- Verify image paths match

#### Step 1.2: Update Frontmatter
- Add `order` field to all 17 items (matching current sequence)
- Add `gridSpan` field (map from current classes)
- Add `aspectRatio` field
- Add `gridPosition` if needed (pine.jpg)
- Ensure `category` arrays are populated

#### Step 1.3: Create Missing Files
If any grid items don't have markdown files, create them with minimal frontmatter

#### Step 1.4: Build Dynamic Grid
Update `portfolio.astro`:
```astro
---
import { getCollection } from 'astro:content';

const allPortfolio = await getCollection('portfolio');

// Sort by order field (curated layout)
const sortedPortfolio = allPortfolio
  .filter(item => item.data.order !== undefined)
  .sort((a, b) => a.data.order - b.data.order);
---

<!-- Title card -->
<div class="col-span-2 sm:col-span-3 md:col-span-2 ...">
  <h1>Portfolio</h1>
</div>

<!-- Dynamic grid items -->
{sortedPortfolio.map((item, index) => {
  const gridClasses = [
    'card-zoom',
    item.data.gridSpan !== 'default' ? item.data.gridSpan : '',
    item.data.aspectRatio === 'golden' ? 'aspect-golden' : '',
    item.data.gridPosition || ''
  ].filter(Boolean).join(' ');

  return (
    <div
      class={gridClasses}
      data-portfolio-item
      data-index={index}
      data-categories={item.data.category.join(',')}
    >
      <div class={`card-zoom-image bg-[url('${item.data.image}')]`}></div>
      {item.data.showOverlay && (
        <h3 class="card-zoom-text">{item.data.title}</h3>
      )}
    </div>
  );
})}
```

#### Step 1.5: Visual Verification
- Compare side-by-side with current grid
- Verify all 17 items appear
- Check spacing, aspect ratios, spans
- Ensure title card in correct position

---

### **PHASE 2: Dual-Mode Layout** 🎨
**Goal:** Add filtered mode with auto-flowing grid

#### Step 2.1: Add Filter State Management
```javascript
<script>
  let activeFilter = 'all'; // or specific category
  const portfolioGrid = document.querySelector('.portfolio-grid');

  function updateGridMode() {
    if (activeFilter === 'all') {
      portfolioGrid.setAttribute('data-mode', 'curated');
    } else {
      portfolioGrid.setAttribute('data-mode', 'filtered');
    }
  }
</script>
```

#### Step 2.2: Add CSS for Filtered Mode
```css
/* src/styles/components.css */

/* Curated mode (default) - respects custom grid spans */
.portfolio-grid[data-mode="curated"] .portfolio-item {
  /* Inline styles from frontmatter already applied */
}

/* Filtered mode - uniform auto-flow */
.portfolio-grid[data-mode="filtered"] .portfolio-item {
  grid-column: auto !important;
  grid-row: auto !important;
  aspect-ratio: 1.618 / 1 !important;

  /* Remove custom classes */
  &.row-span-2,
  &.col-span-2,
  &.md\\:col-span-2 {
    grid-column: auto !important;
    grid-row: auto !important;
  }
}

/* Hide items that don't match filter */
.portfolio-item[data-hidden="true"] {
  display: none;
}
```

#### Step 2.3: Connect Filter UI
Update existing filter categories to trigger mode switch:
```javascript
// Existing filter buttons
const categoryButtons = document.querySelectorAll('[data-category-filter]');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.categoryFilter;
    activeFilter = category;

    // Filter items
    portfolioItems.forEach(item => {
      const itemCategories = item.dataset.categories.split(',');
      if (category === 'all' || itemCategories.includes(category)) {
        item.removeAttribute('data-hidden');
      } else {
        item.setAttribute('data-hidden', 'true');
      }
    });

    // Update grid mode
    updateGridMode();
  });
});
```

#### Step 2.4: Connect Search Bar
Integrate with existing search input:
```javascript
const searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  if (query === '') {
    activeFilter = 'all';
    portfolioItems.forEach(item => item.removeAttribute('data-hidden'));
  } else {
    activeFilter = 'search';
    portfolioItems.forEach(item => {
      const title = item.dataset.title?.toLowerCase() || '';
      const categories = item.dataset.categories?.toLowerCase() || '';

      if (title.includes(query) || categories.includes(query)) {
        item.removeAttribute('data-hidden');
      } else {
        item.setAttribute('data-hidden', 'true');
      }
    });
  }

  updateGridMode();
});
```

---

### **PHASE 3: Lightbox Integration** 🖼️
**Goal:** Connect Portfoliobox to markdown data

#### Step 3.1: Modify Portfoliobox Component
Update `src/components/Portfoliobox.astro` to accept portfolio collection:

```astro
---
import { type CollectionEntry } from "astro:content";
import { Image } from "astro:assets";

interface Props {
  portfolioItems: CollectionEntry<"portfolio">[];
  transitionType?: string;
}

const { portfolioItems, transitionType } = Astro.props;
---

<!-- Remove thumbnail rendering (handled by main grid) -->
<!-- Keep only lightbox dialog -->

<dialog class="lightbox-dialog" data-option={transitionType || "slide-in"}>
  <div class="lightbox-content">
    {portfolioItems.map((item, index) => (
      <figure class="lightbox-image-container" id={`image-${index}`}>
        <div class="lightbox-image-wrapper">
          <img
            src={item.data.image}
            alt={item.data.title}
            loading={index < 4 ? "eager" : "lazy"}
            class="lightbox-image"
            data-index={index}
          />
        </div>
        <figcaption class="lightbox-caption">
          <p>{index + 1}. {item.data.title}</p>
          {item.data.description && <p>{item.data.description}</p>}

          {/* Case study button */}
          {item.data.contentType === 'case-study' && item.data.caseStudyUrl && (
            <a href={item.data.caseStudyUrl} class="lightbox-cta">
              View Case Study →
            </a>
          )}

          {/* External links */}
          {item.data.links && (
            <div class="lightbox-links">
              {item.data.links.map(link => (
                <a href={link.url} target="_blank" rel="noopener">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </figcaption>
      </figure>
    ))}
  </div>

  <!-- Navigation buttons (keep existing) -->
  <button class="prev-button" aria-label="previous slide">...</button>
  <button class="next-button" aria-label="next slide">...</button>
  <button class="close-button" aria-label="close button">...</button>
</dialog>

<!-- Keep existing styles and scripts -->
```

#### Step 3.2: Update portfolio.astro
```astro
---
import Portfoliobox from '../components/Portfoliobox.astro';
// ... existing imports

const sortedPortfolio = // ... existing sort
---

<!-- Add Portfoliobox component -->
<Portfoliobox portfolioItems={sortedPortfolio} transitionType="slide-in" />

<!-- Grid items get click handlers -->
{sortedPortfolio.map((item, index) => (
  <button
    class={/* grid classes */}
    data-lightbox-trigger
    data-index={index}
    aria-label={`View ${item.data.title}`}
  >
    <div class={`card-zoom-image bg-[url('${item.data.image}')]`}></div>
  </button>
))}
```

#### Step 3.3: Update JavaScript
Modify Portfoliobox script to listen for grid clicks:
```javascript
// In Portfoliobox.astro <script>
const gridTriggers = document.querySelectorAll('[data-lightbox-trigger]');

gridTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const index = parseInt(trigger.dataset.index);
    openLightbox(index);
  });
});

function openLightbox(index) {
  // Existing openLightbox logic
  // but no need to get rect from thumbnail
  // Just open dialog and show image at index
}
```

---

## Testing Checklist

### Phase 1 (Grid Migration)
- [ ] All 17 items render in correct order
- [ ] Grid spans match original (row-span-2, col-span-2)
- [ ] Aspect ratios correct (golden vs default)
- [ ] Pine starts at correct column (col-start-3)
- [ ] Knife shows text overlay
- [ ] Title card in correct position
- [ ] No visual differences from original

### Phase 2 (Dual-Mode)
- [ ] Default shows curated layout
- [ ] Category filter switches to uniform grid
- [ ] Filtered items maintain aspect ratio
- [ ] No gaps in filtered layout
- [ ] Search triggers filtered mode
- [ ] Clearing search returns to curated mode
- [ ] Smooth transitions between modes
- [ ] Filter buttons update visual state

### Phase 3 (Lightbox)
- [ ] Clicking grid item opens lightbox
- [ ] Lightbox shows correct image
- [ ] Title and description display
- [ ] Case study button appears for knife
- [ ] External links render
- [ ] Navigation works (prev/next)
- [ ] Keyboard navigation (arrows, escape)
- [ ] Touch swipe works on mobile
- [ ] Zoom animation smooth
- [ ] Filtered state maintains correct indices

---

## File Modifications Summary

### Create
- `.dev/PORTFOLIO_LIGHTBOX_IMPLEMENTATION.md` (this file)

### Modify
- `src/content.config.ts` - Portfolio schema (already updated)
- `src/collections/portfolio/*.md` - Add grid metadata to frontmatter
- `src/pages/portfolio.astro` - Replace hardcoded grid with dynamic
- `src/components/Portfoliobox.astro` - Accept portfolio collection
- `src/styles/components.css` - Add dual-mode grid styles

### Create (if needed)
- Missing portfolio markdown files for any hardcoded items

---

## Future Enhancements (Post-MVP)

### Phase 4: Advanced Features
- [ ] Case study detail pages
- [ ] Hover overlays with quick info
- [ ] Animation on filter transitions
- [ ] Load more / pagination
- [ ] Share buttons in lightbox
- [ ] Deep linking to specific portfolio items
- [ ] Related work suggestions
- [ ] View count tracking

### Phase 5: Performance
- [ ] Lazy load images below fold
- [ ] Optimize image sizes
- [ ] Preload lightbox images on hover
- [ ] Virtual scrolling for large collections

---

## Notes & Decisions

### Why Dual-Mode Layout?
- **Curated mode** preserves artistic intent and visual hierarchy
- **Filtered mode** ensures no gaps and consistent experience when browsing
- Best of both worlds: hand-crafted + functional

### Why Keep gridSpan in Frontmatter?
- Easy to adjust layout without touching code
- Content creators control visual presentation
- Single source of truth for all metadata

### Why Separate Portfoliobox?
- Preserves original Pandabox for reference
- Allows side-by-side comparison
- Can revert easily if needed
- Portfolio-specific enhancements don't affect other galleries

### Migration Strategy
- Incremental approach minimizes risk
- Each phase independently testable
- Can pause at any phase and still have working site
- Visual verification at each step

---

## Success Criteria

✅ Grid looks identical to current design (curated mode)
✅ Filtering works smoothly (no gaps)
✅ Lightbox displays correct content
✅ All metadata from markdown
✅ Search and filter functional
✅ Mobile responsive
✅ Accessible (keyboard, screen readers)
✅ No performance regression

---

**Status:** Ready to implement Phase 1
**Next Step:** Audit existing markdown files and map to grid items
