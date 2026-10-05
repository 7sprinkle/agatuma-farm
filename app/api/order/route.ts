import { NextResponse } from 'next/server'
import { parseOrder, sendOrderEmails } from '@/lib/order-email'

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

  try {
    await sendOrderEmails(order)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[order] Failed to send order emails:', error)
    return NextResponse.json({ error: failureMessage }, { status: 500 })
  }
}
