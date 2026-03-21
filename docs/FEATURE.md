# MagMove Features List

## 1. Landing Page & Portfolio
- [x] **Hero Section:** Strong Call-to-Action (CTA) to book a MagMove truck.
- [x] **Services (Bento Grid):** Clear breakdown of White-Glove services (Local, Inter-provincial, Motorcycle transport).
- [ ] **Portfolio (Image Slider):** Showcase real operational photos (from `portfolio.json`).

## 2. Booking System & Dynamic Pricing
- [ ] **Google Maps Integration:** Autocomplete origin/destination and calculate distance (km) and estimated time.
- [ ] **Pricing Engine:** Calculate estimated fare based on `pricing_rules.json` (Base fare + Distance fare + Add-ons like helpers).
- [x] **Form:** Capture customer phone number (Unique ID) and route details dynamically via the `/book` UI funnel.

## 3. AI Chatbot (RAG)
- [ ] **UI:** Persistent Right-Side Drawer or Spotlight interface for continuous MagMove support chat.
- [ ] **Logic:** strictly uses `google-genai` SDK.
- [ ] **Context:** Reads `pricing_rules.json` and `services.json` to answer pricing questions and estimate costs based on user prompts.
- [ ] **Memory:** Multi-turn chat history saved in `chat_history.json`.

## 4. Admin Dashboard (Frontend Protected Route)
- [x] **Bookings Management:** Globally view, confirm, and interactively track dynamic operational tracking (`Pending`, `Quoted`, `Completed`).
- [ ] **Settings Management:** UI to edit AI system prompts and pricing rules (`settings.json`).
- [ ] **Portfolio Management:** Upload/Manage images.
