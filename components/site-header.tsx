'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site-data'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[86rem] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className={`group flex items-baseline gap-3 transition-colors ${
            scrolled ? 'text-foreground' : 'text-background'
          }`}
        >
          <span className="font-serif text-2xl font-medium tracking-wide">我妻農場</span>
          <span
            className={`hidden text-[0.6rem] font-medium tracking-[0.4em] sm:inline ${
              scrolled ? 'text-muted-foreground' : 'text-background/70'
            }`}
          >
            AGATUMA&nbsp;FARM
          </span>
        </a>

        <nav aria-label="メインナビゲーション" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative font-sans text-[0.8rem] tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                    scrolled
                      ? 'text-foreground/75 hover:text-foreground'
                      : 'text-background/85 hover:text-background'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`flex size-11 items-center justify-center rounded-sm transition-colors md:hidden ${
            open || scrolled
              ? 'text-foreground hover:bg-secondary'
              : 'text-background hover:bg-background/10'
          }`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`fixed inset-0 top-20 bg-background transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <nav aria-label="モバイルナビゲーション" className="px-8 py-10">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-border/60 py-5 transition-colors hover:text-accent"
                  >
                    <span className="font-serif text-xs text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-2xl text-foreground">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
