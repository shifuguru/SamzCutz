import { metadata, locationInfo } from "@/data/siteContent";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-platinum/70 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start gap-3">
          <img
            src="/samzcutz-logo.jpeg"
            alt="Samzcutz crest"
            loading="lazy"
            className="h-14 w-14 rounded-full border border-white/10 object-cover shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
          />
          <div>
            <p className="font-display text-2xl text-white">Samzcutz</p>
            <p>{locationInfo.shortAddress}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.35em] text-silver">
          <a href="#services" className="hover:text-gilded">Services</a>
          <a href="#gallery" className="hover:text-gilded">Gallery</a>
          <a href="#testimonials" className="hover:text-gilded">Stories</a>
        </div>
        <div className="flex flex-col gap-3 text-right">
          <a
            href={metadata.ctaPrimary.href}
            className="pill-button border border-white/10 text-[0.75rem] text-platinum hover:border-gilded/60"
          >
            {metadata.ctaPrimary.label}
          </a>
          <p className="text-xs text-platinum/60">© {new Date().getFullYear()} Samzcutz · Crafted in Wellington</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
