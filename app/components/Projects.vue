<script setup>
const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description:
      "An AI-powered search assistant that helps users find information instantly.",
    longDescription:
      "A full-stack application featuring intelligent search capabilities powered by machine learning models. Built with Vue.js frontend and Node.js backend.",
    category: "AI & Web",
    tags: ["AI", "Node", "Vue", "ML"],
    image: "🤖",
    link: "#",
    github: "#",
    highlights: [
      "Real-time search with ML recommendations",
      "RESTful API with 99.9% uptime",
      "Responsive design supporting 100K+ users",
    ],
    stats: {
      users: "100K+",
      activeDaily: "25K+",
      satisfaction: "4.8/5",
    },
  },
  {
    id: 2,
    title: "Dashboard Pro",
    description:
      "Real-time analytics dashboard built with WebSockets for live data updates.",
    longDescription:
      "An enterprise-grade analytics platform providing real-time insights with interactive visualizations and predictive analytics.",
    category: "Data & Visualization",
    tags: ["Realtime", "D3", "Node", "WebSocket"],
    image: "📊",
    link: "#",
    github: "#",
    highlights: [
      "Real-time data streaming via WebSockets",
      "Advanced data visualizations with D3.js",
      "Handles millions of data points efficiently",
    ],
    stats: {
      dataPoints: "10M+",
      updateSpeed: "<100ms",
      satisfaction: "4.9/5",
    },
  },
  {
    id: 3,
    title: "CLI Tools Suite",
    description:
      "Developer tools and automation scripts to streamline workflows.",
    longDescription:
      "A comprehensive collection of command-line tools designed to automate repetitive development tasks and improve productivity.",
    category: "Developer Tools",
    tags: ["Tooling", "Node", "CLI", "Automation"],
    image: "⚙️",
    link: "#",
    github: "#",
    highlights: [
      "10+ different CLI utilities",
      "Cross-platform compatibility",
      "50K+ npm downloads",
    ],
    stats: {
      downloads: "50K+",
      coverage: "95%",
      satisfaction: "4.7/5",
    },
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce solution with payment integration and inventory management.",
    category: "Full Stack",
    tags: ["React", "Node", "Payment API", "PostgreSQL"],
    image: "🛍️",
    link: "#",
    github: "#",
    highlights: [
      "Secure payment processing",
      "Real-time inventory tracking",
      "Mobile-responsive design",
    ],
    stats: {
      transactions: "100K+",
      revenue: "$5M+",
      satisfaction: "4.8/5",
    },
  },
  {
    id: 5,
    title: "AI Content Generator",
    description: "Intelligent content generation tool powered by GPT models.",
    category: "AI/ML",
    tags: ["AI", "GPT", "Python", "Vue"],
    image: "✍️",
    link: "#",
    github: "#",
    highlights: [
      "GPT-4 integration",
      "Template-based generation",
      "API rate optimization",
    ],
    stats: {
      generated: "1M+",
      avgQuality: "9.2/10",
      satisfaction: "4.9/5",
    },
  },
  {
    id: 6,
    title: "Project Management App",
    description:
      "Collaborative project management tool with real-time updates and Kanban boards.",
    category: "Productivity",
    tags: ["Vue", "Firebase", "WebSocket", "TailwindCSS"],
    image: "📋",
    link: "#",
    github: "#",
    highlights: [
      "Real-time collaboration",
      "Customizable workflows",
      "Team analytics",
    ],
    stats: {
      teams: "500+",
      activeUsers: "50K+",
      satisfaction: "4.8/5",
    },
  },
];
</script>

<template>
  <section id="projects" style="background-color: #1e1e1e" class="section">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title">// Featured Projects</h2>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="p in projects"
          :key="p.id"
          class="card hover:shadow-xl overflow-hidden group transition-all duration-300"
        >
          <!-- Project Header with Icon -->
          <div
            style="
              background: linear-gradient(135deg, #264f78 0%, #1e1e1e 100%);
            "
            class="p-6 flex items-center justify-center min-h-32 group-hover:shadow-md transition"
          >
            <div class="text-6xl">{{ p.image }}</div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3
                  style="color: #cccccc"
                  class="font-bold text-lg group-hover:text-blue-400 transition"
                >
                  {{ p.title }}
                </h3>
                <p style="color: #007acc" class="text-xs font-semibold">
                  {{ p.category }}
                </p>
              </div>
            </div>

            <p style="color: #858585" class="text-sm mb-4 line-clamp-2">
              {{ p.description }}
            </p>

            <!-- Stats -->
            <div
              style="background-color: #2d2d30; border: 1px solid #3e3e42"
              class="grid grid-cols-2 gap-3 mb-4 p-3 rounded-lg text-xs"
            >
              <div
                v-for="(value, key) in p.stats"
                :key="key"
                class="text-center"
              >
                <div style="color: #0098ff" class="font-bold">{{ value }}</div>
                <div style="color: #858585" class="capitalize">
                  {{ key.replace(/([A-Z])/g, " $1").trim() }}
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="t in p.tags"
                :key="t"
                style="
                  background-color: #264f78;
                  color: #0098ff;
                  border: 1px solid #007acc;
                "
                class="text-xs inline-block px-2 py-1 rounded"
              >
                {{ t }}
              </span>
            </div>

            <!-- Links -->
            <div style="border-color: #3e3e42" class="flex gap-3 pt-4 border-t">
              <a
                :href="p.link"
                style="color: #007acc; border: 1px solid #007acc"
                class="flex-1 px-3 py-2 text-sm text-center rounded font-semibold hover:bg-opacity-10 hover:bg-blue-600 transition"
              >
                View
              </a>
              <a
                :href="p.github"
                style="color: #858585; border: 1px solid #3e3e42"
                class="flex-1 px-3 py-2 text-sm text-center rounded font-semibold hover:bg-opacity-10 hover:bg-gray-600 transition"
              >
                Code
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- View All Projects CTA -->
      <div class="flex justify-center mt-12">
        <a href="/projects" class="btn-primary">▶ View All Projects</a>
      </div>
    </div>
  </section>
</template>
