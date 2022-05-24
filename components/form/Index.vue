<script setup lang="ts">
const emit = defineEmits(["submit"]);

function submit() {
  emit("submit");
}
</script>

<template>
  <form
    class="mt-4 w-5/6 md:w-3/6 mx-auto flex flex-col gap-y-4"
    @submit.prevent="submit"
  >
    <slot />
  </form>
</template>
