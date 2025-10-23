import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export const useLogin = () => {
  const schema = toTypedSchema(
    yup.object({
      email: yup.string().required("Email is required").email("Invalid email address"),
      password: yup.string().required("Password is required"),
    }),
  );

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: schema,
  });

  const [email] = defineField("email");
  const [password] = defineField("password");
  const [rememberMe] = defineField("rememberMe");

  const isLoading = computed(() => useAuthStore().loading);
  const submitButtonText = computed(() => isLoading.value ? "Signing in..." : "Sign In");

  const { success, error } = useToast();
  const authStore = useAuthStore();

  const handleLogin = handleSubmit(async (values) => {
    const { success: loginSuccess, message } = await authStore.login(values);
    if (loginSuccess) {
      success(message);
    }
    else {
      error(message);
    }
  });

  // const handleSocialLogin = async (provider) => {
  //   try {
  //     await authStore.socialLogin(provider);
  //   }
  //   catch (err) {
  //     error(`Failed to login with ${provider}`);
  //   }
  // };

  return {
    email,
    password,
    rememberMe,

    errors,
    isLoading,
    submitButtonText,

    handleLogin,
  };
};
