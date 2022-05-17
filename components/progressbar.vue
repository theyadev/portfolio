<script setup lang="ts">
const { n } = defineProps<{
  n: number;
}>();

function getColor(number: number) {
  switch (number) {
    case 1:
    case 2:
      return "bg-orange-500";
    case 3:
    case 4:
    case 5:
    case 6:
      return "bg-yellow-500";
    case 7:
    case 8:
      return "bg-blue-500";
    case 9:
    case 10:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}
</script>

<template>
  <div class="w-full rounded-full h-2.5 bg-gray-700">
    <div
      class="h-2.5 rounded-full"
      :class="getColor(n)"
      :style="{ width: n * 10 + '%' }"
    />
  </div>
</template>
