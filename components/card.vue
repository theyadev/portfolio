<script setup lang="ts">
type Props = {
  title: string;
  subtitle: string;
};
const props = defineProps<Props>();
</script>

<template>
  <div class="bg-zinc-800 px-4 py-2 shadow-sm rounded">
    <h5 class="text-xl font-semibold">{{ title }}</h5>
    <p>{{ subtitle }}</p>
    <p>
      <slot />
    </p>
  </div>
</template>
