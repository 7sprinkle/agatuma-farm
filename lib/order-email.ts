import { Resend } from 'resend'
import { getShippingFee, prefectureFromAddress } from '@/lib/shipping'

export type OrderData = {
  fullName: string
  address: string
  email: string
  phone: string
  orderProduct: string
  productSize: string
  shippingFee?: number
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const maxLengths: Record<Exclude<keyof OrderData, 'shippingFee'>, number> = {
  fullName: 100,
  address: 300,
  email: 254,
  phone: 30,
  orderProduct: 300,
  productSize: 10,
}

export function parseOrder(input: unknown): OrderData | null {
  if (!input || typeof input !== 'object') return null
  const raw = input as Record<string, unknown>

  const order = {} as OrderData
  for (const key of Object.keys(maxLengths) as (keyof typeof maxLengths)[]) {
    const value = raw[key]
    if (typeof value !== 'string') return null
    const trimmed = value.trim()
    if (!trimmed || trimmed.length > maxLengths[key]) return null
    ;(order as unknown as Record<string, string>)[key] = trimmed
  }

  if (!emailPattern.test(order.email)) return null
  if (!/^[\d+\-() ]+$/.test(order.phone)) return null

  return order
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function layout(content: string) {
  return `<!doctype html>
<html lang="ja">
<body style="margin:0;padding:0;background:#f5f1e8;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;font-family:'Hiragino Sans','Noto Sans JP','Yu Gothic',sans-serif;color:#3a342c;font-size:15px;line-height:1.9;">
    <p style="margin:0 0 24px;font-family:'Hiragino Mincho ProN','Noto Serif JP','Yu Mincho',serif;font-size:20px;letter-spacing:0.1em;">我妻農場</p>
    <div style="background:#ffffff;padding:28px 24px;border:1px solid #e3dccd;">
      ${content}
    </div>
    <p style="margin:24px 0 0;font-size:12px;color:#8a8174;">ーーーーーー<br>我妻農場</p>
  </div>
</body>
</html>`
}

function block(label: string, value: string) {
  return `<p style="margin:0 0 4px;font-size:12px;color:#8a8174;letter-spacing:0.08em;">${label}</p>
<p style="margin:0 0 20px;white-space:pre-wrap;">${escapeHtml(value)}</p>`
}

const bankInfo = `みやぎ仙南農業協同組合　角田支店
普通預金　0072833
口座名義：タカハシ　リナ`

const confirmationCopyEmail = 'qitengyuxi@gmail.com'

function customerEmail(order: OrderData) {
  const text = `${order.fullName} 様

この度は、我妻農場の商品をご注文いただき、誠にありがとうございます。

ご入金の確認が取れ次第、速やかに発送の手配をさせていただきます。

ご注文商品：
${order.orderProduct}

つきましては、下記口座まで代金のお振込みをお願い申し上げます。

【お振込先】
${bankInfo}

ご入金の確認後、商品の発送準備を進めさせていただきます。

ご不明な点がございましたら、どうぞお気軽にお問い合わせくださいませ。

何卒よろしくお願い申し上げます。

ーーーーーー
我妻農場

お問い合わせ先：
メール：agatsumafarm@gmail.com
電話：080-2835-5970
お問い合わせの際は、注文内容またはお名前をお知らせください。`

  const html = layout(`
<p style="margin:0 0 20px;">${escapeHtml(order.fullName)} 様</p>
<p style="margin:0 0 20px;">この度は、我妻農場の商品をご注文いただき、誠にありがとうございます。<br>ご入金の確認が取れ次第、速やかに発送の手配をさせていただきます。</p>
${block('ご注文商品', order.orderProduct)}
<p style="margin:0 0 8px;">つきましては、下記口座まで代金のお振込みをお願い申し上げます。</p>
<div style="margin:0 0 20px;padding:16px;background:#f5f1e8;">
  <p style="margin:0 0 4px;font-size:12px;color:#8a8174;letter-spacing:0.08em;">お振込先</p>
  <p style="margin:0;white-space:pre-wrap;">${bankInfo}</p>
</div>
<p style="margin:0 0 20px;">ご入金の確認後、商品の発送準備を進めさせていただきます。</p>
<p style="margin:0 0 20px;">ご不明な点がございましたら、どうぞお気軽にお問い合わせくださいませ。</p>
<p style="margin:0 0 20px;">何卒よろしくお願い申し上げます。</p>
<div style="margin-top:28px;padding-top:20px;border-top:1px solid #e3dccd;font-size:13px;color:#6f665a;">
  <p style="margin:0 0 8px;font-family:'Hiragino Mincho ProN','Noto Serif JP','Yu Mincho',serif;font-size:16px;color:#3a342c;">我妻農場</p>
  <p style="margin:0 0 4px;">メール：<a href="mailto:agatsumafarm@gmail.com" style="color:#3f674f;">agatsumafarm@gmail.com</a></p>
  <p style="margin:0 0 8px;">電話：<a href="tel:08028355970" style="color:#3f674f;">080-2835-5970</a></p>
  <p style="margin:0;">お問い合わせの際は、注文内容またはお名前をお知らせください。</p>
</div>`)

  return { subject: '【我妻農場】ご注文ありがとうございます', text, html }
}

function farmerEmail(order: OrderData) {
  const text = `お名前：
${order.fullName}

お届け先：
${order.address}

メールアドレス：
${order.email}

電話番号：
${order.phone}

商品：
${order.orderProduct}`

  const html = layout(`
<p style="margin:0 0 24px;">新しいご注文がありました。</p>
${block('お名前', order.fullName)}
${block('お届け先', order.address)}
${block('メールアドレス', order.email)}
${block('電話番号', order.phone)}
${block('商品', order.orderProduct)}`)

  return { subject: '【我妻農場】新しいご注文がありました', text, html }
}

export class OrderEmailConfigError extends Error {}

export async function sendOrderEmails(order: OrderData) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.FROM_EMAIL
  const notifyTo = process.env.ORDER_NOTIFICATION_EMAIL

  if (!apiKey || !from || !notifyTo) {
    throw new OrderEmailConfigError(
      'Missing RESEND_API_KEY, FROM_EMAIL, or ORDER_NOTIFICATION_EMAIL',
    )
  }

  const resend = new Resend(apiKey)

  const farmer = farmerEmail(order)
  const farmerResult = await resend.emails.send({
    from,
    to: [...new Set([notifyTo, confirmationCopyEmail])],
    replyTo: order.email,
    ...farmer,
  })
  if (farmerResult.error) {
    throw new Error(
      `Farmer notification failed: [${farmerResult.error.statusCode ?? '-'} ${farmerResult.error.name}] ${farmerResult.error.message}`,
    )
  }

  // The farmer already has the order at this point, so a failed confirmation must not
  // surface as a failed order — the customer would resubmit and create a duplicate.
  // Log confirmation failures while keeping the farmer notification successful.
           const customer = customerEmail(order)
  const customerResult = await resend.emails.send({
    from,
    to: [...new Set([order.email, confirmationCopyEmail])],
    replyTo: notifyTo,
    ...customer,
  })
  if (customerResult.error) {
    console.error(
      `[order] Customer confirmation failed: [${customerResult.error.statusCode ?? '-'} ${customerResult.error.name}] ${customerResult.error.message}`,
    )
  }
}
