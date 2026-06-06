<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Posts</h1>
      <button @click="openForm()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Add Post
      </button>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">Loading...</div>

    <div v-else-if="items.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-500 mb-4">No posts yet</p>
      <button @click="openForm()" class="text-blue-600 hover:underline">Add your first post</button>
    </div>

    <div v-else class="grid gap-4">
      <div v-for="item in items" :key="item.id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
        <div class="flex-1 min-w-0 mr-4">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-gray-800 truncate">{{ item.title }}</h3>
            <span v-if="!item.published" class="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">Draft</span>
            <span v-else class="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">Published</span>
          </div>
          <p class="text-sm text-gray-500 truncate mt-1">{{ item.excerpt }}</p>
          <div class="flex flex-wrap gap-1 mt-2">
            <span v-for="tag in item.tags" :key="tag" class="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600">#{{ tag }}</span>
          </div>
          <p class="text-xs text-gray-400 mt-1">{{ formatDate(item.createdAt) }}</p>
        </div>
        <div class="flex gap-2 shrink-0">
          <button @click="openForm(item)" class="p-2 text-gray-500 hover:text-blue-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button @click="deleteItem(item.id)" class="p-2 text-gray-500 hover:text-red-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6">{{ editingItem ? 'Edit' : 'Add' }} Post</h2>
        <form @submit.prevent="saveItem" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input v-model="form.title" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input v-model="form.slug" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea v-model="form.excerpt" rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea v-model="form.content" rows="10" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"></textarea>
            <p class="text-xs text-gray-400 mt-1">Supports basic markdown: ## headings, - lists, 1. numbered lists</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input v-model="tagsInput" type="text" placeholder="Vue, Nuxt, TypeScript" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <div class="flex gap-2">
                <input v-model="form.image" type="text" placeholder="Image URL or upload one" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <label class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm flex items-center gap-1 shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Upload
                  <input type="file" accept="image/*" @change="uploadImage" class="hidden" />
                </label>
              </div>
              <div v-if="uploading" class="text-xs text-gray-500 mt-1">Uploading...</div>
              <div v-if="form.image && !uploading" class="mt-2">
                <img :src="form.image" class="h-24 w-auto rounded-lg border border-gray-200 object-cover" @error="form.image = null" />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input v-model="form.published" type="checkbox" id="published" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label for="published" class="text-sm text-gray-700">Published</label>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="closeForm" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { request } = useApi()
const items = ref([])
const loading = ref(true)
const showForm = ref(false)
const editingItem = ref(null)

const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  tags: [],
  published: true
})

const tagsInput = ref('')
const uploading = ref(false)

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const uploadImage = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  uploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)

    const token = localStorage.getItem('admin_token')
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.statusMessage || `Upload failed (${res.status})`)
    }

    const data = await res.json()
    form.value.image = data.data.url
  } catch (err) {
    alert('Upload failed. ' + (err instanceof Error ? err.message : 'Try logging out and back in if your session expired.'))
    console.error(err)
  } finally {
    uploading.value = false
    e.target.value = ''
  }
}

const loadItems = async () => {
  loading.value = true
  try {
    const data = await request({ url: '/api/posts' })
    items.value = data.data || data
  } catch (e) {
    items.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadItems)

const openForm = (item) => {
  if (item) {
    editingItem.value = item
    form.value = {
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || '',
      content: item.content || '',
      image: item.image || null,
      tags: item.tags || [],
      published: item.published !== false
    }
    tagsInput.value = item.tags?.join(', ') || ''
  } else {
    editingItem.value = null
    form.value = { title: '', slug: '', excerpt: '', content: '', image: null, tags: [], published: true }
    tagsInput.value = ''
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingItem.value = null
}

const saveItem = async () => {
  form.value.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)

  try {
    if (editingItem.value) {
      await request({
        url: `/api/posts/${editingItem.value.id}`,
        method: 'PUT',
        data: form.value,
        authRequired: true
      })
      const index = items.value.findIndex(i => i.id === editingItem.value.id)
      if (index !== -1) {
        items.value[index] = { ...editingItem.value, ...form.value }
      }
    } else {
      const response = await request({
        url: '/api/posts',
        method: 'POST',
        data: form.value,
        authRequired: true
      })
      items.value.push(response.data || response)
    }
    closeForm()
  } catch (e) {
    console.error('Error saving post:', e)
    alert('Failed to save post')
  }
}

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await request({
        url: `/api/posts/${id}`,
        method: 'DELETE',
        authRequired: true
      })
      items.value = items.value.filter(i => i.id !== id)
    } catch (e) {
      console.error('Error deleting post:', e)
      alert('Failed to delete post')
    }
  }
}
</script>
