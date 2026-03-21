# Design System Strategy: The White-Glove Standard

## 1. Overview & Creative North Star: "The Digital Concierge"
The moving industry is often associated with chaos and stress. This design system aims to be the antithesis of that friction. Our Creative North Star is **"The Digital Concierge"**—an editorial-inspired, high-end experience that feels more like a luxury hospitality brand than a logistics company.

To move beyond the "template" look typical of the service industry, we avoid rigid grids and harsh dividers. Instead, we utilize **Intentional Asymmetry** (e.g., overlapping a high-resolution image of a pristine interior with a floating quote card) and **Tonal Depth**. The layout should breathe, using the generous spacing scale to create a sense of calm, professional competence.

## 2. Colors: Tonal Authority
Our palette is rooted in the reliability of Deep Sapphire and the prestige of Champagne Gold. However, the execution must be sophisticated to avoid a "budget corporate" feel.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning or containment. Boundaries must be defined solely through background color shifts. For instance, a section using `surface-container-low` should sit directly against the `surface` background. The transition of color is the "line."

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials.
- **Base Layer:** `surface` (#f7fafc) acts as the foundation.
- **Tier 1 (Subtle Inset):** `surface-container-low` (#f1f4f6) for secondary content areas.
- **Tier 2 (Elevated Content):** `surface-container-lowest` (#ffffff) for the most important cards or interactive elements, creating a "lifted" effect against the gray base.

### The "Glass & Gradient" Rule
To elevate the primary brand color, use subtle gradients rather than flat fills. Hero sections should transition from `primary` (#002045) to `primary-container` (#1a365d) at a 135-degree angle. For floating navigation or mobile menus, use **Glassmorphism**: `surface` at 80% opacity with a `20px` backdrop-blur to keep the layout feeling integrated and modern.

## 3. Typography: Editorial Sophistication
We pair the structural authority of **Manrope** for displays with the hyper-legible precision of **Inter** for utility.

- **Display Scale (`display-lg` to `display-sm`):** Set in Manrope. These are your "Statement" pieces. Use them for high-impact headlines that sell the "White-Glove" lifestyle. Use tight letter-spacing (-0.02em) for a high-end fashion feel.
- **Headline & Title Scale:** These bridge the gap between marketing and utility. Use `headline-lg` (2rem) for section headers to establish a clear, unhurried hierarchy.
- **Body & Label Scale:** Set in Inter. `body-lg` (1rem) is our standard for readability. Use `label-md` for metadata—always in uppercase with 0.05em letter-spacing to denote professional categorization.

## 4. Elevation & Depth: Tonal Layering
In this system, depth is a feeling, not a shadow.

- **The Layering Principle:** Avoid the "floating on nothing" look. A "Booking Summary" card (`surface-container-lowest`) should sit inside a "Booking Flow" section (`surface-container-low`). This nested approach mimics a physical folder or high-end stationery.
- **Ambient Shadows:** Shadows are reserved for high-level interactions (e.g., a "Get a Quote" modal). Use a tinted shadow: `color: rgba(24, 28, 30, 0.06)`, `blur: 40px`, `y-offset: 12px`. This mimics natural light reflecting off a matte surface.
- **The Ghost Border Fallback:** If a border is required for accessibility on inputs, use `outline-variant` (#c4c6cf) at **20% opacity**. It should be felt, not seen.

## 5. Components: Precision Primitives

### Buttons: The "Champagne" Touch
- **Primary:** Background `tertiary_fixed` (#ffdeaa) with `on_tertiary_fixed` text. Apply a subtle `0.5` px inner-glow top-border to mimic a gold leaf edge.
- **Secondary:** `surface-container-highest` background with `primary` text. No border.
- **Shape:** Use `md` (0.375rem) roundedness for a corporate, stable feel. Avoid "pill" shapes which feel too casual for a professional moving service.

### Input Fields & Forms
- **Structure:** Use `surface-container-highest` as the fill color. 
- **States:** On focus, transition the background to `surface-container-lowest` and add a `2px` "Ghost Border" using the `primary` color at 30% opacity.
- **Spanning:** Forms should use a 2-column asymmetric layout where labels sit to the left of the input on desktop to mimic high-end legal documents.

### Cards & Lists
- **The No-Divider Rule:** Forbid 1px dividers between list items. Instead, use `spacing-4` (1.4rem) of vertical white space or a subtle background toggle between `surface-container-low` and `surface-container-high`.
- **Image Treatment:** All images of moving staff or trucks must have a `DEFAULT` (0.25rem) corner radius.

### Specialized Component: The "Peace of Mind" Progress Tracker
A bespoke horizontal stepper for the moving process. Use `tertiary` (Gold) for completed steps and `secondary_container` for upcoming steps. Each step should be a "glass" tile with a backdrop blur.

## 6. Do’s and Don’ts

### Do:
- **Use "Air":** Utilize `spacing-16` (5.5rem) or `spacing-20` (7rem) between major sections. High-end brands are never crowded.
- **Color-Block:** Use the `primary-container` (#1a365d) for full-width footer or testimonial sections to anchor the page.
- **High-Contrast Typography:** Use `display-lg` text in `on_background` (#181c1e) against `surface` for a bold, editorial look.

### Don't:
- **Don’t use "Pure Black":** Use `on_background` (#181c1e) for text to maintain a softer, premium feel.
- **Don’t use standard Drop Shadows:** If a card looks "heavy," reduce the shadow opacity or use a background color shift instead.
- **Don't use harsh animations:** Transitions between states should be `300ms` with a `cubic-bezier(0.4, 0, 0.2, 1)` easing for a "smooth-glide" feel.