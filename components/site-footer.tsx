import { navLinks } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="bg-background py-20 md:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="font-serif text-2xl font-medium tracking-wide text-foreground">我妻農場</p>
        <p className="mt-2 font-sans text-[0.6rem] tracking-[0.4em] text-muted-foreground">
          AGATUMA&nbsp;FARM
        </p>

        <address className="prose-jp mt-8 font-sans text-sm not-italic text-muted-foreground">
          〒981-1525　宮城県角田市君萱字別当内42-1
        </address>

        <nav aria-label="フッターナビゲーション" className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <span className="mt-12 h-px w-10 bg-border" aria-hidden="true" />

        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="font-sans text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 我妻農場 AGATUMA FARM. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            Website by{' '}
            <a
              href="https://ratiolight.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-accent"
            >
              ratiolight.jp
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
