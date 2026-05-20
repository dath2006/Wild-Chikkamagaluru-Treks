import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Mountain,
  MapPin,
  ImageIcon,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingUp,
  Calendar,
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

          {/* Modal Sheet */}
          <motion.div
            key="modal-sheet"
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:max-w-4xl md:w-[90vw] bg-white md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl max-h-[92dvh] md:max-h-[85vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-2.5 backdrop-blur-md shadow-lg text-primary hover:bg-white hover:scale-105 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column: Media + Thumbnails */}
            <div className="w-full md:w-[55%] flex flex-col shrink-0">
              {/* Media carousel */}
              <div className="relative flex-1 min-h-[300px] md:min-h-[420px] bg-linear-to-br from-[oklch(0.95_0.02_145)] to-[oklch(0.90_0.04_170)] overflow-hidden">
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 backdrop-blur-md shadow-lg text-primary hover:bg-white hover:scale-105 transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 backdrop-blur-md shadow-lg text-primary hover:bg-white hover:scale-105 transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {trek.media.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {trek.media.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 bg-white shadow-md" : "w-2 bg-white/50 hover:bg-white/70"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {trek.media.length > 1 && (
                <div className="hidden md:flex gap-2 px-5 py-4 overflow-x-auto shrink-0 scrollbar-none bg-white border-t border-gray-100">
                  {trek.media.map((m, i) => {
                    const hue = 150 + ((trek.coverSeed + i * 7) % 40);
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveIdx(i)}
                        className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === activeIdx ? "border-primary shadow-lg scale-105" : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300"}`}
                        style={{
                          background: `linear-gradient(135deg, oklch(0.88 0.06 ${hue}), oklch(0.93 0.04 ${hue + 20}))`,
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-primary/60">
                          {m.type === "video" ? (
                            <PlayCircle className="h-5 w-5" strokeWidth={1.4} />
                          ) : (
                            <ImageIcon className="h-5 w-5" strokeWidth={1.4} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="flex-1 flex flex-col bg-white">
              <div className="px-5 py-5 md:px-6 md:py-6 flex-1 overflow-y-auto">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <h2 className="font-serif text-2xl md:text-3xl text-primary leading-tight flex-1">
                    {trek.name}
                  </h2>
                  {trek.tag && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-primary font-medium">
                      {trek.tag}
                    </span>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {trek.altitude && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-xs text-muted-foreground">
                      <TrendingUp className="h-3.5 w-3.5" /> {trek.altitude}
                    </div>
                  )}
                  {trek.start && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {trek.start}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Full Day
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm md:text-base text-foreground/80 leading-relaxed">
                  {trek.blurb}
                </p>

                {/* Highlights */}
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
                    Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Panoramic Views", "Wildlife Spotting", "Waterfalls", "Ancient Trails"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-sm text-foreground/70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 py-4 md:px-6 md:py-5 border-t border-gray-100 bg-gray-50/50">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  Plan this trek
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}
