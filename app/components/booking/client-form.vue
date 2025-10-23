<template>
  <div>
    <div class="border-b border-base-content pb-2 mb-4">
      <p class="text-xl">
        Client Details
      </p>
    </div>
    <div class="space-y-4 py-1">
      <p class="text-sm">
        Tell us a bit about yourself
      </p>
      <p class="px-2 py-4 text-primary bg-primary/10 text-sm">
        Already have an account?
        <NuxtLink
          to="/login"
          class="underline text-primary"
        >
          Log In
        </NuxtLink> for faster booking.
      </p>

      <div class="grid grid-cols-2 gap-6">
        <fieldset class="fieldset">
          <legend class="fieldset-legend font-medium text-sm">
            Name *
          </legend>
          <input
            v-model="form.name"
            type="text"
            class="input focus:outline-none w-full"
          >
          <p class="label w-full justify-end">
            {{ form.name.length }}/100
          </p>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend font-medium text-sm">
            Email *
          </legend>
          <input
            v-model="form.email"
            type="text"
            class="input focus:outline-none w-full"
          >
        </fieldset>
        <fieldset class="fieldset col-span-2">
          <legend class="fieldset-legend font-medium text-sm">
            Phone Number*
          </legend>
          <input
            v-model="form.phone"
            type="text"
            class="input focus:outline-none w-full"
          >
        </fieldset>
        <fieldset class="fieldset col-span-2">
          <legend class="fieldset-legend font-medium text-sm">
            Add Your Message *
          </legend>
          <textarea
            v-model="form.message"
            class="textarea focus:outline-none w-full"
          />
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});
</script>

<style lang="scss" scoped>

</style>
