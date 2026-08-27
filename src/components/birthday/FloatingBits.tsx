import { motion } from "motion/react";
import { useMemo } from "react";

const GLYPHS = ["❤️", "✨", "💖", "⭐", "🎀", "🫧"];

function seeded(i: number, salt: number) {
  return ((Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453) % 1 + 1) % 1;
}

/** Ambient floating hearts / stars / sparkles in the background. */
export function FloatingBits({ count = 14, className = "" }: { count?: number; className?: string }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        glyph: GLYPHS[Math.floor(seeded(i, 3) * GLYPHS.length)],
        left: +(seeded(i, 1) * 96).toFixed(2),
        top: +(seeded(i, 2) * 92).toFixed(2),
        size: Math.round(12 + seeded(i, 4) * 20),
        delay: +(seeded(i, 5) * 5).toFixed(2),
        duration: +(6 + seeded(i, 6) * 6).toFixed(2),
      })),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute select-none opacity-60"
          style={{ left: `${b.left}%`, top: `${b.top}%`, fontSize: b.size }}
          animate={{ y: [0, -22, 0], rotate: [0, 8, -6, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {b.glyph}
        </motion.span>
      ))}
    </div>
  );
}

/** One-shot burst of hearts floating up the whole screen. */
export function FloatingHearts({ active }: { active: boolean }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: +(seeded(i, 11) * 92 + 2).toFixed(2),
        size: Math.round(18 + seeded(i, 12) * 26),
        delay: +(seeded(i, 13) * 2.2).toFixed(2),
        drift: Math.round((seeded(i, 14) - 0.5) * 80),
        glyph: seeded(i, 15) > 0.7 ? "💗" : seeded(i, 15) > 0.4 ? "❤️" : "💖",
      })),
    [],
  );

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-10vh] select-none"
          style={{ left: `${h.left}%`, fontSize: h.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-115vh", x: h.drift, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5 + h.delay, delay: h.delay, ease: "easeOut" }}
        >
          {h.glyph}
        </motion.span>
      ))}
    </div>
  );
}
