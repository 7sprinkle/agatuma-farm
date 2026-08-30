'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { productOptions } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'

const fieldClass =
  'w-full border-0 border-b border-background/30 bg-transparent px-0 py-3 text-center font-sans text-base text-background placeholder:text-background/50 transition-colors focus:border-accent focus:outline-none'

type FieldName = 'name' | 'postal_code' | 'address' | 'email' | 'phone' | 'product'

type Errors = Partial<Record<FieldName, string>>

// メール形式の簡易バリデーション
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 郵便番号：ハイフンあり・なしのどちらも許容（例 981-1525 / 9811525）
const postalPattern = /^\d{3}-?\d{4}$/
// 電話番号：日本の一般的な形式（ハイフンあり・なし）
const phonePattern = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/

export function OrderForm() {
  const { selectedProductId } = useOrder()
  const [product, setProduct] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (selectedProductId) setProduct(selectedProductId)
  }, [selectedProductId])

  function validate(data: Record<FieldName, string>): Errors {
    const next: Errors = {}

    if (!data.name.trim()) next.name = 'お名前を入力してください'

    if (!data.postal_code.trim()) {
      next.postal_code = '郵便番号を入力してください'
    } else if (!postalPattern.test(data.postal_code.trim())) {
      next.postal_code = '郵便番号を正しい形式で入力してください'
    }

    if (!data.address.trim()) next.address = '住所を入力してください'

    if (!data.email.trim()) {
      next.email = 'メールアドレスを入力してください'
    } else if (!emailPattern.test(data.email.trim())) {
      next.email = 'メールアドレスを正しい形式で入力してください'
    }

    if (!data.phone.trim()) {
      next.phone = '電話番号を入力してください'
    } else if (!phonePattern.test(data.phone.trim())) {
      next.phone = '電話番号を正しい形式で入力してください'
    }

    if (!data.product) next.product = '商品を選択してください'

    return next
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data: Record<FieldName, string> = {
      name: (form.elements.namedItem('name') as HTMLInputElement)?.value ?? '',
      postal_code: (form.elements.namedItem('postal_code') as HTMLInputElement)?.value ?? '',
      address: (form.elements.namedItem('address') as HTMLInputElement)?.value ?? '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value ?? '',
      phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value ?? '',
      product,
    }

    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // ※ 実際の HubSpot 連携は後で実装。フロント側の入力値検証まで。
    setSubmitted(true)
  }

  function clearError(field: FieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
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
              <Field id="name" label="お名前" required error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="我妻 太郎"
                  onChange={() => clearError('name')}
                  aria-invalid={errors.name ? true : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="postal_code" label="お届け先（郵便番号）" required error={errors.postal_code}>
                <input
                  id="postal_code"
                  name="postal_code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="981-1525"
                  onChange={() => clearError('postal_code')}
                  aria-invalid={errors.postal_code ? true : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="address" label="お届け先（住所）" required error={errors.address}>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  placeholder="宮城県角田市〇〇1-2-3"
                  onChange={() => clearError('address')}
                  aria-invalid={errors.address ? true : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="email" label="メールアドレス" required error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@mail.com"
                  onChange={() => clearError('email')}
                  aria-invalid={errors.email ? true : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="phone" label="電話番号" required error={errors.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="090-0000-0000"
                  onChange={() => clearError('phone')}
                  aria-invalid={errors.phone ? true : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="product" label="商品選択" required error={errors.product}>
                <select
                  id="product"
                  name="product"
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value)
                    clearError('product')
                  }}
                  aria-invalid={errors.product ? true : undefined}
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
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
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
      {error && (
        <p role="alert" className="mt-2 font-sans text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  )
}
