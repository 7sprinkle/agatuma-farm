type SectionHeadingProps = {
  en: string
  ja: string
  align?: 'left' | 'center'
}

export function SectionHeading({ en, ja, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-accent">
        {en}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
        {ja}
      </h2>
      <span
        className={`mt-5 block h-px w-16 bg-primary ${align === 'center' ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
    </div>
  )
}
