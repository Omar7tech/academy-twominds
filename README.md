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
- Four starting points, each with two tailored learning paths and curriculum previews.
- University course and project support.
- Native accessible dialogs, keyboard dismissal, mobile navigation, FAQ disclosures, and reduced-motion support.
- Original Two Minds wordmark and locally hosted Neue Machina fonts reused from the agency project.
- Custom procedural SVG artwork; no external image or font requests.

## Enquiries

The form validates the visitor's name and email, then opens a prepared message addressed to `info@wearetwominds.com`, the contact address found in the agency source. Visitors must send the message from their email app. No backend, database, analytics, or automatic email delivery is configured. The interface explains this and supplies a direct email fallback.

## Launch

Intended domain: https://academy.twomindsengine.com. Canonical metadata, robots.txt, and sitemap.xml use that domain. Hosting and DNS have not been changed.

Before publishing, confirm the curriculum, delivery formats, schedules, fees, and inbox ownership. These details are deliberately enquiry-based rather than advertised as fixed offers. Confirm the agency's existing font license covers the academy site. For automated lead capture, connect a server-side email provider or CRM and add the relevant privacy information.

## Main files

- app/academy.tsx: content, learning paths, interactions, and enquiry form.
- app/globals.css: visual system and responsive layouts.
- app/layout.tsx: local fonts and page metadata.
- DESIGN.md: visual direction and design constraints.
