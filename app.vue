<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { Quiz } from "./types";
import { useQuizGenerator } from "./composable/useQuizGenerator";
import JSConfetti from "js-confetti";

//@ts-ignore
import ogp from "./assets/img/ogp.png";

useMeta({
  title: "ONKAN - the perfect pitch test.",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: "perfect pitch test.",
    },
    { hid: "og:site_name", property: "og:site_name", content: "ONKAN" },
    { hid: "og:type", property: "og:type", content: "website" },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://onkan.vercel.app/",
    },
    { hid: "og:title", property: "og:title", content: "ONKAN" },
    {
      hid: "og:description",
      property: "og:description",
      content: "perfect pitch test.",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: ogp,
    },
    { name: "twitter:card", content: "summary" },
  ],
});

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
