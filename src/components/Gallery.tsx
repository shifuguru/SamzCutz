import { galleryImages } from "@/data/siteContent";

function Gallery() {
  return (
    <section id="gallery" className="section-shell">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-silver">Gallery</p>
          <h2 className="font-display text-3xl text-white">Textures & silhouettes</h2>
        </div>
        <p className="text-xs text-platinum/60">Replace placeholder SVGs in /public/placeholders.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {galleryImages.map((image) => (
          <figure key={image.src} className="relative overflow-hidden rounded-2xl border border-white/5">
            <img src={image.src} alt={image.label} className="h-64 w-full object-cover" loading="lazy" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm font-medium text-platinum">
              {image.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
