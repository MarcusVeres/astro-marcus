# Portfolio Grid Audit & Mapping

**Date:** 2025-10-17
**Purpose:** Map hardcoded grid items to markdown files for migration

---

## Grid Item Mapping

### Current Grid (portfolio.astro lines 71-148)

| Order | Filename | Image Path | Grid Classes | Aspect | Special | Status |
|-------|----------|------------|--------------|--------|---------|--------|
| 0 | *TITLE CARD* | N/A | `col-span-2 sm:col-span-3 md:col-span-2` | N/A | Portfolio title | ✅ Not a portfolio item |
| 1 | pine.md | `/images/portfolio/pine.jpg` | `md:col-start-3 aspect-golden` | golden | Precise col-start | ✅ File exists |
| 2 | cardinal.md | `/images/portfolio/cardinal.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 3 | grandpa.md | `/images/portfolio/grandpa.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 4 | lamp.md | `/images/portfolio/lamp.jpg` | `row-span-2` | default | Tall | ✅ File exists |
| 5 | knob.md | `/images/portfolio/knob.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 6 | fence.md | `/images/portfolio/fence.jpg` | `row-span-2` | default | Tall | ✅ File exists |
| 7 | trunk.md | `/images/portfolio/trunk.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 8 | pipes.md | `/images/portfolio/pipes.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 9 | flowers.md | `/images/portfolio/flowers.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 10 | knife-case-study.md | `/images/portfolio/knife.jpg` | `md:col-span-2` | default | Wide + text overlay | ✅ File exists |
| 11 | tunnel.md | `/images/portfolio/tunnel.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 12 | streetlight.md | `/images/portfolio/streetlight.jpg` | `row-span-2` | default | Tall | ✅ File exists |
| 13 | wall.md | `/images/portfolio/wall.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 14 | spade.md | `/images/portfolio/spade.jpg` | `row-span-2` | default | Tall | ✅ File exists |
| 15 | miki.md | `/images/portfolio/miki.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 16 | glow.md | `/images/portfolio/glow.jpg` | `aspect-golden` | golden | | ✅ File exists |
| 17 | shatters.md | `/images/portfolio/shatters.jpg` | `aspect-golden` | golden | | ✅ File exists |

**Total Grid Items:** 17 portfolio items + 1 title card = 18 elements

---

## Existing Markdown Files (21 files)

Files that exist but are **NOT** in the current grid:
- `bark.md` - Not currently displayed
- `engine.md` - Not currently displayed
- `motor.md` - Not currently displayed
- `splinters.md` - Not currently displayed

**Decision:** These files can be added later with `order: 18+` when ready to expand the portfolio.

---

## Frontmatter Requirements by Item

### 1. pine.md
```yaml
order: 1
gridSpan: "default"
aspectRatio: "golden"
gridPosition: "md:col-start-3"
category: ["photography", "nature"]  # Already exists
```

### 2. cardinal.md
```yaml
order: 2
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "nature"]  # Needs to be added
```

### 3. grandpa.md
```yaml
order: 3
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "portrait"]  # Needs to be added
```

### 4. lamp.md (TALL)
```yaml
order: 4
gridSpan: "row-span-2"
aspectRatio: "default"
category: ["photography", "architecture"]  # Needs to be added
```

### 5. knob.md
```yaml
order: 5
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "details"]  # Needs to be added
```

### 6. fence.md (TALL)
```yaml
order: 6
gridSpan: "row-span-2"
aspectRatio: "default"
category: ["photography", "architecture"]  # Needs to be added
```

### 7. trunk.md
```yaml
order: 7
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "nature"]  # Needs to be added
```

### 8. pipes.md
```yaml
order: 8
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "industrial"]  # Needs to be added
```

### 9. flowers.md
```yaml
order: 9
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "nature"]  # Needs to be added
```

### 10. knife-case-study.md (WIDE + OVERLAY)
```yaml
order: 10
gridSpan: "md:col-span-2"
aspectRatio: "default"
showOverlay: true
category: ["design", "3d", "case-study"]  # Already exists
contentType: "case-study"  # Already exists
```

### 11. tunnel.md
```yaml
order: 11
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "architecture"]  # Needs to be added
```

### 12. streetlight.md (TALL)
```yaml
order: 12
gridSpan: "row-span-2"
aspectRatio: "default"
category: ["photography", "urban"]  # Needs to be added
```

### 13. wall.md
```yaml
order: 13
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "texture"]  # Needs to be added
```

### 14. spade.md (TALL)
```yaml
order: 14
gridSpan: "row-span-2"
aspectRatio: "default"
category: ["photography", "tools"]  # Needs to be added
```

### 15. miki.md
```yaml
order: 15
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "portrait"]  # Needs to be added
```

### 16. glow.md
```yaml
order: 16
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "abstract"]  # Needs to be added
```

### 17. shatters.md
```yaml
order: 17
gridSpan: "default"
aspectRatio: "golden"
category: ["photography", "texture"]  # Needs to be added
```

---

## Pattern Summary

### Grid Spans Distribution
- **Default (no span):** 13 items
- **row-span-2 (tall):** 4 items (lamp, fence, streetlight, spade)
- **md:col-span-2 (wide):** 1 item (knife)

### Aspect Ratios Distribution
- **golden:** 13 items
- **default:** 4 items (all tall items + knife)

### Special Cases
- **Precise positioning:** 1 item (pine with `md:col-start-3`)
- **Text overlay:** 1 item (knife with case study text)

---

## Category Suggestions

Based on visual analysis, suggested categories:

### Photography Subcategories
- **nature:** pine, flowers, trunk
- **portrait:** grandpa, miki
- **architecture:** lamp, fence, tunnel
- **urban:** streetlight
- **industrial:** pipes
- **texture:** wall, shatters
- **abstract:** glow
- **details:** knob
- **tools:** spade

### Design Categories
- **3d:** knife
- **case-study:** knife

### Mixed Categories (for filtering)
Most items will have:
- Primary: `"photography"`
- Secondary: specific subcategory
- Example: `["photography", "nature"]`

---

## Implementation Strategy

### Step 1: Batch Update Files
Update all 17 files with new frontmatter fields in one pass:
1. Open each file
2. Add `order`, `gridSpan`, `aspectRatio`
3. Add/update `category` array
4. Add special fields (`gridPosition`, `showOverlay`) where needed

### Step 2: Validation
After updates, verify:
- All 17 files have `order` (1-17)
- All have `gridSpan` and `aspectRatio`
- All have `category` array
- Special cases handled (pine position, knife overlay)

### Step 3: Build Grid
Create dynamic grid in portfolio.astro using these fields

---

## Next Actions

1. ✅ Audit complete - All 17 grid items have corresponding markdown files
2. ⏭️ Update frontmatter for all 17 files
3. ⏭️ Build dynamic grid system
4. ⏭️ Visual comparison test

---

**Status:** Audit complete - ready to proceed with frontmatter updates
