import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'

const points = [
  {
    title: '土づくりへのこだわり',
    body: '豊かな水と土に恵まれた角田の地で、健やかな稲を育てるための土づくりから丁寧に取り組んでいます。',
  },
  {
    title: '農家直送の鮮度',
    body: '収穫したお米を農家から直接お届け。精米したての新鮮な味わいをそのままご家庭へお運びします。',
  },
  {
    title: '安心・安全への想い',
    body: '家族に食べさせたいと思えるお米を。一粒ひとつぶに責任を持ってお届けしています。',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <FadeIn>
          <SectionHeading en="About" ja="我妻農場について" index="03" />
        </FadeIn>

        {/* 導入：非対称の大きな文章と写真 */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <p className="font-serif text-3xl font-medium leading-[1.5] text-foreground text-balance md:text-4xl lg:text-[2.75rem]">
              安心・安全なお米を、
              <br className="hidden sm:block" />
              まっすぐ食卓へ。
            </p>
            <p className="prose-jp mt-8 max-w-xl font-sans text-base text-muted-foreground text-pretty">
              我妻農場は、宮城県角田市で代々お米づくりを続けてきた農家です。
              自然の恵みと向き合いながら、手間を惜しまず育てたお米を、
              中間を通さず皆さまの食卓へ直接お届けしています。
              毎日の一膳が、少しでも豊かなものになりますように。
            </p>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/about-farm.png"
                alt="収穫したお米を両手で包む農家の手"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        {/* 3つの約束：番号付きエディトリアルリスト */}
        <div className="mt-20 border-t border-border md:mt-28">
          <div className="grid gap-px md:grid-cols-3">
            {points.map((p, i) => (
              <FadeIn as="div" key={p.title} delay={i * 120}>
                <div className="border-b border-border py-10 md:border-b-0 md:pr-8 md:pt-12">
                  <span className="font-serif text-sm tracking-widest text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-medium text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
