export const useExperience = () => {
  const { request } = useApi();
  const jobs = ref([]);
  const education = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchJobs = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await request({ url: "/api/experience/jobs" });
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
      const data = await request({ url: "/api/experience/education" });
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
