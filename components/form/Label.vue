<script setup lang="ts">
type Props = {
  value: string;
};
const props = defineProps<Props>();
</script>

<template>
  <label
    for="name"
    class="absolute top-0 font-semibold transition-all duration-500 peer-focus:-translate-y-8 peer-focus:ml-0 peer-focus:text-white"
    :class="value.length > 0 ? 'text-white -translate-y-8 ml-0' : 'text-gray-500 ml-4 translate-y-2'"
  >
    <slot />
  </label>
</template>
