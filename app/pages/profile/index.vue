<template>
  <section class="my-8">
    <div class="text-center mb-8">
      <h2 class="sm:text-5xl text-3xl font-bold stretched-text tracking-tighter scale-y-105 italic mb-4">
        MY SESSIONS
      </h2>
    </div>

    <ProfileSessionsSortControls
      v-model:sort-by-date="sortByDate"
      v-model:sort-by-status="sortByStatus"
    />

    <div
      class="space-y-4 h-[calc(100vh-200px)] overflow-y-auto mt-4 transition-all duration-300"
      :class="{ 'inset-shadow-sm inset-shadow-primary/50': isScrollingDown }"
      @scroll="handleScroll"
    >
      <ProfileSessionsCard
        v-for="session in sortedSessions"
        :key="session.id"
        :session="session"
      />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "profile",
  middleware: ["sanctum:auth"],
});

const sortByDate = ref("date-desc");
const sortByStatus = ref("all");
const isScrollingDown = ref(false);

const sessions = ref([
  {
    id: 1,
    trainer: {
      name: "Alex Thompson",
      specialty: "Personal Training",
      avatar: "/pr-session.jpg",
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
      avatar: "/pr-session.jpg",
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
      avatar: "/pr-session.jpg",
    },
    date: "2024-01-08",
    time: "6:00 PM",
    status: "cancelled",
  },
  {
    id: 4,
    trainer: {
      name: "Sarah Johnson",
      specialty: "Pilates",
      avatar: "/pr-session.jpg",
    },
    date: "2024-01-20",
    time: "9:00 AM",
    status: "upcoming",
  },
  {
    id: 5,
    trainer: {
      name: "Mike Wilson",
      specialty: "CrossFit",
      avatar: "/pr-session.jpg",
    },
    date: "2024-01-05",
    time: "7:00 PM",
    status: "completed",
  },
  {
    id: 6,
    trainer: {
      name: "Emma Davis",
      specialty: "HIIT Training",
      avatar: "/pr-session.jpg",
    },
    date: "2024-01-12",
    time: "5:30 PM",
    status: "pending",
  },
  {
    id: 7,
    trainer: {
      name: "James Brown",
      specialty: "Boxing",
      avatar: "/pr-session.jpg",
    },
    date: "2024-01-18",
    time: "8:00 AM",
    status: "in-progress",
  },
  {
    id: 8,
    trainer: {
      name: "Lisa Chen",
      specialty: "Swimming",
      avatar: "/pr-session.jpg",
    },
    date: "2024-01-03",
    time: "3:00 PM",
    status: "cancelled",
  },
]);

const sortedSessions = computed(() => {
  let sessionsCopy = [...sessions.value];

  if (sortByStatus.value !== "all") {
    sessionsCopy = sessionsCopy.filter(session => session.status === sortByStatus.value);
  }

  switch (sortByDate.value) {
    case "date-asc":
      return sessionsCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "date-desc":
      return sessionsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
    default:
      return sessionsCopy;
  }
});

const handleScroll = (event) => {
  const scrollTop = event.target.scrollTop;
  isScrollingDown.value = scrollTop > 0;
};
</script>

<style lang="scss" scoped>

</style>
