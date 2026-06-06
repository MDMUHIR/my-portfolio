<script setup lang="ts">
const { projects, loading, fetchProjects } = useProjects();

onMounted(async () => {
  await fetchProjects();
  nextTick(() => observe())
});

const { observe, destroy } = useScrollReveal();

onUnmounted(() => destroy());

const defaultProjects = [
  {
    id: 1, title: 'Project Alpha',
    description: 'An AI-powered search assistant that helps users find information instantly.',
    longDescription: 'A full-stack application featuring intelligent search capabilities.',
    category: 'AI & Web',
    tags: ['AI', 'Node', 'Vue', 'ML'],
    image: '🤖', link: '#', github: '#',
    highlights: ['Real-time search with ML recommendations', 'RESTful API with 99.9% uptime'],
    stats: { users: '100K+', activeDaily: '25K+', satisfaction: '4.8/5' },
  },
  {
    id: 2, title: 'Dashboard Pro',
    description: 'Real-time analytics dashboard built with WebSockets for live data updates.',
    longDescription: 'Enterprise-grade analytics platform.',
    category: 'Data & Visualization',
    tags: ['Realtime', 'D3', 'Node', 'WebSocket'],
    image: '📊', link: '#', github: '#',
    highlights: ['Real-time data streaming via WebSockets', 'Advanced D3.js visualizations'],
    stats: { dataPoints: '10M+', updateSpeed: '<100ms', satisfaction: '4.9/5' },
  },
  {
    id: 3, title: 'CLI Tools Suite',
    description: 'Developer tools and automation scripts to streamline workflows.',
    longDescription: 'A comprehensive collection of CLI tools.',
    category: 'Developer Tools',
    tags: ['Tooling', 'Node', 'CLI', 'Automation'],
    image: '⚙️', link: '#', github: '#',
    highlights: ['10+ CLI utilities', 'Cross-platform compatibility', '50K+ npm downloads'],
    stats: { downloads: '50K+', coverage: '95%', satisfaction: '4.7/5' },
  },
  {
    id: 4, title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce solution with payment integration and inventory management.',
    longDescription: 'Complete online store solution.',
    category: 'Full Stack',
    tags: ['React', 'Node', 'Payment API', 'PostgreSQL'],
    image: '🛍️', link: '#', github: '#',
    highlights: ['Secure payment processing', 'Real-time inventory tracking'],
    stats: { transactions: '100K+', revenue: '$5M+', satisfaction: '4.8/5' },
  },
  {
    id: 5, title: 'AI Content Generator',
    description: 'Intelligent content generation tool powered by GPT models.',
    longDescription: 'Generate content quickly with AI.',
    category: 'AI/ML',
    tags: ['AI', 'GPT', 'Python', 'Vue'],
    image: '✍️', link: '#', github: '#',
    highlights: ['GPT-4 integration', 'Template-based generation'],
    stats: { generated: '1M+', avgQuality: '9.2/10', satisfaction: '4.9/5' },
  },
  {
    id: 6, title: 'Project Management App',
    description: 'Collaborative project management tool with real-time updates and Kanban boards.',
    longDescription: 'Manage projects with ease.',
    category: 'Productivity',
    tags: ['Vue', 'Firebase', 'WebSocket', 'TailwindCSS'],
    image: '📋', link: '#', github: '#',
    highlights: ['Real-time collaboration', 'Customizable workflows', 'Team analytics'],
    stats: { teams: '500+', activeUsers: '50K+', satisfaction: '4.8/5' },
  },
];

const displayProjects = computed(() => projects.value.length > 0 ? projects.value : defaultProjects);
</script>

<template>
  <section id="projects" class="section section-default">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="section-title reveal">// Featured Projects</h2>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <article
          v-for="(p, idx) in displayProjects"
          :key="p.id"
          class="card overflow-hidden group transition-all duration-300 hover:-translate-y-1 reveal"
          :class="[`stagger-${(idx % 6) + 1}`]"
        >
          <div
            class="p-6 sm:p-6 flex items-center justify-center min-h-28 sm:min-h-32 transition-all duration-300 group-hover:scale-105"
            :style="{ background: 'var(--gradient-card)' }"
          >
            <div class="text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-110">{{ p.image }}</div>
          </div>

          <div class="p-5 sm:p-6">
            <div class="mb-3">
              <h3 class="text-theme font-bold text-base sm:text-lg group-hover:text-accent-light transition-colors duration-200">{{ p.title }}</h3>
              <p class="text-accent text-xs font-semibold mt-0.5">{{ p.category }}</p>
            </div>

            <p class="text-theme-secondary text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">{{ p.description }}</p>

            <div class="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg text-xs" :style="{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border)' }">
              <div v-for="(value, key) in p.stats" :key="key" class="text-center">
                <div class="text-accent-light font-bold text-sm">{{ value }}</div>
                <div class="text-theme-secondary capitalize truncate">{{ key.replace(/([A-Z])/g, ' $1').trim() }}</div>
              </div>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-4">
              <span v-for="t in p.tags" :key="t" class="tag-badge text-xs">{{ t }}</span>
            </div>

            <div class="flex gap-3 pt-4 border-t border-theme">
              <a
                :href="p.link"
                class="flex-1 px-3 py-2 text-xs sm:text-sm text-center rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                :style="{ color: 'var(--accent)', border: '1px solid var(--accent)' }"
              >View</a>
              <a
                :href="p.github"
                class="flex-1 px-3 py-2 text-xs sm:text-sm text-center rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                :style="{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }"
              >Code</a>
            </div>
          </div>
        </article>
      </div>

      <div class="flex justify-center mt-10 sm:mt-12 reveal">
        <NuxtLink to="/projects" class="btn-primary">▶ View All Projects</NuxtLink>
      </div>
    </div>
  </section>
</template>
