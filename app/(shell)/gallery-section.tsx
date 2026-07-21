import * as React from "react"

/**
 * Shared section shell for the gallery pages.
 *
 * Uses the Pucar type tokens (`title-s`, `body-compact`) rather than raw
 * Tailwind sizes — the gallery has to obey the system it demonstrates.
 */
export function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-title-s">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-body-compact text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="rounded-xl border bg-card p-6 text-card-foreground">
        {children}
      </div>
    </section>
  )
}

/** A labelled row of specimens inside a Section. */
export function Row({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      {label ? (
        <div className="text-caption text-muted-foreground">{label}</div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
