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
    props.quiz.correct.length === props.quiz.correct.length &&
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

onMounted(() => {
  props.quiz.correct;
});
</script>

<template>
  <form @submit.prevent="submit">
    <h2>quiz{{ quizNumber }}</h2>
    <p>
      <button type="button" @click="playSound">play</button>
    </p>
    <ul>
      <li v-for="tone in tones" :key="tone.number">
        <label
          ><input
            :disabled="isAnswerd"
            type="checkbox"
            v-model="userInput"
            :value="tone.id"
          />{{ tone.name
          }}{{
            isAnswerd ? (quiz.correct.includes(tone.id) ? "O" : "X") : ""
          }}</label
        >
      </li>
    </ul>
    <div v-if="isAnswerd">
      {{ isUserInputCorrect ? "O" : "X" }}
    </div>
    <div v-else>
      <button :disabled="isAnswerd" type="submit">OK</button>
    </div>
  </form>
</template>
