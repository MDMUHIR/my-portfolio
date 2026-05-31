<script setup>
useTheme()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-theme text-theme">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
