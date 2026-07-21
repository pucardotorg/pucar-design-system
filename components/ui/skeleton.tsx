import { cn } from "@/lib/utils"

// Loading placeholder that MIRRORS the final layout (same heights, same
// grid) — no layout jump when content lands. Whole-page loading is skeletons,
// never a bare centered spinner.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
