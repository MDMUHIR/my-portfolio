import { getCollection } from '../../utils/db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const posts = getCollection('posts')
  if (query.published !== undefined) {
    const published = query.published === 'true' || query.published === '1'
    return { data: posts.filter(p => p.published === published) }
  }
  return { data: posts }
})
