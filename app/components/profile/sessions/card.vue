<template>
  <article
    class="grid grid-cols-1 sm:grid-cols-[20%_80%] border border-gray-300 min-h-[180px]"
  >
    <NuxtImg
      :src="session.trainer.avatar"
      :alt="session.trainer.name"
      class="w-full h-full object-cover"
    />
    <div class="w-full flex justify-between p-6">
      <div class="flex flex-col justify-center h-full">
        <h3 class="text-2xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-2">
          {{ session.trainer.name }}
        </h3>
        <p class="text-gray-500 mb-2">
          {{ session.trainer.specialty }}
        </p>
        <div class="flex items-center gap-2 mb-2">
          <Icon
            name="bx:calendar"
            size="16px"
          />
          <span class="text-sm font-medium">
            {{ session.date }} at {{ session.time }}
          </span>
        </div>
        <div
          class="text-base font-bold stretched-text tracking-tighter scale-y-105 italic"
          :class="getStatusColor(session.status)"
        >
          {{ session.status }}
        </div>
      </div>
      <div class="flex items-center h-full">
        <div class="flex items-center gap-2">
          <button
            v-if="session.status === 'upcoming'"
            class="btn btn-soft btn-error hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  session: {
    type: Object,
    required: true,
  },
});

const getStatusColor = (status) => {
  switch (status) {
    case "upcoming":
      return "text-accent";
    case "completed":
      return "text-success";
    case "cancelled":
      return "text-error";
    case "pending":
      return "text-warning";
    case "in-progress":
      return "text-info";
  }
};
</script>

<style lang="scss" scoped>

</style>
