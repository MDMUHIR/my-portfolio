export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
  type?: "job" | "education";
  created_at?: string;
  updated_at?: string;
}

export const useExperience = () => {
  const { fetchApi } = useApi();
  const jobs = ref<Experience[]>([]);
  const education = ref<Experience[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchJobs = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchApi<{ data: Experience[] }>("/api/experience/jobs");
      jobs.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch jobs";
      console.error("Error fetching jobs:", e);
    } finally {
      loading.value = false;
    }
  };

  const fetchEducation = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchApi<{ data: Experience[] }>("/api/experience/education");
      education.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch education";
      console.error("Error fetching education:", e);
    } finally {
      loading.value = false;
    }
  };

  const fetchAll = async () => {
    await Promise.all([fetchJobs(), fetchEducation()]);
  };

  return {
    jobs,
    education,
    loading,
    error,
    fetchJobs,
    fetchEducation,
    fetchAll,
  };
};
