'use client'

import { useState } from 'react'
import Image from 'next/image'
import { products } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'

const categories = [
  {
    key: 'hakumai',
    label: '白米',
    reading: 'HAKUMAI',
    image: '/images/product-hakumai.png',
    lead: '精米したての、澄んだ白さ。',
    copy: 'ふっくらと炊きあがり、艶やかに光る一粒ひとつぶ。毎日の食卓の真ん中にふさわしい、素直で飽きのこない味わいです。',
  },
  {
    key: 'genmai',
    label: '玄米',
    reading: 'GENMAI',
    image: '/images/product-genmai.png',
    lead: '大地の滋養を、そのままに。',
    copy: '精米前の栄養をまるごと。噛むほどに広がる香ばしさと自然な甘み。健やかな暮らしに寄り添う、力強い一膳です。',
  },
] as const

export function ServiceSection() {
  const [active, setActive] = useState<'hakumai' | 'genmai'>('hakumai')
  const { selectProduct } = useOrder()
  const current = categories.find((c) => c.key === active)!
  const visible = products.filter((p) => p.category === active)

  return (
    <section id="service" className="bg-clay py-28 text-clay-foreground md:py-40">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <FadeIn>
          <SectionHeading en="Service" ja="農場のお米" index="02" />
        </FadeIn>

        {/* カテゴリ切替（下線タブ） */}
        <FadeIn className="mt-12">
          <div
            role="tablist"
            aria-label="商品カテゴリ"
            className="flex items-end gap-10 border-b border-border"
          >
            {categories.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === c.key}
                onClick={() => setActive(c.key)}
                className={`group -mb-px flex items-baseline gap-3 border-b-2 pb-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                  active === c.key
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="font-serif text-2xl font-medium md:text-3xl">{c.label}</span>
                <span className="font-sans text-[0.65rem] tracking-[0.25em]">{c.reading}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* 大きな写真 ＋ 品書き */}
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <figure className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  key={current.image}
                  src={current.image || '/placeholder.svg'}
                  alt={`${current.label}のイメージ`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="img-zoom object-cover"
                />
              </div>
              <figcaption className="mt-6">
                <p className="font-serif text-2xl font-medium leading-snug text-foreground text-balance md:text-3xl">
                  {current.lead}
                </p>
                <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
                  {current.copy}
                </p>
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn delay={120}>
            <div>
              <p className="font-sans text-[0.7rem] tracking-[0.35em] text-accent">品書き ・ PRICE</p>
              <ul className="mt-6 border-t border-border">
                {visible.map((product) => (
                  <li key={product.id}>
                    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-border py-7">
                      <div className="flex items-baseline gap-4">
                        <h3 className="font-serif text-2xl font-medium text-foreground">
                          {product.size}
                        </h3>
                        <span className="font-sans text-xs tracking-widest text-muted-foreground">
                          {product.name}
                        </span>
                      </div>
                      <p className="text-right font-serif text-xl text-foreground">
                        ¥{product.price.toLocaleString()}
                        <span className="ml-1 font-sans text-[0.65rem] text-muted-foreground">
                          税込
                        </span>
                      </p>
                      <p className="col-span-2 max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
                        {product.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => selectProduct(product.id)}
                        className="group col-span-2 -mt-1 inline-flex w-fit items-center gap-3 font-sans text-sm tracking-wide text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      >
                        <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-12" />
                        この商品を注文する
                      </button>
                    </div>
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
