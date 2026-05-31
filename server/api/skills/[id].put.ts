import { updateItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const skill = updateItem('skills', id, body)
  if (!skill) {
    throw createError({ statusCode: 404, statusMessage: 'Skill not found' })
  }
  return { data: skill }
})
