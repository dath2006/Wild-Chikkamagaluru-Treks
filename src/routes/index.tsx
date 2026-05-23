import { createFileRoute, Link } from "@tanstack/react-router";
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
  FileText,
  Share2,
  MousePointerClick,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

import { SiteNav, LogoTitle } from "@/components/site-nav";
import { MobileNav } from "@/components/mobile-nav";
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
  HERO_TILE_VIDEOS,
  TREK_COVER_IMAGES,
  TREK_MEDIA_IMAGES,
  TREK_MEDIA_VIDEOS,
  SITE_IMAGES,
  MOBILE_CAROUSEL_IMAGES,
  TREK_JOURNEY_VIDEOS,
  ALL_GALLERY_MEDIA,
  BITS_AND_PIECES,
  getTrekMedia,
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

// Pool of media captions the tiles cycle through (includes photos + short video clips)
// label = lookup key in HERO_TILE_IMAGES/HERO_TILE_VIDEOS
// title = short display text shown on the tile
const mediaPool: { label: string; title: string; variant: "image" | "video" }[] = [
  // Images - label matches HERO_TILE_IMAGES keys, title is short display text
  {
    label: "Mullayanagiri sunrise view at 6330ft highest peak Karnataka",
    title: "Mullayanagiri Sunrise",
    variant: "image",
  },
  {
    label: "Kudremukh peak trek Western Ghats monsoon trail Karnataka",
    title: "Kudremukh Peak",
    variant: "image",
  },
  {
    label: "Hebbe waterfalls Chikkamagaluru Western Ghats scenic view",
    title: "Hebbe Falls",
    variant: "image",
  },
  {
    label: "Jhari Falls Chikkamagaluru Karnataka waterfall trek view",
    title: "Jhari Falls",
    variant: "image",
  },
  {
    label: "Netravati Peak ridge trek view Kudremukh National Park",
    title: "Netravati Peak",
    variant: "image",
  },
  {
    label: "Kurinjal Peak scenic vista offbeat trek Chikkamagaluru",
    title: "Kurinjal Peak",
    variant: "image",
  },
  {
    label: "Ettina Bhuja rock formation summit trek Western Ghats",
    title: "Ettina Bhuja",
    variant: "image",
  },
  {
    label: "Gangadikkal Peak panoramic mountain views Chikkamagaluru",
    title: "Gangadikkal Peak",
    variant: "image",
  },
  {
    label: "Bandaje Falls Arbi waterfall trek Chikkamagaluru Karnataka",
    title: "Bandaje Falls",
    variant: "image",
  },
  {
    label: "Ballalarayana Durga fort ruins ancient trek Chikkamagaluru",
    title: "Ballalarayana Durga",
    variant: "image",
  },
  {
    label: "Kyatanamakki Hills sunset grassland trek Western Ghats view",
    title: "Kyatanamakki Hills",
    variant: "image",
  },
  {
    label: "Rani Jheri viewpoint valley vista Chikkamagaluru trek",
    title: "Rani Jheri",
    variant: "image",
  },
  {
    label: "Charmudi Falls waterfall misty Chikkamagaluru Karnataka Western Ghats",
    title: "Charmudi Falls",
    variant: "image",
  },
  {
    label: "Dense Western Ghats forest trail Chikkamagaluru trek",
    title: "Forest Trail",
    variant: "image",
  },
  {
    label: "Karnataka Western Ghats forest wilderness trekking view",
    title: "Karnataka Forest",
    variant: "image",
  },
  {
    label: "Misty waterfall cascade Chikkamagaluru monsoon trek",
    title: "Misty Falls",
    variant: "image",
  },
  {
    label: "Scenic road trip to Chikkamagaluru Karnataka mountains",
    title: "Road to Chikkamagaluru",
    variant: "image",
  },
  // Short video clips (mixed in intelligently) - verified in R2
  { label: "Mullayanagiri clip", title: "Mullayanagiri", variant: "video" },
  { label: "Kurinjal clip", title: "Kurinjal", variant: "video" },
  { label: "Bandaje clip", title: "Bandaje", variant: "video" },
  { label: "Hidden Falls clip", title: "Hidden Falls", variant: "video" },
  // Kudremukh video (only video available in kudremuka folder is back_waters/lakhya_dam.mp4)
  { label: "Kudremukh back waters clip", title: "Kudremukh Back Waters", variant: "video" },
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
    variant: "image",
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
    label: "Charmudi mist",
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
    label: "Forest deep",
    variant: "image",
    top: "18%", // Moved up from 32%
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
    label: "Kyatanamakki sunset",
    variant: "image",
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

// Module-level Set to track which media indices are currently active across all tiles
const activeTileIndices = new Set<number>();

// Get a unique random index not currently in use
function getUniqueRandomIndex(excludeIndices: Set<number>): number {
  const availableIndices = [];
  for (let i = 0; i < mediaPool.length; i++) {
    if (!excludeIndices.has(i)) {
      availableIndices.push(i);
    }
  }
  if (availableIndices.length === 0) {
    // If all are taken, return random (edge case with many tiles)
    return Math.floor(Math.random() * mediaPool.length);
  }
  return availableIndices[Math.floor(Math.random() * availableIndices.length)];
}

function TileContent({
  seed,
  visible,
  onLabelChange,
}: {
  seed: number;
  visible: boolean;
  onLabelChange?: (label: string) => void;
}) {
  const reduce = useReducedMotion();
  // Initialize with a unique index not already in use
  const [idx, setIdx] = useState(() => {
    const initialIdx = seed % mediaPool.length;
    if (activeTileIndices.has(initialIdx)) {
      const uniqueIdx = getUniqueRandomIndex(activeTileIndices);
      activeTileIndices.add(uniqueIdx);
      return uniqueIdx;
    }
    activeTileIndices.add(initialIdx);
    return initialIdx;
  });

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
          setIdx((currentIdx) => {
            // Remove current index from active set
            activeTileIndices.delete(currentIdx);
            // Get a new unique index
            const newIdx = getUniqueRandomIndex(activeTileIndices);
            // Add new index to active set
            activeTileIndices.add(newIdx);
            return newIdx;
          });
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
      // Clean up this tile's index when unmounting
      activeTileIndices.delete(idx);
    };
  }, [seed, reduce, visible, idx]);

  useEffect(() => {
    onLabelChange?.(mediaPool[idx].title);
  }, [idx, onLabelChange]);

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
        className="absolute inset-0 rounded-3xl overflow-hidden"
      >
        {/* Image or Video rendering */}
        {item.variant === "video" && HERO_TILE_VIDEOS[item.label] ? (
          <video
            src={HERO_TILE_VIDEOS[item.label]}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : HERO_TILE_IMAGES[item.label] ? (
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
        {/* Show icon overlay only when no media available */}
        {(item.variant === "video"
          ? !HERO_TILE_VIDEOS[item.label]
          : !HERO_TILE_IMAGES[item.label]) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-white/70 p-2.5 backdrop-blur shadow-sm">
              <Icon className="h-5 w-5" strokeWidth={1.4} />
            </div>
          </div>
        )}
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
  const [activeLabel, setActiveLabel] = useState(tile.label);
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
      className={cn("absolute hidden md:block overflow-visible", !reduce && "animate-float-tile")}
    >
      {/* Card visuals — clipped to rounded corners */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/60 shadow-[0_20px_60px_-25px_oklch(0.42_0.07_155_/_0.45)] gradient-mist">
        <TileContent seed={index} visible={visible} onLabelChange={setActiveLabel} />
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50" />
        <span className="absolute top-3 left-3 text-[9px] font-mono text-primary/50 z-10">
          0{index + 1}
        </span>
      </div>
      {/* Sticker — outside overflow-hidden so tape strip shows above card edge */}
      <div className="absolute bottom-0 inset-x-0 z-20 flex justify-center translate-y-1/2 pointer-events-none">
        <div
          className="relative px-3 py-1.5 bg-white rounded-sm flex items-center gap-1.5"
          style={{
            transform: `rotate(${(index % 2 === 0 ? -1.8 : 1.4) + index * 0.4}deg)`,
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
        >
          {/* Tape strip at top */}
          <div
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-amber-100/90 rounded-sm border border-amber-200/70"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeLabel}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-condensed text-[10px] uppercase tracking-[0.14em] text-foreground/85 font-semibold leading-none"
            >
              {activeLabel}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Trek cards data for the mobile hero card stack — only treks with real images
const heroTrekCards: TrekCard[] = treks
  .filter((t) => MOBILE_CAROUSEL_IMAGES[t.name]) // Only include if has real image
  .map((t) => ({
    id: t.name,
    name: t.name,
    tag: t.tag,
    imageUrl: MOBILE_CAROUSEL_IMAGES[t.name],
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
function TrekJourneyBanner() {
  const [activeVideo, setActiveVideo] = useState(0);
  const reduce = useReducedMotion();

  return (
    <SectionReveal className="relative py-8 md:py-12 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <BorderGlow
          className="p-1"
          borderRadius={24}
          colors={["#6ee7b7", "#fbbf24", "#86efac"]}
          glowColor="155 40 60"
          glowIntensity={0.6}
          backgroundColor="oklch(0.15 0.02 150 / 0.9)"
          animated
        >
          <div className="relative rounded-[22px] overflow-hidden bg-black/40">
            {/* Video thumbnails row */}
            <div className="flex flex-col md:flex-row">
              {TREK_JOURNEY_VIDEOS.map((video, i) => (
                <button
                  key={video.title}
                  onClick={() => setActiveVideo(i)}
                  className={`relative flex-1 p-4 md:p-6 text-left transition-all ${
                    activeVideo === i ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={video.poster}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <PlayCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-lg md:text-xl text-white truncate">
                        {video.title}
                      </h4>
                      <p className="text-sm text-white/60 mt-1">{video.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active video player */}
            <div className="relative aspect-video w-full bg-black">
              {TREK_JOURNEY_VIDEOS.map((video, i) => (
                <video
                  key={video.url}
                  src={video.url}
                  poster={video.poster}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    activeVideo === i ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  autoPlay={activeVideo === i}
                  loop
                  muted
                  playsInline
                  controls={activeVideo === i}
                />
              ))}

              {/* Overlay info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <PlayCircle className="h-4 w-4" />
                  <span>Trek Journey Highlights</span>
                </div>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </SectionReveal>
  );
}

function WordMarquee() {
  const reduce = useReducedMotion();
  const words = [
    "Mullayanagiri",
    "Kudremukh",
    "Netravati",
    "Kurinjal",
    "Ettina Bhuja",
    "Gangadikkal",
    "Bandaje Falls",
    "Hebbe Falls",
    "Jari Falls",
    "Ballalrayan Durga",
    "Kyatanamakki",
    "Rani Jheri",
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
                <div className="glass rounded-full px-6 py-1 flex items-center gap-3 shadow-[0_15px_50px_-20px_oklch(0.42_0.07_155/0.5)]">
                  <img src="/icon.png" alt="" className="h-14 w-14 rounded-full object-cover" />
                  <LogoTitle imgClassName="h-16" />
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
              Wild Chikkamagaluru Treks is not just another trekking experience—it's a journey into
              the <span className="highlight">heart of the Western Ghats</span>, where the misty
              mountains, lush green forests, and hidden waterfalls await those who seek{" "}
              <span className="highlight-accent">real adventure and inner peace</span>. Whether you
              are an experienced trekker or a nature-loving beginner, this is the perfect escape
              from the noise of city life.
            </p>
            <p>
              Unlike other commercial websites that focus only on profits, our primary mission is to{" "}
              <span className="highlight">connect people with nature</span> and offer{" "}
              <span className="highlight-accent">soulful trekking experiences</span> at a minimal
              cost. We believe that nature should be accessible to everyone, and that spending time
              in the wild can heal, refresh, and inspire your life.
            </p>
            <p>
              Our treks are specially curated to explore the untouched beauty of Chikkamagaluru's
              landscape—from the mighty peaks of{" "}
              <span className="highlight">Kudremukha and Nethravathi</span> to the{" "}
              <span className="highlight-accent">serene forests and secret trails</span> known only
              to locals. Every trek is carefully planned and guided to ensure your safety,
              enjoyment, and a deep connection with nature.
            </p>
            <p>
              🌿 <span className="highlight">Explore. Trek. Discover. Feel Alive.</span>
              Welcome to Wild Chikkamagaluru Treks – where nature is not just a destination, it's a
              way of life.
            </p>
          </RevealBlock>

          <RevealImage>
            <img
              src={SITE_IMAGES.aboutHero}
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
            <p className="mt-2 text-sm text-muted-foreground">Founder & Trek Lead Chikkamagaluru</p>
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
              The founder of this initiative, <span className="highlight">Sushanth Gowda</span>, is
              a <span className="highlight-accent">passionate trekker and the lead guide</span> of
              Wild Chikkamagaluru Treks. With years of experience and a heart for adventure,
              Sushanth personally ensures that every visitor experiences the true beauty and spirit
              of the land.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              His goal is not just to guide treks, but to{" "}
              <span className="highlight">build a community of nature lovers</span> who respect and
              preserve our forests and mountains. He believes that every trek should leave you
              transformed—more connected to nature and more alive than when you started.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              So, if you're looking to{" "}
              <span className="highlight-accent">escape into the wilderness</span>, recharge your
              soul, and explore Chikkamagaluru like never before, this is your call to adventure.
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

const GALLERY_HINT_KEY = "gallery-tutorial-seen";

function GalleryHint() {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(GALLERY_HINT_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem(GALLERY_HINT_KEY, "1");
    } catch {}
  }, []);

  // Auto-dismiss after 8s
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(dismiss, 8000);
    return () => clearTimeout(t);
  }, [show, dismiss]);

  return (
    <>
      {/* ── Tutorial overlay (once per session) ── */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer"
            onClick={dismiss}
            style={{ pointerEvents: "auto" }}
          >
            {/* Dim backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

            {/* Tutorial card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 rounded-2xl bg-white/90 backdrop-blur-lg border border-primary/15 shadow-2xl shadow-black/20 px-8 py-6 max-w-sm mx-4 flex flex-col items-center gap-5"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                Interactive Gallery
              </span>

              <div className="flex items-center gap-6">
                {/* Swipe / Drag gesture */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-12 w-20 flex items-center justify-center">
                    <motion.div
                      animate={reduce ? {} : { x: [-18, 18, -18] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center gap-1"
                    >
                      <ArrowRight className="h-5 w-5 text-primary/60 rotate-180" />
                      <div className="h-6 w-6 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary/60" />
                    </motion.div>
                  </div>
                  <span className="text-xs font-semibold text-primary/80">
                    {isMobile ? "Swipe" : "Drag"} to browse
                  </span>
                </div>

                <div className="h-12 w-px bg-primary/20" />

                {/* Tap / Click gesture */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-12 w-12 flex items-center justify-center">
                    <motion.div
                      animate={reduce ? {} : { scale: [1, 0.8, 1] }}
                      transition={{
                        duration: 1.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                    >
                      <MousePointerClick className="h-6 w-6 text-primary/70" />
                    </motion.div>
                    <motion.div
                      animate={reduce ? {} : { scale: [0, 2, 0], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                      className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-primary/25"
                    />
                  </div>
                  <span className="text-xs font-semibold text-primary/80">
                    {isMobile ? "Tap" : "Click"} for details
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-primary/45 tracking-wide">
                Tap anywhere to dismiss
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Persistent note (always visible at bottom of gallery) ── */}
      <div className="absolute bottom-3 md:bottom-4 inset-x-0 z-10 flex justify-center pointer-events-none">
        <div className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md px-4 py-2 border border-primary/15 shadow-md">
          <Info className="h-3.5 w-3.5 text-primary/60 shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-primary/70">
            {isMobile ? "Swipe" : "Drag"} to scroll &middot; {isMobile ? "tap" : "click"} any trek
            to view details
          </span>
        </div>
      </div>
    </>
  );
}

// Treks that have cover images for circular gallery
const galleryTreks = treks.filter((t) => TREK_COVER_IMAGES[t.name]);

const galleryItems = galleryTreks.map((t) => ({
  image: TREK_COVER_IMAGES[t.name],
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
              onItemClick={(i) => onTrekClick(galleryTreks[i] ?? galleryTreks[0])}
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
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition cursor-pointer"
            >
              Plan with us <ArrowRight className="h-4 w-4" />
            </a>
          </BorderGlow>
        </RevealBlock>
      </div>
    </SectionReveal>
  );
});

// ── All gallery photos derived from ALL_GALLERY_MEDIA (includes all treks + bits_and_pieces) ─────────────────────────────
// Shuffle function for randomizing image/video order
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const ALL_GALLERY_ITEMS: GalleryItem[] = shuffleArray(ALL_GALLERY_MEDIA).map((item, i) => ({
  label: item.label,
  variant: item.type,
  // For videos, use the video URL as the thumbnail (browser will show first frame)
  url: item.type === "image" ? item.url : item.url,
  videoUrl: item.type === "video" ? item.url : undefined,
  seed: item.label.length + i * 13, // stable seed based on label + position
  trekName: undefined,
  id: `${item.type}-${item.label.replace(/\s+/g, "-").toLowerCase()}-${i}`, // stable unique id
}));

const BATCH = 12; // items loaded per scroll trigger

function TrekJourneyVideos() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track visibility with IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }, // At least 30% visible to play
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Pause previous video and play current when switching
  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });
    // Play only the active video if visible
    const currentVideo = videoRefs.current[activeVideo];
    if (currentVideo && isVisible) {
      currentVideo.play().catch(() => {});
    }
  }, [isVisible, activeVideo]);

  // Auto-advance to next video when current ends
  const handleVideoEnd = useCallback(() => {
    if (!isVisible) return; // Only advance if visible
    setActiveVideo((current) => (current + 1) % TREK_JOURNEY_VIDEOS.length);
  }, [isVisible]);

  // Set up ended event listeners for videos
  useEffect(() => {
    const currentVideo = videoRefs.current[activeVideo];
    if (currentVideo) {
      currentVideo.addEventListener("ended", handleVideoEnd);
      return () => currentVideo.removeEventListener("ended", handleVideoEnd);
    }
  }, [activeVideo, handleVideoEnd]);

  return (
    <RevealBlock className="mb-12">
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden border border-white/50 shadow-[0_8px_30px_-12px_oklch(0.42_0.07_155/0.4)] bg-white/30 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4 text-primary/70" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Trek Journey</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.15em] text-primary/50">
            Auto-playing {TREK_JOURNEY_VIDEOS.length} videos
          </span>
        </div>

        {/* Video thumbnails row */}
        <div className="flex flex-col md:flex-row border-b border-primary/10">
          {TREK_JOURNEY_VIDEOS.map((video, i) => (
            <button
              key={video.title}
              onClick={() => setActiveVideo(i)}
              className={`relative flex-1 p-4 text-left transition-all border-r last:border-r-0 border-primary/10 ${
                activeVideo === i
                  ? "bg-white/70 ring-2 ring-primary/30 ring-inset"
                  : "hover:bg-white/30"
              }`}
            >
              {/* Active indicator bar */}
              {activeVideo === i && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary/60" />
              )}
              <div className="flex items-center gap-3">
                <div
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 ${
                    activeVideo === i ? "ring-2 ring-primary/50" : ""
                  }`}
                >
                  <img
                    src={video.poster}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Playing indicator overlay */}
                  {activeVideo === i ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/30">
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-4 bg-white rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-white rounded-full animate-pulse [animation-delay:0.2s]" />
                        <span className="w-1 h-4 bg-white rounded-full animate-pulse [animation-delay:0.4s]" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-serif text-sm truncate ${
                        activeVideo === i ? "text-primary font-medium" : "text-primary/80"
                      }`}
                    >
                      {video.title}
                    </h4>
                    {/* Now Playing badge */}
                    {activeVideo === i && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-[9px] uppercase tracking-wider text-primary font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Playing
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{video.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active video player - smaller on desktop */}
        <div className="px-4 md:px-12 lg:px-20">
          <div className="relative aspect-video w-full max-w-4xl mx-auto bg-black/90 rounded-lg overflow-hidden">
            {TREK_JOURNEY_VIDEOS.map((video, i) => (
              <video
                key={video.url}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={video.url}
                poster={video.poster}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  activeVideo === i ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                autoPlay={activeVideo === i}
                playsInline
                controls={activeVideo === i}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealBlock>
  );
}

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
              {ALL_GALLERY_ITEMS.length} photos &amp; videos from across every trail — mixed gallery
              with moments from all treks.
            </p>
          </RevealBlock>
        </div>

        {/* Trek Journey Videos — Featured at top of gallery */}
        <TrekJourneyVideos />

        {/* Responsive masonry-style columns grid */}
        <div className="mt-12 columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {visibleItems.map((item, i) => (
            <div key={item.id || `${item.label}-${i}`} className="break-inside-avoid mb-3">
              <GalleryTile item={item} index={i} onClick={() => onLightboxOpen(i)} />
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
              ✦ All {ALL_GALLERY_ITEMS.length} items loaded
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

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const title = "Wild Chikkamagaluru Treks";
    const text =
      "🌿 Experience soulful treks through the forests of Chikkamagaluru — Netravathi, Kudremukha, Bandaje Falls and more. Guided by Sushanth Gowda. Affordable, authentic, unforgettable.\n\nContact: +91 94488 17562 | @sushanth_ckm";
    const url = window.location.origin;

    if (navigator.share) {
      try {
        // Attempt to attach the poster image
        let files: File[] | undefined;
        try {
          const res = await fetch("/poster.jpeg");
          const blob = await res.blob();
          const file = new File([blob], "wild-chikkamagaluru-treks.jpeg", { type: blob.type });
          if (navigator.canShare?.({ files: [file] })) {
            files = [file];
          }
        } catch {
          // poster unavailable — share without image
        }
        await navigator.share(files ? { title, text, url, files } : { title, text, url });
      } catch {
        // user cancelled — do nothing
      }
    } else {
      // Fallback: copy text + link to clipboard
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" /> Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" /> Share
        </>
      )}
    </button>
  );
}

function Contact() {
  return (
    <SectionReveal id="contact" className="relative py-16 md:py-28 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <RevealBlock className="relative overflow-hidden rounded-[2.5rem]">
            <div className="absolute inset-0 -z-10 bg-linear-to-br from-[oklch(0.42_0.08_155)] via-[oklch(0.44_0.08_130)] to-[oklch(0.48_0.12_48)]" />
            <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />

            <div className="relative p-10 sm:p-14 text-center md:text-left md:pr-96">
              {/* Logo - rounded TiltedCard, above Sushanth Gowda on mobile, right side on desktop */}
              <div className="flex justify-center md:absolute md:right-24 md:top-1/2 md:-translate-y-1/2 mb-3 md:mb-0 scale-75 md:scale-100 origin-top">
                <TiltedCard
                  imageSrc="/icon.png"
                  altText="Wild Chikkamagaluru Treks"
                  captionText="Wild Chikkamagaluru Treks"
                  containerHeight="220px"
                  containerWidth="220px"
                  imageHeight="220px"
                  imageWidth="220px"
                  rotateAmplitude={12}
                  scaleOnHover={1.08}
                  showTooltip={true}
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 ">
                {/* Lead guide pill with circular avatar + name */}
                <div className="inline-flex items-center gap-3 rounded-full bg-white/15 backdrop-blur border border-white/25 pl-1.5 pr-5 py-1.5 shadow-lg">
                  <span className="relative inline-block h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/60">
                    <img
                      src={SITE_IMAGES.founderAvatar}
                      alt="Sushanth Gowda"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="flex flex-col leading-tight text-left">
                    <span className="font-serif text-white text-sm">SHUSHANTH GOWDA</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                      Trek Lead Chikkamagaluru
                    </span>
                  </span>
                </div>
              </div>

              <span className="mt-6 inline-block text-xs uppercase tracking-[0.25em] text-white/70">
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
                  <FaWhatsapp className="h-5 w-5" /> 94488 17562
                </a>
                <a
                  href="https://instagram.com/sushanth_ckm"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition"
                >
                  <FaInstagram className="h-5 w-5" /> @sushanth_ckm
                </a>
                <ShareButton />
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
          <LogoTitle className="hidden sm:flex" />
        </a>
        <div className="flex items-center gap-4">
          <Link
            to="/permits"
            className="inline-flex items-center gap-1.5 text-primary/70 hover:text-primary transition-colors font-medium"
          >
            <Info className="h-3 w-3" />
            How to Get Permits
          </Link>
          <p>© {new Date().getFullYear()} — Nature is a way of life.</p>
        </div>
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
