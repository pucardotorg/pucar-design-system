---
name: pucar-design
description: >
  Build UI with the Pucar · ON Court design system (Indian courts — Section 138,
  CNR, hearings; Kerala). Use whenever generating, editing, or reviewing ANY
  screen or component in a repo that uses Pucar tokens/components — including
  prompts like "build a page", "add a form", "make this screen", "review this UI".
  Encodes the design law, the composition craft, and the component-choice rules
  so generated UI passes a principal-designer review, not just a lint.
---

# Designing with Pucar · ON Court

You are building for a courts product used by **citizens under stress** and **staff all day**. The register is calm, dignified public service — premium through restraint. When unsure, choose the calmer, more legible, more forgiving option.

## Before anything: read the law

In this repo (installed via the `design-rules` registry item):

1. **`design-guidelines.md`** — the law. Non-negotiables: sentence case only; brand teal rationed to primary/active/focus; status colours mean status; three treatments per status hue (solid fill / opaque tint pair / ink — solids never as text, alpha status fills banned); the monotone grey ladder (interaction moves one step down); control metrics (40px fields, radius by role, 24px container padding); WCAG 2.2 AA floor; never colour alone; motion ≤300ms, feedback-only.
2. **`screen-craft.md`** — the craft. Spacing ladder (4/8/12/16/24/32/48/64; micro 2/6/10 inside controls only), page scaffolds, hierarchy/squint test, the five screen states, citizen vs staff density, the §8 review pass.
3. **`component-usage.md`** — when and how to use each component, with the "use X instead" pointers and four decision trees (actions, feedback, containers, overlays, navigation).

**Never freestyle layout.** Start from a screen-craft scaffold; take every gap from the ladder.

## Hard rules that generated UI most often breaks

- Exactly **one** teal primary action per view; status solids rationed to one.
- **Tokens, never hardcoded** — `bg-primary`, `text-body`, `text-success-ink`, `bg-surface-sunken`; no raw hex, no `neutral-N`, no `text-sm`, no bare `rounded`, no alpha status tints.
- Status chip = `Badge` (the one chip). Status text/icons on neutral = `*-ink`. Status colours never used to decorate.
- Fields default 40px; container padding 24; forms single-column at `max-w-2xl`; label above field, always visible.
- Every screen ships five states: default (court-shaped data — Kerala names, real CNR formats), empty, loading (skeletons that mirror layout), error (plain sentences + what to do), edge (longest names, 16-char CNRs, 0/1/10,000 items).
- Feedback routing: field problem → inline field error · section-blocking → alert · background result → toast · standing notice → banner region. Never a toast for a field error.
- Overlays: one decision → dialog · destructive confirm → alert-dialog naming object + consequence · side context → sheet (drawer on touch) · anything multi-section or legally weighty → full page.

## Verify before declaring done

Run screen-craft's §8 review pass literally: ladder-only gaps, one h1, squint test, one left spine, five states, focus visible by keyboard, **light AND dark checked at 375/768/1280**. Text ≥4.5:1, boundaries ≥3:1 — in this repo `pnpm gate` proves token pairs; anything hand-composed you verify yourself.

## Machine index

`llms.txt` (repo root or `https://pucar-design-system.vercel.app/llms.txt`) lists every token and installable component. The live gallery (`/`) and measured token lab (`/foundations`) are the review surfaces.
