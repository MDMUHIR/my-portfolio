export const useSkills = () => {
  const { request } = useApi();
  const skills = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSkills = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await request({ url: "/api/skills" });
      skills.value = data.data || data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch skills";
      console.error("Error fetching skills:", e);
    } finally {
      loading.value = false;
    }
  };

  const groupedSkills = computed(() => {
    const groups = {};
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
