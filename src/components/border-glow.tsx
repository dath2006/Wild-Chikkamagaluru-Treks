import { useRef, useEffect, type ReactNode } from "react";

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  style?: React.CSSProperties;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 155, s: 40, l: 60 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ];
  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100);
      return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    })
    .join(", ");
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function easeInCubic(x: number) {
  return x * x * x;
}

interface AnimateOpts {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (t: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimateOpts): () => void {
  let raf = 0;
  let timer = 0;
  let t0 = 0;
  const tick = () => {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) {
      raf = requestAnimationFrame(tick);
    } else if (onEnd) onEnd();
  };
  timer = window.setTimeout(() => {
    t0 = performance.now();
    raf = requestAnimationFrame(tick);
  }, delay);
  return () => {
    clearTimeout(timer);
    cancelAnimationFrame(raf);
  };
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "155 40 60",
  backgroundColor = "oklch(0.99 0.008 130)",
  borderRadius = 24,
  glowRadius = 36,
  glowIntensity = 0.9,
  coneSpread = 25,
  animated = false,
  colors = ["#6ee7b7", "#fbbf24", "#86efac"],
  fillOpacity = 0.45,
  style,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderLayerRef = useRef<HTMLDivElement>(null);
  const fillLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLSpanElement>(null);

  // All animation state lives in refs — zero React re-renders during sweep or hover
  const stateRef = useRef({ angle: 45, proximity: 0, hovered: false, sweeping: false });

  useEffect(() => {
    const card = cardRef.current;
    const borderEl = borderLayerRef.current;
    const fillEl = fillLayerRef.current;
    const glowEl = glowLayerRef.current;
    if (!card || !borderEl || !fillEl || !glowEl) return;

    const colorSensitivity = edgeSensitivity + 20;
    const meshGradients = buildMeshGradients(colors);
    const borderBg = [
      `linear-gradient(${backgroundColor} 0 100%) padding-box`,
      "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
      ...meshGradients.map((g) => `${g} border-box`),
    ].join(", ");
    const fillBg = meshGradients.map((g) => `${g} padding-box`).join(", ");
    const boxShadow = buildBoxShadow(glowColor, glowIntensity);

    // Set static styles once
    borderEl.style.background = borderBg;
    fillEl.style.background = fillBg;
    (glowEl.firstElementChild as HTMLElement).style.boxShadow = boxShadow;

    // Flush computed values to DOM — called on every RAF tick during sweep/hover
    const flush = () => {
      const { angle, proximity, hovered, sweeping } = stateRef.current;
      const isActive = hovered || sweeping;
      const borderOpacity = isActive
        ? Math.max(0, (proximity * 100 - colorSensitivity) / (100 - colorSensitivity))
        : 0;
      const glowOpacity = isActive
        ? Math.max(0, (proximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
        : 0;
      const angleDeg = `${angle.toFixed(2)}deg`;
      const transitionOn = "opacity 0.25s ease-out";
      const transitionOff = "opacity 0.75s ease-in-out";

      borderEl.style.opacity = String(borderOpacity);
      borderEl.style.maskImage = `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`;
      (borderEl.style as any).WebkitMaskImage = borderEl.style.maskImage;
      borderEl.style.transition = isActive ? transitionOn : transitionOff;

      fillEl.style.opacity = String(borderOpacity * fillOpacity);
      const fillMask = [
        "linear-gradient(to bottom, black, black)",
        "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
        "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
        "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
        "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
        "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
        `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
      ].join(", ");
      fillEl.style.maskImage = fillMask;
      (fillEl.style as any).WebkitMaskImage = fillMask;
      fillEl.style.transition = isActive ? transitionOn : transitionOff;

      glowEl.style.opacity = String(glowOpacity);
      glowEl.style.maskImage = `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`;
      (glowEl.style as any).WebkitMaskImage = glowEl.style.maskImage;
      glowEl.style.transition = isActive ? transitionOn : transitionOff;
    };

    // Pointer handlers — direct DOM, no setState
    const onPointerMove = (e: PointerEvent) => {
      if (stateRef.current.sweeping) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity,
        ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      stateRef.current.proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
      stateRef.current.angle = deg;
      flush();
    };
    const onPointerEnter = () => {
      stateRef.current.hovered = true;
      flush();
    };
    const onPointerLeave = () => {
      stateRef.current.hovered = false;
      flush();
    };

    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointerleave", onPointerLeave);

    // Sweep animation — all via refs + direct DOM
    let hasSwept = false;
    let cancelFns: Array<() => void> = [];
    const startSweep = () => {
      if (hasSwept) return;
      hasSwept = true;
      stateRef.current.sweeping = true;
      stateRef.current.angle = 110;
      cancelFns.push(
        animateValue({
          duration: 500,
          onUpdate: (v) => {
            stateRef.current.proximity = v / 100;
            flush();
          },
        }),
      );
      cancelFns.push(
        animateValue({
          ease: easeInCubic,
          duration: 1500,
          end: 50,
          onUpdate: (v) => {
            stateRef.current.angle = (465 - 110) * (v / 100) + 110;
            flush();
          },
        }),
      );
      cancelFns.push(
        animateValue({
          ease: easeOutCubic,
          delay: 1500,
          duration: 2250,
          start: 50,
          end: 100,
          onUpdate: (v) => {
            stateRef.current.angle = (465 - 110) * (v / 100) + 110;
            flush();
          },
        }),
      );
      cancelFns.push(
        animateValue({
          ease: easeInCubic,
          delay: 2500,
          duration: 1500,
          start: 100,
          end: 0,
          onUpdate: (v) => {
            stateRef.current.proximity = v / 100;
            flush();
          },
          onEnd: () => {
            stateRef.current.sweeping = false;
            flush();
          },
        }),
      );
    };

    let observer: IntersectionObserver | null = null;
    if (animated) {
      if (!("IntersectionObserver" in window)) {
        startSweep();
      } else {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              startSweep();
              observer?.disconnect();
            }
          },
          { threshold: 0.35 },
        );
        observer.observe(card);
      }
    }

    return () => {
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerenter", onPointerEnter);
      card.removeEventListener("pointerleave", onPointerLeave);
      observer?.disconnect();
      cancelFns.forEach((fn) => fn());
    };
  }, [
    animated,
    backgroundColor,
    colors,
    coneSpread,
    edgeSensitivity,
    fillOpacity,
    glowColor,
    glowIntensity,
  ]);

  return (
    <div
      ref={cardRef}
      className={`relative grid isolate border border-white/50 ${className}`}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: "translate3d(0,0,0.01px)",
        ...style,
      }}
    >
      {/* mesh gradient border */}
      <div
        ref={borderLayerRef}
        className="absolute inset-0 rounded-[inherit] z-[-1]"
        style={{ border: "1px solid transparent", opacity: 0 }}
      />

      {/* mesh gradient fill near edges */}
      <div
        ref={fillLayerRef}
        className="absolute inset-0 rounded-[inherit] z-[-1]"
        style={
          {
            border: "1px solid transparent",
            maskComposite: "subtract, add, add, add, add, add",
            WebkitMaskComposite:
              "source-out, source-over, source-over, source-over, source-over, source-over",
            mixBlendMode: "soft-light",
            opacity: 0,
          } as React.CSSProperties
        }
      />

      {/* outer glow */}
      <span
        ref={glowLayerRef}
        className="absolute pointer-events-none z-1 rounded-[inherit]"
        style={
          {
            inset: `${-glowRadius}px`,
            mixBlendMode: "plus-lighter",
            opacity: 0,
          } as React.CSSProperties
        }
      >
        <span className="absolute rounded-[inherit]" style={{ inset: `${glowRadius}px` }} />
      </span>

      <div className="flex flex-col relative overflow-auto z-1">{children}</div>
    </div>
  );
}
