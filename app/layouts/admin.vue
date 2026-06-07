<template>
  <div class="min-h-screen bg-gray-50 flex">
    <aside class="w-64 bg-white border-r border-gray-200 fixed h-full">
      <div class="p-6 border-b border-gray-200">
        <NuxtLink to="/" class="text-xl font-bold text-gray-800">My Portfolio</NuxtLink>
        <p class="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/admin" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path === '/admin' }">
              Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/projects" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path.startsWith('/admin/projects') }">
              Projects
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/skills" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path.startsWith('/admin/skills') }">
              Skills
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/experience" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path.startsWith('/admin/experience') }">
              Experience
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/posts" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path.startsWith('/admin/posts') }">
              Posts
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/testimonials" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path.startsWith('/admin/testimonials') }">
              Testimonials
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/social-links" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path.startsWith('/admin/social-links') }">
              Social Links
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/admin/settings" class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" :class="{ 'bg-gray-100 text-blue-600': route.path.startsWith('/admin/settings') }">
              Settings
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button @click="handleLogout" class="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
        <NuxtLink to="/" class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm mt-2">
          ← Back to Site
        </NuxtLink>
      </div>
    </aside>
    <main class="ml-64 flex-1 p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const auth = useAuth()

const handleLogout = () => {
  auth.logout()
}

onMounted(() => {
  auth.initAuth()
  if (!auth.isAuthenticated.value && route.path !== '/admin/login') {
    router.push('/admin/login')
  }
})

watch(() => route.path, (path) => {
  if (!auth.isAuthenticated.value && path !== '/admin/login') {
    router.push('/admin/login')
  }
})
</script>
