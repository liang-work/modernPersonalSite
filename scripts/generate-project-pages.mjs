import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const configPath = join(root, 'config', 'projects.config.json')
const raw = readFileSync(configPath, 'utf-8')
const { items } = JSON.parse(raw)

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
