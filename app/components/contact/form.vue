<template>
  <section class="lg:p-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-16 mb-16">
      <div class="w-full h-[800px] bg-gray-300 flex justify-center items-center">
        Trainer Image Here
      </div>
      <div class="w-full h-full flex justify-center items-end p-4 lg:p-0">
        <div class="lg:w-[70%] w-full space-y-4">
          <h2 class="sm:text-5xl text-3xl font-semibold stretched-text scale-y-105">
            CONTACT ME IF YOU HAVE FURTHER QUESTIONS
          </h2>
          <p class="text-gray-500">
            I'm a paragraph. Click here to add your own text and edit me. Let your users get to know you.
          </p>
          <form class="space-y-4">
            <div class="grid lg:grid-cols-2 gap-4">
              <fieldset class="fieldset col-span-2 lg:col-span-1">
                <legend class="fieldset-legend font-medium text-sm">
                  First Name *
                </legend>
                <input
                  v-model="form.first_name"
                  type="text"
                  class="input focus:outline-none w-full bg-base-300"
                >
              </fieldset>
              <fieldset class="fieldset col-span-2 lg:col-span-1">
                <legend class="fieldset-legend font-medium text-sm">
                  Last Name *
                </legend>
                <input
                  v-model="form.last_name"
                  type="text"
                  class="input focus:outline-none w-full bg-base-300"
                >
              </fieldset>
              <fieldset class="fieldset col-span-2 lg:col-span-1">
                <legend class="fieldset-legend font-medium text-sm">
                  Email *
                </legend>
                <input
                  v-model="form.email"
                  type="text"
                  class="input focus:outline-none w-full bg-base-300"
                >
              </fieldset>
              <fieldset class="fieldset col-span-2 lg:col-span-1">
                <legend class="fieldset-legend font-medium text-sm">
                  Phone
                </legend>
                <input
                  v-model="form.phone"
                  type="text"
                  class="input focus:outline-none w-full bg-base-300"
                >
              </fieldset>
              <fieldset class="fieldset col-span-2">
                <legend class="fieldset-legend font-medium text-sm">
                  Message
                </legend>
                <textarea
                  v-model="form.message"
                  class="textarea focus:outline-none w-full bg-base-300"
                />
              </fieldset>
              <button class="col-span-2 btn btn-primary btn-block stretched-text text-lg">
                Submit
              </button>
            </div>
          </form>
          <div class="text-gray-500 text-center">
            <p>500 Terry Francine Street San Francisco</p>
            <p>Email: info@mysite.com / Tel: 123-456-7890</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  message: "",
});
</script>

<style lang="scss" scoped>

</style>
