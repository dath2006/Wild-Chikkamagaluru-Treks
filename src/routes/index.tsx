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
  MapPin,
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
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SectionReveal, RevealText, RevealBlock, RevealImage } from "@/components/reveal";
import CircularGallery from "@/components/circular-gallery";
import { TrekModal } from "@/components/trek-modal";
import { GalleryLightbox, GalleryTile, type GalleryItem } from "@/components/gallery-lightbox";

import BorderGlow from "@/components/border-glow";
import { Logo } from "@/components/logo";
import { treks, type Trek } from "@/lib/treks";

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

function TileContent({ seed }: { seed: number }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(seed % mediaPool.length);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => {
        setIdx(
          (i) => (i + 1 + Math.floor(Math.random() * (mediaPool.length - 1))) % mediaPool.length,
        );
      },
      3600 + seed * 450,
    );
    return () => clearInterval(t);
  }, [seed, reduce]);
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
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 20%, oklch(0.85 0.09 ${hue1} / 0.6), transparent 60%), radial-gradient(circle at 80% 80%, oklch(0.85 0.07 ${hue2} / 0.55), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-primary/70">
          <div className="rounded-full bg-white/70 p-2.5 backdrop-blur shadow-sm">
            <Icon className="h-5 w-5" strokeWidth={1.4} />
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary/60 px-3 text-center">
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
}: {
  tile: Tile;
  index: number;
  scrollY: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  // Parallax depth varies by z and index — deeper tiles move slower
  const depth = tile.z === 2 ? 120 : 200;
  const direction = index % 2 === 0 ? 1 : -1;
  const parallaxY = useTransform(scrollY, [0, 1], [0, depth * direction]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30, rotate: tile.rotate }}
      animate={
        reduce
          ? { opacity: 1, scale: 1, y: 0, rotate: tile.rotate }
          : {
              opacity: 1,
              scale: 1,
              y: [0, -tile.yRange, 0],
              x: [0, tile.xRange, 0],
              rotate: [tile.rotate, tile.rotate + 1.5, tile.rotate],
            }
      }
      transition={
        reduce
          ? { duration: 0.6, delay: tile.delay }
          : {
              opacity: { duration: 1.2, delay: tile.delay },
              scale: { duration: 1.2, delay: tile.delay, ease: [0.22, 1, 0.36, 1] },
              y: {
                duration: tile.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tile.delay,
              },
              x: {
                duration: tile.duration * 1.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tile.delay,
              },
              rotate: {
                duration: tile.duration * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tile.delay,
              },
            }
      }
      style={{
        top: tile.top,
        left: tile.left,
        width: tile.w,
        height: tile.h,
        zIndex: tile.z,
        translateY: reduce ? 0 : parallaxY,
      }}
      className="absolute hidden md:block rounded-3xl overflow-hidden border border-white/60 shadow-[0_20px_60px_-25px_oklch(0.42_0.07_155_/_0.45)] gradient-mist"
    >
      <TileContent seed={index} />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50" />
      <span className="absolute top-3 left-3 text-[9px] font-mono text-primary/50 z-10">
        0{index + 1}
      </span>
    </motion.div>
  );
}

// Mobile hero: split layout — top half solid bg with text, bottom half full-width video placeholder
function MobileHero() {
  return (
    <div className="md:hidden relative flex flex-col h-[100svh] min-h-[640px] w-full pt-20">
      {/* Top half — solid calm background with text overlay */}
      <div className="relative flex-1 flex items-center justify-center px-6 gradient-mist overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[oklch(0.85_0.09_165_/_0.5)] blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-[oklch(0.90_0.12_48_/_0.35)] blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] text-primary/80">
            <Leaf className="h-3 w-3" />
            Western Ghats · Karnataka
          </div>
          <div className="mt-5 glass rounded-full px-5 py-2.5 inline-flex items-center gap-2 shadow-[0_15px_50px_-20px_oklch(0.42_0.07_155_/_0.5)]">
            <Mountain className="h-4 w-4 text-primary" strokeWidth={1.6} />
            <span className="font-serif text-base text-primary">Wild Chikkamagaluru Treks</span>
          </div>
          <h1 className="mt-5 font-serif text-[1.6rem] leading-snug text-primary max-w-xs">
            Go hiking before your knees{" "}
            <em className="text-gradient-nature not-italic">file for early retirement</em>
          </h1>
          <div className="mt-5 flex items-center gap-2.5">
            <a
              href="#treks"
              className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/20"
            >
              Explore Treks
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white/60 px-4 py-2 text-xs font-medium text-primary backdrop-blur"
            >
              Watch journey
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom half — full-width video placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex-1 w-full overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.75 0.10 165 / 0.85), transparent 60%), radial-gradient(circle at 75% 70%, oklch(0.70 0.09 180 / 0.8), transparent 60%), linear-gradient(180deg, oklch(0.55 0.08 165), oklch(0.42 0.07 175))",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/90">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full bg-white/20 backdrop-blur p-5 ring-1 ring-white/40 shadow-2xl"
          >
            <PlayCircle className="h-10 w-10" strokeWidth={1.4} />
          </motion.div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/80">
            Place hero video here
          </p>
        </div>
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/40 to-transparent pointer-events-none" />
      </motion.div>
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
  const loop = [...words, ...words];
  return (
    <div className="relative overflow-hidden py-3 border-y border-primary/10 bg-white/30 backdrop-blur-sm">
      <motion.div
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {loop.map((w, i) => (
          <span
            key={i}
            className="font-serif italic text-2xl sm:text-3xl text-primary/70 flex items-center gap-10"
          >
            {w}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden">
      {/* Mobile-specific split hero */}
      <MobileHero />

      {/* Desktop stage with floating photo/video tiles */}
      <div className="relative hidden md:block h-[100vh] min-h-[680px] w-full pt-24">
        {/* ambient blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 -left-32 h-96 w-96 rounded-full bg-[oklch(0.85_0.09_165_/_0.5)] blur-3xl" />
          <div className="absolute bottom-0 -right-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.90_0.12_48_/_0.4)] blur-3xl" />
          <div className="absolute top-1/2 -right-16 h-64 w-64 rounded-full bg-[oklch(0.92_0.10_38_/_0.25)] blur-2xl" />
        </div>

        {/* Floating tiles layer */}
        <div className="absolute inset-0 overflow-hidden">
          {heroTiles.map((t, i) => (
            <FloatingTile key={t.label} tile={t} index={i} scrollY={scrollYProgress} />
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
                <Mountain className="h-5 w-5 text-primary" strokeWidth={1.6} />
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

      {/* Marquee strip below stage */}
      <WordMarquee />
    </section>
  );
}

function About() {
  return (
    <SectionReveal id="about" className="relative py-28 px-4 section-blobs">
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
              Wild Chikkamagaluru Treks is a journey into the heart of the Western Ghats, where
              misty mountains, lush green forests, and hidden waterfalls await those who seek real
              adventure and inner peace. Whether you are an experienced trekker or a nature-loving
              beginner, this is the perfect escape from the noise of city life.
            </p>
            <p>
              Unlike commercial operators who focus only on profits, our mission is to connect
              people with nature — through soulful experiences offered at a minimal cost. We believe
              nature should be accessible to everyone, and that time in the wild can heal, refresh,
              and inspire your life.
            </p>
            <p>
              Every trek is carefully planned and guided — from the mighty peaks of Kudremukh and
              Netravati to serene forests and secret trails known only to locals.
            </p>
          </RevealBlock>

          <RevealImage>
            <MediaPlaceholder
              aspect="portrait"
              label="Forest trail photograph"
              hint="A vertical image of a misty forest path or canopy"
              className="photo-halo"
            />
          </RevealImage>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
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
    <SectionReveal className="relative py-28 px-4 section-blobs">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1fr_1.2fr] items-center">
        <RevealImage>
          <MediaPlaceholder
            aspect="portrait"
            label="Portrait of Sushanth Gowda"
            hint="A warm portrait of the founder on a trail"
            className="photo-halo"
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
            text="Sushanth Gowda"
            className="mt-3 font-serif text-4xl sm:text-5xl leading-tight"
            gradient
          />
          <RevealBlock delay={0.1}>
            <p className="mt-2 text-sm text-muted-foreground">Founder & Lead Guide</p>
            <p className="mt-6 text-foreground/80 leading-relaxed">
              A passionate trekker with years of experience in the Chikkamagaluru region, Sushanth
              personally leads most treks. His goal isn't only to guide — it's to build a community
              of nature lovers who respect and preserve our forests and mountains.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Every visitor leaves with more than photographs — they leave with a deeper connection
              to the land.
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
  image: `https://picsum.photos/seed/${t.coverSeed}/800/600`,
  text: t.name,
}));

const Treks = memo(function Treks({ onTrekClick }: { onTrekClick: (t: Trek) => void }) {
  return (
    <SectionReveal id="treks" className="relative py-28 px-4 section-blobs">
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

      {/* Mobile: circular WebGL gallery — full viewport width, breaks out of px-4 */}
      <div className="md:hidden mt-8 -mx-4 overflow-hidden">
        <RevealBlock>
          <div style={{ height: "480px", position: "relative", overflow: "hidden" }}>
            <CircularGallery
              items={galleryItems}
              bend={1.5}
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
        {/* Desktop: grid cards */}
        <div className="hidden md:grid mt-14 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treks.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => onTrekClick(t)}
              className="cursor-pointer"
            >
              <BorderGlow
                className="group overflow-hidden flex flex-col h-full"
                borderRadius={24}
                colors={["#6ee7b7", "#fbbf24", "#86efac"]}
                glowColor="155 40 60"
                glowIntensity={0.85}
                backgroundColor="oklch(0.99 0.008 130 / 0.55)"
              >
                <RevealImage>
                  <MediaPlaceholder
                    aspect="video"
                    label={`${t.name} photo`}
                    hint="Trek summit, trail or landscape image"
                    className="rounded-none rounded-t-3xl border-0 photo-halo"
                  />
                </RevealImage>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl text-primary">{t.name}</h3>
                    {t.tag && (
                      <span className="shrink-0 rounded-full bg-accent/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
                        {t.tag}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {t.altitude && (
                      <span className="inline-flex items-center gap-1">
                        <Mountain className="h-3 w-3" /> {t.altitude}
                      </span>
                    )}
                    {t.start && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {t.start}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-foreground/75 leading-relaxed flex-1">
                    {t.blurb}
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        <RevealBlock className="mt-14">
          <BorderGlow
            className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            borderRadius={24}
            colors={["#6ee7b7", "#fbbf24", "#86efac"]}
            glowColor="155 40 60"
            glowIntensity={0.85}
            backgroundColor="oklch(0.99 0.008 130 / 0.55)"
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
    <SectionReveal id="gallery" className="relative py-28 px-4 section-blobs">
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
    <SectionReveal id="stay" className="relative py-28 px-4 section-blobs">
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
  const text = "CERTIFIED • LEAD GUIDE • CERTIFIED • LEAD GUIDE • ";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 z-20 h-24 w-24 sm:h-32 sm:w-32 pointer-events-none"
    >
      {/* Spinning text ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full drop-shadow-[0_6px_18px_oklch(0.35_0.08_155_/_0.45)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id="certified-circle"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <circle cx="100" cy="100" r="92" fill="oklch(0.96 0.02 155)" />
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="oklch(0.42 0.08 155)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
        />
        <text
          fill="oklch(0.35 0.08 155)"
          fontSize="18"
          fontWeight="700"
          letterSpacing="3"
          fontFamily="ui-sans-serif, system-ui"
        >
          <textPath href="#certified-circle" startOffset="0">
            {text}
          </textPath>
        </text>
      </motion.svg>
      {/* Center tick */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-[oklch(0.55_0.13_155)] to-[oklch(0.42_0.10_165)] flex items-center justify-center shadow-inner ring-2 ring-white">
          <Check className="h-5 w-5 sm:h-7 sm:w-7 text-white" strokeWidth={3} />
        </div>
      </div>
    </motion.div>
  );
}

function Contact() {
  return (
    <SectionReveal id="contact" className="relative py-28 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <CertifiedSticker />
          <RevealBlock className="relative overflow-hidden rounded-[2.5rem]">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.42_0.08_155)] via-[oklch(0.44_0.08_130)] to-[oklch(0.48_0.12_48)]" />
            <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />


          <div className="p-10 sm:p-14 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {/* Lead guide pill with circular avatar + name */}
              <div className="inline-flex items-center gap-3 rounded-full bg-white/15 backdrop-blur border border-white/25 pl-1.5 pr-5 py-1.5 shadow-lg">
                <span className="relative inline-block h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/60">
                  <img
                    src="https://picsum.photos/seed/sushanth/120/120"
                    alt="Sushanth Gowda"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="flex flex-col leading-tight text-left">
                  <span className="font-serif text-white text-sm">Sushanth Gowda</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Lead Guide
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
        <Logo size={28} />
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
    <main className="relative overflow-x-hidden">
      <SiteNav />
      <Hero />
      <About />
      <Founder />
      <Treks onTrekClick={handleTrekClick} />
      <Stay />
      <Contact />
      <Gallery onLightboxOpen={handleLightboxOpen} />
      <Footer />
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
