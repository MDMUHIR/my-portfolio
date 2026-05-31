<template>
  <div>
    <div class="py-6 mb-8 bg-theme border-theme" style="border-bottom-width: 1px">
      <div class="max-w-5xl mx-auto px-6">
        <NuxtLink to="/#projects" class="text-theme-secondary hover:text-accent transition text-sm mb-4 inline-block">← Back to Home</NuxtLink>
        <h1 class="text-theme text-4xl font-bold"># All Projects</h1>
      </div>
    </div>
    <Projects />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
})

useHead({
  title: 'Projects — Md. Muhir Uddin',
  meta: [
    { name: 'description', content: 'Portfolio projects by Md. Muhir Uddin — web applications, AI tools, and full-stack solutions.' },
    { property: 'og:title', content: 'Projects — Md. Muhir Uddin' },
    { property: 'og:description', content: 'Portfolio projects — web applications, AI tools, and full-stack solutions.' },
  ],
})
</script>
