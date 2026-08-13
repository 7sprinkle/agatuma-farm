import { news } from '@/lib/site-data'
import { SectionHeading } from '@/components/section-heading'
import { FadeIn } from '@/components/fade-in'

export function NewsSection() {
  return (
    <section id="news" className="bg-background py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <SectionHeading
            en="News"
            ja="お知らせ"
            intro="季節のたより、収穫の記録、催しのご案内。農場からの小さなお知らせをお届けします。"
          />
        </FadeIn>

        <ul className="mt-16 border-t border-border md:mt-20">
          {news.map((item, i) => (
            <FadeIn as="li" key={item.id} delay={i * 90}>
              <a
                href="#news"
                className="group flex flex-col items-center gap-3 border-b border-border py-10 text-center transition-colors md:py-12"
              >
                <div className="flex items-center gap-4">
                  <time className="font-serif text-sm text-muted-foreground">{item.date}</time>
                  <span className="font-sans text-[0.65rem] tracking-[0.25em] text-accent">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium leading-snug text-foreground text-balance transition-colors group-hover:text-accent md:text-2xl">
                  {item.title}
                </h3>
                <p className="prose-jp mx-auto max-w-lg font-sans text-sm text-muted-foreground text-pretty">
                  {item.body}
                </p>
              </a>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="mt-16 flex justify-center">
          <a
            href="#news"
            className="group inline-flex items-center gap-3 font-sans text-sm tracking-wide text-foreground transition-colors hover:text-accent"
          >
            <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-12" />
            すべてのお知らせ
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
