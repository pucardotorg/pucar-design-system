"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Document slot — the upload anatomy from the e-filing flow (one slot per
// expected document). Three states, one grammar:
//
//   filled      thumbnail · title · filename+size · quality pill · actions
//   empty       dashed boundary · title (+ required mark / Optional chip) ·
//               one-line description · "+ Choose file"
//   processing  like filled, with an in-slot progress line ("Reading document…")
//
// Depth follows the law: a filled slot is a nested well → `surface-sunken`,
// NO border of its own. The empty slot is the exception the law names — a
// slot defined *by* its (dashed) boundary. Quality verdicts pair icon + word
// ("✓ Good", "⚠ Poor scan") — never colour alone.

const documentSlotVariants = cva("flex items-center gap-4 rounded-lg p-4", {
  variants: {
    variant: {
      filled: "bg-surface-sunken",
      processing: "bg-surface-sunken",
      empty:
        "cursor-pointer border border-dashed border-input transition-colors hover:border-primary/50 hover:bg-primary/3 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    },
  },
  defaultVariants: {
    variant: "empty",
  },
})

function DocumentSlot({
  className,
  variant = "empty",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof documentSlotVariants>) {
  return (
    <div
      data-slot="document-slot"
      data-variant={variant}
      className={cn(documentSlotVariants({ variant }), className)}
      {...props}
    />
  )
}

// Thumbnail frame for filled slots (put an <img> or file-type placeholder in
// it), or a bare muted icon for empty slots.
const documentSlotMediaVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    variant: {
      // Chips/thumbnails are defined BY a border (the law's stated exception).
      thumbnail:
        "relative h-18 w-24 overflow-hidden rounded-md border border-border bg-background",
      icon: "text-muted-foreground [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    variant: "thumbnail",
  },
})

function DocumentSlotMedia({
  className,
  variant = "thumbnail",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof documentSlotMediaVariants>) {
  return (
    <div
      data-slot="document-slot-media"
      data-variant={variant}
      className={cn(documentSlotMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function DocumentSlotContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="document-slot-content"
      className={cn("min-w-0 flex-1 space-y-0.5", className)}
      {...props}
    />
  )
}

function DocumentSlotTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="document-slot-title"
      className={cn("flex items-center gap-2 text-body font-medium", className)}
      {...props}
    />
  )
}

// Required marker — the asterisk carries a sr-only word so it's never symbol-alone.
function DocumentSlotRequired({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="document-slot-required" className={className} {...props}>
      <span aria-hidden="true" className="font-semibold text-destructive-ink">
        *
      </span>
      <span className="sr-only">Required</span>
    </span>
  )
}

// Filename · size, or the slot's one-line "what goes here" description.
// Descriptions WRAP (they're content); add `truncate` only for filenames,
// whose full value survives in the preview/detail (deliberate truncation,
// screen-craft §6 edge kit).
function DocumentSlotMeta({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="document-slot-meta"
      className={cn("text-body-compact text-muted-foreground", className)}
      {...props}
    />
  )
}

// Right-aligned cluster: quality pill, Choose file, Re-upload, Delete.
function DocumentSlotActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="document-slot-actions"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  DocumentSlot,
  DocumentSlotActions,
  DocumentSlotContent,
  DocumentSlotMedia,
  DocumentSlotMeta,
  DocumentSlotRequired,
  DocumentSlotTitle,
}
