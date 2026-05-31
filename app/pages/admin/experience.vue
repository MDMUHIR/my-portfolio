<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Experience</h1>
      <button @click="openForm()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Add Experience
      </button>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">Loading...</div>
    
    <div v-else-if="items.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-500 mb-4">No experience yet</p>
      <button @click="openForm()" class="text-blue-600 hover:underline">Add your first experience</button>
    </div>

    <div v-else class="space-y-6">
      <div v-for="item in items" :key="item.id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span :class="item.type === 'education' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'" class="px-2 py-1 text-xs rounded-full capitalize">
                {{ item.type || 'job' }}
              </span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.company }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ item.duration }} · {{ item.location }}</p>
            <p class="text-gray-600 mt-2 text-sm">{{ item.description }}</p>
            <div v-if="item.highlights?.length" class="mt-3">
              <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li v-for="h in item.highlights" :key="h">{{ h }}</li>
              </ul>
            </div>
            <div v-if="item.tags?.length" class="mt-3 flex flex-wrap gap-2">
              <span v-for="tag in item.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{{ tag }}</span>
            </div>
          </div>
          <div class="flex gap-2 ml-4">
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
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6">{{ editingItem ? 'Edit' : 'Add' }} Experience</h2>
        <form @submit.prevent="saveItem" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select v-model="form.type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="job">Job</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input v-model="form.title" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company/School</label>
            <input v-model="form.company" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input v-model="form.duration" type="text" placeholder="2020 - Present" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input v-model="form.location" type="text" placeholder="New York, NY" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
            <textarea v-model="highlightsInput" rows="3" placeholder="Achievement 1&#10;Achievement 2" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input v-model="tagsInput" type="text" placeholder="JavaScript, React, Node.js" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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

const form = ref({ title: '', company: '', duration: '', location: '', description: '', type: 'job', highlights: [], tags: [] })
const highlightsInput = ref('')
const tagsInput = ref('')

const loadItems = async () => {
  loading.value = true
  try {
    const [jobs, education] = await Promise.all([
      request({ url: '/api/experience/jobs' }).catch(() => ({ data: [] })),
      request({ url: '/api/experience/education' }).catch(() => ({ data: [] }))
    ])
    items.value = [...(jobs.data || []), ...(education.data || [])]
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
    form.value = { ...item }
    highlightsInput.value = item.highlights?.join('\n') || ''
    tagsInput.value = item.tags?.join(', ') || ''
  } else {
    editingItem.value = null
    form.value = { title: '', company: '', duration: '', location: '', description: '', type: 'job', highlights: [], tags: [] }
    highlightsInput.value = ''
    tagsInput.value = ''
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingItem.value = null
}

const saveItem = async () => {
  saving.value = true
  form.value.highlights = highlightsInput.value.split('\n').map(h => h.trim()).filter(Boolean)
  form.value.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)

  try {
    if (editingItem.value) {
      await request({
        url: `/api/experience/${editingItem.value.id}`,
        method: 'PUT',
        data: form.value,
        authRequired: true
      })
      const index = items.value.findIndex(i => i.id === editingItem.value.id)
      if (index !== -1) items.value[index] = { ...editingItem.value, ...form.value }
    } else {
      const response = await request({
        url: '/api/experience',
        method: 'POST',
        data: form.value,
        authRequired: true
      })
      items.value.push(response.data || response)
    }
    closeForm()
  } catch (e) {
    console.error('Error saving experience:', e)
    alert('Failed to save experience')
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Delete this experience?')) {
    try {
      await request({
        url: `/api/experience/${id}`,
        method: 'DELETE',
        authRequired: true
      })
      items.value = items.value.filter(i => i.id !== id)
    } catch (e) {
      console.error('Error deleting experience:', e)
      alert('Failed to delete experience')
    }
  }
}
</script>
