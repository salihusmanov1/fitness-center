import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

export const useRegister = () => {
  const schema = toTypedSchema(
    yup.object({
      email: yup.string().required("Email is required").email("Invalid email address"),
      name: yup.string().required("First name is required"),
      surname: yup.string().required("Last name is required"),
      phone: yup.string().required("Phone number is required"),
      password: yup.string().required("Password is required"),
      repeated_password: yup.string().required("Confirm password is required").oneOf([yup.ref("password"), null], "Passwords must match"),
      agreeToTerms: yup.boolean().required("You must agree to the terms and conditions"),
    }),
  );

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: schema,
  });

  const [email] = defineField("email");
  const [name] = defineField("name");
  const [surname] = defineField("surname");
  const [phone] = defineField("phone");
  const [password] = defineField("password");
  const [repeated_password] = defineField("repeated_password");
  const [agreeToTerms] = defineField("agreeToTerms");

  const isLoading = computed(() => useAuthStore().loading);
  const isSubmitDisabled = computed(() => isLoading.value || !agreeToTerms.value);
  const submitButtonText = computed(() => isLoading.value ? "Creating account..." : "Create Account");

  const authStore = useAuthStore();

  const handleRegister = handleSubmit(async (values) => {
    await authStore.signup(values);
  });

  const handleSocialRegister = async (provider) => {
    try {
      await authStore.socialRegister(provider);
    }
    catch (err) {
      console.error(`Failed to register with ${provider}:`, err);
    }
  };

  return {
    email,
    name,
    surname,
    phone,
    password,
    repeated_password,
    agreeToTerms,

    errors,
    isLoading,
    isSubmitDisabled,
    submitButtonText,

    handleRegister,
    handleSocialRegister,
  };
};
