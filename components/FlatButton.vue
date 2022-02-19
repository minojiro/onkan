<script lang="ts" setup>
interface Props {
  type: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :type="type"
    @click="emit('click')"
    class="block border-solid border-2 text-center w-full rounded p-1 font-bold text-sm uppercase"
  >
    <slot />
  </button>
</template>
