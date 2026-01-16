import { services, bookingLink } from "@/data/siteContent";

function Services() {
  return (
    <section id="services" className="section-shell">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-silver">Services</p>
          <h2 className="font-display text-3xl text-white">Tailored grooming menu</h2>
          <div className="luxe-divider mt-4" aria-hidden />
        </div>
        <a
          href={bookingLink}
          className="pill-button border border-gilded/40 text-[0.75rem] text-gilded"
        >
          Request a slot
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.name} className="card-outline relative overflow-hidden rounded-2xl p-5">
            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-gilded/50 to-transparent" />
            <header className="flex flex-wrap items-baseline justify-between gap-3 pb-4">
              <h3 className="font-display text-2xl text-white">{service.name}</h3>
              <p className="font-semibold text-gilded">{service.price}</p>
            </header>
            <p className="text-sm text-platinum/80">{service.description}</p>
            <footer className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.35em] text-silver/80">
              <span>{service.duration}</span>
              <span className="text-gilded">{service.availability}</span>
            </footer>
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs text-platinum/60">
        Update services anytime via <span className="text-gilded">src/data/siteContent.ts</span> — add or reorder entries to refresh the menu.
      </p>
    </section>
  );
}

export default Services;
