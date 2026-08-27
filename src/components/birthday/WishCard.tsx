import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { wishes } from "@/config/birthday";

export function WishCard({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 ? 28 : -28, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="glass flex items-center gap-3 rounded-full px-5 py-4"
    >
      <Sparkles className="h-4 w-4 shrink-0 text-primary" />
      <p className="text-pretty text-[0.95rem] font-medium leading-snug">{text}</p>
    </motion.div>
  );
}

export function WishesSection() {
  return (
    <section className="relative px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center font-display text-3xl font-semibold sm:text-4xl"
        >
          A few wishes ✨
        </motion.h2>
        <div className="flex flex-col gap-4">
          {wishes.map((w, i) => (
            <WishCard key={w} text={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
