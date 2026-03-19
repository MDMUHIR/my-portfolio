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

const { fetchApi } = useApi();
const profile = ref<Profile | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await fetchApi<{ data: Profile }>('/');
    profile.value = data.data || data;
  } catch (e) {
    console.error('Failed to fetch profile:', e);
  } finally {
    loading.value = false;
  }
});

const defaultProfile: Profile = {
  name: 'Md. Muhir Uddin',
  title: 'Frontend Developer & AI Engineer',
  description: 'I build scalable web applications, integrate AI/ML technologies, and help teams ship production-ready features. Passionate about clean code and elegant solutions.',
  years_exp: 2,
  projects_count: 10,
  social_links: [
    { icon: '🐙', title: 'GitHub', link: '#' },
    { icon: '💼', title: 'LinkedIn', link: '#' },
    { icon: '𝕏', title: 'Twitter', link: '#' },
    { icon: '📧', title: 'Email', link: 'mailto:#' },
  ],
  skills: ['Vue', 'React', 'JavaScript', 'Langchain', 'Python'],
};

const displayProfile = computed(() => profile.value || defaultProfile);
</script>

<template>
  <section
    id="home"
    style="
      background: linear-gradient(
        135deg,
        #1e1e1e 0%,
        #252526 50%,
        #1e1e1e 100%
      );
    "
    class="py-20 md:py-32"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1
            style="color: #cccccc"
            class="text-5xl md:text-6xl font-bold mb-4 leading-tight"
          >
            <span style="color: #007acc" class="mr-4">{{ displayProfile.name.split(' ').slice(0, 1).join(' ') }}.</span>
            <span style="color: #4ec9b0" class="mr-4">{{ displayProfile.name.split(' ').slice(1, 2).join(' ') }}</span>
            <span style="color: #dcdcaa">{{ displayProfile.name.split(' ').slice(2).join(' ') }}</span>
          </h1>
          <p style="color: #858585" class="text-xl mb-2 font-semibold">
            > {{ displayProfile.title }}
          </p>
          <p style="color: #cccccc" class="text-base mb-8 leading-relaxed">
            {{ displayProfile.description }}
          </p>

          <div
            style="border-color: #3e3e42"
            class="grid grid-cols-3 gap-4 mb-8 py-6 border-y"
          >
            <div>
              <div style="color: #007acc" class="text-2xl font-bold">{{ displayProfile.years_exp }}+</div>
              <div style="color: #858585" class="text-sm">Years Exp</div>
            </div>
            <div>
              <div style="color: #007acc" class="text-2xl font-bold">{{ displayProfile.projects_count }}+</div>
              <div style="color: #858585" class="text-sm">Projects</div>
            </div>
            <div>
              <div style="color: #4ec9b0" class="text-2xl font-bold">∞</div>
              <div style="color: #858585" class="text-sm">Learning</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#projects" class="btn-primary text-center">
              ▶ View Projects
            </a>
            <a href="#contact" class="btn-secondary text-center"> → Connect </a>
          </div>

          <div class="flex gap-4 mt-8">
            <a
              v-for="link in displayProfile.social_links"
              :key="link.title"
              :href="link.link"
              :aria-label="link.title"
              style="background-color: #2d2d30; border: 1px solid #3e3e42; color: #858585"
              class="w-10 h-10 flex items-center justify-center hover:border-blue-500 hover:text-blue-400 transition text-lg"
              target="_blank"
              rel="noopener"
            >
              {{ link.icon }}
            </a>
          </div>
        </div>

        <div class="hidden md:flex items-center justify-center">
          <div
            class="w-full max-w-sm border border-gray-700 rounded-lg p-6 bg-[#1e1e1e] font-mono text-sm overflow-x-auto"
          >
            <div style="color: #858585">
              <div style="color: #4ec9b0">const</div>
              <span style="color: #cccccc"> developer = {</span>
            </div>
            <div style="color: #858585; margin-left: 16px">
              <span style="color: #9cdcfe">name</span>
              <span style="color: #d4d4d4">:</span>
              <span style="color: #ce9178">"{{ displayProfile.name }}"</span>
              <span style="color: #d4d4d4">,</span>
            </div>
            <div style="color: #858585; margin-left: 16px">
              <span style="color: #9cdcfe">skills</span>
              <span style="color: #d4d4d4">: [</span>
              <span v-for="(skill, i) in displayProfile.skills.slice(0, 5)" :key="skill">
                <span style="color: #ce9178">"{{ skill }}"</span><span v-if="i < Math.min(displayProfile.skills.length, 5) - 1" style="color: #d4d4d4">,</span>
              </span>
              <span style="color: #d4d4d4">],</span>
            </div>
            <div style="color: #858585; margin-left: 16px">
              <span style="color: #9cdcfe">passionate</span>
              <span style="color: #d4d4d4">:</span>
              <span style="color: #569cd6">true</span>
              <span style="color: #d4d4d4">,</span>
            </div>
            <div style="color: #858585">
              <span style="color: #d4d4d4">};</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-16">
        <a
          href="#about"
          style="color: #858585"
          class="flex flex-col items-center hover:text-blue-400 transition animate-bounce"
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
