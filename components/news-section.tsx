import { ArrowRight } from 'lucide-react'
import { news } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'

export function NewsSection() {
  return (
    <section id="news" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <FadeIn>
          <SectionHeading en="News" ja="お知らせ" />
        </FadeIn>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item, i) => (
            <FadeIn as="div" key={item.id} delay={i * 80}>
              <li className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <time className="font-sans text-sm font-medium text-muted-foreground">
                    {item.date}
                  </time>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 font-sans text-xs font-medium text-secondary-foreground">
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-foreground text-pretty">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="mt-12 text-center">
          <a
            href="#news"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            お知らせをもっと見る
            <ArrowRight className="size-4" />
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
