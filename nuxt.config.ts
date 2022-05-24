import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        googleUser: "",
        googlePass: "",
        email: ""
    },
    css: [
        '~/assets/css/tailwind.css',
    ],
    build: {
      postcss: {
        postcssOptions: {
            plugins: {
              tailwindcss: {},
              autoprefixer: {},
            },
          }
          ,
      },
    }
})
