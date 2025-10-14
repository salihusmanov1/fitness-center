<template>
  <div class="min-h-screen bg-base-100">
    <!-- Profile Header -->
    <section class="h-[380px] text-center flex flex-col items-center gap-4 justify-center px-4 bg-gradient-to-b from-primary/10 to-base-100">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col items-center gap-6">
          <div class="avatar">
            <div class="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
              <NuxtImg
                :src="userProfile.avatar || '/default-avatar.jpg'"
                alt="Profile Picture"
                class="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div class="text-center">
            <h1 class="sm:text-6xl text-4xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-4">
              {{ userProfile.name || "JOHN DOE" }}
            </h1>
            <p class="sm:text-lg/8 text-base/8 text-gray-500 mb-4">
              {{ userProfile.email || "john.doe@example.com" }}
            </p>
            <div class="flex flex-wrap gap-3 justify-center mb-6">
              <div class="badge badge-primary badge-lg">
                {{ userProfile.fitnessLevel || "Intermediate" }}
              </div>
              <div class="badge badge-outline badge-lg">
                Member since {{ userProfile.joinDate || "Jan 2024" }}
              </div>
            </div>
            <button
              class="btn btn-primary btn-lg stretched-text"
              @click="editProfile"
            >
              <Icon
                name="mdi:edit"
                size="20px"
              />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <section class="sticky top-0 z-10 shadow-sm border-b border-base-300">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div
          role="tablist"
          class="tabs tabs-lift tabs-lg overflow-x-auto"
        >
          <a
            v-for="tab in tabs"
            :key="tab.id"
            role="tab"
            :aria-controls="tab.id"
            :aria-selected="activeTab === tab.id"
            :class="[
              'tab tab-lg whitespace-nowrap items-center justify-center gap-2',
              { 'tab-active': activeTab === tab.id },
            ]"
            @click="activeTab = tab.id"
          >
            <Icon
              :name="tab.icon"
              size="18px"
            />
            <span class="hidden sm:inline">{{ tab.label }}</span>
            <span class="sm:hidden">{{ tab.shortLabel || tab.label.split(' ')[0] }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Tab Content -->
    <main class="max-w-6xl mx-auto px-4 py-10">
      <!-- My Courses -->
      <section
        v-if="activeTab === 'courses'"
        class="space-y-8"
      >
        <div class="text-center mb-8">
          <h2 class="sm:text-5xl text-3xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-4">
            MY COURSES
          </h2>
          <p class="sm:text-lg/8 text-base/8 text-gray-500 max-w-2xl mx-auto">
            Continue your fitness journey with our comprehensive video courses. Track your progress and achieve your goals.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div class="flex flex-wrap gap-3">
            <select
              v-model="courseFilter"
              class="select select-bordered select-sm"
            >
              <option value="all">
                All Categories
              </option>
              <option value="strength">
                Strength Training
              </option>
              <option value="cardio">
                Cardio
              </option>
              <option value="yoga">
                Yoga
              </option>
            </select>
            <select
              v-model="courseStatus"
              class="select select-bordered select-sm"
            >
              <option value="all">
                All Status
              </option>
              <option value="in-progress">
                In Progress
              </option>
              <option value="completed">
                Completed
              </option>
              <option value="not-started">
                Not Started
              </option>
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="course in filteredCourses"
            :key="course.id"
            class="card border border-gray-300 hover:shadow-xl transition-shadow duration-300"
          >
            <figure class="relative">
              <NuxtImg
                :src="course.thumbnail"
                :alt="course.title"
                class="w-full h-[200px] object-cover"
              />
              <div class="absolute top-4 right-4">
                <div
                  :class="[
                    'badge badge-lg',
                    {
                      'badge-success': course.status === 'completed',
                      'badge-warning': course.status === 'in-progress',
                      'badge-neutral': course.status === 'not-started',
                    },
                  ]"
                >
                  {{ course.status.replace('-', ' ') }}
                </div>
              </div>
            </figure>
            <div class="card-body pt-6">
              <h3 class="card-title stretched-text tracking-tighter scale-y-105 italic text-xl mb-2">
                {{ course.title }}
              </h3>
              <p class="text-sm text-gray-500 mb-4">
                {{ course.instructor }}
              </p>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Progress</span>
                  <span class="font-bold">{{ course.progress }}%</span>
                </div>
                <progress
                  :value="course.progress"
                  max="100"
                  :class="[
                    'progress w-full h-2',
                    {
                      'progress-success': course.progress === 100,
                      'progress-primary': course.progress > 0 && course.progress < 100,
                      'progress-base-300': course.progress === 0,
                    },
                  ]"
                />
              </div>
              <div class="card-actions justify-end">
                <button
                  v-if="course.status === 'in-progress'"
                  class="btn btn-primary btn-block stretched-text"
                >
                  Continue Watching
                </button>
                <button
                  v-else-if="course.status === 'not-started'"
                  class="btn btn-outline btn-block stretched-text"
                >
                  Start Course
                </button>
                <button
                  v-else
                  class="btn btn-ghost btn-block stretched-text"
                >
                  Review Course
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- My Challenges -->
      <section
        v-if="activeTab === 'challenges'"
        class="space-y-8"
      >
        <div class="text-center mb-8">
          <h2 class="sm:text-5xl text-3xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-4">
            MY CHALLENGES
          </h2>
          <p class="sm:text-lg/8 text-base/8 text-gray-500 max-w-2xl mx-auto">
            Push your limits and achieve your fitness goals with our exciting challenges. Track your progress and earn rewards.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="challenge in challenges"
            :key="challenge.id"
            class="card border border-gray-300 hover:shadow-xl transition-shadow duration-300"
          >
            <figure class="relative">
              <NuxtImg
                :src="challenge.image"
                :alt="challenge.name"
                class="w-full h-[200px] object-cover object-bottom"
              />
              <div class="absolute top-4 right-4">
                <div
                  :class="[
                    'badge badge-lg',
                    {
                      'badge-success': challenge.status === 'completed',
                      'badge-warning': challenge.status === 'active',
                      'badge-neutral': challenge.status === 'upcoming',
                    },
                  ]"
                >
                  {{ challenge.status }}
                </div>
              </div>
            </figure>
            <div class="card-body pt-6">
              <h3 class="card-title stretched-text tracking-tighter scale-y-105 italic text-xl mb-2">
                {{ challenge.name }}
              </h3>
              <p class="text-sm text-gray-500 mb-4">
                {{ challenge.duration }}
              </p>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Progress</span>
                  <span class="font-bold">{{ challenge.progress }}/{{ challenge.totalDays }} days</span>
                </div>
                <progress
                  :value="challenge.progress"
                  :max="challenge.totalDays"
                  :class="[
                    'progress w-full h-2',
                    {
                      'progress-success': challenge.status === 'completed',
                      'progress-primary': challenge.status === 'active',
                      'progress-base-300': challenge.status === 'upcoming',
                    },
                  ]"
                />
              </div>
              <div
                v-if="challenge.rewards.length > 0"
                class="mb-4"
              >
                <div class="flex gap-2">
                  <Icon
                    v-for="reward in challenge.rewards"
                    :key="reward"
                    :name="reward"
                    size="20px"
                    class="text-warning"
                  />
                </div>
              </div>
              <div class="card-actions justify-end">
                <button
                  v-if="challenge.status === 'active'"
                  class="btn btn-primary btn-block stretched-text"
                >
                  Continue Challenge
                </button>
                <button
                  v-else-if="challenge.status === 'upcoming'"
                  class="btn btn-outline btn-block stretched-text"
                >
                  View Details
                </button>
                <button
                  v-else
                  class="btn btn-ghost btn-block stretched-text"
                >
                  View Results
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- My Sessions -->
      <section
        v-if="activeTab === 'sessions'"
        class="space-y-8"
      >
        <div class="text-center mb-8">
          <h2 class="sm:text-5xl text-3xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-4">
            MY SESSIONS
          </h2>
          <p class="sm:text-lg/8 text-base/8 text-gray-500 max-w-2xl mx-auto">
            Manage your personal training sessions with our certified trainers. Book, reschedule, or view your session history.
          </p>
        </div>

        <div class="flex justify-center mb-8">
          <button class="btn btn-primary btn-lg stretched-text">
            <Icon
              name="mdi:plus"
              size="20px"
            />
            Book New Session
          </button>
        </div>

        <div class="space-y-6">
          <article
            v-for="session in sessions"
            :key="session.id"
            class="card border border-gray-300 hover:shadow-xl transition-shadow duration-300"
          >
            <div class="card-body">
              <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div class="flex items-center gap-6">
                  <div class="avatar">
                    <div class="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <NuxtImg
                        :src="session.trainer.avatar"
                        :alt="session.trainer.name"
                        class="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-2">
                      {{ session.trainer.name }}
                    </h3>
                    <p class="text-gray-500 mb-2">
                      {{ session.trainer.specialty }}
                    </p>
                    <div class="flex items-center gap-2">
                      <Icon
                        name="mdi:calendar"
                        size="16px"
                        class="text-primary"
                      />
                      <span class="text-sm font-medium">
                        {{ formatDate(session.date) }} at {{ session.time }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                  <div
                    :class="[
                      'badge badge-lg',
                      {
                        'badge-success': session.status === 'completed',
                        'badge-warning': session.status === 'upcoming',
                        'badge-error': session.status === 'cancelled',
                      },
                    ]"
                  >
                    {{ session.status }}
                  </div>
                  <div class="flex gap-2">
                    <button
                      v-if="session.status === 'upcoming'"
                      class="btn btn-outline btn-sm"
                    >
                      Reschedule
                    </button>
                    <button
                      v-if="session.status === 'upcoming'"
                      class="btn btn-error btn-sm"
                    >
                      Cancel
                    </button>
                    <button
                      v-if="session.status === 'completed'"
                      class="btn btn-ghost btn-sm"
                    >
                      View Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- My Plans -->
      <section
        v-if="activeTab === 'plans'"
        class="space-y-6"
      >
        <h2 class="text-3xl font-bold stretched-text scale-y-105">
          My Plans
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <article
            v-for="plan in plans"
            :key="plan.id"
            class="card bg-base-100 shadow-lg border border-base-300"
          >
            <div class="card-body">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-semibold stretched-text scale-y-105">
                  {{ plan.name }}
                </h3>
                <div
                  :class="[
                    'badge',
                    {
                      'badge-success': plan.status === 'active',
                      'badge-error': plan.status === 'expired',
                    },
                  ]"
                >
                  {{ plan.status }}
                </div>
              </div>
              <p class="text-sm text-base-content/70 mb-4">
                {{ plan.description }}
              </p>
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span>Duration</span>
                  <span>{{ plan.duration }} days</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span>{{ plan.remainingDays }} days</span>
                </div>
                <progress
                  :value="plan.completedDays"
                  :max="plan.duration"
                  class="progress progress-primary w-full"
                />
              </div>
              <div class="card-actions justify-end">
                <button class="btn btn-outline btn-sm">
                  View Details
                </button>
                <button
                  v-if="plan.status === 'active'"
                  class="btn btn-primary btn-sm"
                >
                  Download Plan
                </button>
                <button
                  v-if="plan.status === 'expired'"
                  class="btn btn-secondary btn-sm"
                >
                  Renew Plan
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

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
});

const { success, error } = useToast();

// Reactive data
const activeTab = ref("courses");
const courseFilter = ref("all");
const courseStatus = ref("all");

// Navigation tabs
const tabs = [
  { id: "courses", label: "My Courses", shortLabel: "Courses", icon: "mdi:play-circle" },
  { id: "challenges", label: "My Challenges", shortLabel: "Challenges", icon: "mdi:trophy" },
  { id: "sessions", label: "My Sessions", shortLabel: "Sessions", icon: "mdi:account-group" },
  { id: "plans", label: "My Plans", shortLabel: "Plans", icon: "mdi:file-document" },
  { id: "progress", label: "Progress", shortLabel: "Progress", icon: "mdi:chart-line" },
  { id: "payments", label: "Payments", shortLabel: "Payments", icon: "mdi:credit-card" },
  { id: "settings", label: "Settings", shortLabel: "Settings", icon: "mdi:cog" },
];

// User profile data
const userProfile = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/default-avatar.jpg",
  fitnessLevel: "Intermediate",
  joinDate: "Jan 2024",
});

// Sample data for courses
const courses = ref([
  {
    id: 1,
    title: "Complete Strength Training",
    instructor: "Mike Johnson",
    thumbnail: "/strength-course.jpg",
    category: "strength",
    status: "in-progress",
    progress: 65,
  },
  {
    id: 2,
    title: "Cardio Blast Workout",
    instructor: "Sarah Wilson",
    thumbnail: "/cardio-course.jpg",
    category: "cardio",
    status: "completed",
    progress: 100,
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    instructor: "Emma Davis",
    thumbnail: "/yoga-course.jpg",
    category: "yoga",
    status: "not-started",
    progress: 0,
  },
]);

// Sample data for challenges
const challenges = ref([
  {
    id: 1,
    name: "30-Day Push Up Challenge",
    image: "/push-ups-challenge.jpg",
    duration: "30 Days",
    status: "active",
    progress: 12,
    totalDays: 30,
    rewards: ["mdi:trophy", "mdi:medal"],
  },
  {
    id: 2,
    name: "Flat Abs Challenge",
    image: "/abs-challenge.jpg",
    duration: "8 Weeks",
    status: "completed",
    progress: 56,
    totalDays: 56,
    rewards: ["mdi:trophy", "mdi:medal", "mdi:star"],
  },
  {
    id: 3,
    name: "Total Workout Challenge",
    image: "/pr-session.jpg",
    duration: "6 Weeks",
    status: "upcoming",
    progress: 0,
    totalDays: 42,
    rewards: [],
  },
]);

// Sample data for sessions
const sessions = ref([
  {
    id: 1,
    trainer: {
      name: "Alex Thompson",
      specialty: "Personal Training",
      avatar: "/trainer-1.jpg",
    },
    date: "2024-01-15",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: 2,
    trainer: {
      name: "Maria Garcia",
      specialty: "Yoga Instructor",
      avatar: "/trainer-2.jpg",
    },
    date: "2024-01-10",
    time: "2:00 PM",
    status: "completed",
  },
  {
    id: 3,
    trainer: {
      name: "David Lee",
      specialty: "Strength Training",
      avatar: "/trainer-3.jpg",
    },
    date: "2024-01-08",
    time: "6:00 PM",
    status: "cancelled",
  },
]);

// Sample data for plans
const plans = ref([
  {
    id: 1,
    name: "30-Day Fat Burn Plan",
    description: "Comprehensive fat burning workout and nutrition plan",
    duration: 30,
    completedDays: 18,
    remainingDays: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Muscle Building Program",
    description: "Advanced strength training program for muscle growth",
    duration: 60,
    completedDays: 60,
    remainingDays: 0,
    status: "expired",
  },
]);

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

// Payment data
const subscriptions = ref([
  {
    id: 1,
    service: "Premium Membership",
    plan: "Monthly",
    nextBilling: "2024-02-15",
    amount: 29.99,
    icon: "/membership-icon.jpg",
  },
  {
    id: 2,
    service: "Personal Training",
    plan: "Weekly",
    nextBilling: "2024-01-20",
    amount: 80.00,
    icon: "/training-icon.jpg",
  },
]);

const paymentHistory = ref([
  {
    id: 1,
    date: "2024-01-15",
    item: "Premium Membership",
    amount: 29.99,
    status: "completed",
  },
  {
    id: 2,
    date: "2024-01-10",
    item: "Personal Training Session",
    amount: 80.00,
    status: "completed",
  },
  {
    id: 3,
    date: "2024-01-05",
    item: "Yoga Course",
    amount: 49.99,
    status: "completed",
  },
]);

// Profile form
const profileForm = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  gender: "male",
  fitnessLevel: "intermediate",
  dateOfBirth: "1990-05-15",
});

// Notification settings
const notificationSettings = ref({
  email: true,
  sms: false,
  push: true,
  marketing: false,
});

// Computed properties
const filteredCourses = computed(() => {
  return courses.value.filter((course) => {
    const categoryMatch = courseFilter.value === "all" || course.category === courseFilter.value;
    const statusMatch = courseStatus.value === "all" || course.status === courseStatus.value;
    return categoryMatch && statusMatch;
  });
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
