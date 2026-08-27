import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { celebrate } from "./confetti";
import { FloatingBits } from "./FloatingBits";
import { reveal } from "@/config/birthday";

function Balloons() {
  const balloons = ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {balloons.map((b, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-15vh] text-5xl"
          style={{ left: `${8 + i * 15}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-125vh", opacity: [0, 1, 1, 0], x: i % 2 ? 30 : -30 }}
          transition={{ duration: 9 + i, delay: i * 0.5, ease: "easeOut" }}
        >
          {b}
        </motion.span>
      ))}
    </div>
  );
}

export function BirthdayReveal({ onRevealed }: { onRevealed: () => void }) {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (step >= reveal.lines.length) return undefined;
    const t = setTimeout(() => setStep((s) => s + 1), 1200);
    return () => clearTimeout(t);
  }, [step]);

  const handle = () => {
    setRevealed(true);
    celebrate();
    onRevealed();
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-20">
      <div className="pointer-events-none absolute inset-0 bg-foreground/10 backdrop-blur-[2px]" />
      <FloatingBits count={12} />
      {revealed && <Balloons />}

      <div className="relative z-30 w-full max-w-lg text-center">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div key="pre" exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center">
              {reveal.lines.slice(0, step).map((l) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 font-display text-2xl text-foreground/80 sm:text-3xl"
                >
                  {l}
                </motion.p>
              ))}
              {step >= reveal.lines.length && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 1.04, 1] }}
                  transition={{ scale: { duration: 2, repeat: Infinity } }}
                  whileTap={{ scale: 0.93 }}
                  onClick={handle}
                  className="tap mt-8 w-full max-w-sm rounded-full px-8 py-5 text-lg font-bold text-primary-foreground shadow-[var(--shadow-float)]"
                  style={{ background: "var(--gradient-warm)" }}
                >
                  {reveal.cta}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 text-7xl sm:text-8xl"
              >
                🎂
              </motion.div>
              <h2 className="text-balance font-display text-4xl font-bold leading-tight text-gradient sm:text-6xl">
                {reveal.heading}
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 text-lg text-foreground/75"
              >
                {reveal.subheading}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
