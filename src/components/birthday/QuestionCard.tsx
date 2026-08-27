import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Question } from "@/config/birthday";

export function QuestionCard({
  question,
  index,
  onDone,
}: {
  question: Question;
  index: number;
  onDone: () => void;
}) {
  const [reaction, setReaction] = useState<string | null>(null);
  const [retryLabel, setRetryLabel] = useState<string | null>(null);
  const [showDelayed, setShowDelayed] = useState(!question.delayedPrompt);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lockedRef = useRef(false);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  useEffect(() => {
    lockedRef.current = false;
    doneRef.current = false;
    setReaction(null);
    setRetryLabel(null);
    setShowDelayed(!question.delayedPrompt);
    if (question.delayedPrompt) addTimer(() => setShowDelayed(true), 1100);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [question, index, addTimer]);

  const finish = (text: string) => {
    if (doneRef.current) return;
    doneRef.current = true;
    lockedRef.current = true;
    setReaction(text);
    setRetryLabel(null);
    addTimer(() => {
      if (!doneRef.current) return;
      onDoneRef.current();
    }, 1500);
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className="glass w-full max-w-md rounded-[2rem] p-6 sm:p-8"
    >
      <h2 className="text-balance text-center text-xl font-semibold leading-snug sm:text-2xl">
        {question.prompt}
      </h2>

      <AnimatePresence>
        {question.delayedPrompt && showDelayed && (
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="mt-3 text-balance text-center font-display text-2xl text-primary"
          >
            {question.delayedPrompt}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-7 flex flex-col gap-3">
        {retryLabel ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => finish("That's more like it 😌❤️")}
            className="tap w-full rounded-2xl bg-primary px-5 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
          >
            {retryLabel}
          </motion.button>
        ) : (
          showDelayed &&
          question.answers.map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
              whileTap={{ scale: 0.95 }}
              disabled={!!reaction || !!retryLabel}
              onClick={() => {
                if (lockedRef.current) return;
                if (a.retry) {
                  lockedRef.current = true;
                  setReaction(a.reaction);
                  addTimer(() => {
                    lockedRef.current = false;
                    setReaction(null);
                    setRetryLabel(a.retryLabel ?? "Fine, YES 😭");
                  }, 1200);
                } else {
                  finish(a.reaction);
                }
              }}
              className="tap w-full rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-left text-base font-medium text-secondary-foreground shadow-[var(--shadow-soft)] disabled:opacity-70"
            >
              {a.label}
            </motion.button>
          ))
        )}
      </div>

      <AnimatePresence>
        {reaction && (
          <motion.p
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center text-lg font-semibold text-primary"
          >
            {reaction}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
