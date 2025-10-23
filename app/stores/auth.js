import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth-store", () => {
  const loading = ref(false);
  const token = useCookie("token");

  const { login: sanctumAuthLogin, user, logout: sanctumAuthLogout, refreshIdentity } = useSanctumAuth();
  const client = useSanctumClient();

  const login = async (credentials) => {
    loading.value = true;
    try {
      await sanctumAuthLogin(credentials);
      loading.value = false;
      return { success: true, message: "Welcome back! You've logged in successfully." };
    }
    catch (error) {
      loading.value = false;
      return {
        success: false,
        message: error?.data?.error || error?.message || "Login failed. Please try again.",
      };
    }
  };

  const signup = async (credentials) => {
    loading.value = true;
    try {
      await client("/api/register",
        {
          method: "POST",
          body: { ...credentials },
        });
      loading.value = false;
      return { success: true, res: "Welcome! You've signed up successfully. Please log in now to continue." };
    }
    catch (error) {
      loading.value = false;
      return {
        success: false,
        res: error?.data?.message || "Sign up failed. Please try again.",
      };
    }
  };

  const logout = async () => {
    loading.value = true;
    try {
      await sanctumAuthLogout();
      token.value = null;
      loading.value = false;
      return { success: true, message: "Successfully logged out" };
    }
    catch (error) {
      loading.value = false;
      return {
        success: false,
        message: error?.data?.error || error?.response?.data?.message || "Something went wrong. Please try again.",
      };
    }
  };

  const forgotPassword = async (email) => {
    loading.value = true;
    try {
      await client("/api/forgot-password",
        {
          method: "POST",
          body: { email },
        });
      loading.value = false;
      return { success: true, message: "Password reset link has been sent to your email address." };
    }
    catch (error) {
      loading.value = false;
      return {
        success: false,
        message: error?.data?.message || "Failed to send password reset email. Please try again.",
      };
    }
  };

  //   const resetPassword = async (data) => {
  //     loading.value = true;
  //     try {
  //       await client("/api/reset-password", {
  //         method: "POST",
  //         body: data,
  //       });
  //       loading.value = false;
  //       return {
  //         success: true,
  //         message: "Password has been reset successfully. Please log in with your new password.",
  //       };
  //     }
  //     catch (error) {
  //       loading.value = false;
  //       return {
  //         success: false,
  //         message: error?.data?.message || error?.response?.data?.message || "Failed to reset password. Please try again.",
  //       };
  //     }
  //   };

  const socialLogin = async (provider) => {
    loading.value = true;
    try {
      // Implement social login logic here
      // This would typically redirect to OAuth provider or make API call
      console.log(`Social login with ${provider}`);
      loading.value = false;
      return { success: true, message: `Successfully logged in with ${provider}` };
    }
    catch (error) {
      loading.value = false;
      return {
        success: false,
        message: error?.data?.error || error?.message || `Failed to login with ${provider}`,
      };
    }
  };

  const socialRegister = async (provider) => {
    loading.value = true;
    try {
      // Implement social registration logic here
      // This would typically redirect to OAuth provider or make API call
      console.log(`Social registration with ${provider}`);
      loading.value = false;
      return { success: true, message: `Successfully registered with ${provider}` };
    }
    catch (error) {
      loading.value = false;
      return {
        success: false,
        message: error?.data?.error || error?.message || `Failed to register with ${provider}`,
      };
    }
  };

  const navigateOnExpiredSession = () => {
    token.value = null;
    return navigateTo({ path: "/", query: { login: true } });
  };

  return {
    signup,
    login,
    forgotPassword,
    socialLogin,
    socialRegister,
    user,
    loading,
    token,
    logout,
  };
});
