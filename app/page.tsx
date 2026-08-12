import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
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
        <NewsSection />
        <ServiceSection />
        <AboutSection />
        <AccessSection />
        <OrderForm />
      </main>
      <SiteFooter />
    </OrderProvider>
  )
}
