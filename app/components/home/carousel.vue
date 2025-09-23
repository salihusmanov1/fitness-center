<template>
  <section>
    <div class="relative w-full h-[625px] overflow-hidden group">
      <div
        class="flex h-full transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="relative min-w-full h-full"
        >
          <NuxtImg
            :src="slide.img"
            alt="Carousel slide"
            class="w-full h-full object-cover object-center"
          />
          <div class="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
            <h2 class="text-white stretched-text sm:text-7xl text-5xl font-semibold scale-y-105">
              {{ slide.header }}
            </h2>
            <div class="flex flex-col sm:flex-row items-center gap-12 my-8 text-white sm:text-lg text-base">
              <a class="flex items-center gap-2">
                <Icon
                  name="bx:play-circle"
                  size="48px"
                />
                <span class="link underline-offset-4">Watch Preview</span>
              </a>
              <a class="link underline-offset-4">
                {{ slide.text }}
              </a>
            </div>
          </div>
          <div class="absolute inset-0 bg-black/50" />
        </div>
      </div>

      <button
        class="btn btn-circle btn-ghost btn-xl absolute top-1/2 left-5 sm:left-10 opacity-100 sm:group-hover:opacity-100 sm:opacity-0 transition-all duration-200 text-white z-20"
        @click="prevSlide"
      >
        <Icon
          name="bx:chevron-left"
          size="64px"
        />
      </button>

      <button
        class="btn btn-circle btn-ghost btn-xl absolute top-1/2 right-5 sm:right-10 opacity-100 sm:group-hover:opacity-100 sm:opacity-0 transition-all duration-200 text-white z-20"
        @click="nextSlide"
      >
        <Icon
          name="bx:chevron-right"
          size="64px"
        />
      </button>
    </div>
  </section>
</template>

<script setup>
const slides = [
  {
    img: "/carousel-1.jpg",
    header: "The 1 MONTH CHALLENGE",
    text: "Subscribe $9.99/mo.",
  },
  {
    img: "/carousel-2.jpg",
    header: "The 2 MONTH CHALLENGE",
    text: "Subscribe $10.99/mo.",
  },
  {
    img: "/carousel-3.jpg",
    header: "The 3 MONTH CHALLENGE",
    text: "Subscribe $12.99/mo.",
  },
];

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value
    = (currentSlide.value - 1 + slides.length) % slides.length;
};
</script>

<style lang="scss" scoped></style>
