// Tier 2/3 design decisions — the single source of truth for Pucar · ON Court (Rajini 2.0).
// Edit values here, then run `pnpm tokens` to regenerate app/tokens.css.
// Contrast values proven in Foundations rev 3 (WCAG 2.1/2.2 AA).

import type { RampName } from "./ramps"

// ── Neutral anchor ──────────────────────────────────────────────
// "sand" = warm (doc default) · "slate" = cool (your #8b8d98 reference) · "gray" = true neutral.
export const NEUTRAL: RampName = "slate"

// Role → source ramp. Neutral is swappable above; chromatic roles are fixed.
export const FAMILY_RAMP: Record<string, RampName> = {
  neutral: NEUTRAL,
  brand: "teal",
  success: "grass", // warmer green — separated from the teal brand (ΔE≈8 vs ≈5 for Radix Green)
  info: "blue",
  warning: "amber",
  destructive: "red",
}

// ── AA-tuned solids (engineered 9–10 override; not raw Radix steps) ──
// Light: darker fill carries WHITE text. Dark: brighter fill carries INK text.
export const SOLIDS: Record<"brand" | "success" | "info" | "destructive", { light: string; dark: string }> = {
  brand: { light: "#007E7E", dark: "#0eb39e" }, // 4.90:1 white / brighter dark teal + ink so it doesn't read faint
  success: { light: "#217a3a", dark: "#46a758" }, // grass · 5.37:1 white / 6.53:1 ink
  info: { light: "#0d74ce", dark: "#3b9eff" }, // 4.77:1 / 6.57:1
  destructive: { light: "#c1232a", dark: "#ec5d5e" }, // 5.93:1 / 5.57:1
}

// Warning is dark-text-only in BOTH themes (amber-9 fill + ink label).
export const WARNING_FOREGROUND = "#3d2000"

// Status INKS — status-coloured text/icons on NEUTRAL surfaces (page, card, wells).
// Engineered like SOLIDS: light values must clear 4.5:1 on background AND
// surface-sunken. Raw step-11 makes it for green/red; amber-11 was 4.50/4.20
// and blue-11 4.65/4.34, so both are tuned darker while keeping their hue
// (the amber stays amber — going darker via step-12 reads brown). Dark uses
// the ramp 11s, which Radix designs for text on dark 1–3.
export const STATUS_INKS: Record<"success" | "warning" | "info" | "destructive", { light: string; dark: string }> = {
  success: { light: "#2a7e3b", dark: "#71d083" }, // grass-11 · 4.94 page / 4.61 wells
  warning: { light: "#9d5c00", dark: "#ffca16" }, // tuned (amber-11 failed) · 5.17 / 4.83 — and 4.88 on the warning tint
  info: { light: "#0c6ec3", dark: "#70b8ff" }, // tuned (blue-11 failed in wells) · 5.08 / 4.74
  destructive: { light: "#ce2c31", dark: "#ff9592" }, // red-11 · 5.08 / 4.75
}
// Bright chromatic teal for NON-text moments only (mark, chart lines, active underlines, tints).
export const BRAND_ACCENT = "#12a594"
// Teal text ON the brand tint (brand-3) — the selection pair. Engineered like SOLIDS:
// light brand-11 is only 4.10:1 on brand-3 (fails AA), so light uses a darker tuned teal
// (5.83:1); dark brand-11 already clears (8.07:1). Ruling 2026-07-21 (DECISIONS.md):
// selection = persistent location = brand tint; hover = transient = grey accent.
export const BRAND_TINT_FOREGROUND = { light: "#0a6969", dark: "#0bd8b6" }
// Foreground on solids: white in light, near-black ink in dark.
export const SOLID_FOREGROUND = { light: "#ffffff", dark: "#0a0a0a" }

// Nested-surface fill — a TUNED step between neutral-2 and neutral-3 (the "missing" surface step the
// ramp lacks). Separates from a white card on its own (no border) yet stays softer than neutral-3.
// This is the systemic answer to the recurring "too weak / too heavy / box-in-box" grey problem.
export const SURFACE_SUNKEN = { light: "#f4f4f7", dark: "#1d1e21" }

// Categorical data-viz palette — chosen for MUTUAL DISTINCTION, not status meaning.
// (Charts shouldn't borrow success/warning semantics — Foundations §chart tension.)
// teal · blue · violet · amber · rose. Dark = brighter siblings.
export const CHART_PALETTE = {
  light: ["#007E7E", "#0d74ce", "#6e56cf", "#e2a336", "#e93d82"],
  dark: ["#0eb39e", "#3b9eff", "#9e8cff", "#ffce6a", "#ff8dab"],
}

// ── Scales ──────────────────────────────────────────────────────
// Typeface: system-font stack led by Helvetica Neue — zero download (best for low-network),
// native feel. Malayalam falls back to the OS script font (bundle Noto Sans Malayalam later).
export const FONTS = {
  sans: '"Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  heading: '"Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',
}

export const RADIUS = "0.625rem" // 10px — single knob driving the radius scale

// Spacing: the 4px grid / 8px rhythm IS Tailwind's default spacing scale (p-4 = 16px …).
// We deliberately do not ship custom spacing tokens — earlier --sp-* vars were emitted but
// mapped to nothing, so editing them changed nothing (false leverage). The grid is design
// law (design-guidelines.md §Spacing), enforced by convention, not by a token.

// Elevation — neutral black, PER THEME (ruling 2026-07-21): the light values are
// invisible on dark surfaces, collapsing the raised/overlay/modal hierarchy at night.
// Dark uses deeper opacities; the light rim overlays already carry (ring-foreground/10,
// which flips to a pale ring in dark) does the edge work. Level = semantic depth, never decoration.
export const SHADOWS: Record<string, { light: string; dark: string }> = {
  raised: {
    light: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.07)",
    dark: "0 1px 2px 0 rgb(0 0 0 / 0.30), 0 1px 3px 0 rgb(0 0 0 / 0.40)",
  },
  overlay: {
    light: "0 4px 8px -2px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
    dark: "0 4px 8px -2px rgb(0 0 0 / 0.45), 0 2px 4px -2px rgb(0 0 0 / 0.35)",
  },
  modal: {
    light: "0 16px 32px -8px rgb(0 0 0 / 0.18), 0 6px 12px -6px rgb(0 0 0 / 0.12)",
    dark: "0 16px 32px -8px rgb(0 0 0 / 0.60), 0 6px 12px -6px rgb(0 0 0 / 0.45)",
  },
}

// Type scale — major third (1.250), base 16, rounded to even, 25→24 locked.
// [size, lineHeight, weight] in px. Line-heights snap to the 8px grid.
export const TYPE: Record<string, { size: number; line: number; weight: number }> = {
  display: { size: 48, line: 56, weight: 600 },
  "display-s": { size: 40, line: 48, weight: 600 },
  "title-l": { size: 32, line: 40, weight: 600 },
  title: { size: 24, line: 32, weight: 600 },
  "title-s": { size: 20, line: 28, weight: 600 },
  body: { size: 16, line: 24, weight: 400 },
  "body-compact": { size: 14, line: 20, weight: 400 }, // off-scale, opt-in (dense staff data)
  caption: { size: 12, line: 16, weight: 500 }, // floor raised to 500
}

// ── Semantic mapping (Tier 2 — the frozen shadcn public API) ────
// Theme-independent tokens: reference primitive steps via var(); the step vars flip per theme.
export const SEMANTIC_REFS: Record<string, string> = {
  background: "var(--neutral-1)",
  foreground: "var(--neutral-12)",
  card: "var(--neutral-1)",
  "card-foreground": "var(--neutral-12)",
  popover: "var(--neutral-1)",
  "popover-foreground": "var(--neutral-12)",

  // Structural depth vocabulary — name the surface role so components never pick raw neutral-N by eye.
  // (muted = content de-emphasis; surface-* = structural depth. Same value today, free to diverge later.)
  surface: "var(--neutral-1)", // structural base (page)
  "surface-raised": "var(--neutral-1)", // card / small box — lifted by border + shadow, not fill
  // surface-sunken is a TUNED value (between neutral-2 and 3) — see SURFACE_SUNKEN below. It separates
  // on a white card on its own (no border) without reading as heavy as neutral-3. Emitted per-theme.
  // Ruling 2026-07-21 (grey ladder): track moves 4→5 so step 4 is freed for
  // interaction. The full monotone fill ladder: sunken (tuned wash) → accent (3,
  // hover) → accent-strong (4, engaged) → track (5, recessed) → borders (5/7).
  track: "var(--neutral-5)", // recessed control tracks (tabs list, progress, slider) — a white/teal active must pop

  primary: "var(--brand-solid)",
  secondary: "var(--neutral-3)",
  // Full-strength label (ruling 2026-07-21): neutral-11 is the MUTED text colour,
  // and a grey fill + muted label reads as disabled. Soft buttons keep crisp text.
  "secondary-foreground": "var(--neutral-12)",
  muted: "var(--neutral-2)",
  "muted-foreground": "var(--neutral-11)",
  accent: "var(--neutral-3)", // interaction highlight (hover of white/transparent controls)
  "accent-foreground": "var(--neutral-12)",
  // One step past accent: hover for controls that REST on grey (secondary buttons),
  // pressed toggles, expanded triggers. Fixes the invisible secondary-button hover
  // (secondary and accent are both neutral-3, so hover-to-accent changed nothing).
  "accent-strong": "var(--neutral-4)",

  destructive: "var(--destructive-solid)",
  success: "var(--success-solid)",
  info: "var(--info-solid)",
  warning: "var(--warning-9)",
  "warning-foreground": WARNING_FOREGROUND,

  // ONE ink per hue (ruling 2026-07-21): tint text aliases the hue's engineered ink,
  // so chips, callouts and inline status text share a single colour. Before this,
  // info/warning chips used heavy step-12 (navy/brown) while success/destructive
  // used vivid 11s — four pills, two different chroma registers. The tuned inks
  // clear AA on the tints too (warning 4.88, info 4.66 — gate-proven).
  "success-muted": "var(--success-3)",
  "success-muted-foreground": "var(--success-ink)",
  "warning-muted": "var(--warning-3)",
  "warning-muted-foreground": "var(--warning-ink)",
  "info-muted": "var(--info-3)",
  "info-muted-foreground": "var(--info-ink)",
  "destructive-muted": "var(--destructive-3)", // scrutiny flags / removable filter chips — completes the muted-status set
  "destructive-muted-foreground": "var(--destructive-ink)",

  // Status inks are Tier-1 engineered primitives (STATUS_INKS above), exposed
  // via UTILITY_PRIMITIVES — see the three-treatments rule in design-guidelines
  // §Colour: solid = fill, muted pair = tint, ink = text/icons on neutral.

  // Brand tint pair — identity tiles (avatar monograms, icon chips) and anything
  // brand-tinted that carries text. Same engineered pair as sidebar selection;
  // named so components stop hand-mixing bg-primary/10 (backdrop-dependent contrast).
  "brand-muted": "var(--brand-3)",
  "brand-muted-foreground": "var(--brand-tint-foreground)",

  // Machine-prefilled, human-unverified field fill (ruling 2026-07-21, DECISIONS.md):
  // the amber stays, snapped to warning-2. FILL ONLY — the field border stays `input`
  // (neutral-9) because no amber step passes the 3:1 boundary check without going brown.
  prefilled: "var(--warning-2)",

  border: "var(--neutral-7)",
  input: "var(--neutral-9)", // field boundary needs 3:1 (WCAG 1.4.11); neutral-8 was 1.86:1
  ring: "var(--brand-solid)",


  sidebar: "var(--neutral-2)",
  "sidebar-foreground": "var(--neutral-12)",
  "sidebar-primary": "var(--brand-solid)",
  // Selection = persistent location = brand tint; hover = transient = grey accent
  // (ruling 2026-07-21). The foreground is the engineered BRAND_TINT_FOREGROUND pair.
  "sidebar-accent": "var(--brand-3)",
  "sidebar-accent-foreground": "var(--brand-tint-foreground)",
  "sidebar-border": "var(--neutral-5)",
  "sidebar-ring": "var(--brand-solid)",

  // NOTE: --brand-accent is emitted as a Tier-1 primitive (BRAND_ACCENT above).
  // It must NOT appear here — `"brand-accent": "var(--brand-accent)"` created a
  // self-referential cycle that invalidated the token in light mode.
}

// ── Utility-facing primitives ───────────────────────────────────
// Tier-1 primitives that are part of the PUBLIC utility API (bg-brand-accent,
// bg-surface-sunken, …). They are emitted per-theme as primitives, but consumers
// still need a `--color-*` @theme mapping for them. This list is the SINGLE
// source of truth for those mappings — build-registry.ts derives cssVars.theme
// from it and gate.ts asserts globals.css agrees. Never hand-append a primitive
// to a mapping list in a generator again: `surface-sunken` was silently missing
// from the registry because "brand-accent" was hand-appended and it wasn't.
export const UTILITY_PRIMITIVES = [
  "brand-accent",
  "surface-sunken",
  "success-ink",
  "warning-ink",
  "info-ink",
  "destructive-ink",
] as const

// Foregrounds that flip white (light) → ink (dark). Only these need a .dark override;
// everything else auto-flips because the primitive step vars are redefined in .dark.
export const SOLID_FOREGROUND_TOKENS = [
  "primary-foreground",
  "destructive-foreground",
  "success-foreground",
  "info-foreground",
  "sidebar-primary-foreground",
] as const
