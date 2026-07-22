import * as React from "react"

import { cn } from "@/lib/utils"

// Case progress as a vertical timeline (screen-craft §5): past = muted dot,
// current = brand dot with a soft halo, future = hollow dot. For the
// chronology of ONE matter — not a feed, not an activity log with actions
// (that's a list screen). Status at each step is words + dot, never colour alone.
//
// Craft notes: the rail is CONTINUOUS — item spacing lives inside the content
// column (pb), never on the <li>, so the connector always reaches the next dot.
// Dots are optically centred on the title's 24px line box.
function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function TimelineItem({
  className,
  status = "future",
  children,
  ...props
}: React.ComponentProps<"li"> & {
  /** past = done · current = where the case is now · future = not yet reached */
  status?: "past" | "current" | "future"
}) {
  return (
    <li
      data-slot="timeline-item"
      data-status={status}
      className={cn("group/timeline-item relative flex gap-4", className)}
      {...props}
    >
      {/* Rail column: fixed 12px width; the connector runs the full remaining
          height of the item, so it meets the next dot with no gap. */}
      <div aria-hidden="true" className="flex w-3 flex-col items-center">
        <div
          data-slot="timeline-dot"
          className={cn(
            "mt-1.5 size-3 shrink-0 rounded-full",
            status === "past" && "bg-muted-foreground",
            // Halo: brand-accent at low alpha (rings are exempt from the
            // alpha-fill ban) — brand-3 was invisible on a white card.
            status === "current" && "bg-primary ring-4 ring-brand-accent/25",
            // input (neutral-9) is the control-boundary grey — a hollow dot
            // must read as a boundary, and border (7) is too faint for 2px.
            status === "future" && "border-2 border-input bg-card"
          )}
        />
        <div className="mt-2 w-px flex-1 bg-border group-last/timeline-item:hidden" />
      </div>
      {/* Spacing between items lives HERE so the rail spans it. */}
      <div className="min-w-0 flex-1 pb-8 group-last/timeline-item:pb-0">
        {children}
      </div>
    </li>
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-title"
      className={cn(
        "text-body font-medium group-data-[status=future]/timeline-item:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function TimelineMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-meta"
      className={cn("mt-0.5 text-caption text-muted-foreground", className)}
      {...props}
    />
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("mt-2 text-body-compact text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Timeline, TimelineItem, TimelineTitle, TimelineMeta, TimelineContent }
