<template>
  <div>
    <div class="w-full max-w-[1000px] mx-auto space-y-12 py-8 h-full">
      <button
        class="btn btn-ghost btn-md"
        @click="navigateTo(`/session/${id}`)"
      >
        <Icon name="bx:arrow-back" />
        Back
      </button>
      <div class="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10 p-4 h-full">
        <BookingClientForm />
        <BookingDetails :session-details="sessionDetails" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { date, time } = route.query;
const { id } = route.params;

const { data: session } = await useFetch(`/api/session/${id}`);

const sessionDetails = computed(() => ({
  ...session.value,
  date,
  time,
}));
</script>

<style lang="scss" scoped>

</style>
