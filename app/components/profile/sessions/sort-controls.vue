<template>
  <div class="flex justify-end items-center gap-2">
    <Icon
      name="bx:sort"
      size="20px"
      class="text-base-content/70"
    />

    <select
      v-model="sortByDate"
      class="select select-bordered select-sm w-48 bg-base-300"
      @change="sortSessions"
    >
      <option value="date-desc">
        Latest First
      </option>
      <option value="date-asc">
        Oldest First
      </option>
    </select>

    <select
      v-model="sortByStatus"
      class="select select-bordered select-sm w-48 bg-base-300"
      @change="sortSessions"
    >
      <option value="all">
        All
      </option>
      <option value="upcoming">
        Upcoming
      </option>
      <option value="completed">
        Completed
      </option>
      <option value="cancelled">
        Cancelled
      </option>
      <option value="pending">
        Pending
      </option>
      <option value="in-progress">
        In Progress
      </option>
    </select>
  </div>
</template>

<script setup>
const sortByDate = defineModel("sortByDate", {
  type: String,
  default: "date-desc",
});

const sortByStatus = defineModel("sortByStatus", {
  type: String,
  default: "all",
});
</script>

<style lang="scss" scoped>

</style>
