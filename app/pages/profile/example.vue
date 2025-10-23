<template>
  <div class="min-h-screen">
    <main class="max-w-6xl mx-auto px-4 py-10">
      <!-- My Plans -->

      <!-- Progress Tracking -->
      <section
        v-if="activeTab === 'progress'"
        class="space-y-6"
      >
        <h2 class="text-3xl font-bold stretched-text scale-y-105">
          Progress Tracking
        </h2>

        <!-- Stats Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">
              Current Weight
            </div>
            <div class="stat-value text-primary">
              {{ progressStats.weight }}kg
            </div>
            <div class="stat-desc">
              -2kg this month
            </div>
          </div>
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">
              Muscle Mass
            </div>
            <div class="stat-value text-secondary">
              {{ progressStats.muscleMass }}%
            </div>
            <div class="stat-desc">
              +1.2% this month
            </div>
          </div>
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">
              Current Streak
            </div>
            <div class="stat-value text-accent">
              {{ progressStats.streak }} days
            </div>
            <div class="stat-desc">
              Personal best!
            </div>
          </div>
          <div class="stat bg-base-200 rounded-lg">
            <div class="stat-title">
              Body Fat
            </div>
            <div class="stat-value text-warning">
              {{ progressStats.bodyFat }}%
            </div>
            <div class="stat-desc">
              -0.8% this month
            </div>
          </div>
        </div>

        <!-- Progress Charts -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="card bg-base-100 shadow-lg border border-base-300">
            <div class="card-body">
              <h3 class="card-title">
                Weight Progress
              </h3>
              <div class="h-64 flex items-end justify-between gap-1">
                <div
                  v-for="(point, index) in weightChartData"
                  :key="index"
                  class="bg-primary rounded-t"
                  :style="{ height: `${(point / Math.max(...weightChartData)) * 100}%`, width: '20px' }"
                />
              </div>
              <div class="flex justify-between text-xs text-base-content/70 mt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>

          <div class="card bg-base-100 shadow-lg border border-base-300">
            <div class="card-body">
              <h3 class="card-title">
                Workout Streaks
              </h3>
              <div class="h-64 flex items-end justify-between gap-1">
                <div
                  v-for="(point, index) in streakChartData"
                  :key="index"
                  class="bg-secondary rounded-t"
                  :style="{ height: `${(point / Math.max(...streakChartData)) * 100}%`, width: '20px' }"
                />
              </div>
              <div class="flex justify-between text-xs text-base-content/70 mt-2">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span>Week 5</span>
                <span>Week 6</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Manual Data Entry -->
        <div class="card bg-base-100 shadow-lg border border-base-300">
          <div class="card-body">
            <h3 class="card-title">
              Update Progress
            </h3>
            <form
              class="grid md:grid-cols-2 gap-4"
              @submit.prevent="updateProgress"
            >
              <UiFormInput
                v-model="newProgress.weight"
                name="weight"
                label="Weight (kg)"
                type="number"
                placeholder="Enter current weight"
                :required="false"
              />
              <UiFormInput
                v-model="newProgress.muscleMass"
                name="muscleMass"
                label="Muscle Mass (%)"
                type="number"
                placeholder="Enter muscle mass percentage"
                :required="false"
              />
              <UiFormInput
                v-model="newProgress.bodyFat"
                name="bodyFat"
                label="Body Fat (%)"
                type="number"
                placeholder="Enter body fat percentage"
                :required="false"
              />
              <div class="flex items-end">
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                  Update Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Payments & Purchases -->
      <section
        v-if="activeTab === 'payments'"
        class="space-y-6"
      >
        <h2 class="text-3xl font-bold stretched-text scale-y-105">
          Payments & Purchases
        </h2>

        <!-- Active Subscriptions -->
        <div class="card bg-base-100 shadow-lg border border-base-300">
          <div class="card-body">
            <h3 class="card-title">
              Active Subscriptions
            </h3>
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Plan</th>
                    <th>Next Billing</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="subscription in subscriptions"
                    :key="subscription.id"
                  >
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="avatar">
                          <div class="w-8 h-8 rounded">
                            <NuxtImg
                              :src="subscription.icon"
                              :alt="subscription.service"
                              class="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        {{ subscription.service }}
                      </div>
                    </td>
                    <td>{{ subscription.plan }}</td>
                    <td>{{ formatDate(subscription.nextBilling) }}</td>
                    <td>${{ subscription.amount }}</td>
                    <td>
                      <button class="btn btn-outline btn-sm">
                        Manage
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Payment History -->
        <div class="card bg-base-100 shadow-lg border border-base-300">
          <div class="card-body">
            <h3 class="card-title">
              Payment History
            </h3>
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="payment in paymentHistory"
                    :key="payment.id"
                  >
                    <td>{{ formatDate(payment.date) }}</td>
                    <td>{{ payment.item }}</td>
                    <td>${{ payment.amount }}</td>
                    <td>
                      <div
                        :class="[
                          'badge',
                          {
                            'badge-success': payment.status === 'completed',
                            'badge-warning': payment.status === 'pending',
                            'badge-error': payment.status === 'failed',
                          },
                        ]"
                      >
                        {{ payment.status }}
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-ghost btn-sm">
                        Download Receipt
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- Profile & Settings -->
      <section
        v-if="activeTab === 'settings'"
        class="space-y-6"
      >
        <h2 class="text-3xl font-bold stretched-text scale-y-105">
          Profile & Settings
        </h2>

        <!-- Personal Information -->
        <div class="card bg-base-100 shadow-lg border border-base-300">
          <div class="card-body">
            <h3 class="card-title">
              Personal Information
            </h3>
            <form
              class="grid md:grid-cols-2 gap-4"
              @submit.prevent="updateProfile"
            >
              <UiFormInput
                v-model="profileForm.name"
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                :required="true"
              />
              <UiFormInput
                v-model="profileForm.email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                :required="true"
              />
              <UiFormInput
                v-model="profileForm.phone"
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                :required="false"
              />
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Gender</span>
                </label>
                <select
                  v-model="profileForm.gender"
                  class="select select-bordered"
                >
                  <option value="male">
                    Male
                  </option>
                  <option value="female">
                    Female
                  </option>
                  <option value="other">
                    Other
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Fitness Level</span>
                </label>
                <select
                  v-model="profileForm.fitnessLevel"
                  class="select select-bordered"
                >
                  <option value="beginner">
                    Beginner
                  </option>
                  <option value="intermediate">
                    Intermediate
                  </option>
                  <option value="advanced">
                    Advanced
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Date of Birth</span>
                </label>
                <input
                  v-model="profileForm.dateOfBirth"
                  type="date"
                  class="input input-bordered"
                >
              </div>
              <div class="md:col-span-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="card bg-base-100 shadow-lg border border-base-300">
          <div class="card-body">
            <h3 class="card-title">
              Security Settings
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-semibold">
                    Change Password
                  </h4>
                  <p class="text-sm text-base-content/70">
                    Update your password for better security
                  </p>
                </div>
                <button class="btn btn-outline">
                  Change Password
                </button>
              </div>
              <div class="divider" />
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-semibold">
                    Two-Factor Authentication
                  </h4>
                  <p class="text-sm text-base-content/70">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button class="btn btn-outline">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Preferences -->
        <div class="card bg-base-100 shadow-lg border border-base-300">
          <div class="card-body">
            <h3 class="card-title">
              Notification Preferences
            </h3>
            <div class="space-y-4">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">
                    Email Notifications
                  </span>
                  <input
                    v-model="notificationSettings.email"
                    type="checkbox"
                    class="toggle toggle-primary"
                  >
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">
                    SMS Notifications
                  </span>
                  <input
                    v-model="notificationSettings.sms"
                    type="checkbox"
                    class="toggle toggle-primary"
                  >
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">
                    Push Notifications
                  </span>
                  <input
                    v-model="notificationSettings.push"
                    type="checkbox"
                    class="toggle toggle-primary"
                  >
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">
                    Marketing Emails
                  </span>
                  <input
                    v-model="notificationSettings.marketing"
                    type="checkbox"
                    class="toggle toggle-primary"
                  >
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="card bg-base-100 shadow-lg border border-error">
          <div class="card-body">
            <h3 class="card-title text-error">
              Danger Zone
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-semibold">
                    Delete Account
                  </h4>
                  <p class="text-sm text-base-content/70">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button class="btn btn-error">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

definePageMeta({
  layout: "profile",
  middleware: ["sanctum:auth"],
});

const { success, error } = useToast();//

// Sample data for plans

// Progress tracking data
const progressStats = ref({
  weight: 75,
  muscleMass: 42,
  streak: 15,
  bodyFat: 18,
});

const weightChartData = ref([78, 77, 76, 75, 74, 75]);
const streakChartData = ref([3, 5, 7, 4, 6, 8]);

const newProgress = ref({
  weight: "",
  muscleMass: "",
  bodyFat: "",
});

// Notification settings
const notificationSettings = ref({
  email: true,
  sms: false,
  push: true,
  marketing: false,
});

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const editProfile = () => {
  activeTab.value = "settings";
};

const updateProfile = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    success("Profile updated successfully!");
  }
  catch {
    error("Failed to update profile. Please try again.");
  }
};

const updateProgress = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    success("Progress updated successfully!");
    // Reset form
    newProgress.value = {
      weight: "",
      muscleMass: "",
      bodyFat: "",
    };
  }
  catch {
    error("Failed to update progress. Please try again.");
  }
};

// Form validation schema
const profileSchema = toTypedSchema(
  yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    phone: yup.string(),
    gender: yup.string().required("Gender is required"),
    fitnessLevel: yup.string().required("Fitness level is required"),
    dateOfBirth: yup.date().required("Date of birth is required"),
  }),
);

const { errors: _profileErrors, handleSubmit: _handleProfileSubmit } = useForm({
  validationSchema: profileSchema,
});

// Use head for SEO
useHead({
  title: "Profile - Fitness Center",
  meta: [
    { name: "description", content: "Manage your fitness journey, track progress, and access your courses and sessions." },
  ],
});
</script>
