'use client'

import { useId, useState } from 'react'
import { shippingRegions, shippingWeights, yen } from '@/lib/shipping'
import { FadeIn } from '@/components/fade-in'

export function ShippingInfo() {
  const headingId = useId()
  const [selectedRegionName, setSelectedRegionName] = useState(shippingRegions[0].name)
  const selectedRegion = shippingRegions.find((region) => region.name === selectedRegionName) ?? shippingRegions[0]

  return (
    <FadeIn className="mx-auto mt-20 max-w-4xl md:mt-24">
      <section aria-labelledby={`${headingId}-heading`} className="border-y border-border py-8 md:py-10">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] text-accent">送料 ・ SHIPPING</p>
        <h3 id={`${headingId}-heading`} className="mt-3 font-serif text-lg font-medium tracking-[0.08em] text-foreground">
          地域別の送料
        </h3>
        <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground">
          宮城県角田市から発送いたします。送料はお届け先の地域とお米の重量によって異なります。
        </p>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <label className="flex items-center gap-3 font-sans text-sm text-foreground" htmlFor={`${headingId}-region`}>
            <span className="text-muted-foreground">お届け先</span>
            <select
              id={`${headingId}-region`}
              value={selectedRegion.name}
              onChange={(event) => setSelectedRegionName(event.target.value)}
              className="border-b border-border bg-transparent px-1 py-2 text-foreground outline-none transition-colors focus:border-accent"
            >
              {shippingRegions.map((region) => (
                <option key={region.name} value={region.name} className="bg-background text-foreground">
                  {region.name}
                </option>
              ))}
            </select>
          </label>
          <p className="font-sans text-xs leading-relaxed text-muted-foreground sm:max-w-xs sm:text-right">
            {selectedRegion.prefectures.join('・')}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-x-4 gap-y-3 border-y border-border/60 py-5 font-sans text-sm sm:grid-cols-6">
          {shippingWeights.map((weight) => (
            <div key={weight} className="flex items-baseline justify-between gap-2 sm:block">
              <dt className="text-muted-foreground">{weight}kg</dt>
              <dd className="whitespace-nowrap tabular-nums text-foreground sm:mt-1">{yen(selectedRegion.rates[weight])}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
          すべて税込価格です。※離島・一部地域は追加送料が発生する場合がございます。
        </p>
      </section>
    </FadeIn>
  )
}
