<script setup lang="ts">

interface Props {
    id: string;
    title: string;
    header: string;
    hideCurve?: boolean;
}

const { title, header, id, hideCurve } = defineProps<Props>();
</script>

<template>
  <div class="group snap-start scroll-mt-16 md:scroll-mt-[4.2rem] flex flex-col py-4 md:px-32 px-8 relative even:bg-zinc-800/10 pt-8" :id="id">
    <Curve v-if="hideCurve === false" />
    <div class="bg-green-500 px-5 py-1 text-black mx-auto">{{title}}</div>
    <h1 class="text-4xl font-semibold mx-auto mt-2 text-center">{{header}}</h1>
    <slot />
  </div>
</template>
