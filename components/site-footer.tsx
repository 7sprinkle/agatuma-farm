import { navLinks } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-2xl font-bold">我妻農場</p>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-primary-foreground/80">
              宮城県角田市の農家直販。
              丹精込めて育てたお米を、食卓へ直接お届けします。
            </p>
            <address className="mt-4 font-sans text-sm not-italic leading-relaxed text-primary-foreground/80">
              〒981-1525
              <br />
              宮城県角田市君萱字別当内42-1
            </address>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-primary-foreground/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-primary-foreground/70">
            &copy; {new Date().getFullYear()} 我妻農場 AGATUMA FARM. All rights reserved.
          </p>
          <p className="font-sans text-xs text-primary-foreground/70">
            Website by{' '}
            <a
              href="https://ratiolight.jp"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-primary-foreground"
            >
              ratiolight.jp
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
