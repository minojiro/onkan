import { tones } from "../constants";
import { ToneIndex } from "../types";

export const useSoundPlayer = () => {
  const play = (toneIds: ToneIndex[]) => {
    const ctx = new AudioContext();
    toneIds.forEach((id) => {
      const oscillatorNode = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillatorNode.type = "sine";
      oscillatorNode.frequency.value = tones[id].freq;
      gainNode.gain.value = 0.1;
      oscillatorNode.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillatorNode.start();
      oscillatorNode.stop(ctx.currentTime + 0.5);
    });
  };
  return { play };
};
