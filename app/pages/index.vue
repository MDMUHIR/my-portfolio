<template>
  <div>
    <Hero />
    <About />
    <Experience />
    <!-- Quick Links Section -->
    <section class="section-alt py-16">
      <div class="max-w-5xl mx-auto px-6">
          <h2 class="text-accent-light text-3xl font-bold mb-12 text-center">
          // explore my portfolio
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Skills Card -->
          <NuxtLink
            to="/skills"
            class="card p-8 group hover:shadow-xl transition text-center"
          >
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="text-theme text-xl font-bold mb-2 group-hover:text-accent-light transition">
              Skills
            </h3>
            <p class="text-theme-secondary text-sm mb-4">
              Explore my technical skills
            </p>
            <span class="text-accent text-sm font-semibold">View →</span>
          </NuxtLink>

          <!-- Projects Card -->
          <NuxtLink
            to="/projects"
            class="card p-8 group hover:shadow-xl transition text-center"
          >
            <div class="text-5xl mb-4">🚀</div>
            <h3 class="text-theme text-xl font-bold mb-2 group-hover:text-accent-light transition">
              Projects
            </h3>
            <p class="text-theme-secondary text-sm mb-4">
              View all my projects
            </p>
            <span class="text-accent text-sm font-semibold">View →</span>
          </NuxtLink>
        </div>

        <div class="flex justify-center mt-12">
          <NuxtLink to="/contact" class="btn-primary text-center">
            → Get in Touch
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Md. Muhir Uddin — Full-Stack Developer & AI Engineer',
  meta: [
    { name: 'description', content: 'Portfolio of Md. Muhir Uddin — a full-stack developer and AI engineer specializing in Vue.js, Node.js, Python, and LangChain. Explore projects, experience, and skills.' },
    { property: 'og:title', content: 'Md. Muhir Uddin — Full-Stack Developer & AI Engineer' },
    { property: 'og:description', content: 'Portfolio of Md. Muhir Uddin — specializing in Vue.js, Node.js, Python, and LangChain.' },
  ],
})
</script>
