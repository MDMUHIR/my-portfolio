<template>
  <div>
    <Hero />

    <!-- Quick Links Section -->
    <section
      style="background-color: #252526; border-top: 1px solid #3e3e42"
      class="py-16"
    >
      <div class="max-w-5xl mx-auto px-6">
        <h2 style="color: #0098ff" class="text-3xl font-bold mb-12 text-center">
          // explore my portfolio
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- About Card -->
          <NuxtLink
            to="/about"
            class="card p-8 group hover:shadow-xl transition text-center"
          >
            <div class="text-5xl mb-4">👤</div>
            <h3
              style="color: #cccccc"
              class="text-xl font-bold mb-2 group-hover:text-blue-400 transition"
            >
              About
            </h3>
            <p style="color: #858585" class="text-sm mb-4">
              Learn more about me and my background
            </p>
            <span style="color: #007acc" class="text-sm font-semibold"
              >View →</span
            >
          </NuxtLink>

          <!-- Experience Card -->
          <NuxtLink
            to="/experience"
            class="card p-8 group hover:shadow-xl transition text-center"
          >
            <div class="text-5xl mb-4">💼</div>
            <h3
              style="color: #cccccc"
              class="text-xl font-bold mb-2 group-hover:text-blue-400 transition"
            >
              Experience
            </h3>
            <p style="color: #858585" class="text-sm mb-4">
              Check out my work history
            </p>
            <span style="color: #007acc" class="text-sm font-semibold"
              >View →</span
            >
          </NuxtLink>

          <!-- Skills Card -->
          <NuxtLink
            to="/skills"
            class="card p-8 group hover:shadow-xl transition text-center"
          >
            <div class="text-5xl mb-4">🎯</div>
            <h3
              style="color: #cccccc"
              class="text-xl font-bold mb-2 group-hover:text-blue-400 transition"
            >
              Skills
            </h3>
            <p style="color: #858585" class="text-sm mb-4">
              Explore my technical skills
            </p>
            <span style="color: #007acc" class="text-sm font-semibold"
              >View →</span
            >
          </NuxtLink>

          <!-- Projects Card -->
          <NuxtLink
            to="/projects"
            class="card p-8 group hover:shadow-xl transition text-center"
          >
            <div class="text-5xl mb-4">🚀</div>
            <h3
              style="color: #cccccc"
              class="text-xl font-bold mb-2 group-hover:text-blue-400 transition"
            >
              Projects
            </h3>
            <p style="color: #858585" class="text-sm mb-4">
              View all my projects
            </p>
            <span style="color: #007acc" class="text-sm font-semibold"
              >View →</span
            >
          </NuxtLink>
        </div>

        <div class="flex justify-center mt-12">
          <NuxtLink to="/contact" class="btn-primary text-center">
            → Get in Touch
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>
