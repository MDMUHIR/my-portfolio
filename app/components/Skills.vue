<script setup lang="ts">
const { skills, groupedSkills, loading, fetchSkills } = useSkills();

onMounted(async () => {
  await fetchSkills();
});

const defaultSkillCategories = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'Vue.js', level: 95 }, { name: 'React', level: 88 },
      { name: 'HTML/CSS', level: 95 }, { name: 'JavaScript', level: 98 },
      { name: 'Tailwind CSS', level: 92 }, { name: 'Nuxt', level: 90 },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 90 }, { name: 'Express', level: 88 },
      { name: 'Python', level: 85 }, { name: 'PostgreSQL', level: 87 },
      { name: 'MongoDB', level: 85 }, { name: 'REST APIs', level: 92 },
    ],
  },
  {
    name: 'AI & Machine Learning',
    skills: [
      { name: 'PyTorch', level: 82 }, { name: 'TensorFlow', level: 80 },
      { name: 'LLMs', level: 88 }, { name: 'NLP', level: 85 },
      { name: 'Data Analysis', level: 87 }, { name: 'Computer Vision', level: 83 },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 95 }, { name: 'Docker', level: 88 },
      { name: 'AWS', level: 85 }, { name: 'CI/CD', level: 87 },
      { name: 'Linux', level: 85 }, { name: 'Webpack', level: 83 },
    ],
  },
];

const endorsements = [
  { skill: 'JavaScript', count: 45 }, { skill: 'Vue.js', count: 32 },
  { skill: 'React', count: 28 }, { skill: 'Node.js', count: 25 },
  { skill: 'Problem Solving', count: 22 },
];

const displayCategories = computed(() => groupedSkills.value.length > 0 ? groupedSkills.value : defaultSkillCategories);
</script>

<template>
  <section id="skills" class="section section-alt">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="section-title">// Skills & Packages</h2>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>

      <div v-else class="space-y-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div v-for="category in displayCategories" :key="category.name" class="card p-5 sm:p-6">
            <h3 class="text-success text-base sm:text-lg font-semibold mb-5">{{ category.name }}</h3>
            <div class="space-y-4">
              <div v-for="skill in category.skills" :key="skill.name">
                <div class="flex justify-between mb-1.5">
                  <span class="text-theme text-sm font-medium">{{ skill.name }}</span>
                  <span class="text-theme-secondary text-xs">{{ skill.level }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-bar-fill" :style="{ width: `${skill.level}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-5 sm:p-6">
          <h3 class="text-success text-base sm:text-lg font-semibold mb-6">⭐ Top Skills</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            <div
              v-for="endorsement in endorsements"
              :key="endorsement.skill"
              class="rounded-xl p-4 text-center transition-all duration-200 hover:scale-105"
              :style="{ backgroundColor: 'var(--selection)', border: '1px solid var(--accent)' }"
            >
              <div class="text-accent-light text-2xl font-bold mb-1">{{ endorsement.count }}</div>
              <p class="text-theme text-xs sm:text-sm font-semibold">{{ endorsement.skill }}</p>
              <p class="text-theme-secondary text-xs mt-1">pts</p>
            </div>
          </div>
        </div>

        <div class="card p-5 sm:p-6">
          <h3 class="text-success text-base sm:text-lg font-semibold mb-6">📜 Certifications</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div v-for="cert in 3" :key="cert" class="flex items-start gap-3">
              <div class="text-success text-xl mt-0.5">✓</div>
              <div>
                <p class="text-theme font-semibold text-sm sm:text-base">Certification Title</p>
                <p class="text-theme-secondary text-xs sm:text-sm">Issuing Org • 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
