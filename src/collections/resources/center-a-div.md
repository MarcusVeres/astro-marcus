---
title: "How to Center a DIV"
surTitle: "How to"
mainTitle: "Center a DIV"
description: "Learn the modern way to center content using Flexbox. No more margin hacks!"
icon: "document"
tags: ["technology", "web", "design"]
resourceType: "code-tutorial"
order: 50
pubDate: 2025-01-15
codepenUrl: "https://codepen.io/GI-IO5T/embed/yLMjypr?default-tab=html,result&theme-id=dark"
---

## The Flexbox Method

Centering a div has been a classic CSS challenge, but Flexbox makes it incredibly simple.

### Key Steps:

1. **Set the parent to `display: flex`**
   - This enables Flexbox layout on the container

2. **Center horizontally with `justify-content: center`**
   - Controls alignment along the main axis (horizontal by default)

3. **Center vertically with `align-items: center`**
   - Controls alignment along the cross axis (vertical by default)

4. **Optional: Set height to `100vh`**
   - Makes the container full viewport height
   - This demonstrates vertical centering clearly
   - You may not need this in your actual code

### Browser Support

Flexbox is supported in all modern browsers:
- ✅ Chrome, Edge, Firefox, Safari
- ✅ Mobile browsers (iOS Safari, Chrome Android)
- ⚠️ IE 11 has partial support (use prefixes)

### Common Use Cases

This technique works great for:
- Login forms
- Loading spinners
- Modal dialog content
- Hero section CTAs
- Card content alignment
