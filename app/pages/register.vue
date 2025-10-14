<template>
  <section class="p-4">
    <div class="max-w-md mx-auto">
      <div class="w-full h-full flex justify-center items-center">
        <div class="w-full space-y-6">
          <div class="text-center space-y-2">
            <h2 class="sm:text-4xl text-3xl font-semibold stretched-text scale-y-105">
              SIGN UP
            </h2>
            <p class="text-gray-500">
              Create your account to start your fitness journey
            </p>
          </div>

          <form @submit="onSubmit">
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-0">
              <UiFormInput
                v-model="name"
                name="name"
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                :required="true"
                :error="errors.name"
              />

              <UiFormInput
                v-model="surname"
                name="surname"
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
                :required="true"
                :error="errors.surname"
              />
            </div>

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
              v-model="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              :required="false"
              :error="errors.phone"
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

            <UiFormInput
              v-model="repeated_password"
              name="repeated_password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              :required="true"
              :error="errors.repeated_password"
            />

            <div class="flex items-center gap-2">
              <input
                v-model="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                class="checkbox checkbox-primary checkbox-sm"
              >
              <label class="text-sm text-gray-600 cursor-pointer">
                I agree to the
                <NuxtLink
                  to="/terms"
                  class="text-primary hover:opacity-80 transition-opacity"
                >
                  Terms of Service
                </NuxtLink>
                and
                <NuxtLink
                  to="/privacy"
                  class="text-primary hover:opacity-80 transition-opacity"
                >
                  Privacy Policy
                </NuxtLink>
              </label>
              <p class="text-red-500 h-4">
                {{ errors.agreeToTerms || "" }}
              </p>
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-block stretched-text text-lg mt-4"
              :disabled="isLoading || !agreeToTerms"
            >
              <span
                v-if="isLoading"
                class="loading loading-spinner loading-sm"
              />
              {{ isLoading ? 'Creating account...' : 'Create Account' }}
            </button>
          </form>

          <div class="divider text-gray-500 text-sm">
            OR
          </div>

          <div class="space-y-3">
            <button
              class="btn btn-outline btn-block flex items-center gap-3"
              @click="handleSocialRegister('google')"
            >
              <Icon
                name="logos:google-icon"
                size="20px"
              />
              Sign up with Google
            </button>
            <button
              class="btn btn-outline btn-block flex items-center gap-3"
              @click="handleSocialRegister('facebook')"
            >
              <Icon
                name="logos:facebook"
                size="20px"
              />
              Sign up with Facebook
            </button>
          </div>

          <div class="text-center text-gray-500">
            <p>
              Already have an account?
              <NuxtLink
                to="/login"
                class="text-primary hover:opacity-80 transition-opacity font-medium"
              >
                Sign in here
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

const authStore = useAuthStore();

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required("Email is required").email("Invalid email address"),
    name: yup.string().required("First name is required"),
    surname: yup.string().required("Last name is required"),
    phone: yup.string().required("Phone number is required"),
    password: yup.string().required("Password is required"),
    repeated_password: yup.string().required("Confirm password is required").oneOf([yup.ref("password"), null], "Passwords must match"),
    agreeToTerms: yup.boolean().required("You must agree to the terms and conditions"),
  }),
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField("email");
const [name] = defineField("name");
const [surname] = defineField("surname");
const [phone] = defineField("phone");
const [password] = defineField("password");
const [repeated_password] = defineField("repeated_password");
const [agreeToTerms] = defineField("agreeToTerms");

const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  await authStore.signup(values);
});

// useHead({
//   title: "Register - Fitness Center",
//   meta: [
//     { name: "description", content: "Create your fitness center account to access personalized workouts, sessions, and track your progress." },
//   ],
// });
</script>
