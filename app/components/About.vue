<script setup>
const education = [
  {
    degree: "Mastering Vue.js",
    school: "Ostaad Online",
    year: "2023",
    details: "Intensive 6-month Online Course",
  },
  {
    degree: "Web Development",
    school: "Softech IT",
    year: "2017",
    details: "Intensive 6-month bootcamp",
  },
  {
    degree: "BBA in Management",
    school: "National University, Bangladesh",
    year: "2022-2027(expected)",
    details: "Continuing...",
  },
  {
    degree: "H.S.C",
    school: "Khoksa Govt. College, Kushtia",
    year: "2022",
    details: "GPA 5.00/5.00",
  },
  {
    degree: "S.S.C",
    school: "Khoksa Govt. Pilot High School, Kushtia",
    year: "2020",
    details: "GPA 5.00/5.00",
  },
];
</script>

<template>
  <section id="about" class="section section-default">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title text-accent"># About Me</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="md:col-span-2">
          <p class="text-theme text-lg leading-relaxed mb-4">
            I'm a full-stack JavaScript developer with a passion for building beautiful,
            functional web applications. With 5+ years of professional experience, I've
            worked on everything from startup MVPs to enterprise-scale systems.
          </p>
          <p class="text-theme text-base leading-relaxed mb-4">
            My expertise spans modern frontend frameworks (Vue.js, React), backend
            development (Node.js), and increasingly, AI/ML integration. I believe in
            writing clean code, following best practices, and always learning new
            technologies.
          </p>
          <p class="text-theme text-base leading-relaxed">
            When I'm not coding, you can find me exploring new AI research, contributing
            to open-source projects, or mentoring junior developers. I'm always open to
            interesting projects and collaborations.
          </p>
        </div>

        <div class="space-y-4">
          <div class="card p-4">
            <div class="text-accent text-3xl font-bold mb-1">4+</div>
            <p class="text-theme-secondary text-sm">Years Experience</p>
          </div>
          <div class="card p-4">
            <div class="text-success text-3xl font-bold mb-1">20+</div>
            <p class="text-theme-secondary text-sm">Projects</p>
          </div>
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-xl text-accent font-bold mb-6">// Education & Professional Courses</h3>
        <div class="space-y-4">
          <div
            v-for="edu in education"
            :key="edu.degree"
            class="card p-3 flex flex-col sm:flex-row"
            style="border-left: 3px solid var(--accent)"
          >
            <div class="left sm:flex items-center justify-center sm:px-3">
              <h4 class="text-theme text-lg font-semibold">{{ edu.degree }}</h4>
            </div>
            <div class="right sm:border-l-2 sm:ml-3 sm:px-6" :style="{ borderColor: 'var(--text-secondary)' }">
              <p class="font-medium text-accent">{{ edu.school }}</p>
              <p class="text-theme-secondary text-sm mt-2">📅 {{ edu.year }}</p>
              <p class="text-theme text-sm mt-3">{{ edu.details }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">🎯</div>
          <h4 class="text-theme font-semibold mb-2">Quality</h4>
          <p class="text-theme-secondary text-sm">Clean, maintainable code following best practices.</p>
        </div>
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">🚀</div>
          <h4 class="text-theme font-semibold mb-2">Results</h4>
          <p class="text-theme-secondary text-sm">Focused on delivering tangible outcomes.</p>
        </div>
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">🤝</div>
          <h4 class="text-theme font-semibold mb-2">Collaboration</h4>
          <p class="text-theme-secondary text-sm">Open communication and team growth.</p>
        </div>
      </div>
    </div>
  </section>
</template>
