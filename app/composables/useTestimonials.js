export const useTestimonials = () => {
  const { request } = useApi();
  const testimonials = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTestimonials = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await request({ url: "/api/testimonials" });
      testimonials.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch testimonials";
      console.error("Error fetching testimonials:", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials,
  };
};
