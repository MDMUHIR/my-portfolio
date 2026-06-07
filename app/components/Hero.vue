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
  title: "Frontend & AI Application Developer",
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

const { observe, destroy } = useScrollReveal();

onMounted(() => {
  nextTick(() => observe(".reveal, .reveal-left, .reveal-right"));
});

onUnmounted(() => destroy());
</script>

<template>
  <section
    id="home"
    class="py-16 md:py-28 lg:py-32 relative overflow-hidden"
    :style="{ background: 'var(--gradient-hero)' }"
  >
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div
        class="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent-light blur-3xl"
      ></div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      <div
        v-else
        class="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-12 items-center"
      >
        <div class="w-full">
          <div class="reveal">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span class="text-accent mr-3">{{
                displayProfile.name.split(" ").slice(0, 1).join(" ")
              }}</span>
              <span class="text-success mr-3">{{
                displayProfile.name.split(" ").slice(1, 2).join(" ")
              }}</span>
              <span class="text-warning">{{
                displayProfile.name.split(" ").slice(2).join(" ")
              }}</span>
            </h1>
          </div>

          <div class="reveal stagger-1">
            <p
              class="text-theme-secondary text-lg sm:text-xl mb-2 font-semibold typing-cursor"
            >
              &gt; {{ displayProfile.title }}
            </p>
          </div>

          <div class="reveal stagger-2">
            <p class="text-theme text-sm sm:text-base mb-6 md:mb-8 leading-relaxed">
              {{ displayProfile.description }}
            </p>
          </div>

          <div
            class="reveal stagger-3 grid grid-cols-3 gap-3 sm:gap-4 mb-6 md:mb-8 py-5 sm:py-6 border-y border-theme"
          >
            <div class="text-center sm:text-left">
              <div class="gradient-text-accent text-xl sm:text-2xl font-bold">
                {{ displayProfile.years_exp }}+
              </div>
              <div class="text-theme-secondary text-xs sm:text-sm">Years Exp</div>
            </div>
            <div class="text-center sm:text-left">
              <div class="gradient-text-accent text-xl sm:text-2xl font-bold">
                {{ displayProfile.projects_count }}+
              </div>
              <div class="text-theme-secondary text-xs sm:text-sm">Projects</div>
            </div>
            <div class="text-center sm:text-left">
              <div class="gradient-text text-xl sm:text-2xl font-bold">∞</div>
              <div class="text-theme-secondary text-xs sm:text-sm">Learning</div>
            </div>
          </div>

          <div class="reveal stagger-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#projects" class="btn-primary text-center w-full sm:w-auto"
              >▶ View Projects</a
            >
            <a href="#contact" class="btn-secondary text-center w-full sm:w-auto"
              >→ Connect</a
            >
          </div>

          <div class="reveal stagger-5 flex gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              v-for="link in displayProfile.social_links"
              :key="link.title"
              :href="link.link"
              :aria-label="link.title"
              class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 hover:border-accent hover:text-accent hover:shadow-lg"
              :style="{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }"
              target="_blank"
              rel="noopener"
              >{{ link.icon }}</a
            >
          </div>
        </div>

        <div class="hidden md:flex items-center justify-center w-full">
          <div
            class="reveal-right w-full max-w-sm border rounded-xl p-6 font-mono text-sm overflow-x-auto transition-all duration-300 hover:shadow-xl hover:border-accent"
            :style="{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-secondary)',
            }"
          >
            <div class="flex items-center gap-2 mb-4 pb-3 border-b border-theme">
              <div class="w-3 h-3 rounded-full bg-danger"></div>
              <div class="w-3 h-3 rounded-full bg-warning"></div>
              <div class="w-3 h-3 rounded-full text-xs text-success">●</div>
              <span class="text-theme-secondary text-xs ml-2">developer.js</span>
            </div>
            <div class="text-theme-secondary">
              <span class="text-success font-semibold">const</span>
              <span class="text-theme"> developer = {</span>
            </div>
            <div class="ml-4 text-theme-secondary">
              <span style="color: #9cdcfe">name</span>
              <span class="text-theme">: </span>
              <span style="color: #ce9178">"{{ displayProfile.name }}"</span>
              <span class="text-theme">,</span>
            </div>
            <div class="ml-4 text-theme-secondary">
              <span style="color: #9cdcfe">skills</span>
              <span class="text-theme">: [</span>
              <span v-for="(skill, i) in displayProfile.skills.slice(0, 5)" :key="skill">
                <span style="color: #ce9178">"{{ skill }}"</span>
                <span
                  v-if="i < Math.min(displayProfile.skills.length, 5) - 1"
                  class="text-theme"
                  >,
                </span>
              </span>
              <span class="text-theme">],</span>
            </div>
            <div class="ml-4 text-theme-secondary">
              <span style="color: #9cdcfe">passionate</span>
              <span class="text-theme">: </span>
              <span style="color: #569cd6">true</span>
              <span class="text-theme">,</span>
            </div>
            <div class="text-theme-secondary"><span class="text-theme">};</span></div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-12 md:mt-16 reveal">
        <a
          href="#about"
          class="flex flex-col items-center hover:text-accent transition-all duration-200 text-theme-secondary group"
        >
          <span class="text-xs sm:text-sm font-semibold mb-2">Scroll to explore</span>
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 animate-bounce group-hover:translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
