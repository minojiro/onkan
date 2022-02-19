import { Quiz } from "../types";
import { tones } from "../constants";

const generateQuiz = (toneLength: number, hasSharp: boolean): Quiz => {
  const correct = tones
    .filter((tone) => hasSharp || !tone.isBlack)
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, toneLength)
    .map((tone) => tone.id);
  return {
    correct,
    userInput: [],
  };
};

export const useQuizGenerator = () => {
  const generateQuizList = (): Quiz[] => [
    ...Array.from({ length: 3 }, () => generateQuiz(1, false)),
    ...Array.from({ length: 2 }, () => generateQuiz(1, true)),
    ...Array.from({ length: 1 }, () => generateQuiz(3, false)),
    ...Array.from({ length: 1 }, () => generateQuiz(3, true)),
  ];
  return { generateQuizList };
};
