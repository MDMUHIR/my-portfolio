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
    return socialLinks.value.map((link) => ({
      icon: link.icon || "📧",
      title: link.title,
      link: link.link,
    }));
  }
  return defaultSocialLinks;
});
</script>

<template>
  <footer class="mt-12 py-8 bg-theme border-theme" style="border-top-width: 1px">
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-success font-semibold mb-4">// profile</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#home" class="text-theme-secondary hover:text-accent transition">Home</a></li>
            <li><a href="#about" class="text-theme-secondary hover:text-accent transition">About</a></li>
            <li><a href="#experience" class="text-theme-secondary hover:text-accent transition">Experience</a></li>
            <li><a href="#projects" class="text-theme-secondary hover:text-accent transition">Projects</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-success font-semibold mb-4">// links</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">GitHub</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">LinkedIn</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">Twitter/X</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">Email</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-success font-semibold mb-4">// resources</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">Blog</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">Tutorials</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">Case Studies</a></li>
            <li><a href="#" class="text-theme-secondary hover:text-accent transition">Résumé</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-success font-semibold mb-4">// social</h3>
          <div class="flex gap-4 text-lg">
            <a
              v-for="link in displaySocialLinks"
              :key="link.title"
              :href="link.link"
              :aria-label="link.title"
              class="text-theme-secondary hover:text-accent transition"
            >{{ link.icon }}</a>
          </div>
        </div>
      </div>

      <div class="border-theme border-t pt-6 text-center text-sm text-theme-secondary">
        <p>&copy; {{ year }} Md. Muhir Uddin • All Rights Reserved</p>
        <p class="mt-2 text-xs">
          Built with
          <a href="https://nuxt.com" target="_blank" rel="noopener" class="text-accent hover:text-accent-light transition">Nuxt</a>
          &
          <a href="https://tailwindcss.com" target="_blank" rel="noopener" class="text-accent hover:text-accent-light transition">Tailwind</a>
        </p>
      </div>
    </div>
  </footer>
</template>
