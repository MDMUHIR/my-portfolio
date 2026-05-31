export const useProjects = () => {
  const { request } = useApi();
  const projects = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await request({ url: "/api/projects" });
      projects.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch projects";
      console.error("Error fetching projects:", e);
    } finally {
      loading.value = false;
    }
  };

  const fetchProjectBySlug = async (slug) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await request({ url: `/api/projects/${slug}` });
      return data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch project";
      console.error("Error fetching project:", e);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchProjectBySlug,
  };
};
