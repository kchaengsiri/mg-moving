# Changelog

**[2026-03-21]**
- *17:02* - `Added` - Initialized project documentation (PRD, GEMINI.md, changelog, feature).
- *17:05* - `Added` - Created initial docker-compose.yml and Dockerfiles for frontend and backend dev environment.
- *19:58* - `Added` - Integrated premium Hero Section and Services Bento Grid for the Landing Page on the frontend.
- *20:45* - `Changed` - Migrated Landing Page from Stitch `tmp/home.html` and enforced the 'White-Glove' Design System (`DESIGN.md`) including typography (Manrope/Inter) and No-Line Rule.
- *21:15* - `Changed` - Implemented i18n English/Thai dictionaries and fixed rendering errors by supplying premium Unsplash stock photography.
- *21:55* - `Changed` - Injected an 'About Us' section into the layout. Integrated 'IBM Plex Sans Thai' as a headless font fallback via `next/font/google` using dynamic CSS variable toggling based on the HTML `lang` attribute.
- *22:52* - `Changed` - Implemented URL-based i18n SEO Routing (`/[lang]`). Refactored `page.tsx` to an async Server Component intercepting URL `params`. Built Next.js Edge `middleware.ts` to transparently rewrite root traffic (`/`) natively to (`/en`) without redirect penalties.
- *23:18* - `Added` - Engineered `JsonDB` backend manager utilizing `asyncio` transaction locking for robust filesystem scaling. Scaffolded FastAPI framework from scratch including CORS middleware. Built `/api/bookings` endpoint secured via Pydantic model validation.
- *23:25* - `Added` - Orchestrated the Next.js App Router `/book` flow. Constructed a 2-column asymmetric interactive Client Form meticulously enforcing the 'White-Glove' standard (exclusive use of Ghost Borders over hard 1px strokes). Dynamically hooked Landing Page CTA buttons to inject users seamlessly into the acquisition funnel.
- *23:42* - `Security` - Fixed uncontrolled input hydration warning on `<select src>` component complying with React Server specification guidelines.
- *23:45* - `Changed` - **Project Rebranding: MG Moving to MagMove**. Globally shifted constant strings, AI references, docs (`PRD`, `GEMINI`), and local dictionaries to align with new brand terminology representing "Magnificent Move".
- *23:47* - `Optimization` - Executed precise **AIEO & SEO metadata configuration**. Replaced static Next.js `metadata` interceptors with `generateMetadata()` injecting targeted `LocalBusiness` JSON-LD payloads optimized strictly to appease both Google Search Crawlers and LLM Knowledge Graphs.
