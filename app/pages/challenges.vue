<template>
  <div class="p-4 max-w-[1000px] mx-auto">
    <section class="h-[380px] text-center flex flex-col items-center gap-4 justify-center">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        FITNESS CHALLENGES
      </h1>
      <p class="sm:text-lg/8 text-base/8 text-gray-500">
        Transform your fitness journey with our exciting challenges. <br>
        Push your limits and achieve your goals.
      </p>
    </section>

    <section class="py-10">
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(challenge, index) in challenges"
          :key="index"
          class="card border border-gray-300"
        >
          <figure>
            <NuxtImg
              :src="challenge.image"
              alt="Challenge"
              class="w-full h-[160px] object-cover object-bottom"
            />
          </figure>
          <div class="card-body pt-12">
            <h2 class="card-title stretched-text tracking-tighter scale-y-105 italic text-2xl">
              {{ challenge.name }}
            </h2>
            <p>
              {{ challenge.duration }}
            </p>
            <div class="divider h-[0.5px] w-[32px] bg-gray-300" />
            <p>
              {{ challenge.price }}
            </p>
            <div class="card-actions justify-end mt-6">
              <button class="btn btn-primary btn-block">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const challenges = [
  {
    name: "Push Ups Challenge",
    duration: "30 Days",
    price: "$199",
    image: "/push-ups-challenge.jpg",
  },
  {
    name: "Flat Abs Challenge",
    duration: "8 Weeks",
    price: "$299",
    image: "/abs-challenge.jpg",
  },
  {
    name: "Total Workout Challenge",
    duration: "6 Weeks",
    price: "$249",
    image: "/pr-session.jpg",
  },
];
</script>
