import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FloatingHearts } from "./FloatingBits";
import { popHearts } from "./confetti";
import { finalSurprise } from "@/config/birthday";

export function FinalSurprise() {
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!opened || visible >= finalSurprise.lines.length) return undefined;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 1500);
    return () => clearTimeout(t);
  }, [opened, visible]);

  return (
    <section className="relative flex min-h-[70dvh] flex-col items-center justify-center px-5 py-16 text-center">
      <FloatingHearts active={opened} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="teaser" exit={{ opacity: 0, scale: 0.92 }} className="flex flex-col items-center">
            {finalSurprise.teaser.map((t, i) => (
              <motion.p
                key={t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.6 }}
                className="font-display text-2xl text-foreground/80 sm:text-3xl"
              >
                {t}
              </motion.p>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, type: "spring", stiffness: 180, damping: 14 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                setOpened(true);
                popHearts();
              }}
              className="tap mt-8 w-full max-w-xs rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-float)]"
            >
              {finalSurprise.cta}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="lines" className="relative z-50 flex flex-col items-center gap-4">
            {finalSurprise.lines.slice(0, visible).map((l, i) => (
              <motion.p
                key={l}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 130, damping: 15 }}
                className={
                  i === 0
                    ? "font-display text-3xl font-semibold text-gradient sm:text-4xl"
                    : "text-lg text-foreground/80"
                }
              >
                {l}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
