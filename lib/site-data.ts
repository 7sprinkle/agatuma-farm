// 仮データ（後で microCMS 連携予定）

export type NewsItem = {
  id: string
  date: string
  category: string
  title: string
  body: string
}

export type Product = {
  id: string
  category: 'hakumai' | 'genmai'
  name: string
  size: string
  price: number
  description: string
  image: string
}

export const news: NewsItem[] = [
  {
    id: 'news-2024-1101',
    date: '2024.11.01',
    category: '収穫',
    title: '令和6年産 新米の販売を開始しました',
    body: '今年も無事に収穫を終え、香り高い新米のご予約受付を開始いたしました。数量限定でのご案内です。',
  },
  {
    id: 'news-2024-1015',
    date: '2024.10.15',
    category: 'お知らせ',
    title: '玄米の取り扱いサイズを拡充しました',
    body: '健康志向のお客様からのご要望にお応えし、玄米の15kg・20kgサイズを新たにご用意しました。',
  },
  {
    id: 'news-2024-0920',
    date: '2024.09.20',
    category: 'イベント',
    title: '角田市の収穫祭に出店します',
    body: '地元の恵みを味わっていただける収穫祭に、我妻農場も参加いたします。ぜひお立ち寄りください。',
  },
  {
    id: 'news-2024-0801',
    date: '2024.08.01',
    category: 'お知らせ',
    title: '夏季の発送スケジュールについて',
    body: 'お盆期間中の発送および休業日についてのご案内です。ご注文はお早めにお願いいたします。',
  },
]

export const products: Product[] = [
  {
    id: 'hakumai-5',
    category: 'hakumai',
    name: '白米',
    size: '5kg',
    price: 3500,
    description: 'まずはお試しに。毎日の食卓にちょうど良い基本のサイズです。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-10',
    category: 'hakumai',
    name: '白米',
    size: '10kg',
    price: 6600,
    description: 'ご家族での日常使いに。人気の定番サイズです。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-15',
    category: 'hakumai',
    name: '白米',
    size: '15kg',
    price: 9600,
    description: 'よく召し上がるご家庭に。まとめ買いでお得です。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-20',
    category: 'hakumai',
    name: '白米',
    size: '20kg',
    price: 12400,
    description: '大家族や飲食店の方に。一番お得な大容量サイズ。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'genmai-5',
    category: 'genmai',
    name: '玄米',
    size: '5kg',
    price: 3200,
    description: '栄養そのまま。玄米食をはじめたい方におすすめのサイズ。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-10',
    category: 'genmai',
    name: '玄米',
    size: '10kg',
    price: 6000,
    description: '健康志向のご家庭に。噛むほどに広がる自然の甘み。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-15',
    category: 'genmai',
    name: '玄米',
    size: '15kg',
    price: 8800,
    description: '毎日の玄米食に。まとめてのご購入がおすすめです。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-20',
    category: 'genmai',
    name: '玄米',
    size: '20kg',
    price: 11400,
    description: '本格的に玄米生活を。たっぷり楽しめる大容量サイズ。',
    image: '/images/product-genmai.png',
  },
]

// フォームの商品選択プルダウン用
export const productOptions = products.map((p) => ({
  value: p.id,
  label: `${p.name} ${p.size}（¥${p.price.toLocaleString()}）`,
}))

export const navLinks = [
  { href: '#news', label: 'News' },
  { href: '#service', label: 'Service' },
  { href: '#about', label: 'About' },
  { href: '#access', label: 'Access' },
  { href: '#form', label: 'お問い合わせ' },
]
