<template>
  <div class="min-h-screen flex items-center justify-center bg-theme text-theme" style="font-family: Consolas, monospace;">
    <div class="text-center px-6">
      <div class="text-8xl mb-6 text-accent">*</div>
      <h1 class="text-6xl font-bold mb-4 text-danger">{{ error?.statusCode || 'Error' }}</h1>
      <p class="text-xl mb-2">{{ errorMessage }}</p>
      <p class="mb-8 text-theme-secondary">{{ statusCode === 404 ? 'The page you are looking for does not exist or has been moved.' : 'Something went wrong. Please try again later.' }}</p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/" class="btn-primary">← cd ~/home</NuxtLink>
        <button @click="handleError" class="btn-secondary">↻ retry</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ error: Object })

const statusCode = computed(() => props.error?.statusCode || 500)
const errorMessage = computed(() => props.error?.statusMessage || props.error?.message || 'Unexpected Error')

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: `${statusCode.value} — Md. Muhir Uddin`,
  meta: [{ name: 'description', content: `Error ${statusCode.value} — ${errorMessage.value}` }],
})
</script>
