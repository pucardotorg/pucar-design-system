import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Progress indicator for MULTI-STEP flows (screen-craft §7: every citizen
// multi-step flow shows one). Steps are ordered — for parallel views of one
// object use tabs instead. The current step carries aria-current="step";
// complete steps show a check (state is icon + label, never colour alone).
//
// Craft notes: each gap renders as ONE continuous line, never two mismatched
// halves — an item's trailing half is teal only when the step is complete,
// its leading half whenever progress has REACHED it (complete or current),
// so colour can only change at the current→upcoming gap, where both halves
// are grey. The list has no gap of its own: the halves meet flush.
function Stepper({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="stepper"
      className={cn("flex items-start", className)}
      {...props}
    />
  )
}

function StepperItem({
  className,
  status = "upcoming",
  step,
  label,
  ...props
}: React.ComponentProps<"li"> & {
  /** complete = done · current = the step in progress · upcoming = not yet */
  status?: "complete" | "current" | "upcoming"
  /** 1-based step number, shown until the step completes */
  step: number
  label: string
}) {
  const reached = status === "complete" || status === "current"
  return (
    <li
      data-slot="stepper-item"
      data-status={status}
      aria-current={status === "current" ? "step" : undefined}
      className={cn("group/step flex flex-1 flex-col items-center gap-2", className)}
      {...props}
    >
      <div className="flex w-full items-center">
        <div
          className={cn(
            "h-0.5 flex-1 group-first/step:invisible",
            reached ? "bg-primary" : "bg-track"
          )}
        />
        <div
          className={cn(
            "mx-1 flex size-8 shrink-0 items-center justify-center rounded-full text-caption font-semibold transition-colors",
            status === "complete" && "bg-primary text-primary-foreground",
            status === "current" &&
              "bg-brand-muted text-brand-muted-foreground ring-2 ring-primary",
            status === "upcoming" && "border-2 border-track bg-card text-muted-foreground"
          )}
        >
          {status === "complete" ? <CheckIcon className="size-4" /> : step}
        </div>
        <div
          className={cn(
            "h-0.5 flex-1 group-last/step:invisible",
            status === "complete" ? "bg-primary" : "bg-track"
          )}
        />
      </div>
      <div
        className={cn(
          "max-w-28 text-center text-caption leading-4 text-balance",
          status === "current" ? "font-semibold text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </div>
    </li>
  )
}

export { Stepper, StepperItem }
