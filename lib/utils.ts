import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// tailwind-merge must be taught the Pucar type scale. Without this it can't
// tell `text-caption` (a font-size) from `text-primary-foreground` (a colour),
// assumes both are colours, and SILENTLY DROPS the type token when a colour
// class follows it — which is how Badge lost its caption sizing (2026-07-21).
// Keep this list in sync with TYPE in lib/tokens/tokens.ts.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "display-s",
            "title-l",
            "title",
            "title-s",
            "body",
            "body-compact",
            "caption",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
