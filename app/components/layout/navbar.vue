<template>
  <nav
    class="fixed top-0 z-50 navbar justify-between p-0 h-20 bg-base-300 lg:mt-0 mt-16"
    aria-label="Main navigation"
  >
    <div class="w-[20%] h-full lg:flex hidden">
      <NuxtImg
        src="/NVCLUB-logo.png"
        alt="Logo"
        class="w-full h-full object-contain"
      />
    </div>
    <div class="lg:inline-flex items-center justify-center w-[50%] hidden">
      <ul class="flex items-center justify-center gap-8 px-4 w-full">
        <li
          v-for="(list, index) in navList"
          :key="index"
          class="font-semibold text-lg stretched-text scale-y-105 hover:text-primary cursor-pointer transition-all duration-200"
        >
          <NuxtLink
            :to="list.to"
            exact-active-class="text-primary"
            active-class="text-primary"
          >{{ list.label }}</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="inline-flex h-full w-full lg:w-[auto]">
      <div class="px-6 hidden lg:flex">
        <NuxtLink
          :to="isAuthenticated ? '/profile' : '/login'"
          class="group text-primary flex items-center gap-2 cursor-pointer"
          aria-label="Log in"
        >
          <Icon
            aria-hidden="true"
            name="tdesign:user-circle-filled"
            size="32px"
          />
          <span class="group-hover:opacity-80">{{ isAuthenticated ? "Profile" : "Log In" }}</span>
        </NuxtLink>
      </div>
      <div class="flex gap-8 bg-primary h-full justify-center items-center px-12 w-full lg:w-auto">
        <button
          v-for="(icon, idx) in socialIcons"
          :key="idx"
          class="cursor-pointer flex items-center"
          :aria-label="`Visit our ${icon.label}`"
        >
          <Icon
            :name="icon.name"
            class="text-white"
            :size="icon.size"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="lg:hidden px-4 flex items-center text-primary">
        <button
          class="flex items-center"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobile-sidebar"
          @click="isSidebarOpen = true"
        >
          <Icon
            aria-hidden="true"
            name="mdi:hamburger-menu"
            size="28px"
          />
        </button>
      </div>
    </div>
  </nav>

  <Transition name="fade">
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="isSidebarOpen = false"
    />
  </Transition>

  <div
    id="mobile-sidebar"
    role="dialog"
    aria-modal="true"
    class="fixed top-0 right-0 h-full w-[70%] bg-white shadow-lg z-70 transform transition-transform duration-300"
    :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div
      class="flex flex-col items-end text-2xl px-8 space-y-8"
    >
      <button
        class="h-20 text-primary flex items-center"
        aria-label="Close menu"
        @click="isSidebarOpen=false"
      >
        <svg
          v-if="isSidebarOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"
        ><animate
          fill="freeze"
          attributeName="d"
          dur="0.58s"
          values="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19;M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"
        /></path></svg>
      </button>
      <NuxtLink
        :to="isAuthenticated ? '/profile' : '/login'"
        class="text-primary flex items-center gap-2 cursor-pointer"
        aria-label="Log In"
      >
        <Icon
          name="tdesign:user-circle-filled"
          size="24px"
          aria-hidden="true"
        />
        <span class="text-base">{{ isAuthenticated ? "Profile" : "Log In" }}</span>
      </NuxtLink>

      <ul class="flex flex-col gap-4 text-end">
        <li
          v-for="(list, index) in navList"
          :key="index"
          class="font-semibold text-primary text-xl stretched-text scale-y-105 transition"
          @click="isSidebarOpen = false"
        >
          <NuxtLink :to="list.to">{{ list.label }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { isAuthenticated } = useSanctumAuth();
const isSidebarOpen = ref(false);
const navList = [
  {
    label: "HOME",
    to: "/",
  },
  {
    label: "CLASSES",
    to: "/classes",
  },
  {
    label: "PRIVATE TRAINING",
    to: "/private-training",
  },
  {
    label: "PLANS & PRICING",
    to: "/plans",
  },
  {
    label: "ABOUT",
    to: "/about",
  },
  {
    label: "CONTACT",
    to: "/contact",
  },
];

const socialIcons = [
  { label: "Youtube", name: "mdi:youtube", size: 24 },
  { label: "Instagram", name: "mdi:instagram", size: 24 },
  { label: "Facebook", name: "mdi:facebook", size: 24 },
  { label: "X", name: "ri:twitter-x-fill", size: 24 },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
