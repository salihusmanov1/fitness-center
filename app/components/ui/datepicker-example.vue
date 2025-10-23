<template>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-base-content">
      Datepicker Examples
    </h2>

    <div class="space-y-6">
      <!-- Basic Datepicker -->
      <div>
        <h3 class="text-lg font-semibold mb-3">
          Basic Datepicker
        </h3>
        <UiDatepicker
          v-model="basicDate"
          name="basic-date"
          label="Select Date"
          placeholder="Choose a date"
        />
        <p class="text-sm text-base-content/60 mt-2">
          Selected: {{ basicDate || 'None' }}
        </p>
      </div>

      <!-- Required Datepicker -->
      <div>
        <h3 class="text-lg font-semibold mb-3">
          Required Datepicker
        </h3>
        <UiDatepicker
          v-model="requiredDate"
          name="required-date"
          label="Required Date"
          placeholder="Choose a date"
          :required="true"
          :error="requiredError"
        />
      </div>

      <!-- With Manual Input -->
      <div>
        <h3 class="text-lg font-semibold mb-3">
          With Manual Input
        </h3>
        <UiDatepicker
          v-model="manualDate"
          name="manual-date"
          label="Manual Input Enabled"
          placeholder="Type or select date"
          :allow-manual-input="true"
        />
        <p class="text-sm text-base-content/60 mt-2">
          Selected: {{ manualDate || 'None' }}
        </p>
      </div>

      <!-- Custom Format -->
      <div>
        <h3 class="text-lg font-semibold mb-3">
          Custom Format
        </h3>
        <UiDatepicker
          v-model="customDate"
          name="custom-date"
          label="Custom Format"
          placeholder="Choose a date"
          format="DD/MM/YYYY"
          display-format="DD MMMM YYYY"
        />
        <p class="text-sm text-base-content/60 mt-2">
          Selected: {{ customDate || 'None' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const basicDate = ref(null);
const requiredDate = ref(null);
const manualDate = ref(null);
const customDate = ref(null);

const requiredError = computed(() => {
  return requiredDate.value ? "" : "This field is required";
});
</script>
