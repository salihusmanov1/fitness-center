<template>
  <div class="p-4">
    <section class="h-[250px] text-center flex flex-col items-center gap-4 justify-end">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        ALL CLASSES
      </h1>

      <p class="sm:text-xl text-lg font-light">
        Book a Workout Class
      </p>
    </section>
    <section
      class="lg:max-w-[1200px] mx-auto flex items-center my-20 flex-col gap-16"
      aria-label="Classes listing"
    >
      <template v-if="data?.data.length === 0">
        <div
          class="w-full flex flex-col items-center justify-center gap-4"
          role="status"
          aria-live="polite"
        >
          <Icon
            name="bx:world"
            class="text-primary"
            size="48px"
            aria-hidden="true"
          />
          <p>No classes found</p>
        </div>
      </template>

      <template v-if="!!error">
        <div
          class="flex flex-col gap-8 items-center justify-center"
          role="alert"
          aria-live="assertive"
        >
          <p class="text-error">
            Failed to load classes. Please try again.
          </p>
          <button
            class="btn btn-primary btn-outline"
            :aria-label="status === 'pending' ? 'Refreshing classes' : 'Refresh classes'"
            :disabled="status === 'pending'"
            @click="refresh"
          >
            <span
              v-if="status === 'pending'"
              class="loading loading-spinner"
              aria-hidden="true"
            />
            Refresh
          </button>
        </div>
      </template>

      <template v-else>
        <div
          class="grid grid-cols-2 gap-4 relative"
          role="grid"
          aria-label="Available workout classes"
        >
          <div
            v-if="status === 'pending'"
            class="absolute inset-0 bg-white/50 z-10"
            role="status"
            aria-live="polite"
            aria-label="Loading classes"
          >
            <div class="flex items-center justify-center h-full">
              <div
                class="loading loading-bars loading-lg"
                aria-hidden="true"
              />
              <span class="sr-only">Loading classes, please wait</span>
            </div>
          </div>
          <template
            v-for="(classType, index) in data?.data"
            :key="index"
          >
            <ClassesCard
              :class-type="classType"
            />
          </template>
        </div>
      </template>

      <nav
        v-if="data?.data.length !== 0 && !error"
        class="w-full flex justify-center"
        aria-label="Classes pagination"
      >
        <UiPagination
          :total="data?.meta.total"
          :current="data?.meta.current_page"
          :last="data?.meta.last_page"
          :loading="status === 'pending'"
          @update:current="updateCurrentPage"
        />
      </nav>
    </section>
  </div>
</template>

<script setup>
const client = useSanctumClient();

const metaCurrentPage = ref(1);

const { data, status, error, refresh } = await useAsyncData("classes", () =>
  client("/api/class_types", {
    params: {
      page: metaCurrentPage.value,
      per_page: 6,
    },
  }), {
  watch: [metaCurrentPage],
});

const updateCurrentPage = (page) => {
  metaCurrentPage.value = page;
};
</script>

  <style scoped>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  </style>
