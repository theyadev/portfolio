<script setup lang="ts">
interface Props {
  color?: string;
  disabled?: boolean;
  href?: string;
  blank?: boolean;
}
const { color, disabled } = defineProps<Props>();

defineEmits(["click"]);
</script>

<template>
  <a
  :href="href ? href : '#'"
  @click="$emit('click')"
  :target="blank ? '_blank' : ''"
    :class="
      color === 'green'
        ? `border-green-500 text-green-500 bg-green-500`
        : `bg-white border-white text-white`
    "
    class="px-4 py-1 text-base transition-all duration-200 bg-opacity-0 border rounded cursor-pointer disabled:cursor-default hover:bg-opacity-100 hover:text-black disabled:hover:bg-opacity-0 disabled:hover:text-white disabled:pointer-events-none"
    :disabled="disabled"
  >
    <slot />
  </a>
</template>
