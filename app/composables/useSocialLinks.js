export const useSocialLinks = () => {
  const { request } = useApi();
  const socialLinks = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSocialLinks = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await request({ url: "/api/social-links" });
      socialLinks.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch social links";
      console.error("Error fetching social links:", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    socialLinks,
    loading,
    error,
    fetchSocialLinks,
  };
};
