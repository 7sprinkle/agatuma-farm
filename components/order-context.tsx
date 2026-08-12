'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type OrderContextValue = {
  selectedProductId: string
  selectProduct: (id: string) => void
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [selectedProductId, setSelectedProductId] = useState('')

  const selectProduct = useCallback((id: string) => {
    setSelectedProductId(id)
    // フォームへスムーススクロール
    const el = document.getElementById('form')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <OrderContext.Provider value={{ selectedProductId, selectProduct }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within OrderProvider')
  return ctx
}
