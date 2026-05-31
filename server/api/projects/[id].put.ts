import { updateItem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const project = updateItem('projects', id, body)
  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
  return { data: project }
})
