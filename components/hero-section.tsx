import Image from 'next/image'

export function HeroSection() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[100svh] overflow-hidden">
      {/* 画像を確実にフルカバーする */}
      <div className="absolute inset-0">
        <Image
          src="/captures/upper_2-46.jpg"
          alt="青空の下に広がる黄金色の田んぼ"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/25 to-foreground/55" />

      <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="font-sans text-[0.7rem] font-medium tracking-[0.45em] text-background/85">
          宮城県角田市 ・ 農家直販
        </p>
        <h1 className="mt-10 whitespace-nowrap font-serif text-[1.9rem] font-normal leading-[1.5] tracking-[0.12em] text-background min-[400px]:text-[2.1rem] sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="inline-block">一粒に、</span>
          <br />
          <span className="inline-block">この土地の四季を。</span>
        </h1>
        <p className="mt-10 max-w-xl font-sans text-sm leading-loose text-background/85 md:text-base">
          <span className="inline-block">水と土に恵まれた角田の地で、</span>
          <span className="inline-block">手間を惜しまず育てた一年。</span>
          <br className="hidden sm:block" />
          <span className="inline-block">農家からあなたの食卓へ、</span>
          <span className="inline-block">まっすぐにお届けします。</span>
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3">
        <span className="font-sans text-[0.6rem] tracking-[0.35em] text-background/70">SCROLL</span>
        <span className="h-12 w-px bg-background/50" aria-hidden="true" />
      </div>
    </section>
  )
}
