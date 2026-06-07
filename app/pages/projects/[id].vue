<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { fetchProjectBySlug } = useProjects();
const project = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  const data = await fetchProjectBySlug(String(id));
  if (data) {
    project.value = data;
  }
  loading.value = false;
});

const defaultProjects: Record<string, any> = {
  "1": {
    id: 1,
    title: "Project Alpha",
    slug: "project-alpha",
    category: "AI & Web Development",
    description:
      "An AI-powered search assistant that helps users find information instantly.",
    image: "🤖",
    fullDescription: `Project Alpha is a full-stack application featuring intelligent search capabilities powered by machine learning models.

Key Features:
- Real-time search with ML-powered recommendations
- RESTful API with 99.9% uptime SLA
- Responsive design supporting 100K+ concurrent users
- Advanced caching and optimization strategies`,
    technologies: [
      "Vue.js",
      "Node.js",
      "PyTorch",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
    stats: {
      users: "100K+",
      queries: "1M+ daily",
      uptime: "99.9%",
      avgResponse: "<100ms",
    },
    highlights: [
      "Reduced search latency by 70%",
      "Achieved 3.5x increase in user engagement",
      "Scaled from 1K to 100K users in 6 months",
    ],
    timeline: "6 months • 2023-2024",
    team: "5 developers, 1 ML specialist",
    link: "#",
    github: "#",
  },
  "2": {
    id: 2,
    title: "Dashboard Pro",
    slug: "dashboard-pro",
    category: "Data Visualization & Analytics",
    description:
      "Real-time analytics dashboard built with WebSockets for live data updates.",
    image: "📊",
    fullDescription: `Dashboard Pro is an enterprise-scale analytics platform designed to handle massive data streams with real-time visualization capabilities.

Key Features:
- WebSocket-based real-time data streaming
- Advanced D3.js visualizations
- Handles millions of data points efficiently
- Custom dashboard builder for users`,
    technologies: [
      "React",
      "Node.js",
      "WebSocket",
      "D3.js",
      "PostgreSQL",
      "Apache Kafka",
    ],
    stats: {
      datapoints: "10M+ per day",
      updateSpeed: "<100ms",
      users: "500+ companies",
      availability: "99.99%",
    },
    highlights: [
      "Decreased decision-making time by 80%",
      "Enabled monitoring of 10M+ data points",
      "Improved data accuracy to 99.98%",
    ],
    timeline: "8 months • 2023",
    team: "6 developers, 2 designers, 1 data engineer",
    link: "#",
    github: "#",
  },
  "3": {
    id: 3,
    title: "CLI Tools Suite",
    slug: "cli-tools-suite",
    category: "Developer Tools",
    description: "A collection of CLI tools for automating development workflows.",
    image: "⚙️",
    fullDescription: `A comprehensive suite of command-line tools designed to streamline developer workflows and automate repetitive tasks.

Key Features:
- Modular plugin architecture
- Cross-platform support
- Built-in task scheduling
- Integration with CI/CD pipelines`,
    technologies: ["Python", "Node.js", "Shell", "Docker", "GitHub Actions"],
    stats: { downloads: "50K+", tools: "15+", stars: "2.5K", contributors: "30+" },
    highlights: [
      "Automated 80% of manual deployment tasks",
      "Adopted by 20+ teams",
      "Open source with active community",
    ],
    timeline: "3 months • 2023",
    team: "2 developers",
    link: "#",
    github: "#",
  },
  "4": {
    id: 4,
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    category: "Full Stack",
    description: "Full-featured e-commerce platform with real-time inventory management.",
    image: "🛒",
    fullDescription: `A complete e-commerce solution with real-time inventory tracking, payment processing, and admin dashboard.

Key Features:
- Real-time inventory management
- Secure payment integration
- Admin analytics dashboard
- Responsive storefront`,
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    stats: { products: "10K+", orders: "50K+", revenue: "$2M+", uptime: "99.95%" },
    highlights: [
      "Processed 50K+ orders without issues",
      "99.95% uptime since launch",
      "Handles 10K+ product catalog",
    ],
    timeline: "5 months • 2024",
    team: "4 developers, 1 designer",
    link: "#",
    github: "#",
  },
  "5": {
    id: 5,
    title: "AI Content Generator",
    slug: "ai-content-generator",
    category: "AI/ML",
    description: "Content generation platform powered by GPT and custom ML models.",
    image: "🧠",
    fullDescription: `An AI-powered content generation platform that creates high-quality written content using GPT models and custom-trained ML pipelines.

Key Features:
- GPT-powered content generation
- Custom fine-tuned models
- Multi-language support
- SEO optimization suggestions`,
    technologies: ["Python", "LangChain", "GPT API", "React", "FastAPI", "PostgreSQL"],
    stats: {
      content: "100K+ pieces",
      users: "10K+",
      languages: "25+",
      avgRating: "4.7/5",
    },
    highlights: [
      "Generated 100K+ content pieces",
      "Supported 25+ languages",
      "4.7/5 average user rating",
    ],
    timeline: "4 months • 2024",
    team: "3 developers, 1 ML engineer",
    link: "#",
    github: "#",
  },
  "6": {
    id: 6,
    title: "Project Management App",
    slug: "project-management-app",
    category: "Web Application",
    description: "Collaborative project management tool with real-time updates.",
    image: "📋",
    fullDescription: `A collaborative project management application with Kanban boards, real-time updates, and team analytics.

Key Features:
- Drag-and-drop Kanban boards
- Real-time collaboration
- Time tracking and reporting
- Team performance analytics`,
    technologies: ["Vue.js", "Socket.io", "Node.js", "MongoDB", "Redis", "AWS"],
    stats: { users: "5K+", projects: "15K+", tasks: "200K+", teams: "500+" },
    highlights: [
      "Managed 200K+ tasks",
      "Used by 500+ teams",
      "Real-time sync across 5K+ users",
    ],
    timeline: "6 months • 2023",
    team: "5 developers, 1 designer",
    link: "#",
    github: "#",
  },
};

const displayProject = computed(() => {
  if (project.value) return project.value;
  return defaultProjects[String(id)] || null;
});

const headTitle = computed(() =>
  displayProject.value
    ? `${displayProject.value.title} — Md. Muhir Uddin`
    : "Project — Md. Muhir Uddin"
);

const headDescription = computed(() =>
  displayProject.value
    ? displayProject.value.description
    : "Project details and case study"
);

useHead({
  title: headTitle,
  meta: [
    { name: "description", content: headDescription },
    { property: "og:title", content: headTitle },
    { property: "og:description", content: headDescription },
  ],
});

function isImageUrl(val: string) {
  return val && (val.startsWith("/") || val.startsWith("http"));
}

function back() {
  router.push("/#projects");
}
</script>

<template>
  <div class="min-h-screen bg-theme">
    <div class="glass-header">
      <div class="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <button
          @click="back"
          class="p-2 hover:bg-theme-secondary rounded-full transition text-theme-secondary"
          aria-label="Back"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <span class="text-theme-secondary text-sm font-semibold">Projects</span>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2"
        :style="{ borderColor: 'var(--accent)' }"
      ></div>
    </div>

    <div v-else-if="displayProject" class="max-w-5xl mx-auto px-6 py-12">
      <div class="card border-theme p-8 md:p-12 mb-8">
        <div class="flex flex-col md:flex-row items-start gap-6 mb-6">
          <img
            v-if="isImageUrl(displayProject.image)"
            :src="displayProject.image"
            class="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover"
            :style="{ boxShadow: 'var(--shadow)' }"
          />
          <div v-else class="text-7xl">{{ displayProject.image }}</div>
          <div>
            <p class="text-accent text-sm font-semibold mb-2">
              {{ displayProject.category }}
            </p>
            <h1 class="text-4xl md:text-5xl font-bold text-theme mb-2">
              {{ displayProject.title }}
            </h1>
            <p class="text-lg text-theme-secondary">
              {{ displayProject.description }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="displayProject.stats && Object.keys(displayProject.stats).length"
        class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div
          v-for="(value, key) in displayProject.stats"
          :key="key"
          class="card-stat p-4 text-center"
        >
          <p class="text-2xl font-bold text-accent-light mb-1">{{ value }}</p>
          <p class="text-xs text-theme-secondary font-medium capitalize">
            {{
              String(key)
                .replace(/([A-Z])/g, " $1")
                .trim()
            }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <div class="card p-6">
            <h2 class="text-xl font-bold text-theme mb-4">// Overview</h2>
            <p class="text-theme-secondary whitespace-pre-line leading-relaxed">
              {{ displayProject.fullDescription || displayProject.description }}
            </p>
          </div>

          <div v-if="displayProject.highlights?.length" class="card p-6">
            <h2 class="text-xl font-bold text-theme mb-4">// Key Results</h2>
            <ul class="space-y-3">
              <li
                v-for="(item, idx) in displayProject.highlights"
                :key="idx"
                class="flex gap-3"
              >
                <span class="text-success font-bold text-lg leading-relaxed"
                  >&#10003;</span
                >
                <span class="text-theme-secondary">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="card p-6">
            <h2 class="text-xl font-bold text-theme mb-4">// Technologies</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in displayProject.technologies || displayProject.tags || []"
                :key="tech"
                class="tag-badge"
                >{{ tech }}</span
              >
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div v-if="displayProject.timeline || displayProject.team" class="card p-6">
            <h3 class="font-bold text-theme mb-4">Project Details</h3>
            <div class="space-y-4 text-sm">
              <div v-if="displayProject.timeline">
                <p class="text-theme-secondary font-medium">Timeline</p>
                <p class="text-theme mt-1">{{ displayProject.timeline }}</p>
              </div>
              <div v-if="displayProject.team" class="border-t border-theme pt-4">
                <p class="text-theme-secondary font-medium">Team</p>
                <p class="text-theme mt-1">{{ displayProject.team }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-bold text-theme mb-4">Links</h3>
            <div class="space-y-3">
              <a
                v-if="displayProject.link"
                :href="displayProject.link"
                target="_blank"
                rel="noopener"
                class="btn-primary w-full text-sm justify-center"
              >
                View Live
              </a>
              <a
                v-if="displayProject.github"
                :href="displayProject.github"
                target="_blank"
                rel="noopener"
                class="btn-outline w-full text-sm justify-center"
              >
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-12">
        <button @click="back" class="btn-outline">← Back to Projects</button>
      </div>
    </div>

    <div v-else class="max-w-5xl mx-auto px-6 py-12">
      <div class="card p-8 text-center">
        <p class="text-xl text-theme-secondary mb-4">Project not found.</p>
        <button @click="back" class="btn-primary">Back to Projects</button>
      </div>
    </div>
  </div>
</template>
