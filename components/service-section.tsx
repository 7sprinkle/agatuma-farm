'use client'

import { useState } from 'react'
import Image from 'next/image'
import { products } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'
import { ShippingInfo } from '@/components/shipping-info'
import { LimitedNote } from '@/components/limited-note'

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
    <section id="service" className="bg-clay py-16 text-clay-foreground sm:py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <SectionHeading
            en="Service"
            ja="農場のお米"
            intro={
              <>
                白米と玄米、それぞれの持ち味を大切に。
                <br className="sm:hidden" />
                暮らしに合わせてお選びいただけます。
              </>
            }
          />
          <LimitedNote className="mt-10" />
        </FadeIn>

        {/* カテゴリ切替（中央下線タブ） */}
        <FadeIn className="mt-10 flex justify-center sm:mt-14">
          <div role="tablist" aria-label="商品カテゴリ" className="flex items-end gap-10 sm:gap-12">
            {categories.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === c.key}
                onClick={() => setActive(c.key)}
                className={`group flex flex-col items-center gap-2 border-b-2 pb-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                  active === c.key
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="font-serif text-2xl font-medium md:text-3xl">{c.label}</span>
                <span className="font-sans text-[0.6rem] tracking-[0.3em]">{c.reading}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* PC: 画像＋説明を左、お品書きを右の2カラム */}
        <div className="mt-10 grid items-start gap-12 sm:mt-16 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* 左：大きな写真＋説明 */}
          <FadeIn>
            <figure className="group mx-auto max-w-xl text-center md:mx-0 md:text-left">
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/5]">
                <Image
                  key={current.image}
                  src={current.image || '/placeholder.svg'}
                  alt={`${current.label}のイメージ`}
                  fill
                  sizes="(max-width: 768px) 100vw, 32rem"
                  className="img-zoom object-cover"
                />
              </div>
              <figcaption className="mt-8 md:mt-10">
                <p className="font-serif text-2xl font-medium leading-snug text-foreground text-balance md:text-3xl">
                  {current.lead}
                </p>
                <p className="prose-jp mx-auto mt-5 max-w-md font-sans text-sm text-muted-foreground text-pretty md:mx-0">
                  {current.copy}
                </p>
              </figcaption>
            </figure>
          </FadeIn>

          {/* 右：品書き（罫線のみ、カードなし） */}
          <FadeIn className="md:pt-2">
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
              <p className="font-sans text-[0.65rem] tracking-[0.4em] text-accent">
                品書き ・ PRICE
              </p>
              <span className="inline-flex items-center border border-accent/50 px-3 py-1 font-sans text-[0.7rem] tracking-[0.15em] text-accent">
                令和8年産 新米
              </span>
            </div>
            <ul className="mx-auto mt-6 max-w-xl border-t border-border md:mx-0 md:mt-8">
              {visible.map((product) => (
                <li key={product.id} className="border-b border-border py-5 md:py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex min-w-0 items-baseline gap-3">
                      <h3 className="font-serif text-2xl font-medium text-foreground">
                        {product.size}
                      </h3>
                      <span className="truncate font-sans text-xs tracking-widest text-muted-foreground">
                        {product.name}
                      </span>
                    </div>
                    <p className="whitespace-nowrap font-serif text-xl text-foreground">
                      ¥{product.price.toLocaleString()}
                      <span className="ml-1 font-sans text-[0.65rem] text-muted-foreground">税込</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectProduct(product.id)}
                    aria-label={`${product.name} ${product.size}を注文する`}
                    className="group mt-2 inline-flex min-h-11 items-center gap-3 py-2 pr-4 font-sans text-sm tracking-wide text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-12" aria-hidden="true" />
                    この商品を注文する
                  </button>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <ShippingInfo />
      </div>
    </section>
  )
}
