# Context

The wedding website for Luca & Jonas is fully built. The Hero section works but is relatively static — it has a floating orb and staggered `rise` fade-ins, but lacks motion depth. The request is to make the Hero more dynamic with more animation while keeping the romantic, minimalist aesthetic.

---

## Goal

Replace the current `src/components/Hero.tsx` with a richer, animated Hero that feels alive without being loud. All other sections stay untouched.

---

## Approach

### 1. Scroll-driven parallax layers
Use a `useEffect` + `window.scroll` listener (or the native CSS `animation-timeline: scroll()` — but Safari support is patchy, so JS is safer) to move Hero elements at different rates as the user scrolls:
- The gradient orb drifts upward faster than the text.
- The decorative "EINLADUNG" wordmark drifts down (counter-scroll) and fades.
- The main copy block moves up slowly.

### 2. Richer entrance sequence
Replace simple inline `animation` strings with a CSS class-based reveal that fires once the component mounts. Add a brief `useEffect` that toggles an `is-visible` class on the section root, then CSS does the staggered work:
- Orb: scale from 0.7 → 1 + opacity, with a springy `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-ish).
- Eyebrow: letter-spacing collapses from wide → normal while fading in (text-reveal feel).
- H1 lines: masked clip reveal (clip-path `inset(0 100% 0 0)` → `inset(0 0% 0 0)`) per line, staggered.
- Names "Luca & Jonas": scale up from 0.85.
- CTA buttons: slide up + fade.

### 3. Continuously animated ambient background
Replace the static two-layer orb with three overlapping radial gradient orbs that each run on independent `drift`-variant keyframes (different durations, slightly different translation arcs, eased differently). This creates an organic, breathing background.

### 4. Floating petals / particles (pure CSS, no library)
Add 6–8 absolutely-positioned small `<span>` elements styled as soft coral/mist ellipses, each with its own `float-petal` keyframe that drifts upward and sways horizontally. They're very low opacity (0.12–0.2) so they read as atmospheric, not distracting. No JS required — pure CSS `@keyframes` with varied `animation-duration` and `animation-delay`.

### 5. Monogram subtle pulse
Add a gentle `pulse-glow` keyframe on the SVG monogram: the coral fill oscillates between `--color-coral` and `--color-coral-deep`, and a soft drop-shadow pulsates. Duration: 4 s infinite ease-in-out.

---

## Files to modify

| File | Change |
|------|--------|
| `src/components/Hero.tsx` | Full rewrite of the component (same props interface `{ rsvpUrl: string }`) |
| `src/index.css` | Add new keyframes: `clip-reveal`, `float-petal`, `pulse-glow`, `orb-drift-b`, `orb-drift-c`; add `.is-visible` state class styles |

No new dependencies — everything is pure CSS + React 19 hooks.

---

## Implementation detail: clip-path text reveal

```css
@keyframes clip-reveal {
  from { clip-path: inset(0 100% 0 0); opacity: 0.2; }
  to   { clip-path: inset(0 0%   0 0); opacity: 1;   }
}
```
Each H1 line is wrapped in a `<span class="block overflow-hidden">` with an inner `<span>` that runs `clip-reveal`. This gives a left-to-right wipe effect per line.

## Implementation detail: parallax

```ts
useEffect(() => {
  const onScroll = () => {
    const y = window.scrollY;
    orbRef.current.style.transform = `translateY(${-y * 0.25}px)`;
    wordmarkRef.current.style.transform = `translateY(${y * 0.15}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

---

## Verification

1. Open the preview URL — the Hero should load with a staggered entrance sequence.
2. Scroll slowly — orb drifts up, wordmark drifts down.
3. The petals should be faintly visible, floating upward.
4. On mobile widths (320 px) nothing should overflow — petals are `pointer-events-none overflow-hidden` on the section.
5. TypeScript: `pnpm tsc --noEmit` must pass.
