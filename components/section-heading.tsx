type SectionHeadingProps = {
  en: string
  ja: string
  index?: string
  className?: string
}

export function SectionHeading({ en, ja, index, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        {index && (
          <span className="font-serif text-sm tracking-widest text-accent">
            {index}
          </span>
        )}
        <span className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.4em] text-muted-foreground">
          {en}
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <h2 className="mt-6 font-serif text-4xl font-medium leading-tight text-foreground text-balance md:text-5xl lg:text-6xl">
        {ja}
      </h2>
    </div>
  )
}
