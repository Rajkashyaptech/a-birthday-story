import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FloatingBits } from "./FloatingBits";
import { memoryIntroCta, memoryIntroLines } from "@/config/birthday";

export function MemoryTransition({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step >= memoryIntroLines.length) return undefined;
    const t = setTimeout(() => setStep((s) => s + 1), 1600);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-16">
      <FloatingBits count={10} />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 text-center">
        {memoryIntroLines.slice(0, step).map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className={
              i === memoryIntroLines.length - 1
                ? "font-display text-2xl font-semibold text-primary"
                : "text-lg text-foreground/80"
            }
          >
            {line}
          </motion.p>
        ))}
      </div>

      {step >= memoryIntroLines.length && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 15 }}
          whileTap={{ scale: 0.94 }}
          onClick={onContinue}
          className="tap relative z-10 mt-10 w-full max-w-xs rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-float)]"
        >
          {memoryIntroCta}
        </motion.button>
      )}
    </section>
  );
}
