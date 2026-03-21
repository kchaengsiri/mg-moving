# 🚚 MG Moving - Premium Logistics Platform

A modern, full-stack web application designed for **MG Moving**, a premium moving and logistics service based in Phuket, Thailand. The platform features dynamic distance-based pricing, an AI-powered customer service chatbot, and a trustworthy, high-end user interface.

## ✨ Key Features
- **Premium Landing Page:** Designed with Stitch MCP and built with 21st.dev components, featuring a Sapphire Blue and Champagne Gold color palette.
- **Dynamic Booking System:** Integrates Google Maps API (Places/Routes) to calculate accurate distances and generate automated price estimates.
- **AI RAG Chatbot:** Powered by the `google-genai` SDK, the chatbot reads from `pricing_rules.json` to provide instant customer support and quotes.
- **MVP JSON Backend:** A lightweight, file-based database system optimized for rapid prototyping before migrating to a full database.
- **Admin Dashboard:** A protected Next.js route for managing bookings, adjusting pricing rules, and updating portfolio images.

## 🛠 Tech Stack
- **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, TypeScript.
- **Backend:** FastAPI (Python), Uvicorn, Pydantic.
- **AI Integration:** `google-genai` SDK.
- **Database:** Local JSON files (`/backend/app/data/`).
- **Environment:** Docker & Docker Compose.

## 📂 Project Structure
```text
/
├── .agents/skills/      # Custom AI Agent Skills (Code Reviewer, Tech Lead, etc.)
├── backend/             # FastAPI application and JSON database
├── docs/                # Project documentation (PRD, Features, Changelog)
├── frontend/            # Next.js application
├── tmp/                 # Temporary folder for image processing/assets
├── docker-compose.yml   # Multi-container orchestration
├── GEMINI.md            # Core instructions & rules for AI Agents
└── README.md            # Project overview
```

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose installed.
- API Keys for Google Gemini and Google Maps.

### 1. Environment Setup
Create a `.env` file in the `/backend` directory:
```env
GEMINI_API_KEY="your_gemini_api_key"
GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
```

### 2. Run the Application
Start both the frontend and backend development servers using Docker:
```bash
docker-compose up --build
```
- **Frontend:** `http://localhost:3000`
- **Backend API Docs (Swagger):** `http://localhost:8000/docs`

## 🤖 AI Agent Workflow
This project is optimized for AI-assisted development (e.g., Antigravity Agent, Cursor). The agent uses specific custom skills located in `.agents/skills/`:
1. **`stitch-vibe-designer`:** Generates UI mockups using the Stitch MCP before coding.
2. **`ui-mcp-integrator`:** Fetches and integrates React/Tailwind components from 21st.dev.
3. **`tech-lead`:** Enforces architecture rules and maintains `/docs/CHANGELOG.md`.
4. **`json-db-manager`:** Ensures safe, atomic read/write operations for the JSON database.
5. **`code-reviewer`:** Ensures best practices in Next.js (App Router) and FastAPI (Async operations).

Please refer to `GEMINI.md` and the `/docs` folder for detailed architectural rules and feature specifications.
