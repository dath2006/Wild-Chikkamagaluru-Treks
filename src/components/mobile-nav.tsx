import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Mountain, Home, Phone, ImageIcon, Info, FileText } from "lucide-react";

const navItems = [
  { href: "#about", label: "About", icon: Info, type: "anchor" as const },
  { href: "#treks", label: "Treks", icon: Mountain, type: "anchor" as const },
  { href: "#stay", label: "Stay", icon: Home, type: "anchor" as const },
  { href: "#contact", label: "Contact", icon: Phone, type: "anchor" as const },
  { href: "#gallery", label: "Gallery", icon: ImageIcon, type: "anchor" as const },
  { href: "/permits", label: "Permits", icon: FileText, type: "link" as const },
];

export function MobileNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isPermitsPage = location.pathname === "/permits";

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      if (isHome) return; // normal hash scroll when already home
      e.preventDefault();
      navigate({ to: "/" }).then(() => {
        // Defer scroll until after route render + layout
        const id = hash.slice(1);
        const attempt = (tries: number) => {
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    });

    if (isHome) {
      navItems.forEach((item) => {
        if (item.type !== "anchor") return;
        const section = document.querySelector(item.href);
        if (section) observer.observe(section);
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <nav
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-300 w-[92vw] max-w-[340px] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between rounded-xl bg-white/88 backdrop-blur-2xl px-2 py-1.5 shadow-[0_6px_24px_-6px_oklch(0.25_0.08_155/0.35),0_2px_6px_-2px_oklch(0.3_0.06_155/0.15)] ring-1 ring-white/70">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isLinkItem = item.type === "link";
          // On permits page highlight the Permits item; on home highlight the active section
          const isActive = isLinkItem
            ? isPermitsPage
            : isHome && activeSection === item.href.slice(1);

          const commonClass = `relative flex flex-col items-center justify-center gap-0 rounded-lg px-2 py-1 transition-all duration-200 ${
            isActive ? "text-primary" : "text-foreground/45 hover:text-foreground/70"
          }`;

          const inner = (
            <>
              {isActive && <span className="absolute inset-0 rounded-lg bg-primary/10" />}
              <Icon
                className={`relative h-[16px] w-[16px] transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
                strokeWidth={isActive ? 2 : 1.6}
              />
              <span
                className={`relative text-[8.5px] font-medium tracking-wide transition-all duration-200 ${
                  isActive ? "text-primary" : "text-foreground/40"
                }`}
              >
                {item.label}
              </span>
            </>
          );

          // Anchor items: SPA-navigate home then scroll to section
          if (!isLinkItem) {
            const href = isHome ? item.href : `/${item.href}`;
            return (
              <a
                key={item.href}
                href={href}
                className={commonClass}
                aria-label={item.label}
                onClick={(e) => handleAnchorClick(e, item.href)}
              >
                {inner}
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href as "/permits"}
              className={commonClass}
              aria-label={item.label}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
