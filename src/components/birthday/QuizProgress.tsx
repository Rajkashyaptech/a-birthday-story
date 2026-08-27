import { motion } from "motion/react";

export function QuizProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Question {current} of {total}
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/50">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-warm)" }}
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </div>
    </div>
  );
}
