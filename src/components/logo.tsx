interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  /** "color" = full brand palette, "white" = all white for dark backgrounds */
  variant?: "color" | "white";
}

export function Logo({ size = 36, showText = true, className = "", variant = "color" }: LogoProps) {
  const isWhite = variant === "white";

  const peakGreen   = isWhite ? "#fff" : "oklch(0.42 0.09 155)";
  const peakMid     = isWhite ? "#ffffffcc" : "oklch(0.50 0.08 150)";
  const sunAmber    = isWhite ? "#fff" : "oklch(0.78 0.16 48)";
  const sunGlow     = isWhite ? "#ffffff55" : "oklch(0.88 0.12 55 / 0.6)";
  const trailGreen  = isWhite ? "#ffffffaa" : "oklch(0.60 0.10 160)";
  const snowWhite   = isWhite ? "#ffffffdd" : "oklch(0.97 0.01 130)";
  const textPrimary = isWhite ? "#fff" : "oklch(0.32 0.07 155)";
  const textSub     = isWhite ? "#ffffffbb" : "oklch(0.52 0.06 155)";

  const id = `lg-${size}`;

  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* ── Mark ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Sun radial glow */}
          <radialGradient id={`${id}-sun`} cx="70%" cy="28%" r="50%">
            <stop offset="0%" stopColor={sunAmber} stopOpacity="1" />
            <stop offset="60%" stopColor={sunGlow} stopOpacity="0.6" />
            <stop offset="100%" stopColor={sunGlow} stopOpacity="0" />
          </radialGradient>
          {/* Peak left face */}
          <linearGradient id={`${id}-peakL`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={peakGreen} />
            <stop offset="100%" stopColor={peakMid} />
          </linearGradient>
          {/* Peak right face — slightly lighter */}
          <linearGradient id={`${id}-peakR`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={peakMid} stopOpacity="0.75" />
            <stop offset="100%" stopColor={peakGreen} stopOpacity="0.55" />
          </linearGradient>
          {/* Trail gradient */}
          <linearGradient id={`${id}-trail`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={trailGreen} stopOpacity="0" />
            <stop offset="40%" stopColor={trailGreen} stopOpacity="0.9" />
            <stop offset="100%" stopColor={sunAmber} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Sun / horizon glow disc */}
        <circle cx="28" cy="13" r="10" fill={`url(#${id}-sun)`} />

        {/* Sun circle core */}
        <circle cx="28" cy="13" r="4.5" fill={sunAmber} opacity="0.92" />

        {/* Sun arc rays — short strokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 28 + Math.cos(rad) * 6.2;
          const y1 = 13 + Math.sin(rad) * 6.2;
          const x2 = 28 + Math.cos(rad) * 7.8;
          const y2 = 13 + Math.sin(rad) * 7.8;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={sunAmber}
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.75"
            />
          );
        })}

        {/* Background smaller peak (right) */}
        <polygon
          points="24,32 31,16 38,32"
          fill={peakMid}
          opacity="0.38"
        />

        {/* Main peak — left face */}
        <polygon
          points="3,33 17,8 31,33"
          fill={`url(#${id}-peakL)`}
        />

        {/* Main peak — right face shading */}
        <polygon
          points="17,8 31,33 17,33"
          fill={`url(#${id}-peakR)`}
        />

        {/* Snow cap */}
        <polygon
          points="17,8 12.5,20 21.5,20"
          fill={snowWhite}
          opacity="0.88"
        />

        {/* Trail path winding up the base */}
        <path
          d="M4,33 Q9,29 13,30 Q17,31 19,28 Q21,25 24,26"
          stroke={`url(#${id}-trail)`}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* Ground baseline */}
        <line
          x1="2" y1="33.5" x2="38" y2="33.5"
          stroke={peakMid}
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>

      {/* ── Wordmark ── */}
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className="font-serif tracking-tight"
            style={{ fontSize: size * 0.48, color: textPrimary, lineHeight: 1.15 }}
          >
            Wild Chikkamagaluru
          </span>
          <span
            className="uppercase tracking-[0.18em] font-sans"
            style={{ fontSize: size * 0.26, color: textSub, letterSpacing: "0.18em" }}
          >
            Treks
          </span>
        </span>
      )}
    </a>
  );
}
