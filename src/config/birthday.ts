/**
 * ✨ PERSONALIZE EVERYTHING HERE ✨
 * You never need to touch the components — just edit this file.
 * Replace photos in /public/images/ and the song in /public/audio/.
 */

export const friend = {
  name: "Aanya",
  /** Shown on the very last screen */
  signature: "— your favorite chaos partner",
};

export const audio = {
  /** Drop your own mp3 at public/audio/birthday-song.mp3 */
  src: "/audio/birthday-song.mp3",
  volume: 0.45,
};

export const welcomeLines = [
  "Hey you 👀",
  "I made something for you...",
  "But first... I need to confirm something 🤨",
];

export const welcomeCta = "Okay, I'm listening 👀";

export type Answer = {
  label: string;
  /** Reaction shown after tapping */
  reaction: string;
  /** If true, the question is not cleared — a new button appears instead */
  retry?: boolean;
  /** Replacement button label when retry is true */
  retryLabel?: string;
};

export type Question = {
  prompt: string;
  /** Optional second line revealed ~1s later */
  delayedPrompt?: string;
  answers: Answer[];
};

export const questions: Question[] = [
  {
    prompt: "First things first... are you actually ready for your birthday surprise? 🎁",
    answers: [
      { label: "YESSS 😍", reaction: "That's the energy I wanted 🥳" },
      { label: "Maybe... 👀", reaction: "Wrong answer 😂", retry: true, retryLabel: "Fine, YES 😭" },
    ],
  },
  {
    prompt: "Who is the most amazing person today? 🤔",
    answers: [
      { label: "Obviously me 😌", reaction: "Correct. Confidence level: 100 😂❤️" },
      { label: "Still me 😂", reaction: "Correct. Confidence level: 100 😂❤️" },
      { label: "Why are all the options me? 😭", reaction: "Correct. Confidence level: 100 😂❤️" },
    ],
  },
  {
    prompt: "How much cake are you planning to eat today? 🎂",
    answers: [
      {
        label: "One slice 😇",
        reaction: "I don't believe you. Try again 😂",
        retry: true,
        retryLabel: "Okay fine, three slices 🍰",
      },
      { label: "A reasonable amount 👀", reaction: "Define 'reasonable'... 😂" },
      { label: "The whole cake. Don't judge me.", reaction: "Respect. Absolute legend 🫡" },
    ],
  },
  {
    prompt: "Important question... how old are you now? 👀",
    answers: [
      { label: "Still 18 😌", reaction: "Good answer. Your secret is safe with me 🤝😂" },
      { label: "Age is just a number", reaction: "Good answer. Your secret is safe with me 🤝😂" },
      { label: "We don't discuss that 💀", reaction: "Good answer. Your secret is safe with me 🤝😂" },
    ],
  },
  {
    prompt: "Okay... last question.",
    delayedPrompt: "Do you know how special you are? ❤️",
    answers: [
      { label: "Yes 😌", reaction: "Then maybe this next part will remind you. ❤️" },
      { label: "Maybe 🥺", reaction: "Then maybe this next part will remind you. ❤️" },
      { label: "Not really", reaction: "Then maybe this next part will remind you. ❤️" },
    ],
  },
];

export const memoryIntroLines = [
  "Okay, enough nonsense 😂",
  "Birthdays aren't just about getting older...",
  "They're also about the memories we somehow collected along the way. ❤️",
  "So here's a tiny trip down memory lane...",
];

export const memoryIntroCta = "Show me 📸";

export type Memory = { src: string; caption: string; alt: string };

/** Replace these files in /public/images/ — keep the same names and it just works. */
export const memories: Memory[] = [
  { src: "/images/memory-1.jpg", caption: "One of my favorite memories 😂", alt: "Memory one" },
  { src: "/images/memory-2.jpg", caption: "Still can't believe this happened 💀", alt: "Memory two" },
  { src: "/images/memory-3.jpg", caption: "Certified chaos.", alt: "Memory three" },
  { src: "/images/memory-4.jpg", caption: "Okay this one is actually cute ❤️", alt: "Memory four" },
  { src: "/images/memory-5.jpg", caption: "Core memory unlocked 🔓", alt: "Memory five" },
  { src: "/images/memory-6.jpg", caption: "No context needed 😭", alt: "Memory six" },
];

export const appreciation = {
  intro: ["Since it's your birthday...", "I guess I can be nice for 30 seconds. 🙄❤️"],
  items: [
    "Your ability to make normal situations unnecessarily funny 😂",
    "The way you somehow make boring days better.",
    "Your kindness, even when you pretend you don't care.",
    "All the random conversations that somehow became memories.",
    "And most importantly...",
    "Just being you. ❤️",
  ],
};

export const reveal = {
  lines: ["Okay...", "I think you've waited long enough."],
  cta: "Tap for your surprise 🎁",
  heading: "🎉 HAPPY BIRTHDAY! 🎂❤️",
  subheading: "To one of my favorite humans.",
};

export const letter = {
  heading: "A little note for you 💌",
  body: `Happy Birthday! ❤️

I don't know if I say this enough, but I'm genuinely grateful for all the random conversations, stupid jokes, memories, and moments we've shared.

I hope this year brings you more happiness, more adventures, more success, and significantly fewer questionable decisions 😂

Never stop being the weird, amazing person you are.

You deserve a really beautiful year ahead.

Happy Birthday once again! 🎂❤️`,
};

export const wishes = [
  "May your happiness increase 📈",
  "May your stress decrease 📉",
  "May your bank balance finally cooperate 💰😂",
  "May your dreams get closer ✨",
  "May your food always arrive early 🍕",
  "And may you always have people around who genuinely care about you. ❤️",
];

export const finalSurprise = {
  teaser: ["Wait...", "There's one last thing."],
  cta: "Click me 👀",
  lines: ["Thank you for existing. ❤️", "Now go eat some cake 🎂", "Happy Birthday once again! 🥳"],
};

export const finalScreen = {
  credit: "Made with ❤️, questionable coding decisions, and a lot of effort.",
  replay: "Replay the chaos ↻",
};
