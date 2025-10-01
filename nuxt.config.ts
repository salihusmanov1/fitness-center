// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/test-utils",
  ],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [
      tailwindcss(),

    ],
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
      },
    },
  },
});
