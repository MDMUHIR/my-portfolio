import { removeItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const removed = removeItem('projects', id)
  if (!removed) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
  return { success: true }
})
