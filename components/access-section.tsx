import { MapPin, Phone, Clock, Car, Train } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'

const info = [
  {
    icon: MapPin,
    label: '所在地',
    value: (
      <>
        〒981-1525
        <br />
        宮城県角田市君萱字別当内42-1
      </>
    ),
  },
  {
    icon: Phone,
    label: '電話番号',
    value: <>0224-00-0000（受付 9:00〜17:00）</>,
  },
  {
    icon: Clock,
    label: '営業時間',
    value: (
      <>
        9:00〜17:00
        <br />
        定休日：日曜・祝日
      </>
    ),
  },
]

export function AccessSection() {
  const mapQuery = encodeURIComponent('宮城県角田市君萱字別当内42-1')

  return (
    <section id="access" className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <SectionHeading en="Access" ja="アクセス" />
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col justify-center gap-6">
              {info.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 font-sans text-base leading-relaxed text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-2 grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Car className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-serif text-sm font-semibold text-foreground">
                      お車でお越しの場合
                    </p>
                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                      東北自動車道 白石ICより約20分。駐車場を完備しています。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Train className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-serif text-sm font-semibold text-foreground">
                      最寄り駅
                    </p>
                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                      阿武隈急行「角田駅」よりお車で約15分。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border shadow-sm lg:aspect-auto lg:h-full">
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
