<script setup lang="ts">
interface Profile {
  name: string;
  title: string;
  description: string;
  years_exp: number;
  projects_count: number;
  social_links: Array<{ icon: string; title: string; link: string }>;
  skills: string[];
}

const profile = ref<Profile | null>(null);
const loading = ref(false);

const defaultProfile: Profile = {
  name: "Md. Muhir Uddin",
  title: "Frontend Developer & AI Engineer",
  description:
    "I build scalable web applications, integrate AI/ML technologies, and help teams ship production-ready features. Passionate about clean code and elegant solutions.",
  years_exp: 2,
  projects_count: 10,
  social_links: [
    { icon: "🐙", title: "GitHub", link: "#" },
    { icon: "💼", title: "LinkedIn", link: "#" },
    { icon: "𝕏", title: "Twitter", link: "#" },
    { icon: "📧", title: "Email", link: "mailto:#" },
  ],
  skills: ["Vue", "React", "JavaScript", "Langchain", "Python"],
};

const displayProfile = computed(() => profile.value || defaultProfile);
</script>

<template>
  <section
    id="home"
    class="py-20 md:py-32"
    :style="{
      background: `linear-gradient(135deg, var(--bg) 0%, var(--bg-secondary) 50%, var(--bg) 100%)`,
    }"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-5xl md:text-6xl font-bold mb-4 leading-tight text-theme">
            <span class="text-accent mr-4">{{ displayProfile.name.split(" ").slice(0, 1).join(" ") }}</span>
            <span class="text-success mr-4">{{ displayProfile.name.split(" ").slice(1, 2).join(" ") }}</span>
            <span class="text-warning">{{ displayProfile.name.split(" ").slice(2).join(" ") }}</span>
          </h1>
          <p class="text-theme-secondary text-xl mb-2 font-semibold">
            > {{ displayProfile.title }}
          </p>
          <p class="text-theme text-base mb-8 leading-relaxed">
            {{ displayProfile.description }}
          </p>

          <div class="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-theme">
            <div>
              <div class="text-accent text-2xl font-bold">{{ displayProfile.years_exp }}+</div>
              <div class="text-theme-secondary text-sm">Years Exp</div>
            </div>
            <div>
              <div class="text-accent text-2xl font-bold">{{ displayProfile.projects_count }}+</div>
              <div class="text-theme-secondary text-sm">Projects</div>
            </div>
            <div>
              <div class="text-success text-2xl font-bold">∞</div>
              <div class="text-theme-secondary text-sm">Learning</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#projects" class="btn-primary text-center">▶ View Projects</a>
            <a href="#contact" class="btn-secondary text-center">→ Connect</a>
          </div>

          <div class="flex gap-4 mt-8">
            <a
              v-for="link in displayProfile.social_links"
              :key="link.title"
              :href="link.link"
              :aria-label="link.title"
              class="w-10 h-10 flex items-center justify-center transition text-lg"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }"
              target="_blank"
              rel="noopener"
            >
              {{ link.icon }}
            </a>
          </div>
        </div>

        <div class="hidden md:flex items-center justify-center">
          <div
            class="w-full max-w-sm border rounded-lg p-6 font-mono text-sm overflow-x-auto"
            :style="{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg)',
            }"
          >
            <div class="text-theme-secondary">
              <div class="text-success">const</div>
              <span class="text-theme"> developer = {</span>
            </div>
            <div style="margin-left: 16px" class="text-theme-secondary">
              <span style="color: #9cdcfe">name</span>
              <span class="text-theme">:</span>
              <span style="color: #ce9178">"{{ displayProfile.name }}"</span>
              <span class="text-theme">,</span>
            </div>
            <div style="margin-left: 16px" class="text-theme-secondary">
              <span style="color: #9cdcfe">skills</span>
              <span class="text-theme">:[</span>
              <span v-for="(skill, i) in displayProfile.skills.slice(0, 5)" :key="skill">
                <span style="color: #ce9178">"{{ skill }}"</span>
                <span v-if="i < Math.min(displayProfile.skills.length, 5) - 1" class="text-theme">,</span>
              </span>
              <span class="text-theme">],</span>
            </div>
            <div style="margin-left: 16px" class="text-theme-secondary">
              <span style="color: #9cdcfe">passionate</span>
              <span class="text-theme">:</span>
              <span style="color: #569cd6">true</span>
              <span class="text-theme">,</span>
            </div>
            <div class="text-theme-secondary">
              <span class="text-theme">};</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-16">
        <a
          href="#about"
          class="flex flex-col items-center hover:text-accent transition animate-bounce text-theme-secondary"
        >
          <span class="text-sm font-semibold mb-2">Scroll to explore</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
