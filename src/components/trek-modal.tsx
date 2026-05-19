import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Mountain,
  MapPin,
  ImageIcon,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Trek } from "@/lib/treks";

interface TrekModalProps {
  trek: Trek | null;
  onClose: () => void;
}

export function TrekModal({ trek, onClose }: TrekModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [trek]);

  useEffect(() => {
    if (trek) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [trek]);

  const prev = () =>
    setActiveIdx((i) => (i - 1 + (trek?.media.length ?? 1)) % (trek?.media.length ?? 1));
  const next = () => setActiveIdx((i) => (i + 1) % (trek?.media.length ?? 1));

  const modalContent = (
    <AnimatePresence>
      {trek && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          {/* Backdrop — clicking this closes the modal */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          {/* Sheet */}
          <motion.div
            key="modal-sheet"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-lg bg-[oklch(0.985_0.012_130)] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl max-h-[92dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/70 p-2 backdrop-blur shadow-sm text-primary hover:bg-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Media carousel */}
            <div className="relative w-full aspect-4/3 bg-[oklch(0.93_0.03_145)] overflow-hidden shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/* Gradient placeholder — replace with real <img> or <video> when available */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 25% 25%, oklch(0.85 0.09 ${150 + ((trek.coverSeed + activeIdx * 7) % 40)} / 0.7), transparent 55%), radial-gradient(circle at 80% 75%, oklch(0.82 0.07 ${170 + ((trek.coverSeed + activeIdx * 11) % 30)} / 0.6), transparent 55%), linear-gradient(160deg, oklch(0.96 0.02 145) 0%, oklch(0.90 0.05 170) 50%, oklch(0.93 0.03 130) 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-primary/60">
                    <div className="rounded-full bg-white/60 p-4 backdrop-blur shadow-sm">
                      {trek.media[activeIdx]?.type === "video" ? (
                        <PlayCircle className="h-8 w-8" strokeWidth={1.4} />
                      ) : (
                        <ImageIcon className="h-8 w-8" strokeWidth={1.4} />
                      )}
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-primary/50 px-4 text-center">
                      {trek.media[activeIdx]?.label}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              {trek.media.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 backdrop-blur shadow-sm text-primary hover:bg-white transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 backdrop-blur shadow-sm text-primary hover:bg-white transition"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {trek.media.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {trek.media.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "w-5 bg-primary" : "w-1.5 bg-primary/30"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {trek.media.length > 1 && (
              <div className="flex gap-2 px-4 pt-3 overflow-x-auto shrink-0 scrollbar-none">
                {trek.media.map((m, i) => {
                  const hue = 150 + ((trek.coverSeed + i * 7) % 40);
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === activeIdx ? "border-primary shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-90"}`}
                      style={{
                        background: `linear-gradient(135deg, oklch(0.88 0.06 ${hue}), oklch(0.93 0.04 ${hue + 20}))`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-primary/60">
                        {m.type === "video" ? (
                          <PlayCircle className="h-4 w-4" strokeWidth={1.4} />
                        ) : (
                          <ImageIcon className="h-4 w-4" strokeWidth={1.4} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Info */}
            <div className="px-5 py-4 flex-1 overflow-y-auto">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-2xl text-primary leading-tight">{trek.name}</h2>
                {trek.tag && (
                  <span className="shrink-0 rounded-full bg-accent/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary mt-1">
                    {trek.tag}
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {trek.altitude && (
                  <span className="inline-flex items-center gap-1">
                    <Mountain className="h-3 w-3" /> {trek.altitude}
                  </span>
                )}
                {trek.start && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {trek.start}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{trek.blurb}</p>

              <a
                href="#contact"
                onClick={onClose}
                className="mt-5 mb-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition"
              >
                Plan this trek
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}
