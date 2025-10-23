<template>
  <div
    class="join"
    role="group"
    aria-label="Pagination Navigation"
  >
    <template
      v-for="(i, idx) in range"
      :key="typeof i === 'number' ? `page-${i}` : `ellipsis-${idx}`"
    >
      <button
        class="join-item btn btn-ghost"
        :class="{ 'btn-active': current === i }"
        :disabled="i === '...' || loading"
        :aria-label="i === '...' ? 'More pages' : `Go to page ${i}`"
        :aria-current="current === i ? 'page' : undefined"
        @click="i !== '...' && emits('update:current', i)"
      >
        {{ i }}
      </button>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  total: {
    type: Number,
    default: 1,
  },
  current: {
    type: Number,
    default: 1,
  },
  last: {
    type: Number,
    default: 1,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:current"]);

const range = computed(() => {
  const pages = [];
  const totalPages = props.last;
  const currentPage = props.current;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }
  else {
    pages.push(1);

    if (currentPage <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
    else if (currentPage >= totalPages - 3) {
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    else {
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return pages;
});
</script>

<style lang="scss" scoped>

</style>
