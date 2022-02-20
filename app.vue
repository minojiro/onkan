<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { Quiz } from "./types";
import { useQuizGenerator } from "./composable/useQuizGenerator";
import JSConfetti from "js-confetti";

const quizList = ref<Quiz[]>([]);
const confetti = ref(null);
const correctCount = ref(0);

onMounted(() => {
  const { generateQuizList } = useQuizGenerator();
  quizList.value = generateQuizList();
  confetti.value = new JSConfetti();
});
const inputAnswer = (v) => {
  correctCount.value += v ? 1 : 0;
  if (v) {
    confetti.value.addConfetti({
      confettiRadius: 2,
      confettiColors: ["#E0AD7B"],
    });
  }
};
</script>

<template>
  <div class="mx-auto max-w-2xl px-2">
    <Head>
      <Title>ONKAN - the perfect pitch test.</Title>
    </Head>
    <h1 class="my-10">
      <img src="~/assets/img/logo.svg" class="mx-auto" alt="onkan" />
    </h1>
    <QuizBlock
      v-for="(quiz, i) in quizList"
      @inputAnswer="inputAnswer"
      :key="i"
      :quiz="quiz"
      :quizNumber="i + 1"
    />
    <p class="text-center my-10 text-xl font-bold">{{ correctCount }} point</p>
  </div>
</template>
