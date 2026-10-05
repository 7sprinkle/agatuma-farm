import { NextResponse } from 'next/server'
import { parseOrder, sendOrderEmails } from '@/lib/order-email'
import { getShippingFee, prefectureFromAddress, yen } from '@/lib/shipping'

const failureMessage =
  '注文情報の送信に失敗しました。\nお手数ですが、もう一度お試しください。'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '入力内容をご確認ください。' }, { status: 400 })
  }

  const order = parseOrder(body)
  if (!order) {
    return NextResponse.json({ error: '入力内容をご確認ください。' }, { status: 400 })
  }

  const shipping = getShippingFee(prefectureFromAddress(order.address), order.productSize)
  if (!shipping) {
    return NextResponse.json({ error: 'お届け先の都道府県または商品重量を確認してください。' }, { status: 400 })
  }

  const productLabel = order.orderProduct.split(' / 送料')[0]
  order.shippingFee = shipping.fee
  order.orderProduct = `${productLabel} / 送料 ${yen(shipping.fee)}（${shipping.region.name}）`

  try {
    await sendOrderEmails(order)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[order] Failed to send order emails:', error)
    return NextResponse.json({ error: failureMessage }, { status: 500 })
  }
}
