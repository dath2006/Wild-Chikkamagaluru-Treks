const links = [
  { href: "#about", label: "About" },
  { href: "#treks", label: "Treks" },
  { href: "#stay", label: "Stay" },
  { href: "#contact", label: "Contact" },
  { href: "#gallery", label: "Gallery" },
];

export function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 glass border border-white/70 shadow-[0_4px_24px_-8px_oklch(0.42_0.07_155/0.18),inset_0_1px_0_oklch(1_0_0/0.7)]">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src="/icon.png"
            alt="Wild Chikkamagaluru Treks"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[14px] sm:text-[16px] tracking-tight text-foreground">
              Wild Chikkamagaluru
            </span>
            <span className="uppercase tracking-[0.18em] text-[9px] sm:text-[10px] text-muted-foreground">
              Treks
            </span>
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm text-foreground/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm hover:opacity-90 transition"
        >
          Plan a Trek
        </a>
      </nav>
    </header>
  );
}
