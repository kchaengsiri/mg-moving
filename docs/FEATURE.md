# MagMove Features List

## 1. Landing Page & Portfolio
- [x] **Hero Section:** Strong Call-to-Action (CTA) to book a MagMove truck.
- [x] **Services (Bento Grid):** Clear breakdown of White-Glove services (Local, Inter-provincial, Motorcycle transport).
- [x] **Portfolio ("Our Work" Section):** Conditionally rendered gallery grid fetched server-side from `GET /api/portfolio`. Only appears when items exist. Cards display an uploaded photo, title, description, and category badge. Supports EN/TH i18n via `t.ourWork.*` keys.

## 2. Booking System — Map Picker & Professional Quoting
- [x] **Interactive Map Picker:** `react-leaflet` modal opens when user clicks "Pin Origin/Destination on Map". A draggable marker captures exact `lat/lng`. Nominatim reverse geocoding provides a display label. Component: `MapPickerModal.tsx` (dynamically imported to avoid SSR issues).
- [x] **Professional Quoting System:** Frontend no longer performs live OSRM calculations or shows a dynamic price. A static quote banner displays "Starting at 1,500 THB*" with a concierge disclaimer.
- [x] **Form Payload:** `POST /api/bookings` sends `origin_lat`, `origin_lng`, `dest_lat`, `dest_lng` (floats) and `origin_label`, `dest_label` (strings). No price or distance from the frontend.
- [x] **Backend OSRM Calculation:** FastAPI `create_booking` calls `router.project-osrm.org` server-side. Saves `distance_km` and `est_price` (1,500 + km×50 THB) into `bookings.json`. API response to client: `{id, status, message}` only.
- [x] **Submit Guard:** Submit button is disabled until both origin and destination pins are placed.

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
  - **Image Upload:** Admin selects a file via `<input type="file" accept="image/*" />`. File is POSTed to `POST /api/upload` which saves it to `$UPLOAD_DIR/portfolio/` and returns `/api/uploads/portfolio/{filename}`. URL then submitted with portfolio item.
  - Live image preview displayed during add/edit flows.
  - Categories: House, Condo, Office, Specialty, Inter-provincial.
- [x] **Notification Settings (`/admin/settings/notifications`):** UI to save LINE Messaging API credentials (`LINE Channel Access Token`, `LINE User ID`) and Telegram Chat ID.

## 5. Notification System (Webhook Dispatcher)
- [x] **LINE Messaging API:** On new booking, sends a push message to the configured `line_user_id` via `POST https://api.line.me/v2/bot/message/push`.
  - Message includes: Name, Phone, Service Type, Origin label + coords, Destination label + coords, Distance (`X.X km`), Est. Price (`X,XXX THB`).
  - Validates LINE User ID format (must be 33 chars starting with U/C/R) before sending.
- [x] **Telegram:** Sends message to configured chat ID via Telegram Bot API.
- [x] Non-blocking: dispatched via `BackgroundTasks` in FastAPI, does not impact booking response time.

## 6. Image Upload & Serving API
- [x] **Upload Endpoint:** `POST /api/upload`
  - Accepts: `multipart/form-data` with a single `file` field (image only).
  - Saves to: `$UPLOAD_DIR/portfolio/{uuid}.{ext}` (env var, Docker volume mounted).
  - Returns: `{ "image_url": "/api/uploads/portfolio/{uuid}.{ext}" }`
- [x] **Serve Endpoint:** `GET /api/uploads/portfolio/{filename}`
  - Streams the file from `$UPLOAD_DIR/portfolio/` via FastAPI `FileResponse`.
  - Path traversal protection (rejects `..` or `/` in filename).
