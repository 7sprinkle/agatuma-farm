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

      <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="relative isolate flex flex-col items-center">
          <div
            className="pointer-events-none absolute -inset-x-10 -inset-y-14 -z-10 rounded-[50%] bg-foreground/45 blur-3xl md:-inset-x-20 md:-inset-y-20"
            aria-hidden="true"
          />
          <p className="font-sans text-[0.7rem] font-medium tracking-[0.45em] text-background/90">
            宮城県角田市 ・ 農家直販
          </p>
          <h1 className="mt-10 font-serif text-[2.5rem] font-normal leading-[1.4] tracking-[0.12em] text-background text-balance sm:text-6xl md:text-7xl">
            一粒に、
            <br />
            この土地の四季を。
          </h1>
          <p className="mt-10 max-w-md font-sans text-sm leading-loose text-background/90 text-pretty md:text-base">
            水と土に恵まれた角田の地で、手間を惜しまず育てた一年。
            農家からあなたの食卓へ、まっすぐにお届けします。
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3">
        <span className="font-sans text-[0.6rem] tracking-[0.35em] text-background/70">SCROLL</span>
        <span className="h-12 w-px bg-background/50" aria-hidden="true" />
      </div>
    </section>
  )
}
