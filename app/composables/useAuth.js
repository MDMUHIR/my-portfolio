export const useAuth = () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const baseURL = config.public.apiBase;

  const isAuthenticated = computed(() => !!token.value);

  const getUserToken = () => token.value;

  const setAuthData = (authToken, userData) => {
    token.value = authToken;
    user.value = userData;
    if (process.client) {
      localStorage.setItem("admin_token", authToken);
      localStorage.setItem("admin_user", JSON.stringify(userData));
    }
  };

  const clearAuthData = () => {
    token.value = null;
    user.value = null;
    if (process.client) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
  };

  const initAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem("admin_token");
      const savedUser = localStorage.getItem("admin_user");
      if (savedToken) {
        token.value = savedToken;
        user.value = savedUser ? JSON.parse(savedUser) : null;
      }
    }
  };

  // fetch("http://localhost:8001/api/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   credentials: "include", // if using cookies
  //   body: JSON.stringify({ email, password }),
  // });
  const login = async (email, password) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        // body: { email, password },
        body: JSON.stringify({ email, password }),
      });

      if (response.access_token && response.user) {
        setAuthData(response.access_token, response.user);
        return true;
      }

      throw new Error("Invalid response from server");
    } catch (e) {
      error.value = e.data?.message || e.message || "Login failed";
      console.error("Login error:", e);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    clearAuthData();
    router.push("/admin/login");
  };

  const request = async ({
    url,
    method = "GET",
    data = null,
    params = null,
  }) => {
    const headers = {
      Accept: "application/json",
    };

    if (!isFormData(data)) {
      headers["Content-Type"] = "application/json";
    }

    if (token.value) {
      headers["Authorization"] = `Bearer ${token.value}`;
    }

    try {
      const response = await $fetch(url, {
        baseURL,
        method,
        headers,
        body: data,
        params,
      });
      return response;
    } catch (err) {
      if (err.response?.status === 401) {
        clearAuthData();
        router.push("/admin/login");
      }
      throw err;
    }
  };

  const isFormData = (data) => {
    return data instanceof FormData;
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    getUserToken,
    login,
    logout,
    initAuth,
    request,
    baseURL,
  };
};
