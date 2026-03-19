<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

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
    category: "AI & Web Development",
    description:
      "An AI-powered search assistant that helps users find information instantly.",
    image: "🤖",
    details:
      "Built with Node.js backend, Vue.js frontend, machine learning models for recommendations.",
    fullDescription: `Project Alpha is a full-stack application featuring intelligent search capabilities powered by machine learning models. The platform demonstrates expertise in both frontend and backend development.

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
    results: [
      "Reduced search latency by 70%",
      "Achieved 3.5x increase in user engagement",
      "Scaled from 1K to 100K users in 6 months",
    ],
    timeline: "6 months • 2023-2024",
    team: "5 developers, 1 ML specialist",
    links: { live: "#", github: "#", demo: "#" },
  },
  "2": {
    id: 2,
    title: "Dashboard Pro",
    category: "Data Visualization & Analytics",
    description:
      "Real-time analytics dashboard built with WebSockets for live data updates.",
    image: "📊",
    details:
      "Enterprise-grade analytics platform providing real-time insights.",
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
    results: [
      "Decreased decision-making time by 80%",
      "Enabled monitoring of 10M+ data points",
      "Improved data accuracy to 99.98%",
    ],
    timeline: "8 months • 2023",
    team: "6 developers, 2 designers, 1 data engineer",
    links: { live: "#", github: "#", demo: "#" },
  },
};

const displayProject = computed(() => {
  if (project.value) return project.value;
  return defaultProjects[String(id)] || null;
});

function back() {
  router.push("/#projects");
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <button
          @click="back"
          class="p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Back"
        >
          <svg
            class="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <span class="text-gray-600">Projects</span>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
      ></div>
    </div>

    <div v-else-if="displayProject" class="max-w-5xl mx-auto px-6 py-12">
      <div class="card p-8 md:p-12 mb-8 border-0 shadow-md">
        <div class="flex items-center gap-6 mb-6">
          <div class="text-7xl">{{ displayProject.image }}</div>
          <div>
            <p class="text-sm font-semibold text-blue-600 mb-2">
              {{ displayProject.category }}
            </p>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {{ displayProject.title }}
            </h1>
            <p class="text-lg text-gray-600">
              {{ displayProject.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div
          v-for="(value, key, idx) in displayProject.stats"
          :key="key"
          class="card p-4 text-center"
        >
          <p class="text-2xl font-bold text-blue-600 mb-1">{{ value }}</p>
          <p class="text-xs text-gray-600 font-medium capitalize">
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
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p class="text-gray-700 whitespace-pre-line leading-relaxed">
              {{ displayProject.fullDescription }}
            </p>
          </div>

          <div class="card p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Key Results</h2>
            <ul class="space-y-3">
              <li
                v-for="(result, idx) in displayProject.results"
                :key="idx"
                class="flex gap-3"
              >
                <span class="text-green-600 font-bold text-lg leading-relaxed"
                  >✓</span
                >
                <span class="text-gray-700">{{ result }}</span>
              </li>
            </ul>
          </div>

          <div class="card p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Technologies</h2>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tech in displayProject.technologies"
                :key="tech"
                class="badge"
                >{{ tech }}</span
              >
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="card p-6">
            <h3 class="font-bold text-gray-900 mb-4">Project Details</h3>
            <div class="space-y-4 text-sm">
              <div>
                <p class="text-gray-600 font-medium">Timeline</p>
                <p class="text-gray-900 mt-1">{{ displayProject.timeline }}</p>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <p class="text-gray-600 font-medium">Team</p>
                <p class="text-gray-900 mt-1">{{ displayProject.team }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-bold text-gray-900 mb-4">Links</h3>
            <div class="space-y-2">
              <a
                v-for="(link, name) in displayProject.links"
                :key="name"
                :href="link"
                target="_blank"
                rel="noopener"
                class="block px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm capitalize"
              >
                {{
                  name === "live"
                    ? "View Live"
                    : name === "github"
                      ? "View Code"
                      : name === "demo"
                        ? "Demo"
                        : name
                }}
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
        <p class="text-xl text-gray-600 mb-4">Project not found.</p>
        <button @click="back" class="btn-primary">Back to Projects</button>
      </div>
    </div>
  </div>
</template>
