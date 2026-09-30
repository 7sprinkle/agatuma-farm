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
      <div
        className={`relative mx-auto flex h-full max-w-[86rem] flex-col justify-center px-6 md:px-10 ${
          align === 'center' ? 'items-center text-center' : 'items-start text-left'
        }`}
      >
        <div
          className={`relative isolate flex flex-col ${
            align === 'center' ? 'items-center' : 'items-start'
          }`}
        >
          <div
            className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-10 rounded-[50%] bg-foreground/50 blur-3xl md:-inset-x-16 md:-inset-y-16"
            aria-hidden="true"
          />
          <blockquote
            className={`font-serif text-2xl font-medium leading-relaxed text-background text-balance sm:text-3xl md:text-4xl lg:text-[2.75rem] ${
              align === 'center' ? 'max-w-3xl' : 'max-w-2xl'
            }`}
          >
            {quote}
          </blockquote>
          {caption && (
            <p className="mt-6 font-sans text-xs tracking-[0.3em] text-background/85">
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
