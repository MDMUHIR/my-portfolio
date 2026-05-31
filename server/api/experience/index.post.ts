import { createItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.title) {
    throw createError({ statusCode: 422, statusMessage: 'Title is required' })
  }
  const exp = createItem('experience', body)
  return { data: exp }
})
