<template>
  <header class="sticky top-0 z-10 h-20 backdrop-blur-xl bg-base-300/60 shadow-sm">
    <div class=" p-4 flex items-center justify-between h-full">
      <nav class="flex items-center gap-4 lg:gap-6">
        <div class="w-[20%] h-full flex items-center justify-center">
          <NuxtLink to="/">
            <NuxtImg
              src="/NVCLUB-logo.png"
              alt="Logo"
              class="w-full object-contain"
            />
          </NuxtLink>
        </div>
        <NuxtLink
          v-for="(item, index) in navItems"
          :key="index"
          class="text-sm sm:text-xl stretched-text scale-y-105 font-medium text-base-content/70 hover:text-primary transition-colors flex items-center gap-2"
          :to="item.to"
          exact-active-class="text-primary"
          active-class="text-primary"
        >

          <span class="hidden sm:inline">{{ item.label }}</span>
          <span class="sm:hidden">{{ item.shortLabel || item.label.split(' ')[0] }}</span>
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-4">
          <Icon
            name="bx:user"
            size="24px"
            aria-hidden="true"
          />
          <div class="flex flex-col">
            <div class="text-sm font-medium">
              {{ user.name }} {{ user.surname }}
            </div>
            <div class="text-sm text-base-content/70">
              {{ user.email }}
            </div>
          </div>
        </div>
        <button
          :disabled="loading"
          class="stretched-text scale-y-105 font-semibold cursor-pointer text-sm sm:text-xl hover:underline"
          @click="logout"
        >
          <span
            v-if="loading"
            class="loading loading-spinner loading-sm"
          />
          <div
            v-else
            class="flex items-center gap-2"
          >
            <Icon
              name="bx:exit"
              size="24px"
              aria-hidden="true"
            />
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const { logout, loading } = useAuthStore();
const { user } = useSanctumAuth();

const navItems = [
  { to: "/profile", label: "My Sessions", shortLabel: "Sessions", icon: "bx:calendar" },
  { to: "/profile/plans", label: "My Plans", shortLabel: "Plans", icon: "bx:file" },
  { to: "/profile/progress", label: "Progress", shortLabel: "Progress", icon: "bx:line-chart" },
  { to: "/profile/payments", label: "Payments", shortLabel: "Payments", icon: "bx:credit-card" },
  { to: "/profile/settings", label: "Settings", shortLabel: "Settings", icon: "bx:cog" },
];
</script>
