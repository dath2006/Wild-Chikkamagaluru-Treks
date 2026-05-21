/**
 * TrekCardStack — portrait-format carousel for the mobile hero.
 * Uses useMotionValue + useTransform for GPU-only animation with
 * zero React re-renders during slides. Silky smooth on mobile.
 */
import { motion, useMotionValue, useTransform, animate, type MotionValue } from "motion/react";
import { useState, useEffect, useCallback, useRef, memo } from "react";
import { cn } from "@/lib/utils";

export interface TrekCard {
  id: string;
  name: string;
  tag?: string;
  imageUrl: string;
}

// Distance in px between card centers
const CARD_GAP = 180;

// Module-level cache — persists across re-renders and card swaps
const loadedUrls = new Set<string>();

function preload(url: string) {
  if (!url || loadedUrls.has(url)) return;
  const img = new Image();
  img.onload = () => loadedUrls.add(url);
  img.src = url;
}

interface SlideCardProps {
  card: TrekCard;
  slot: number; // -2..2
  offsetX: MotionValue<number>;
  eager?: boolean;
  isActive?: boolean;
}

const SlideCard = memo(function SlideCard({
  card,
  slot,
  offsetX,
  eager,
  isActive,
}: SlideCardProps) {
  const [imgLoaded, setImgLoaded] = useState(() => loadedUrls.has(card.imageUrl));

  // Reset loaded state only when src actually changes
  const prevSrc = useRef(card.imageUrl);
  if (prevSrc.current !== card.imageUrl) {
    prevSrc.current = card.imageUrl;
    // Already cached — no shimmer needed
    if (!loadedUrls.has(card.imageUrl)) setImgLoaded(false);
  }

  // Derive all visual properties from the single offsetX motion value
  // progress: 0 = card at its resting slot, ±1 = moved one full slot away
  const progress = useTransform(offsetX, (v) => slot + v / CARD_GAP);

  const x = useTransform(progress, (p) => p * CARD_GAP);
  const scale = useTransform(progress, [-2, -1, 0, 1, 2], [0.65, 0.78, 1, 0.78, 0.65]);
  const rotate = useTransform(progress, [-2, -1, 0, 1, 2], [-8, -5, 0, 5, 8]);
  const opacity = useTransform(
    progress,
    [-2, -1.2, -0.5, 0, 0.5, 1.2, 2],
    [0, 0.4, 0.72, 1, 0.72, 0.4, 0],
  );
  const z = useTransform(progress, (p) => 20 - Math.abs(p) * 12);

  return (
    <motion.div
      className={cn(
        "absolute top-1/2 left-1/2",
        isActive && "will-change-transform",
        "transform-gpu w-[245px] rounded-[1.8rem] overflow-hidden",
        "border border-white/60",
        "shadow-[0_22px_70px_-18px_rgba(0,0,0,0.55)]",
      )}
      style={{
        x,
        y: "-50%",
        marginLeft: "-122.5px", // half of 245px to center
        scale,
        rotate,
        opacity,
        zIndex: z,
        aspectRatio: "9/16",
        maskImage:
          "linear-gradient(180deg, black 0%, black 68%, rgb(0 0 0 / 0.55) 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, black 0%, black 68%, rgb(0 0 0 / 0.55) 82%, transparent 100%)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Shimmer — hidden immediately if image already cached */}
      {!imgLoaded && <div className="absolute inset-0 bg-[oklch(0.82_0.06_150)] animate-pulse" />}
      <img
        src={card.imageUrl}
        alt={card.name}
        width={245}
        height={436}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "low"}
        draggable={false}
        onLoad={() => {
          loadedUrls.add(card.imageUrl);
          setImgLoaded(true);
        }}
      />

      {/* Top gradient + label */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/10 to-transparent" />
      <div className="absolute top-0 left-0 right-0 p-3 pt-4">
        {card.tag && (
          <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] text-white/90 mb-1 border border-white/25">
            {card.tag}
          </span>
        )}
        <p className="font-serif text-[15px] leading-tight text-white drop-shadow">{card.name}</p>
      </div>

      {/* Top glass sheen */}
      <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-white/15 to-transparent pointer-events-none" />
    </motion.div>
  );
});

interface TrekCardStackProps {
  cards: TrekCard[];
  className?: string;
  /** Kept for backwards compatibility with previous deck API */
  visibleCount?: number;
  /** ms between automatic card cycling */
  cycleInterval?: number;
}

export function TrekCardStack({ cards, className, cycleInterval = 3600 }: TrekCardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const offsetX = useMotionValue(0);
  const autoPausedUntil = useRef(0);
  const isAnimating = useRef(false);

  // All mutable values in refs so goNext/goPrev are stable function refs — never change
  const cardsRef = useRef(cards);
  cardsRef.current = cards;
  const cardsLengthRef = useRef(cards.length);
  cardsLengthRef.current = cards.length;
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const offsetXRef = useRef(offsetX);
  offsetXRef.current = offsetX;
  const setActiveIndexRef = useRef(setActiveIndex);
  setActiveIndexRef.current = setActiveIndex;

  // Stable ref-based goNext — never changes identity, safe to call from interval
  const goNextRef = useRef(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    preload(
      cardsRef.current[(activeIndexRef.current + 1) % cardsLengthRef.current]?.imageUrl ?? "",
    );
    const safety = window.setTimeout(() => {
      isAnimating.current = false;
    }, 800);
    animate(offsetXRef.current, -CARD_GAP, {
      duration: 0.65,
      ease: [0.32, 0.72, 0, 1],
      onComplete: () => {
        clearTimeout(safety);
        // Jump FIRST so the motion value is at 0 before React re-renders the new cards
        offsetXRef.current.jump(0);
        setActiveIndexRef.current((i) => (i + 1) % cardsLengthRef.current);
        isAnimating.current = false;
      },
    });
  });

  const goPrevRef = useRef(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    preload(
      cardsRef.current[
        (activeIndexRef.current - 1 + cardsLengthRef.current) % cardsLengthRef.current
      ]?.imageUrl ?? "",
    );
    const safety = window.setTimeout(() => {
      isAnimating.current = false;
    }, 800);
    animate(offsetXRef.current, CARD_GAP, {
      duration: 0.65,
      ease: [0.32, 0.72, 0, 1],
      onComplete: () => {
        clearTimeout(safety);
        offsetXRef.current.jump(0);
        setActiveIndexRef.current((i) => (i - 1 + cardsLengthRef.current) % cardsLengthRef.current);
        isAnimating.current = false;
      },
    });
  });

  // Stable aliases for use in event handlers
  const goNext = useCallback(() => goNextRef.current(), []);
  const goPrev = useCallback(() => goPrevRef.current(), []);

  // Auto-advance — runs ONCE on mount, never re-registers
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (Date.now() >= autoPausedUntil.current) goNextRef.current();
      intervalRef.current = setInterval(() => {
        if (Date.now() < autoPausedUntil.current) return;
        goNextRef.current();
      }, cycleInterval);
    }, 600);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // Empty deps — runs once on mount, reads latest values via refs
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset on cards change
  useEffect(() => {
    setActiveIndex(0);
    offsetX.jump(0);
  }, [cards, offsetX]);

  // Pointer-event gesture tracking (no container movement)
  const pointerStart = useRef<{ x: number; t: number } | null>(null);
  const isDragging = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (isAnimating.current) return;
    pointerStart.current = { x: e.clientX, t: Date.now() };
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerStart.current || isAnimating.current) return;
      const dx = e.clientX - pointerStart.current.x;
      // Only start dragging after 6px threshold (avoids accidental taps)
      if (!isDragging.current && Math.abs(dx) > 6) {
        isDragging.current = true;
        autoPausedUntil.current = Date.now() + 2000;
      }
      if (isDragging.current) {
        // Apply with slight damping at edges
        offsetX.set(dx * 0.85);
      }
    },
    [offsetX],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerStart.current) return;
      const dx = e.clientX - pointerStart.current.x;
      const dt = Date.now() - pointerStart.current.t;
      const velocity = (dx / Math.max(dt, 1)) * 1000; // px/s
      pointerStart.current = null;

      if (!isDragging.current) return;
      isDragging.current = false;

      const swipe = dx + velocity * 0.15;
      if (swipe < -45) {
        // Animate remainder of the slide to -CARD_GAP then snap
        goNext();
      } else if (swipe > 45) {
        goPrev();
      } else {
        // Snap back
        animate(offsetX, 0, { duration: 0.35, ease: [0.22, 1, 0.36, 1] });
      }
      autoPausedUntil.current = Date.now() + 1200;
    },
    [goNext, goPrev, offsetX],
  );

  // 5-card window ensures cards are always visible on both edges during transitions
  const getCard = (offset: number) =>
    cards[(activeIndex + offset + cards.length * 10) % cards.length];

  const slots: (-2 | -1 | 0 | 1 | 2)[] = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "relative overflow-visible touch-pan-y select-none",
        "flex items-center justify-center",
        "w-screen",
        className,
      )}
      style={{ height: "min(65svh, 480px)" }}
    >
      {/* Gesture layer — does NOT move itself */}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {slots.map((slot) => (
          <SlideCard
            key={slot}
            card={getCard(slot)}
            slot={slot}
            offsetX={offsetX}
            eager={slot >= -1 && slot <= 1}
            isActive={slot === 0}
          />
        ))}
      </div>
    </div>
  );
}
