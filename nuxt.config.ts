import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss() as any],
  },
  app: {
    head: {
      title: "Your Name — JavaScript & AI Developer",
      meta: [
        {
          name: "description",
          content:
            "Portfolio of a JavaScript and AI developer — projects, experience and contact.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "http://192.168.0.105:8001",
    },
  },
});
