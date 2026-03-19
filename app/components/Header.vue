<script setup>
import { ref } from "vue";
const open = ref(false);
function toggle() {
  open.value = !open.value;
}
function close() {
  open.value = false;
}

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Experience", to: "/experience" },
  { name: "Projects", to: "/projects" },
  { name: "Skills", to: "/skills" },
  { name: "Contact", to: "/contact" },
];
</script>
<template>
  <header
    style="background-color: #252526; border-bottom: 1px solid #3e3e42"
    class="sticky top-0 z-50"
  >
    <div class="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo & Brand - VS Code Terminal Icon Style -->
      <div class="flex items-center gap-3 min-w-fit">
        <div
          style="background: linear-gradient(135deg, #007acc 0%, #0098ff 100%)"
          class="w-10 h-10 flex items-center justify-center text-white font-bold text-sm"
        >
          &gt;_
        </div>
        <div class="hidden sm:block">
          <div style="color: #cccccc" class="text-base font-semibold">
            Md. Muhir
          </div>
          <div style="color: #858585" class="text-xs">Full Stack Developer</div>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <nav
        v-for="(link, index) in navLinks"
        :key="index"
        class="hidden md:flex items-center gap-8 text-sm"
      >
        <nuxt-link
          style="color: #858585"
          class="hover:text-blue-400 transition duration-200"
          :to="link.to"
          >{{ link.name }}</nuxt-link
        >
      </nav>

      <!-- Action Buttons & Mobile Menu Toggle -->
      <div class="flex items-center gap-3">
        <a
          href="#contact"
          style="border-color: #007acc; color: #007acc"
          class="hidden sm:inline-block px-4 py-2 border text-sm font-semibold hover:bg-opacity-10 hover:bg-blue-600 transition"
        >
          Connect
        </a>
        <button
          @click="toggle"
          aria-label="menu"
          style="color: #858585"
          class="md:hidden p-2 hover:bg-opacity-50 hover:bg-gray-700 transition rounded"
        >
          <svg
            v-show="!open"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-show="open"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="open"
          style="background-color: #252526; border-bottom: 1px solid #3e3e42"
          class="md:hidden absolute left-0 right-0 top-full shadow-lg"
        >
          <nav class="flex flex-col p-4 gap-3">
            <a
              href="#home"
              @click="close"
              style="color: #cccccc"
              class="hover:text-blue-400 font-medium transition py-2"
              >Home</a
            >
            <a
              href="#about"
              @click="close"
              style="color: #cccccc"
              class="hover:text-blue-400 font-medium transition py-2"
              >About</a
            >
            <a
              href="#experience"
              @click="close"
              style="color: #cccccc"
              class="hover:text-blue-400 font-medium transition py-2"
              >Experience</a
            >
            <a
              href="#projects"
              @click="close"
              style="color: #cccccc"
              class="hover:text-blue-400 font-medium transition py-2"
              >Projects</a
            >
            <a
              href="#skills"
              @click="close"
              style="color: #cccccc"
              class="hover:text-blue-400 font-medium transition py-2"
              >Skills</a
            >
            <a
              href="#contact"
              @click="close"
              style="color: #cccccc"
              class="hover:text-blue-400 font-medium transition py-2"
              >Contact</a
            >
            <div style="border-color: #3e3e42" class="border-t mt-3 pt-3">
              <a
                href="#contact"
                @click="close"
                style="background-color: #007acc; color: #ffffff"
                class="block w-full px-4 py-2 text-center font-semibold hover:bg-blue-700 transition"
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
