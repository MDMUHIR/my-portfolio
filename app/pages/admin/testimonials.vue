<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Testimonials</h1>
      <button @click="openForm()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Add Testimonial
      </button>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">Loading...</div>
    
    <div v-else-if="items.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-500 mb-4">No testimonials yet</p>
      <button @click="openForm()" class="text-blue-600 hover:underline">Add your first testimonial</button>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2">
      <div v-for="item in items" :key="item.id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <img v-if="item.avatar" :src="item.avatar" class="w-12 h-12 rounded-full object-cover" />
              <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-lg">
                {{ item.name?.charAt(0) || '?' }}
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">{{ item.role }} at {{ item.company }}</p>
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
        <p class="mt-4 text-gray-600 italic">"{{ item.content }}"</p>
        <div v-if="item.rating" class="mt-3 flex text-yellow-400">
          <span v-for="i in 5" :key="i">★</span>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6">{{ editingItem ? 'Edit' : 'Add' }} Testimonial</h2>
        <form @submit.prevent="saveItem" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input v-model="form.role" type="text" placeholder="CEO" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input v-model="form.company" type="text" placeholder="Acme Inc" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea v-model="form.content" rows="4" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
            <input v-model.number="form.rating" type="number" min="1" max="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
            <div class="flex gap-2">
              <input v-model="form.avatar" type="text" placeholder="URL or upload" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <label class="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer text-sm whitespace-nowrap flex items-center transition-colors">
                Browse
                <input type="file" accept="image/*" @change="uploadImage" class="hidden" />
              </label>
            </div>
            <div v-if="uploading" class="text-xs text-gray-500 mt-1">Uploading...</div>
            <div v-if="form.avatar && !uploading" class="mt-2">
              <img :src="form.avatar" class="h-16 w-16 rounded-full object-cover border" />
            </div>
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

const form = ref({ name: '', role: '', company: '', content: '', avatar: '', rating: 5 })
const uploading = ref(false)

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
    form.value.avatar = data.data.url
  } catch (err) {
    alert('Upload failed. ' + (err instanceof Error ? err.message : ''))
    console.error(err)
  } finally {
    uploading.value = false
    e.target.value = ''
  }
}

const loadItems = async () => {
  loading.value = true
  try {
    const data = await request({ url: '/api/testimonials' })
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
    form.value = { ...item }
  } else {
    editingItem.value = null
    form.value = { name: '', role: '', company: '', content: '', avatar: '', rating: 5 }
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
        url: `/api/testimonials/${editingItem.value.id}`,
        method: 'PUT',
        data: form.value,
        authRequired: true
      })
      const index = items.value.findIndex(i => i.id === editingItem.value.id)
      if (index !== -1) items.value[index] = { ...editingItem.value, ...form.value }
    } else {
      const response = await request({
        url: '/api/testimonials',
        method: 'POST',
        data: form.value,
        authRequired: true
      })
      items.value.push(response.data || response)
    }
    closeForm()
  } catch (e) {
    console.error('Error saving testimonial:', e)
    alert('Failed to save testimonial')
  } finally {
    saving.value = false
  }
}

const deleteItem = async (id) => {
  if (confirm('Delete this testimonial?')) {
    try {
      await request({
        url: `/api/testimonials/${id}`,
        method: 'DELETE',
        authRequired: true
      })
      items.value = items.value.filter(i => i.id !== id)
    } catch (e) {
      console.error('Error deleting testimonial:', e)
      alert('Failed to delete testimonial')
    }
  }
}
</script>
