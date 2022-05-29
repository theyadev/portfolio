import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  runtimeConfig: {
    public: {
      emailjsServiceId: "",
      emailjsTemplateId: "",
      emailjsPublicKey: "",
      supabaseUrl: "",
      supabaseAnonKey: "",

    },
  },
  css: ["~/assets/css/tailwind.css"],
  build: {
    transpile: ["@emailjs/browser"],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
