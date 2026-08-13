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
      <div className="mx-auto max-w-2xl px-6">
        <FadeIn>
          <SectionHeading en="Access" ja="アクセス" />
        </FadeIn>

        <dl className="mt-16 border-t border-border">
          {info.map((item, i) => (
            <FadeIn as="div" key={item.label} delay={i * 70}>
              <div className="flex flex-col items-center gap-2 border-b border-border py-8 text-center">
                <dt className="flex items-baseline gap-3">
                  <span className="font-serif text-base font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="font-sans text-[0.6rem] tracking-[0.25em] text-accent">
                    {item.en}
                  </span>
                </dt>
                <dd className="prose-jp font-sans text-sm text-muted-foreground">{item.value}</dd>
              </div>
            </FadeIn>
          ))}
        </dl>
      </div>

      {/* 地図は本文より広く */}
      <FadeIn className="mx-auto mt-16 max-w-5xl px-6">
        <div className="relative aspect-[16/9] overflow-hidden border border-border">
          <iframe
            title="我妻農場の地図"
            src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
            className="size-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </FadeIn>
    </section>
  )
}
