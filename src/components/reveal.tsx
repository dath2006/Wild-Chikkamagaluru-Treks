import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Section-level reveal wrapper. Fades + lifts children into view and adds a
 * subtle scroll-driven parallax on its inner content.
 */
export function SectionReveal({
  children,
  className,
  id,
  parallax = 40,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </motion.section>
  );
}

/**
 * Word-by-word text reveal. Splits the string by spaces and staggers each
 * word in from below with a soft blur.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };
  const child: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.6em", filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease },
    },
  };
  const MotionTag = motion(Tag as React.ElementType);
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.05em]">
          <motion.span variants={child} className="inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Fades + lifts a block of children in once it enters the viewport. */
export function RevealBlock({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image / media reveal — a clip-path mask wipes upward to reveal the child
 * while the inner element scales down slightly for a cinematic feel. Also
 * adds gentle scroll parallax.
 */
export function RevealImage({
  children,
  className,
  parallax = 30,
}: {
  children: ReactNode;
  className?: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1.1, ease }}
      style={{ willChange: "clip-path, transform" }}
    >
      <motion.div
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 1.4, ease }}
        style={{ y: reduce ? 0 : y }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
