import { motion } from "motion/react";
import { ImageIcon, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  hint?: string;
  variant?: "image" | "video";
  aspect?: "video" | "square" | "portrait" | "wide";
  className?: string;
};

const aspectClass = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function MediaPlaceholder({
  label = "Photo coming soon",
  hint = "Replace with a high-resolution image",
  variant = "image",
  aspect = "video",
  className,
}: Props) {
  const Icon = variant === "video" ? PlayCircle : ImageIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl border border-white/60",
        "gradient-mist shadow-[0_10px_40px_-20px_oklch(0.42_0.07_155_/_0.35)]",
        aspectClass[aspect],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.85_0.08_160_/_0.4),transparent_60%),radial-gradient(circle_at_80%_80%,oklch(0.85_0.06_180_/_0.4),transparent_60%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary/70">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full bg-white/60 p-4 shadow-sm backdrop-blur"
        >
          <Icon className="h-7 w-7" strokeWidth={1.4} />
        </motion.div>
        <div className="text-center px-6">
          <p className="font-serif text-lg text-primary">{label}</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">{hint}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40 rounded-3xl" />
    </motion.div>
  );
}
