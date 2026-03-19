export interface Skill {
  id: number;
  name: string;
  level: number;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const useSkills = () => {
  const { fetchApi } = useApi();
  const skills = ref<Skill[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSkills = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchApi<{ data: Skill[] }>("/api/skills");
      skills.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch skills";
      console.error("Error fetching skills:", e);
    } finally {
      loading.value = false;
    }
  };

  const groupedSkills = computed(() => {
    const groups: Record<string, Skill[]> = {};
    skills.value.forEach((skill) => {
      const category = skill.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(skill);
    });
    return Object.entries(groups).map(([name, skills]) => ({
      name,
      skills,
    }));
  });

  return {
    skills,
    groupedSkills,
    loading,
    error,
    fetchSkills,
  };
};
