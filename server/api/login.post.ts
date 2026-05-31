import { authenticateUser, generateToken } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 422, statusMessage: 'Email and password are required' })
  }

  const user = authenticateUser(email, password)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const access_token = generateToken(user.id)

  return { access_token, user }
})
