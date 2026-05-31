import { getCollection } from '../../utils/db'

export default defineEventHandler(() => {
  const testimonials = getCollection('testimonials')
  return { data: testimonials }
})
