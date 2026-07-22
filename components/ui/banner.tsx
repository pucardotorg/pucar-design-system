import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Full-width standing notice that LOADS WITH THE PAGE (Carbon's callout
// semantics): it is information, not feedback — not triggered by an action,
// not dismissible by default, always present while the condition holds
// ("Hearing adjourned to 14 Aug", "Scrutiny in read-only mode"). Feedback on
// an action -> alert (contextual) or toast (background).
//
// ALWAYS pass an icon — the tint alone is colour-alone (law). The 3px status
// rule on the left anchors the hue for colour-blind scanning (Carbon's
// pattern); it is a status mark, not decoration.
const bannerVariants = cva(
  "flex w-full items-center gap-2.5 border-l-3 px-4 py-3 text-body-compact [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        info: "border-info-ink bg-info-muted text-info-muted-foreground",
        warning: "border-warning-ink bg-warning-muted text-warning-muted-foreground",
        success: "border-success-ink bg-success-muted text-success-muted-foreground",
        neutral: "border-input bg-surface-sunken text-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

function Banner({
  className,
  variant = "info",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bannerVariants>) {
  return (
    <div
      data-slot="banner"
      data-variant={variant}
      role="status"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * Trailing action — an inline link in the banner's own ink, pushed to the end.
 * Renders its child styled as underlined text (a grey button hover on a tinted
 * strip reads as mud; the link affordance stays in-hue).
 */
function BannerAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-action"
      className={cn(
        "ml-auto shrink-0 *:[a,button]:font-medium *:[a,button]:underline *:[a,button]:underline-offset-4 *:[a,button]:transition-opacity *:[a,button]:hover:opacity-80",
        className
      )}
      {...props}
    />
  )
}

export { Banner, BannerAction }
