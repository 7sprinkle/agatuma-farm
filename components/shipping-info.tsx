'use client'

import { useId, useState } from 'react'
import { shippingRegions, shippingWeights, yen } from '@/lib/shipping'
import { FadeIn } from '@/components/fade-in'

export function ShippingInfo() {
  const headingId = useId()
  const [selectedRegionName, setSelectedRegionName] = useState(shippingRegions[0].name)
  const selectedRegion = shippingRegions.find((region) => region.name === selectedRegionName) ?? shippingRegions[0]

  return (
    <FadeIn className="mx-auto mt-14 max-w-4xl md:mt-24">
      <section aria-labelledby={`${headingId}-heading`} className="border-y border-border py-8 md:py-10">
        <p className="font-sans text-[0.6rem] tracking-[0.4em] text-accent">送料 ・ SHIPPING</p>
        <h3 id={`${headingId}-heading`} className="mt-3 font-serif text-lg font-medium tracking-[0.08em] text-foreground">
          地域別の送料
        </h3>
        <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground">
          宮城県角田市から発送いたします。送料はお届け先の地域とお米の重量によって異なります。
        </p>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <label className="flex items-center gap-3 font-sans text-sm text-foreground sm:shrink-0" htmlFor={`${headingId}-region`}>
            <span className="text-muted-foreground">お届け先</span>
            <select
              id={`${headingId}-region`}
              value={selectedRegion.name}
              onChange={(event) => setSelectedRegionName(event.target.value)}
              className="min-h-11 min-w-0 flex-1 border-b border-border bg-transparent px-1 py-2 text-base text-foreground outline-none transition-colors focus:border-accent sm:flex-none"
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

        <details className="group mt-5">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 font-sans text-sm text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            全地域の送料一覧を見る
            <span className="text-xs text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="mt-3 overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label="地域別送料一覧（横にスクロールできます）">
            <table className="w-full min-w-[34rem] border-collapse font-sans text-sm">
              <caption className="sr-only">地域・重量別の送料（税込）</caption>
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th scope="col" className="sticky left-0 bg-clay py-2 pr-3 text-left font-normal">地域</th>
                  {shippingWeights.map((weight) => (
                    <th key={weight} scope="col" className="px-2 py-2 text-right font-normal">{weight}kg</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shippingRegions.map((region) => (
                  <tr key={region.name} className="border-b border-border/60">
                    <th scope="row" className="sticky left-0 whitespace-nowrap bg-clay py-2.5 pr-3 text-left font-normal text-foreground">
                      {region.name}
                    </th>
                    {shippingWeights.map((weight) => (
                      <td key={weight} className="whitespace-nowrap px-2 py-2.5 text-right tabular-nums text-foreground">
                        {yen(region.rates[weight])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-sans text-[0.7rem] text-muted-foreground sm:hidden">表は横にスクロールできます</p>
        </details>

        <p className="mt-5 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
          すべて税込価格です。※離島・一部地域は追加送料が発生する場合がございます。
        </p>
      </section>
    </FadeIn>
  )
}
