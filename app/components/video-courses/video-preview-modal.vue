<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click="closeModal"
  >
    <div
      class="bg-white max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row shadow-2xl p-4"
      @click.stop
    >
      <div class="lg:w-2/3 flex items-center justify-center">
        <div class="relative w-full aspect-video">
          <video
            v-if="videoData?.source"
            :src="videoData.source"
            controls
            class="w-full h-full object-contain"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-lg"
          >
            Video not available
          </div>
        </div>
      </div>

      <div class="lg:w-1/3 p-8 flex flex-col justify-between min-h-[400px]">
        <div class="flex justify-between items-start mb-6">
          <h3 class="stretched-text text-2xl font-semibold text-gray-800 leading-tight">
            {{ videoData?.header || 'Video Preview' }}
          </h3>
          <button
            class="text-gray-500 hover:text-gray-700 transition-colors"
            @click="closeModal"
          >
            <Icon
              name="bx:x"
              size="24px"
            />
          </button>
        </div>

        <div class="flex-1 mb-6">
          <p class="text-gray-600 leading-relaxed text-sm">
            {{ videoData?.description || 'Experience our premium fitness content with this preview. Join our community and unlock your full potential with our comprehensive video courses designed for all fitness levels.' }}
          </p>
        </div>

        <div class="mb-6">
          <NuxtLink
            to="/login"
            class="btn btn-outline btn-lg w-full font-light"
          >
            {{ videoData?.text || "Rent $2.99" }}
          </NuxtLink>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-700 mb-4">
            Share this video
          </h4>
          <div class="flex flex-wrap gap-2">
            <button
              class="btn btn-square"
              @click="shareOnSocial('facebook')"
            >
              <Icon
                name="bx:bxl-facebook"
                size="16px"
              />
            </button>
            <button
              class="btn btn-square"
              @click="shareOnSocial('twitter')"
            >
              <Icon
                name="ri:twitter-x-fill"
                size="16px"
              />
            </button>
            <button
              class="btn btn-square"
              @click="shareOnSocial('linkedin')"
            >
              <Icon
                name="bx:bxl-linkedin"
                size="16px"
              />
            </button>
            <button
              class="btn btn-square"
              @click="shareOnSocial('instagram')"
            >
              <Icon
                name="bx:bxl-instagram"
                size="16px"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  videoData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const shareOnSocial = (platform) => {
  const url = window.location.href;
  const title = props.videoData?.header || "Check out this fitness video";

  let shareUrl = "";

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400");
  }
};
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
