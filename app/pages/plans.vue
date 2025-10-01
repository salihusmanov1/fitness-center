<template>
  <div class="p-4 max-w-[1000px] mx-auto">
    <section class="h-[380px] text-center flex flex-col items-center gap-4 justify-center">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        PLANS & PRICING
      </h1>
      <p class="sm:text-lg/8 text-base/8 text-gray-500">
        Choose the perfect membership plan for your fitness journey. <br>
        Unlock exclusive benefits and transform your workout experience.
      </p>
    </section>

    <section class="py-10">
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(plan, index) in membershipPlans"
          :key="index"
          class="card border border-gray-300 relative"
          :class="{ 'bg-gray-200': plan.isBestValue }"
        >
          <div
            v-if="plan.isBestValue"
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-content px-4 py-1 text-sm z-10"
          >
            Best Value
          </div>

          <div class="flex flex-col gap-4 border-b p-6 border-gray-300">
            <h2 class="text-2xl text-center">
              {{ plan.name }} Membership
            </h2>

            <div class="my-6 mx-auto relative text-center">
              <span class="absolute -top-3 -left-3 text-lg">$</span>
              <div class="text-7xl text-neutral">
                {{ plan.price }}
              </div>
              <div class="text-xs">
                {{ plan.pricePer }}
              </div>
            </div>

            <p class="text-center text-sm">
              {{ plan.description }}
            </p>

            <div class="mt-6">
              <button
                class="btn btn-primary btn-block font-light"
              >
                Select
              </button>
            </div>
          </div>
          <div class="card-body">
            <ul class="space-y-3">
              <li
                v-for="benefit in plan.benefits"
                :key="benefit"
                class="flex items-start gap-3"
              >
                <svg
                  class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700">{{ benefit }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const membershipPlans = [
  {
    name: "Silver",
    price: "30",
    pricePer: "-",
    description: "Best for beginners",
    isBestValue: false,
    benefits: [
      "Access to all gym equipment",
      "Group fitness classes",
      "Locker room access",
      "Basic nutrition consultation",
      "Mobile app access",
    ],
  },
  {
    name: "Gold",
    price: "25",
    pricePer: "Every month",
    description: "Best for intermediate",
    isBestValue: true,
    benefits: [
      "Everything in Silver",
      "Personal training sessions (2/month)",
      "Sauna and steam room access",
      "Premium nutrition plan",
      "Priority class booking",
      "Guest passes (2/month)",
      "24/7 gym access",
    ],
  },
  {
    name: "Platinum",
    price: "40",
    pricePer: "Every month",
    description: "Best for advanced",
    isBestValue: false,
    benefits: [
      "Everything in Gold",
      "Unlimited personal training",
      "Massage therapy sessions",
      "Custom meal plans",
      "Unlimited guest passes",
      "VIP parking",
      "Exclusive member events",
      "Priority equipment reservation",
    ],
  },
];
</script>
