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
    body: '収穫したお米を農家から直接お届け。精米したての新鮮な味わいを、そのままご家庭へお運びします。',
  },
  {
    title: '安心・安全への想い',
    body: '家族に食べさせたいと思えるお米を。一粒ひとつぶに責任を持ってお届けしています。',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <SectionHeading en="About" ja="我妻農場について" />
        </FadeIn>

        <FadeIn delay={80}>
          <p className="mx-auto mt-16 max-w-xl text-center font-serif text-2xl font-medium leading-[1.7] text-foreground text-balance md:text-3xl">
            安心・安全なお米を、
            <br />
            まっすぐ食卓へ。
          </p>
        </FadeIn>
      </div>

      {/* 写真は本文よりやや広く */}
      <FadeIn delay={120} className="mx-auto mt-16 max-w-4xl px-6">
        <div className="group relative aspect-[16/10] overflow-hidden">
          <Image
            src="/images/about-farm.png"
            alt="収穫したお米を両手で包む農家の手"
            fill
            sizes="(max-width: 1024px) 100vw, 56rem"
            className="img-zoom object-cover"
          />
        </div>
      </FadeIn>

      <div className="mx-auto mt-16 max-w-2xl px-6">
        <FadeIn>
          <p className="prose-jp mx-auto max-w-xl text-center font-sans text-base text-muted-foreground text-pretty">
            我妻農場は、宮城県角田市で代々お米づくりを続けてきた農家です。
            自然の恵みと向き合いながら、手間を惜しまず育てたお米を、
            中間を通さず皆さまの食卓へ直接お届けしています。
            毎日の一膳が、少しでも豊かなものになりますように。
          </p>
        </FadeIn>

        {/* 3つの約束：中央・罫線区切り */}
        <div className="mt-20 border-t border-border">
          {points.map((p, i) => (
            <FadeIn as="div" key={p.title} delay={i * 100}>
              <div className="border-b border-border py-12 text-center">
                <h3 className="font-serif text-xl font-medium text-foreground md:text-2xl">
                  {p.title}
                </h3>
                <p className="prose-jp mx-auto mt-4 max-w-md font-sans text-sm text-muted-foreground text-pretty">
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
