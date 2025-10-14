import { storeToRefs } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);

  nuxtApp.hook("sanctum:response", (nuxtApp, ctx, logger) => {
    if (ctx.response?.url.includes("/api/login") && ctx.response.ok) {
      const resToken = ctx.response?._data.token;
      if (resToken) {
        token.value = resToken;
      }
    }
  });

  nuxtApp.hook("sanctum:request", (nuxtApp, ctx, logger) => {
    if (token.value) {
      ctx.options.headers.set("Authorization", `Bearer ${token.value}`);
    }
  });

  //   nuxtApp.hook("sanctum:error:response", ({ response }) => {
  //     if (response?.status === 401 && token.value) {
  //       authStore.navigateOnExpiredSession();
  //     }
  //   });

//   nuxtApp.hook("sanctum:logout", () => {
//     cartStore.removeItem();
//   });
});
