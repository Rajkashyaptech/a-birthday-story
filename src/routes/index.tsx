import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { WelcomeScreen } from "@/components/birthday/WelcomeScreen";
import { QuestionCard } from "@/components/birthday/QuestionCard";
import { QuizProgress } from "@/components/birthday/QuizProgress";
import { MemoryTransition } from "@/components/birthday/MemoryTransition";
import { MemoryGallery } from "@/components/birthday/MemoryGallery";
import { AppreciationSection } from "@/components/birthday/AppreciationCard";
import { BirthdayReveal } from "@/components/birthday/BirthdayReveal";
import { BirthdayLetter } from "@/components/birthday/BirthdayLetter";
import { WishesSection } from "@/components/birthday/WishCard";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";
import { FinalScreen } from "@/components/birthday/FinalScreen";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { FloatingBits } from "@/components/birthday/FloatingBits";
import { friend, questions } from "@/config/birthday";

const title = `Happy Birthday, ${friend.name} 🎂`;
const description = `A tiny interactive birthday experience made just for ${friend.name} — questions, memories, wishes and one big surprise.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "welcome" | "quiz" | "transition" | "story";

function Index() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [qIndex, setQIndex] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const storyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  // Repeatedly looks for the badge and wipes it from memory once found
    const interval = setInterval(() => {
      const badge = document.getElementById("lovable-badge");
      if (badge) {
        badge.remove();
        clearInterval(interval); // Destroys the interval once badge is gone
      }
    }, 300);

    return () => clearInterval(interval); // Cleanup interval if component unmounts
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage, runKey]);

  const reset = () => {
    setMusicOn(false);
    setQIndex(0);
    setStage("welcome");
    setRunKey((k) => k + 1);
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <MusicPlayer active={musicOn} />

      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <motion.div key={`welcome-${runKey}`} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
            <WelcomeScreen onStart={() => setStage("quiz")} />
          </motion.div>
        )}

        {stage === "quiz" && (
          <motion.div
            key={`quiz-${runKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-7 overflow-hidden px-5 py-14"
          >
            <FloatingBits count={10} />
            <div className="relative z-10 flex w-full flex-col items-center gap-7">
              <QuizProgress current={qIndex + 1} total={questions.length} />
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={qIndex}
                  question={questions[qIndex]!}
                  index={qIndex}
                  onDone={() => {
                    if (qIndex + 1 < questions.length) setQIndex(qIndex + 1);
                    else setStage("transition");
                  }}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {stage === "transition" && (
          <motion.div
            key={`transition-${runKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            <MemoryTransition onContinue={() => setStage("story")} />
          </motion.div>
        )}

        {stage === "story" && (
          <motion.div
            key={`story-${runKey}`}
            ref={storyRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MemoryGallery />
            <AppreciationSection />
            <BirthdayReveal onRevealed={() => setMusicOn(true)} />
            <BirthdayLetter />
            <WishesSection />
            <FinalSurprise />
            <FinalScreen onReplay={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
