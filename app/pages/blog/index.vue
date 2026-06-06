<script setup>
useHead({
  title: "Blog — Md. Muhir Uddin",
  meta: [
    { name: "description", content: "Thoughts on full-stack development, AI/ML, and building things that matter." },
  ],
})

const { posts, loading, fetchPosts } = usePosts()

onMounted(() => {
  fetchPosts(true)
})

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function readingTime(content) {
  const wpm = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wpm))
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12 sm:py-16">
    <div class="mb-10">
      <h1 class="text-3xl md:text-4xl font-bold text-theme mb-3">/blog</h1>
      <p class="text-theme-secondary text-base">Thoughts on full-stack development, AI/ML, and building things that matter.</p>
    </div>

    <div v-if="loading" class="space-y-6">
      <div v-for="n in 3" :key="n" class="rounded-xl border border-theme bg-theme-secondary p-6">
        <div class="shimmer h-5 w-3/4 rounded mb-3"></div>
        <div class="shimmer h-4 w-full rounded mb-2"></div>
        <div class="shimmer h-4 w-5/6 rounded mb-4"></div>
        <div class="shimmer h-3 w-1/3 rounded"></div>
      </div>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-16">
      <p class="text-4xl mb-4">📝</p>
      <p class="text-theme-secondary text-lg">No posts yet. Check back soon!</p>
    </div>

    <div v-else class="space-y-6">
      <article
        v-for="post in posts"
        :key="post.id"
        class="rounded-xl border border-theme bg-theme-secondary p-6 hover:border-accent/30 transition-all duration-200"
      >
        <NuxtLink :to="`/blog/${post.slug}`" class="block">
          <div v-if="post.image" class="mb-4 -mx-6 -mt-6 rounded-t-xl overflow-hidden h-48">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
          </div>
          <div class="flex items-start justify-between gap-4 mb-3">
            <h2 class="text-xl font-bold text-theme hover:text-accent transition-colors leading-tight">
              {{ post.title }}
            </h2>
          </div>

          <p class="text-theme-secondary mb-4 leading-relaxed">
            {{ post.excerpt }}
          </p>

          <div class="flex flex-wrap items-center gap-3 text-sm text-theme-secondary">
            <time :datetime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
            <span class="w-1 h-1 rounded-full bg-theme-secondary"></span>
            <span>{{ readingTime(post.content) }} min read</span>
            <span v-if="post.tags?.length" class="w-1 h-1 rounded-full bg-theme-secondary"></span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-2 py-0.5 rounded text-xs font-medium"
                :style="{ backgroundColor: 'var(--selection)', color: 'var(--accent-light)' }"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
