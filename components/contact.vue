<script setup lang="ts">
import emailjs from "@emailjs/browser";
const count = ref<number>(0);
const name = ref<string>("");
const email = ref<string>("");
const message = ref<string>("");

const isLoading = ref(false);

let isValidTimeout: NodeJS.Timeout;
const isValid = ref(false);

let isErrorTimeout: NodeJS.Timeout;
const isError = ref(false);

const runtimeConfig = useRuntimeConfig();

async function handleForm() {
  count.value++;

  clearTimeout(isValidTimeout);
  clearTimeout(isErrorTimeout);

  isLoading.value = true;
  isValid.value = false;
  isError.value = false;

  try {
    if (count.value > 5) throw new Error("Too many requests");

    const templateParams = {
      from_name: name.value,
      message: message.value,
      reply_to: email.value,
    };

    const res = await emailjs.send(
      runtimeConfig.public.emailjsServiceId,
      runtimeConfig.public.emailjsTemplateId,
      templateParams,
      runtimeConfig.public.emailjsPublicKey
    );

    if (res.status != 200) throw new Error("Email not send")
    
    isLoading.value = false;
    isValid.value = true;

    isValidTimeout = setTimeout(() => {
      isValid.value = false;
    }, 5000);

    name.value = "";
    email.value = "";
    message.value = "";
  } catch (error) {
    isLoading.value = false;
    isError.value = true;

    isErrorTimeout = setTimeout(() => {
      isError.value = false;
    }, 5000);
  }
}
</script>

<template>
  <Tab id="contact" title="Contact" header="Me Contacter">
    <div class="flex mt-10">
      <div class="mx-auto flex gap-x-4">
        <a href="https://github.com/theyadev" target="_blank" aria-label="Github">
          <SvgGithubIcon class="h-12 w-12"
        /></a>
        <a href="mailto:fassitheo@protonmail.com" target="_blank" aria-label="Email">
          <SvgEnvelope class="h-12 w-12"
        /></a>
        <a
          href="https://www.linkedin.com/in/th%C3%A9o-fassi-787853223/"
          target="_blank" aria-label="Linkedin"
          ><SvgLinkedin class="h-12 w-12 rounded"
        /></a>
      </div>
    </div>
    <Form @submit="handleForm">
      <div class="grid grid-cols-2 gap-x-10">
        <FormInputContainer>
          <FormInput
            name="name"
            placeholder=""
            type="text"
            :value="name"
            :disabled="isLoading"
            required
            @update="(value) => (name = value)"
          />
          <FormLabel for="name" :value="name">Nom</FormLabel>
        </FormInputContainer>
        <FormInputContainer>
          <FormInput
          name="email"
            placeholder=""
            type="email"
            :value="email"
            :disabled="isLoading"
            required
            @update="(value) => (email = value)"
          />
          <FormLabel for="email" :value="email">Email</FormLabel>
        </FormInputContainer>
      </div>
      <FormInputContainer>
        <textarea
          class="resize-none w-full focus-visible:outline-none bg-white px-4 py-2 text-black rounded disabled:cursor-default disabled:pointer-events-none disabled:text-gray-500 peer focus:h-20 transition-all duration-500 peer"
          :class="message.length > 0 ? 'h-20' : 'h-10'"
          name="content"
          id="content"
          placeholder=""
          v-model="message"
          required
          :disabled="isLoading"
        />
        <FormLabel for="content" :value="message">Message</FormLabel>
      </FormInputContainer>
      <Button class="mr-auto" :disabled="isLoading">Envoyer</Button>
      <span
        class="transition-all duration-200 absolute -bottom-4"
        :class="
          !isLoading
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        "
        >Envoie en cours...</span
      >
      <span
        class="transition-all duration-200 absolute -bottom-4 text-green-500"
        :class="
          !isValid
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        "
        >Message envoyé !</span
      >
      <span
        class="transition-all duration-200 absolute -bottom-4 text-red-500"
        :class="
          !isError
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        "
        >Le message n'a pas été envoyé !</span
      >
    </Form>
  </Tab>
</template>
