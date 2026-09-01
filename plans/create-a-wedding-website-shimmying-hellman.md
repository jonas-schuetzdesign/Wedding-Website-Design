# Wedding Website — Luca & Jonas

## Context

The user pasted a two-page Figma invitation (a cover with a gradient "orb" + monogram + "EINLADUNG", and an invitation body page) and asked for a matching **wedding website** that extends the invitation into a full, scrollable single page. It must reuse the invitation's colors, monogram/icons, and typography for stylistic consistency, prominently feature an **RSVP link**, include an **FAQ** section, and use an **expandable** layout while staying romantic, clean, and simple.

Confirmed with user: **RSVP is an external link** (not a live form), and **all copy stays in German** to match the invitation.

The project (`/workspaces/default/code`) is a blank Figma Make React 19 + Vite + Tailwind v4 scaffold — `src/App.tsx` is an empty div, no components, no `public/`, no fonts/icon libs. We build the page from scratch in-place.

### Design facts extracted from the Figma design (fileKey `Ekzymwc0vcT1Lb9uqGEz3r`)
- **Palette:** text/ink `#80848c` (cool slate), background white; hero orb is a radial gradient from warm coral/peach (~`#E8917D`) into cool blue-grey (~`#AEB4C4`). These become the accent range.
- **Typography (exact faces from `<figma_imported_fonts>`):**
  - `Bigilla` **Bold** — display serif for headings/couple names (private/imported font → must be resolved via CLI, see below).
  - `Inter` **Extra Light** (weight 200) — small body/caption text (public Google font).
- **Monogram/icon:** interlocking "L J" mark, delivered as SVGs (`b022f.svg`, `9f8f0.svg`). Gradient orb is `7e194.svg` (node 1:2).
- **Content:** "Gerne laden wir zu unserer Hochzeit ein." · Wann & Wo: "19.06. bis 20.06.2027 im Schloss Hünigen, Konolfingen" · "Anmeldung & Informationen" · deadline "Wir bitten um Anmeldung bis am 19.10.2026. Wir freuen uns auf euch!" · "Luca & Jonas".

## Approach

Build one responsive, vertically-scrolling wedding page in `src/App.tsx`, composed of small section components under `src/components/`. Keep it token-driven, hairline-bordered, generous whitespace — romantic but restrained, matching the invitation exactly.

### 1. Assets
Download the invitation SVGs into `public/assets/` and reference via `/assets/...`:
```
curl -L "https://www.figma.com/api/mcp/asset/04b8bd68-f9f8-45b0-9873-1469c4163bf6.zip" -o /tmp/figma-assets.zip \
  && unzip -o /tmp/figma-assets.zip 'assets/*' -d public
```
Also copy the already-extracted body-page assets (monogram `b022f.svg`/`9f8f0.svg`, orb) from `/tmp/figma-design-context/wedding/assets/` if the archive above lacks them. Use the monogram SVG as-is (do not redraw) for the header/footer mark and the orb SVG for the hero. Verify every referenced file is non-empty. **Do not** reuse the QR-code SVG (hundreds of nodes) — RSVP is a text link/button instead.

### 2. Fonts (`src/index.css`)
- **Inter Extra Light** (Google): add `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&display=swap');` as the **first** statement in `index.css`.
- **Bigilla Bold** (imported/private): resolve per the `<figma_imported_fonts>` manifest procedure — write `{"fonts":[{"family":"Bigilla","style":"Bold"},{"family":"Inter","style":"Extra Light"}]}` to a temp JSON and run:
  ```
  figma fonts resolve --input <file>.json --out-dir public/fonts
  ```
  For each resolved row add one `@font-face` under its `cssFamily` (`Bigilla:Bold`, `Inter:Extra Light`) using the CLI-returned path/format (strip `public` prefix → `/fonts/...`). If **Bigilla is blocked**, fall back to a romantic high-contrast Google serif (`Playfair Display` 700) declared under its own family name, and report the fallback to the user.
- Add Tailwind v4 `@theme` tokens in `index.css` for the palette (`--color-ink: #80848c`, background white, accent coral/blue-grey) and font families, so sections use utility classes rather than hardcoded hex.

### 3. Page sections (`src/components/`, imported into `App.tsx`)
Romantic, clean, expandable single-page layout:
1. **Header/nav** — small monogram mark + minimal anchor links (Übersicht · Wann & Wo · FAQ · Anmeldung), sticky, hairline bottom border.
2. **Hero** — the gradient orb SVG centered, monogram above, "Luca & Jonas" in Bigilla, date line, and "EINLADUNG"/"Gerne laden wir zu unserer Hochzeit ein." headline. Primary **Anmeldung** (RSVP) button links out.
3. **Wann & Wo** — date + venue (Schloss Hünigen, Konolfingen), small Inter Extra Light detail lines; optional two-day timeline (19.–20.06.2027).
4. **Anmeldung / RSVP** — prominent card with the deadline copy ("bis am 19.10.2026") and a clear RSVP link button (`<a href>` to a placeholder external URL, styled as primary CTA).
5. **FAQ** — accordion of expandable questions (Dresscode, Übernachtung, Anreise/Parkplatz, Geschenke, Kinder). Build with real React `useState` (single-open or multi-open), animated max-height/rotate-chevron, hairline dividers. This satisfies the "expandable layout" requirement.
6. **Footer** — monogram, "Wir freuen uns auf euch!", names, date.

### 4. Craft
- CSS Grid for page structure, Flex for internals; asymmetric where it reads well.
- One breakpoint ~1000px: stack multi-column regions, reduce hero scale on mobile.
- Subtle transitions on links/buttons/accordion; visible focus rings (`--ring`); AA contrast (note: `#80848c` on white is ~3:1 — use it for large display text only; use a darker slate e.g. `#5c606a` for small body copy to meet 4.5:1).
- Hide scrollbars by default. No unlayered `* {}` reset.

## Files
- `src/App.tsx` — assemble sections (replace empty div).
- `src/index.css` — font `@import`/`@font-face`, `@theme` tokens.
- `src/components/Header.tsx`, `Hero.tsx`, `WhenWhere.tsx`, `Rsvp.tsx`, `Faq.tsx`, `Footer.tsx` (+ small `Monogram.tsx` wrapper if reused).
- `public/assets/*.svg` (orb, monogram), `public/fonts/*` (Bigilla if resolved).

## Verification
- Run `figma fonts resolve` and confirm Bigilla status; report fallback if blocked.
- Confirm each referenced asset exists non-empty under `public/assets/` and no code points at expiring Figma URLs.
- Load the running dev preview (Vite on `$PORT`): verify hero orb + monogram render, fonts apply (Bigilla headings, Inter Extra Light captions), FAQ accordion expands/collapses, RSVP link is prominent and navigates, and layout reflows cleanly below ~1000px.
- Visually compare hero and invitation body against the Figma screenshots for color/type fidelity.
