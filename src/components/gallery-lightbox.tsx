import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  PlayCircle,
  ZoomIn,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";

// Module-level cache: URLs that have already been fully loaded this session
const loadedUrlCache = new Set<string>();

export type GalleryItem = {
  label: string;
  variant: "image" | "video";
  seed: number;
  trekName?: string;
  url?: string; // image URL (thumbnail for videos too)
  videoUrl?: string; // direct video file URL (mp4/webm)
  id?: string; // stable unique identifier
};

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({ items, activeIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const reduce = useReducedMotion();
  const isOpen = activeIndex !== null;
  const item = activeIndex !== null ? items[activeIndex] : null;
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset muted state and replay when item changes
  useEffect(() => {
    setMuted(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex]);

  // Pause video when lightbox closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  const prev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const next = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (typeof document === "undefined") return null;

  const hue1 = item ? 150 + ((item.seed * 7) % 40) : 155;
  const hue2 = item ? 170 + ((item.seed * 11) % 30) : 170;

  const content = (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-100 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/88" onClick={onClose} />

          {/* Main media pane */}
          <div className="relative z-10 w-full max-w-4xl mx-4 flex flex-col items-center gap-4">
            {/* Close */}
            <div className="w-full flex justify-end">
              <button
                onClick={onClose}
                className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 p-2.5 text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Media frame - shows original aspect ratio */}
            <div className="relative w-full max-h-[80vh] rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full flex items-center justify-center bg-black/50"
                >
                  {/* Image display - original aspect ratio */}
                  {item.variant === "image" && item.url && (
                    <img
                      src={item.url}
                      alt={item.label}
                      className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                      loading="eager"
                      decoding="async"
                    />
                  )}

                  {/* Gradient placeholder for images without URL */}
                  {item.variant === "image" && !item.url && (
                    <div
                      className="w-full h-full min-h-[400px]"
                      style={{
                        background: `radial-gradient(circle at 25% 25%, oklch(0.85 0.09 ${hue1} / 0.75), transparent 55%), radial-gradient(circle at 80% 75%, oklch(0.82 0.07 ${hue2} / 0.65), transparent 55%), linear-gradient(160deg, oklch(0.96 0.02 145) 0%, oklch(0.90 0.05 170) 50%, oklch(0.93 0.03 130) 100%)`,
                      }}
                    />
                  )}

                  {/* Video player - original aspect ratio */}
                  {item.variant === "video" && item.videoUrl && (
                    <video
                      ref={videoRef}
                      src={item.videoUrl}
                      poster={item.url}
                      className="max-w-full max-h-[80vh] w-auto h-auto"
                      autoPlay
                      loop
                      playsInline
                      muted={muted}
                      controls
                    />
                  )}

                  {/* Placeholder icon — no URL at all (image without URL or video without videoUrl) */}
                  {((item.variant === "image" && !item.url) ||
                    (item.variant === "video" && !item.videoUrl)) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary/60">
                      <div className="rounded-full bg-white/60 p-5 backdrop-blur shadow-sm">
                        {item.variant === "video" ? (
                          <PlayCircle className="h-10 w-10" strokeWidth={1.3} />
                        ) : (
                          <ImageIcon className="h-10 w-10" strokeWidth={1.3} />
                        )}
                      </div>
                      <p className="text-xs uppercase tracking-[0.18em] text-primary/50">
                        {item.label}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption + counter */}
            <div className="w-full flex items-center justify-between px-1">
              <div className="text-left">
                {item.trekName && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {item.trekName}
                  </p>
                )}
                <p className="text-white/90 text-sm font-serif">{item.label}</p>
              </div>
              <span className="text-white/40 text-xs tabular-nums">
                {(activeIndex ?? 0) + 1} / {items.length}
              </span>
            </div>

            {/* Prev / Next */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6">
              <button
                onClick={prev}
                className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 p-3 text-white transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6">
              <button
                onClick={next}
                className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 p-3 text-white transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

// ─── Masonry tile ────────────────────────────────────────────────────────────

interface GalleryTileProps {
  item: GalleryItem;
  index: number;
  onClick: (index: number) => void;
}

export function GalleryTile({ item, index, onClick }: GalleryTileProps) {
  const reduce = useReducedMotion();
  const hue1 = 150 + ((item.seed * 7) % 40);
  const hue2 = 170 + ((item.seed * 11) % 30);
  // Start as loaded if already cached, otherwise wait for load event
  const hasMedia = item.url || item.videoUrl;
  const mediaUrl = item.url || item.videoUrl;
  const [imgLoaded, setImgLoaded] = useState(() =>
    !hasMedia ? true : loadedUrlCache.has(mediaUrl || ""),
  );
  const [shouldLoad, setShouldLoad] = useState(() =>
    !hasMedia ? true : loadedUrlCache.has(mediaUrl || ""),
  );
  const tileRef = useRef<HTMLButtonElement>(null);

  // Trigger image fetch when tile is near viewport (400px ahead)
  useEffect(() => {
    if ((!item.url && !item.videoUrl) || shouldLoad) return;
    const el = tileRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [item.url, item.videoUrl, shouldLoad]);

  const handleLoad = () => {
    if (item.url) loadedUrlCache.add(item.url);
    if (item.videoUrl) loadedUrlCache.add(item.videoUrl);
    setImgLoaded(true);
  };

  // Vary heights across 3 buckets for masonry feel (col-span controlled by parent)
  const heightClass =
    index % 5 === 0
      ? "aspect-[4/5]"
      : index % 5 === 2
        ? "aspect-[3/4]"
        : index % 5 === 4
          ? "aspect-[1/1]"
          : "aspect-4/3";

  // Stagger delay based on column position (0-3)
  const staggerDelay = (index % 4) * 70;

  return (
    <button
      ref={tileRef}
      onClick={() => onClick(index)}
      className={`group relative w-full overflow-hidden rounded-2xl border border-white/50 shadow-[0_8px_30px_-12px_oklch(0.42_0.07_155/0.4)] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-transform duration-300 hover:scale-[1.02] ${heightClass} ${reduce ? "" : "gallery-tile-enter"}`}
      style={
        item.url || item.videoUrl
          ? ({ "--stagger-delay": `${staggerDelay}ms` } as React.CSSProperties)
          : ({
              "--stagger-delay": `${staggerDelay}ms`,
              background: `radial-gradient(circle at 30% 20%, oklch(0.88 0.08 ${hue1} / 0.65), transparent 55%), radial-gradient(circle at 80% 80%, oklch(0.86 0.06 ${hue2} / 0.55), transparent 60%), oklch(0.95 0.03 155)`,
            } as React.CSSProperties)
      }
    >
      {/* Shimmer skeleton while image/video loads */}
      {(item.url || item.videoUrl) && !imgLoaded && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-primary/8" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
        </div>
      )}

      {/* Image — only rendered once tile is near viewport */}
      {item.variant === "image" && item.url && shouldLoad && (
        <img
          src={item.url}
          alt={item.label}
          decoding="async"
          onLoad={handleLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Video thumbnail — shows first frame as poster */}
      {item.variant === "video" && item.videoUrl && shouldLoad && (
        <video
          src={item.videoUrl}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          preload="metadata"
          muted
          playsInline
          onLoadedData={handleLoad}
        />
      )}

      {/* Icon overlay — only when no URL at all */}
      {!item.url && !item.videoUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-primary/60 transition-opacity duration-300 group-hover:opacity-0">
          <div className="rounded-full bg-white/60 p-3 backdrop-blur shadow-sm">
            {item.variant === "video" ? (
              <PlayCircle className="h-5 w-5" strokeWidth={1.4} />
            ) : (
              <ImageIcon className="h-5 w-5" strokeWidth={1.4} />
            )}
          </div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-primary/50 px-3 text-center leading-tight max-w-28">
            {item.label}
          </p>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-t from-black/30 via-transparent to-transparent">
        <ZoomIn className="h-4 w-4 text-white drop-shadow" />
      </div>

      {/* Trek tag */}
      {item.trekName && (
        <div className="absolute top-2.5 left-2.5 rounded-full bg-white/60 backdrop-blur px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-primary/80 border border-white/40 max-w-[80%] truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.trekName}
        </div>
      )}

      {/* Video badge */}
      {item.variant === "video" && (
        <span className="absolute top-2.5 right-2.5 rounded-full bg-black/40 backdrop-blur px-2 py-0.5 text-[9px] uppercase tracking-widest text-white/80">
          Video
        </span>
      )}

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl" />
    </button>
  );
}
