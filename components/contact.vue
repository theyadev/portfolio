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
      <div class="flex mx-auto gap-x-4">
        <a href="https://github.com/theyadev" target="_blank" aria-label="Github">
          <SvgGithubIcon class="w-12 h-12"
        /></a>
        <a href="mailto:fassitheo@protonmail.com" target="_blank" aria-label="Email">
          <SvgEnvelope class="w-12 h-12"
        /></a>
        <a
          href="https://www.linkedin.com/in/th%C3%A9o-fassi-787853223/"
          target="_blank" aria-label="Linkedin"
          ><SvgLinkedin class="w-12 h-12 rounded"
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
          class="w-full px-4 py-2 text-black transition-all duration-500 bg-white rounded resize-none focus-visible:outline-none disabled:cursor-default disabled:pointer-events-none disabled:text-gray-500 peer focus:h-20"
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
      <Button @click="handleForm" class="mr-auto" :disabled="isLoading">Envoyer</Button>
      <span
        class="absolute transition-all duration-200 -bottom-4"
        :class="
          !isLoading
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        "
        >Envoie en cours...</span
      >
      <span
        class="absolute text-green-500 transition-all duration-200 -bottom-4"
        :class="
          !isValid
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        "
        >Message envoyé !</span
      >
      <span
        class="absolute text-red-500 transition-all duration-200 -bottom-4"
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
