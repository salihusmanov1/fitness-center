<template>
  <div>
    <section class="h-[380px] text-center flex flex-col items-center gap-4 justify-center px-4">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        VIDEO COURSES
      </h1>
      <p class="sm:text-lg/8 text-base/8 text-gray-500">
        I'm a paragraph. Click here to add your own text and edit me. <br>
        Let your users get to know you.
      </p>
    </section>
    <section
      v-for="(slide, index) in slides"
      :key="index"
    >
      <div class="w-full h-[626px] relative">
        <NuxtImg
          :src="slide.img"
          alt="Video Course 1"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50" />
        <div class="absolute inset-0 flex flex-col items-center justify-end z-10 text-center p-10">
          <div class="flex flex-col items-center justify-center">
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

          <div class="mt-30">
            <button class="btn btn-outline btn-lg font-light text-white">
              All Videos
              <Icon
                name="bx:plus"
                size="18px"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const slides = [
  {
    img: "/video-courses-1.jpg",
    header: "Beginners Class 02",
    text: "Subscribe $9.99/mo.",
  },
  {
    img: "/video-courses-2.jpg",
    header: "ADVANCED COURSE",
    text: "Subscribe $10.99/mo.",
  },
  {
    img: "/video-courses-3.jpg",
    header: "The 3 MONTH CHALLENGE",
    text: "Subscribe $12.99/mo.",
  },
];
</script>
