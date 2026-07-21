import * as React from "react"

import { cn } from "@/lib/utils"

// data-prefilled="true" — machine-read, human-unverified value (OCR / fetch-details).
// Amber `prefilled` FILL only; the border stays `input` so the 3:1 boundary holds.
// The state is never colour alone: pair it with the section-level "we've pre-filled
// some details" callout and a click-through to the value's source document. Clear
// the attribute when the user edits or verifies (focus already lifts the tint).
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-[prefilled=true]:bg-prefilled data-[prefilled=true]:focus-visible:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export { Input }
