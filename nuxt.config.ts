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
      title: "Md. Muhir Uddin — Full-Stack Developer & AI Engineer",
      meta: [
        { name: "description", content: "Portfolio of Md. Muhir Uddin — Full-stack developer specializing in Vue.js, Node.js, and AI/ML integration. Explore projects, experience, and skills." },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Md. Muhir Uddin" },
        { name: "keywords", content: "full-stack developer, AI engineer, Vue.js, Node.js, LangChain, portfolio, web developer, JavaScript" },
        { property: "og:title", content: "Md. Muhir Uddin — Full-Stack Developer & AI Engineer" },
        { property: "og:description", content: "Portfolio of Md. Muhir Uddin — Full-stack developer specializing in Vue.js, Node.js, and AI/ML integration." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://mdmuhiruddin.com" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Md. Muhir Uddin — Full-Stack Developer & AI Engineer" },
        { name: "twitter:description", content: "Portfolio of Md. Muhir Uddin — Full-stack developer specializing in Vue.js, Node.js, and AI/ML integration." },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://mdmuhiruddin.com" },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Md. Muhir Uddin",
            url: "https://mdmuhiruddin.com",
            jobTitle: "Full-Stack Developer & AI Engineer",
            knowsAbout: ["Vue.js", "React", "Node.js", "Python", "LangChain", "AI/ML", "TypeScript", "JavaScript"],
          }),
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL || "",
    },
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      "/**": { prerender: false },
      "/projects/**": { prerender: false },
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/skills": { prerender: true },
    "/experience": { prerender: true },
    "/contact": { prerender: true },
  },
});
