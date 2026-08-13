import { FadeIn } from '@/components/fade-in'

export function StoryIntro() {
  return (
    <section className="bg-background py-32 md:py-48">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.45em] text-accent">
            Our Philosophy
          </p>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-10 font-serif text-2xl font-medium leading-[1.8] text-foreground text-balance md:text-3xl md:leading-[1.9]">
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
          <span className="mx-auto mt-12 block h-px w-10 bg-accent" aria-hidden="true" />
          <p className="prose-jp mx-auto mt-12 max-w-md font-sans text-sm text-muted-foreground text-pretty">
            我妻農場は、宮城県角田市で代々つづく米農家です。
            自然の恵みと静かに向き合いながら、家族に食べさせたいと思えるお米を、
            まっすぐ皆さまの食卓へお届けしています。
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
