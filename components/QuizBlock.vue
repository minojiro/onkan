<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { Quiz, ToneIndex } from "../types";
import { tones } from "../constants";
import { useSoundPlayer } from "../composable/useSoundPlayer";

interface Props {
  quiz: Quiz;
  quizNumber: number;
}

const props = defineProps<Props>();

const emit = defineEmits(["inputAnswer"]);

const userInput = ref<ToneIndex[]>([]);
const isAnswerd = ref(false);

const isUserInputCorrect = computed(
  () =>
    props.quiz.correct.length === userInput.value.length &&
    userInput.value.every((keyIndex) => props.quiz.correct.includes(keyIndex))
);

const { play } = useSoundPlayer();

const playSound = () => {
  play(props.quiz.correct);
};

const submit = () => {
  if (isAnswerd.value) return;
  isAnswerd.value = true;
  emit("inputAnswer", isUserInputCorrect.value);
};

const KEY_CLASSES = [
  "col-start-1  col-span-3 row-span-2 bg-key-white",
  "col-start-3  col-span-2 bg-bg-200 bg-key-black z-10",
  "col-start-4  col-span-3 row-span-2 bg-key-white",
  "col-start-6  col-span-2 bg-bg-200 bg-key-black z-10",
  "col-start-7  col-span-3 row-span-2 bg-key-white",
  "col-start-10  col-span-3 row-span-2 bg-key-white",
  "col-start-12  col-span-2 bg-bg-200 bg-key-black z-10",
  "col-start-13  col-span-3 row-span-2 bg-key-white",
  "col-start-15  col-span-2 bg-bg-200 bg-key-black z-10",
  "col-start-16  col-span-3 row-span-2 bg-key-white",
  "col-start-18  col-span-2 bg-bg-200 bg-key-black z-10",
  "col-start-19  col-span-3 row-span-2 bg-key-white",
];

onMounted(() => {
  props.quiz.correct;
});

const userAnswer = computed(() => {
  if (isAnswerd.value) {
    return userInput.value.map((i) => tones[i].name).join(", ");
  }
  return "?";
});
</script>

<template>
  <div class="bg-bg-200 my-5 px-3 pt-7 pb-10 rounded-sm">
    <h2 class="text-center mb-5 text-xl font-bold">No. {{ quizNumber }}</h2>
    <p class="text-center mb-5 text-4xl font-bold uppercase">
      {{ userAnswer }}
    </p>
    <form @submit.prevent="submit" class="block">
      <p class="w-40 mx-auto">
        <FlatButton type="button" @click="playSound">play</FlatButton>
      </p>
      <ul class="grid grid-cols-keys grid-rows-2 h-40 gap-1 my-10">
        <li
          v-for="(tone, i) in tones"
          :key="tone.number"
          :class="`row-start-1 ${KEY_CLASSES[i]} block rounded-b-sm overflow-hidden`"
        >
          <label class="block h-full"
            ><input
              :disabled="isAnswerd"
              type="checkbox"
              v-model="userInput"
              :value="tone.id"
              v-show="false"
            />
            <div
              class="h-full text-center cursor-pointer"
              :class="{ 'bg-key-selected': userInput.includes(tone.id) }"
            >
              {{
                isAnswerd ? (quiz.correct.includes(tone.id) ? "O" : "X") : ""
              }}
            </div></label
          >
        </li>
      </ul>

      <div class="text-center font-bold">
        <p v-if="userInput.length === 0">select keys</p>
        <p v-else-if="isAnswerd">
          {{ isUserInputCorrect ? "Collect!" : "wrong..." }}
        </p>
        <p v-else class="w-40 mx-auto">
          <FlatButton fill :disabled="isAnswerd" type="submit">OK</FlatButton>
        </p>
      </div>
    </form>
  </div>
</template>
