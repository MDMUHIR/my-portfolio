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
    highlights: [
      'Architected and deployed microservices reducing load times by 40%',
      'Mentored 5+ junior developers on best practices',
      'Implemented automated testing improving code coverage to 85%',
    ],
    tags: ['Vue.js', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    duration: '2020 - 2022',
    location: 'Hybrid',
    description: 'Developed and maintained multiple production applications',
    highlights: [
      'Built real-time analytics dashboard with 100K+ daily users',
      'Optimized database queries improving performance by 60%',
      'Established CI/CD pipelines reducing deployment time',
    ],
    tags: ['React', 'Express', 'MongoDB', 'Docker'],
  },
  {
    id: 3,
    title: 'Junior Developer',
    company: 'Software Startup',
    duration: '2019 - 2020',
    location: 'On-site',
    description: 'Started career building responsive web applications',
    highlights: [
      'Developed 10+ client projects using modern frameworks',
      'Contributed to open-source projects',
      'Participated in agile development cycles',
    ],
    tags: ['JavaScript', 'HTML/CSS', 'Git', 'API Integration'],
  },
];

const displayJobs = computed(() => jobs.value.length > 0 ? jobs.value : defaultJobs);
</script>

<template>
  <section
    id="experience"
    class="section section-default"
  >
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title">// Experience</h2>
      
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else class="space-y-6">
        <div
          v-for="exp in displayJobs"
          :key="exp.id"
          class="card p-6 hover:shadow-lg"
          style="border-left: 3px solid #007acc"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
            <div>
              <h3 class="text-theme text-xl font-bold">{{ exp.title }}</h3>
              <p class="text-accent font-semibold">{{ exp.company }}</p>
              <p class="text-theme-secondary text-sm">📍 {{ exp.location }}</p>
            </div>
            <div class="text-theme-secondary text-right text-sm mt-2 md:mt-0">
              <p class="font-semibold">{{ exp.duration }}</p>
            </div>
          </div>

          <p class="text-theme mb-4">{{ exp.description }}</p>

          <ul class="space-y-2 mb-4">
            <li v-for="(highlight, idx) in exp.highlights" :key="idx" class="flex gap-3 text-theme">
              <span class="text-accent font-bold leading-relaxed">→</span>
              <span>{{ highlight }}</span>
            </li>
          </ul>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in exp.tags"
              :key="tag"
              class="inline-block px-3 py-1 rounded text-xs font-medium"
              :style="{ backgroundColor: 'var(--selection)', color: 'var(--accent-light)', border: '1px solid var(--accent)' }"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
