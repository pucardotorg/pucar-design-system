# Changelog

All user-visible changes to the Pucar · ON Court design system. Newest first.

## 2026-07-21

### Added
- **`prefilled` token** — the fill for machine-read, human-unverified field values (amber, snapped to `warning-2`; fill only, border stays `input` for the 3:1 boundary). `Input` now styles `data-prefilled="true"`; focus lifts the tint. Decided against a new hue (DECISIONS.md 2026-07-21).
- **`destructive-muted` / `destructive-muted-foreground`** — completes the muted-status set (success/warning/info already existed); needed for scrutiny flags and removable filter chips. Step-11 foreground clears AA in both themes.
- **`description-list`** — semantic key–value rows (label muted left, value right, hairline dividers) for preview summaries, scrutiny field panels, and detail asides.
- **`document-slot`** — the e-filing upload anatomy: filled (sunken well, thumbnail, quality pill), empty (dashed boundary, required mark / Optional chip, "+ Choose file"), processing.
- **Gallery:** "Documents & provenance" section; prefilled-field example under the form pattern.

### Changed
- **Sidebar selection is now the brand tint** (`--sidebar-accent` → `brand-3`, foreground → engineered `--brand-tint-foreground`, 5.83:1 light / 8.07:1 dark). Ruling: selection = persistent location = brand tint; hover = transient = grey. Light `brand-11` failed AA on the tint (4.10:1), hence the engineered pair.
- **Neutral temperature ruled: cool stays** (`NEUTRAL = "slate"`), after a side-by-side warm/cool port of the upload screen. "Clinical, instrument."
- Gate grows three pairs (prefilled ×2, destructive-muted) — now 23 pairs × 2 themes.

## 2026-07-06

### Added
- **Every ui component now ships through the registry** as a `registry:ui` item (auto-generated — the build scans `components/ui/`, reads npm + internal deps from each file's imports, and points internal deps at this registry's own URLs). Consumers now get the *Pucar* button/input/etc., not stock shadcn with the same name.
- **Four new components:** `field` (standardized form anatomy — label above, caption hint, destructive-plus-text error, aria wiring), `button-group` (segmented action cluster — activates the `in-data-[slot=button-group]` styles button.tsx already carried), `empty` (canonical empty state per screen-craft §2), `spinner` (in-context pending states only; pages load with skeletons).
- **Gallery sections** for status/solid button variants (previously undocumented), button-group, field, empty states, and in-button pending.
- **Release stamping:** the registry build refuses to run without a dated `CHANGELOG.md` entry and stamps the release date into item descriptions.
- **Component intake ritual** in `CONTRIBUTING.md` (justify role → port → theme with tokens → gallery → auto-distribute → changelog → PR), plus a deferred-decisions log.

### Fixed
- **`bg-surface-sunken` was silently broken in consumer apps** — the `@theme` mapping was missing from the registry's `cssVars.theme` (a hand-appended list in the generator remembered `brand-accent`, forgot `surface-sunken`). Mappings are now derived from `SEMANTIC_REFS + SOLID_FOREGROUND_TOKENS + UTILITY_PRIMITIVES` — one list, no hand-appends.
- **The AA gate now also checks utility-mapping completeness** — every public token must have a `--color-*` mapping in globals.css' `@theme inline`, and every mapping must point at a token that actually exists. The surface-sunken bug class is now mechanically caught.
- Placeholder-only textarea in the scrutiny flag composer got an `aria-label`.

### Deferred (explicit — see CONTRIBUTING.md § Deferred decisions)
- 44px touch targets (visual implication unassessed) and Indic font fallbacks (font decision pending).

## 2026-07-02

### Fixed
- **Registry now ships the full theme API.** `pucar-theme` includes `cssVars.theme` (82 mappings): status colour utilities (`bg-success`, `bg-warning-muted`, …), surface vocabulary (`bg-surface-sunken`, `bg-track`), the type scale (`text-caption`…`text-display` with line-heights/weights), elevation (`shadow-raised/overlay/modal`), the radius scale, and `font-heading`. Previously consumers received the variables but none of the utility mappings — non-stock utilities silently resolved to nothing in consumer apps.
- **`--brand-accent` self-reference.** The semantic layer re-declared `brand-accent` as `var(--brand-accent)` (a cycle → invalid CSS), which broke the token in light mode. Removed; the primitive is the single declaration.
- **Registry drift.** Published `accent` was `neutral-5`; the source of truth says `neutral-4`. Regenerated; the pipeline change below prevents recurrence.

### Changed
- **`pnpm tokens` is now the whole pipeline:** AA gate → CSS → registry → `shadcn build`. CSS and registry can no longer drift apart.
- **Type scale + elevation `@theme` block is now generated** from `TYPE`/`SHADOWS` in `tokens.ts` (was hand-authored in `globals.css`).

### Added
- **AA contrast gate** (`lib/tokens/gate.ts`): 20 semantic fg/bg pairs × 2 themes + input boundary (3:1) + var-cycle check. Fails the build below AA.
- `CONTRIBUTING.md` (operating model), PR template, CI workflow (gate + generated-file drift check).

### Removed
- **`--sp-1..32` and `--nudge` spacing tokens** — they were emitted but mapped to nothing, so editing them changed nothing. The 4px/8px grid is Tailwind's default spacing scale; the grid remains design law via `design-guidelines.md`.
