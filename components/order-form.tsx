'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { productOptions } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'

const fieldClass =
  'w-full border-0 border-b border-border bg-transparent px-0 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none'

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
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <FadeIn>
          <div>
            <div className="flex items-center gap-4">
              <span className="font-serif text-sm tracking-widest text-primary-foreground/70">
                05
              </span>
              <span className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.4em] text-primary-foreground/70">
                Contact
              </span>
              <span className="h-px flex-1 bg-primary-foreground/25" aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-tight text-primary-foreground text-balance md:text-5xl lg:text-6xl">
              ご注文・お問い合わせ
            </h2>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* 左：招待メッセージ＋写真 */}
          <FadeIn>
            <div className="flex h-full flex-col">
              <p className="max-w-md font-serif text-2xl font-medium leading-relaxed text-primary-foreground text-balance md:text-3xl">
                炊きたての一膳を、
                <br />
                あなたのもとへ。
              </p>
              <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-primary-foreground/80">
                ご注文・ご質問など、どうぞお気軽にお寄せください。
                内容を確認のうえ、担当より折り返しご連絡いたします。
              </p>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/cooked-rice.png"
                  alt="炊きたての白いご飯"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>

          {/* 右：フォーム */}
          <FadeIn delay={120}>
            {submitted ? (
              <div
                role="status"
                className="flex h-full flex-col items-start justify-center border border-primary-foreground/20 px-8 py-16"
              >
                <CheckCircle2 className="size-12 text-primary-foreground" />
                <h3 className="mt-6 font-serif text-3xl font-medium text-primary-foreground">
                  ご注文ありがとうございます。
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-primary-foreground/80 text-pretty">
                  確認メールをお送りしました。内容をご確認のうえ、
                  発送の準備を進めさせていただきます。
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="group mt-8 inline-flex items-center gap-3 font-sans text-sm tracking-wide text-primary-foreground"
                >
                  <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-12" />
                  続けて注文する
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-8" noValidate>
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

                <div className="grid gap-8 sm:grid-cols-2">
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

                <div className="mt-2">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center bg-accent px-6 py-4 font-sans text-base font-medium tracking-wide text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground sm:w-auto sm:px-16"
                  >
                    注文する
                  </button>
                  <p className="mt-4 font-sans text-xs text-primary-foreground/60">
                    ※ 現在はデモ表示です。送信内容は保存されません。
                  </p>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
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
      <label
        htmlFor={id}
        className="mb-1 flex items-center gap-2 font-sans text-xs tracking-wide text-primary-foreground/80"
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
