<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    category: "AI & Web Development",
    description:
      "An AI-powered search assistant that helps users find information instantly.",
    image: "🤖",
    details:
      "Built with Node.js backend, Vue.js frontend, machine learning models for recommendations, and a custom vector database for efficient semantic search.",
    fullDescription: `Project Alpha is a full-stack application featuring intelligent search capabilities powered by machine learning models. The platform demonstrates expertise in both frontend and backend development, with sophisticated AI integration.

Key Features:
- Real-time search with ML-powered recommendations
- RESTful API with 99.9% uptime SLA
- Responsive design supporting 100K+ concurrent users
- Advanced caching and optimization strategies
- Comprehensive API documentation

The project handles millions of queries daily with sub-100ms response times, showcasing mastery of performance optimization and scalability challenges.`,
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
      "Reduced search latency by 70% through algorithm optimization",
      "Achieved 3.5x increase in user engagement",
      "Scaled from 1K to 100K users in 6 months",
    ],
    timeline: "6 months • 2023-2024",
    team: "5 developers, 1 ML specialist",
    links: {
      live: "#",
      github: "#",
      demo: "#",
    },
  },
  {
    id: 2,
    title: "Dashboard Pro",
    category: "Data Visualization & Analytics",
    description:
      "Real-time analytics dashboard built with WebSockets for live data updates.",
    image: "📊",
    details:
      "Enterprise-grade analytics platform providing real-time insights with interactive visualizations and predictive analytics powered by D3.js.",
    fullDescription: `Dashboard Pro is an enterprise-scale analytics platform designed to handle massive data streams with real-time visualization capabilities. It demonstrates expertise in scalable web architecture and advanced data visualization techniques.

Key Features:
- WebSocket-based real-time data streaming
- Advanced D3.js visualizations for complex data
- Handles millions of data points efficiently
- Custom dashboard builder for users
- Predictive analytics using machine learning
- Export to multiple formats (PDF, CSV, Excel)

The platform is used by Fortune 500 companies to monitor KPIs and make data-driven decisions in real-time.`,
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
      "Enabled monitoring of 10M+ data points in real-time",
      "Improved data accuracy to 99.98%",
    ],
    timeline: "8 months • 2023",
    team: "6 developers, 2 designers, 1 data engineer",
    links: {
      live: "#",
      github: "#",
      demo: "#",
    },
  },
  {
    id: 3,
    title: "CLI Tools Suite",
    category: "Developer Tools",
    description:
      "Developer tools and automation scripts to streamline workflows.",
    image: "⚙️",
    details:
      "A comprehensive collection of command-line tools designed to automate repetitive development tasks, improve productivity, and standardize workflows.",
    fullDescription: `CLI Tools Suite is a collection of 10+ command-line utilities designed to streamline common development tasks and improve workflow efficiency across teams.

Key Features:
- Project scaffolding tool supporting multiple frameworks
- Automated code formatting and linting
- Git workflow automation
- Database migration tools
- Performance profiling utilities
- Cross-platform compatibility (Windows, macOS, Linux)

Downloaded over 50K times on npm with an average rating of 4.7 stars, demonstrating strong community adoption and reliability.`,
    technologies: [
      "Node.js",
      "Commander.js",
      "Inquirer.js",
      "Jest",
      "npm",
      "ESLint",
    ],
    stats: {
      downloads: "50K+ monthly",
      stars: "1.2K on GitHub",
      coverage: "95% test coverage",
      users: "10K+ developers",
    },
    results: [
      "Reduced project setup time from hours to minutes",
      "Eliminated 40% of manual development tasks",
      "Improved code consistency across teams",
    ],
    timeline: "3 months • 2023",
    team: "2 developers, community contributors",
    links: {
      live: "#",
      github: "#",
      npm: "#",
    },
  },
];

const project = projects.find((p) => String(p.id) === String(id)) || null;

function back() {
  router.push("/#projects");
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Navigation -->
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

    <!-- Main Content -->
    <div v-if="project" class="max-w-5xl mx-auto px-6 py-12">
      <!-- Hero Section -->
      <div class="card p-8 md:p-12 mb-8 border-0 shadow-md">
        <div class="flex items-center gap-6 mb-6">
          <div class="text-7xl">{{ project.image }}</div>
          <div>
            <p class="text-sm font-semibold text-blue-600 mb-2">
              {{ project.category }}
            </p>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {{ project.title }}
            </h1>
            <p class="text-lg text-gray-600">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- Project Info Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-blue-600 mb-1">
            {{ project.stats.users }}
          </p>
          <p class="text-xs text-gray-600 font-medium">Users</p>
        </div>
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-blue-600 mb-1">
            {{ project.stats.uptime || project.stats.queries }}
          </p>
          <p class="text-xs text-gray-600 font-medium">
            {{ project.stats.uptime ? "Uptime" : "Activity" }}
          </p>
        </div>
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-blue-600 mb-1">
            {{ project.stats.coverage || project.stats.availability }}
          </p>
          <p class="text-xs text-gray-600 font-medium">
            {{ project.stats.coverage ? "Test Coverage" : "Availability" }}
          </p>
        </div>
        <div class="card p-4 text-center">
          <p class="text-2xl font-bold text-blue-600 mb-1">
            {{ project.stats.avgResponse || project.stats.downloads }}
          </p>
          <p class="text-xs text-gray-600 font-medium">
            {{ project.stats.avgResponse ? "Response Time" : "Downloads / Mo" }}
          </p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Overview -->
          <div class="card p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p class="text-gray-700 whitespace-pre-line leading-relaxed">
              {{ project.fullDescription }}
            </p>
          </div>

          <!-- Key Results -->
          <div class="card p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Key Results</h2>
            <ul class="space-y-3">
              <li
                v-for="(result, idx) in project.results"
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

          <!-- Technologies Used -->
          <div class="card p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Technologies</h2>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="badge"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Project Details -->
          <div class="card p-6">
            <h3 class="font-bold text-gray-900 mb-4">Project Details</h3>
            <div class="space-y-4 text-sm">
              <div>
                <p class="text-gray-600 font-medium">Timeline</p>
                <p class="text-gray-900 mt-1">{{ project.timeline }}</p>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <p class="text-gray-600 font-medium">Team</p>
                <p class="text-gray-900 mt-1">{{ project.team }}</p>
              </div>
            </div>
          </div>

          <!-- Links -->
          <div class="card p-6">
            <h3 class="font-bold text-gray-900 mb-4">Links</h3>
            <div class="space-y-2">
              <a
                v-for="(link, name) in project.links"
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
                      : name === "npm"
                        ? "NPM Package"
                        : "Demo"
                }}
              </a>
            </div>
          </div>

          <!-- Related -->
          <div class="card p-6">
            <h3 class="font-bold text-gray-900 mb-4">Share Project</h3>
            <div class="space-y-2 text-sm">
              <button
                class="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Share on LinkedIn
              </button>
              <button
                class="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Share on Twitter
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Projects -->
      <div class="flex justify-center mt-12">
        <button @click="back" class="btn-outline">← Back to Projects</button>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="max-w-5xl mx-auto px-6 py-12">
      <div class="card p-8 text-center">
        <p class="text-xl text-gray-600 mb-4">Project not found.</p>
        <button @click="back" class="btn-primary">Back to Projects</button>
      </div>
    </div>
  </div>
</template>
