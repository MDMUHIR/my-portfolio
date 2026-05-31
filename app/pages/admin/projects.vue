<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Projects</h1>
      <button @click="openForm()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Add Project
      </button>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">Loading...</div>
    
    <div v-else-if="items.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-500 mb-4">No projects yet</p>
      <button @click="openForm()" class="text-blue-600 hover:underline">Add your first project</button>
    </div>

    <div v-else class="grid gap-4">
      <div v-for="item in items" :key="item.id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img v-if="item.image" :src="item.image" class="w-16 h-16 rounded-lg object-cover" />
          <div v-else class="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-sm text-gray-500">{{ item.category }}</p>
          </div>
        </div>
        <div class="flex gap-2">
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
        <h2 class="text-xl font-bold text-gray-800 mb-6">{{ editingItem ? 'Edit' : 'Add' }} Project</h2>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input v-model="form.category" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input v-model="form.image" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Link</label>
              <input v-model="form.link" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
              <input v-model="form.github" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input v-model="tagsInput" type="text" placeholder="Vue, Nuxt, TypeScript" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
            <textarea v-model="highlightsInput" rows="3" placeholder="Feature 1&#10;Feature 2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
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
const saving = ref(false)

const form = ref({
  title: '',
  slug: '',
  description: '',
  category: '',
  image: '',
  link: '',
  github: '',
  tags: [],
  highlights: []
})

const tagsInput = ref('')
const highlightsInput = ref('')

const loadItems = async () => {
  loading.value = true
  try {
    const data = await request({ url: '/api/projects' })
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
      description: item.description,
      category: item.category,
      image: item.image,
      link: item.link,
      github: item.github,
      tags: item.tags || [],
      highlights: item.highlights || []
    }
    tagsInput.value = item.tags?.join(', ') || ''
    highlightsInput.value = item.highlights?.join('\n') || ''
  } else {
    editingItem.value = null
    form.value = { title: '', slug: '', description: '', category: '', image: '', link: '', github: '', tags: [], highlights: [] }
    tagsInput.value = ''
    highlightsInput.value = ''
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingItem.value = null
}

const saveItem = async () => {
  saving.value = true
  form.value.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
  form.value.highlights = highlightsInput.value.split('\n').map(h => h.trim()).filter(Boolean)

  try {
    if (editingItem.value) {
      await request({
        url: `/api/projects/${editingItem.value.id}`,
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
        url: '/api/projects',
        method: 'POST',
        data: form.value,
        authRequired: true
      })
      items.value.push(response.data || response)
    }
    closeForm()
  } catch (e) {
    console.error('Error saving project:', e)
    alert('Failed to save project')
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      await request({
        url: `/api/projects/${id}`,
        method: 'DELETE',
        authRequired: true
      })
      items.value = items.value.filter(i => i.id !== id)
    } catch (e) {
      console.error('Error deleting project:', e)
      alert('Failed to delete project')
    }
  }
}
</script>
