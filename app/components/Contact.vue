<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = ref({});
const sending = ref(false);
const submitted = ref(false);
const submitMessage = ref("");

const validateForm = () => {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "Name is required";
  }

  if (!form.value.email.trim()) {
    errors.value.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
  }

  if (!form.value.subject.trim()) {
    errors.value.subject = "Subject is required";
  }

  if (!form.value.message.trim()) {
    errors.value.message = "Message is required";
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = "Message must be at least 10 characters";
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  sending.value = true;
  submitMessage.value = "";

  try {
    // Simulate API call - replace with your actual API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would send the form data to your backend
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form.value)
    // });

    submitted.value = true;
    submitMessage.value =
      "✅ Message sent successfully! I'll get back to you soon.";

    // Reset form
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Hide success message after 5 seconds
    setTimeout(() => {
      submitted.value = false;
    }, 5000);
  } catch (error) {
    submitMessage.value = "❌ Failed to send message. Please try again.";
  } finally {
    sending.value = false;
  }
};

const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    value: "your.email@example.com",
    link: "mailto:your.email@example.com",
  },
  {
    icon: "💼",
    title: "LinkedIn",
    value: "linkedin.com/in/yourprofile",
    link: "https://linkedin.com/in/yourprofile",
  },
  {
    icon: "🐙",
    title: "GitHub",
    value: "github.com/yourprofile",
    link: "https://github.com/yourprofile",
  },
  {
    icon: "𝕏",
    title: "Twitter",
    value: "@yourhandle",
    link: "https://twitter.com/yourhandle",
  },
];
</script>

<template>
  <section
    id="contact"
    style="background-color: #252526; border-top: 1px solid #3e3e42"
    class="section"
  >
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="section-title">// Get in Touch</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact Methods -->
        <div class="lg:col-span-1">
          <h3 style="color: #4ec9b0" class="text-lg font-semibold mb-6">
            📬 Contacts
          </h3>
          <div class="space-y-4">
            <a
              v-for="method in contactMethods"
              :key="method.title"
              :href="method.link"
              target="_blank"
              rel="noopener"
              class="card p-4 hover:border-blue-500 block transition"
            >
              <div class="flex items-start gap-3">
                <span class="text-2xl">{{ method.icon }}</span>
                <div>
                  <p style="color: #cccccc" class="font-semibold text-sm">
                    {{ method.title }}
                  </p>
                  <p style="color: #858585" class="text-xs break-all">
                    {{ method.value }}
                  </p>
                </div>
              </div>
            </a>
          </div>

          <!-- Quick Info -->
          <div
            class="card p-4 mt-6"
            style="background-color: #264f78; border: 1px solid #007acc"
          >
            <p style="color: #cccccc" class="text-xs">
              <strong style="color: #0098ff">⏱️ Response:</strong> 24h
              (weekdays)
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <form @submit="handleSubmit" class="space-y-4">
            <!-- Success Message -->
            <transition
              enter-active-class="transition ease-out duration-300"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="submitted"
                style="
                  background-color: #264f78;
                  border-color: #4ec9b0;
                  color: #4ec9b0;
                "
                class="p-4 border rounded-lg text-sm"
              >
                {{ submitMessage }}
              </div>
            </transition>

            <!-- Error Message -->
            <transition
              enter-active-class="transition ease-out duration-300"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="submitMessage.includes('Failed')"
                style="
                  background-color: #3a2a2a;
                  border-color: #f48771;
                  color: #f48771;
                "
                class="p-4 border rounded-lg text-sm"
              >
                {{ submitMessage }}
              </div>
            </transition>

            <!-- Name Field -->
            <div>
              <label
                for="name"
                style="color: #4ec9b0"
                class="block text-sm font-medium mb-2"
                >name</label
              >
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                style="
                  background-color: #1e1e1e;
                  border: 1px solid #3e3e42;
                  color: #cccccc;
                "
                class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                :class="{ 'border-red-500 focus:ring-red-600': errors.name }"
              />
              <p v-if="errors.name" style="color: #f48771" class="mt-1 text-xs">
                {{ errors.name }}
              </p>
            </div>

            <!-- Email Field -->
            <div>
              <label
                for="email"
                style="color: #4ec9b0"
                class="block text-sm font-medium mb-2"
                >email</label
              >
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
                style="
                  background-color: #1e1e1e;
                  border: 1px solid #3e3e42;
                  color: #cccccc;
                "
                class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                :class="{ 'border-red-500 focus:ring-red-600': errors.email }"
              />
              <p
                v-if="errors.email"
                style="color: #f48771"
                class="mt-1 text-xs"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Subject Field -->
            <div>
              <label
                for="subject"
                style="color: #4ec9b0"
                class="block text-sm font-medium mb-2"
                >subject</label
              >
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Project Inquiry"
                style="
                  background-color: #1e1e1e;
                  border: 1px solid #3e3e42;
                  color: #cccccc;
                "
                class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                :class="{ 'border-red-500 focus:ring-red-600': errors.subject }"
              />
              <p
                v-if="errors.subject"
                style="color: #f48771"
                class="mt-1 text-xs"
              >
                {{ errors.subject }}
              </p>
            </div>

            <!-- Message Field -->
            <div>
              <label
                for="message"
                style="color: #4ec9b0"
                class="block text-sm font-medium mb-2"
                >message</label
              >
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                placeholder="Tell me about your project..."
                style="
                  background-color: #1e1e1e;
                  border: 1px solid #3e3e42;
                  color: #cccccc;
                "
                class="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                :class="{ 'border-red-500 focus:ring-red-600': errors.message }"
              ></textarea>
              <p
                v-if="errors.message"
                style="color: #f48771"
                class="mt-1 text-xs"
              >
                {{ errors.message }}
              </p>
              <p style="color: #858585" class="mt-1 text-xs">
                {{ form.message.length }} / 5000 chars
              </p>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="sending"
                class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="!sending">→ Send</span>
                <span v-else>→ Sending</span>
                <span v-if="sending">⏳</span>
              </button>
            </div>

            <!-- Privacy Note -->
            <p style="color: #858585" class="text-xs text-center">
              Privacy protected • Responds in 24h
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
