// 送料（税込）。宮城県角田市からの発送

export const shippingWeights = [5, 10, 15, 20, 25, 30] as const
export type ShippingWeight = (typeof shippingWeights)[number]

export type ShippingRegion = {
  name: string
  prefectures: string[]
  rates: Record<ShippingWeight, number>
}

function rates(values: [number, number, number, number, number, number]) {
  return Object.fromEntries(shippingWeights.map((w, i) => [w, values[i]])) as Record<
    ShippingWeight,
    number
  >
}

export const shippingRegions: ShippingRegion[] = [
  {
    name: '東北',
    prefectures: ['青森県', '岩手県', '秋田県', '山形県', '福島県', '宮城県'],
    rates: rates([700, 800, 900, 1000, 1200, 1400]),
  },
  {
    name: '関東',
    prefectures: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '山梨県'],
    rates: rates([800, 900, 1000, 1100, 1300, 1500]),
  },
  {
    name: '信越・北陸',
    prefectures: ['新潟県', '長野県', '富山県', '石川県', '福井県'],
    rates: rates([900, 1000, 1100, 1200, 1400, 1600]),
  },
  {
    name: '東海',
    prefectures: ['静岡県', '愛知県', '岐阜県', '三重県'],
    rates: rates([1000, 1100, 1200, 1300, 1500, 1700]),
  },
  {
    name: '関西',
    prefectures: ['滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
    rates: rates([1100, 1200, 1300, 1400, 1600, 1800]),
  },
  {
    name: '中国',
    prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
    rates: rates([1200, 1300, 1400, 1500, 1700, 1900]),
  },
  {
    name: '四国',
    prefectures: ['徳島県', '香川県', '愛媛県', '高知県'],
    rates: rates([1300, 1400, 1500, 1600, 1800, 2000]),
  },
  {
    name: '九州',
    prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県'],
    rates: rates([1400, 1500, 1600, 1700, 1900, 2100]),
  },
  {
    name: '北海道',
    prefectures: ['北海道'],
    rates: rates([1500, 1600, 1700, 1800, 2000, 2200]),
  },
  {
    name: '沖縄',
    prefectures: ['沖縄県'],
    rates: rates([2500, 2800, 3000, 3300, 3600, 4000]),
  },
]

const allPrefectures = shippingRegions.flatMap((r) => r.prefectures)

export function findRegion(prefecture: string | null | undefined) {
  if (!prefecture) return undefined
  return shippingRegions.find((r) => r.prefectures.includes(prefecture))
}

// 住所文字列の先頭から都道府県名を取り出す（手入力時のフォールバック）
export function prefectureFromAddress(address: string) {
  const trimmed = address.trim()
  return allPrefectures.find((p) => trimmed.startsWith(p))
}

export function parseWeight(size: string): ShippingWeight | undefined {
  const kg = Number.parseInt(size, 10)
  return shippingWeights.find((w) => w === kg)
}

export function getShippingFee(prefecture: string | null | undefined, size: string) {
  const region = findRegion(prefecture)
  const weight = parseWeight(size)
  if (!region || !weight) return undefined
  return { region, fee: region.rates[weight] }
}

export const yen = (value: number) => `${value.toLocaleString('ja-JP')}円`
