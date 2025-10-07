<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click="closeModal"
  >
    <div
      class="bg-white max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl mx-4 overflow-y-auto"
      @click.stop
    >
      <div class="relative">
        <NuxtImg
          :src="subscriptionData?.thumbnail || '/video-courses-1.jpg'"
          alt="Course thumbnail"
          class="w-full h-64 object-cover"
        />
        <button
          class="absolute top-4 right-4 text-white z-10 cursor-pointer"
          @click="closeModal"
        >
          <Icon
            name="bx:x"
            size="24px"
          />
        </button>
        <div class="absolute inset-0 bg-black/30" />
        <div class="absolute bottom-4 left-4 text-white">
          <h2 class="stretched-text text-2xl font-semibold">
            {{ subscriptionData?.title || 'Course Subscription' }}
          </h2>
          <p class="text-sm opacity-90">
            {{ subscriptionData?.subtitle || 'Unlock premium content' }}
          </p>
        </div>
      </div>

      <div class="p-8">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="stretched-text text-xl font-semibold text-gray-800">
              {{ subscriptionData?.price || 'Subscribe $9.99/mo.' }}
            </h3>
            <div class="text-sm text-gray-500">
              {{ subscriptionData?.duration || 'Monthly subscription' }}
            </div>
          </div>
        </div>

        <div class="mb-8">
          <ul class="space-y-3">
            <li
              v-for="(advantage, index) in advantages"
              :key="index"
              class="flex items-start gap-3"
            >
              <Icon
                name="bx:check"
                size="20px"
                class=" mt-0.5 flex-shrink-0"
              />
              <span class="text-sm text-gray-600">{{ advantage }}</span>
            </li>
          </ul>
        </div>

        <div>
          <NuxtLink
            to="/login"
            class="btn btn-outline btn-lg text-black w-full font-light"
          >
            Proceed to Checkout
          </NuxtLink>
        </div>

        <div class="flex gap-2 justify-center pt-6 text-center text-sm text-black">
          <p>
            Already have an account?
          </p>
          <NuxtLink
            to="/login"
            class="underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Log in
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  subscriptionData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  console.log("closeModal");
  emit("close");
};

const advantages = [
  "Unlimited access to all video courses",
  "New content added weekly",
  "Expert trainer guidance and tips",
];
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
