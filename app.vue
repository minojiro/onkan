<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted, defineEmits } from "vue";
import { Quiz } from "./types";
import { useQuizGenerator } from "./composable/useQuizGenerator";

const quizList = ref<Quiz[]>([]);
const correctCount = ref(0);

onMounted(() => {
  const { generateQuizList } = useQuizGenerator();
  quizList.value = generateQuizList();
});
const inputAnswer = (v) => (correctCount.value += v ? 1 : 0);
</script>

<template>
  <div>
    <h1>quiz</h1>
    <QuizBlock
      v-for="(quiz, i) in quizList"
      @inputAnswer="inputAnswer"
      :key="i"
      :quiz="quiz"
      :quizNumber="i + 1"
    />
    {{ correctCount }}
  </div>
</template>
