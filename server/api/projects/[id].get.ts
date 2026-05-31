import { getById, getBySlug, getCollection } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  let project = getById('projects', id)
  if (!project) {
    project = getBySlug('projects', id)
  }
  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
  return { data: project }
})
