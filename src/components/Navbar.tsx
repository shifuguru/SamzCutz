import { bookingLink } from "@/data/siteContent";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Visit", href: "#location" }
];

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-onyx/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-0">
        <a href="#hero" className="flex items-center gap-3" aria-label="Samzcutz home">
          <img
            src="/samzcutz-logo.jpeg"
            alt="Samzcutz crest"
            className="h-12 w-12 rounded-full border border-white/10 object-cover shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
          />
          <div>
            <p className="text-lg font-display leading-none text-platinum">Samzcutz</p>
            <p className="text-xs uppercase tracking-[0.3em] text-silver">Te Aro</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-platinum/75 lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-gilded">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden text-right text-xs sm:block">
            <p className="font-semibold text-gilded">5.0 ★</p>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-silver">95+ verified</p>
          </div>
          <a
            href={bookingLink}
            className="pill-button border border-gilded/50 bg-gradient-to-r from-gilded/90 via-brass/90 to-gilded/90 text-sm text-onyx shadow-gold transition hover:scale-[1.02]"
          >
            Request
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
