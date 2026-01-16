import { heroContent, metadata, locationInfo } from "@/data/siteContent";

function Hero() {
  return (
    <section id="hero" className="mt-6">
      <div className="hero-backdrop relative overflow-hidden rounded-[32px] p-8 sm:p-12">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="absolute left-0 top-1/2 h-[280px] w-[140px] -translate-y-1/2 border-l border-gilded/30" />
          <div className="absolute right-6 top-6 h-24 w-24 animate-float rounded-full border border-white/10" />
        </div>

        <div className="relative z-10 space-y-6 text-center sm:text-left">
          <p className="text-sm uppercase tracking-[0.5em] text-platinum/60">Samuel Diaz · Te Aro</p>
          <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
            {heroContent.featuredHeadline}
          </h1>
          <p className="max-w-2xl text-base text-platinum/85 sm:text-lg">
            {heroContent.subheadline}
          </p>

          <div className="flex flex-col items-center gap-3 text-sm text-platinum/70 sm:flex-row">
            <span className="rounded-full border border-gilded/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-gilded">
              {heroContent.badge}
            </span>
            <span>Single-chair studio · {locationInfo.shortAddress}</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href={metadata.ctaPrimary.href}
              className="pill-button flex-1 bg-gradient-to-r from-gilded via-brass to-gilded text-sm text-onyx shadow-gold transition hover:scale-[1.01]"
            >
              {metadata.ctaPrimary.label}
            </a>
            <a
              href={metadata.ctaSecondary.href}
              target="_blank"
              rel="noreferrer"
              className="pill-button flex-1 border border-white/15 text-sm text-platinum transition hover:border-gilded/60"
            >
              {metadata.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
