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
    id: 'news-2026-0901',
    date: '2026.10.05',
    category: '収穫',
    title: '令和8年産 新米の販売を開始しました',
    body: '今年も無事に収穫を終え、香り高い新米のご受付を開始いたしました。数量限定でのご案内です。',
  },
  // {
  //   id: 'news-2026-0902',
  //   date: '2026.09.02',
  //   category: 'お知らせ',
  //   title: '玄米の取り扱いサイズを拡充しました',
  //   body: '健康志向のお客様からのご要望にお応えし、玄米の15kg・20kgサイズを新たにご用意しました。',
  // },
]

export const products: Product[] = [
  {
    id: 'hakumai-5',
    category: 'hakumai',
    name: '白米',
    size: '5kg',
    price: 2300,
    description: 'まずはお試しに。一人暮らしや少人数のご家庭にちょうど良いサイズです。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-10',
    category: 'hakumai',
    name: '白米',
    size: '10kg',
    price: 4300,
    description: 'ご家族での日常使いに。毎日のごはんに選ばれている定番サイズです。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-15',
    category: 'hakumai',
    name: '白米',
    size: '15kg',
    price: 6300,
    description: 'よく召し上がるご家庭に。買い足しの手間が減る、ゆとりのある量です。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-20',
    category: 'hakumai',
    name: '白米',
    size: '20kg',
    price: 8300,
    description: '食べ盛りのお子さまがいるご家庭に。ひと月分をまとめて備えられます。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-25',
    category: 'hakumai',
    name: '白米',
    size: '25kg',
    price: 10300,
    description: '三世代のご家族や来客の多いお宅に。たっぷり使える安心の容量です。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-30',
    category: 'hakumai',
    name: '白米',
    size: '30kg',
    price: 12300,
    description: '飲食店や大人数でお使いの方に。1kgあたりが最もお得な大容量です。',
    image: '/images/product-hakumai.png',
  },
  {
    id: 'genmai-5',
    category: 'genmai',
    name: '玄米',
    size: '5kg',
    price: 2000,
    description: '栄養をそのままに。玄米食をはじめてみたい方におすすめのサイズです。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-10',
    category: 'genmai',
    name: '玄米',
    size: '10kg',
    price: 4000,
    description: '健康を気づかうご家庭に。噛むほどに広がる自然な甘みをお楽しみください。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-15',
    category: 'genmai',
    name: '玄米',
    size: '15kg',
    price: 6000,
    description: '玄米食が習慣になった方に。ご自宅の精米機で分づき米にするのもおすすめです。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-20',
    category: 'genmai',
    name: '玄米',
    size: '20kg',
    price: 8000,
    description: 'ご家族そろって玄米生活を。毎日の食卓をしっかり支える容量です。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-25',
    category: 'genmai',
    name: '玄米',
    size: '25kg',
    price: 10000,
    description: '精米したてを味わいたい方に。食べる分だけ精米してお使いいただけます。',
    image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-30',
    category: 'genmai',
    name: '玄米',
    size: '30kg',
    price: 12000,
    description: '玄米を主食にされる方や飲食店に。一年を通して頼れる最大容量です。',
    image: '/images/product-genmai.png',
  },
]

// フォームの商品選択プルダウン用
export const productOptions = products.map((p) => ({
  value: p.id,
  label: `${p.name} ${p.size} — ¥${p.price.toLocaleString()}（税込）`,
}))

export const navLinks = [
  { href: '#news', label: 'News' },
  { href: '#service', label: 'Service' },
  { href: '#about', label: 'About' },
  // { href: '#access', label: 'Access' },
  { href: '#form', label: 'ご注文' },
]
