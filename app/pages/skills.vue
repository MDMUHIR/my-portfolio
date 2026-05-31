<template>
  <div>
    <div class="py-6 mb-8 bg-theme border-theme" style="border-bottom-width: 1px">
      <div class="max-w-5xl mx-auto px-6">
        <NuxtLink to="/" class="text-theme-secondary hover:text-accent transition text-sm mb-4 inline-block">← Back to Home</NuxtLink>
        <h1 class="text-theme text-4xl font-bold"># Skills & Expertise</h1>
      </div>
    </div>
    <Skills />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
})

useHead({
  title: 'Skills — Md. Muhir Uddin',
  meta: [
    { name: 'description', content: 'Technical skills and expertise of Md. Muhir Uddin — frontend, backend, AI/ML, and DevOps.' },
    { property: 'og:title', content: 'Skills — Md. Muhir Uddin' },
    { property: 'og:description', content: 'Technical skills including frontend, backend, AI/ML, and DevOps.' },
  ],
})
</script>
