import { ref } from "vue";

const toasts = ref([]);
let toastId = 0;

const toastTypes = {
  success: "alert-success",
  error: "alert-error",
  warning: "alert-warning",
  info: "alert-info",
};

const defaultConfig = {
  duration: 5000,
  closable: true,
  position: "top-end",
};

export const useToast = () => {
  const addToast = (message, type = "info", config = {}) => {
    const id = ++toastId;
    const toastConfig = { ...defaultConfig, ...config };

    const toast = {
      id,
      message,
      type,
      config: toastConfig,
      visible: true,
    };

    toasts.value.push(toast);

    if (toastConfig.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toastConfig.duration);
    }

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearAll = () => {
    toasts.value = [];
  };

  const success = (message, config = {}) => addToast(message, "success", config);
  const error = (message, config = {}) => addToast(message, "error", config);
  const warning = (message, config = {}) => addToast(message, "warning", config);
  const info = (message, config = {}) => addToast(message, "info", config);

  const promise = async (promise, messages = {}) => {
    const loadingId = addToast(messages.loading || "Loading...", "info", { duration: 0 });

    try {
      const result = await promise;
      removeToast(loadingId);
      addToast(messages.success || "Operation completed successfully", "success");
      return result;
    }
    catch (error) {
      removeToast(loadingId);
      addToast(messages.error || error.message || "An error occurred", "error");
      throw error;
    }
  };

  return {
    toasts: readonly(toasts),

    addToast,
    removeToast,
    clearAll,

    success,
    error,
    warning,
    info,
    promise,

    toastTypes,
  };
};
