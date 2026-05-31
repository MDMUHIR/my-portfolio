import { removeItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const removed = removeItem('testimonials', id)
  if (!removed) {
    throw createError({ statusCode: 404, statusMessage: 'Testimonial not found' })
  }
  return { success: true }
})
