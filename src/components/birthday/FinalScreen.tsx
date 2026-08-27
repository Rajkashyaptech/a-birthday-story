import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { FloatingBits } from "./FloatingBits";
import { finalScreen, friend } from "@/config/birthday";

export function FinalScreen({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="relative flex min-h-[80dvh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <FloatingBits count={10} />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="glass relative z-10 flex h-28 w-28 items-center justify-center rounded-[2rem] text-5xl"
      >
        <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          🎂
        </motion.span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mt-8 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground"
      >
        {finalScreen.credit}
      </motion.p>

      <p className="relative z-10 mt-3 font-hand text-2xl text-foreground/70">{friend.signature}</p>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onReplay}
        className="tap relative z-10 mt-10 inline-flex items-center gap-2 rounded-full bg-white/80 px-7 py-4 text-sm font-semibold text-secondary-foreground shadow-[var(--shadow-soft)]"
      >
        <RotateCcw className="h-4 w-4" />
        {finalScreen.replay}
      </motion.button>
    </section>
  );
}
