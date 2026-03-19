<template>
  <div>
    <div
      style="background-color: #1e1e1e; border-bottom: 1px solid #3e3e42"
      class="py-6 mb-8"
    >
      <div class="max-w-5xl mx-auto px-6">
        <NuxtLink
          to="/"
          style="color: #858585"
          class="hover:text-blue-400 transition text-sm mb-4 inline-block"
          >← Back to Home</NuxtLink
        >
        <h1 style="color: #cccccc" class="text-4xl font-bold">
          # Skills & Expertise
        </h1>
      </div>
    </div>
    <Skills />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>
