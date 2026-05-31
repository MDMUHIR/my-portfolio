import { getCollection } from '../../utils/db'

export default defineEventHandler(() => {
  const projects = getCollection('projects')
  return { data: projects }
})
