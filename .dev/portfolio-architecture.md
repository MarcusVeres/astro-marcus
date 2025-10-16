# Portfolio Gallery Architecture

## Overview
A unified lightbox experience where every portfolio item opens a custom preview card. Users can swipe between projects horizontally, and if they want more detail, they can click through to external sites or internal case study pages.

## User Experience

### Navigation
- **Horizontal swipe/arrows**: Cycle between portfolio projects
- **Vertical scroll**: Scroll within current preview card (for long content)
- **Click outside or ESC**: Close lightbox
- **Every item behaves the same**: Click → Preview opens → Choose to go deeper (or not)

### Benefits
- **Predictable**: Users know what to expect every time
- **Choice**: Users decide if they want to explore deeper
- **Uniform**: No random mix of "this opens lightbox, that opens new tab"
- **Touch-friendly**: Natural swipe gestures on mobile

## Portfolio Collection Schema

### Location
`src/collections/portfolio/`

### Schema Fields
```typescript
{
  title: string;                    // "Knife Design Project"
  description: string;              // Short description for preview card
  image: string;                    // Hero image URL
  category: string[];               // ["design", "3d"] - for filtering later
  order: number;                    // Display order in grid
  pubDate: Date;                    // When project was completed

  // Content type determines what happens in preview
  contentType: 'simple' | 'case-study' | 'external' | 'iframe';

  // Optional fields based on contentType
  caseStudyUrl?: string;           // Internal URL like "/m/knife-design"
  externalUrl?: string;            // External URL like "https://behance.net/..."
  externalLabel?: string;          // Button text like "View on Behance"
  iframeUrl?: string;              // Any URL to embed as iframe

  // Social/External Links (array of links to display in preview)
  links?: [
    { label: "Behance", url: "https://...", icon: "behance" },
    { label: "GitHub", url: "https://...", icon: "github" }
  ];

  // Grid display
  gridSpan?: 'default' | 'wide' | 'tall' | 'large';  // Controls col-span/row-span
  aspectRatio?: 'golden' | 'square' | 'portrait' | 'landscape';
}
```

## Preview Card Template

GLightbox allows custom HTML in the lightbox. We'll create a template that adapts based on `contentType`:

### Simple Image Preview
```html
<div class="glightbox-preview">
  <img src="hero-image.jpg" />
  <div class="preview-details">
    <h2>Project Title</h2>
    <p>Description goes here</p>
    <!-- Optional social links -->
  </div>
</div>
```

### Case Study Preview
```html
<div class="glightbox-preview">
  <img src="hero-image.jpg" />
  <div class="preview-details">
    <h2>Project Title</h2>
    <p>Description goes here</p>
    <a href="/m/case-study" class="btn-primary">Read Full Case Study</a>
    <!-- Optional social links -->
  </div>
</div>
```

### External Project Preview
```html
<div class="glightbox-preview">
  <img src="hero-image.jpg" />
  <div class="preview-details">
    <h2>Project Title</h2>
    <p>Description goes here</p>
    <a href="https://external-site.com" target="_blank" class="btn-primary">
      View on Behance
    </a>
  </div>
</div>
```

### Iframe Preview (Advanced)
```html
<div class="glightbox-preview">
  <iframe src="/m/case-study" frameborder="0"></iframe>
  <!-- User can scroll within iframe vertically -->
</div>
```

## GLightbox Configuration

### Features to Enable
- ✅ Touch navigation (swipe left/right)
- ✅ Keyboard navigation (arrow keys, ESC)
- ✅ Loop through items
- ✅ Prev/Next buttons (styled custom)
- ✅ Click outside to close
- ✅ Custom HTML content support
- ✅ Preload adjacent images

### Custom Styling
- Match cyberpunk aesthetic (dark bg, neon accents)
- Custom prev/next arrow buttons
- Styled preview cards
- Responsive for mobile/tablet/desktop

## Implementation Steps

### Phase 1: Setup & Structure
1. ✅ Install GLightbox
2. ✅ Add basic integration to portfolio.astro
3. Create portfolio collection in `content.config.ts`
4. Create sample portfolio items (5-6 examples covering all types)

### Phase 2: Preview Card System
5. Create preview card template function
6. Generate GLightbox HTML from portfolio collection data
7. Wire up portfolio items to use collection data
8. Test different contentTypes

### Phase 3: Styling & UX
9. Style preview cards (cyberpunk theme)
10. Add/style prev/next buttons
11. Enable click-outside-to-close
12. Add custom close button (visible on mobile)
13. Test on mobile devices

### Phase 4: Advanced Features
14. Create case study template for `/m/` pages
15. Test iframe embedding
16. Add filtering (if desired)
17. Add lazy loading for images
18. Performance optimization

## Technical Notes

### GLightbox HTML Content
GLightbox supports `data-content` attribute for custom HTML:
```html
<a href="#" class="glightbox" data-content="<div>Custom HTML here</div>">
```

We can dynamically generate this content from the collection data.

### Filtering (Future)
The existing search/filter UI from resources page can be adapted:
- Filter by category tags
- Search by title/description
- Grid re-arranges with animations

### Responsive Considerations
- Preview cards should adapt to viewport size
- Mobile: Full screen preview, easy thumb-accessible close button
- Desktop: Centered preview with backdrop
- Iframe content should be responsive

## Migration from Current State

### Current Portfolio Items
Currently hardcoded divs with background images. Need to:
1. Create portfolio collection entries for each existing image
2. Add proper titles, descriptions, categories
3. Determine which are simple images vs need case studies
4. Update portfolio.astro to loop through collection instead of hardcoded items

### Existing Images
- Already in `/public/images/portfolio/`
- Keep using these, just reference them in collection frontmatter
- Add more metadata (photographer credit, date, etc.)

## Questions to Resolve
- [ ] Do we want filtering immediately or phase 2?
- [ ] Should iframe previews be scrollable or fixed height?
- [ ] Do we want to show project count/navigation (e.g., "3 of 18")?
- [ ] Animation preferences for prev/next transitions?

---

**Status**: Ready to implement
**Next Step**: Create portfolio collection schema and sample entries
