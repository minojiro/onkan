<script lang="ts" setup>
interface Props {
  type: string;
  fill: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :type="type"
    @click="emit('click')"
    :class="`block border-solid border-2 text-center w-full rounded p-2 font-bold text-sm uppercase ${
      fill ? 'bg-primary text-bg-100' : ''
    }`"
  >
    <slot />
  </button>
</template>
