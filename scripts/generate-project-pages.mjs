import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const artworkDir = join(root, 'config', 'artwork')

function slugify(title) {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/--+/g, '-')
    .replace(/(^-|-$)/g, '')
  if (!slug || /^[\d-]+$/.test(slug)) {
    slug = 'project-' + Date.now().toString(36).slice(-4)
  }
  return slug
}

if (!existsSync(artworkDir)) {
  mkdirSync(artworkDir, { recursive: true })
  console.log('artwork/ directory created, no project files found.')
  process.exit(0)
}

const files = readdirSync(artworkDir).filter(f => f.endsWith('.json'))

if (files.length === 0) {
  console.log('No JSON files found in config/artwork/')
  process.exit(0)
}

const pageConfigPath = join(root, 'config', 'projects.config.json')
const pageConfig = JSON.parse(readFileSync(pageConfigPath, 'utf-8'))

const items = files.map((file) => {
  const raw = readFileSync(join(artworkDir, file), 'utf-8')
  return JSON.parse(raw)
})

writeFileSync(
  join(root, 'config', '_projects-data.json'),
  JSON.stringify({ title: pageConfig.title, description: pageConfig.description, items }, null, 2),
  'utf-8'
)

const entries = []
const htmlTemplate = readFileSync(join(__dirname, 'project-page-template.html'), 'utf-8')
const jsTemplate = readFileSync(join(__dirname, 'project-entry-template.js'), 'utf-8')

items.forEach((item, index) => {
  const slug = slugify(item.title) || `project-${index}`
  entries.push({ slug, title: item.title, index })

  const html = htmlTemplate.replace(/__SLUG__/g, slug)
  writeFileSync(join(root, `project-${slug}.html`), html, 'utf-8')

  const detailDir = join(root, 'src', 'projects', 'detail', slug)
  if (!existsSync(detailDir)) mkdirSync(detailDir, { recursive: true })

  const js = jsTemplate.replace(/__INDEX__/g, String(index))
  writeFileSync(join(detailDir, 'main.js'), js, 'utf-8')
})

writeFileSync(join(root, '_project-entries.json'), JSON.stringify(entries, null, 2), 'utf-8')

console.log(`Generated ${entries.length} project pages: ${entries.map(e => e.slug).join(', ')}`)
