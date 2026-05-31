import { validateToken } from '../utils/db'

export default defineEventHandler(async (event) => {
  const path = event.path || event.node.req.url || ''

  if (!path.startsWith('/api/')) return

  if (event.method === 'GET') return

  const publicPostPaths = ['/api/login', '/api/contact']
  if (event.method === 'POST' && publicPostPaths.includes(path)) return

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const token = authHeader.slice(7)
  const payload = validateToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }

  event.context.auth = payload
})
