'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { productOptions, products } from '@/lib/site-data'
import { getShippingFee, prefectureFromAddress, yen } from '@/lib/shipping'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'
import { useOrder } from '@/components/order-context'

const fieldClass =
  'min-h-12 w-full border-0 border-b border-background/40 bg-transparent px-0 py-3 text-center font-sans text-base text-background placeholder:text-background/45 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-accent'

const submitFailureMessage =
  'ご注文を送信できませんでした。ご注文はまだ確定していません。\n通信環境の良い場所で、少し時間をおいて「注文を確定する」をもう一度押してください。\n入力内容はそのまま残っています。'

const validationMessage = '入力内容に不足があります。赤字の項目をご確認ください。'

const fieldOrder: FieldName[] = ['full_name', 'zip', 'juusho', 'email', 'phone', 'order_product']

type FieldName = 'full_name' | 'zip' | 'juusho' | 'email' | 'phone' | 'order_product'

type Errors = Partial<Record<FieldName, string>>

// メール形式の簡易バリデーション
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 郵便番号：ハイフンあり・なしのどちらも許容（例 981-1525 / 9811525）
const postalPattern = /^\d{3}-?\d{4}$/
// 電話番号：日本の一般的な形式（ハイフンあり・なし）
const phonePattern = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/

export function OrderForm() {
  const { selectedProductId } = useOrder()

  const [fullName, setFullName] = useState('')
  const [zip, setZip] = useState('')
  const [juusho, setJuusho] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState('')
  const [zipPrefecture, setZipPrefecture] = useState('')

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  // 送信成功時のみ、固定ヘッダー分の scroll-padding-top を考慮して完了メッセージへ移動
  useEffect(() => {
    if (!submitted || !successRef.current) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    successRef.current.focus({ preventScroll: true })
    successRef.current.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [submitted])

  // サービスセクションの「この商品を注文する」から選択された商品を反映
  useEffect(() => {
    if (selectedProductId) setProduct(selectedProductId)
  }, [selectedProductId])

  // 郵便番号が7桁そろったら zipcloud API で住所を自動入力
  useEffect(() => {
    const digits = zip.replace(/[^\d]/g, '')
    if (digits.length !== 7) return

    let aborted = false
    const controller = new AbortController()

    async function lookupAddress() {
      try {
        const res = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`,
          { signal: controller.signal },
        )
        const json = (await res.json()) as {
          results: { address1: string; address2: string; address3: string }[] | null
        }
        if (aborted) return
        const hit = json.results?.[0]
        if (hit) {
          setZipPrefecture(hit.address1)
          setJuusho(`${hit.address1}${hit.address2}${hit.address3}`)
          clearError('juusho')
        }
      } catch {
        // 住所の自動取得に失敗しても手入力できるため、ここではエラー表示しない
      }
    }

    lookupAddress()
    return () => {
      aborted = true
      controller.abort()
    }
  }, [zip])

  const selectedProduct = products.find((p) => p.id === product)
  const prefecture = zipPrefecture || prefectureFromAddress(juusho)
  const shipping = selectedProduct ? getShippingFee(prefecture, selectedProduct.size) : undefined
  const total = selectedProduct && shipping ? selectedProduct.price + shipping.fee : undefined

  function validate(): Errors {
    const next: Errors = {}

    if (!fullName.trim()) next.full_name = 'お名前を入力してください'

    if (!zip.trim()) {
      next.zip = '郵便番号を入力してください'
    } else if (!postalPattern.test(zip.trim())) {
      next.zip = '郵便番号を正しい形式で入力してください'
    }

    if (!juusho.trim()) next.juusho = '住所を入力してください'

    if (!email.trim()) {
      next.email = 'メールアドレスを入力してください'
    } else if (!emailPattern.test(email.trim())) {
      next.email = 'メールアドレスを正しい形式で入力してください'
    }

    if (!phone.trim()) {
      next.phone = '電話番号を入力してください'
    } else if (!phonePattern.test(phone.trim())) {
      next.phone = '電話番号を正しい形式で入力してください'
    }

    if (!product) next.order_product = '商品を選択してください'

    return next
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting || submitted) return
    setSubmitError('')

    const nextErrors = validate()
    setErrors(nextErrors)
    const firstInvalid = fieldOrder.find((field) => nextErrors[field])
    if (firstInvalid) {
      setSubmitError(validationMessage)
      document.getElementById(firstInvalid)?.focus()
      return
    }

    const baseLabel =
      productOptions.find((opt) => opt.value === product)?.label ?? product
    const productLabel =
      shipping && total !== undefined
        ? `${baseLabel} / 送料 ${yen(shipping.fee)}（${shipping.region.name}） / 合計 ${yen(total)}（税込）`
        : `${baseLabel} / 送料 要確認`

    setSubmitting(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          address: `〒${zip.trim()} ${juusho.trim()}`,
          email: email.trim(),
          phone: phone.trim(),
          orderProduct: productLabel,
          productSize: selectedProduct?.size ?? '',
        }),
      })

      if (!res.ok) throw new Error(`Order API responded with ${res.status}`)

      setSubmitted(true)
    } catch {
      setSubmitError(submitFailureMessage)
    } finally {
      setSubmitting(false)
    }
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
    <section id="form" className="bg-primary py-16 text-primary-foreground sm:py-28 md:py-40">
      <div className="mx-auto max-w-xl px-5 sm:px-6">
        <FadeIn>
          <SectionHeading
            en="Order"
            ja="ご注文"
            tone="light"
            intro={
              <>
                <span className="inline-block">必要事項をご入力のうえ、</span>
                <span className="inline-block">ご注文ください。</span>
              </>
            }
          />
        </FadeIn>

        <FadeIn delay={120} className="mt-10 md:mt-16">
          {submitted ? (
            <div
              ref={successRef}
              role="status"
              tabIndex={-1}
              className="flex scroll-mt-24 flex-col items-center border border-background/20 px-5 py-12 text-center outline-none sm:px-8 sm:py-16"
            >
              <CheckCircle2 className="size-12 text-background" />
              <h3 className="mt-6 font-serif text-2xl font-medium text-background md:text-3xl">
                ご注文ありがとうございます。
              </h3>
              <p className="prose-jp mt-6 max-w-sm font-sans text-sm leading-[2] text-background/80 text-pretty">
                ご入力いただいたメールアドレス宛に、ご注文商品とお振込先を記載した確認メールをお送りしました。内容をご確認のうえ、お手続きをお願いいたします。
              </p>
              <p className="prose-jp mt-4 max-w-sm font-sans text-xs text-background/60">
                メールが届かない場合は、迷惑メールフォルダもご確認ください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10" noValidate>
              <Field id="full_name" label="お名前" required error={errors.full_name}>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  placeholder="我妻 太郎"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    clearError('full_name')
                  }}
                  aria-invalid={errors.full_name ? true : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="zip" label="お届け先（郵便番号）" required error={errors.zip}>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="981-1525"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value)
                    setZipPrefecture('')
                    clearError('zip')
                  }}
                  aria-invalid={errors.zip ? true : undefined}
                  className={fieldClass}
                />
                <p className="mt-2 font-sans text-[0.7rem] text-background/50">
                  郵便番号を入力すると住所が自動で入力されます
                </p>
              </Field>

              <Field id="juusho" label="お届け先（住所）" required error={errors.juusho}>
                <input
                  id="juusho"
                  name="juusho"
                  type="text"
                  autoComplete="street-address"
                  placeholder="宮城県角田市〇〇1-2-3"
                  value={juusho}
                  onChange={(e) => {
                    setJuusho(e.target.value)
                    clearError('juusho')
                  }}
                  aria-invalid={errors.juusho ? true : undefined}
                  className={fieldClass}
                />
                <p className="mt-2 font-sans text-[0.7rem] text-background/50">
                  番地・建物名は続けてご入力ください
                </p>
              </Field>

              <Field id="email" label="メールアドレス" required error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    clearError('email')
                  }}
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
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    clearError('phone')
                  }}
                  aria-invalid={errors.phone ? true : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="order_product" label="商品選択" required error={errors.order_product}>
                <select
                  id="order_product"
                  name="order_product"
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value)
                    clearError('order_product')
                  }}
                  aria-invalid={errors.order_product ? true : undefined}
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

              <section aria-label="ご注文金額" className="mx-auto w-full max-w-sm">
                <dl aria-live="polite" className="font-sans text-sm text-background">
                  <div className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="shrink-0 text-background/75">商品価格</dt>
                    <dd className="text-right tabular-nums">
                      {selectedProduct ? yen(selectedProduct.price) : '商品をお選びください'}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="shrink-0 text-background/75">
                      送料
                      {shipping && (
                        <span className="ml-2 text-xs text-background/55">{shipping.region.name}</span>
                      )}
                    </dt>
                    <dd className="text-right tabular-nums">
                      {shipping
                        ? yen(shipping.fee)
                        : selectedProduct
                          ? '郵便番号を入力してください'
                          : '—'}
                    </dd>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-background/40 pt-4">
                    <dt className="shrink-0 font-serif text-base font-medium">お支払い合計</dt>
                    <dd className="whitespace-nowrap font-serif text-2xl font-medium tabular-nums">
                      {total !== undefined ? yen(total) : '—'}
                      <span className="ml-1 font-sans text-[0.65rem] font-normal text-background/65">税込</span>
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 font-sans text-xs leading-relaxed text-background/60">
                  送料はお届け先の地域とお米の重量によって異なります。
                </p>
              </section>

              <aside
                aria-labelledby="payment-method-heading"
                className="mx-auto w-full max-w-sm border border-background/25 px-5 py-5 text-left"
              >
                <h3 id="payment-method-heading" className="font-sans text-xs tracking-[0.15em] text-background/70">
                  お支払い方法
                </h3>
                <p className="mt-2 font-serif text-lg font-medium text-background">銀行振込のみ</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-background/80 text-pretty">
                  ご注文後、お振込先とご注文商品を記載した確認メールをお送りします。内容をご確認のうえ、お手続きをお願いいたします。
                </p>
              </aside>

              <div className="flex flex-col items-center gap-4">
                {submitError && (
                  <p
                    role="alert"
                    className="w-full max-w-sm whitespace-pre-line border-l-2 border-accent bg-background/5 px-4 py-3 text-left font-sans text-sm leading-relaxed text-background text-pretty"
                  >
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-2 bg-accent px-8 py-4 font-sans text-base font-medium tracking-wide text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
                  {submitting ? '送信中です…' : '注文を確定する'}
                </button>
                <p className="font-sans text-xs text-background/60">
                  ボタンを押すとご注文が確定し、確認メールが届きます。
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
        className="mb-1 flex items-center justify-center gap-2 font-sans text-sm tracking-[0.12em] text-background/85"
      >
        {label}
        {required && (
          <span className="font-sans text-[0.65rem] tracking-widest text-accent">必須</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 font-sans text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  )
}
