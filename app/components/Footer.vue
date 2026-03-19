<template>
  <footer
    style="background-color: #1e1e1e; border-top: 1px solid #3e3e42"
    class="mt-12 py-8"
  >
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Profile -->
        <div>
          <h3 style="color: #4ec9b0" class="font-semibold mb-4">// profile</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#home"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#about"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >About</a
              >
            </li>
            <li>
              <a
                href="#experience"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Experience</a
              >
            </li>
            <li>
              <a
                href="#projects"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Projects</a
              >
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 style="color: #4ec9b0" class="font-semibold mb-4">// links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >GitHub</a
              >
            </li>
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >LinkedIn</a
              >
            </li>
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Twitter/X</a
              >
            </li>
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Email</a
              >
            </li>
          </ul>
        </div>

        <!-- Learn -->
        <div>
          <h3 style="color: #4ec9b0" class="font-semibold mb-4">
            // resources
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Tutorials</a
              >
            </li>
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Case Studies</a
              >
            </li>
            <li>
              <a
                href="#"
                style="color: #858585"
                class="hover:text-blue-400 transition"
                >Résumé</a
              >
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 style="color: #4ec9b0" class="font-semibold mb-4">// social</h3>
          <div class="flex gap-4 text-lg">
            <a
              v-for="link in displaySocialLinks"
              :key="link.title"
              :href="link.link"
              :aria-label="link.title"
              style="color: #858585"
              class="hover:text-blue-400 transition"
              >{{ link.icon }}</a
            >
          </div>
        </div>
      </div>

      <!-- Divider & Copyright -->
      <div
        style="border-color: #3e3e42; color: #858585"
        class="border-t pt-6 text-center text-sm"
      >
        <p>&copy; {{ year }} Your Name • All Rights Reserved</p>
        <p class="mt-2 text-xs">
          Built with
          <a
            href="https://nuxt.com"
            target="_blank"
            rel="noopener"
            style="color: #007acc"
            class="hover:text-blue-400 transition"
            >Nuxt</a
          >
          &
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener"
            style="color: #007acc"
            class="hover:text-blue-400 transition"
            >Tailwind</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { socialLinks, fetchSocialLinks } = useSocialLinks();

onMounted(async () => {
  await fetchSocialLinks();
});

const year = new Date().getFullYear();

const defaultSocialLinks = [
  { icon: '🐙', title: 'GitHub', link: '#' },
  { icon: '💼', title: 'LinkedIn', link: '#' },
  { icon: '𝕏', title: 'Twitter', link: '#' },
  { icon: '✉️', title: 'Email', link: 'mailto:#' },
];

const displaySocialLinks = computed(() => {
  if (socialLinks.value.length > 0) {
    return socialLinks.value.map(link => ({
      icon: link.icon || '📧',
      title: link.title,
      link: link.link,
    }));
  }
  return defaultSocialLinks;
});
</script>
