<script setup>
const route = useRoute()
const { fetchPostBySlug } = usePosts()

const post = ref(null)
const loading = ref(true)
const notFound = ref(false)

onMounted(async () => {
  const result = await fetchPostBySlug(route.params.slug)
  if (result) {
    post.value = result
    useHead({
      title: `${result.title} — Md. Muhir Uddin`,
      meta: [
        { name: "description", content: result.excerpt },
      ],
    })
  } else {
    notFound.value = true
  }
  loading.value = false
})

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

function readingTime(content) {
  const wpm = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wpm))
}

function renderContent(content) {
  return content
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      if (line.startsWith('## ')) return `<h2 class="text-xl font-bold text-theme mt-8 mb-3">${line.slice(3)}</h2>`
      if (line.startsWith('### ')) return `<h3 class="text-lg font-semibold text-theme mt-6 mb-2">${line.slice(4)}</h3>`
      if (line.startsWith('- ')) return `<li class="text-theme-secondary ml-4 list-disc">${line.slice(2)}</li>`
      if (/^\d+\.\s/.test(line)) return `<li class="text-theme-secondary ml-4 list-decimal">${line.replace(/^\d+\.\s/, '')}</li>`
      return `<p class="text-theme-secondary leading-relaxed mb-3">${line}</p>`
    })
    .join('')
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12 sm:py-16">
    <NuxtLink to="/blog" class="inline-flex items-center gap-1 text-sm text-theme-secondary hover:text-accent transition-colors mb-8">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      Back to blog
    </NuxtLink>

    <div v-if="loading" class="space-y-4">
      <div class="shimmer h-8 w-3/4 rounded mb-4"></div>
      <div class="shimmer h-4 w-1/3 rounded mb-6"></div>
      <div class="shimmer h-4 w-full rounded mb-2"></div>
      <div class="shimmer h-4 w-full rounded mb-2"></div>
      <div class="shimmer h-4 w-5/6 rounded"></div>
    </div>

    <div v-else-if="notFound" class="text-center py-16">
      <p class="text-4xl mb-4">🔍</p>
      <p class="text-theme-secondary text-lg mb-4">Post not found</p>
      <NuxtLink to="/blog" class="text-accent hover:text-accent-light transition-colors">Browse all posts →</NuxtLink>
    </div>

    <article v-else-if="post">
      <header class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-theme mb-4 leading-tight">{{ post.title }}</h1>
        <div class="flex flex-wrap items-center gap-3 text-sm text-theme-secondary">
          <time :datetime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
          <span class="w-1 h-1 rounded-full bg-theme-secondary"></span>
          <span>{{ readingTime(post.content) }} min read</span>
        </div>
        <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 rounded text-xs font-medium"
            :style="{ backgroundColor: 'var(--selection)', color: 'var(--accent-light)' }"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <div class="border-theme border-t pt-6" v-html="renderContent(post.content)"></div>

      <div class="border-theme border-t mt-10 pt-6 text-center">
        <NuxtLink to="/blog" class="text-accent hover:text-accent-light transition-colors text-sm">← More posts</NuxtLink>
      </div>
    </article>
  </div>
</template>
