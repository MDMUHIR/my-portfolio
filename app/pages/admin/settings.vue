<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-8">Settings</h1>

    <div class="max-w-lg space-y-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-1">Admin Credentials</h2>
        <p class="text-sm text-gray-500 mb-6">Update your email or password. You'll be logged out after saving.</p>

        <form @submit.prevent="handleSave" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Email</label>
            <input
              v-model="form.currentEmail"
              type="email"
              disabled
              class="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Email</label>
            <input
              v-model="form.newEmail"
              type="email"
              placeholder="Leave blank to keep current"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <hr class="border-gray-200" />

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              v-model="form.currentPassword"
              type="password"
              required
              placeholder="Enter current password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              v-model="form.newPassword"
              type="password"
              placeholder="Leave blank to keep current"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="Repeat new password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
          <p v-if="success" class="text-sm text-green-600">{{ success }}</p>

          <button
            type="submit"
            :disabled="saving"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const auth = useAuth()
const { request } = useApi()

const form = ref({
  currentEmail: auth.user?.value?.email || '',
  newEmail: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const saving = ref(false)
const error = ref('')
const success = ref('')

onMounted(() => {
  auth.initAuth()
  if (auth.user.value?.email) {
    form.value.currentEmail = auth.user.value.email
  }
})

watch(() => auth.user.value?.email, (email) => {
  if (email) form.value.currentEmail = email
})

const handleSave = async () => {
  error.value = ''
  success.value = ''

  if (form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
    error.value = 'New passwords do not match'
    return
  }

  if (!form.value.newEmail && !form.value.newPassword) {
    error.value = 'Enter a new email or password to change'
    return
  }

  saving.value = true
  try {
    const res = await request({
      url: '/api/admin/settings',
      method: 'PUT',
      authRequired: true,
      data: {
        currentPassword: form.value.currentPassword,
        newEmail: form.value.newEmail || undefined,
        newPassword: form.value.newPassword || undefined,
      },
    })

    if (res.data) {
      if (res.data.email) {
        localStorage.setItem('admin_user', JSON.stringify(res.data))
        auth.user.value = res.data
      }
      success.value = 'Saved successfully! Logging out...'
      setTimeout(() => auth.logout(), 1500)
    }
  } catch (e) {
    error.value = e.data?.statusMessage || e.message || 'Failed to save settings'
  } finally {
    saving.value = false
  }
}
</script>
