# MagMove Features List

## 1. Landing Page & Portfolio
- [x] **Hero Section:** Strong Call-to-Action (CTA) to book a MagMove truck.
- [x] **Services (Bento Grid):** Clear breakdown of White-Glove services (Local, Inter-provincial, Motorcycle transport).
- [x] **Portfolio ("Our Work" Section):** Conditionally rendered gallery grid fetched server-side from `GET /api/portfolio`. Only appears when items exist. Cards display an uploaded photo, title, description, and category badge. Supports EN/TH i18n via `t.ourWork.*` keys.

## 2. Booking System & Dynamic Pricing
- [ ] **Google Maps Integration:** Autocomplete origin/destination and calculate distance (km) and estimated time.
- [ ] **Pricing Engine:** Calculate estimated fare based on `pricing_rules.json` (Base fare + Distance fare + Add-ons like helpers).
- [x] **Form:** Captures customer phone number, service type, and route details. Uses OpenStreetMap (Nominatim) for location autocomplete and OSRM for distance calculation. Estimated distance (`distance`) and price (`price`) are included in the `POST /api/bookings` payload and forwarded in LINE & Telegram notifications.

## 3. AI Chatbot (RAG)
- [ ] **UI:** Persistent Right-Side Drawer or Spotlight interface for continuous MagMove support chat.
- [ ] **Logic:** Strictly uses `google-genai` SDK.
- [ ] **Context:** Reads `pricing_rules.json` and `services.json` to answer pricing questions.
- [ ] **Memory:** Multi-turn chat history saved in `chat_history.json`.

## 4. Admin Dashboard (Frontend Protected Route)
- [x] **Bookings Management:** View, confirm, and update booking statuses (`Pending`, `Quoted`, `Completed`) via interactive dropdown actions.
- [ ] **Settings Management:** UI to edit AI system prompts and pricing rules (`settings.json`).
- [x] **Portfolio Management (`/admin/portfolio`):**
  - Full CRUD table: list, add, edit, and delete portfolio items.
  - **Image Upload:** Admin selects a file via `<input type="file" accept="image/*" />`. File is POSTed to `POST /api/upload` which saves it to `/frontend/public/uploads/portfolio/` and returns the public path. The returned URL is then submitted with the portfolio item to `POST /api/portfolio`.
  - Live image preview displayed during add/edit flows.
  - Categories: House, Condo, Office, Specialty, Inter-provincial.
- [x] **Notification Settings (`/admin/settings/notifications`):** UI to save LINE Messaging API credentials (`LINE Channel Access Token`, `LINE User ID`) and Telegram Chat ID.

## 5. Notification System (Webhook Dispatcher)
- [x] **LINE Messaging API:** On new booking, sends a push message to the configured `line_user_id` via `POST https://api.line.me/v2/bot/message/push`.
  - Message includes: Name, Phone, Service Type, Distance (`X.X km`), Est. Price (`X,XXX THB`).
  - Validates LINE User ID format (must be 33 chars starting with U/C/R) before sending.
- [x] **Telegram:** Sends message to configured chat ID via Telegram Bot API.
- [x] Non-blocking: dispatched via `BackgroundTasks` in FastAPI, does not impact booking response.

## 6. Image Upload API
- [x] **Endpoint:** `POST /api/upload`
  - Accepts: `multipart/form-data` with a single `file` field (image only).
  - Saves to: `/frontend/public/uploads/portfolio/{uuid}.{ext}`
  - Returns: `{ "image_url": "/uploads/portfolio/{uuid}.{ext}" }`
  - Creates the upload directory automatically if it does not exist.
  - Validates content type — only `image/*` files accepted.
