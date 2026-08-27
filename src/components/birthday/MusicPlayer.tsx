import { motion } from "motion/react";
import { Music, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { audio as audioConfig } from "@/config/birthday";

/**
 * Floating music control. Never autoplays on load — `active` is only
 * flipped on after a real user interaction (the surprise button).
 */
export function MusicPlayer({ active }: { active: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!active || !ref.current) return;
    ref.current.volume = audioConfig.volume;
    ref.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [active]);

  if (!active) return null;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={ref}
        src={audioConfig.src}
        loop
        preload="auto"
        onError={() => setMissing(true)}
      />
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        title={missing ? "Add your mp3 at public/audio/birthday-song.mp3" : undefined}
        className="glass tap fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full"
      >
        <span className={playing ? "animate-spin-slow" : ""}>
          <Music className="h-5 w-5 text-primary" />
        </span>
        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </span>
      </motion.button>
    </>
  );
}
