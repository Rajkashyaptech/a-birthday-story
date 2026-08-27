import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { appreciation } from "@/config/birthday";

export function AppreciationCard({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="glass-soft flex items-start gap-3 rounded-3xl p-5"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Heart className="h-4 w-4" fill="currentColor" />
      </span>
      <p className="text-pretty text-base leading-relaxed text-foreground/85">
        <span className="mr-1 text-xs font-semibold text-muted-foreground">{index + 1}.</span>
        {text}
      </p>
    </motion.div>
  );
}

export function AppreciationSection() {
  return (
    <section className="relative px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        {appreciation.intro.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={
              i === 0
                ? "text-center font-display text-2xl font-semibold sm:text-3xl"
                : "mt-2 text-center text-base text-muted-foreground"
            }
          >
            {line}
          </motion.p>
        ))}

        <div className="mt-9 flex flex-col gap-4">
          {appreciation.items.map((t, i) => (
            <AppreciationCard key={t} text={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
