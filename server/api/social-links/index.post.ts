import { createItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.title || !body.link) {
    throw createError({ statusCode: 422, statusMessage: 'Title and link are required' })
  }
  const link = createItem('socialLinks', body)
  return { data: link }
})
