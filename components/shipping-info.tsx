'use client'

import { useId } from 'react'
import { shippingRegions, shippingWeights, yen } from '@/lib/shipping'
import { FadeIn } from '@/components/fade-in'

export function ShippingInfo() {
  const headingId = useId()

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

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse font-sans text-sm">
            <caption className="sr-only">地域別送料一覧（税込）</caption>
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="sticky left-0 min-w-[9rem] bg-clay py-3 pr-4 font-normal text-foreground">地域</th>
                {shippingWeights.map((weight) => (
                  <th key={weight} scope="col" className="whitespace-nowrap px-3 py-3 text-right font-normal text-muted-foreground">{weight}kg</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shippingRegions.map((region) => (
                <tr key={region.name} className="border-b border-border/60 last:border-0">
                  <th scope="row" className="sticky left-0 bg-clay py-4 pr-4 text-left font-normal text-foreground">{region.name}</th>
                  {shippingWeights.map((weight) => (
                    <td key={weight} className="whitespace-nowrap px-3 py-4 text-right tabular-nums text-foreground">{yen(region.rates[weight])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">
          すべて税込価格です。※離島・一部地域は追加送料が発生する場合がございます。
        </p>
      </section>
    </FadeIn>
  )
}
