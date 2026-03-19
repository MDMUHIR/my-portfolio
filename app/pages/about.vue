<script setup>
const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    year: "2019",
    details: "GPA: 3.8/4.0 • Dean's List",
  },
  {
    degree: "Full Stack Web Development",
    school: "Online Academy",
    year: "2018",
    details: "Intensive 12-week bootcamp",
  },
];
</script>

<template>
  <section
    id="about"
    style="background-color: #1e1e1e; border-top: 1px solid #3e3e42"
    class="section"
  >
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title"># About Me</h2>

      <!-- Main Bio -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Bio Text -->
        <div class="md:col-span-2">
          <p style="color: #cccccc" class="text-lg leading-relaxed mb-4">
            I'm a full-stack JavaScript developer with a passion for building
            beautiful, functional web applications. With 5+ years of
            professional experience, I've worked on everything from startup MVPs
            to enterprise-scale systems.
          </p>
          <p style="color: #cccccc" class="text-base leading-relaxed mb-4">
            My expertise spans modern frontend frameworks (Vue.js, React),
            backend development (Node.js), and increasingly, AI/ML integration.
            I believe in writing clean code, following best practices, and
            always learning new technologies.
          </p>
          <p style="color: #cccccc" class="text-base leading-relaxed">
            When I'm not coding, you can find me exploring new AI research,
            contributing to open-source projects, or mentoring junior
            developers. I'm always open to interesting projects and
            collaborations.
          </p>
        </div>

        <!-- Quick Stats -->
        <div class="space-y-4">
          <div class="card p-4">
            <div style="color: #007acc" class="text-3xl font-bold mb-1">5+</div>
            <p style="color: #858585" class="text-sm">Years Experience</p>
          </div>
          <div class="card p-4">
            <div style="color: #4ec9b0" class="text-3xl font-bold mb-1">
              50+
            </div>
            <p style="color: #858585" class="text-sm">Projects</p>
          </div>
          <div class="card p-4">
            <div style="color: #dcdcaa" class="text-3xl font-bold mb-1">
              20+
            </div>
            <p style="color: #858585" class="text-sm">Mentored</p>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="mb-12">
        <h3 style="color: #007acc" class="text-xl font-bold mb-6">
          // Education
        </h3>
        <div class="space-y-4">
          <div
            v-for="edu in education"
            :key="edu.degree"
            class="card p-6"
            style="border-left: 3px solid #007acc"
          >
            <h4 style="color: #cccccc" class="text-lg font-semibold">
              {{ edu.degree }}
            </h4>
            <p style="color: #007acc" class="font-medium">{{ edu.school }}</p>
            <p style="color: #858585" class="text-sm mt-2">📅 {{ edu.year }}</p>
            <p style="color: #cccccc" class="text-sm mt-3">{{ edu.details }}</p>
          </div>
        </div>
      </div>

      <!-- Values & Approach -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">🎯</div>
          <h4 style="color: #cccccc" class="font-semibold mb-2">Quality</h4>
          <p style="color: #858585" class="text-sm">
            Clean, maintainable code following best practices.
          </p>
        </div>
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">🚀</div>
          <h4 style="color: #cccccc" class="font-semibold mb-2">Results</h4>
          <p style="color: #858585" class="text-sm">
            Focused on delivering tangible outcomes.
          </p>
        </div>
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">🤝</div>
          <h4 style="color: #cccccc" class="font-semibold mb-2">
            Collaboration
          </h4>
          <p style="color: #858585" class="text-sm">
            Open communication and team growth.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
