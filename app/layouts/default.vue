<template>
  <div
    data-theme="main"
    class="bg-base-300"
  >
    <LayoutHeader />
    <LayoutNavbar />
    <main class="lg:mt-20 mt-36 min-h-screen">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
