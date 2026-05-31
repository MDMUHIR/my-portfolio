import { getCollection } from '../../utils/db'

export default defineEventHandler(() => {
  const links = getCollection('socialLinks')
  return { data: links }
})
