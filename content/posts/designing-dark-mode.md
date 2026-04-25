---
title: "Designing Dark Mode That Actually Looks Good (write by AI)"
date: "2026-03-28"
excerpt: "A deep dive into the nuances of dark mode design — why simply inverting colors doesn't work and how to create dark themes that feel intentional."
tags: ["Design", "CSS", "Dark Mode", "UI/UX"]
---

## The Problem with Most Dark Modes

Most dark modes are just... inverted light modes. White becomes black, black becomes white, and everything looks harsh and uncomfortable. A good dark mode requires **completely rethinking your color system**.

### The Cardinal Sins of Dark Mode

1. **Pure black backgrounds** — `#000000` creates too much contrast with white text
2. **Desaturated colors** — Colors that look great on white look neon on dark backgrounds
3. **Ignoring elevation** — Surfaces need subtle differentiation in dark mode too
4. **Forgetting about shadows** — Shadows don't work on dark backgrounds

## Building a Proper Dark Palette

Here's the approach I use:

```css
:root {
  /* Light - warm and inviting */
  --background: #fafafa;
  --foreground: #0a0a0a;
  --surface: #f4f4f5;
  --border: #e4e4e7;
  --accent: #ec4899;
}

.dark {
  /* Dark - not pure black, slightly warm */
  --background: #050505;
  --foreground: #fafafa;
  --surface: #18181b;
  --border: #27272a;
  --accent: #f472b6;
}
```

Notice the accent color shifts slightly between modes. On dark backgrounds, a lighter, softer pink reads better than the full saturation version.

### The Elevation System

In dark mode, elevation is communicated through subtle lightening:

```css
.surface-base { background: var(--background); }
.surface-raised { background: var(--surface); }
.surface-overlay { background: #27272a; }
```

Each level adds just enough contrast to create depth without being obvious.

## Text and Readability

<div class="callout">
  <strong>Key Insight:</strong> Never use pure white (#ffffff) for body text on dark backgrounds. Use a slightly dimmed white (like #e4e4e7 or #fafafa) to reduce eye strain.
</div>

### Contrast Ratios

WCAG guidelines still apply in dark mode. But the *feeling* of good contrast is different. Aim for:
- **Headings**: Higher contrast — closer to white
- **Body text**: Medium contrast — slightly dimmed
- **Muted text**: Lower contrast — but still readable
- **Disabled text**: Low contrast — clearly inactive

## Motion and Atmosphere

Dark mode is an opportunity to add subtle atmospheric effects:

- **Grain overlays** — Add texture to prevent banding on dark gradients
- **Glow effects** — Accent colors can emit subtle light
- **Transparency** — Frosted glass effects look stunning on dark backgrounds

## Conclusion

A dark mode worth shipping takes as much design effort as the light mode. Don't treat it as an afterthought. Your users who prefer dark mode deserve the same level of care and intentionality.

> Dark mode isn't just a color scheme — it's an atmosphere.
