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
  { name: '宮城県', prefectures: ['宮城県'], rates: rates([1200, 1500, 1500, 1900, 1900, 2500]) },
  { name: '北海道', prefectures: ['北海道'], rates: rates([1600, 2000, 2000, 2300, 2300, 3000]) },
  {
    name: '東北・関東・信越',
    prefectures: ['青森県', '岩手県', '秋田県', '山形県', '福島県', '東京都', '茨城県', '神奈川県', '栃木県', '千葉県', '群馬県', '山梨県', '埼玉県', '新潟県', '長野県'],
    rates: rates([1400, 1700, 1700, 2100, 2100, 2700]),
  },
  {
    name: '北陸・東海',
    prefectures: ['富山県', '石川県', '福井県', '静岡県', '岐阜県', '愛知県', '三重県'],
    rates: rates([1500, 1800, 1800, 2200, 2200, 2800]),
  },
  { name: '近畿', prefectures: ['滋賀県', '京都府', '兵庫県', '大阪府', '奈良県', '和歌山県'], rates: rates([1600, 2000, 2000, 2300, 2300, 3000]) },
  { name: '中国・四国', prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '香川県', '愛媛県', '徳島県', '高知県'], rates: rates([1900, 2300, 2300, 2600, 2600, 3200]) },
  { name: '九州', prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県'], rates: rates([2300, 2600, 2600, 3000, 3000, 3600]) },
  { name: '沖縄', prefectures: ['沖縄県'], rates: rates([2300, 2800, 2800, 3100, 3100, 3700]) },
]

const allPrefectures = shippingRegions.flatMap((r) => r.prefectures)

export function findRegion(prefecture: string | null | undefined) {
  if (!prefecture) return undefined
  return shippingRegions.find((r) => r.prefectures.includes(prefecture))
}

// 住所文字列の先頭から都道府県名を取り出す（手入力時のフォールバック）
export function prefectureFromAddress(address: string) {
  const trimmed = address.trim()
  return allPrefectures.find((p) => trimmed.includes(p))
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
