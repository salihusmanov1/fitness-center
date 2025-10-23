<template>
  <section class="px-4 py-16">
    <div class="max-w-md mx-auto">
      <div class="w-full h-full flex justify-center items-center">
        <div class="w-full space-y-6">
          <div class="text-center space-y-2">
            <h2 class="sm:text-4xl text-3xl font-semibold stretched-text scale-y-105">
              FORGOT PASSWORD
            </h2>
            <p class="text-gray-500">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <form @submit.prevent="handleForgotPassword">
            <UiFormInput
              v-model="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              :required="true"
              :error="errors.email"
            />

            <button
              type="submit"
              class="btn btn-primary btn-block stretched-text text-lg mt-4"
              :disabled="isLoading"
            >
              <span
                v-if="isLoading"
                class="loading loading-spinner loading-sm"
              />
              {{ submitButtonText }}
            </button>
          </form>

          <div class="text-center text-gray-500">
            <p>
              Remember your password?
              <NuxtLink
                to="/login"
                class="text-primary hover:opacity-80 transition-opacity font-medium"
              >
                Sign in
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const {
  email,
  errors,
  isLoading,
  submitButtonText,
  handleForgotPassword,
} = useForgotPassword();

useHead({
  title: "Forgot Password - NV Club",
  meta: [
    { name: "description", content: "Reset your NV Club password by entering your email address." },
  ],
});
</script>
