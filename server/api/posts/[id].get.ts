import { getById, getBySlug } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') || ''
  let post = getById('posts', id)
  if (!post) {
    post = getBySlug('posts', id)
  }
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }
  return { data: post }
})
