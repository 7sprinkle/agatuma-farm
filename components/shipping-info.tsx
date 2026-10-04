'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { shippingRegions, shippingWeights, yen } from '@/lib/shipping'
import { FadeIn } from '@/components/fade-in'

export function ShippingInfo() {
  const selectId = useId()
  const [regionName, setRegionName] = useState(shippingRegions[0].name)
  const region = shippingRegions.find((r) => r.name === regionName) ?? shippingRegions[0]

  return (
    <FadeIn className="mx-auto mt-20 max-w-2xl md:mt-24">
      <section
        aria-labelledby={`${selectId}-heading`}
        className="border-y border-border py-8 md:py-10"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-[0.6rem] tracking-[0.4em] text-accent">送料 ・ SHIPPING</p>
            <h3
              id={`${selectId}-heading`}
              className="mt-3 font-serif text-lg font-medium tracking-[0.08em] text-foreground"
            >
              地域別の送料
            </h3>
          </div>

          <div className="flex flex-col gap-2 sm:w-56">
            <label htmlFor={selectId} className="font-sans text-xs text-muted-foreground">
              お届け先の地域
            </label>
            <div className="relative">
              <select
                id={selectId}
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
                className="w-full appearance-none border-0 border-b border-border bg-transparent py-2 pr-8 font-serif text-base text-foreground transition-colors focus:border-primary focus:outline-none focus-visible:ring-0"
              >
                {shippingRegions.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {region.prefectures.length > 1 && (
          <p className="mt-5 font-sans text-xs leading-relaxed text-muted-foreground">
            {region.prefectures.map((p) => p.replace(/[都府県]$/, '')).join('・')}
          </p>
        )}

        <dl
          aria-live="polite"
          className="mt-6 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-6"
        >
          {shippingWeights.map((w) => (
            <div key={w} className="flex flex-col gap-1">
              <dt className="font-sans text-[0.7rem] tracking-[0.1em] text-muted-foreground">{w}kg</dt>
              <dd className="whitespace-nowrap font-sans text-sm tabular-nums text-foreground">
                {yen(region.rates[w])}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
          税込価格です。宮城県角田市より発送いたします。※離島・一部地域は追加送料が発生する場合がございます。
        </p>
      </section>
    </FadeIn>
  )
}
