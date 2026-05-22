import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

function LogoTitle({
  className = "",
  imgClassName = "h-9 sm:h-10",
}: {
  className?: string;
  imgClassName?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const onError = useCallback(() => setImgFailed(true), []);
  return (
    <span className={`items-center ${className || "flex"}`}>
      {!imgFailed ? (
        <img
          src="/title.png"
          alt="Wild Chikkamagaluru Treks"
          onError={onError}
          className={`${imgClassName} w-auto object-contain max-w-[140px] sm:max-w-none`}
          style={{ mixBlendMode: "multiply" }}
          draggable={false}
        />
      ) : (
        <span className="flex flex-col leading-none gap-[1px]">
          <span className="leading-none">
            <span className="font-brush text-[15px] sm:text-[16px] text-primary">Wild </span>
            <span className="font-condensed font-bold text-[12px] sm:text-[13px] tracking-wide text-foreground uppercase">
              Chikkamagaluru
            </span>
          </span>
          <span className="font-condensed uppercase tracking-[0.22em] text-[8px] text-primary/70 font-semibold">
            — Treks —
          </span>
        </span>
      )}
    </span>
  );
}

export { LogoTitle };

const links = [
  { href: "#about", label: "About" },
  { href: "#treks", label: "Treks" },
  { href: "#stay", label: "Stay" },
  { href: "#contact", label: "Contact" },
  { href: "#gallery", label: "Gallery" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isPermits = location.pathname === "/permits";

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      if (isHome) {
        e.preventDefault();
        // Handle smooth scroll on home page
        const id = hash.slice(1);
        if (id === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
      e.preventDefault();
      navigate({ to: "/" }).then(() => {
        const id = hash.slice(1);
        const attempt = (tries: number) => {
          if (id === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else if (tries > 0) {
            setTimeout(() => attempt(tries - 1), 120);
          }
        };
        setTimeout(() => attempt(8), 80);
      });
    },
    [isHome, navigate],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const newId = e.target.id;
            setActive(newId);
            // Update URL hash without triggering scroll
            const newHash = newId === "top" ? "" : `#${newId}`;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, "", newHash || window.location.pathname);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    // Also observe the top section
    const topEl = document.querySelector("#top");
    if (topEl) observer.observe(topEl);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3.5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-1 transition-all duration-500 overflow-visible ${
          scrolled
            ? "glass border border-white/60 shadow-[0_8px_32px_-8px_oklch(0.3_0.08_155/0.22),inset_0_1px_0_oklch(1_0_0/0.65)]"
            : "bg-white/40 backdrop-blur border border-white/50 shadow-[0_2px_12px_-4px_oklch(0.4_0.07_155/0.12),inset_0_1px_0_oklch(1_0_0/0.5)]"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group overflow-visible">
          <div className="relative">
            <img
              src="/icon.png"
              alt="Wild Chikkamagaluru Treks"
              className="h-9 w-9 rounded-lg object-cover shadow-sm ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary border-2 border-white shadow-sm" />
          </div>
          <LogoTitle />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => {
            const isActive = isHome && active === l.href.slice(1);
            const href = isHome ? l.href : `/${l.href}`;
            return (
              <li key={l.href}>
                <a
                  href={href}
                  onClick={(e) => handleAnchorClick(e, l.href)}
                  className={`relative px-3.5 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/8"
                      : "text-foreground/65 hover:text-foreground hover:bg-black/5"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
          <li>
            <Link
              to="/permits"
              className={`relative px-3.5 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                isPermits
                  ? "text-primary bg-primary/8"
                  : "text-foreground/65 hover:text-foreground hover:bg-black/5"
              }`}
            >
              Permits Guide
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <a
          href={isHome ? "#contact" : "/#contact"}
          className="group relative overflow-hidden rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-[0_2px_12px_-2px_oklch(0.42_0.12_155/0.4)] transition-all duration-200 hover:shadow-[0_4px_20px_-2px_oklch(0.42_0.12_155/0.55)] hover:-translate-y-px active:translate-y-0"
        >
          <span className="relative z-10">Plan a Trek</span>
          <span className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </a>
      </nav>
    </header>
  );
}
