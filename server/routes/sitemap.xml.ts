import { getCollection } from '../utils/db'

export default defineEventHandler(async (event) => {
  const projects = getCollection('projects')
  const posts = getCollection('posts')
  const host = getHeader(event, 'host') || 'localhost:3000'
  const proto = getHeader(event, 'x-forwarded-proto') || 'http'
  const baseUrl = `${proto}://${host}`

  const pages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
    { loc: '/skills', priority: '0.8', changefreq: 'monthly' },
    { loc: '/projects', priority: '0.9', changefreq: 'weekly' },
    { loc: '/experience', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
    ...projects.map((p: any) => ({
      loc: `/projects/${p.slug || p.id}`,
      priority: '0.8',
      changefreq: 'monthly' as const,
    })),
    ...posts.filter((p: any) => p.published).map((p: any) => ({
      loc: `/blog/${p.slug || p.id}`,
      priority: '0.7',
      changefreq: 'monthly' as const,
    })),
  ]

  const urls = pages.map(p => `  <url>\n    <loc>${baseUrl}${p.loc}</loc>\n    <priority>${p.priority}</priority>\n    <changefreq>${p.changefreq}</changefreq>\n  </url>`).join('\n')

  setHeader(event, 'Content-Type', 'application/xml')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
})
