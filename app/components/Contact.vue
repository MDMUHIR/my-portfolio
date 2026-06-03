<script setup lang="ts">
const { socialLinks, loading: linksLoading, fetchSocialLinks } = useSocialLinks();
const { sending, submitContact } = useContact();

const form = ref({ name: '', email: '', subject: '', message: '' });
const errors = ref<Record<string, string>>({});
const submitted = ref(false);
const submitMessage = ref('');

onMounted(async () => {
  await fetchSocialLinks();
});

const defaultContactMethods = [
  { icon: '📧', title: 'Email', value: 'your.email@example.com', link: 'mailto:your.email@example.com' },
  { icon: '💼', title: 'LinkedIn', value: 'linkedin.com/in/yourprofile', link: 'https://linkedin.com/in/yourprofile' },
  { icon: '🐙', title: 'GitHub', value: 'github.com/yourprofile', link: 'https://github.com/yourprofile' },
  { icon: '𝕏', title: 'Twitter', value: '@yourhandle', link: 'https://twitter.com/yourhandle' },
];

const displayContactMethods = computed(() => {
  if (socialLinks.value.length > 0) {
    return socialLinks.value.map(link => ({ icon: link.icon || '📧', title: link.title, value: link.value, link: link.link }));
  }
  return defaultContactMethods;
});

const validateForm = () => {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = 'Name is required';
  if (!form.value.email.trim()) errors.value.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) errors.value.email = 'Please enter a valid email';
  if (!form.value.subject.trim()) errors.value.subject = 'Subject is required';
  if (!form.value.message.trim()) errors.value.message = 'Message is required';
  else if (form.value.message.trim().length < 10) errors.value.message = 'Message must be at least 10 characters';
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!validateForm()) return;
  submitMessage.value = '';
  const ok = await submitContact(form.value);
  if (ok) {
    submitted.value = true;
    submitMessage.value = "✅ Message sent successfully! I'll get back to you soon.";
    form.value = { name: '', email: '', subject: '', message: '' };
    setTimeout(() => { submitted.value = false; }, 5000);
  } else {
    submitMessage.value = '❌ Failed to send message. Please try again.';
  }
};
</script>

<template>
  <section id="contact" class="section section-alt">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="section-title">// Get in Touch</h2>

      <div class="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 order-2 lg:order-1">
          <h3 class="text-success text-lg font-semibold mb-6">📬 Contacts</h3>

          <div v-if="linksLoading" class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>

          <div v-else class="space-y-3 sm:space-y-4">
            <a v-for="method in displayContactMethods" :key="method.title" :href="method.link" target="_blank" rel="noopener" class="card p-4 block transition hover:border-blue-500">
              <div class="flex items-start gap-3">
                <span class="text-2xl shrink-0">{{ method.icon }}</span>
                <div class="min-w-0">
                  <p class="text-theme font-semibold text-sm">{{ method.title }}</p>
                  <p class="text-theme-secondary text-xs break-all">{{ method.value }}</p>
                </div>
              </div>
            </a>
          </div>

          <div class="card p-4 mt-6 transition-all" :style="{ backgroundColor: 'var(--selection)', border: '1px solid var(--accent)' }">
            <p class="text-xs" :style="{ color: 'var(--text-primary)' }">
              <strong :style="{ color: 'var(--accent-light)' }">⏱️ Response:</strong> 24h (weekdays)
            </p>
          </div>
        </div>

        <div class="lg:col-span-2 order-1 lg:order-2">
          <form @submit="handleSubmit" class="space-y-4 sm:space-y-5">
            <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
              <div v-if="submitted" class="p-4 border rounded-lg text-sm text-center" :style="{ backgroundColor: 'var(--selection)', borderColor: 'var(--success)', color: 'var(--success)' }">{{ submitMessage }}</div>
            </transition>

            <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
              <div v-if="submitMessage.includes('Failed')" class="p-4 border rounded-lg text-sm text-center" :style="{ backgroundColor: '#3a2a2a', borderColor: 'var(--danger)', color: 'var(--danger)' }">{{ submitMessage }}</div>
            </transition>

            <div>
              <label for="name" class="text-success block text-sm font-medium mb-1.5">name</label>
              <input id="name" v-model="form.name" type="text" placeholder="John Doe" class="input-theme" :class="{ 'border-red-500': errors.name }" />
              <p v-if="errors.name" class="text-danger mt-1 text-xs">{{ errors.name }}</p>
            </div>

            <div>
              <label for="email" class="text-success block text-sm font-medium mb-1.5">email</label>
              <input id="email" v-model="form.email" type="email" placeholder="john@example.com" class="input-theme" :class="{ 'border-red-500': errors.email }" />
              <p v-if="errors.email" class="text-danger mt-1 text-xs">{{ errors.email }}</p>
            </div>

            <div>
              <label for="subject" class="text-success block text-sm font-medium mb-1.5">subject</label>
              <input id="subject" v-model="form.subject" type="text" placeholder="Project Inquiry" class="input-theme" :class="{ 'border-red-500': errors.subject }" />
              <p v-if="errors.subject" class="text-danger mt-1 text-xs">{{ errors.subject }}</p>
            </div>

            <div>
              <label for="message" class="text-success block text-sm font-medium mb-1.5">message</label>
              <textarea id="message" v-model="form.message" rows="5" placeholder="Tell me about your project..." class="input-theme resize-none" :class="{ 'border-red-500': errors.message }"></textarea>
              <div class="flex justify-between mt-1">
                <p v-if="errors.message" class="text-danger text-xs">{{ errors.message }}</p>
                <p class="text-theme-secondary text-xs ml-auto">{{ form.message.length }} / 5000</p>
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" :disabled="sending" class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="!sending">→ Send Message</span>
                <span v-else class="flex items-center gap-2">⏳ Sending...</span>
              </button>
            </div>

            <p class="text-theme-secondary text-xs text-center">Privacy protected • Responds in 24h</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
