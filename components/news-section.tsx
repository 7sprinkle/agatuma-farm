import { ArrowRight } from 'lucide-react'
import { news } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'

export function NewsSection() {
  return (
    <section id="news" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <FadeIn>
            <div className="lg:sticky lg:top-32">
              <SectionHeading en="News" ja="お知らせ" index="01" />
              <p className="mt-8 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
                季節のたより、収穫の記録、催しのご案内。
                農場からの小さなお知らせをお届けします。
              </p>
              <a
                href="#news"
                className="mt-8 inline-flex items-center gap-3 font-sans text-sm tracking-wide text-foreground transition-colors hover:text-accent"
              >
                <span className="h-px w-8 bg-accent transition-all duration-300" />
                すべて見る
                <ArrowRight className="size-4" />
              </a>
            </div>
          </FadeIn>

          <div>
            <ul className="border-t border-border">
              {news.map((item, i) => (
                <FadeIn as="div" key={item.id} delay={i * 90}>
                  <li>
                    <a
                      href="#news"
                      className="group grid grid-cols-1 gap-2 border-b border-border py-8 transition-colors sm:grid-cols-[8rem_1fr] sm:gap-8 md:py-10"
                    >
                      <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                        <time className="font-serif text-sm text-muted-foreground">
                          {item.date}
                        </time>
                        <span className="font-sans text-[0.7rem] tracking-[0.2em] text-accent">
                          {item.category}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-medium leading-snug text-foreground text-pretty transition-colors group-hover:text-accent md:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </a>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
