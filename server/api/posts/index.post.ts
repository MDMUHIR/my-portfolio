import { createItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.title) {
    throw createError({ statusCode: 422, statusMessage: 'Title is required' })
  }
  const post = createItem('posts', body)
  return { data: post }
})
