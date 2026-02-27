<script setup></script>

<template>
  <div
    class="min-h-screen flex flex-col"
    style="background-color: #1e1e1e; color: #cccccc"
  >
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
