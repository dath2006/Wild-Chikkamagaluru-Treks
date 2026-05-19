import { motion } from "motion/react";
import { Mountain } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#treks", label: "Treks" },
  { href: "#gallery", label: "Gallery" },
  { href: "#stay", label: "Stay" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3">
        <a href="#top" className="flex items-center gap-2 text-primary">
          <Mountain className="h-5 w-5" strokeWidth={1.6} />
          <span className="font-serif text-lg">Chikkamagaluru Trek</span>
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
    </motion.header>
  );
}
