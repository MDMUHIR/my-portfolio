<script setup>
const experiences = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "Tech Company Inc.",
    duration: "2022 - Present",
    location: "Remote",
    description:
      "Leading development of scalable web applications using Vue and Node.js",
    highlights: [
      "Architected and deployed microservices reducing load times by 40%",
      "Mentored 5+ junior developers on best practices",
      "Implemented automated testing improving code coverage to 85%",
    ],
    tags: ["Vue.js", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    duration: "2020 - 2022",
    location: "Hybrid",
    description: "Developed and maintained multiple production applications",
    highlights: [
      "Built real-time analytics dashboard with 100K+ daily users",
      "Optimized database queries improving performance by 60%",
      "Established CI/CD pipelines reducing deployment time",
    ],
    tags: ["React", "Express", "MongoDB", "Docker"],
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "Software Startup",
    duration: "2019 - 2020",
    location: "On-site",
    description: "Started career building responsive web applications",
    highlights: [
      "Developed 10+ client projects using modern frameworks",
      "Contributed to open-source projects",
      "Participated in agile development cycles",
    ],
    tags: ["JavaScript", "HTML/CSS", "Git", "API Integration"],
  },
];
</script>

<template>
  <section
    id="experience"
    style="background-color: #1e1e1e; border-top: 1px solid #3e3e42"
    class="section"
  >
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title">// Experience</h2>
      <div class="space-y-6">
        <div
          v-for="exp in experiences"
          :key="exp.id"
          class="card p-6 hover:shadow-lg"
          style="border-left: 3px solid #007acc"
        >
          <div
            class="flex flex-col md:flex-row md:items-start md:justify-between mb-3"
          >
            <div>
              <h3 style="color: #cccccc" class="text-xl font-bold">
                {{ exp.title }}
              </h3>
              <p style="color: #007acc" class="font-semibold">
                {{ exp.company }}
              </p>
              <p style="color: #858585" class="text-sm">
                📍 {{ exp.location }}
              </p>
            </div>
            <div style="color: #858585" class="text-right text-sm mt-2 md:mt-0">
              <p class="font-semibold">{{ exp.duration }}</p>
            </div>
          </div>

          <p style="color: #cccccc" class="mb-4">{{ exp.description }}</p>

          <!-- Highlights -->
          <ul class="space-y-2 mb-4">
            <li
              v-for="(highlight, idx) in exp.highlights"
              :key="idx"
              class="flex gap-3"
              style="color: #cccccc"
            >
              <span style="color: #007acc" class="font-bold leading-relaxed"
                >→</span
              >
              <span>{{ highlight }}</span>
            </li>
          </ul>

          <!-- Skills Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in exp.tags"
              :key="tag"
              style="
                background-color: #264f78;
                color: #0098ff;
                border: 1px solid #007acc;
              "
              class="inline-block px-3 py-1 rounded text-xs font-medium"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
