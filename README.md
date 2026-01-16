# Samzcutz — Premium Barber Landing Page

A production-ready, mobile-first experience for Samzcutz — the private chair of Samuel Diaz in Te Aro, Wellington. Built with Vite, React, TypeScript, and Tailwind CSS.

## Tech stack
- Vite + React 18 + TypeScript
- Tailwind CSS with custom luxury theme
- CSS-driven patterns & SVG placeholders (swap via `public/placeholders`)
- GitHub Actions workflow for automatic GitHub Pages deployments

## Getting started
```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Type-check or build for production
npm run typecheck
npm run build

# 4. Preview the production build locally
npm run preview
```

## Content management
- Copy, services, and structured data live in `src/data/siteContent.ts`. Update hero headlines, CTA links, services list, testimonials, gallery entries, and operating hours there.
- Booking availability now uses three structures inside `src/data/siteContent.ts`:
	- `bookingCatalog` defines each service ID, description, duration, and price (with numeric `durationMinutes` + `priceValue` so totals can be calculated). Flag add-ons with `serviceType: "addon"` to make them multi-selectable.
	- `bookingSchedule` controls which service IDs unlock per weekday and which time slots are visible.
	- `bookingSettings` handles CTA copy, contact info, booking window (default 21 days), and the submission endpoint.
- Tailwind theme tokens (colors, fonts, animations) sit in `tailwind.config.ts`.
- Global gradients, Greek motifs, and sticky CTA styling live in `src/index.css`.
- Replace SVG placeholders in `public/placeholders` and `public/og-image.svg` with final imagery once photography is ready.

### Booking webhook / email hand-off
- By default the form falls back to `mailto:hello@samzcutz.com`. To wire it up to a serverless function (Resend, AWS Lambda, Make, etc.) set an environment variable and restart Vite:

```bash
echo "VITE_BOOKING_WEBHOOK=https://your-webhook-endpoint" > .env.local
```

- The payload includes `preferredDate`, `preferredSlot`, `service`, `addOns`, `client`, `totals`, and `metadata` so automation can create calendar events or emails directly.
- Future enhancement: a small “Sammy admin” view can manipulate `bookingSchedule` through a UI instead of editing JSON—left on the roadmap.

## Deployment
- The workflow `.github/workflows/deploy-pages.yml` builds the site on pushes to `main` and publishes the `dist` folder to GitHub Pages.
- Ensure the repository's Pages settings target the `gh-pages` branch deployed by the workflow.
- `vite.config.ts` automatically switches the build `base` to `/<repo-name>/` whenever GitHub Actions sets `GITHUB_REPOSITORY`, so the bundled assets load correctly on Pages. Local `npm run dev` / `npm run build` stay rooted at `/`.
- Update `index.html` canonical + JSON-LD URLs once the production domain is confirmed.

## Accessibility & performance notes
- Semantic sections with descriptive aria labels for interactive controls.
- Focus indicators, high-contrast palette, reduced-motion friendly CSS animations.
- Lightweight dependencies (no UI frameworks beyond Tailwind) keep bundle size tight.
