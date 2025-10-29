# Portfolio Analysis & Migration Plan
**Date:** 2025-10-29
**Purpose:** Document findings from astro-marcus portfolio review and plan migration from capensis

---

## CURRENT PORTFOLIO (astro-marcus) - KEY FINDINGS

### Architecture
- **Framework:** Astro with Content Collections
- **Content Format:** Markdown files with YAML frontmatter
- **Location:** `src/collections/portfolio/*.md` (36 existing items)
- **Images:** `src/assets/images/portfolio/` (auto-optimized to WebP)
- **Schema:** Type-safe validation via `src/content.config.ts`

### Content Model
```yaml
title: string (required)
description: string (required)
image: optimized image path (required)
thumbnail: optional alternate thumbnail
tags: array of strings for filtering
order: number (descending sort, higher = newer)
contentType: "simple" | "case-study" | "external" | "iframe"
gridSpan: Tailwind CSS classes for grid layout
aspectRatio: "golden" | "square" | "default"
pubDate: date
technologies: array of strings
links: array of {label, url, icon}
```

### Display System
- **Main page:** `/portfolio` - responsive grid with search/filtering
- **Individual pages:** `/portfolio/[slug]` - detailed project view
- **Lightbox:** Full-screen viewer with navigation and social sharing
- **Tags:** Unified system across portfolio, blog, and resources
- **Categories:** Predefined filters (Art, Design, Photography, Programming, Video, Writing)

### Technical Features
- Automatic image optimization (multiple sizes, WebP conversion)
- Lazy loading and responsive srcset
- Advanced grid system with custom spans
- SEO-optimized with OpenGraph metadata

---

## OLD PORTFOLIO (capensis) - INVENTORY

### Architecture
- **Framework:** Flask + AngularJS 1.2.20
- **Content Format:** JSON data file (`static/data/work.json`)
- **Images:** `static/img/projects/[slug]/`
- **Total Projects:** 15 main projects + 1 in backup file

### Image Structure per Project
```
projects/[slug]/
├── thumbnail.png       # Grid thumbnail
├── main.jpg           # Hero image
└── images/            # Detail images (0-5 per project)
    ├── image1.jpg
    └── image2.png
```

### Projects to Migrate (15 total)

1. **TowIt** (towit) - Mobile + Web App
   - Client: TowIt | URL: http://towit.io
   - Services: Full Stack Dev, Graphic Design, UI/UX
   - Tech: HTML, CSS, JS, AngularJS, Ionic, Android Studio
   - Images: 2 detail images

2. **Health is Cool 360** (health-is-cool-360) - Sales Presentations
   - Client: Novis Health
   - Services: Development, Design, Animation
   - Tech: ActionScript 3.0, Adobe Flash
   - Images: 3 detail images

3. **Alchemetal** (alchemetal) - Display Typeface
   - Client: In-House
   - Services: Graphic Design, CAD
   - Tech: Photoshop, Illustrator, 3D Studio Max
   - Images: 1 detail image

4. **OPUS** (opus) - Integrated Web App
   - Client: Self-Directed
   - Services: Graphic Design, Programming, UI/UX
   - Tech: PHP, CodeIgniter, HTML, CSS, JS
   - URL: http://marcusveres.com/opus/app/public/landing
   - Images: 3 detail images

5. **FireGuard** (fireguard) - Firewall Admin Tool
   - Client: Self-Directed
   - Services: Graphic Design, Programming, UI/UX
   - Tech: Python, JavaScript, HTML, Angular, Bootstrap
   - Images: 0 detail images (thumbnail + main only)

6. **Shoot 'em Up 2048** (smu-2048) - Game
   - Client: Self-Directed
   - Services: Graphic Design, Programming, Game Design
   - Tech: JavaScript, CSS, HTML Canvas
   - URL: http://marcusveres.com/tmp/smu48/smu48.html
   - Images: 1 detail image

7. **PhScale Outfitters Season 1** (ph-scale-outfitters) - Apparel Design
   - Client: PhScale Outfitters
   - Services: Apparel Design, Illustration
   - Tech: Adobe Illustrator
   - Images: 5 detail images
   - Note: Photo credit: Ted Belton Photography

8. **Hollywood Tycoon** (social-game-universe) - Facebook Game
   - Client: Social Game Universe
   - Services: Design, Development, UI/UX
   - Tech: ActionScript, XML, Flash
   - URL: http://www.socialgameuniverse.com/portfolio/hollywood-tycoon/
   - Images: 3 detail images
   - Note: "One of the best casual tycoon games available"

9. **Trackula** (trackula) - Time Tracking App
   - Client: Simon Yates
   - Services: Graphic Design, UI/UX, Wireframing
   - Tech: Illustrator, Balsamiq
   - Images: 2 detail images
   - Special: Has PDF wireframes document

10. **Sybaris Corporate** (sybaris-analytics) - Corporate Website
    - Client: Sybaris Analytics
    - Services: Design, Development
    - Tech: PHP, CSS, HTML, Photoshop, 3D Studio Max
    - URL: http://www.sybaris.ca
    - Images: 1 detail image

11. **Wylde About Health** (wylde-about-health) - Celebrity Website
    - Client: Sybaris Analytics
    - Services: Graphic Design, Web Development
    - Tech: PHP, CSS, HTML
    - URL: http://www.wyldeabouthealth.com/
    - Note: For Bryce Wylde, regular guest on Dr. Oz
    - Images: 1 detail image

12. **YourScope Marketing Package** (yourscope-silo) - SILO
    - Client: YourScope
    - Services: Graphic Design, CAD
    - Tech: HTML, CSS, JS, 3D Studio Max
    - Note: Online tutoring system for elementary students
    - Images: 3 detail images

13. **Nabob Sustainable Packaging** (nabob-sustainable) - Concept Design
    - Client: Concept Piece
    - Services: Graphic Design, Package Design
    - Tech: Photoshop, Illustrator
    - Note: Eco-friendly coffee packaging with wooden barrel dispensers
    - Images: 4 detail images

14. **Geovin Furniture Catalogue** (geovin-furniture) - Marketing Materials
    - Client: Geovin Furniture
    - Services: Graphic Design
    - Tech: Photoshop, Illustrator, InDesign
    - URL: http://www.geovin.com
    - Images: 3 detail images

15. **Stouffville Motorfest 2009** (stouffville-motorfest-2009) - Event Design
    - Services: Graphic Design, Photography
    - Tech: Photoshop, Illustrator, 3D Studio Max
    - Note: Annual outdoor motor vehicle exhibition
    - Images: 4 detail images

### BONUS PROJECT (in backup file)
16. **Bond Brand Loyalty** (bond-nfc) - NFC Event System
    - Client: Juice Mobile
    - Services: Full Stack Dev, Graphic Design, UX/UI
    - Tech: Python, MongoDB, JS, AngularJS, NFC Protocol
    - URL: http://bond.juicemobile.com
    - Note: Five-day pharmaceutical event with NFC bracelets
    - Images: 4 detail images

---

## MIGRATION STATISTICS

**Total Assets to Migrate:**
- 16 projects (15 main + 1 bonus)
- 16 thumbnail images (all .png)
- 15-16 main images (mostly .jpg, one .png)
- 35 detail images (various formats)
- 1 PDF document (Trackula wireframes)

**Image Count per Project:**
- 0 images: FireGuard (1 project)
- 1 image: Alchemetal, Shoot 'em Up, Sybaris, Wylde (4 projects)
- 2 images: TowIt, Trackula (2 projects)
- 3 images: Health is Cool, OPUS, Hollywood Tycoon, Geovin, YourScope (5 projects)
- 4 images: Nabob, Stouffville, Bond NFC (3 projects)
- 5 images: PhScale Outfitters (1 project)

---

## TECHNICAL CHALLENGES & CONSIDERATIONS

### Content Conversion
- **HTML to Markdown:** Descriptions contain HTML tags (`<br>`, `<strong>`, etc.) that need conversion
- **External URLs:** Some URLs may be dead/outdated (need validation)
- **PDF Assets:** Trackula PDF needs special handling

### Tag Mapping
Need to map capensis categories to astro-marcus tags:
- **services** → could map to tags
- **languages** → could map to technologies array
- **tools** → could map to technologies array

Suggested tag mapping:
- "Full Stack Development" → "programming", "web"
- "Graphic Design" → "design"
- "UI / UX" → "design"
- "Game Design" → "programming"
- "Apparel Design" → "design", "art"
- "Photography" → "photography"

### Image Optimization
- All images need to be copied from capensis structure
- Astro will handle optimization automatically
- Need to preserve aspect ratios
- Thumbnail vs main image strategy

### Order/Dating
- Capensis projects don't have explicit dates
- Need to establish chronological order (most are 2009-2014 era)
- Suggested order values: 100-1500 range to avoid conflicts with existing items

### Markdown Content Structure
For projects with multiple images, embed them in markdown content:
```markdown
---
frontmatter here
---

Project description paragraph.

![Image caption](../../assets/images/portfolio/project-slug/image1.jpg)

More description.

![Another image](../../assets/images/portfolio/project-slug/image2.jpg)
```

---

## RECOMMENDED MIGRATION APPROACH

### Phase 1: Preparation
1. Create `.dev/migration-mapping.json` to track project conversions
2. Validate all external URLs (check if still live)
3. Determine order values for each project (chronological)
4. Map categories/services to appropriate tags

### Phase 2: Asset Migration
1. Copy all images from `temp/capensis/static/img/projects/` to `src/assets/images/portfolio/[slug]/`
2. Copy Trackula PDF to appropriate location (maybe `public/projects/`)
3. Verify all images are valid and uncorrupted

### Phase 3: Content Creation
For each project:
1. Create new markdown file: `src/collections/portfolio/[slug].md`
2. Convert JSON data to YAML frontmatter
3. Convert HTML description to markdown
4. Embed 2-3 best images in markdown body
5. Set appropriate tags, technologies, order values
6. Add external links if applicable

### Phase 4: Testing
1. Build portfolio page and verify all projects render
2. Check lightbox functionality
3. Verify image optimization worked
4. Test tag filtering
5. Check for broken links

### Phase 5: Cleanup
1. Document what was migrated
2. Note any URLs that are dead
3. Archive capensis data

---

## PROPOSED TAG STRATEGY

**Assign these tags to capensis projects:**
- design (most projects)
- programming (TowIt, OPUS, FireGuard, SMU 2048, Hollywood Tycoon, Bond NFC)
- web (TowIt, OPUS, FireGuard, Sybaris, Wylde)
- 3d (Alchemetal, YourScope, Nabob, Motorfest)
- graphics (PhScale, Nabob, Geovin, Motorfest)
- case-study (optional for detailed projects)

**Projects by category:**
- **Design-heavy:** Alchemetal, PhScale, Nabob, Geovin, Motorfest
- **Development-heavy:** TowIt, OPUS, FireGuard, SMU 2048, Hollywood Tycoon, Bond NFC
- **Web projects:** TowIt, OPUS, Sybaris, Wylde, Trackula
- **Concept work:** Nabob, Alchemetal

---

## ESTIMATED ORDER VALUES

Suggest using 100-1500 range for these older projects:
- Stouffville Motorfest 2009: 100
- PhScale Outfitters: 200
- Geovin Furniture: 300
- Nabob Sustainable: 400
- YourScope SILO: 500
- Wylde About Health: 600
- Sybaris Analytics: 700
- Hollywood Tycoon: 800
- Trackula: 900
- Alchemetal: 1000
- Health is Cool 360: 1100
- Shoot 'em Up 2048: 1200
- OPUS: 1300
- FireGuard: 1400
- TowIt: 1500
- Bond NFC: 1550

This keeps them below existing portfolio items (which use 3000+) but maintains relative chronology.

---

## NOTES & OBSERVATIONS

### Strengths of Current System
- Type-safe schema prevents errors
- Automatic image optimization saves bandwidth
- Flexible grid system for visual variety
- Integrated tag/category system
- Good SEO structure

### Capensis Content Strengths
- Rich project descriptions with details
- Good variety of work (web, design, 3D, games)
- Professional client work and personal projects
- Good image documentation

### Migration Benefits
- Consolidates portfolio history in one place
- Modern image optimization for old assets
- Better SEO and discoverability
- Unified navigation and filtering
- Responsive, accessible design

### Potential Issues
- Some external URLs may be dead (10+ years old)
- Image quality varies (some may be low-res)
- HTML content may need significant reformatting
- Need to maintain photo credits (Ted Belton for PhScale)

---

## QUESTIONS FOR USER

1. **Project selection:** Migrate all 15 projects, or selective subset?
2. **Bonus project:** Include Bond NFC from backup file?
3. **Image count:** 2-3 images per project as requested, or include all available?
4. **Order values:** Use suggested 100-1500 range, or different scheme?
5. **Tags:** Approve suggested tag mapping, or prefer different categories?
6. **External URLs:** Keep URLs even if they're dead (archive.org could help), or remove?
7. **PDF handling:** How to handle Trackula PDF - link from portfolio item?
8. **contentType:** Use "simple" for all, or mark some as "case-study" or "external"?

---

## NEXT STEPS

After user approval:
1. Execute migration script/manual process
2. Create markdown files for each project
3. Copy and organize all images
4. Test build and rendering
5. Verify all links and images
6. Create final migration summary document

---

**END OF ANALYSIS**
