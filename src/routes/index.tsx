import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, useCallback, memo, useMemo } from "react";
import {
  Mountain,
  Leaf,
  Heart,
  Compass,
  Phone,
  Instagram,
  ArrowRight,
  Sparkles,
  Home,
  Wifi,
  Coffee,
  ImageIcon,
  PlayCircle,
  ArrowDown,
  Check,
  Info,
} from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SectionReveal, RevealText, RevealBlock, RevealImage } from "@/components/reveal";
import CircularGallery from "@/components/circular-gallery";
import { TrekModal } from "@/components/trek-modal";
import { GalleryLightbox, GalleryTile, type GalleryItem } from "@/components/gallery-lightbox";

import BorderGlow from "@/components/border-glow";
import TiltedCard from "@/components/tilted-card";
import { TrekCardStack, type TrekCard } from "@/components/trek-card-stack";
import { treks, type Trek } from "@/lib/treks";
import {
  HERO_TILE_IMAGES,
  TREK_COVER_IMAGES,
  TREK_MEDIA_IMAGES,
  SITE_IMAGES,
  MOBILE_CAROUSEL_IMAGES,
} from "@/lib/media";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

// Floating media tile used as animated background piece
type Tile = {
  label: string;
  variant: "image" | "video";
  // position (% of container)
  top: string;
  left: string;
  // size
  w: string;
  h: string;
  rotate: number;
  // animation
  delay: number;
  duration: number;
  yRange: number;
  xRange: number;
  z: number;
};

// Pool of media captions the tiles cycle through
const mediaPool: { label: string; variant: "image" | "video" }[] = [
  { label: "Mullayanagiri sunrise", variant: "image" },
  { label: "Kudremukh ridge", variant: "image" },
  { label: "Hebbe falls", variant: "video" },
  { label: "Trail through mist", variant: "image" },
  { label: "Coffee estate", variant: "image" },
  { label: "Summit camp", variant: "video" },
  { label: "Baba Budangiri", variant: "image" },
  { label: "Z-Point dusk", variant: "image" },
  { label: "Netravati ridge", variant: "video" },
  { label: "Shola forest", variant: "image" },
  { label: "Bhadra backwaters", variant: "image" },
  { label: "Kemmangundi vista", variant: "video" },
];

const heroTiles: Tile[] = [
  {
    label: "Mullayanagiri sunrise",
    variant: "image",
    top: "6%",
    left: "4%",
    w: "18rem",
    h: "12rem",
    rotate: -6,
    delay: 0,
    duration: 9,
    yRange: 18,
    xRange: 8,
    z: 1,
  },
  {
    label: "Kudremukh ridge",
    variant: "image",
    top: "12%",
    left: "72%",
    w: "16rem",
    h: "20rem",
    rotate: 5,
    delay: 0.4,
    duration: 11,
    yRange: 22,
    xRange: 10,
    z: 2,
  },
  {
    label: "Hebbe falls",
    variant: "video",
    top: "55%",
    left: "2%",
    w: "15rem",
    h: "18rem",
    rotate: 4,
    delay: 0.8,
    duration: 10,
    yRange: 16,
    xRange: 12,
    z: 1,
  },
  {
    label: "Trail through mist",
    variant: "image",
    top: "60%",
    left: "78%",
    w: "17rem",
    h: "13rem",
    rotate: -4,
    delay: 0.2,
    duration: 12,
    yRange: 20,
    xRange: 9,
    z: 2,
  },
  {
    label: "Coffee estate",
    variant: "image",
    top: "32%",
    left: "38%",
    w: "14rem",
    h: "10rem",
    rotate: -2,
    delay: 1.0,
    duration: 13,
    yRange: 14,
    xRange: 14,
    z: 1,
  },
  {
    label: "Summit camp",
    variant: "video",
    top: "78%",
    left: "44%",
    w: "13rem",
    h: "9rem",
    rotate: 3,
    delay: 0.6,
    duration: 10,
    yRange: 12,
    xRange: 10,
    z: 1,
  },
];

function TileContent({ seed, visible }: { seed: number; visible: boolean }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(seed % mediaPool.length);
  useEffect(() => {
    if (reduce || !visible) return;

    // RAF-based timing to sync with display vsync (eliminates mid-frame flashes)
    let rafId = 0;
    let timeoutId = 0;
    const delay = 3600 + seed * 450;

    const scheduleNext = () => {
      const start = performance.now();
      const check = (now: number) => {
        if (now - start >= delay) {
          setIdx(
            (i) => (i + 1 + Math.floor(Math.random() * (mediaPool.length - 1))) % mediaPool.length,
          );
          scheduleNext(); // Schedule next cycle
        } else {
          rafId = requestAnimationFrame(check);
        }
      };
      rafId = requestAnimationFrame(check);
    };

    // Initial delay before first change
    timeoutId = window.setTimeout(scheduleNext, delay);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [seed, reduce, visible]);
  const item = mediaPool[idx];
  const Icon = item.variant === "video" ? PlayCircle : ImageIcon;
  const hue1 = 150 + ((idx * 7) % 40);
  const hue2 = 170 + ((idx * 11) % 30);
  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
        transition={{
          opacity: { duration: reduce ? 0 : 1.6, ease: [0.4, 0, 0.2, 1] },
          scale: { duration: reduce ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] },
        }}
        className="absolute inset-0"
      >
        {HERO_TILE_IMAGES[item.label] ? (
          <img
            src={HERO_TILE_IMAGES[item.label]}
            alt={item.label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 20%, oklch(0.85 0.09 ${hue1} / 0.6), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.85 0.07 ${hue2} / 0.55), transparent 60%)`,
            }}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-primary/70 pointer-events-none">
          {!HERO_TILE_IMAGES[item.label] && (
            <div className="rounded-full bg-white/70 p-2.5 backdrop-blur shadow-sm">
              <Icon className="h-5 w-5" strokeWidth={1.4} />
            </div>
          )}
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 px-3 text-center drop-shadow">
            {item.label}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function FloatingTile({
  tile,
  index,
  scrollY,
  visible,
}: {
  tile: Tile;
  index: number;
  scrollY: MotionValue<number>;
  visible: boolean;
}) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  // Parallax depth varies by z and index — deeper tiles move slower
  const depth = tile.z === 2 ? 120 : 200;
  const direction = index % 2 === 0 ? 1 : -1;
  const parallaxY = useTransform(scrollY, [0, 1], [0, depth * direction]);

  // CSS custom properties for the keyframe animation (unique per tile)
  const cssVars = {
    "--tile-y": tile.yRange,
    "--tile-x": tile.xRange,
    "tile-rotate": `${tile.rotate}deg`,
    "--tile-dur": `${tile.duration}s`,
    "--tile-delay": `${tile.delay}s`,
  } as React.CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30, rotate: tile.rotate }}
      animate={
        reduce
          ? { opacity: 1, scale: 1, y: 0, rotate: tile.rotate }
          : { opacity: 1, scale: 1, y: 0, rotate: tile.rotate }
      }
      transition={
        reduce
          ? { duration: 0.6, delay: tile.delay }
          : {
              opacity: { duration: 1.2, delay: tile.delay },
              scale: { duration: 1.2, delay: tile.delay, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.8, delay: tile.delay, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 0.8, delay: tile.delay },
            }
      }
      style={{
        top: tile.top,
        left: tile.left,
        width: tile.w,
        height: tile.h,
        zIndex: tile.z,
        translateY: reduce || isMobile ? 0 : parallaxY,
        ...cssVars,
      }}
      className={cn(
        "absolute hidden md:block rounded-3xl overflow-hidden border border-white/60 shadow-[0_20px_60px_-25px_oklch(0.42_0.07_155_/_0.45)] gradient-mist",
        !reduce && "animate-float-tile",
      )}
    >
      <TileContent seed={index} visible={visible} />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50" />
      <span className="absolute top-3 left-3 text-[9px] font-mono text-primary/50 z-10">
        0{index + 1}
      </span>
    </motion.div>
  );
}

// Trek cards data for the mobile hero card stack
const heroTrekCards: TrekCard[] = treks.map((t) => ({
  id: t.name,
  name: t.name,
  tag: t.tag,
  // Use actual images from media registry, fallback to picsum placeholder
  imageUrl:
    MOBILE_CAROUSEL_IMAGES[t.name] || `https://picsum.photos/seed/${t.coverSeed + 200}/360/640`,
}));

// Mobile hero: open portrait deck (top 70%) + frosted text zone (bottom)
function MobileHero() {
  const reduce = useReducedMotion();
  return (
    <div className="md:hidden relative h-svh min-h-[620px] w-full overflow-hidden">
      {/* Preload first 3 hero images at highest browser priority */}
      {heroTrekCards.slice(0, 3).map((c) => (
        <link key={c.id} rel="preload" as="image" href={c.imageUrl} />
      ))}
      {/* ── Ambient theme background ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, oklch(0.84 0.15 55/0.42), transparent 34%), radial-gradient(circle at 16% 12%, oklch(0.82 0.09 28/0.28), transparent 30%), linear-gradient(160deg, oklch(0.93 0.035 165) 0%, oklch(0.9 0.055 150) 42%, oklch(0.86 0.07 138) 72%, oklch(0.81 0.09 125) 100%)",
        }}
      />
      <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[oklch(0.88_0.08_165/0.45)] blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-20 h-72 w-72 rounded-full bg-[oklch(0.82_0.15_52/0.34)] blur-3xl pointer-events-none" />

      {/* ── Open moving card deck (top 70%) ── */}
      <div className="absolute inset-x-0 top-0 h-[70%] flex items-center justify-center pt-16">
        <TrekCardStack cards={heroTrekCards} visibleCount={5} cycleInterval={2000} />
      </div>

      {/* ── Fading dissolve band — theme colors bleed over card bottoms ── */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "56%",
          bottom: 0,
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.88 0.055 152/0.28) 22%, oklch(0.87 0.06 150/0.62) 46%, oklch(0.86 0.065 148/0.92) 72%, oklch(0.85 0.065 147) 100%)",
        }}
      />
      {/* Masked blur band at the crossover point */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "53%",
          height: "18%",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 35%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 35%, black 65%, transparent 100%)",
        }}
      />

      {/* ── Text content anchored to bottom 36% ── */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] z-10 flex flex-col items-center justify-center px-6 pb-8 gap-3">
        {/* Location pill */}
        <div className="hero-fade-in inline-flex items-center gap-2 rounded-full bg-white/45 backdrop-blur-sm px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] text-primary/90 border border-white/65">
          <Leaf className="h-3 w-3 text-primary/75" />
          Western Ghats · Karnataka
        </div>

        {/* Headline */}
        <h1 className="hero-fade-in [animation-delay:60ms] font-serif text-[1.7rem] leading-[1.18] text-primary text-center max-w-[265px]">
          Go hiking before your knees{" "}
          <em className="text-gradient-nature not-italic">file for early retirement</em>
        </h1>

        {/* CTA row */}
        <div className="hero-fade-in [animation-delay:120ms] flex items-center gap-2.5 mt-1">
          <a
            href="#treks"
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all active:scale-95"
          >
            Explore Treks
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white/50 backdrop-blur-sm px-5 py-2.5 text-xs font-medium text-primary transition-all active:scale-95"
          >
            Gallery
          </a>
        </div>

        {/* Scroll cue */}
        <div className="hero-fade-in [animation-delay:180ms] flex flex-col items-center gap-1 text-primary/35 mt-0.5">
          <motion.div
            animate={reduce ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Marquee word ticker
function WordMarquee() {
  const reduce = useReducedMotion();
  const words = [
    "Mullayanagiri",
    "Kudremukh",
    "Netravati",
    "Baba Budangiri",
    "Hebbe Falls",
    "Kemmangundi",
    "Z-Point",
    "Bhadra",
  ];
  // Duplicate once for seamless infinite scroll (2x total)
  const loop = [...words, ...words];

  if (reduce) {
    return (
      <div className="relative overflow-hidden py-3 border-y border-primary/10 bg-white/30 backdrop-blur-sm">
        <div className="flex gap-10 whitespace-nowrap">
          {words.map((w, i) => (
            <span
              key={i}
              className="font-serif italic text-2xl sm:text-3xl text-primary/70 flex items-center gap-10"
            >
              {w}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-3 border-y border-primary/10 bg-white/30 backdrop-blur-sm">
      <div className="marquee-container flex gap-10 whitespace-nowrap w-max">
        {loop.map((w, i) => (
          <span
            key={i}
            className="font-serif italic text-2xl sm:text-3xl text-primary/70 flex items-center gap-10"
          >
            {w}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 900], [0, 1]);
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => {
      setHeroVisible(v < window.innerHeight * 0.9);
    });
    return unsub;
  }, [scrollY]);
  return (
    <>
      <section id="top" className="fixed inset-x-0 top-0 h-svh overflow-hidden z-0">
        {/* Mobile-specific split hero */}
        <MobileHero />

        {/* Desktop stage with floating photo/video tiles */}
        <div className="relative hidden md:block h-full min-h-[680px] w-full pt-24">
          {/* ambient blobs */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 -left-32 h-96 w-96 rounded-full bg-[oklch(0.85_0.09_165_/_0.5)] blur-3xl" />
            <div className="absolute bottom-0 -right-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.90_0.12_48_/_0.4)] blur-3xl" />
            <div className="absolute top-1/2 -right-16 h-64 w-64 rounded-full bg-[oklch(0.92_0.10_38_/_0.25)] blur-2xl" />
          </div>

          {/* Floating tiles layer */}
          <div className="absolute inset-0 overflow-hidden">
            {heroTiles.map((t, i) => (
              <FloatingTile
                key={t.label}
                tile={t}
                index={i}
                scrollY={scrollYProgress}
                visible={heroVisible}
              />
            ))}
          </div>

          {/* Centered focal content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-primary/80">
                <Leaf className="h-3.5 w-3.5" />
                Western Ghats · Karnataka
              </div>

              {/* Stamp-style focal mark */}
              <div className="relative mt-8 flex items-center justify-center">
                <div className="glass rounded-full px-6 py-3 flex items-center gap-3 shadow-[0_15px_50px_-20px_oklch(0.42_0.07_155_/_0.5)]">
                  <img src="/icon.png" alt="" className="h-8 w-8 rounded-full object-cover" />
                  <span className="font-serif text-lg sm:text-xl text-primary">
                    Wild Chikkamagaluru Treks
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <h1 className="mt-6 sm:mt-10 font-serif text-xl sm:text-5xl text-primary leading-tight max-w-2xl px-2 sm:px-0">
                Go hiking before your knees{" "}
                <em className="text-gradient-nature not-italic">file for early retirement</em>
              </h1>

              <div className="mt-5 sm:mt-8 flex items-center gap-3">
                <a
                  href="#treks"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/30"
                >
                  Explore Treks
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur hover:bg-white/80 transition"
                >
                  Watch the journey
                </a>
              </div>
            </motion.div>

            {/* scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 6, 0] }}
              transition={{
                opacity: { duration: 1, delay: 1.4 },
                y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-primary/60"
            >
              <ArrowDown className="h-3 w-3" /> Scroll
            </motion.div>
          </div>
        </div>
      </section>
      {/* Spacer — keeps document flow height so scroll-over content starts below the hero */}
      <div className="h-svh pointer-events-none" aria-hidden="true" />
    </>
  );
}

function About() {
  return (
    <SectionReveal id="about" className="relative py-16 md:py-28 px-4 section-blobs">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <RevealBlock>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Our Story</span>
          </RevealBlock>
          <RevealText
            as="h2"
            text="Not just another trekking group — a way of life."
            className="mt-3 font-serif text-4xl sm:text-5xl leading-tight"
            gradient
          />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <RevealBlock className="space-y-5 text-foreground/80 leading-relaxed" delay={0.1}>
            <p>
              Wild Chikkamagaluru Treks is a journey into the{" "}
              <span className="highlight">heart of the Western Ghats</span>, where misty mountains,
              lush green forests, and hidden waterfalls await those who seek{" "}
              <span className="highlight-accent">real adventure and inner peace</span>. Whether you
              are an experienced trekker or a nature-loving beginner, this is the perfect escape
              from the noise of city life.
            </p>
            <p>
              Unlike commercial operators who focus only on profits, our mission is to{" "}
              <span className="highlight">connect people with nature</span> — through{" "}
              <span className="highlight-accent">soulful experiences</span> offered at a minimal
              cost. We believe nature should be accessible to everyone, and that time in the wild
              can heal, refresh, and inspire your life.
            </p>
            <p>
              Every trek is <span className="highlight">carefully planned and guided</span> — from
              the mighty peaks of Kudremukh and Netravati to{" "}
              <span className="highlight-accent">serene forests and secret trails</span> known only
              to locals.
            </p>
          </RevealBlock>

          <RevealImage>
            <img
              src="https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Additionals/WhatsApp%20Image%202026-05-19%20at%2010.23.44%20PM%20(2).jpeg"
              alt="Forest trail photograph"
              className="photo-halo w-full object-cover rounded-3xl max-h-[420px] md:max-h-[640px]"
            />
          </RevealImage>
        </div>

        <div className="mt-10 md:mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Soulful, not commercial",
              body: "We exist to share nature, not to sell it. Treks at minimal cost, always.",
            },
            {
              icon: Compass,
              title: "Guided by locals",
              body: "Routes mapped by people who grew up in these hills — safety and wonder first.",
            },
            {
              icon: Leaf,
              title: "Leave no trace",
              body: "We protect the forests and peaks we love. Respect is part of every trek.",
            },
          ].map((f, i) => (
            <RevealBlock key={f.title} delay={i * 0.12}>
              <BorderGlow
                className="p-7 h-full"
                borderRadius={24}
                colors={["#6ee7b7", "#fbbf24", "#86efac"]}
                glowColor="155 40 60"
                glowIntensity={0.85}
                backgroundColor="oklch(0.99 0.008 130 / 0.55)"
                animated
              >
                <f.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                <h3 className="mt-4 font-serif text-xl text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </BorderGlow>
            </RevealBlock>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function Founder() {
  return (
    <SectionReveal className="relative py-16 md:py-28 px-4 section-blobs">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1fr_1.2fr] items-center">
        <RevealImage>
          <img
            src={SITE_IMAGES.founderPortrait}
            alt="Portrait of Sushanth Gowda"
            className="photo-halo w-full object-cover rounded-3xl max-h-[420px] md:max-h-[640px]"
          />
        </RevealImage>
        <div>
          <RevealBlock>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/70">
              Led by passion
            </span>
          </RevealBlock>
          <RevealText
            as="h2"
            text="SUSHANTH GOWDA"
            className="mt-3 font-serif text-4xl sm:text-5xl leading-tight"
            gradient
          />
          <RevealBlock delay={0.1}>
            <p className="mt-2 text-sm text-muted-foreground">Founder & Trek Lead</p>
            <a
              href="https://www.instagram.com/sushanth_ckm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-pink-500/80 hover:text-pink-500 transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
              @sushanth_ckm
            </a>
            <p className="mt-6 text-foreground/80 leading-relaxed">
              A passionate trekker with <span className="highlight">years of experience</span> in
              the Chikkamagaluru region, Sushanth personally leads most treks. His goal isn't only
              to guide — it's to{" "}
              <span className="highlight-accent">build a community of nature lovers</span> who
              respect and preserve our forests and mountains.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Every visitor leaves with more than photographs — they leave with a{" "}
              <span className="highlight">deeper connection to the land</span>.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="italic font-serif text-base">
                "Nature is not a destination — it's a way of life."
              </span>
            </div>
          </RevealBlock>
        </div>
      </div>
    </SectionReveal>
  );
}

function GalleryHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // Auto-hide after 5s — long enough to read, gone before it annoys
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center"
        >
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2.5 border border-white/60 shadow-lg">
            {/* drag arrows */}
            <div className="flex items-center gap-0.5">
              <motion.div
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-3 w-3 text-primary/60 rotate-180" />
              </motion.div>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
              >
                <ArrowRight className="h-3 w-3 text-primary/60" />
              </motion.div>
            </div>
            <span className="text-primary/30 text-xs">|</span>
            {/* tap pulse */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <Leaf className="h-3 w-3 text-primary/50" />
            </motion.div>
            <span className="font-serif text-[11px] text-primary/75 leading-none whitespace-nowrap">
              Drag to browse · tap to view details
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const galleryItems = treks.map((t) => ({
  image: TREK_COVER_IMAGES[t.name] || `https://picsum.photos/seed/${t.coverSeed}/800/600`,
  text: t.name,
}));

const Treks = memo(function Treks({ onTrekClick }: { onTrekClick: (t: Trek) => void }) {
  return (
    <SectionReveal id="treks" className="relative py-16 md:py-28 px-4 section-blobs">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <RevealBlock>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/70">
              Trek highlights
            </span>
          </RevealBlock>
          <RevealText
            as="h2"
            text="Chikkamagaluru's most beautiful trails."
            className="mt-3 font-serif text-4xl sm:text-5xl leading-tight"
            gradient
          />
          <RevealBlock delay={0.15}>
            <p className="mt-4 text-muted-foreground">
              From iconic summits to hidden waterfalls — each route is crafted for safety, wonder,
              and a deep connection with the wild.
            </p>
          </RevealBlock>
        </div>
      </div>

      {/* Circular WebGL gallery — full viewport width, breaks out of px-4 */}
      <div className="mt-8 md:mt-12 -mx-4 overflow-hidden">
        <RevealBlock>
          <div className="h-[380px] md:h-[620px] relative overflow-hidden">
            <CircularGallery
              items={galleryItems}
              bend={1.0}
              textColor="#2d4a3e"
              borderRadius={0.08}
              scrollSpeed={2}
              scrollEase={0.08}
              onItemClick={(i) => onTrekClick(treks[i] ?? treks[0])}
            />
            <GalleryHint />
          </div>
        </RevealBlock>
      </div>

      <div className="mx-auto max-w-6xl">
        <RevealBlock className="mt-14">
          <BorderGlow
            className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            borderRadius={24}
            colors={["#6ee7b7", "#fbbf24", "#86efac"]}
            glowColor="155 40 60"
            glowIntensity={0.85}
            backgroundColor="oklch(0.99 0.008 130 / 0.55)"
            animated
          >
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-primary">
                Custom treks, your way.
              </h3>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Tell us your interests, fitness level and schedule. We'll craft a route through
                offbeat trails, hidden waterfalls, and local stories.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition"
            >
              Plan with us <ArrowRight className="h-4 w-4" />
            </a>
          </BorderGlow>
        </RevealBlock>
      </div>
    </SectionReveal>
  );
});

// ── All gallery photos derived from trek media ─────────────────────────────
const ALL_GALLERY_ITEMS: GalleryItem[] = treks.flatMap((t) =>
  t.media.map((m) => ({
    label: m.label,
    variant: m.type,
    url: TREK_MEDIA_IMAGES[m.label] || undefined,
    seed: m.seed,
    trekName: t.name,
  })),
);

const BATCH = 12; // items loaded per scroll trigger

function Gallery({ onLightboxOpen }: { onLightboxOpen: (index: number) => void }) {
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver — loads next batch when sentinel enters viewport
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((n) => Math.min(n + BATCH, ALL_GALLERY_ITEMS.length));
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visibleItems = useMemo(() => ALL_GALLERY_ITEMS.slice(0, visibleCount), [visibleCount]);

  const hasMore = visibleCount < ALL_GALLERY_ITEMS.length;

  return (
    <SectionReveal id="gallery" className="relative py-16 md:py-28 px-4 section-blobs">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <RevealBlock>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Gallery</span>
          </RevealBlock>
          <RevealText
            as="h2"
            text="Moments from the mountains."
            className="mt-3 font-serif text-4xl sm:text-5xl leading-tight"
            gradient
          />
          <RevealBlock delay={0.15}>
            <p className="mt-4 text-muted-foreground">
              {ALL_GALLERY_ITEMS.length} photos &amp; videos from across every trail — scroll to
              explore, click to view full screen.
            </p>
          </RevealBlock>
        </div>

        {/* Responsive masonry-style columns grid */}
        <div className="mt-12 columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {visibleItems.map((item, i) => (
            <div key={`${item.seed}-${i}`} className="break-inside-avoid mb-3">
              <GalleryTile item={item} index={i} onClick={onLightboxOpen} />
            </div>
          ))}
        </div>

        {/* Sentinel — watched by IntersectionObserver */}
        {hasMore && (
          <div ref={sentinelRef} className="mt-8 flex justify-center">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/50"
            >
              <Leaf className="h-3 w-3" /> Loading more…
            </motion.div>
          </div>
        )}

        {/* All loaded indicator */}
        {!hasMore && ALL_GALLERY_ITEMS.length > BATCH && (
          <div className="mt-8 flex justify-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-primary/40">
              ✦ All {ALL_GALLERY_ITEMS.length} photos loaded
            </span>
          </div>
        )}
      </div>
    </SectionReveal>
  );
}

function Stay() {
  return (
    <SectionReveal id="stay" className="relative py-16 md:py-28 px-4 section-blobs">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <RevealBlock>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/70">
              Where to stay
            </span>
          </RevealBlock>
          <RevealText
            as="h2"
            text="Rest where the hills sing."
            className="mt-3 font-serif text-4xl sm:text-5xl leading-tight"
            gradient
          />
          <RevealBlock delay={0.15}>
            <p className="mt-4 text-muted-foreground">
              Chikkamagaluru welcomes every budget — from high-end resorts to warm, family-run
              homestays. The most memorable way to stay is with a local family, sharing meals and
              stories of the land.
            </p>
          </RevealBlock>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Home,
              title: "Homestays",
              body: "Live with locals. Eat home-cooked Malnad meals. Wake to birdsong instead of horns.",
              tag: "Most loved",
            },
            {
              icon: Coffee,
              title: "Coffee Estate Stays",
              body: "Sleep amongst coffee plantations and silver-oak shade — a Chikkamagaluru classic.",
            },
            {
              icon: Wifi,
              title: "Resorts & Hotels",
              body: "Comfortable mid-range and luxury options for those who prefer modern amenities.",
            },
          ].map((s, i) => (
            <RevealBlock key={s.title} delay={i * 0.12}>
              <BorderGlow
                className="p-7 h-full relative"
                borderRadius={24}
                colors={["#6ee7b7", "#fbbf24", "#86efac"]}
                glowColor="155 40 60"
                glowIntensity={0.85}
                backgroundColor="oklch(0.99 0.008 130 / 0.55)"
                animated
              >
                {s.tag && (
                  <span className="absolute top-5 right-5 rounded-full bg-accent/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
                    {s.tag}
                  </span>
                )}
                <s.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                <h3 className="mt-4 font-serif text-xl text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </BorderGlow>
            </RevealBlock>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function CertifiedSticker() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 z-20 h-24 w-24 sm:h-32 sm:w-32 pointer-events-none"
    >
      {/* Static text design */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full drop-shadow-[0_6px_18px_oklch(0.35_0.08_155/0.45)]"
      >
        <defs>
          {/* Top arc for CERTIFIED - proper semi-circle */}
          <path id="top-arc" d="M 32,100 A 68,68 0 0,1 168,100" fill="none" />
          {/* Bottom arc for LEAD GUIDE - proper semi-circle */}
          <path id="bottom-arc" d="M 18,100 A 82,82 0 0,0 182,100" fill="none" />
        </defs>

        {/* Background circle */}
        <circle cx="100" cy="100" r="92" fill="oklch(0.96 0.02 155)" />

        {/* Decorative border */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="oklch(0.42 0.08 155)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
        />

        {/* CERTIFIED text at top - using circular path */}
        <text
          fill="oklch(0.35 0.08 155)"
          fontSize="17"
          fontWeight="800"
          letterSpacing="2.6"
          fontFamily="ui-sans-serif, system-ui"
        >
          <textPath href="#top-arc" startOffset="50%" textAnchor="middle">
            CERTIFIED
          </textPath>
        </text>

        {/* LEAD GUIDE text at bottom - using circular path */}
        <text
          fill="oklch(0.35 0.08 155)"
          fontSize="17"
          fontWeight="800"
          letterSpacing="2.6"
          fontFamily="ui-sans-serif, system-ui"
        >
          <textPath href="#bottom-arc" startOffset="50%" textAnchor="middle">
            LEAD GUIDE
          </textPath>
        </text>
      </svg>

      {/* Large center tick mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Extracted box-shadow to ::before pseudo-element for GPU layer rendering */}
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-linear-to-br from-white via-[oklch(0.98_0.015_155)] to-[oklch(0.88_0.035_155)] p-1.5 before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_1px_0_white,0_12px_28px_-14px_oklch(0.18_0.08_155/0.85)] before:content-['']">
          <div className="absolute inset-1 rounded-full border border-[oklch(0.78_0.06_155/0.65)]" />
          <div className="relative h-full w-full rounded-full bg-linear-to-br from-[oklch(0.68_0.15_155)] via-[oklch(0.50_0.12_158)] to-[oklch(0.32_0.08_168)] flex items-center justify-center shadow-[inset_0_1px_2px_oklch(1_0_0/0.35),inset_0_-6px_12px_oklch(0.18_0.06_165/0.28)]">
            <div className="absolute inset-1.5 rounded-full bg-linear-to-br from-white/22 to-transparent" />
            <Check className="relative h-9 w-9 sm:h-10 sm:w-10 text-white drop-shadow-[0_2px_2px_oklch(0.18_0.06_165/0.45)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Contact() {
  return (
    <SectionReveal id="contact" className="relative py-16 md:py-28 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <CertifiedSticker />
          <RevealBlock className="relative overflow-hidden rounded-[2.5rem]">
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-[oklch(0.42_0.08_155)] via-[oklch(0.44_0.08_130)] to-[oklch(0.48_0.12_48)]" />
            <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />

            <div className="relative p-10 sm:p-14 text-center md:text-left md:pr-96">
              <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 md:block">
                <TiltedCard
                  imageSrc="https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/sushanth/10001%20(1).jpg"
                  altText="Mountain guide on a Chikkamagaluru trail"
                  captionText="Guided by local trail experts"
                  containerHeight="310px"
                  containerWidth="250px"
                  imageHeight="310px"
                  imageWidth="250px"
                  rotateAmplitude={9}
                  scaleOnHover={1.04}
                  showTooltip={false}
                  displayOverlayContent
                  overlayContent={
                    <div className="flex h-full w-full flex-col justify-end rounded-[15px] bg-linear-to-t from-black/65 via-black/10 to-transparent p-5 text-left">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/75">
                        Local expertise
                      </span>
                      <span className="mt-1 font-serif text-2xl leading-tight text-white">
                        Trails made safer.
                      </span>
                    </div>
                  }
                />
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:ml-5 lg:ml-10">
                {/* Lead guide pill with circular avatar + name */}
                <div className="inline-flex items-center gap-3 rounded-full bg-white/15 backdrop-blur border border-white/25 pl-1.5 pr-5 py-1.5 shadow-lg">
                  <span className="relative inline-block h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/60">
                    <img
                      src="https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/sushanth/10001.jpg"
                      alt="Sushanth Gowda"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="flex flex-col leading-tight text-left">
                    <span className="font-serif text-white text-sm">Sushanth Gowda</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                      Trek Lead
                    </span>
                  </span>
                </div>
              </div>

              <span className="mt-8 inline-block text-xs uppercase tracking-[0.25em] text-white/70">
                Your call to adventure
              </span>
              <RevealText
                as="h2"
                text="Ready to feel alive?"
                className="mt-4 font-serif text-4xl sm:text-5xl text-white leading-tight"
              />
              <p className="mt-5 text-white/80 max-w-md mx-auto md:mx-0">
                Let's plan your escape into the wild. Reach out — we'll craft a journey that fits
                you.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://wa.me/919448817562"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary shadow-lg hover:shadow-xl transition"
                >
                  <Phone className="h-4 w-4" /> 94488 17562
                </a>
                <a
                  href="https://instagram.com/sushanth_ckm"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition"
                >
                  <Instagram className="h-4 w-4" /> @sushanth_ckm
                </a>
              </div>

              <p className="mt-8 font-serif italic text-white/70 text-base text-center md:text-left">
                🌿 Explore. Trek. Discover. Feel Alive.
              </p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </SectionReveal>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-10 pt-4">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/icon.png"
            alt="Wild Chikkamagaluru Treks"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-[12px] tracking-tight text-foreground">
              Wild Chikkamagaluru
            </span>
            <span className="uppercase tracking-[0.18em] text-[8px] text-muted-foreground">
              Treks
            </span>
          </span>
        </a>
        <p>© {new Date().getFullYear()} — Nature is a way of life.</p>
      </div>
    </footer>
  );
}

function Index() {
  const [activeTrek, setActiveTrek] = useState<Trek | null>(null);
  const handleTrekClick = useCallback((t: Trek) => setActiveTrek(t), []);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const handleLightboxOpen = useCallback((i: number) => setLightboxIndex(i), []);
  const handleLightboxClose = useCallback(() => setLightboxIndex(null), []);

  return (
    <main className="relative overflow-x-clip">
      <SiteNav />
      <Hero />
      <div className="relative z-10 scroll-over-content">
        <WordMarquee />
        <About />
        <Founder />
        <Treks onTrekClick={handleTrekClick} />
        <Stay />
        <Contact />
        <Gallery onLightboxOpen={handleLightboxOpen} />
        <Footer />
      </div>
      <MobileNav />
      <TrekModal trek={activeTrek} onClose={() => setActiveTrek(null)} />
      <GalleryLightbox
        items={ALL_GALLERY_ITEMS}
        activeIndex={lightboxIndex}
        onClose={handleLightboxClose}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}

// Mobile bottom navigation bar
const navItems = [
  { href: "#about", label: "About", icon: Info },
  { href: "#treks", label: "Treks", icon: Mountain },
  { href: "#stay", label: "Stay", icon: Home },
  { href: "#contact", label: "Contact", icon: Phone },
  { href: "#gallery", label: "Gallery", icon: ImageIcon },
];

function MobileNav() {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

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

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-300 w-[85vw] max-w-[260px] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between rounded-xl bg-white/88 backdrop-blur-2xl px-2 py-1.5 shadow-[0_6px_24px_-6px_oklch(0.25_0.08_155/0.35),0_2px_6px_-2px_oklch(0.3_0.06_155/0.15)] ring-1 ring-white/70">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-0 rounded-lg px-2 py-1 transition-all duration-200 ${
                isActive ? "text-primary" : "text-foreground/45 hover:text-foreground/70"
              }`}
              aria-label={item.label}
            >
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
            </a>
          );
        })}
      </div>
    </nav>
  );
}
