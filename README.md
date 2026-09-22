# Two Minds Academy

A responsive academy website built with Next.js 16 and React 19. The brand direction and content principles live in DESIGN.md.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run lint` and `npm run build` to validate. Run `npm start` to serve the production build.

## Content and interactions

- Two disciplines: development and cybersecurity.
- Subject-first course chooser: Development or Cybersecurity, with four plainly named courses in each and curriculum previews.
- University course and project support.
- Native accessible dialogs, keyboard dismissal, mobile navigation, FAQ disclosures, and reduced-motion support.
- Original Two Minds wordmark and locally hosted Neue Machina fonts reused from the agency project.
- Custom procedural SVG artwork; no external image or font requests.

## Contact and motion

Visitors can call or open WhatsApp directly:

- Omar Abi Farraj: +96171387946
- Nassir Ghraizi: +96181670536

Course-specific WhatsApp links include the selected course and learning stage. Visitors review and send the message in WhatsApp themselves. No account, email form, or backend is required.

GSAP and @gsap/react handle staggered hero entrances, scroll-linked sculpture rotation, section reveals, and course changes. Animations use scoped cleanup, respect prefers-reduced-motion, and refresh after layout changes. The mobile layout includes persistent course/contact actions and safe-area spacing.

## Launch

Intended domain: https://academy.twomindsengine.com. Canonical metadata, robots.txt, and sitemap.xml use that domain. Hosting and DNS have not been changed.

Before publishing, confirm the curriculum, delivery formats, schedules, fees, and contact numbers. These details are deliberately enquiry-based rather than advertised as fixed offers. Confirm the agency's existing font license covers the academy site. WhatsApp links rely on the supplied numbers being registered with WhatsApp; phone links provide a direct-call alternative.

## Main files

- app/academy.tsx: content, learning paths, interactions, and contact links.
- app/globals.css: visual system and responsive layouts.
- app/layout.tsx: local fonts and page metadata.
- DESIGN.md: visual direction and design constraints.
