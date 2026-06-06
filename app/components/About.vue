<script setup>
const education = [
  { degree: "Mastering Vue.js", school: "Ostaad Online", year: "2023", details: "Intensive 6-month Online Course" },
  { degree: "Web Development", school: "Softech IT", year: "2017", details: "Intensive 6-month bootcamp" },
  { degree: "BBA in Management", school: "National University, Bangladesh", year: "2022-2027(expected)", details: "Continuing..." },
  { degree: "H.S.C", school: "Khoksa Govt. College, Kushtia", year: "2022", details: "GPA 5.00/5.00" },
  { degree: "S.S.C", school: "Khoksa Govt. Pilot High School, Kushtia", year: "2020", details: "GPA 5.00/5.00" },
]

const { observe, destroy } = useScrollReveal()

onMounted(() => {
  nextTick(() => observe())
})

onUnmounted(() => destroy())
</script>

<template>
  <section id="about" class="section section-default">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="section-title reveal"># About Me</h2>

      <div class="flex flex-col lg:grid lg:grid-cols-3 gap-8 mb-12">
        <div class="lg:col-span-2 order-2 lg:order-1">
          <div class="reveal">
            <p class="text-theme text-base sm:text-lg leading-relaxed mb-4">
              I'm a full-stack JavaScript developer with a passion for building beautiful, functional web applications. With 5+ years of professional experience, I've worked on everything from startup MVPs to enterprise-scale systems.
            </p>
          </div>
          <div class="reveal stagger-1">
            <p class="text-theme text-sm sm:text-base leading-relaxed mb-4">
              My expertise spans modern frontend frameworks (Vue.js, React), backend development (Node.js), and increasingly, AI/ML integration. I believe in writing clean code, following best practices, and always learning new technologies.
            </p>
          </div>
          <div class="reveal stagger-2">
            <p class="text-theme text-sm sm:text-base leading-relaxed">
              When I'm not coding, you can find me exploring new AI research, contributing to open-source projects, or mentoring junior developers. I'm always open to interesting projects and collaborations.
            </p>
          </div>
        </div>

        <div class="space-y-4 order-1 lg:order-2">
          <div class="reveal-right card-stat p-4 sm:p-5 text-center sm:text-left">
            <div class="gradient-text-accent text-3xl font-bold mb-1">4+</div>
            <p class="text-theme-secondary text-sm">Years Experience</p>
          </div>
          <div class="reveal-right stagger-1 card-stat p-4 sm:p-5 text-center sm:text-left">
            <div class="gradient-text text-3xl font-bold mb-1">20+</div>
            <p class="text-theme-secondary text-sm">Projects Delivered</p>
          </div>
        </div>
      </div>

      <div class="mb-12 reveal">
        <h3 class="text-lg sm:text-xl font-bold mb-6" :style="{ color: 'var(--accent)' }">// Education & Professional Courses</h3>
        <div class="space-y-3 sm:space-y-4">
          <div
            v-for="(edu, idx) in education"
            :key="edu.degree"
            class="card p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 transition-all reveal"
            :class="[`stagger-${idx + 1}`]"
            style="border-left: 3px solid var(--accent)"
          >
            <div class="sm:min-w-[180px] sm:border-r-2 sm:pr-4" :style="{ borderColor: 'var(--text-secondary)' }">
              <h4 class="text-theme text-base sm:text-lg font-semibold leading-tight">{{ edu.degree }}</h4>
            </div>
            <div>
              <p class="font-medium text-accent text-sm sm:text-base">{{ edu.school }}</p>
              <p class="text-theme-secondary text-xs sm:text-sm mt-1">{{ edu.year }}</p>
              <p class="text-theme text-xs sm:text-sm mt-2">{{ edu.details }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="(item, idx) in [
            { icon: '🎯', title: 'Quality', desc: 'Clean, maintainable code following best practices.' },
            { icon: '🚀', title: 'Results', desc: 'Focused on delivering tangible outcomes.' },
            { icon: '🤝', title: 'Collaboration', desc: 'Open communication and team growth.' }
          ]"
          :key="item.title"
          class="card p-6 sm:p-6 text-center reveal"
          :class="[`stagger-${idx + 1}`]"
        >
          <div class="text-4xl mb-3">{{ item.icon }}</div>
          <h4 class="text-theme font-semibold mb-2">{{ item.title }}</h4>
          <p class="text-theme-secondary text-sm">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
