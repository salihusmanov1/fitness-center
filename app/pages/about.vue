<template>
  <div>
    <section class="lg:h-[380px] h-full text-center flex flex-col items-center justify-center p-10 lg:p-0">
      <h1 class="sm:text-9xl text-6xl font-bold stretched-text tracking-tighter scale-y-105 italic">
        ABOUT
      </h1>
      <p class="sm:text-lg/8 text-base/8 text-gray-500">
        I'm a paragraph. Click here to add your own text and edit me. <br>
        Let your users get to know you.
      </p>
    </section>

    <section class="space-y-16 lg:p-10">
      <div class="grid grid-cols-1 lg:grid-cols-[56%_44%] gap-y-16 ">
        <div class="w-full h-full">
          <div class="w-full h-[520px] bg-gray-300 flex justify-center items-center">
            Trainer Image Here
          </div>
        </div>
        <article class="w-full h-full flex justify-center items-center text-center lg:text-start p-4 lg:p-0">
          <div class="lg:w-[60%] w-full space-y-4">
            <div>
              <h2 class="sm:text-6xl text-4xl font-semibold stretched-text scale-y-105">
                RILEY OLSON
              </h2>
              <p class="text-xl ">
                Fitness Trainer, Founder
              </p>
            </div>

            <p class="leading-8 text-gray-500">
              I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double
              click me to add your own content and make changes to the font. I’m a great place for you to tell a story and
              let your users know a little more about you.f
            </p>
          </div>
        </article>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-y-16 mb-16">
        <article class="w-full h-full flex justify-center items-center text-center lg:text-start row-start-2 lg:row-start-1 p-4 lg:p-0">
          <div class="lg:w-[60%] w-full space-y-4">
            <div>
              <h2 class="sm:text-6xl text-4xl font-semibold stretched-text scale-y-105">
                ON THE GO
              </h2>
              <p class="text-xl ">
                Workout anywhere, anytime
              </p>
            </div>

            <p class="leading-8 text-gray-500">
              I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double
              click me to add your own content and make changes to the font. I’m a great place for you to tell a story and
              let your users know a little more about you.f
            </p>
          </div>
        </article>
        <div class="w-full h-full lg:h-[520px] flex justify-center items-center">
          <NuxtImg
            src="/computer.png"
            class="w-1/3 object-cover"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Page content will be added here
</script>
