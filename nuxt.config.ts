// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/test-utils",
    "nuxt-auth-sanctum",
  ],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  devServer: {
    host: "172.18.0.56",
    port: 4000,
  },

  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
      },
    },
  },
  sanctum: {
    baseUrl: "/proxy",
    serverProxy: {
      enabled: true,
      route: "/proxy",
      baseUrl: process.env.NUXT_API_BASE || "http://localhost:8000",
    },
    mode: "cookie",
    userStateKey: "sanctum.user.identity",
    redirectIfAuthenticated: false,
    redirectIfUnauthenticated: false,
    endpoints: {
      csrf: "/sanctum/csrf-cookie",
      login: "/login",
      logout: "/logout",
      user: "/api/user",
    },
    csrf: {
      cookie: "XSRF-TOKEN",
      header: "X-XSRF-TOKEN",
    },
    client: {
      retry: false,
      initialRequest: true,
    },
    redirect: {
      keepRequestedRoute: false,
      onLogin: "/",
      onLogout: "/",
      onAuthOnly: "/login",
      onGuestOnly: "/",
    },
    globalMiddleware: {
      enabled: false,
      allow404WithoutAuth: true,
    },
    logLevel: 3,
    appendPlugin: false,
  },
});
