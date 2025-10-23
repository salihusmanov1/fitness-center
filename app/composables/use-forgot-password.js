import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export const useForgotPassword = () => {
  const schema = toTypedSchema(
    yup.object({
      email: yup.string().required("Email is required").email("Invalid email address"),
    }),
  );

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: schema,
  });

  const [email] = defineField("email");

  const isLoading = computed(() => useAuthStore().loading);
  const submitButtonText = computed(() => isLoading.value ? "Sending..." : "Send Reset Link");

  const { success, error } = useToast();
  const authStore = useAuthStore();

  const handleForgotPassword = handleSubmit(async (values) => {
    const { success: forgotPasswordSuccess, message } = await authStore.forgotPassword(values.email);
    if (forgotPasswordSuccess) {
      success(message);
    }
    else {
      error(message);
    }
  });

  return {
    email,
    errors,
    isLoading,
    submitButtonText,
    handleForgotPassword,
  };
};
