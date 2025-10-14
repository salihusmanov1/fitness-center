<template>
  <section class="p-4">
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
            @submit.prevent="handleLogin"
          >
            <UiFormInput
              v-model="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              :required="true"
              :error="errors.email"
            />

            <UiFormInput
              v-model="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              :required="true"
              :error="errors.password"
            />

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="rememberMe"
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
              class="btn btn-primary btn-block stretched-text text-lg mt-4"
              :disabled="authStore.loading"
            >
              <span
                v-if="authStore.loading"
                class="loading loading-spinner loading-sm"
              />
              {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
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
</template>

<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const { success, error } = useToast();

const authStore = useAuthStore();
const { isAuthenticated, user } = useSanctumAuth();

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required("Email is required").email("Invalid email address"),
    password: yup.string().required("Password is required"),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField("email");
const [password] = defineField("password");
const [rememberMe] = defineField("rememberMe");

const handleLogin = handleSubmit(async (values) => {
  const { success: loginSuccess, message } = await authStore.login(values);
  if (loginSuccess) {
    success(message);
  }
  else {
    error(message);
    console.log(message);
  }
});

// useHead({
//   title: "Login - Fitness Center",
//   meta: [
//     { name: "description", content: "Sign in to your fitness center account to access your workouts, sessions, and progress." },
//   ],
// });
</script>
