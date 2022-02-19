import { tones } from "../constants";

export type ToneIndex = number;

export type Quiz = {
  correct: ToneIndex[];
  userInput: ToneIndex[];
};
