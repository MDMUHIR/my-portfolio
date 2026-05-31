<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Skills</h1>
      <button @click="openForm()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Add Skill
      </button>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">Loading...</div>
    
    <div v-else-if="items.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-500 mb-4">No skills yet</p>
      <button @click="openForm()" class="text-blue-600 hover:underline">Add your first skill</button>
    </div>

    <div v-else class="grid gap-6">
      <div v-for="(group, category) in groupedItems" :key="category" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 capitalize">{{ category }}</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="item in group" :key="item.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">{{ item.name }}</p>
              <p class="text-sm text-gray-500">Level: {{ item.level }}%</p>
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
      </div>
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6">{{ editingItem ? 'Edit' : 'Add' }} Skill</h2>
        <form @submit.prevent="saveItem" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Level (0-100)</label>
            <input v-model.number="form.level" type="number" min="0" max="100" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input v-model="form.category" type="text" placeholder="e.g., Frontend, Backend" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
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

const form = ref({ name: '', level: 50, category: '' })

const groupedItems = computed(() => {
  const groups = {}
  items.value.forEach(item => {
    const cat = item.category || 'Other'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(item)
  })
  return groups
})

const loadItems = async () => {
  loading.value = true
  try {
    const data = await request({ url: '/api/skills' })
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
    form.value = { name: item.name, level: item.level, category: item.category || '' }
  } else {
    editingItem.value = null
    form.value = { name: '', level: 50, category: '' }
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingItem.value = null
}

const saveItem = async () => {
  saving.value = true
  try {
    if (editingItem.value) {
      await request({
        url: `/api/skills/${editingItem.value.id}`,
        method: 'PUT',
        data: form.value,
        authRequired: true
      })
      const index = items.value.findIndex(i => i.id === editingItem.value.id)
      if (index !== -1) items.value[index] = { ...editingItem.value, ...form.value }
    } else {
      const response = await request({
        url: '/api/skills',
        method: 'POST',
        data: form.value,
        authRequired: true
      })
      items.value.push(response.data || response)
    }
    closeForm()
  } catch (e) {
    console.error('Error saving skill:', e)
    alert('Failed to save skill')
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Delete this skill?')) {
    try {
      await request({
        url: `/api/skills/${id}`,
        method: 'DELETE',
        authRequired: true
      })
      items.value = items.value.filter(i => i.id !== id)
    } catch (e) {
      console.error('Error deleting skill:', e)
      alert('Failed to delete skill')
    }
  }
}
</script>
