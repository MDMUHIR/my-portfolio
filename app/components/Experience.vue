<script setup lang="ts">
const defaultJobs = [
  {
    id: 1,
    title: "Freelance Front-End Developer",
    company: "Fiverr, Upwork",
    duration: "2022 - Present",
    location: "Remote",
    description: "Leading development of scalable web applications using Vue and AI",
    highlights: [
      "Architected and deployed microservices reducing load times by 40%",
      "Mentored 5+ junior developers on best practices",
      "Implemented automated testing improving code coverage to 85%",
    ],
    tags: ["JavaScript", "Vue.js", "Nuxt.js", "React.js", "Python", "LangChain", "Django", "FastApi", "PostgreSQL"],
  },
];
</script>

<template>
  <section id="experience" class="section section-default">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title">// Experience</h2>

      <div class="space-y-6">
        <div
          v-for="exp in defaultJobs"
          :key="exp.id"
          class="card p-6 hover:shadow-lg"
          style="border-left: 3px solid var(--accent)"
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
              :style="{
                backgroundColor: 'var(--selection)',
                color: 'var(--accent-light)',
                border: '1px solid var(--accent)',
              }"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
