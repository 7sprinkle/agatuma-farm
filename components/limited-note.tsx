import { cn } from '@/lib/utils'

type LimitedNoteProps = {
  tone?: 'dark' | 'light'
  className?: string
}

export function LimitedNote({ tone = 'dark', className }: LimitedNoteProps) {
  const line = tone === 'light' ? 'bg-background/30' : 'bg-foreground/20'
  const text = tone === 'light' ? 'text-background/80' : 'text-foreground/70'

  return (
    <div className={cn('flex flex-col items-center gap-5 text-center', className)}>
      <span className={cn('h-px w-8', line)} aria-hidden="true" />
      <p className={cn('font-serif text-[0.8rem] leading-[2.1] tracking-[0.12em] md:text-sm', text)}>
        <span className="inline-block">この一年が実らせた分だけを、</span>
        <span className="inline-block">お届けします。</span>
        <br />
        <span className="inline-block">数に限りがございますので、</span>
        <span className="inline-block">なくなり次第</span>
        <span className="inline-block">終了とさせていただきます。</span>
      </p>
    </div>
  )
}
