<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">
      Toast Controller Demo
    </h1>

    <div class="grid grid-cols-2 gap-4 max-w-md">
      <button
        class="btn btn-success"
        @click="showSuccessToast"
      >
        Success Toast
      </button>

      <button
        class="btn btn-error"
        @click="showErrorToast"
      >
        Error Toast
      </button>

      <button
        class="btn btn-warning"
        @click="showWarningToast"
      >
        Warning Toast
      </button>

      <button
        class="btn btn-info"
        @click="showInfoToast"
      >
        Info Toast
      </button>

      <button
        class="btn btn-outline"
        @click="showPersistentToast"
      >
        Persistent Toast
      </button>

      <button
        class="btn btn-outline"
        @click="testPromiseToast"
      >
        Promise Toast
      </button>

      <button
        class="btn btn-outline"
        @click="showMultipleToasts"
      >
        Multiple Toasts
      </button>

      <button
        class="btn btn-outline"
        @click="clearAllToasts"
      >
        Clear All
      </button>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">
        Usage Examples:
      </h2>
      <div class="bg-base-200 p-4 rounded-lg">
        <pre class="text-sm"><code>// Basic usage
const { success, error, warning, info } = useToast();

success("Operation completed successfully!");
error("Something went wrong!");
warning("Please check your input!");
info("New information available!");

// With custom configuration
success("Custom toast", { duration: 10000, closable: false });

// Promise-based toasts
const { promise } = useToast();
await promise(
  fetch('/api/data'),
  {
    loading: "Loading data...",
    success: "Data loaded successfully!",
    error: "Failed to load data"
  }
);</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const { success, error, warning, info, promise, clearAll } = useToast();

const showSuccessToast = () => {
  success("Operation completed successfully!");
};

const showErrorToast = () => {
  error("Something went wrong! Please try again.");
};

const showWarningToast = () => {
  warning("Please check your input before proceeding.");
};

const showInfoToast = () => {
  info("New information is available for you.");
};

const showPersistentToast = () => {
  info("This toast won't auto-dismiss", { duration: 0 });
};

const testPromiseToast = async () => {
  try {
    await promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve("Success!") : reject(new Error("Random failure"));
        }, 2000);
      }),
      {
        loading: "Processing your request...",
        success: "Request processed successfully!",
        error: "Request failed. Please try again.",
      },
    );
  }
  catch (error) {
    // Error is already handled by the promise toast
  }
};

const showMultipleToasts = () => {
  success("First toast");
  setTimeout(() => error("Second toast"), 500);
  setTimeout(() => warning("Third toast"), 1000);
  setTimeout(() => info("Fourth toast"), 1500);
};

const clearAllToasts = () => {
  clearAll();
};
</script>
