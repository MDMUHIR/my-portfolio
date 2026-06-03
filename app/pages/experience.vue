<script setup lang="ts">
useHead({
  title: 'Experience — Md. Muhir Uddin',
  meta: [
    { name: 'description', content: 'Professional experience and work history of Md. Muhir Uddin — full-stack developer and AI engineer.' },
    { property: 'og:title', content: 'Experience — Md. Muhir Uddin' },
    { property: 'og:description', content: 'Professional experience and work history of Md. Muhir Uddin.' },
  ],
})

const { jobs, education, loading, fetchJobs, fetchEducation } = useExperience();

onMounted(async () => {
  await Promise.all([fetchJobs(), fetchEducation()]);
});

const defaultJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Tech Company Inc.',
    duration: '2022 - Present',
    location: 'Remote',
    description: 'Leading development of scalable web applications using Vue and Node.js',
    highlights: ['Architected and deployed microservices reducing load times by 40%', 'Mentored 5+ junior developers on best practices', 'Implemented automated testing improving code coverage to 85%'],
    tags: ['Vue.js', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    id: 2, title: 'Full Stack Developer', company: 'Digital Solutions Ltd.', duration: '2020 - 2022', location: 'Hybrid',
    description: 'Developed and maintained multiple production applications',
    highlights: ['Built real-time analytics dashboard with 100K+ daily users', 'Optimized database queries improving performance by 60%', 'Established CI/CD pipelines reducing deployment time'],
    tags: ['React', 'Express', 'MongoDB', 'Docker'],
  },
  {
    id: 3, title: 'Junior Developer', company: 'Software Startup', duration: '2019 - 2020', location: 'On-site',
    description: 'Started career building responsive web applications',
    highlights: ['Developed 10+ client projects using modern frameworks', 'Contributed to open-source projects', 'Participated in agile development cycles'],
    tags: ['JavaScript', 'HTML/CSS', 'Git', 'API Integration'],
  },
];

const displayJobs = computed(() => jobs.value.length > 0 ? jobs.value : defaultJobs);
</script>

<template>
  <div class="py-10 sm:py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <NuxtLink to="/" class="text-theme-secondary hover:text-accent transition-colors duration-200 text-sm mb-6 inline-block">← Back to Home</NuxtLink>
      <h1 class="section-title"># Experience</h1>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>

      <div v-else class="space-y-5 sm:space-y-6">
        <div v-for="exp in displayJobs" :key="exp.id" class="card p-5 sm:p-6 transition-all" style="border-left: 3px solid var(--accent)">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
            <div>
              <h3 class="text-theme text-lg sm:text-xl font-bold">{{ exp.title }}</h3>
              <p class="text-accent font-semibold text-sm sm:text-base">{{ exp.company }}</p>
              <p class="text-theme-secondary text-xs sm:text-sm mt-0.5">📍 {{ exp.location }}</p>
            </div>
            <div class="text-theme-secondary text-xs sm:text-sm sm:text-right">
              <p class="font-semibold">{{ exp.duration }}</p>
            </div>
          </div>

          <p class="text-theme text-sm sm:text-base mb-4">{{ exp.description }}</p>

          <ul class="space-y-1.5 mb-4">
            <li v-for="(highlight, idx) in exp.highlights" :key="idx" class="flex gap-2 text-theme text-sm">
              <span class="text-accent font-bold shrink-0">→</span>
              <span>{{ highlight }}</span>
            </li>
          </ul>

          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in exp.tags" :key="tag" class="tag-badge text-xs">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
