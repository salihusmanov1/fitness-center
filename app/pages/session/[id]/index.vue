<template>
  <div class="w-full min-h-[1000px] h-full p-4">
    <div class="w-full max-w-[1000px] mx-auto space-y-8 py-8 h-full">
      <button
        class="btn btn-ghost btn-lg"
        @click="navigateTo('/private-session')"
      >
        <Icon name="bx:arrow-back" />
        Back
      </button>

      <section class="w-full flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
          Schedule your service
        </h1>

        <p class="sm:text-lg/8 text-base/8 text-gray-500">
          Check out our availability and book the date and time that works for you
        </p>
      </section>
      <section class="h-full ">
        <div class="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10 h-full">
          <div class="h-full">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-8 py-4 h-full">
              <div>
                <div class="border-b border-base-content pb-2 mb-4">
                  <p class="text-xl text-center">
                    Select a Date and Time
                  </p>
                </div>

                <SessionCalendar
                  @update:model-value="updateSelectedDate"
                />
              </div>

              <div class="text-center">
                <div class="border-b border-base-content pb-2 mb-4 mt-2">
                  <p class="text-sm text-primary">
                    Time Zone: {{ getUserTimeZone() }}
                  </p>
                </div>
                <div class="mb-4">
                  <p class="text-lg font-semibold stretched-text text-base-content">
                    Availability for {{ selectedDateString }}
                  </p>
                </div>
                <SessionAvailableTimes
                  :selected-date="selectedDate"
                  :data="availableTimes"
                  :loading="pending"
                  :error="error"
                  @update-selected-time="updateSelectedTime"
                />
              </div>
            </div>
          </div>

          <div class="py-4">
            <div class="border-b border-base-content pb-2 mb-4">
              <p class="text-xl text-center">
                Service Details
              </p>
            </div>
            <SessionDetails
              :session="session"
              :selected-time="selectedTime"
              :selected-date="selectedDateString"
              @navigate-next="navigateNext"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const { id } = route.params;
const { formatSelectedDate } = useFormatDate();
const { getUserTimeZone } = useTimezoneProvider();

const selectedDate = ref(new Date());
const selectedTime = ref(null);

const { data: session } = await useFetch(`/api/session/${id}`);
const { data: availableTimes, pending, error } = await useFetch(`/api/session/${id}/available-times`, {
  query: computed(() => ({
    date: selectedDate.value?.toISOString().split("T")[0],
  })),
  watch: [() => selectedDate.value],
});

const selectedDateString = ref(formatSelectedDate(selectedDate.value));

const updateSelectedDate = (date) => {
  selectedDate.value = date;
  selectedDateString.value = formatSelectedDate(date);
};

const updateSelectedTime = (time) => {
  selectedTime.value = time;
};

const navigateNext = () => {
  router.push({
    path: `/session/${id}/booking`,
    query: { date: selectedDateString.value, time: selectedTime.value?.time },
  });
};
</script>

<style lang="scss" scoped>

</style>
