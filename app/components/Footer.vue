<script setup lang="ts">
const { socialLinks, fetchSocialLinks } = useSocialLinks();

onMounted(async () => {
  await fetchSocialLinks();
});

const year = new Date().getFullYear();

const defaultSocialLinks = [
  { icon: "🐙", title: "GitHub", link: "#" },
  { icon: "💼", title: "LinkedIn", link: "#" },
  { icon: "𝕏", title: "Twitter", link: "#" },
  { icon: "✉️", title: "Email", link: "mailto:#" },
];

const displaySocialLinks = computed(() => {
  if (socialLinks.value.length > 0) {
    return socialLinks.value.map((link) => ({ icon: link.icon || "📧", title: link.title, link: link.link }));
  }
  return defaultSocialLinks;
});
</script>

<template>
  <footer class="mt-12 sm:mt-16 py-10 sm:py-12 bg-theme border-theme" style="border-top-width: 1px">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-8 mb-8 sm:mb-10">
        <div>
          <h3 class="text-success font-semibold mb-4 text-sm sm:text-base">// profile</h3>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#home" class="text-theme-secondary hover:text-accent transition-colors duration-200">Home</a></li>
            <li><a href="#about" class="text-theme-secondary hover:text-accent transition-colors duration-200">About</a></li>
            <li><a href="#experience" class="text-theme-secondary hover:text-accent transition-colors duration-200">Experience</a></li>
            <li><a href="#projects" class="text-theme-secondary hover:text-accent transition-colors duration-200">Projects</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-success font-semibold mb-4 text-sm sm:text-base">// links</h3>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#" class="text-theme-secondary hover:text-accent transition-colors duration-200">GitHub</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition-colors duration-200">LinkedIn</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition-colors duration-200">Twitter/X</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition-colors duration-200">Email</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-success font-semibold mb-4 text-sm sm:text-base">// resources</h3>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/blog" class="text-theme-secondary hover:text-accent transition-colors duration-200">Blog</NuxtLink></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition-colors duration-200">Tutorials</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition-colors duration-200">Case Studies</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition-colors duration-200">Résumé</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-success font-semibold mb-4 text-sm sm:text-base">// social</h3>
          <div class="flex gap-3 sm:gap-4 text-xl sm:text-lg">
            <a v-for="link in displaySocialLinks" :key="link.title" :href="link.link" :aria-label="link.title" class="text-theme-secondary hover:text-accent transition-colors duration-200 hover:scale-110 inline-block">{{ link.icon }}</a>
          </div>
        </div>
      </div>

      <div class="border-theme border-t pt-6 sm:pt-8 text-center text-sm text-theme-secondary">
        <p>&copy; {{ year }} Md. Muhir Uddin • All Rights Reserved</p>
        <p class="mt-2 text-xs">
          Built with
          <a href="https://nuxt.com" target="_blank" rel="noopener" class="text-accent hover:text-accent-light transition-colors duration-200">Nuxt</a>
          &amp;
          <a href="https://tailwindcss.com" target="_blank" rel="noopener" class="text-accent hover:text-accent-light transition-colors duration-200">Tailwind</a>
        </p>
      </div>
    </div>
  </footer>
</template>
