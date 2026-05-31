import { updateItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const testimonial = updateItem('testimonials', id, body)
  if (!testimonial) {
    throw createError({ statusCode: 404, statusMessage: 'Testimonial not found' })
  }
  return { data: testimonial }
})
