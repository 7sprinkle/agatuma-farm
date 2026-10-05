import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { StoryIntro } from '@/components/story-intro'
import { ImageBand } from '@/components/image-band'
import { NewsSection } from '@/components/news-section'
import { ServiceSection } from '@/components/service-section'
import { AboutSection } from '@/components/about-section'
import { AccessSection } from '@/components/access-section'
import { OrderForm } from '@/components/order-form'
import { SiteFooter } from '@/components/site-footer'
import { OrderProvider } from '@/components/order-context'

export default function Home() {
  return (
    <OrderProvider>
      <SiteHeader />
      <main>
        <HeroSection />
        <StoryIntro />
        <ImageBand src="/captures/upper_2-34.jpg" alt="山に囲まれた角田の田んぼ" quote="季節はめぐり、|田は静かに|実りを重ねる。" caption="夏 ・ 実りへ向かう頃" />
        <NewsSection />
        <ImageBand src="/captures/upper_2-50.jpg" alt="作業小屋に並ぶ赤いコンバイン" quote="手のひらが覚えている、|この土地の仕事。" caption="秋 ・ 収穫の日々" />
        <ServiceSection />
        <AboutSection />
        {/* <ImageBand src="/images/harvest-hands.png" alt="山並みへと続く一面の田んぼ" quote="土に根ざした暮らしが、一膳のごはんになる。" caption="角田の風景" /> */}
        {/* <AccessSection /> */}
        <ImageBand src="/captures/upper_2-74.jpg" alt="お皿にのった海苔巻きのおにぎり" quote="炊きたての湯気の向こうに、|一年がある。" caption="食卓へ" />
        <OrderForm />
      </main>
      <SiteFooter />
    </OrderProvider>
  )
}
