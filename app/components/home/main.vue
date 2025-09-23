<template>
  <div class="p-10 space-y-16">
    <section class="grid grid-cols-1 lg:grid-cols-[56%_44%] gap-4">
      <div class="w-full">
        <NuxtImg
          src="/main-1.jpg"
          class="w-full h-full object-cover"
        />
      </div>
      <article class="flex-1 flex justify-center items-center text-center lg:text-start">
        <div class="w-[74%] space-y-4">
          <Icon
            name="bx:dumbbell"
            size="80px"
            class="text-primary"
          />
          <h2 class="sm:text-6xl text-4xl font-semibold stretched-text scale-y-105">
            SLIM DOWN, TONE UP!
          </h2>
          <p class="sm:text-lg text-base text-gray-500">
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double
            click me to add your own content and make changes to the font.
          </p>
        </div>
      </article>
    </section>
    <section class="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-4">
      <article class="flex-1 flex justify-center items-center text-center lg:text-start row-start-2 lg:row-start-1">
        <div class="w-[74%] space-y-4">
          <Icon
            name="bxs:timer"
            size="80px"
            class="text-primary"
          />
          <h2 class="sm:text-6xl text-4xl font-semibold stretched-text scale-y-105">
            GET WITH THE PROGRAM
          </h2>
          <ul class="sm:text-lg text-base text-gray-500 space-y-4">
            <li class="flex items-center gap-2">
              <Icon
                name="bx:check"
                size="32px"
                class="text-primary"
              />
              <p class="flex-1">
                24/7 UNLIMITED ACCESS
              </p>
            </li>
            <li class="flex items-center gap-2">
              <Icon
                name="bx:check"
                size="32px"
                class="text-primary"
              />
              <p class="flex-1">
                INSTRUCTED BY TOP TRAINER RILEY OLSON
              </p>
            </li>
            <li class="flex items-center gap-2">
              <Icon
                name="bx:check"
                size="32px"
                class="text-primary"
              />
              <p class="flex-1">
                OVER 50 VIDEOS AVAILABLE
              </p>
            </li>
            <li class="flex items-center gap-2">
              <Icon
                name="bx:check"
                size="32px"
                class="text-primary"
              />
              <p class="flex-1">
                CARDIO, STRENGTH & STRETCH WORKOUTS
              </p>
            </li>
          </ul>
        </div>
      </article>
      <div class="w-full row-start-1 lg:row-start-1">
        <NuxtImg
          src="/main-2.jpg"
          class="w-full h-full object-cover"
        />
      </div>
    </section>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
