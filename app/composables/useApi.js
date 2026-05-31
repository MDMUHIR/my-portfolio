export const useApi = () => {
  const config = useRuntimeConfig();

  const baseURL = config.public.apiBase;

  const request = async ({
    url,
    method = "GET",
    data = null,
    params = null,
    authRequired = false,
    isFormData = false,
  }) => {
    const headers = {
      Accept: "application/vnd.api+json",
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/vnd.api+json";
    }

    if (authRequired && process.client) {
      const token = localStorage.getItem("admin_token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
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
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const handleError = (error) => {
    console.error("API Error:", error);

    const status = error?.response?.status;

    if (status === 401) {
      console.warn("Unauthorized - logging out...");
      if (process.client) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
      }
    }

    if (status === 422) {
      console.warn("Validation Errors:", error.response?._data);
    }

    if (status === 500) {
      console.warn("Server error");
    }
  };

  return {
    request,
    baseURL,
  };
};
