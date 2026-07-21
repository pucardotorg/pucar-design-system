"use client"

import * as React from "react"

/**
 * Live contrast measurement for the foundations page.
 *
 * The AA gate in `lib/tokens/gate.ts` proves its pair list at build time from
 * the source values. This measures what the browser ACTUALLY resolved — after
 * var() indirection, theme flips, and any hand-edit that slipped past the gate.
 * If the two ever disagree, the gate's pair list is missing something.
 */

// ── What's under audit ──────────────────────────────────────────

/** Text pairs — WCAG 1.4.3, must clear 4.5:1. */
export const TEXT_PAIRS = [
  ["Body text on page", "--foreground", "--background"],
  ["Muted text on page", "--muted-foreground", "--background"],
  ["Muted text on card", "--muted-foreground", "--card"],
  ["Muted text in a sunken well", "--muted-foreground", "--surface-sunken"],
  ["Primary button label", "--primary-foreground", "--primary"],
  ["Secondary button label", "--secondary-foreground", "--secondary"],
  ["Hover / selection label", "--accent-foreground", "--accent"],
  ["Success solid label", "--success-foreground", "--success"],
  ["Info solid label", "--info-foreground", "--info"],
  ["Warning solid label", "--warning-foreground", "--warning"],
  ["Destructive solid label", "--destructive-foreground", "--destructive"],
  ["Success pill", "--success-muted-foreground", "--success-muted"],
  ["Info pill", "--info-muted-foreground", "--info-muted"],
  ["Warning pill", "--warning-muted-foreground", "--warning-muted"],
  ["Destructive pill", "--destructive-muted-foreground", "--destructive-muted"],
  ["Sidebar text", "--sidebar-foreground", "--sidebar"],
  ["Sidebar selected item", "--sidebar-accent-foreground", "--sidebar-accent"],
  ["Text on a prefilled field", "--foreground", "--prefilled"],
  ["Engaged state label", "--accent-foreground", "--accent-strong"],
  ["Secondary text when engaged", "--muted-foreground", "--accent-strong"],
  ["Identity tile monogram", "--brand-muted-foreground", "--brand-muted"],
  ["Success ink on page", "--success-ink", "--background"],
  ["Warning ink on page", "--warning-ink", "--background"],
  ["Info ink on page", "--info-ink", "--background"],
  ["Destructive ink on page", "--destructive-ink", "--background"],
  ["Warning ink in a well", "--warning-ink", "--surface-sunken"],
  ["Info ink in a well", "--info-ink", "--surface-sunken"],
] as const

/**
 * WCAG 1.4.11 governs boundaries needed to IDENTIFY a control — must clear
 * 3:1. A decorative hairline or a surface fill is exempt; those live in
 * SEPARATION_PAIRS and are measured rather than graded.
 */
export const BOUNDARY_PAIRS = [
  ["Field boundary on card", "--input", "--card"],
  ["Field boundary on page", "--input", "--background"],
  ["Focus ring on page", "--ring", "--background"],
  ["Focus ring on card", "--ring", "--card"],
] as const

/**
 * Not WCAG-regulated — large-area fills and dividers read at far lower ratios
 * than text or controls. The standard here is the design law's own promise
 * ("surface-sunken separates on a white card on its own, no border"), which
 * only the eye can settle. Shown as measurements, never as verdicts.
 */
export const SEPARATION_PAIRS = [
  ["Sunken well on a card", "--surface-sunken", "--card"],
  ["Control track on a card", "--track", "--card"],
  ["Card hairline on the page", "--border", "--background"],
  ["Sidebar hairline", "--sidebar-border", "--sidebar"],
] as const

export const FAMILIES = [
  "neutral",
  "brand",
  "success",
  "info",
  "warning",
  "destructive",
] as const

export const STEPS = Array.from({ length: 12 }, (_, i) => i + 1)

const AUDITED_TOKENS = [
  ...new Set([
    ...TEXT_PAIRS.flatMap(([, fg, bg]) => [fg, bg]),
    ...BOUNDARY_PAIRS.flatMap(([, fg, bg]) => [fg, bg]),
    ...SEPARATION_PAIRS.flatMap(([, fg, bg]) => [fg, bg]),
    ...FAMILIES.flatMap((f) => STEPS.map((s) => `--${f}-${s}`)),
  ]),
]

// ── Contrast maths ──────────────────────────────────────────────

export type Rgb = [number, number, number]

function parseRgb(value: string): Rgb | null {
  const m = value.match(/-?[\d.]+/g)
  if (!m || m.length < 3) return null
  return [Number(m[0]), Number(m[1]), Number(m[2])]
}

function relativeLuminance([r, g, b]: Rgb) {
  const lin = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]
}

export function contrast(a: Rgb, b: Rgb) {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

// ── The measurement store ───────────────────────────────────────
// Modelled as an external store (the DOM *is* the external system here) so the
// page never has to setState from an effect to stay in sync with the theme.

export interface Measurement {
  theme: "light" | "dark"
  /** Token name → resolved sRGB, painted onto a probe and read back. */
  resolved: Record<string, Rgb>
  /** Token name → the authored value on :root (the hex). */
  values: Record<string, string>
}

const EMPTY: Measurement = { theme: "light", resolved: {}, values: {} }

let snapshot: Measurement | null = null
const listeners = new Set<() => void>()
let observer: MutationObserver | null = null

function measure(): Measurement {
  const probe = document.createElement("div")
  probe.style.position = "fixed"
  probe.style.pointerEvents = "none"
  probe.style.opacity = "0"
  document.body.appendChild(probe)

  const rootStyles = getComputedStyle(document.documentElement)
  const resolved: Record<string, Rgb> = {}
  const values: Record<string, string> = {}

  for (const name of AUDITED_TOKENS) {
    probe.style.backgroundColor = `var(${name})`
    const rgb = parseRgb(getComputedStyle(probe).backgroundColor)
    if (rgb) resolved[name] = rgb
    values[name] = rootStyles.getPropertyValue(name).trim()
  }

  document.body.removeChild(probe)

  return {
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    resolved,
    values,
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)

  if (!observer) {
    observer = new MutationObserver(() => {
      snapshot = null // theme flipped — re-measure on next read
      for (const listener of listeners) listener()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
  }

  return () => {
    listeners.delete(onChange)
    if (listeners.size === 0) {
      observer?.disconnect()
      observer = null
    }
  }
}

/** Identity is stable until the theme changes, which is what keeps React calm. */
function getSnapshot(): Measurement {
  if (!snapshot) snapshot = measure()
  return snapshot
}

function getServerSnapshot(): Measurement {
  return EMPTY
}

/**
 * The audit, re-measured whenever the theme class on <html> changes.
 * Returns EMPTY on the server and on the first client render, so markup
 * matches across hydration.
 */
export function useTokenMeasurement(): Measurement {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
