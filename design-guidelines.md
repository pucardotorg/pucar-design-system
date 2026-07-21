# Designing with Pucar · ON Court

> The **design-language skill** for the Pucar design system. Read this before designing or generating any screen.
> This is where design *policy* lives — edit it freely as taste evolves. The token/component **reference** is generated separately (see `llms.txt`); this file is the human-authored intent that `llms.txt`, `CLAUDE.md`, Figma and Pencil all point to.

---

## 0 · North star — the feel

Calm, dignified **public service**. A courts product used by citizens under stress and by staff all day. It must feel **friendly, not intimidating**, trustworthy, and quiet — *premium through restraint, never flashy*. When unsure, choose the calmer, more legible, more forgiving option. "Airy and a little apologetic."

---

## 1 · Non-negotiable rules

### Typography
- **Sentence case only.** Never ALL-CAPS or Title Case — including eyebrow/section labels, buttons, table headers, nav. **Exceptions:** proper nouns (ON Court, Pucar) and established legal abbreviations (CNR, FIR, IPC, S.138). *Why: caps shout, which intimidates; and Indic scripts have no case, so caps don't translate.*
- Body defaults to **16px** (reading + UI). Use 14 (`body-compact`) only for dense, staff-only data.
- **No thin text.** Honour the weight ladder (caption→500, body→400/500/600, titles→600). Sub-400 never ships.
- Hierarchy comes from **weight + `neutral-11`**, not from colour.

### Colour
- **Brand teal is rationed** — primary action, active state, focus. Never decoration.
- **Status colours mean status** (success / warning / info / destructive), never styling.
- **Each status hue has exactly three treatments** (ruling 2026-07-21): the **solid** (`success` + `success-foreground`) — a fill for the one strong action per view; the **tint pair** (`success-muted` + `success-muted-foreground`) — chips, callouts, flagged rows; the **ink** (`success-ink`) — status-coloured text and icons on neutral surfaces (page, card, wells). The solid is never a text colour; the ink is never a fill. Inks are engineered to clear 4.5:1 on the page *and* inside `surface-sunken` (amber-11 and blue-11 both missed, so `warning-ink`/`info-ink` are tuned — the amber stays amber rather than going brown-12).
- **No alpha status/brand fills.** A translucent tint's contrast depends on whatever sits underneath (`bg-destructive/10` measured 4.44:1 on `accent` — under the floor). Every tint that carries text is an opaque, gate-verified pair. Alpha remains legal in exactly three places: focus rings, shadows, and washes over *content that must stay readable through them* (document-annotation highlights, scrims).
- **Data-viz uses the categorical palette** (`chart-1…5`) — chosen for mutual distinction, *not* status meaning.
- Neutrals carry structure (surfaces, borders, text).
- **Greys form one monotone fill ladder, each step one job** (re-ruled 2026-07-21 — the old "interactive stays lighter than structural" wording was internally false): `muted`/`sidebar` (2 — quiet washes) → `surface-sunken` (tuned 2½ — nested wells, separating on a card **with no border**) → `accent` (3 — hover of white/transparent-rest controls, and the rest fill of `secondary`) → `accent-strong` (4 — one step further: hover of grey-rest controls, pressed toggles, expanded triggers) → `track` (5 — recessed control tracks, the darkest fill, so a white/teal active pops) → borders (5/7) → `input` (9). Interaction always moves **one step down the ladder** — a control never hovers to its own rest colour (the bug that made secondary-button hovers invisible). Never pick a raw `neutral-N` for any of these jobs.
- **Depth is fill, not repeated borders.** The outer card keeps the one hairline; nested wells use `surface-sunken` with **no border of their own** — a border on a nested item reads as box-in-box. Exception: small chips/thumbnails are defined *by* a border. **Never pick a raw `neutral-N` for any surface/track/accent** — change the one token and it propagates everywhere.
- **Never rely on colour alone.** Pair it with an icon, label, or arrow (e.g. ↑/↓ on deltas). *Colour-blind and bad-monitor safe.*

### Accessibility — the floor, not the aspiration
- **WCAG 2.2 AA:** text ≥ 4.5:1, large text / UI boundaries ≥ 3:1. **Verify, don't eyeball.**
- Interactive states must stay **perceptible** — hover/selection use `accent` (a calibrated light neutral, deliberately calm) or a brand tint, never pure page-white. The AA gate checks `accent-foreground` on `accent` in both themes.
- Focus is always visible (the teal ring). Don't remove it.
- Touch targets ≥ **40px** on citizen-facing surfaces.

### Spacing & density
- **Generous by default.** Whitespace is a feature, not waste — it lowers cognitive load and reads as calm and premium.
- 4px grid, 8px rhythm; the 2px nudge is optical-only, never layout.
- Earn density only where trained staff live in tables — via line-height and padding, never by shrinking type or targets.

### Elevation & shape
- Depth is **semantic**: flat (page), raised (cards, optional), overlay (popovers), modal (dialogs). No decorative shadows.
- One system radius (10px) and its derived scale. No loose values.
- **Radius is assigned by role, not by eye** (ruling 2026-07-21): container (card, dialog, bordered region) → `xl` · control (button, field, track) → `lg` · inset item (menu row, list row, inner button) → `md`/`sm` · micro-control (checkbox) → derived `sm` · **chip → `full`, always**. Bare `rounded` (a fixed 4px that ignores the knob) is illegal. Siblings at the same anatomy level share one radius.

### Motion
- **Motion is feedback for something the user did — never ambient, never decorative.** A calm public instrument doesn't move on its own.
- Two duration bands (Material 3's tokens, cut to our register): **micro feedback** (hover, focus, pressed) 100–150ms · **surface transitions** (overlays opening, sections expanding) 200–250ms. **Nothing over 300ms, ever.**
- **Ease-out entering, ease-in exiting** (decelerate into view, accelerate out) — things arrive gently and leave quickly.
- **`prefers-reduced-motion` collapses everything to instant state changes** — enforced globally in `globals.css` (`@media (prefers-reduced-motion: reduce)`), so no component can forget. State changes still happen; only the choreography disappears (WCAG 2.3.3).

### Control metrics
- **Every field-like control defaults to 40px tall** — input, select, composed field (input-group), OTP slot, command input, tabs track. The size ladder is 32 / 36 / **40** / 44; smaller sizes are *opt-in* for staff-dense surfaces, never a primitive's default. Citizen-facing primary flows step up to 44 (`lg`).
- **Container padding is one number: 24px** (`p-6`) — card, dialog, sheet, drawer, nested well. The `sm` card variant (staff-dense) uses 16. Nothing else.
- **There is exactly one chip: `Badge`.** 24px tall, pill-shaped, caption type. Status variants (`success/warning/info/destructive`) use the opaque muted token pairs — never alpha fills, whose contrast shifts with the backdrop (`bg-destructive/10` measured 4.44:1 on `accent` — below AA).

---

## 2 · Information design
- **One primary line per row**; secondary info muted beneath it. *(A hearing row = parties in medium weight; CNR muted-mono below.)*
- Prefer **dividers over density**; keep table headers quiet (`muted-foreground`) so the *data* reads first.
- Numbers and IDs are tabular; CNRs are monospace.
- **Progressive disclosure** — show the essential, link to the rest ("4 of 27 shown → View cause list").
- One obvious primary action per view. Reduce the number of choices on screen.

## 3 · Responsiveness
- **Mobile-first.** Sidebar collapses to a drawer; multi-column grids stack; touch targets stay ≥ 40px.
- Comfortable reading max-widths; tables scroll horizontally rather than crush.
- Test at **375 / 768 / 1280**.

## 4 · Robustness — the Pucar stress tests
- **Bad monitor:** if a state depends on a near-white grey, it fails. Calibrated greys / brand tints for anything interactive.
- **Low network:** system-font stack (zero download); avoid heavy assets.
- **Indic scripts:** sentence case; ensure Malayalam renders (OS fallback / bundled Noto Sans Malayalam).

## 5 · Choosing components
- Primary action → `Button` default (teal). Secondary → `outline` / `secondary`. Tertiary → `ghost`.
- **Solid coloured action buttons** (`success` / `warning` / `info` / `destructive-solid`) are **rationed** — at most one strong coloured action per view, beside the single teal primary. Only status actions hover in-hue; neutral buttons (`outline` / `secondary` / `ghost`) hover grey *by design* — that's correct, not a bug.
- Status → muted **pill** chips (rounded-full), AA text. Plain labels/metadata → neutral chips.
- Cards default **flat** (hairline); use raised only to lift something genuinely above the page.
- Charts → categorical palette; highlight the current / most-relevant series.
- Forms → label above field, hint & error in `caption`; error uses `destructive` **plus text** (never colour alone).

## 6 · Do / don't
| ✅ Do | ❌ Don't |
|---|---|
| `New case` | `NEW CASE` · `New Case` |
| a ghost hover you can see on a cheap screen | a hover that vanishes into the background |
| `↓ 3.1%` in red **with the arrow** | red text with no arrow |
| one teal primary action per view | teal sprinkled as decoration |
| roomy rows, quiet headers | a dense grid that reads like a spreadsheet |

---

*Source of design intent. `llms.txt` and `CLAUDE.md` reference this file, and it ships as a registry item — so any project or AI building with Pucar inherits these rules.*
