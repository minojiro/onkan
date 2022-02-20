<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { Quiz } from "./types";
import { useQuizGenerator } from "./composable/useQuizGenerator";
import JSConfetti from "js-confetti";

const quizList = ref<Quiz[]>([]);
const confetti = ref(null);
const answerList = ref<Boolean[]>([]);
const correctCount = computed(() => answerList.value.filter((b) => b).length);
const nextQuestion = computed(() =>
  answerList.value.findIndex((v) => v === null)
);

onMounted(() => {
  const { generateQuizList } = useQuizGenerator();
  quizList.value = generateQuizList();
  answerList.value = Array.from({ length: quizList.value.length }, () => null);
  confetti.value = new JSConfetti();
});
const inputAnswer = (i, v) => {
  answerList.value[i] = v;
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
      <meta name="description" content="perfect pitch test." />
    </Head>
    <h1 class="my-10">
      <img src="~/assets/img/logo.svg" class="mx-auto" alt="onkan" />
    </h1>
    <QuizBlock
      v-for="(quiz, i) in quizList"
      @inputAnswer="(v) => inputAnswer(i, v)"
      :key="i"
      :quiz="quiz"
      :quizNumber="i + 1"
      :isActive="nextQuestion === i"
    />
    <p class="text-center my-10 text-xl font-bold">{{ correctCount }} point</p>
    <p class="border-solid border-t border-bg-200 py-3 text-center text-sm">
      <a
        href="https://github.com/minojiro/onkan"
        target="_blank"
        class="underline"
        rel="noopener"
        >repository</a
      >
    </p>
  </div>
</template>
