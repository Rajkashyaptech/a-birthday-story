import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PolaroidCard } from "./PolaroidCard";
import { FloatingBits } from "./FloatingBits";
import { memories } from "@/config/birthday";

export function MemoryGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : memories[open];

  return (
    <section className="relative px-5 py-16 sm:py-24">
      <FloatingBits count={8} />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-2 text-center font-display text-3xl font-semibold sm:text-4xl"
      >
        Memory lane 📸
      </motion.h2>
      <p className="relative z-10 mb-8 text-center text-sm text-muted-foreground">
        Swipe through · tap a photo to open it
      </p>

      {/* Mobile: swipeable carousel */}
      <div className="relative z-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {memories.map((m, i) => (
          <div key={m.src} className="w-[72vw] max-w-[300px] shrink-0 snap-center">
            <PolaroidCard memory={m} index={i} rotate={i % 2 ? 1.5 : -1.5} onOpen={() => setOpen(i)} />
          </div>
        ))}
      </div>

      {/* Tablet / desktop: scattered polaroids */}
      <div className="relative z-10 mx-auto hidden max-w-4xl grid-cols-2 gap-6 sm:grid lg:grid-cols-3">
        {memories.map((m, i) => (
          <div key={m.src} className={i % 3 === 1 ? "sm:mt-10" : ""}>
            <PolaroidCard
              memory={m}
              index={i}
              rotate={[-3, 2.5, -1.5, 3, -2, 1.5][i % 6]}
              onOpen={() => setOpen(i)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <PolaroidCard memory={active} index={open ?? 0} />
              <button
                onClick={() => setOpen(null)}
                className="tap mt-4 w-full rounded-full bg-white/85 py-3 text-sm font-semibold text-secondary-foreground"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
