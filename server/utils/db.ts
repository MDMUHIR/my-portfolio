import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto'

interface Store {
  [key: string]: any[]
}

const DATA_DIR = join(process.cwd(), '.data')
const DB_PATH = join(DATA_DIR, 'db.json')
let store: Store = {}

function load(): Store {
  try {
    if (existsSync(DB_PATH)) {
      return JSON.parse(readFileSync(DB_PATH, 'utf-8'))
    }
  } catch (e) {
    console.error('Failed to load database:', e)
  }
  return {}
}

function save(): void {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(DB_PATH, JSON.stringify(store, null, 2), 'utf-8')
  } catch (e) {
    console.error('Failed to save database:', e)
  }
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  const derived = pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
  return timingSafeEqual(Buffer.from(derived), Buffer.from(hash))
}

const tokens = new Map<string, { userId: string; expiresAt: Date }>()

export function generateToken(userId: string): string {
  const token = randomBytes(32).toString('hex')
  tokens.set(token, { userId, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) })
  return token
}

export function validateToken(token: string): { userId: string } | null {
  const data = tokens.get(token)
  if (!data) return null
  if (data.expiresAt < new Date()) {
    tokens.delete(token)
    return null
  }
  return { userId: data.userId }
}

export function getUserByEmail(email: string): any | null {
  const users = getCollection('users')
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export function authenticateUser(email: string, password: string): any | null {
  const user = getUserByEmail(email)
  if (!user) return null
  if (!verifyPassword(password, user.password)) return null
  const { password: _, ...safe } = user
  return safe
}

export function getCollection(name: string): any[] {
  return store[name] || []
}

export function getById(collection: string, id: string | number): any | null {
  return getCollection(collection).find(item => String(item.id) === String(id)) || null
}

export function getBySlug(collection: string, slug: string): any | null {
  return getCollection(collection).find(item => item.slug === slug) || null
}

export function createItem(collection: string, data: any): any {
  const items = getCollection(collection)
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  const item = { id, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  items.push(item)
  store[collection] = items
  save()
  return item
}

export function updateItem(collection: string, id: string | number, data: any): any | null {
  const items = getCollection(collection)
  const index = items.findIndex(item => String(item.id) === String(id))
  if (index === -1) return null
  items[index] = { ...items[index], ...data, id: items[index].id, createdAt: items[index].createdAt, updatedAt: new Date().toISOString() }
  store[collection] = items
  save()
  return items[index]
}

export function removeItem(collection: string, id: string | number): boolean {
  const items = getCollection(collection)
  const index = items.findIndex(item => String(item.id) === String(id))
  if (index === -1) return false
  items.splice(index, 1)
  store[collection] = items
  save()
  return true
}

function seed(): Store {
  return {
    users: [
      {
        id: '1',
        name: 'Admin',
        email: 'admin@example.com',
        password: hashPassword('admin123'),
        role: 'admin',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'Project Alpha',
        slug: 'project-alpha',
        category: 'AI & Web Development',
        description: 'An AI-powered search assistant that helps users find information instantly.',
        image: '🤖',
        link: '#',
        github: '#',
        fullDescription: 'Project Alpha is a full-stack application featuring intelligent search capabilities powered by machine learning models.\n\nKey Features:\n- Real-time search with ML-powered recommendations\n- RESTful API with 99.9% uptime\n- Responsive design supporting 100K+ concurrent users\n- Advanced caching and optimization strategies',
        technologies: ['Vue.js', 'Node.js', 'PyTorch', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
        stats: { users: '100K+', queries: '1M+ daily', uptime: '99.9%', avgResponse: '<100ms' },
        highlights: ['Reduced search latency by 70%', 'Achieved 3.5x increase in user engagement', 'Scaled from 1K to 100K users in 6 months'],
        timeline: '6 months • 2023-2024',
        team: '5 developers, 1 ML specialist',
        links: { live: '#', github: '#', demo: '#' },
        tags: ['Vue.js', 'Node.js', 'PyTorch', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      },
      {
        id: '2',
        title: 'Dashboard Pro',
        slug: 'dashboard-pro',
        category: 'Data Visualization & Analytics',
        description: 'Real-time analytics dashboard built with WebSockets for live data updates.',
        image: '📊',
        link: '#',
        github: '#',
        fullDescription: 'Dashboard Pro is an enterprise-scale analytics platform designed to handle massive data streams with real-time visualization capabilities.\n\nKey Features:\n- WebSocket-based real-time data streaming\n- Advanced D3.js visualizations\n- Handles millions of data points efficiently\n- Custom dashboard builder for users',
        technologies: ['React', 'Node.js', 'WebSocket', 'D3.js', 'PostgreSQL', 'Apache Kafka'],
        stats: { datapoints: '10M+ per day', updateSpeed: '<100ms', users: '500+ companies', availability: '99.99%' },
        highlights: ['Decreased decision-making time by 80%', 'Enabled monitoring of 10M+ data points', 'Improved data accuracy to 99.98%'],
        timeline: '8 months • 2023',
        team: '6 developers, 2 designers, 1 data engineer',
        links: { live: '#', github: '#', demo: '#' },
        tags: ['React', 'Node.js', 'WebSocket', 'D3.js', 'PostgreSQL', 'Apache Kafka'],
      },
      {
        id: '3',
        title: 'CLI Tools Suite',
        slug: 'cli-tools-suite',
        category: 'Developer Tools',
        description: 'A collection of CLI tools for automating development workflows.',
        image: '⚙️',
        link: '#',
        github: '#',
        fullDescription: 'A comprehensive suite of command-line tools designed to streamline developer workflows and automate repetitive tasks.\n\nKey Features:\n- Modular plugin architecture\n- Cross-platform support\n- Built-in task scheduling\n- Integration with CI/CD pipelines',
        technologies: ['Python', 'Node.js', 'Shell', 'Docker', 'GitHub Actions'],
        stats: { downloads: '50K+', tools: '15+', stars: '2.5K', contributors: '30+' },
        highlights: ['Automated 80% of manual deployment tasks', 'Adopted by 20+ teams', 'Open source with active community'],
        timeline: '3 months • 2023',
        team: '2 developers',
        links: { live: '#', github: '#', demo: '#' },
        tags: ['Python', 'Node.js', 'Shell', 'Docker', 'GitHub Actions'],
      },
      {
        id: '4',
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        category: 'Full Stack',
        description: 'Full-featured e-commerce platform with real-time inventory management.',
        image: '🛒',
        link: '#',
        github: '#',
        fullDescription: 'A complete e-commerce solution with real-time inventory tracking, payment processing, and admin dashboard.\n\nKey Features:\n- Real-time inventory management\n- Secure payment integration\n- Admin analytics dashboard\n- Responsive storefront',
        technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
        stats: { products: '10K+', orders: '50K+', revenue: '$2M+', uptime: '99.95%' },
        highlights: ['Processed 50K+ orders without issues', '99.95% uptime since launch', 'Handles 10K+ product catalog'],
        timeline: '5 months • 2024',
        team: '4 developers, 1 designer',
        links: { live: '#', github: '#', demo: '#' },
        tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
      },
      {
        id: '5',
        title: 'AI Content Generator',
        slug: 'ai-content-generator',
        category: 'AI/ML',
        description: 'Content generation platform powered by GPT and custom ML models.',
        image: '🧠',
        link: '#',
        github: '#',
        fullDescription: 'An AI-powered content generation platform that creates high-quality written content using GPT models and custom-trained ML pipelines.\n\nKey Features:\n- GPT-powered content generation\n- Custom fine-tuned models\n- Multi-language support\n- SEO optimization suggestions',
        technologies: ['Python', 'LangChain', 'GPT API', 'React', 'FastAPI', 'PostgreSQL'],
        stats: { content: '100K+ pieces', users: '10K+', languages: '25+', avgRating: '4.7/5' },
        highlights: ['Generated 100K+ content pieces', 'Supported 25+ languages', '4.7/5 average user rating'],
        timeline: '4 months • 2024',
        team: '3 developers, 1 ML engineer',
        links: { live: '#', github: '#', demo: '#' },
        tags: ['Python', 'LangChain', 'GPT API', 'React', 'FastAPI', 'PostgreSQL'],
      },
      {
        id: '6',
        title: 'Project Management App',
        slug: 'project-management-app',
        category: 'Web Application',
        description: 'Collaborative project management tool with real-time updates.',
        image: '📋',
        link: '#',
        github: '#',
        fullDescription: 'A collaborative project management application with Kanban boards, real-time updates, and team analytics.\n\nKey Features:\n- Drag-and-drop Kanban boards\n- Real-time collaboration\n- Time tracking and reporting\n- Team performance analytics',
        technologies: ['Vue.js', 'Socket.io', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
        stats: { users: '5K+', projects: '15K+', tasks: '200K+', teams: '500+' },
        highlights: ['Managed 200K+ tasks', 'Used by 500+ teams', 'Real-time sync across 5K+ users'],
        timeline: '6 months • 2023',
        team: '5 developers, 1 designer',
        links: { live: '#', github: '#', demo: '#' },
        tags: ['Vue.js', 'Socket.io', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
      },
    ],
    skills: [
      { id: '1', name: 'Vue.js', level: 92, category: 'Frontend' },
      { id: '2', name: 'React', level: 85, category: 'Frontend' },
      { id: '3', name: 'JavaScript', level: 90, category: 'Frontend' },
      { id: '4', name: 'TypeScript', level: 82, category: 'Frontend' },
      { id: '5', name: 'Next.js', level: 75, category: 'Frontend' },
      { id: '6', name: 'HTML/CSS', level: 95, category: 'Frontend' },
      { id: '7', name: 'Node.js', level: 88, category: 'Backend' },
      { id: '8', name: 'Python', level: 80, category: 'Backend' },
      { id: '9', name: 'PostgreSQL', level: 75, category: 'Backend' },
      { id: '10', name: 'MongoDB', level: 70, category: 'Backend' },
      { id: '11', name: 'Redis', level: 65, category: 'Backend' },
      { id: '12', name: 'Express', level: 82, category: 'Backend' },
      { id: '13', name: 'LangChain', level: 78, category: 'AI/ML' },
      { id: '14', name: 'TensorFlow', level: 60, category: 'AI/ML' },
      { id: '15', name: 'NLP', level: 65, category: 'AI/ML' },
      { id: '16', name: 'GPT API', level: 82, category: 'AI/ML' },
      { id: '17', name: 'PyTorch', level: 55, category: 'AI/ML' },
      { id: '18', name: 'Git', level: 90, category: 'Tools & DevOps' },
      { id: '19', name: 'Docker', level: 72, category: 'Tools & DevOps' },
      { id: '20', name: 'AWS', level: 68, category: 'Tools & DevOps' },
      { id: '21', name: 'Linux', level: 80, category: 'Tools & DevOps' },
      { id: '22', name: 'CI/CD', level: 75, category: 'Tools & DevOps' },
    ],
    experience: [
      {
        id: '1',
        type: 'job',
        title: 'Senior Full Stack Developer',
        company: 'Tech Company Inc.',
        duration: '2022 - Present',
        location: 'Remote',
        description: 'Leading development of scalable web applications using Vue and Node.js',
        highlights: ['Architected and deployed microservices reducing load times by 40%', 'Mentored 5+ junior developers on best practices', 'Implemented automated testing improving code coverage to 85%'],
        tags: ['Vue.js', 'Node.js', 'AWS', 'PostgreSQL'],
      },
      {
        id: '2',
        type: 'job',
        title: 'Full Stack Developer',
        company: 'Digital Solutions Ltd.',
        duration: '2020 - 2022',
        location: 'Hybrid',
        description: 'Developed and maintained multiple production applications',
        highlights: ['Built real-time analytics dashboard with 100K+ daily users', 'Optimized database queries improving performance by 60%', 'Established CI/CD pipelines reducing deployment time'],
        tags: ['React', 'Express', 'MongoDB', 'Docker'],
      },
      {
        id: '3',
        type: 'job',
        title: 'Junior Developer',
        company: 'Software Startup',
        duration: '2019 - 2020',
        location: 'On-site',
        description: 'Started career building responsive web applications',
        highlights: ['Developed 10+ client projects using modern frameworks', 'Contributed to open-source projects', 'Participated in agile development cycles'],
        tags: ['JavaScript', 'HTML/CSS', 'Git', 'API Integration'],
      },
      {
        id: '4',
        type: 'education',
        title: 'BBA in Management',
        company: 'University',
        duration: '2018 - 2022',
        description: 'Bachelor of Business Administration with focus on Management Information Systems',
      },
    ],
    testimonials: [
      { id: '1', name: 'Sarah Johnson', role: 'CTO', company: 'TechCorp', content: 'An exceptional developer who consistently delivers high-quality work. Their expertise in both frontend and AI technologies is remarkable.', rating: 5 },
      { id: '2', name: 'Mike Chen', role: 'Product Manager', company: 'StartupHub', content: 'One of the most skilled developers I have worked with. They bring both technical excellence and creative problem-solving to every project.', rating: 5 },
      { id: '3', name: 'Emily Rodriguez', role: 'Lead Developer', company: 'WebAgency', content: 'Their ability to integrate AI capabilities into web applications is outstanding. A true full-stack developer with cutting-edge skills.', rating: 4 },
    ],
    socialLinks: [
      { id: '1', title: 'GitHub', icon: '🐙', value: 'github.com/mdmuhir', link: 'https://github.com/mdmuhir' },
      { id: '2', title: 'LinkedIn', icon: '💼', value: 'linkedin.com/in/mdmuhir', link: 'https://linkedin.com/in/mdmuhir' },
      { id: '3', title: 'Twitter', icon: '𝕏', value: '@mdmuhir', link: 'https://twitter.com/mdmuhir' },
      { id: '4', title: 'Email', icon: '📧', value: 'hello@mdmuhiruddin.com', link: 'mailto:hello@mdmuhiruddin.com' },
    ],
    contacts: [],
  }
}

function init(): void {
  store = load()
  if (Object.keys(store).length === 0) {
    store = seed()
    save()
  }
}

init()
