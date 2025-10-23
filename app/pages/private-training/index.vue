<template>
  <div class="w-full min-h-[1000px] h-full p-4">
    <div class="w-full max-w-[1000px] mx-auto space-y-8 py-8 h-full">
      <section class="w-full flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
          PRIVATE TRAINING
        </h1>

        <p class="sm:text-lg/8 text-base/8 text-gray-500">
          Get personalized one-on-one training sessions tailored to your fitness goals
        </p>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
        <div class="card">
          <div class="card-body text-center">
            <Icon
              name="bx:dumbbell"
              size="48px"
              class="text-primary mx-auto mb-4"
            />
            <h2 class="card-title justify-center text-xl font-bold">
              Personalized Workouts
            </h2>
            <p class="text-gray-600">
              Custom workout plans designed specifically for your fitness level and goals
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body text-center">
            <Icon
              name="bx:user-check"
              size="48px"
              class="text-primary mx-auto mb-4"
            />
            <h2 class="card-title justify-center text-xl font-bold">
              Expert Trainers
            </h2>
            <p class="text-gray-600">
              Work with certified personal trainers who understand your unique needs
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body text-center">
            <Icon
              name="bx:time"
              size="48px"
              class="text-primary mx-auto mb-4"
            />
            <h2 class="card-title justify-center text-xl font-bold">
              Flexible Scheduling
            </h2>
            <p class="text-gray-600">
              Book sessions at times that work best for your busy schedule
            </p>
          </div>
        </div>
      </section>

      <section class="py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <template
            v-for="(session, index) in ptSessions"
            :key="index"
          >
            <PtSessionsCard
              :session="session"
            />
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Dummy PT Sessions Data
const ptSessions = ref([
  {
    id: 1,
    name: "Strength Training Fundamentals",
    classType: "Strength Training",
    description: "Learn proper form and technique for basic strength training exercises. Perfect for beginners looking to build a solid foundation.",
    trainerName: "Mike Johnson",
    price: 80,
    currency: "USD",
    duration_minutes: 60,
    start_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "HIIT Cardio Blast",
    classType: "Cardio",
    description: "High-intensity interval training designed to maximize calorie burn and improve cardiovascular fitness in a short time.",
    trainerName: "Sarah Williams",
    price: 75,
    currency: "USD",
    duration_minutes: 45,
    start_at: "2024-01-16T14:00:00Z",
  },
  {
    id: 3,
    name: "Yoga & Flexibility",
    classType: "Yoga",
    description: "Gentle yoga flow focusing on flexibility, balance, and stress relief. Suitable for all fitness levels.",
    trainerName: "Emma Davis",
    price: 65,
    currency: "USD",
    duration_minutes: 50,
    start_at: "2024-01-17T09:00:00Z",
  },
  {
    id: 4,
    name: "Functional Movement",
    classType: "Functional Training",
    description: "Improve daily movement patterns and prevent injury through functional exercises that mimic real-life activities.",
    trainerName: "Alex Rodriguez",
    price: 85,
    currency: "USD",
    duration_minutes: 55,
    start_at: "2024-01-18T16:00:00Z",
  },
  {
    id: 5,
    name: "Boxing Fundamentals",
    classType: "Boxing",
    description: "Learn basic boxing techniques, footwork, and combinations in a safe, controlled environment.",
    trainerName: "Carlos Martinez",
    price: 90,
    currency: "USD",
    duration_minutes: 60,
    start_at: "2024-01-19T11:00:00Z",
  },
  {
    id: 6,
    name: "Core Strengthening",
    classType: "Core Training",
    description: "Targeted core exercises to build strength, stability, and definition in your abdominal muscles.",
    trainerName: "Lisa Chen",
    price: 70,
    currency: "USD",
    duration_minutes: 40,
    start_at: "2024-01-20T13:00:00Z",
  },
]);

useHead({
  title: "Private Training - NV Club",
  meta: [
    { name: "description", content: "Get personalized one-on-one training sessions with certified trainers at NV Club" },
  ],
});
</script>
