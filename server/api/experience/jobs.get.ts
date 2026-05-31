import { getCollection } from '../../utils/db'

export default defineEventHandler(() => {
  const jobs = getCollection('experience').filter(e => e.type === 'job')
  return { data: jobs }
})
