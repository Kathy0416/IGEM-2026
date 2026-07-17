# Implementation Plan

[Overview]
Transform the iGEM 2026 website from a clean/minimal layout into a visually rich, interactive experience with 3D card effects on the team page and enhanced visual design across the entire site using CSS3, JavaScript (no libraries), and creative front-end techniques.

This implementation is needed to make the website feel more modern, engaging, and memorable — fitting for an iGEM competition entry. The site currently relies on flat design with basic hover effects and a straightforward card fan layout. We will bring it to life with 3D depth, micro-interactions, animated backgrounds, and bolder typography. All changes are pure CSS/JS with no external dependencies.

Scope covers:
1. **Team page (team.html)**: 3D tilt on cards, proper 3D fan arc with `translateZ`, enhanced hover effects, 3D spotlight area
2. **Shared CSS (style.css)**: Background textures/patterns, gradient text, glassmorphism, animated section dividers, enhanced scroll-reveal, noise overlays
3. **Shared JS (main.js)**: Mouse-tracking 3D tilt logic, enhanced scroll animations, magnetic button effect, interactive background particles
4. **index.html**: Enhanced hero with animated gradient mesh, bolder typography, staggered animations
5. **All individual pages**: Consistent design uplift applied through shared CSS/JS

[Types]
No new TypeScript or class-based types needed — this project uses vanilla JS with no type system.

Key data structures to add:

```javascript
// 3D Tilt state (per card, managed via JS closures/datasets)
{
  tiltX: number,    // degrees, -15 to 15
  tiltY: number,    // degrees, -15 to 15  
  glowX: number,    // px, mouse-relative highlight position
  glowY: number     // px, mouse-relative highlight position
}

// Particle system state
{
  particles: Array<{x, y, vx, vy, size, alpha, life}>,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  animFrame: number
}
```

CSS Custom Properties to add to `:root`:
```css
--glass-bg: rgba(255,255,255,0.06);
--glass-border: rgba(255,255,255,0.1);
--glass-shadow: 0 8px 32px rgba(0,0,0,0.3);
--mesh-gradient: ... (computed gradient);
--text-gradient: linear-gradient(135deg, var(--white), var(--red));
```

[Files]
Seven existing files will be modified, zero new files needed.

- **`index.html`** — MODIFY:
  - Replace static hero background with animated CSS mesh gradient
  - Add staggered animation delays to story paragraphs
  - Add circuit-board SVG pattern overlay in transition section
  - Wrap page sections with enhanced reveal containers
  - No new structural HTML, only class additions

- **`team.html`** — MODIFY:
  - Add `data-tilt` attribute to `.playing-card` elements (handled by JS)
  - No structural changes needed — all 3D effects applied via JS/CSS

- **`css/style.css`** — MODIFY (major additions):
  - Add animated mesh gradient keyframes and class for hero
  - Add `.text-gradient` utility class
  - Add `.glass` utility class (backdrop-filter, border, shadow)
  - Add circuit-board SVG pattern via `background-image`
  - Add noise texture overlay via `::after` pseudo-element
  - Add animated wave divider between sections
  - Add 3D card tilt styles (`.playing-card[data-tilt]`)
  - Add card glow overlay styles
  - Enhanced hover: `.playing-card:hover` with 3D shadow and border glow
  - Add particle canvas styling (fixed, pointer-events: none)
  - Add magnetic button animation styles
  - Enhanced `.reveal` with staggered children support
  - Add gradient text animation keyframes
  - Add glassmorphism card variant (`.glass-card`)
  - Add smooth section transition overlays

- **`js/main.js`** — MODIFY (major additions):
  - Add particle background system (canvas-based, ~50 particles)
  - Add 3D mouse-tracking tilt function (`enableTilt(element)`)
  - Update `renderHand()` to apply 3D `translateZ` in fan arc
  - Add card glow effect that follows mouse on hover
  - Add magnetic button effect for poker controls
  - Enhanced `IntersectionObserver` with staggered item animations
  - Add smooth parallax on spotlight avatar
  - Add gradient text animation trigger

- **`problem.html`** — MODIFY: Minor class additions for enhanced styling
- **`results.html`** — MODIFY: Minor class additions for enhanced styling  
- **`solution.html`** — MODIFY: Minor class additions for enhanced styling
- **`hp.html`** — MODIFY: Minor class additions for enhanced styling

[Functions]
All existing functions preserved with modifications.

**Modified functions in `js/main.js`:**

1. `renderHand()` — lines 135-224
   - Add `translateZ((1 - Math.abs(norm)) * 30)` to each card's transform string for 3D depth
   - Apply `data-tilt` attribute to each `.playing-card` div
   - Add glass effect class to poker table background

2. `flipCard(id)` — lines 228-236
   - Add 3D rotation axis variation on flip (slight Y-axis rotation offset)
   - Trigger card glow animation on flip

3. `showSpotlight(id)` — lines 253-265
   - Add staggered fade-in for spotlight children (name → role → bio)
   - Add subtle 3D perspective shift to spotlight avatar on entry

4. `shuffleDeck()` — lines 268-286
   - Enhance shuffle animation with 3D rotation during shuffle
   - Cards flip through Z-space during animation

5. `drawRandomCard()` — lines 289-297
   - Add visual "deck cut" animation before drawing
   - Selected card rises in Z-space before flipping

**New functions in `js/main.js`:**

6. `initParticles()` — Creates a fixed canvas element, spawns ~50 floating particles with varying sizes/speeds using `requestAnimationFrame`. Particles are subtle: white/red-tinted dots at ~0.1-0.3 opacity that drift slowly upward.

7. `enableTilt(el)` — Attaches mousemove listener to element. Calculates cursor position relative to element center, computes `rotateX` and `rotateY` values (clamped to ±15°), applies via `style.transform`. Also computes a radial gradient position for a glossy highlight overlay. On mouseleave, smoothly resets to 0° with CSS transition.

8. `applyMagneticEffect(el)` — Attaches mousemove listener. When cursor is within 100px of button center, applies `translateX/Y` offset pulling button slightly toward cursor (max 8px). Smooth lerp animation.

9. `enhancedReveal()` — Upgrades the existing IntersectionObserver to support staggered children: if `.reveal` contains child elements with `.reveal-item`, they animate in sequence with increasing `transition-delay` based on their index.

10. `animateGradientText()` — Adds a `data-gradient` attribute observer that triggers a shimmer animation on text elements (used for hero titles and section headings).

**Removed functions:** None.

[Classes]
No classes — all code uses function-based patterns within an IIFE.

CSS class additions in `style.css`:
- `.mesh-bg` / `.mesh-bg-animated` — animated gradient mesh background
- `.text-gradient` — gradient text fill
- `.glass` — glassmorphism panel
- `.glass-card` — glass card variant
- `.noise-overlay` — subtle grain texture overlay
- `.wave-divider` — animated SVG wave section separator
- `.particle-canvas` — fixed fullscreen particle canvas
- `.card-glow` — glossy highlight overlay on cards
- `.tilt-3d` — 3D tilt container
- `.magnetic-btn` — magnetic pull button
- `.reveal-stagger` — container for staggered reveal children
- `.reveal-item` — individual staggered item
- `.reveal-item:nth-child(n)` — nth-child delay rules
- `.spotlight-3d` — 3D perspective container for spotlight

[Dependencies]
No new external dependencies. All effects are pure CSS and vanilla JS.

The project uses:
- Google Fonts Inter + Montserrat (already loaded)
- DiceBear avatars (already used)
- No build tools, no npm, no frameworks

No changes to dependency files.

[Testing]
Manual visual testing approach:
1. Open `team.html` in browser, hover over each card — verify smooth 3D tilt (max ±15°) and glossy highlight follows cursor
2. Click cards — verify flip animation works with new 3D rotation
3. Click "Shuffle Deck" — verify enhanced 3D shuffle animation
4. Click "Draw a Card" — verify deck-cut animation + card rises in Z
5. Open `index.html` — verify animated mesh hero background loads, particle canvas appears, text has gradient shimmer
6. Verify all pages — scroll-reveal animations work with staggered timing
7. Verify mobile responsiveness — cards stack properly, 3D tilt degrades gracefully on touch devices (no mousemove)
8. Verify no console errors, no performance issues (particles limited to 50, requestAnimationFrame uses cleanup)

Testing notes:
- On touch devices, 3D tilt is disabled (no mousemove), cards use static rotation from fan layout only
- Particles pause when tab is not visible (visibilitychange listener)
- All effects should work in Chrome, Firefox, Safari (last 2 versions)

[Implementation Order]
Implementation should follow this sequence to minimize conflicts:

1. **`css/style.css` — Foundation**: Add CSS variables, utility classes (.glass, .text-gradient, .noise-overlay), mesh gradient keyframes, wave divider, and enhanced reveal classes. This ensures the visual foundations exist before JS adds interactivity.

2. **`js/main.js` — Visual Effects**: Add particle system (`initParticles`), enhanced scroll-reveal (`enhancedReveal`), and gradient text animation. These are non-breaking additions that enhance the existing page feel.

3. **`js/main.js` — 3D Card System**: Add `enableTilt`, update `renderHand()` with 3D fan arc (translateZ), add card glow, magnetic button effect, and enhanced shuffle/draw animations.

4. **`css/style.css` — Card & Button 3D Styles**: Add tilt-related CSS (perspective, transform-style, glow overlays), magnetic button styles, card hover 3D shadows.

5. **`team.html` — Markup adjustments**: Verify data attributes, add any needed wrapper classes.

6. **`index.html` — Hero enhancement**: Replace static hero background with mesh gradient class, add staggered animation classes to story sections, add particle canvas container.

7. **`problem.html`, `results.html`, `solution.html`, `hp.html`** — Minor class additions for consistent styling uplift.

8. **Cross-browser testing and polish**: Verify on Chrome/Firefox/Safari, adjust timing, fix any edge cases.
