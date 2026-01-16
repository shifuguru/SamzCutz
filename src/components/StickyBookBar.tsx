import { metadata } from "@/data/siteContent";

function StickyBookBar() {
  return (
    <div className="sticky-cta fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-3 px-4 py-3 lg:hidden">
      <div className="text-xs uppercase tracking-[0.35em] text-platinum/70">
        Quiet luxury · Te Aro
      </div>
      <a
        href={metadata.ctaPrimary.href}
        className="pill-button bg-gilded text-xs text-onyx"
      >
        {metadata.ctaPrimary.label}
      </a>
    </div>
  );
}

export default StickyBookBar;
