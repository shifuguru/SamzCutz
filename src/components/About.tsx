import { aboutContent } from "@/data/siteContent";

function About() {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-silver">About</p>
          <h2 className="font-display text-3xl text-white">{aboutContent.title}</h2>
          <div className="mt-6 space-y-4 text-base text-platinum/85">
            {aboutContent.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-charcoal/60 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-gilded">Studio ritual</p>
          <ul className="mt-4 space-y-4 text-sm text-platinum/80">
            {aboutContent.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gilded" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="greek-border mt-8 rounded-3xl p-4 text-center text-xs uppercase tracking-[0.3em] text-platinum">
            Crafted for the modern gentleman
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
