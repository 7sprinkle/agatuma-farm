import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <Image
        src="/images/hero-ricefield.png"
        alt="夕暮れの黄金色に実った田んぼと稲穂"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* 可読性のためのオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-foreground/10" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-32 md:px-8">
        <div className="max-w-xl">
          <p className="mb-5 font-sans text-sm font-medium tracking-[0.25em] text-background/90">
            宮城県角田市・農家直販
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-background text-balance sm:text-5xl md:text-6xl">
            田んぼから、
            <br />
            あなたの食卓へ。
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-background/90 md:text-lg text-pretty">
            我妻農場の新鮮なお米を、農家から直接お届けします。
            白米・玄米を各種サイズで販売中です。
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#service"
              className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3.5 font-sans text-sm font-bold text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
            >
              商品を見る
            </a>
            <a
              href="#form"
              className="inline-flex items-center justify-center rounded-md border border-background/60 bg-background/10 px-8 py-3.5 font-sans text-sm font-bold text-background backdrop-blur-sm transition-colors hover:bg-background/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
            >
              ご注文・お問い合わせ
            </a>
          </div>
        </div>
      </div>

      <a
        href="#news"
        aria-label="次のセクションへスクロール"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/80 transition-colors hover:text-background"
      >
        <ChevronDown className="size-8 animate-bounce" />
      </a>
    </section>
  )
}
