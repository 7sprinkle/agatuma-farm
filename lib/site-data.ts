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
      image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-10',
    category: 'hakumai',
    name: '白米',
    size: '10kg',
    price: 4300,
      image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-15',
    category: 'hakumai',
    name: '白米',
    size: '15kg',
    price: 6300,
      image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-20',
    category: 'hakumai',
    name: '白米',
    size: '20kg',
    price: 8300,
      image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-25',
    category: 'hakumai',
    name: '白米',
    size: '25kg',
    price: 10300,
      image: '/images/product-hakumai.png',
  },
  {
    id: 'hakumai-30',
    category: 'hakumai',
    name: '白米',
    size: '30kg',
    price: 12300,
      image: '/images/product-hakumai.png',
  },
  {
    id: 'genmai-5',
    category: 'genmai',
    name: '玄米',
    size: '5kg',
    price: 2000,
      image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-10',
    category: 'genmai',
    name: '玄米',
    size: '10kg',
    price: 4000,
      image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-15',
    category: 'genmai',
    name: '玄米',
    size: '15kg',
    price: 6000,
      image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-20',
    category: 'genmai',
    name: '玄米',
    size: '20kg',
    price: 8000,
      image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-25',
    category: 'genmai',
    name: '玄米',
    size: '25kg',
    price: 10000,
      image: '/images/product-genmai.png',
  },
  {
    id: 'genmai-30',
    category: 'genmai',
    name: '玄米',
    size: '30kg',
    price: 12000,
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
