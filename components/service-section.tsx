'use client'

import { useState } from 'react'
import Image from 'next/image'
import { products, type Product } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'

const categories = [
  { key: 'hakumai', label: '白米' },
  { key: 'genmai', label: '玄米' },
] as const

export function ServiceSection() {
  const [active, setActive] = useState<'hakumai' | 'genmai'>('hakumai')
  const { selectProduct } = useOrder()
  const visible = products.filter((p) => p.category === active)

  return (
    <section id="service" className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <SectionHeading en="Service" ja="商品一覧" />
        </FadeIn>

        <FadeIn className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="商品カテゴリ"
            className="inline-flex rounded-full border border-border bg-card p-1"
          >
            {categories.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === c.key}
                onClick={() => setActive(c.key)}
                className={`rounded-full px-8 py-2.5 font-serif text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  active === c.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((product, i) => (
            <FadeIn as="div" key={product.id} delay={i * 70}>
              <ProductCard product={product} onOrder={() => selectProduct(product.id)} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, onOrder }: { product: Product; onOrder: () => void }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1.5 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={`${product.name} ${product.size}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 font-serif text-sm font-semibold text-primary backdrop-blur-sm">
          {product.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-foreground">
            {product.name} {product.size}
          </h3>
        </div>
        <p className="mt-1 font-sans text-lg font-bold text-accent">
          ¥{product.price.toLocaleString()}
          <span className="ml-1 text-xs font-normal text-muted-foreground">税込</span>
        </p>
        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <button
          type="button"
          onClick={onOrder}
          className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 font-sans text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          この商品を注文する
        </button>
      </div>
    </article>
  )
}
