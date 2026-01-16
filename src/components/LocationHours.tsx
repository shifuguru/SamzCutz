import { operatingHours, locationInfo, metadata } from "@/data/siteContent";

function LocationHours() {
  return (
    <section id="location" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.5em] text-silver">Visit</p>
          <h2 className="font-display text-3xl text-white">Chair 01 · Te Aro</h2>
          <p className="text-platinum/80">{locationInfo.address}</p>
          <div className="flex flex-wrap gap-3 text-sm text-platinum/70">
            <span className="rounded-full border border-gilded/40 px-3 py-1 text-xs uppercase tracking-[0.3em]">5.0 ★ Verified clients</span>
            <span>{locationInfo.phone}</span>
          </div>
          <a
            href={metadata.ctaSecondary.href}
            target="_blank"
            rel="noreferrer"
            className="pill-button border border-gilded/50 text-[0.75rem] text-gilded"
          >
            Navigate with Maps
          </a>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Map to Samzcutz"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3091.5269375107!2d174.773!3d-41.2927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38afd39f126c1d%3A0x0!2s99%20Taranaki%20Street!5e0!3m2!1sen!2snz!4v1700000000000"
              className="h-56 w-full"
            />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-silver">Hours</p>
          <ul className="mt-4 divide-y divide-white/10 text-sm text-platinum/80">
            {operatingHours.map((slot) => (
              <li key={slot.day} className="flex items-center justify-between py-3">
                <span className="font-semibold text-white">{slot.day}</span>
                <span>{slot.range}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-platinum/60">After-hours appointments available—mention it in your booking request.</p>
        </div>
      </div>
    </section>
  );
}

export default LocationHours;
