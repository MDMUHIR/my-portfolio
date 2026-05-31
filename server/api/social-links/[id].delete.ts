import { removeItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const removed = removeItem('socialLinks', id)
  if (!removed) {
    throw createError({ statusCode: 404, statusMessage: 'Social link not found' })
  }
  return { success: true }
})
