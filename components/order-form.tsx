'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { productOptions } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'

const fieldClass =
  'w-full border-0 border-b border-background/30 bg-transparent px-0 py-3 text-center font-sans text-base text-background placeholder:text-background/50 transition-colors focus:border-accent focus:outline-none'

export function OrderForm() {
  const { selectedProductId } = useOrder()
  const [product, setProduct] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (selectedProductId) setProduct(selectedProductId)
  }, [selectedProductId])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // ※ 実際の HubSpot 連携は後で実装。現状はフロントのみの仮実装。
    setSubmitted(true)
  }

  return (
    <section id="form" className="bg-primary py-28 text-primary-foreground md:py-40">
      <div className="mx-auto max-w-xl px-6">
        <FadeIn>
          <SectionHeading
            en="Contact"
            ja="ご注文・お問い合わせ"
            tone="light"
            intro="ご注文・ご質問など、どうぞお気軽にお寄せください。内容を確認のうえ、担当より折り返しご連絡いたします。"
          />
        </FadeIn>

        <FadeIn delay={120} className="mt-16">
          {submitted ? (
            <div
              role="status"
              className="flex flex-col items-center border border-background/20 px-8 py-16 text-center"
            >
              <CheckCircle2 className="size-12 text-background" />
              <h3 className="mt-6 font-serif text-2xl font-medium text-background md:text-3xl">
                ご注文ありがとうございます。
              </h3>
              <p className="prose-jp mt-4 max-w-sm font-sans text-sm text-background/80 text-pretty">
                確認メールをお送りしました。内容をご確認のうえ、発送の準備を進めさせていただきます。
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="group mt-8 inline-flex items-center gap-3 font-sans text-sm tracking-wide text-background"
              >
                <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-12" />
                続けて注文する
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
              <Field id="name" label="お名前" required>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="我妻 太郎"
                  className={fieldClass}
                />
              </Field>

              <Field id="address" label="お届け先住所" required>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  autoComplete="street-address"
                  placeholder="宮城県角田市〇〇1-2-3"
                  className={fieldClass}
                />
              </Field>

              <Field id="email" label="メールアドレス" required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="example@mail.com"
                  className={fieldClass}
                />
              </Field>

              <Field id="tel" label="電話番号" required>
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="090-0000-0000"
                  className={fieldClass}
                />
              </Field>

              <Field id="product" label="商品選択" required>
                <select
                  id="product"
                  name="product"
                  required
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className={`${fieldClass} appearance-none`}
                >
                  <option value="" disabled>
                    商品をお選びください
                  </option>
                  {productOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-foreground">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="mt-4 flex flex-col items-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-accent px-16 py-4 font-sans text-base font-medium tracking-wide text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                >
                  注文する
                </button>
                <p className="mt-6 font-sans text-xs text-background/55">
                  ※ 現在はデモ表示です。送信内容は保存されません。
                </p>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="text-center">
      <label
        htmlFor={id}
        className="mb-2 flex items-center justify-center gap-2 font-sans text-xs tracking-[0.15em] text-background/80"
      >
        {label}
        {required && (
          <span className="font-sans text-[0.6rem] tracking-widest text-accent">必須</span>
        )}
      </label>
      {children}
    </div>
  )
}
