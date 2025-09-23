<template>
  <div class="px-4">
    <section class="h-[380px] text-center flex flex-col items-center gap-4 justify-end">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        PRIVATE SESSION
      </h1>
      <p class="sm:text-xl text-lg font-light">
        Book a Private Workout Session with Riley
      </p>
      <p class="sm:text-lg/8 text-base/8 text-gray-500">
        I'm a paragraph. Click here to add your own text and edit me. <br>
        It’s easy. Just click “Edit Text” or double click me to add your own <br> content and make changes to the font.
      </p>
    </section>

    <section class="w-full flex justify-center my-20">
      <div class="w-[940px] grid grid-cols-1 sm:grid-cols-2">
        <div class="w-full h-full overflow-hidden">
          <NuxtImg
            src="/pr-session.jpg"
            alt="Private Session"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="h-full flex flex-col justify-center items-start gap-4 p-8 sm:p-16 border border-gray-300 sm:border-l-0">
          <p>ONE ON ONE SESSION</p>
          <p>1 hour</p>
          <p>30$</p>
          <button class="btn btn-primary stretched-text tracking-tighter text-lg">
            Book Now
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Page content will be added here
</script>
