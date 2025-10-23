<template>
  <NuxtLoadingIndicator color="#055b4a" />
  <NuxtLayout>
    <NuxtPage />
    <UiToast />
  </NuxtLayout>
</template>

<script setup>
import UiToast from "@/components/ui/toast.vue";
</script>
