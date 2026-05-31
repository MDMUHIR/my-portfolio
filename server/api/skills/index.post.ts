import { createItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name) {
    throw createError({ statusCode: 422, statusMessage: 'Name is required' })
  }
  const skill = createItem('skills', body)
  return { data: skill }
})
