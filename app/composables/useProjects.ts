export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  highlights: string[];
  stats: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export const useProjects = () => {
  const { fetchApi } = useApi();
  const projects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchApi<{ data: Project[] }>("/api/projects");
      projects.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch projects";
      console.error("Error fetching projects:", e);
    } finally {
      loading.value = false;
    }
  };

  const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchApi<{ data: Project }>(`/api/projects/${slug}`);
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
