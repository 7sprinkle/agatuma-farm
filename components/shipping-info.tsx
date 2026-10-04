import { shippingRegions, shippingWeights, yen } from '@/lib/shipping'
import { FadeIn } from '@/components/fade-in'

export function ShippingInfo() {
  return (
    <FadeIn className="mx-auto mt-28 max-w-5xl md:mt-36">
      <div className="text-center">
        <p className="font-sans text-[0.65rem] tracking-[0.4em] text-accent">送料 ・ SHIPPING</p>
        <h3 className="mt-6 font-serif text-2xl font-medium tracking-[0.08em] text-foreground md:text-3xl">
          送料について
        </h3>
        <p className="prose-jp mx-auto mt-6 max-w-xl font-sans text-sm text-muted-foreground text-pretty">
          宮城県角田市より全国へお届けします。
          <wbr />
          重量とお届け先地域により送料が異なります。
        </p>
      </div>

      <div
        className="mt-12 overflow-x-auto border-t border-border"
        role="region"
        aria-label="地域別送料表（横にスクロールできます）"
        tabIndex={0}
      >
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">地域・重量別の送料（税込）</caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="sticky left-0 bg-clay py-4 pr-4 font-sans text-xs font-normal tracking-[0.15em] text-muted-foreground"
              >
                地域
              </th>
              {shippingWeights.map((w) => (
                <th
                  key={w}
                  scope="col"
                  className="px-3 py-4 text-right font-serif text-base font-medium text-foreground"
                >
                  {w}kg
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shippingRegions.map((region) => (
              <tr key={region.name} className="border-b border-border">
                <th
                  scope="row"
                  className="sticky left-0 min-w-[9rem] bg-clay py-5 pr-4 align-top font-normal"
                >
                  <span className="block font-serif text-base font-medium text-foreground">
                    {region.name}
                  </span>
                  {region.prefectures.length > 1 && (
                    <span className="mt-1 block max-w-[14rem] font-sans text-[0.68rem] leading-relaxed text-muted-foreground">
                      {region.prefectures.map((p) => p.replace(/[都府県]$/, '')).join('・')}
                    </span>
                  )}
                </th>
                {shippingWeights.map((w) => (
                  <td
                    key={w}
                    className="whitespace-nowrap px-3 py-5 text-right align-top font-sans text-sm tabular-nums text-foreground"
                  >
                    {yen(region.rates[w])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-2 font-sans text-xs leading-relaxed text-muted-foreground md:flex-row md:justify-between">
        <p>表示価格はすべて税込です。</p>
        <p>※離島・一部地域は追加送料が発生する場合がございます。その場合はご連絡いたします。</p>
      </div>
    </FadeIn>
  )
}
