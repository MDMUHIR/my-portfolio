import { getCollection } from '../../utils/db'

export default defineEventHandler(() => {
  const skills = getCollection('skills')
  return { data: skills }
})
