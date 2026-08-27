import confetti from "canvas-confetti";

const COLORS = ["#ffb3c7", "#ffd9a0", "#e3c6ff", "#fff1d6", "#ff8fab"];

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function celebrate() {
  if (reduced()) return;
  const end = Date.now() + 1600;
  confetti({ particleCount: 90, spread: 80, origin: { y: 0.7 }, colors: COLORS, scalar: 0.9 });
  const frame = () => {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, colors: COLORS });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, colors: COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export function popHearts() {
  if (reduced()) return;
  confetti({
    particleCount: 30,
    spread: 70,
    origin: { y: 0.6 },
    scalar: 1.4,
    colors: COLORS,
    shapes: ["circle"],
  });
}
