export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export const useTestimonials = () => {
  const { fetchApi } = useApi();
  const testimonials = ref<Testimonial[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTestimonials = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchApi<{ data: Testimonial[] }>("/api/testimonials");
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
