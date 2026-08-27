import { motion } from "motion/react";
import { letter } from "@/config/birthday";

export function BirthdayLetter() {
  const paragraphs = letter.body.split("\n\n");

  return (
    <section className="relative px-5 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="mx-auto max-w-md rounded-[2rem] border border-white/70 bg-[color-mix(in_oklab,var(--cream)_88%,white)] p-6 shadow-[var(--shadow-float)] sm:p-9"
      >
        <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
          {letter.heading}
        </h2>
        <div className="mx-auto mt-3 h-px w-16 bg-border" />

        <div className="mt-6 space-y-4">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
              className="text-pretty font-hand text-xl leading-relaxed text-foreground/85 sm:text-2xl"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
