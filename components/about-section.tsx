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
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <SectionHeading en="About" ja="我妻農場について" />
        </FadeIn>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
              <Image
                src="/images/about-farm.png"
                alt="収穫したお米を両手で包む農家の手"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div>
              <p className="font-serif text-2xl font-bold leading-relaxed text-foreground text-balance md:text-3xl">
                安心・安全なお米を、
                <br />
                直接お届けします。
              </p>
              <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                我妻農場は、宮城県角田市で代々お米づくりを続けてきた農家です。
                自然の恵みと向き合いながら、手間を惜しまず育てたお米を、
                中間を通さず皆さまの食卓へ直接お届けしています。
                毎日の一膳が、少しでも豊かなものになりますように。
              </p>

              <ul className="mt-8 space-y-5">
                {points.map((p) => (
                  <li key={p.title} className="border-l-2 border-primary pl-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
