import { getById, getUserByEmail, verifyPassword, updateUser } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { currentPassword, newEmail, newPassword } = await readBody(event)

  if (!currentPassword) {
    throw createError({ statusCode: 422, statusMessage: 'Current password is required' })
  }

  const user = getById('users', auth.userId)
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  if (!verifyPassword(currentPassword, user.password)) {
    throw createError({ statusCode: 403, statusMessage: 'Current password is incorrect' })
  }

  const updates: { email?: string; password?: string } = {}
  if (newEmail && newEmail !== user.email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      throw createError({ statusCode: 422, statusMessage: 'Invalid email format' })
    }
    const existing = getUserByEmail(newEmail)
    if (existing && String(existing.id) !== String(auth.userId)) {
      throw createError({ statusCode: 409, statusMessage: 'Email already in use' })
    }
    updates.email = newEmail
  }
  if (newPassword) {
    if (newPassword.length < 6) {
      throw createError({ statusCode: 422, statusMessage: 'New password must be at least 6 characters' })
    }
    updates.password = newPassword
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 422, statusMessage: 'Nothing to update' })
  }

  const updated = updateUser(auth.userId, updates)
  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return { data: updated }
})
