import { updateItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const exp = updateItem('experience', id, body)
  if (!exp) {
    throw createError({ statusCode: 404, statusMessage: 'Experience entry not found' })
  }
  return { data: exp }
})
