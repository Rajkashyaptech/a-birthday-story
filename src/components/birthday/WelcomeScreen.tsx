import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FloatingBits } from "./FloatingBits";
import { welcomeCta, welcomeLines } from "@/config/birthday";

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= welcomeLines.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 1500);
    return () => clearTimeout(t);
  }, [step]);

  const ready = step >= welcomeLines.length;

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-14">
      <FloatingBits count={16} />

      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative z-10 mb-10"
      >
        <motion.div
          animate={{ rotate: [-3, 3, -3], y: [0, -8, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="glass flex h-32 w-32 items-center justify-center rounded-[2rem] text-6xl sm:h-40 sm:w-40 sm:text-7xl"
        >
          🎁
        </motion.div>
        <motion.div
          className="absolute -right-3 -top-3 text-2xl"
          animate={{ scale: [1, 1.25, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex min-h-[9rem] w-full max-w-md flex-col items-center gap-3 text-center">
        {welcomeLines.slice(0, step).map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className={
              i === 0
                ? "font-display text-3xl font-semibold text-foreground sm:text-4xl"
                : "text-base text-muted-foreground sm:text-lg"
            }
          >
            {line}
          </motion.p>
        ))}
      </div>

      {ready && (
        <motion.button
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          whileTap={{ scale: 0.94 }}
          onClick={onStart}
          className="tap relative z-10 mt-10 w-full max-w-xs rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-float)]"
        >
          {welcomeCta}
        </motion.button>
      )}
    </section>
  );
}
