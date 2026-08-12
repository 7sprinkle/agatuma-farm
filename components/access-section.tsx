import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'

const info = [
  {
    label: '所在地',
    en: 'Address',
    value: (
      <>
        〒981-1525
        <br />
        宮城県角田市君萱字別当内42-1
      </>
    ),
  },
  {
    label: '電話番号',
    en: 'Tel',
    value: <>0224-00-0000（受付 9:00〜17:00）</>,
  },
  {
    label: '営業時間',
    en: 'Hours',
    value: (
      <>
        9:00〜17:00
        <br />
        定休日：日曜・祝日
      </>
    ),
  },
  {
    label: 'お車でお越しの場合',
    en: 'By Car',
    value: <>東北自動車道 白石ICより約20分。駐車場を完備しています。</>,
  },
  {
    label: '最寄り駅',
    en: 'By Train',
    value: <>阿武隈急行「角田駅」よりお車で約15分。</>,
  },
]

export function AccessSection() {
  const mapQuery = encodeURIComponent('宮城県角田市君萱字別当内42-1')

  return (
    <section id="access" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <FadeIn>
          <SectionHeading en="Access" ja="アクセス" index="04" />
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <FadeIn>
            <dl className="border-t border-border">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 gap-1 border-b border-border py-6 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="flex items-baseline gap-3">
                    <span className="font-serif text-base font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="font-sans text-[0.6rem] tracking-[0.25em] text-accent">
                      {item.en}
                    </span>
                  </dt>
                  <dd className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden border border-border lg:aspect-auto lg:h-full lg:min-h-[26rem]">
              <iframe
                title="我妻農場の地図"
                src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                className="size-full min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
