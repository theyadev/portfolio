<script setup lang="ts">
interface Props {
  color?: string;
  disabled?: boolean;
  href?: string;
  blank?: boolean;
}
const { color, disabled } = defineProps<Props>();

const emit = defineEmits(["click"]);

function click(e) {
  emit("click");
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href ? href : '#'"
    :target="blank ? '_blank' : ''"
    :class="
      color === 'green'
        ? `border-green-500 text-green-500 bg-green-500`
        : `bg-white border-white text-white`
    "
    class="cursor-pointer transition-all duration-200 text-base border px-4 py-1 rounded bg-opacity-0 disabled:cursor-default hover:bg-opacity-100 hover:text-black disabled:hover:bg-opacity-0 disabled:hover:text-white disabled:pointer-events-none"
    :disabled="disabled"
    @click="click"
  >
    <slot />
  </component>
</template>
