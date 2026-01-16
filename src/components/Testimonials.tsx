import { testimonials } from "@/data/siteContent";

function Testimonials() {
  return (
    <section id="testimonials" className="section-shell">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-silver">Testimonials</p>
          <h2 className="font-display text-3xl text-white">Proof in the chair</h2>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-gilded">Client impressions</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.quote} className="card-outline flex flex-col gap-4 rounded-2xl p-5">
            <blockquote className="text-base text-platinum/85">“{testimonial.quote}”</blockquote>
            <figcaption className="text-xs uppercase tracking-[0.35em] text-silver">
              {testimonial.name} · {testimonial.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
