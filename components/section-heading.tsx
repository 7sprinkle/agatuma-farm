import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  en: string
  ja: string
  intro?: string
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({ en, ja, intro, tone = 'dark', className }: SectionHeadingProps) {
  const kicker = tone === 'light' ? 'text-background/70' : 'text-accent'
  const heading = tone === 'light' ? 'text-background' : 'text-foreground'
  const body = tone === 'light' ? 'text-background/75' : 'text-muted-foreground'

  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <span className={cn('font-sans text-[0.7rem] font-medium uppercase tracking-[0.45em]', kicker)}>
        {en}
      </span>
      <h2
        className={cn(
          'mt-6 font-serif text-3xl font-medium leading-[1.4] tracking-[0.08em] text-balance md:text-4xl lg:text-[2.75rem]',
          heading,
        )}
      >
        {ja}
      </h2>
      <span className="mt-8 h-px w-10 bg-accent" aria-hidden="true" />
      {intro && (
        <p className={cn('prose-jp mt-8 max-w-xl font-sans text-sm text-pretty', body)}>{intro}</p>
      )}
    </div>
  )
}
