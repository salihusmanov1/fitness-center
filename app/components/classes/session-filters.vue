<template>
  <div class="w-full flex justify-end">
    <div class="grid grid-cols-[40px_1fr] sm:grid-cols-[1fr_300px_250px] items-center gap-2 w-full">
      <div class="flex items-center justify-end row-span-2 lg:row-span-1">
        <Icon
          name="bx:filter"
          aria-hidden="true"
          size="24px"
        />
      </div>
      <div class="w-full">
        <UiDatepicker
          v-model="filters.date"
          placeholder="Find by date"
        />
      </div>

      <div class="w-full">
        <select
          v-model="filters.time"
          class="select bg-base-300 focus:outline-none w-full text-gray-500"
          placeholder="Find by time"
        >
          <option
            value=""
          >
            Any Time
          </option>
          <option value="morning">
            Morning (6:00 - 11:59)
          </option>
          <option value="afternoon">
            Afternoon (12:00 - 17:59)
          </option>
          <option value="evening">
            Evening (18:00 - 20:00)
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
const filters = defineModel("filters", {
  type: Object,
  default: () => ({
    date: "",
    time: "",
  }),
});
</script>

<style scoped>

</style>
