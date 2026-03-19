<script setup lang="ts">
const { skills, groupedSkills, loading, fetchSkills } = useSkills();

onMounted(async () => {
  await fetchSkills();
});

const defaultSkillCategories = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'Vue.js', level: 95 },
      { name: 'React', level: 88 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'JavaScript', level: 98 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Nuxt', level: 90 },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 87 },
      { name: 'MongoDB', level: 85 },
      { name: 'REST APIs', level: 92 },
    ],
  },
  {
    name: 'AI & Machine Learning',
    skills: [
      { name: 'PyTorch', level: 82 },
      { name: 'TensorFlow', level: 80 },
      { name: 'LLMs', level: 88 },
      { name: 'NLP', level: 85 },
      { name: 'Data Analysis', level: 87 },
      { name: 'Computer Vision', level: 83 },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 88 },
      { name: 'AWS', level: 85 },
      { name: 'CI/CD', level: 87 },
      { name: 'Linux', level: 85 },
      { name: 'Webpack', level: 83 },
    ],
  },
];

const endorsements = [
  { skill: 'JavaScript', count: 45 },
  { skill: 'Vue.js', count: 32 },
  { skill: 'React', count: 28 },
  { skill: 'Node.js', count: 25 },
  { skill: 'Problem Solving', count: 22 },
];

const displayCategories = computed(() => groupedSkills.value.length > 0 ? groupedSkills.value : defaultSkillCategories);
</script>

<template>
  <section id="skills" style="background-color: #252526">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title">// Skills & Packages</h2>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div
            v-for="category in displayCategories"
            :key="category.name"
            class="card p-6"
          >
            <h3 style="color: #4ec9b0" class="text-lg font-semibold mb-6">
              {{ category.name }}
            </h3>
            <div class="space-y-4">
              <div v-for="skill in category.skills" :key="skill.name">
                <div class="flex justify-between mb-2">
                  <span style="color: #cccccc" class="text-sm font-medium">{{
                    skill.name
                  }}</span>
                  <span style="color: #858585" class="text-xs"
                    >{{ skill.level }}%</span
                  >
                </div>
                <div
                  style="background-color: #3e3e42"
                  class="w-full rounded-full h-2 overflow-hidden"
                >
                  <div
                    style="background: linear-gradient(90deg, #007acc, #0098ff)"
                    class="h-full rounded-full transition-all duration-1000"
                    :style="{ width: `${skill.level}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 style="color: #4ec9b0" class="text-lg font-semibold mb-6">
            ⭐ Top Skills
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div
              v-for="endorsement in endorsements"
              :key="endorsement.skill"
              style="background-color: #264f78; border: 1px solid #007acc"
              class="rounded-lg p-4 text-center hover:shadow-md transition"
            >
              <div style="color: #0098ff" class="text-2xl font-bold mb-2">
                {{ endorsement.count }}
              </div>
              <p style="color: #cccccc" class="text-sm font-semibold">
                {{ endorsement.skill }}
              </p>
              <p style="color: #858585" class="text-xs mt-1">pts</p>
            </div>
          </div>
        </div>

        <div class="mt-8 card p-6">
          <h3 style="color: #4ec9b0" class="text-lg font-semibold mb-6">
            📜 Certifications
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="cert in 3" :key="cert" class="flex items-start gap-3">
              <div class="text-2xl">✓</div>
              <div>
                <p style="color: #cccccc" class="font-semibold">
                  Certification Title
                </p>
                <p style="color: #858585" class="text-sm">Issuing Org • 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
