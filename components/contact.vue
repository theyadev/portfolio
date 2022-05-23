<script setup lang="ts">
const name = ref<string>('')
const email = ref<string>('')
const message = ref<string>('')
const isLoading = ref(false)
const isValid = ref(false)
const isError = ref(false)

</script>

<template>
  <div class="tab" id="contact">
    <Curve />
    <div class="title mx-auto">Contact</div>
    <h1 class="header">Me Contacter</h1>
    <div class="flex mt-10">
      <div class="mx-auto flex gap-x-4">
        <a href="https://github.com/theyadev" target="_blank"
          ><SvgGithubIcon class="h-12 w-12"
        /></a>
        <a href="mailto:fassitheo@protonmail.com" target="_blank"
          ><SvgEnvelope class="h-12 w-12"
        /></a>
        <a
          href="https://www.linkedin.com/in/th%C3%A9o-fassi-787853223/"
          target="_blank"
          ><SvgLinkedin class="h-12 w-12 rounded"
        /></a>
      </div>
    </div>
    <form class="mt-4 w-3/6 mx-auto flex flex-col gap-y-4">
      <div class="grid grid-cols-2 gap-x-10">
        <div class="flex flex-col">
          <label for="name">Nom</label>
          <input class="input" placeholder="Votre Nom" type="text" id="name" name="name" v-model="name" />
        </div>
        <div class="flex flex-col">
          <label for="email">Email</label>
          <input class="input" placeholder="Votre Email" type="email" id="email" name="email" v-model="email" />
        </div>
      </div>
      <div class="flex flex-col">
        <label for="content">Message</label>
        <textarea
          class="resize-none w-full input"
          name="content"
          id="content"
          placeholder="Votre Message"
          v-model="message"
        />
      </div>
      <button class="mr-auto button">Envoyer</button>
    </form>
  </div>
</template>
