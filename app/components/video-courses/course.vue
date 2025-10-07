<template>
  <section>
    <div class="w-full h-[626px] relative">
      <NuxtImg
        :src="course.img"
        alt="Video Course 1"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50" />
      <div class="absolute inset-0 flex flex-col items-center justify-center z-10 text-center p-10">
        <div class="flex flex-col items-center justify-center">
          <h2 class="text-white stretched-text sm:text-7xl text-5xl font-semibold scale-y-105">
            {{ course.header }}
          </h2>
          <div class="flex flex-col sm:flex-row items-center gap-12 my-8 text-white sm:text-lg text-base">
            <button
              class="flex items-center gap-2 hover:opacity-80 transition-opacity"
              @click="openPreviewModal(course)"
            >
              <Icon
                name="bx:play-circle"
                size="48px"
              />
              <span class="link underline-offset-4">Watch Preview</span>
            </button>
            <button
              class="link underline-offset-4 hover:opacity-80 transition-opacity"
              @click="openSubscriptionModal(course)"
            >
              {{ course.text }}
            </button>
          </div>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <template v-if="!isAllVideosOpen">
          <button
            class="btn btn-outline btn-lg font-light text-white"
            @click="isAllVideosOpen = true"
          >
            All Videos
            <Icon
              name="bx:plus"
              size="18px"
            />
          </button>
        </template>
        <template v-else>
          <div class="flex items-center justify-center gap-2 text-white">
            <div class="px-4">
              <Icon
                name="bx:share-alt"
                size="16px"
                class="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
            <div class="w-[1px] h-4 bg-white" />
            <div class="px-4">
              <Icon
                name="material-symbols:info-i"
                size="16px"
                class="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
            <div class="w-[1px] h-4 bg-white" />
            <NuxtLink
              to="/login"
              class="px-4 hover:opacity-80 transition-opacity"
            >
              {{ course.text }}
            </NuxtLink>
            <div class="w-[1px] h-4 bg-white" />
            <NuxtLink
              to="/login"
              class="px-4 hover:opacity-80 transition-opacity"
            >
              Sign In
            </NuxtLink>
            <div class="w-[1px] h-4 bg-white" />
            <Icon
              name="bx:x"
              size="24px"
              class="cursor-pointer hover:opacity-80 transition-opacity px-4"
              @click="isAllVideosOpen = false"
            />
          </div>
        </template>
      </div>
    </div>
    <template v-if="isAllVideosOpen">
      <div class="grid grid-cols-3">
        <div
          v-for="(child, key) in course.children"
          :key="key"
          class="text-black aspect-video relative group"
        >
          <NuxtImg
            :src="child.thumbnail"
            :alt="`Video Course ${key + 1}`"
            class="w-full h-full object-cover "
          />
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-400" />
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white
           opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
           transition-all duration-600 ease-out"
          >
            <div class="text-center text-lg">
              {{ child.header }}
            </div>
            <div class="flex items-center justify-center gap-4">
              <button
                class="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                @click="openPreviewModal(child)"
              >
                <Icon
                  name="bx:play-circle"
                  size="24px"
                />
                <p class="text-sm underline underline-offset-2">
                  Watch Preview
                </p>
              </button>
              <button
                class="text-sm underline underline-offset-2 cursor-pointer hover:opacity-80 transition-opacity"
                @click="openSubscriptionModal(child)"
              >
                {{ child.text }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <VideoCoursesVideoPreviewModal
      :is-open="isModalOpen"
      :video-data="selectedVideo"
      @close="closePreviewModal"
    />

    <VideoCoursesSubscriptionModal
      :is-open="isSubscriptionModalOpen"
      :subscription-data="selectedSubscription"
      @close="closeSubscriptionModal"
    />
  </section>
</template>

<script setup>
defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const isAllVideosOpen = ref(false);
const isModalOpen = ref(false);
const selectedVideo = ref(null);
const isSubscriptionModalOpen = ref(false);
const selectedSubscription = ref(null);

const openPreviewModal = (videoData) => {
  selectedVideo.value = videoData;
  isModalOpen.value = true;
};

const closePreviewModal = () => {
  isModalOpen.value = false;
  selectedVideo.value = null;
};

const openSubscriptionModal = (subscriptionData) => {
  selectedSubscription.value = {
    title: subscriptionData.header || "Course Subscription",
    subtitle: "Unlock premium content",
    price: subscriptionData.text || "Subscribe $9.99/mo.",
    thumbnail: subscriptionData.img || subscriptionData.thumbnail || "/video-courses-1.jpg",
    description: "Get unlimited access to our premium fitness content, expert guidance, and exclusive workout routines designed to help you achieve your fitness goals.",
    duration: subscriptionData.text?.includes("mo.") ? "Monthly subscription" : "One-time purchase",
  };
  isSubscriptionModalOpen.value = true;
};

const closeSubscriptionModal = () => {
  isSubscriptionModalOpen.value = false;
  selectedSubscription.value = null;
};
</script>

<style lang="scss" scoped></style>
