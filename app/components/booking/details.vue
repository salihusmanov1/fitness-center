<template>
  <div>
    <div class="border-b border-base-content pb-2 mb-4">
      <p class="text-xl">
        Booking Details
      </p>
    </div>
    <div class="font-light">
      <p class="text-base">
        {{ sessionDetails.name }}
      </p>
      <p>
        {{ sessionDetails.date }} - {{ sessionDetails.time }}
      </p>

      <div class="mt-2  text-primary">
        <p>San Francisco</p>
        <p>{{ sessionDetails.staffMember }}</p>
        <p>{{ sessionDetails.duration }}</p>
      </div>

      <p>
        Payment Details
      </p>
      <div class="mt-4 flex justify-between">
        <p>
          Total
        </p>
        <p class="">
          {{ sessionDetails.price }}
        </p>
      </div>

      <button
        class="btn btn-primary btn-block my-10"
        @click="emits('navigateNext')"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sessionDetails: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["navigateNext"]);
</script>

<style lang="scss" scoped>

</style>
