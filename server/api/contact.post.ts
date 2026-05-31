import { createItem } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    throw createError({ statusCode: 422, statusMessage: 'All fields are required' })
  }

  const contact = createItem('contacts', { name, email, subject, message })

  return { data: contact, message: 'Message sent successfully' }
})
