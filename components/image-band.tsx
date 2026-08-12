import Image from 'next/image'

type ImageBandProps = {
  src: string
  alt: string
  quote: string
  caption?: string
  align?: 'left' | 'center'
}

export function ImageBand({ src, alt, quote, caption, align = 'center' }: ImageBandProps) {
  return (
    <section className="relative h-[70vh] min-h-[420px] overflow-hidden md:h-[85vh]">
      <div className="group absolute inset-0">
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          sizes="100vw"
          className="img-zoom object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-foreground/35" />

      <div
        className={`relative mx-auto flex h-full max-w-[86rem] flex-col justify-center px-6 md:px-10 ${
          align === 'center' ? 'items-center text-center' : 'items-start text-left'
        }`}
      >
        <blockquote
          className={`font-serif text-2xl font-medium leading-relaxed text-background text-balance sm:text-3xl md:text-4xl lg:text-[2.75rem] ${
            align === 'center' ? 'max-w-3xl' : 'max-w-2xl'
          }`}
        >
          {quote}
        </blockquote>
        {caption && (
          <p className="mt-6 font-sans text-xs tracking-[0.3em] text-background/75">
            {caption}
          </p>
        )}
      </div>
    </section>
  )
}
