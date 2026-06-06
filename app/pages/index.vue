<template>
  <div>
    <Hero />
    <About />
    <Experience />

    <section class="section-alt">
      <div class="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 class="section-title text-center reveal">// explore my portfolio</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <NuxtLink to="/skills" class="card p-8 sm:p-10 group hover:-translate-y-1 text-center transition-all duration-200 reveal">
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="text-theme text-xl font-bold mb-2 group-hover:text-accent-light transition-colors duration-200">Skills</h3>
            <p class="text-theme-secondary text-sm mb-4">Explore my technical skills</p>
            <span class="text-accent text-sm font-semibold">View →</span>
          </NuxtLink>

          <NuxtLink to="/projects" class="card p-8 sm:p-10 group hover:-translate-y-1 text-center transition-all duration-200 reveal stagger-1">
            <div class="text-5xl mb-4">🚀</div>
            <h3 class="text-theme text-xl font-bold mb-2 group-hover:text-accent-light transition-colors duration-200">Projects</h3>
            <p class="text-theme-secondary text-sm mb-4">View all my projects</p>
            <span class="text-accent text-sm font-semibold">View →</span>
          </NuxtLink>
        </div>

        <div class="flex justify-center mt-10 sm:mt-12 reveal stagger-2">
          <NuxtLink to="/contact" class="btn-primary">→ Get in Touch</NuxtLink>
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

const { observe, destroy } = useScrollReveal()

onMounted(() => {
  nextTick(() => observe())
})

onUnmounted(() => destroy())
</script>
