<template>
  <section
    class="space-y-6 my-8"
  >
    <div class="text-center mb-8">
      <h2 class="sm:text-5xl text-3xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-4">
        MY PLANS
      </h2>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <article
        v-for="plan in plans"
        :key="plan.id"
        class="card bg-base-100 shadow-lg border border-base-300"
      >
        <div class="card-body">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-semibold stretched-text scale-y-105">
              {{ plan.name }}
            </h3>
            <div
              :class="[
                'badge',
                {
                  'badge-success': plan.status === 'active',
                  'badge-error': plan.status === 'expired',
                },
              ]"
            >
              {{ plan.status }}
            </div>
          </div>
          <p class="text-sm text-base-content/70 mb-4">
            {{ plan.description }}
          </p>
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span>Duration</span>
              <span>{{ plan.duration }} days</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Remaining</span>
              <span>{{ plan.remainingDays }} days</span>
            </div>
            <progress
              :value="plan.completedDays"
              :max="plan.duration"
              class="progress progress-primary w-full"
            />
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-outline btn-sm">
              View Details
            </button>
            <button
              v-if="plan.status === 'active'"
              class="btn btn-primary btn-sm"
            >
              Download Plan
            </button>
            <button
              v-if="plan.status === 'expired'"
              class="btn btn-secondary btn-sm"
            >
              Renew Plan
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "profile",
  middleware: ["sanctum:auth"],
});

const plans = ref([
  {
    id: 1,
    name: "30-Day Fat Burn Plan",
    description: "Comprehensive fat burning workout and nutrition plan",
    duration: 30,
    completedDays: 18,
    remainingDays: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Muscle Building Program",
    description: "Advanced strength training program for muscle growth",
    duration: 60,
    completedDays: 60,
    remainingDays: 0,
    status: "expired",
  },
]);

const subscriptions = ref([
  {
    id: 1,
    service: "Premium Membership",
    plan: "Monthly",
    nextBilling: "2024-02-15",
    amount: 29.99,
    icon: "/membership-icon.jpg",
  },
  {
    id: 2,
    service: "Personal Training",
    plan: "Weekly",
    nextBilling: "2024-01-20",
    amount: 80.00,
    icon: "/training-icon.jpg",
  },
]);

const paymentHistory = ref([
  {
    id: 1,
    date: "2024-01-15",
    item: "Premium Membership",
    amount: 29.99,
    status: "completed",
  },
  {
    id: 2,
    date: "2024-01-10",
    item: "Personal Training Session",
    amount: 80.00,
    status: "completed",
  },
  {
    id: 3,
    date: "2024-01-05",
    item: "Yoga Course",
    amount: 49.99,
    status: "completed",
  },
]);
</script>

<style lang="scss" scoped>

</style>
