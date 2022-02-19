const getFreqById = (step: number) => {
  const A_FREQ = 440;
  return 2 ** ((step + 3) / 12) * A_FREQ;
};

export const tones: {
  id: number;
  name: string;
  isBlack: boolean;
  freq: number;
}[] = [
  { id: 0, name: "c", isBlack: false, freq: getFreqById(0) },
  { id: 1, name: "c#", isBlack: true, freq: getFreqById(1) },
  { id: 2, name: "d", isBlack: false, freq: getFreqById(2) },
  { id: 3, name: "d#", isBlack: true, freq: getFreqById(3) },
  { id: 4, name: "e", isBlack: false, freq: getFreqById(4) },
  { id: 5, name: "f", isBlack: false, freq: getFreqById(5) },
  { id: 6, name: "f#", isBlack: true, freq: getFreqById(6) },
  { id: 7, name: "g", isBlack: false, freq: getFreqById(7) },
  { id: 8, name: "g#", isBlack: true, freq: getFreqById(8) },
  { id: 9, name: "a", isBlack: false, freq: getFreqById(9) },
  { id: 10, name: "a#", isBlack: true, freq: getFreqById(10) },
  { id: 11, name: "b", isBlack: false, freq: getFreqById(11) },
];
