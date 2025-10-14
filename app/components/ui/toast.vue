<template>
  <div class="toast toast-end toast-center">
    <TransitionGroup
      name="toast"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'alert stretched-text text-lg text-white flex justify-between items-center transition-all duration-300',
          toastTypes[toast.type],
        ]"
      >
        <span>{{ toast.message }}</span>

        <button
          v-if="toast.config.closable"
          class="cursor-pointer flex items-center justify-center"
          @click="removeToast(toast.id)"
        >
          <Icon
            name="mdi:close"
            size="16px"
          />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const { toasts, removeToast, toastTypes } = useToast();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
