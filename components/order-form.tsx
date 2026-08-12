'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { productOptions } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'

const fieldClass =
  'w-full rounded-md border border-input bg-background px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-2 focus:outline-offset-0 focus:outline-ring'

export function OrderForm() {
  const { selectedProductId } = useOrder()
  const [product, setProduct] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // 商品カードの「注文する」で選択された商品を反映
  useEffect(() => {
    if (selectedProductId) setProduct(selectedProductId)
  }, [selectedProductId])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // ※ 実際の HubSpot 連携は後で実装。現状はフロントのみの仮実装。
    setSubmitted(true)
  }

  return (
    <section id="form" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <FadeIn>
          <SectionHeading en="Contact" ja="ご注文・お問い合わせ" />
        </FadeIn>

        <FadeIn className="mt-14">
          {submitted ? (
            <div
              role="status"
              className="flex flex-col items-center rounded-lg border border-primary/30 bg-primary/5 px-6 py-16 text-center"
            >
              <CheckCircle2 className="size-14 text-primary" />
              <h3 className="mt-5 font-serif text-2xl font-bold text-foreground">
                ご注文ありがとうございます。
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                確認メールをお送りしました。
                <br />
                内容をご確認のうえ、発送の準備を進めさせていただきます。
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-2.5 font-sans text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                続けて注文する
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-border bg-card p-6 md:p-9"
              noValidate
            >
              <div className="grid gap-6">
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

                <div className="grid gap-6 sm:grid-cols-2">
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
                </div>

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
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-4 font-sans text-base font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  注文する
                </button>
                <p className="text-center font-sans text-xs text-muted-foreground">
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
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold text-foreground">
        {label}
        {required && (
          <span className="rounded bg-accent/10 px-1.5 py-0.5 text-xs font-medium text-accent">
            必須
          </span>
        )}
      </label>
      {children}
    </div>
  )
}
