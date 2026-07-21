import * as React from "react"

import { cn } from "@/lib/utils"

// Key–value rows — the recurring "label left, value right" anatomy of preview
// summaries, scrutiny field panels, and detail asides (screen-craft §2 detail
// scaffold). Semantic <dl>: term muted in a fixed column, detail in `body`,
// hairline between rows. Use this instead of hand-rolled two-column divs so
// every consumer gets the same rhythm — and screen readers get real term/detail
// pairs.
//
//   <DescriptionList>
//     <DescriptionRow>
//       <DescriptionTerm>Full name</DescriptionTerm>
//       <DescriptionDetail>Prateek Agrawal</DescriptionDetail>
//     </DescriptionRow>
//   </DescriptionList>

function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  )
}

function DescriptionRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="description-row"
      className={cn(
        "grid grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(8rem,14rem)_1fr] sm:gap-4",
        className
      )}
      {...props}
    />
  )
}

// The label — quiet, so the data reads first (design law §Information design).
function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn("text-body-compact text-muted-foreground", className)}
      {...props}
    />
  )
}

function DescriptionDetail({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-detail"
      className={cn("min-w-0 text-body", className)}
      {...props}
    />
  )
}

export { DescriptionList, DescriptionRow, DescriptionTerm, DescriptionDetail }
