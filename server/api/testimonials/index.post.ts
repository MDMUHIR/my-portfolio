import { createItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name || !body.content) {
    throw createError({ statusCode: 422, statusMessage: 'Name and content are required' })
  }
  const testimonial = createItem('testimonials', body)
  return { data: testimonial }
})
