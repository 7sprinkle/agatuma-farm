import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  en: string
  ja: string
  intro?: ReactNode
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
          'mt-5 font-serif text-[1.75rem] font-medium leading-[1.4] tracking-[0.08em] text-balance sm:mt-6 sm:text-3xl md:text-4xl lg:text-[2.75rem]',
          heading,
        )}
      >
        {ja}
      </h2>
      <span className="mt-7 h-px w-10 bg-accent sm:mt-8" aria-hidden="true" />
      {intro && (
        <p className={cn('prose-jp mt-6 max-w-lg font-sans text-sm leading-[1.9] text-pretty sm:mt-7 md:mt-8', body)}>{intro}</p>
      )}
    </div>
  )
}
