import Image from 'next/image'

export function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/hero-ricefield.png"
        alt="夕暮れの黄金色に実った田んぼと稲穂"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/25 to-foreground/60" />

      <div className="relative mx-auto flex min-h-screen max-w-[86rem] flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28">
        <div className="max-w-4xl">
          <p className="mb-8 font-sans text-xs font-medium tracking-[0.4em] text-background/90">
            宮城県角田市 ・ 農家直販
          </p>
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.15] text-background text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            一粒に、
            <br />
            この土地の四季を。
          </h1>
          <p className="mt-10 max-w-lg font-sans text-base leading-relaxed text-background/85 text-pretty md:text-lg">
            水と土に恵まれた角田の地で、手間を惜しまず育てた一年。
            我妻農場のお米を、農家からあなたの食卓へ、まっすぐにお届けします。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <a
              href="#service"
              className="group inline-flex items-center gap-3 font-sans text-sm tracking-wide text-background transition-colors"
            >
              <span className="h-px w-10 bg-background/60 transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
              お米を見る
            </a>
            <a
              href="#form"
              className="group inline-flex items-center gap-3 font-sans text-sm tracking-wide text-background/80 transition-colors hover:text-background"
            >
              ご注文・お問い合わせ
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-6 hidden items-center gap-3 md:right-10 md:flex">
        <span className="font-sans text-[0.65rem] tracking-[0.3em] text-background/70">
          SCROLL
        </span>
        <span className="h-12 w-px bg-background/50" aria-hidden="true" />
      </div>
    </section>
  )
}
