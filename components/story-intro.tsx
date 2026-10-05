import { FadeIn } from '@/components/fade-in'

export function StoryIntro() {
  return (
    <section className="bg-background py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.45em] text-accent">
            Our Philosophy
          </p>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-8 font-serif text-xl font-medium leading-[1.9] text-foreground sm:mt-10 sm:text-2xl sm:leading-[1.8] md:text-3xl md:leading-[1.9]">
            土を耕し、水を張り、
            <br />
            一年をかけて育てる。
            <br />
            変わらない営みの中に、
            <br />
            変わらないおいしさがあります。
          </p>
        </FadeIn>
        <FadeIn delay={240}>
          <span className="mx-auto mt-10 block h-px w-10 bg-accent sm:mt-12" aria-hidden="true" />
          <p className="prose-jp mx-auto mt-10 max-w-md font-sans text-sm text-muted-foreground text-pretty sm:mt-12">
            我妻農場は、宮城県角田市で
            <br className="sm:hidden" />
            代々つづく米農家です。
            <br className="sm:hidden" />
            自然の恵みと静かに向き合いながら、
            <br className="sm:hidden" />
            家族に食べさせたいと思えるお米を、
            <br className="sm:hidden" />
            まっすぐ皆さまの食卓へお届けしています。
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
