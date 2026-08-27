import { motion } from "motion/react";
import { useState } from "react";
import type { Memory } from "@/config/birthday";

const FALLBACK_EMOJI = ["📸", "🌸", "🫶", "🎈", "🍰", "🌈", "💫", "🐣", "🧁", "🎀"];

export function PolaroidCard({
  memory,
  index,
  rotate = 0,
  onOpen,
}: {
  memory: Memory;
  index: number;
  rotate?: number;
  onOpen?: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 40, rotate: rotate * 2, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 110, damping: 16 }}
      whileTap={{ scale: 0.96 }}
      className="tap block w-full rounded-2xl bg-white/85 p-3 pb-4 text-left shadow-[var(--shadow-float)] backdrop-blur"
    >
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-secondary">
        {failed ? (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-4xl"
            style={{ background: "var(--gradient-dream)" }}
          >
            <span>{FALLBACK_EMOJI[index % FALLBACK_EMOJI.length]}</span>
            <span className="px-3 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              add {memory.src.split("/").pop()}
            </span>
          </div>
        ) : (
          <img
            src={memory.src}
            alt={memory.alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <p className="mt-3 px-1 font-hand text-xl leading-tight text-foreground/80">
        {memory.caption}
      </p>
    </motion.button>
  );
}
