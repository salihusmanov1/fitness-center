<template>
  <div class="w-full min-h-[1000px] h-full p-4">
    <div class="w-full max-w-[1000px] mx-auto space-y-8 py-8 h-full">
      <button
        class="btn btn-ghost btn-lg"
        @click="goBack"
      >
        <Icon name="bx:arrow-back" />
        Back
      </button>

      <section class="w-full flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
          Check Session Details
        </h1>

        <p class="sm:text-lg/8 text-base/8 text-gray-500">
          Check out our availability and book the date and time that works for you
        </p>
      </section>
      <section class="h-full ">
        <div class="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10 h-full">
          <div class="h-full">
            <div class="grid grid-cols-1 gap-y-8 py-4 h-full">
              <div>
                <div class="border-b border-base-content pb-2 mb-4">
                  <p class="text-xl text-center">
                    Select a Date and Time
                  </p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <UiCalendar @update:model-value="updateSelectedDate" />
                  <PtSessionAvailableTimes />
                </div>
              </div>
            </div>
          </div>

          <div class="py-4">
            <div class="border-b border-base-content pb-2 mb-4">
              <p class="text-xl text-center">
                Service Details
              </p>
            </div>
            <PtSessionDetails
              :session="dummy"
              @navigate-next="navigateNext"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const client = useSanctumClient();
const route = useRoute();
const router = useRouter();
const { id } = route.params;

// const { data: session, error: sessionError } = await useAsyncData(`session-${id}`, () => client(`/api/class_sessions/${id}`));

// if (sessionError.value && sessionError.value.statusCode === 404) {
//   showError({
//     statusCode: 404,
//     statusMessage: "Session not found",
//   });
// }

const dummy = {
  id: 1,
  name: "Strength Training Fundamentals",
  classType: "Strength Training",
  description: "Learn proper form and technique for basic strength training exercises. Perfect for beginners looking to build a solid foundation.",
  trainerName: "Mike Johnson",
  price: 80,
  currency: "USD",
  duration_minutes: 60,
  start_at: "2024-01-15T10:00:00Z",
};

const navigateNext = () => {
  router.push({
    path: `/private-training/${id}/booking`,
  });
};

const goBack = () => {
  router.back();
};
</script>

  <style lang="scss" scoped>

  </style>
