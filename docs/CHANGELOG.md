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
- *23:42* - `Fixed` - Fixed uncontrolled input hydration warning on `<select>` component complying with React Server specification guidelines.
- *23:45* - `Changed` - **Project Rebranding: MG Moving to MagMove**. Globally shifted constant strings, AI references, docs (`PRD`, `GEMINI`), and local dictionaries to align with new brand terminology representing "Magnificent Move".
- *23:47* - `Added` - Executed precise **AIEO & SEO metadata configuration**. Replaced static Next.js `metadata` interceptors with `generateMetadata()` injecting targeted `LocalBusiness` JSON-LD payloads optimized strictly to appease both Google Search Crawlers and LLM Knowledge Graphs.

**[2026-03-22]**
- *00:15* - `Changed` - Abstracted `Navbar.tsx` and `Footer.tsx` out of `page.tsx` into standalone global UI modules for strict architecture scaling without prop drilling.
- *00:20* - `Added` - Injected an explicitly exclusive `ContactPage` AIEO JSON-LD payload directly onto the `/[lang]/book/page.tsx` interface payload explicitly signaling bot traffic toward the lead-generation funnel.
- *02:15* - `Added` - Implemented MagMove Admin Dashboard UI at `frontend/app/admin` completely circumventing i18n Next.js locale routing engine via Edge middleware.
- *02:25* - `Changed` - Built the interactive operational UI grids manually enforcing the 'White-Glove No-Line Rule' via alternating `odd:bg-[#f7fafc] even:bg-white` tonal combinations.
- *02:30* - `Added` - Extended Python JSON-DB REST protocol via FastAPI endpoints to read (`GET /api/bookings`) data grids globally, and mutate (`PATCH /api/bookings/{id}`) async tracker statuses.
- *03:45* - `Added` - Replaced static Booking locations with OpenStreetMap Nominatim interactive Autocomplete dropdowns secured by a 500ms debounce loop.
- *03:50* - `Added` - Integrated OSRM Routing Engine calculating distance dynamically in KM to display our `1500 Base + 50/km` dynamic pricing strategy gracefully inside a No-Line 'Estimation Card'.
- *10:31* - `Changed` - De-escalated 'Premium' UX copy anxiety globally pushing `Book Your Move` across all Call-to-Actions in EN and TH dictionaries.
- *10:35* - `Added` - Orchestrated Python REST Engine managing the new `/api/settings/services` endpoint bound to a local JSON Database architecture.
- *10:40* - `Added` - Constructed an interactive `/admin/settings` Dashboard enforcing White-Glove design aesthetics for granular manipulation of logistics rate rules (`base_price` and `price_per_km`).
- *10:45* - `Changed` - Forged real-time OSRM calculations inside `BookingForm.tsx` to pull natively from the dynamic Services backend matrix predicting live prices instead of making hardcoded variable assumptions.
- *10:48* - `Fixed` - Resolved `FileNotFoundError` during Docker boot sequences by removing redundant `app/data/` prefixes from `JsonDB` instantiations inside the `settings` router.
- *10:55* - `Added` - Secured the Operations Dashboard by scaffolding an MVP authentication pipeline directly powered by Python FastAPI `/api/auth/login`.
- *10:58* - `Added` - Crafted a dedicated `/admin/login` interface applying Dark Sapphire and Champagne Gold aesthetic tokens to completely override backend template layouts.
- *11:00* - `Changed` - Hydrated Next.js Edge `middleware.ts` to actively trap unauthenticated traffic entering `/admin` environments without a valid `magmove_admin_token` cookie.
- *11:05* - `Fixed` - Injected `load_dotenv()` within the Python Auth module preventing Docker isolation from breaking `.env` credential ingestion.
- *11:15* - `Added` - Orchestrated the global `AdminSidebar` component across the Operations Dashboard yielding Dark Sapphire aesthetics and deep Next.js App Router isolation.
- *11:18* - `Changed` - Refactored Service Pricing Manager natively to explicitly map 'Edit' and 'Delete' administrative triggers bringing the Phase 11 CRUD API cycle seamlessly into view.
- *11:24* - `Changed` - Redesigned the Bookings Database `Action` column transforming naked text states into interactive, No-Line Dropdown layouts triggering `PATCH` operations autonomously.
- *11:50* - `Changed` - Refined GEMINI.md scope for Portfolio and AI Chatbot.
- *11:55* - `Added` - Implemented Notification Settings UI and JSON endpoints.
- *12:05* - `Added` - Implemented background webhook dispatcher in FastAPI `POST /api/bookings` handling Line Notify and Telegram operations autonomously.
- *12:30* - `Changed` - Migrated deprecated LINE Notify integration to official LINE Messaging API (Push Message) across UI and backend dispatchers protecting operation continuity.
- *13:20* - `Fixed` - Resolved `None` distance and price in LINE notifications by correcting the field name mismatch between frontend (`estimatedDistanceKm`/`estimatedPriceThb`) and backend Pydantic model (`distance`/`price`). Formatted output to `15.5 km` and `2,500 THB`.

**[2026-03-23]**
- *01:05* - `Added` - Created Portfolio CRUD API (`GET`, `POST`, `PUT`, `DELETE` at `/api/portfolio`) with `portfolio.json` database.
- *01:08* - `Added` - Built Admin Portfolio Manager at `/admin/portfolio` with full CRUD UI following White-Glove No-Line design system.
- *01:12* - `Added` - Integrated "Our Work" public gallery section on landing page with EN/TH i18n. Renders conditionally via server-side fetch — invisible when portfolio is empty.
