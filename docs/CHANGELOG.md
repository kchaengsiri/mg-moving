# Changelog

**[2026-03-21]**
- *17:02* - `Added` - Initialized project documentation (PRD, GEMINI.md, changelog, feature).
- *17:05* - `Added` - Created initial docker-compose.yml and Dockerfiles for frontend and backend dev environment.
- *19:58* - `Added` - Integrated premium Hero Section and Services Bento Grid for the Landing Page on the frontend.
- *20:45* - `Changed` - Migrated Landing Page from Stitch `tmp/home.html` and enforced the 'White-Glove' Design System (`DESIGN.md`) including typography (Manrope/Inter) and No-Line Rule.
- *21:15* - `Changed` - Implemented i18n English/Thai dictionaries and fixed rendering errors by supplying premium Unsplash stock photography.
- *21:55* - `Changed` - Injected an 'About Us' section into the layout. Integrated 'IBM Plex Sans Thai' as a headless font fallback via `next/font/google` using dynamic CSS variable toggling based on the HTML `lang` attribute.
- *22:52* - `Changed` - Implemented URL-based i18n SEO Routing (`/[lang]`). Refactored `page.tsx` to an async Server Component intercepting URL `params`. Built Next.js Edge `middleware.ts` to transparently rewrite root traffic (`/`) natively to (`/en`) without redirect penalties.
