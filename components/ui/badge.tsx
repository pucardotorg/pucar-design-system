import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// THE one chip (ruling 2026-07-21: StatusPill merged in). Anatomy: 24px tall,
// pill-shaped, caption type. Status variants use the OPAQUE muted token pairs —
// gate-verified AA on any backdrop. Never alpha fills: bg-destructive/10
// measured 4.44:1 on --accent (hover), below the 4.5 floor.
const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 text-caption whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-[color-mix(in_oklch,var(--primary),black_8%)]",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-accent-strong",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        // Status chips — status colours mean status (design-guidelines §1).
        success: "bg-success-muted text-success-muted-foreground",
        warning: "bg-warning-muted text-warning-muted-foreground",
        info: "bg-info-muted text-info-muted-foreground",
        destructive:
          "bg-destructive-muted text-destructive-muted-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
