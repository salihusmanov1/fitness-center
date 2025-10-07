<template>
  <div>
    <section class="lg:p-10">
      <div class="max-w-md mx-auto">
        <div class="w-full h-full flex justify-center items-center">
          <div class="w-full space-y-6">
            <div class="text-center space-y-2">
              <h2 class="sm:text-4xl text-3xl font-semibold stretched-text scale-y-105">
                SIGN IN
              </h2>
              <p class="text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            <form
              class="space-y-6"
              @submit.prevent="handleLogin"
            >
              <fieldset class="fieldset">
                <legend class="fieldset-legend font-medium text-sm">
                  Email Address *
                </legend>
                <input
                  v-model="form.email"
                  type="email"
                  class="input focus:outline-none w-full bg-base-300"
                  placeholder="Enter your email"
                  required
                >
              </fieldset>

              <fieldset class="fieldset">
                <legend class="fieldset-legend font-medium text-sm">
                  Password *
                </legend>
                <input
                  v-model="form.password"
                  type="password"
                  class="input focus:outline-none w-full bg-base-300"
                  placeholder="Enter your password"
                  required
                >
              </fieldset>

              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="form.rememberMe"
                    type="checkbox"
                    class="checkbox checkbox-primary checkbox-sm"
                  >
                  <span class="text-sm text-gray-600">Remember me</span>
                </label>
                <NuxtLink
                  to="/forgot-password"
                  class="text-sm text-primary hover:opacity-80 transition-opacity"
                >
                  Forgot password?
                </NuxtLink>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-block stretched-text text-lg"
                :disabled="isLoading"
              >
                <span
                  v-if="isLoading"
                  class="loading loading-spinner loading-sm"
                />
                {{ isLoading ? 'Signing in...' : 'Sign In' }}
              </button>
            </form>

            <div class="divider text-gray-500 text-sm">
              OR
            </div>

            <div class="space-y-3">
              <button
                class="btn btn-outline btn-block flex items-center gap-3"
                @click="handleSocialLogin('google')"
              >
                <Icon
                  name="logos:google-icon"
                  size="20px"
                />
                Continue with Google
              </button>
              <button
                class="btn btn-outline btn-block flex items-center gap-3"
                @click="handleSocialLogin('facebook')"
              >
                <Icon
                  name="logos:facebook"
                  size="20px"
                />
                Continue with Facebook
              </button>
            </div>

            <div class="text-center text-gray-500">
              <p>
                Don't have an account?
                <NuxtLink
                  to="/register"
                  class="text-primary hover:opacity-80 transition-opacity font-medium"
                >
                  Sign up here
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Handle successful login
    console.log("Login successful:", form);

    // Redirect to dashboard or home page
    await navigateTo("/");
  }
  catch (error) {
    console.error("Login failed:", error);
    // Handle error (show toast, etc.)
  }
  finally {
    isLoading.value = false;
  }
};

const handleSocialLogin = async (provider) => {
  console.log(`Social login with ${provider}`);
  // Implement social login logic
};

// Set page meta
useHead({
  title: "Login - Fitness Center",
  meta: [
    { name: "description", content: "Sign in to your fitness center account to access your workouts, sessions, and progress." },
  ],
});
</script>
