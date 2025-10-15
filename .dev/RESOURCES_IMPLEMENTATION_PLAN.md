# Resources Collection Implementation Plan

**Date:** 2025-10-15
**Goal:** Create a dynamic resources system similar to blog, with enhanced search/filtering

---

## Architecture Decisions

### 1. Tag System Strategy
- **Use unified tag system** - Both blog and resources share `/tags/[tag].astro`
- **No nested routes** - Avoid `resources/tags/` nesting
- Tag pages will show both blog posts AND resources with that tag
- Search bar on resources page filters resources only (client-side)
- Clicking tag keywords auto-populates search OR filters directly

### 2. Sorting Strategy
Options discussed:
- Manual order (for color scattering effect)
- Random order (for color variety)
- Newest first (logical, like blog)

**Decision:** Start with manual order (frontmatter `order` field), fallback to newest first. This gives control over color distribution while maintaining logical default.

### 3. Layout Inspiration
From `about.astro` (lines 18-63):
- Hero section with background SVG pattern
- Decorative blur gradient
- Split layout: text left, image right (or centered)
- Large heading (5xl/7xl)
- Description paragraph
- Action buttons (ButtonAura)

**Adaptation for resources:**
- Large icon instead of photo
- Resource title as main heading
- Description below
- Action buttons: "View File" / "Open Page" / "Download"
- Markdown content displays below hero

### 4. Color Mapping System
**Strategy:** Centralized tag-to-color mapping with frontmatter override

**From current resources page:**
- `blue-700` - Technology, Internet, Design
- `purple-700` - Personal development, D&D
- `pink-700` - Design, Graphics
- `yellow-400` - Food, Fun activities
- `green-700` - Business, Domain names

**Implementation:**
- Create `src/utils/resourceColors.ts` config file
- Map tags to colors (first tag wins)
- Frontmatter `color` field overrides automatic mapping
- Fallback to default color rotation if no match

**Color rotation for unmapped tags:**
`['blue-700', 'purple-700', 'pink-700', 'yellow-400', 'green-700']`

---

## Schema Design

```yaml
# Required fields
title: string
description: string
icon: string              # Maps to icon component or library
tags: string[]

# Optional fields
color?: string           # bg-color class for card (e.g., "blue-700", "purple-700")
order?: number           # Manual sorting (lower = first)
pubDate?: Date           # For chronological sorting
image?: { url, alt }     # Hero image (optional)

# External linking
fileUrl?: string         # Link to PDF/download
fileType?: string        # "PDF", "DOCX", "ZIP", etc.
standaloneUrl?: string   # Link to existing page (e.g., "/edicts")

# Display logic:
# - If standaloneUrl: link to that page
# - If fileUrl: show download button
# - Always render markdown content below hero
```

---

## File Structure

```
src/
├── collections/
│   └── resources/
│       ├── 10-principles.md
│       ├── memorization-for-speakers.md
│       └── intro-to-rtb.md
├── content.config.ts         [MODIFY]
├── layouts/
│   └── ResourceLayout.astro  [CREATE]
├── pages/
│   ├── resources.astro       [MODIFY]
│   ├── resources/
│   │   └── [...slug].astro   [CREATE]
│   └── tags/
│       └── [tag].astro       [MODIFY - add resources to query]
├── components/
│   └── atoms/
│       └── ResourceIcon.astro [CREATE - icon mapper]
└── utils/
    └── resourceColors.ts     [CREATE - color mapping config]
```

---

## Implementation Steps

### PHASE 1: Content Collection Setup

#### Step 1.1: Define Resources Collection
**File:** `src/content.config.ts`

Add resources collection:
```typescript
const resources = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/collections/resources" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    tags: z.array(z.string()),
    color: z.string().optional(),
    order: z.number().optional(),
    pubDate: z.date().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    fileUrl: z.string().optional(),
    fileType: z.string().optional(),
    standaloneUrl: z.string().optional(),
  })
});

// Update exports
export const collections = { blog, portfolio, products, resources };
```

#### Step 1.2: Create Resources Directory
**Action:** Create `src/collections/resources/` folder

#### Step 1.3: Create Trial Run Resources
**Files:** Create 3 markdown files

**File 1:** `src/collections/resources/10-principles.md`
```yaml
---
title: "10 Principles for Self Improvement"
description: "Timeless principles that cut through modern chaos. When everyone else is playing checkers, you'll be ending the game."
icon: "book"
tags: ["personal-development", "philosophy", "principles"]
color: "blue-700"
order: 1
pubDate: 2025-01-01
standaloneUrl: "/edicts"
image:
  url: "https://www.iestork.org/wp-content/uploads/2024/02/cover-jpeg.webp"
  alt: "Book cover for 10 Principles"
---

This comprehensive guide explores timeless principles for personal growth and self-mastery.

Click the button above to read the full interactive version.
```

**File 2:** `src/collections/resources/memorization-for-speakers.md`
```yaml
---
title: "Memorization for Public Speakers"
description: "How world champion speakers encode, store, and deploy information. Your mind becomes a fortress of accessible power."
icon: "document"
tags: ["public-speaking", "memory", "communication"]
color: "purple-700"
order: 2
pubDate: 2024-12-15
fileUrl: "/resources/memorization-for-public-speakers-1.0.2.pdf"
fileType: "PDF"
image:
  url: "/images/resources/memorization-for-public-speaking-1.png"
  alt: "Memorization for Public Speakers PDF Cover"
---

This guide reveals the memory techniques used by world champion public speakers to deliver powerful presentations without notes.

## What You'll Learn

- Memory palace technique
- Chunking strategies
- Retrieval practice methods
- Performance optimization tips

Download the PDF above to access the complete guide.
```

**File 3:** `src/collections/resources/intro-to-rtb.md`
```yaml
---
title: "Intro to Real-Time Bidding (RTB)"
description: "Understanding the real game behind online attention, influence, and conversion. See the matrix, then bend it."
icon: "document"
tags: ["advertising", "technology", "business"]
color: "pink-700"
order: 3
pubDate: 2024-11-20
fileUrl: "/resources/intro-to-rtb.pdf"
fileType: "PDF"
image:
  url: "https://images.unsplash.com/photo-1547586696-ea22b4d4235d"
  alt: "Abstract technology image"
---

Explore the hidden infrastructure of online advertising and learn how real-time bidding systems work.

## Key Concepts

- Ad exchanges and SSPs
- Header bidding
- Programmatic advertising
- Data management platforms

Download the full guide above.
```

---

### PHASE 1.5: Color Mapping System

#### Step 1.5.1: Create Color Config Utility
**File:** `src/utils/resourceColors.ts`

```typescript
// Tag-to-color mapping for resources
export const tagColorMap: Record<string, string> = {
  // Technology & Internet
  'technology': 'blue-700',
  'internet': 'blue-700',
  'web': 'blue-700',
  'advertising': 'blue-700',

  // Personal Development
  'personal-development': 'purple-700',
  'philosophy': 'purple-700',
  'principles': 'purple-700',
  'memory': 'purple-700',
  'self-improvement': 'purple-700',

  // Communication & Speaking
  'communication': 'pink-700',
  'public-speaking': 'pink-700',

  // Design & Graphics
  'design': 'pink-700',
  'graphics': 'pink-700',

  // Business & Finance
  'business': 'green-700',
  'finance': 'green-700',

  // Food & Fun
  'food': 'yellow-400',
  'games': 'yellow-400',
  'entertainment': 'yellow-400',
};

// Color rotation for unmapped tags
const colorRotation = ['blue-700', 'purple-700', 'pink-700', 'yellow-400', 'green-700'];

// Get color for a resource based on tags
export function getResourceColor(tags: string[], manualColor?: string, index: number = 0): string {
  // 1. Manual override takes precedence
  if (manualColor) return manualColor;

  // 2. Check if first tag has a mapping
  if (tags.length > 0) {
    const firstTag = tags[0].toLowerCase();
    if (tagColorMap[firstTag]) {
      return tagColorMap[firstTag];
    }
  }

  // 3. Fallback to color rotation based on index
  return colorRotation[index % colorRotation.length];
}
```

#### Step 1.5.2: Update Trial Resource Frontmatter
Remove manual `color` from trial resources to test auto-mapping:

**File 1:** `src/collections/resources/10-principles.md`
- Remove `color: "blue-700"` line
- First tag is `personal-development` → should auto-map to `purple-700`

**File 2:** `src/collections/resources/memorization-for-speakers.md`
- Remove `color: "purple-700"` line
- First tag is `public-speaking` → should auto-map to `pink-700`

**File 3:** `src/collections/resources/intro-to-rtb.md`
- Remove `color: "pink-700"` line
- First tag is `advertising` → should auto-map to `blue-700`

(Can always add `color` back for specific overrides)

---

### PHASE 2: Icon System

#### Step 2.1: Create Icon Mapper Component
**File:** `src/components/atoms/ResourceIcon.astro`

```astro
---
const { icon, size = "14" } = Astro.props;

// Icon mapping - expand as needed
const icons = {
  document: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-${size} h-${size}">
    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
  </svg>`,

  book: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-${size} h-${size}">
    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
  </svg>`,

  download: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-${size} h-${size}">
    <path d="M12 1.5a.75.75 0 0 1 .75.75V7.5h-1.5V2.25A.75.75 0 0 1 12 1.5ZM11.25 7.5v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
  </svg>`,

  link: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-${size} h-${size}">
    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>`,
};

const iconSvg = icons[icon] || icons.document; // Default to document icon
---

<Fragment set:html={iconSvg} />
```

---

### PHASE 3: Resource Layout

#### Step 3.1: Create ResourceLayout.astro
**File:** `src/layouts/ResourceLayout.astro`

Structure:
```astro
---
import BaseLayout from './BaseLayout.astro'
import ButtonAura from '../components/atoms/ButtonAura.astro'
import ResourceIcon from '../components/atoms/ResourceIcon.astro'

const { frontmatter } = Astro.props;
---

<BaseLayout pageTitle={frontmatter.title}>

  <!-- Hero Section (similar to About page) -->
  <div class="relative overflow-hidden bg-gray-900 isolate">
    <!-- Background pattern SVG -->
    <!-- Blur gradient -->

    <div class="flex flex-col items-center justify-center px-6 pt-10 mx-auto md:flex-row max-w-7xl lg:px-8 lg:pt-12">

      <!-- Content -->
      <div class="max-w-xl mx-auto shrink-0 lg:mx-0 lg:pt-8">
        <!-- Category/First Tag -->
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <p class="font-semibold text-indigo-400 text-base/7">{frontmatter.tags[0]}</p>
        )}

        <!-- Title -->
        <h1 class="text-5xl font-semibold tracking-tight text-white text-pretty sm:text-7xl">
          {frontmatter.title}
        </h1>

        <!-- Description -->
        <p class="mt-8 text-lg font-medium text-gray-400 text-pretty sm:text-xl/8">
          {frontmatter.description}
        </p>

        <!-- Action Buttons -->
        <div class="flex items-center mt-10 gap-x-6">
          {frontmatter.standaloneUrl && (
            <ButtonAura label="Read Article" link={frontmatter.standaloneUrl} />
          )}
          {frontmatter.fileUrl && (
            <ButtonAura
              label={`Download ${frontmatter.fileType || 'File'}`}
              link={frontmatter.fileUrl}
              openInNewTab="true"
            />
          )}
          <a href="#content" class="font-semibold text-white text-sm/6">
            Learn more <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <!-- Large Icon -->
      <div class="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-md lg:flex-none xl:ml-32">
        <div class="flex items-center justify-center flex-none w-full p-16 rounded-md shadow-2xl max-w-3xl sm:max-w-5xl lg:max-w-2xl bg-white/5 ring-1 ring-white/10">
          <ResourceIcon icon={frontmatter.icon} size="64" />
        </div>
      </div>

    </div>
  </div>

  <!-- Hero Image (if provided) -->
  {frontmatter.image && (
    <div class="px-6 mx-auto mt-16 max-w-7xl lg:px-8">
      <img
        src={frontmatter.image.url}
        alt={frontmatter.image.alt}
        class="object-cover w-full rounded-xl aspect-video bg-gray-800"
      />
    </div>
  )}

  <!-- Markdown Content -->
  <div id="content" class="prose bg-gray-900">
    <div class="prose-content">
      <div class="max-w-2xl mt-10">
        <slot />
      </div>
    </div>
  </div>

  <!-- Tags at Bottom -->
  {frontmatter.tags && frontmatter.tags.length > 0 && (
    <div class="px-6 mx-auto mt-16 max-w-7xl lg:px-8">
      <div class="max-w-2xl pt-8 border-t border-gray-700">
        <p class="mb-4 text-sm font-semibold text-gray-400">Tagged with:</p>
        <ul class="flex flex-wrap gap-2 mt-0 list-none space-y-0">
          {frontmatter.tags.map((tag) => (
            <li class="m-0">
              <a
                href={`/tags/${tag}`}
                class="inline-block px-3 py-1 text-sm transition-colors border rounded-full bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20 no-underline"
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}

</BaseLayout>
```

---

### PHASE 4: Dynamic Routes

#### Step 4.1: Create Individual Resource Pages
**File:** `src/pages/resources/[...slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import ResourceLayout from '../../layouts/ResourceLayout.astro';

export async function getStaticPaths() {
  const resources = await getCollection('resources');
  return resources.map(resource => ({
    params: { slug: resource.id },
    props: { resource },
  }));
}

const { resource } = Astro.props;
const { Content } = await render(resource);
---

<ResourceLayout frontmatter={resource.data}>
  <Content />
</ResourceLayout>
```

---

### PHASE 5: Update Resources Page

#### Step 5.1: Make Resources Dynamic
**File:** `src/pages/resources.astro`

Changes:
1. Import `getCollection`
2. Query resources collection
3. Sort by order (if present), then pubDate
4. Replace hardcoded cards with dynamic map
5. Keep existing search bar (functional implementation later)
6. Replace hardcoded tag keywords with unique tags from resources

Key code:
```astro
---
import { getCollection } from "astro:content";
import { getResourceColor } from "../utils/resourceColors";

const allResources = await getCollection("resources");

// Sort: by order field (if present), then by pubDate (newest first)
const sortedResources = allResources.sort((a, b) => {
  if (a.data.order !== undefined && b.data.order !== undefined) {
    return a.data.order - b.data.order;
  }
  if (a.data.order !== undefined) return -1;
  if (b.data.order !== undefined) return 1;

  // Fallback to date
  const dateA = a.data.pubDate || new Date(0);
  const dateB = b.data.pubDate || new Date(0);
  return dateB.getTime() - dateA.getTime();
});

// Get unique tags for filter keywords
const uniqueTags = [...new Set(allResources.map((r) => r.data.tags).flat())];
---

<!-- Replace hardcoded cards with: -->
{sortedResources.map((resource, index) => {
  const color = getResourceColor(resource.data.tags, resource.data.color, index);
  return (
    <a href={`/resources/${resource.id}`}>
      <div class={`... bg-${color}/30 ... hover:bg-${color}/80`}>
        <h4>{resource.data.title}</h4>
        <ResourceIcon icon={resource.data.icon} />
      </div>
    </a>
  );
})}

<!-- Replace hardcoded tag keywords with: -->
{uniqueTags.map((tag) => (
  <li class="...">
    <a href={`/tags/${tag}`}>{tag}</a>
  </li>
))}
```

---

### PHASE 6: Update Tag System

#### Step 6.1: Modify Tag Pages to Include Resources
**File:** `src/pages/tags/[tag].astro`

Changes:
```astro
---
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const allPosts = await getCollection("blog");
  const allResources = await getCollection("resources");

  // Combine tags from both collections
  const allTags = [
    ...allPosts.map((post) => post.data.tags).flat(),
    ...allResources.map((resource) => resource.data.tags).flat()
  ];
  const uniqueTags = [...new Set(allTags)];

  return uniqueTags.map((tag) => {
    const filteredPosts = allPosts.filter((post) =>
      post.data.tags.includes(tag)
    );
    const filteredResources = allResources.filter((resource) =>
      resource.data.tags.includes(tag)
    );

    return {
      params: { tag },
      props: {
        posts: filteredPosts,
        resources: filteredResources
      },
    };
  });
}

const { tag } = Astro.params;
const { posts, resources } = Astro.props;
---

<!-- Display both posts and resources -->
<h2>Blog Posts</h2>
{posts.map(...)}

<h2>Resources</h2>
{resources.map(...)}
```

#### Step 6.2: Update Tags Index
**File:** `src/pages/tags/index.astro`

Add resources to tag collection:
```astro
---
const allPosts = await getCollection("blog");
const allResources = await getCollection("resources");

const allTags = [
  ...allPosts.map((post) => post.data.tags).flat(),
  ...allResources.map((resource) => resource.data.tags).flat()
];
const uniqueTags = [...new Set(allTags)];
---
```

---

### PHASE 7: Search Functionality (Client-Side)

#### Step 7.1: Add Search Script to Resources Page
**File:** `src/pages/resources.astro`

Add at bottom:
```astro
<script>
  const searchInput = document.querySelector('input[type="text"]');
  const resourceCards = document.querySelectorAll('[data-resource-card]');

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    resourceCards.forEach(card => {
      const title = card.dataset.title?.toLowerCase() || '';
      const description = card.dataset.description?.toLowerCase() || '';
      const tags = card.dataset.tags?.toLowerCase() || '';

      const matches = title.includes(query) ||
                      description.includes(query) ||
                      tags.includes(query);

      card.style.display = matches ? '' : 'none';
    });
  });

  // Optional: Tag click auto-populates search
  const tagLinks = document.querySelectorAll('[data-tag-filter]');
  tagLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tag = link.dataset.tagFilter;
      searchInput.value = tag;
      searchInput.dispatchEvent(new Event('input'));
    });
  });
</script>
```

Add data attributes to cards:
```astro
<div
  data-resource-card
  data-title={resource.data.title}
  data-description={resource.data.description}
  data-tags={resource.data.tags.join(' ')}
>
```

---

## Testing Checklist

- [ ] Resources collection loads without errors
- [ ] 3 trial resources display on `/resources`
- [ ] Cards maintain staggered translate-y effect
- [ ] Cards show correct colors from frontmatter
- [ ] Clicking card goes to `/resources/[slug]`
- [ ] Individual resource page shows hero section
- [ ] Icon displays correctly (large, centered)
- [ ] Buttons appear based on frontmatter (standaloneUrl/fileUrl)
- [ ] Markdown content renders below hero
- [ ] Tags display at bottom and link to tag pages
- [ ] Tag pages show both blog posts AND resources
- [ ] Tags index includes all tags from both collections
- [ ] Search bar filters resources by title/description/tags
- [ ] Tag keywords can trigger search filter

---

## Future Enhancements (Post-MVP)

1. **Icon Library:** Add Heroicons or similar for more icon variety
2. **Advanced Search:** Add category/tag filtering dropdowns
3. **Related Resources:** Show related resources based on shared tags
4. **Resource Stats:** View count, download count (requires backend)
5. **RSS Feed:** Add resources to RSS or create separate feed
6. **Color Schemes:** Create more sophisticated color theming system
7. **Animations:** Add scroll animations for card entrance
8. **Accessibility:** Ensure keyboard navigation works for search/filter

---

## Notes

- Search functionality is client-side only (no server/DB needed)
- **Color system** is centralized in `resourceColors.ts`:
  - Maps tags to colors automatically
  - Frontmatter `color` field overrides mapping
  - Falls back to color rotation for unmapped tags
  - Easy to maintain and expand
- Color classes must be whitelisted in Tailwind (or use arbitrary values)
- Icon system is simple string mapping (easily replaceable with library)
- Manual ordering gives control over visual layout
- Unified tag system keeps architecture simple
- Resources page maintains existing visual design (staggered cards, colors, hover effects)

---

## Quick Reference: Files to Create/Modify

**CREATE:**
- `src/collections/resources/` (directory)
- `src/collections/resources/10-principles.md`
- `src/collections/resources/memorization-for-speakers.md`
- `src/collections/resources/intro-to-rtb.md`
- `src/utils/resourceColors.ts` ⭐ (color mapping config)
- `src/components/atoms/ResourceIcon.astro`
- `src/layouts/ResourceLayout.astro`
- `src/pages/resources/[...slug].astro`

**MODIFY:**
- `src/content.config.ts`
- `src/pages/resources.astro` (use color utility)
- `src/pages/tags/[tag].astro`
- `src/pages/tags/index.astro`

---

**Status:** Ready to implement
**Next Step:** Begin Phase 1 - Content Collection Setup
