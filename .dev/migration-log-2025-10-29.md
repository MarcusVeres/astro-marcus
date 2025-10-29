# Capensis Portfolio Migration Log
**Date:** 2025-10-29
**Branch:** migrate-capensis-projects
**Status:** COMPLETED

---

## SUMMARY

Successfully migrated 15 portfolio projects from the legacy Capensis portfolio (Flask + AngularJS) to the new astro-marcus portfolio (Astro + Content Collections).

**Migration Stats:**
- 15 new markdown files created
- 15 project image directories copied
- 50+ images migrated (thumbnails, main images, and detail images)
- 1 PDF document migrated
- 0 existing files modified (safe rollback possible)

---

## FILES CREATED

### Markdown Files (15 total)
Location: `src/collections/portfolio/`

1. `stouffville-motorfest-2009.md` (order: 1600)
2. `ph-scale-outfitters.md` (order: 1601)
3. `geovin-furniture.md` (order: 1602)
4. `nabob-sustainable.md` (order: 1603)
5. `yourscope-silo.md` (order: 1604)
6. `wylde-about-health.md` (order: 1605)
7. `sybaris-analytics.md` (order: 1606)
8. `social-game-universe.md` (order: 1607)
9. `trackula.md` (order: 1608)
10. `alchemetal.md` (order: 1609)
11. `health-is-cool-360.md` (order: 1610)
12. `smu-2048.md` (order: 1611)
13. `opus.md` (order: 1612)
14. `fireguard.md` (order: 1613)
15. `towit.md` (order: 1614)

### Image Directories (15 total)
Location: `src/assets/images/portfolio/`

Each directory contains:
- `thumbnail.png` - Grid thumbnail
- `main.jpg` (or `main.png` for stouffville) - Hero image
- `images/` subdirectory with 0-5 detail images

1. `stouffville-motorfest-2009/` - 4 detail images
2. `ph-scale-outfitters/` - 5 detail images
3. `geovin-furniture/` - 3 detail images
4. `nabob-sustainable/` - 4 detail images
5. `yourscope-silo/` - 3 detail images
6. `wylde-about-health/` - 1 detail image
7. `sybaris-analytics/` - 1 detail image
8. `social-game-universe/` - 3 detail images
9. `trackula/` - 2 detail images
10. `alchemetal/` - 1 detail image
11. `health-is-cool-360/` - 3 detail images
12. `smu-2048/` - 1 detail image
13. `opus/` - 3 detail images
14. `fireguard/` - 0 detail images
15. `towit/` - 2 detail images

**Total detail images:** 36 images

### PDF Documents
Location: `public/projects/`

- `trackula-wireframes.pdf` - Wireframe documentation for Trackula project

### Directory Created
- `public/projects/` - New directory for project-related documents

---

## PROJECT DETAILS

### 1. Stouffville Motorfest 2009 (order: 1600)
- **File:** stouffville-motorfest-2009.md
- **Tags:** design, graphics, photography
- **Tech:** Photoshop, Illustrator, 3D Studio Max
- **Images:** 4 (design-package.jpg, event-map.jpg, event-tickets.jpg, tickets-and-brochures.jpg)
- **Date:** 2009-06-01
- **Client:** (none)

### 2. PhScale Outfitters Season 1 (order: 1601)
- **File:** ph-scale-outfitters.md
- **Tags:** design, art, graphics
- **Tech:** Adobe Illustrator
- **Images:** 5 (collection.jpg, shirt-crown.jpg, shirt-headphones.jpg, shirt-kiss.jpg, shirt-mic.jpg)
- **Date:** 2010-03-01
- **Client:** PhScale Outfitters
- **Note:** Photo credit: Ted Belton Photography

### 3. Geovin Furniture Catalogue (order: 1602)
- **File:** geovin-furniture.md
- **Tags:** design, graphics
- **Tech:** Photoshop, Illustrator, InDesign
- **Images:** 3 (spread-sample-1.jpg, spread-sample-2.jpg, spread-sample-3.jpg)
- **Date:** 2010-09-01
- **Client:** Geovin Furniture

### 4. Nabob Sustainable Packaging (order: 1603)
- **File:** nabob-sustainable.md
- **Tags:** design, 3d, graphics
- **Tech:** Photoshop, Illustrator
- **Images:** 4 (barrels-red.jpg, barrels-1.jpg, barrels-2.jpg, barrels-white.jpg)
- **Date:** 2011-02-01
- **Client:** Concept Piece

### 5. YourScope Marketing Package (order: 1604)
- **File:** yourscope-silo.md
- **Tags:** design, 3d, graphics
- **Tech:** Photoshop, Illustrator, 3D Studio Max
- **Images:** 3 (bookmarks.jpg, business-cards.jpg, shirts.jpg)
- **Date:** 2011-06-01
- **Client:** YourScope

### 6. Wylde About Health (order: 1605)
- **File:** wylde-about-health.md
- **Tags:** design, web, programming
- **Tech:** PHP, CSS, HTML, Photoshop, Illustrator
- **Images:** 1 (halfpage-ad.png)
- **Date:** 2011-10-01
- **Client:** Sybaris Analytics
- **Note:** Website for Bryce Wylde, Dr. Oz show guest expert

### 7. Sybaris Corporate (order: 1606)
- **File:** sybaris-analytics.md
- **Tags:** design, web, programming, 3d
- **Tech:** PHP, CSS, HTML, Photoshop, Illustrator, 3D Studio Max
- **Images:** 1 (site-sample.jpg)
- **Date:** 2012-01-01
- **Client:** Sybaris Analytics

### 8. Hollywood Tycoon (order: 1607)
- **File:** social-game-universe.md
- **Tags:** design, programming
- **Tech:** ActionScript, XML, Flash, Photoshop, Illustrator
- **Images:** 3 (in-game.jpg, menu-screenshot-01.jpg, menu-screenshot-02.jpg)
- **Date:** 2012-06-01
- **Client:** Social Game Universe
- **Note:** Featured on Facebook, praised as "one of the best casual tycoon games"

### 9. Trackula (order: 1608)
- **File:** trackula.md
- **Tags:** design
- **Tech:** Illustrator, Balsamiq
- **Images:** 2 (screenshot-1.png, screenshot-2.png)
- **Date:** 2012-09-01
- **Client:** Simon Yates
- **PDF:** trackula-wireframes.pdf (linked in frontmatter)

### 10. Alchemetal (order: 1609)
- **File:** alchemetal.md
- **Tags:** design, 3d, art
- **Tech:** Photoshop, Illustrator, 3D Studio Max
- **Images:** 1 (promotional-poster.jpg)
- **Date:** 2012-11-01
- **Client:** In-House

### 11. Health is Cool 360 (order: 1610)
- **File:** health-is-cool-360.md
- **Tags:** design, programming
- **Tech:** ActionScript 3.0, Adobe Flash, Illustrator
- **Images:** 3 (app-screenshot-1.jpg, app-screenshot-2.jpg, e-brochure.jpg)
- **Date:** 2013-03-01
- **Client:** Novis Health

### 12. Shoot 'em Up 2048 (order: 1611)
- **File:** smu-2048.md
- **Tags:** design, programming
- **Tech:** JavaScript, CSS, HTML Canvas
- **Images:** 1 (action-shot.png)
- **Date:** 2013-09-01
- **Client:** Self-Directed

### 13. OPUS (order: 1612)
- **File:** opus.md
- **Tags:** design, programming, web
- **Tech:** PHP, CodeIgniter, HTML, CSS, JavaScript, Git
- **Images:** 3 (calendar.png, tasks.png, notes.png)
- **Date:** 2014-02-01
- **Client:** Self-Directed

### 14. FireGuard (order: 1613)
- **File:** fireguard.md
- **Tags:** design, programming, web
- **Tech:** Python, JavaScript, HTML, Angular, Bootstrap
- **Images:** 0 (only thumbnail and main image)
- **Date:** 2014-06-01
- **Client:** Self-Directed

### 15. TowIt (order: 1614)
- **File:** towit.md
- **Tags:** design, programming, web
- **Tech:** HTML, CSS, JavaScript, AngularJS, Ionic, Android Studio, Photoshop
- **Images:** 2 (android-store.png, instagram.png)
- **Date:** 2014-10-01
- **Client:** TowIt

---

## MIGRATION DECISIONS

### Order Values
Used range 1600-1614 to keep legacy projects grouped together and chronologically sorted, below current portfolio items (which use 3000+ range).

### Tag Mapping Strategy
Mapped Capensis categories to astro-marcus tags:
- "Full Stack Development" → `programming`, `web`
- "Graphic Design" → `design`
- "UI / UX" → `design`
- "Apparel Design" → `design`, `art`
- "Game Design" → `programming`
- "3D work" → `3d`
- "Photography" → `photography`

### Content Conversion
- HTML `<br>` tags → markdown paragraphs
- HTML `<a>` links → markdown links
- HTML text → plain markdown text
- Preserved quotes and special formatting

### External URLs
As requested, all external URLs from the original data were dropped (not included in frontmatter or content).

### Image Strategy
- Used ALL available images as requested
- Main image → frontmatter `image` field
- All detail images → embedded in markdown content with descriptive alt text
- Thumbnail images preserved in source directories

### Date Estimation
Assigned estimated publication dates based on project chronology and context clues (2009-2014 range).

---

## TECHNICAL NOTES

### Content Collections Schema Compliance
All markdown files follow the existing astro-marcus schema:
```yaml
title: string (required)
description: string (required)
image: image path (required)
tags: array of strings
contentType: "simple"
order: number (1600-1614)
gridSpan: "default"
aspectRatio: "golden"
pubDate: date
client: string (optional)
technologies: array of strings
links: array (only for Trackula PDF)
```

### Image Paths
All images use Astro's `@images` alias:
```markdown
image: "@images/portfolio/project-slug/main.jpg"
```

Embedded images use relative paths:
```markdown
![Alt text](../../assets/images/portfolio/project-slug/images/image.jpg)
```

### Astro Image Optimization
All images will be automatically optimized by Astro:
- Converted to WebP format
- Multiple responsive sizes generated
- Lazy loading applied
- `srcset` attributes added

---

## WHAT WAS NOT MIGRATED

- **Bond NFC project** - User is working on it separately
- **Photography section** - Only projects were migrated
- **Code samples** - Only projects were migrated
- **External URLs** - Dropped as requested (10+ years old, likely dead)

---

## ROLLBACK INSTRUCTIONS

To undo this migration:

```bash
# Switch back to main branch
git checkout main

# Delete the migration branch
git branch -D migrate-capensis-projects
```

All changes are isolated to the migration branch. No existing files were modified.

---

## NEXT STEPS

1. **Build test:** Run `npm run build` to verify schema compliance
2. **Visual check:** Run dev server and verify all projects render correctly
3. **Image check:** Verify all images load and display properly
4. **Tag filtering:** Test that tag filters work correctly
5. **Lightbox test:** Verify lightbox navigation works with new projects
6. **PDF link:** Verify Trackula PDF link works
7. **Review:** Review projects on portfolio page
8. **Merge:** If satisfied, merge to main branch

---

## VERIFICATION CHECKLIST

- [x] All 15 markdown files created
- [x] All image directories copied
- [x] Trackula PDF copied and linked
- [x] Order values set (1600-1614)
- [x] Tags applied appropriately
- [x] Technologies documented
- [x] Client names included where applicable
- [x] Image references use correct paths
- [x] Content converted from HTML to Markdown
- [x] No existing files modified
- [ ] Build test passed
- [ ] Visual verification complete
- [ ] All images display correctly
- [ ] Tag filtering works
- [ ] Lightbox works with new items

---

**MIGRATION COMPLETE**
**Safe to review and merge when ready**
