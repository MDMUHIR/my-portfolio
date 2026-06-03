<script setup>
const open = ref(false)
const { theme, toggle } = useTheme()

function toggleMenu() {
  open.value = !open.value
}
function close() {
  open.value = false
}

const navLinks = [
  { name: "Projects", to: "/projects" },
  { name: "Blog", to: "/blog" },
  { name: "Skills", to: "/skills" },
  { name: "Contact", to: "/contact" },
]
</script>

<template>
  <header class="sticky top-0 z-50 glass-header border-theme" style="border-bottom-width: 1px">
    <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
      <nuxt-link to="/" class="group">
        <div class="flex items-center gap-3 min-w-fit">
          <div
            class="w-10 h-10 flex items-center justify-center text-white font-bold text-sm transition-transform duration-200 group-hover:scale-110"
            :style="{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)' }"
          >
            &gt;_
          </div>
          <div class="hidden sm:block">
            <div class="text-theme text-base font-semibold leading-tight">Md. Muhir</div>
            <div class="text-theme-secondary text-xs">Full Stack Developer</div>
          </div>
        </div>
      </nuxt-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <nuxt-link
          v-for="link in navLinks"
          :key="link.to"
          class="text-theme-secondary hover:text-accent transition-colors duration-200 text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
          :to="link.to"
        >{{ link.name }}</nuxt-link>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Theme Toggle -->
        <button
          @click="toggle"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
          class="p-2.5 rounded-lg transition-all duration-200 text-theme-secondary hover:text-accent"
          :class="{ 'bg-theme-tertiary': true }"
        >
          <svg v-if="theme === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <a
          href="#contact"
          class="hidden sm:inline-flex px-4 py-2 border text-sm font-semibold transition-all duration-200 rounded-lg hover:scale-105"
          :style="{ borderColor: 'var(--accent)', color: 'var(--accent)' }"
        >
          Connect
        </a>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMenu"
          aria-label="menu"
          class="md:hidden p-2.5 rounded-lg transition-all duration-200 text-theme-secondary"
          :class="{ 'bg-theme-tertiary': true }"
        >
          <svg v-show="!open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-show="open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <transition
        enter-active-class="mobile-menu-enter-active"
        leave-active-class="mobile-menu-leave-active"
        enter-from-class="mobile-menu-enter-from"
        leave-to-class="mobile-menu-leave-to"
      >
        <div
          v-if="open"
          class="md:hidden absolute left-0 right-0 top-full shadow-lg bg-theme-secondary border-theme rounded-b-lg overflow-hidden"
          style="border-width: 0 1px 1px"
        >
          <nav class="flex flex-col p-4 gap-1">
            <a
              v-for="item in ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact']"
              :key="item"
              :href="`#${item.toLowerCase()}`"
              @click="close"
              class="text-theme hover:text-accent hover:bg-theme-tertiary font-medium transition-all duration-200 py-3 px-3 rounded-lg"
            >{{ item }}</a>
            <div class="border-theme border-t mt-2 pt-3">
              <a
                href="#contact"
                @click="close"
                class="block w-full px-4 py-2.5 text-center font-semibold rounded-lg transition-all duration-200"
                :style="{ backgroundColor: 'var(--accent)', color: '#ffffff' }"
              >
                Connect
              </a>
            </div>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>
