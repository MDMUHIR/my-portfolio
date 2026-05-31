import { updateItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const link = updateItem('socialLinks', id, body)
  if (!link) {
    throw createError({ statusCode: 404, statusMessage: 'Social link not found' })
  }
  return { data: link }
})
