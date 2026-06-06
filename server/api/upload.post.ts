import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { randomBytes } from 'crypto'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')
const ALLOWED = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
const MAX_SIZE = 5 * 1024 * 1024

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event)
  if (!body?.length) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided' })
  }

  const file = body[0]
  const ext = extname(file.filename?.toLowerCase() || '')

  if (!ALLOWED.includes(ext)) {
    throw createError({ statusCode: 415, statusMessage: `Unsupported file type: ${ext}. Allowed: ${ALLOWED.join(', ')}` })
  }

  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 413, statusMessage: 'File too large. Maximum 5MB.' })
  }

  await mkdir(UPLOAD_DIR, { recursive: true })

  const name = `${Date.now()}-${randomBytes(4).toString('hex')}${ext}`
  const filePath = join(UPLOAD_DIR, name)
  await writeFile(filePath, file.data)

  return { data: { url: `/uploads/${name}` } }
})
