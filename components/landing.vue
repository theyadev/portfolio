<template>
    <div id="home" class="background snap-start">
      <div class="cube" v-for="i in 5" />

      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-7xl font-bold uppercase text-white mb-0 text-center">FASSI THEO</h1>
        <br />
        <h1 class="text-3xl font-medium uppercase text-white mb-5 text-center">
          Développeur Web Fullstack
        </h1>
        <!-- <a href="#about" class="button"> En savoir plus </a> -->
        <a href="#about" class="scroll-down">
          <label>Scroll</label>
          <span></span>
        </a>
      </div>
    </div>
</template>