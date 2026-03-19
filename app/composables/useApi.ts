const config = useRuntimeConfig();

export const useApi = () => {
  const apiBase = config.public.apiBase;

  const fetchApi = async <T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${apiBase}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return {
    apiBase,
    fetchApi,
  };
};
