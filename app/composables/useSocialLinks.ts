export interface SocialLink {
  id: number;
  icon: string;
  title: string;
  value: string;
  link: string;
  created_at?: string;
  updated_at?: string;
}

export const useSocialLinks = () => {
  const { fetchApi } = useApi();
  const socialLinks = ref<SocialLink[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSocialLinks = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchApi<{ data: SocialLink[] }>("/api/social-links");
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
