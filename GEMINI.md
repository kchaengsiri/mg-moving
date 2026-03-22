# Project Core Instructions: MagMove

## Role
You are an expert Full-Stack Developer, AI Specialist, and UI/UX Designer. You write clean, scalable, and maintainable code. You must actively utilize your defined skills located in the `.agents/skills/` directory.

## Documentation & Context (Source of Truth)
- **`/docs/PRD.md`**: Read this FIRST for business objectives, target audience, and core project scope.
- **`/docs/FEATURE.md`**: Read this for detailed feature requirements and expected application behavior.
- **Rule:** ALWAYS review these documents before building new core features or proposing architectural changes to ensure alignment with the MagMove business model.

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript.
- **Backend:** FastAPI (Python), Uvicorn.
- **AI Integration:** STRICTLY use the new `google-genai` SDK (Do NOT use the deprecated `google-generativeai`).
- **Database (MVP):** JSON files stored safely in `/backend/app/data/`.
- **Environment:** Docker & docker-compose for the dev environment.

## Workflow & Tools
- **Design First (Stitch MCP):** Use Stitch MCP (via `stitch-vibe-designer` skill) to generate UI mockups and agree on a visual direction before writing frontend code.
- **UI Components (21st.dev MCP):** Actively use the `21st.dev` MCP (via `ui-mcp-integrator` skill) to search and fetch React/Tailwind UI components (e.g., Hero sections, Bento Grids).
- **Styling:** Use Tailwind CSS. Ensure responsive design and consistently apply the premium brand palette (Deep Sapphire Blue, Clean White, Champagne Gold).

## Architecture Rules
1. **Frontend (`/frontend`):** Handles Landing Page, Booking flow, and Admin Panel (as a protected route). Do NOT process heavy business logic or expose external API keys (like Google Maps) here.
2. **Backend (`/backend`):** Handles all business logic, Google Maps API distance calculations, and the AI Chatbot operations.
    - **AI Chatbot:** A future customer support agent designed to answer logistics, routing, and pricing queries.
3. **Data Management:** The Backend is the ONLY entity allowed to read/write to JSON files (`bookings.json`, `portfolio.json`, `chat_history.json`, `settings.json`, `pricing_rules.json`, `notifications.json`). The Frontend MUST call API endpoints. Adhere strictly to the `json-db-manager` skill.
    - **Portfolio:** A gallery showcasing past premium moving jobs and high-quality packaging to build trust. This will eventually be managed via `/admin/portfolio` and saved to `portfolio.json`.
4. **Current Implementation Scope:** The global rebrand to **MagMove** has strictly occurred. The App Router structurally executes English/Thai i18n. The `/book` UX converts traffic into leads, while the Python FastAPI engine powers the `/admin` Operations Dashboard via the `bookings.json` lockfile database.

## Coding Standards & Logging
- Adhere to the `code-reviewer` skill for Next.js and FastAPI best practices (e.g., proper `async/await` handling, no blocking operations).
- Document complex logic clearly.
- **CHANGELOG & FEATURE DOCS (CRITICAL):** - You MUST update `/docs/CHANGELOG.md` using the exact time-based format defined in your `tech-lead` skill whenever completing ANY significant task, component integration, or file creation. 
  - Whenever a new feature is fully implemented, modified, or its core logic changes, you MUST actively update `/docs/FEATURE.md` to accurately reflect the latest architecture, API endpoints used, and expected application behavior.

## Git Automation Protocol
When you complete a feature, fix a bug, or finish a sprint assignment, you MUST actively use your terminal execution tool to handle the Git workflow.
Execute these exact commands in the terminal:
1. Run `git status` to review the changed files.
2. Run `git add .` to stage all changes.
3. Run `git commit -m "<type>(<scope>): <short description>"` (Use Conventional Commits like `feat:`, `fix:`, `docs:`, `refactor:`).
4. **CRITICAL:** Do NOT execute `git push`. Stop and ask me: "I have committed the changes. Would you like me to push them to the remote repository?" If I say "yes", then run `git push` via the terminal.

## Context Recovery Protocol (Crucial for Session Resumption)
When starting a new session or resuming after a break, you must read the following files in this exact order to regain context:
1. `PRD.md` -> Check the "Current Sprint & Status" and "MVP Features" sections.
2. `docs/CHANGELOG.md` -> Review the last 3 entries.
3. Once read, briefly summarize the current state of the project and explicitly propose the NEXT immediate step for the user.
