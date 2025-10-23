<template>
  <div>
    <div class="flex items-center justify-between mb-6 ">
      <button
        class="btn-sm cursor-pointer hover:bg-transparent hover:text-gray-400 transition-colors duration-200"
        aria-label="Previous month"
        @click="previousMonth"
      >
        <Icon
          name="bx:chevron-left"
          size="28px"
        />
      </button>

      <h2 class="text-xl">
        {{ currentMonthYear }}
      </h2>

      <button
        class="btn-sm cursor-pointer hover:bg-transparent hover:text-gray-400 transition-colors duration-200"
        aria-label="Next month"
        @click="nextMonth"
      >
        <Icon
          name="bx:chevron-right"
          size="28px"
        />
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
        v-for="day in dayHeaders"
        :key="day"
        class="text-center text-sm font-semibold text-base-content py-2 stretched-text scale-y-105"
      >
        {{ day }}
      </div>
    </div>
    <div class="grid grid-cols-7 gap-1">
      <div
        v-for="day in calendarDays"
        :key="`${day.date}-${day.month}`"
      >
        <button
          v-if="day.isCurrentMonth"
          :class="[
            'btn border-0 w-full h-12 transition-all text-lg duration-200 stretched-text scale-y-105 flex flex-col items-center justify-start leading-none py-2',
            {
              'btn-primary text-white': day.isSelected,
              'btn-ghost hover:bg-primary hover:text-white': !day.isSelected && day.isCurrentMonth,
              'btn-disabled opacity-30': !day.isCurrentMonth,
              'btn-primary btn-outline text-primary': day.isToday && !day.isSelected,
              'text-primary': !day.isWeekend,
            },
          ]"
          :disabled="!day.isCurrentMonth"
          :aria-label="`Select ${day.date} ${getMonthName(day.month)} ${currentYear}`"
          @click="selectDate(day)"
        >
          <span>{{ day.date }}</span>
          <Icon
            v-if="!day.isWeekend"
            aria-hidden="true"
            name="icon-park-outline:dot"
            size="6px"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedDate: {
    type: Date,
    default: null,
  },
});

const selectedDate = ref(props.selectedDate ? props.selectedDate : new Date());

const emit = defineEmits(["update:modelValue"]);

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());

const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const currentMonthYear = computed(() => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${monthNames[currentMonth.value]} ${currentYear.value}`;
});

const calendarDays = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];

  const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
  const prevYear = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;

  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(prevYear, prevMonth, new Date(prevYear, prevMonth + 1, 0).getDate() - i);
    days.push({
      date: date.getDate(),
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear.value, currentMonth.value, day);
    const isToday = day === currentDate.getDate()
      && currentMonth.value === currentDate.getMonth()
      && currentYear.value === currentDate.getFullYear();

    const isSelected = selectedDate.value
      && day === selectedDate.value.getDate()
      && currentMonth.value === selectedDate.value.getMonth()
      && currentYear.value === selectedDate.value.getFullYear();

    days.push({
      date: day,
      month: currentMonth.value,
      year: currentYear.value,
      isCurrentMonth: true,
      isToday,
      isSelected,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }

  return days;
});

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
  else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
  else {
    currentMonth.value++;
  }
};

const selectDate = (day) => {
  if (!day.isCurrentMonth) return;

  const selected = new Date(day.year, day.month, day.date);
  selectedDate.value = selected;
  emit("update:modelValue", selected);
};

const getMonthName = (monthIndex) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return monthNames[monthIndex];
};
</script>

<style scoped>

</style>
