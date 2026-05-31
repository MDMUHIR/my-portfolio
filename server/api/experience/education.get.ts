import { getCollection } from '../../utils/db'

export default defineEventHandler(() => {
  const education = getCollection('experience').filter(e => e.type === 'education')
  return { data: education }
})
