import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync, existsSync, writeFileSync, readdirSync } from 'fs'

function getProjectEntries() {
  const entriesPath = new URL('./_project-entries.json', import.meta.url)
  if (!existsSync(entriesPath)) return {}
  const list = JSON.parse(readFileSync(entriesPath, 'utf-8'))
  const input = {}
  for (const { slug } of list) {
    const htmlPath = fileURLToPath(new URL(`./project-${slug}.html`, import.meta.url))
    input[`project-${slug}`] = htmlPath
  }
  return input
}

function seoPlugin() {
  const siteConfig = JSON.parse(readFileSync('./config/site.config.json', 'utf-8'))
  const projectsConfig = JSON.parse(readFileSync('./config/projects.config.json', 'utf-8'))
  const linksConfig = JSON.parse(readFileSync('./config/links.config.json', 'utf-8'))

  let projectsData = null
  if (existsSync('./config/_projects-data.json')) {
    projectsData = JSON.parse(readFileSync('./config/_projects-data.json', 'utf-8'))
  }

  let projectEntries = []
  if (existsSync('./_project-entries.json')) {
    projectEntries = JSON.parse(readFileSync('./_project-entries.json', 'utf-8'))
  }

  const baseUrl = (siteConfig.site.url || '').replace(/\/+$/, '')

  function findProjectByFilename(filename) {
    const name = filename.split(/[\\/]/).pop()
    if (!name.startsWith('project-') || !name.endsWith('.html')) return null
    const slug = name.slice('project-'.length, -'.html'.length)
    if (!projectEntries.length || !projectsData) return null
    const entry = projectEntries.find(e => e.slug === slug)
    if (!entry) return null
    return projectsData.items[entry.index] || null
  }

  return {
    name: 'vite-seo-plugin',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const filename = ctx.filename || ''
        const name = filename.split(/[\\/]/).pop()

        let title, description, keywords, canonical, ogType
        let jsonld = null

        if (name === 'index.html') {
          title = siteConfig.site.title
          description = siteConfig.site.description
          keywords = siteConfig.site.keywords
          canonical = baseUrl ? `${baseUrl}/` : '/'
          ogType = 'website'
          jsonld = [
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteConfig.site.title,
              description: siteConfig.site.description,
              url: canonical,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: siteConfig.hero.name,
              url: canonical,
            },
          ]
        } else if (name === 'projects.html') {
          title = `${projectsConfig.title} · ${siteConfig.site.title}`
          description = projectsConfig.description
          keywords = siteConfig.site.keywords
          canonical = baseUrl ? `${baseUrl}/projects.html` : '/projects.html'
          ogType = 'website'
          jsonld = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: projectsConfig.title,
            description: projectsConfig.description,
          }
        } else if (name === 'links.html') {
          title = `${linksConfig.title} · ${siteConfig.site.title}`
          description = linksConfig.description
          keywords = siteConfig.site.keywords
          canonical = baseUrl ? `${baseUrl}/links.html` : '/links.html'
          ogType = 'website'
          jsonld = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: linksConfig.title,
            description: linksConfig.description,
          }
        } else if (name.startsWith('project-') && name.endsWith('.html')) {
          const project = findProjectByFilename(filename)
          if (project) {
            title = `${project.title} · ${siteConfig.site.title}`
            description = project.description || project.title
            keywords = siteConfig.site.keywords
            ogType = 'article'
            jsonld = {
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: project.title,
              description: project.description || project.title,
              applicationCategory: 'WebApplication',
              operatingSystem: 'Web',
            }
          } else {
            title = siteConfig.site.title
            description = siteConfig.site.description
            keywords = siteConfig.site.keywords
            ogType = 'article'
          }
          canonical = baseUrl ? `${baseUrl}/${name}` : `/${name}`
        } else {
          return
        }

        const ogUrl = baseUrl ? `${baseUrl}${canonical === '/' ? '/' : canonical}` : canonical
        const siteName = siteConfig.site.title

        const tags = [
          { tag: 'title', children: title },
          { tag: 'meta', attrs: { name: 'description', content: description } },
          { tag: 'meta', attrs: { name: 'keywords', content: keywords } },
          { tag: 'link', attrs: { rel: 'canonical', href: canonical } },
        ]

        if (baseUrl) {
          tags.push(
            { tag: 'meta', attrs: { property: 'og:title', content: title } },
            { tag: 'meta', attrs: { property: 'og:description', content: description } },
            { tag: 'meta', attrs: { property: 'og:url', content: ogUrl } },
            { tag: 'meta', attrs: { property: 'og:type', content: ogType } },
            { tag: 'meta', attrs: { property: 'og:site_name', content: siteName } },
            { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
            { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
            { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
          )
        }

        if (jsonld) {
          const list = Array.isArray(jsonld) ? jsonld : [jsonld]
          for (const item of list) {
            tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(item) })
          }
        }

        return tags
      },
    },
    closeBundle() {
      const outDir = 'dist'
      if (!existsSync(outDir)) return
      const files = readdirSync(outDir).filter(f => f.endsWith('.html'))
      if (!files.length) return
      const urls = files.map(f => {
        const loc = f === 'index.html' ? (baseUrl || '') : `${baseUrl || ''}/${f}`
        return `  <url><loc>${loc || '/'}</loc></url>`
      }).join('\n')
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      writeFileSync(`${outDir}/sitemap.xml`, sitemap, 'utf-8')
      console.log('Generated sitemap.xml with', files.length, 'pages')
    },
  }
}

export default defineConfig({
  plugins: [vue(), seoPlugin()],
  resolve: {
    alias: {
      '@config': fileURLToPath(new URL('./config', import.meta.url)),
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        projects: fileURLToPath(new URL('./projects.html', import.meta.url)),
        links: fileURLToPath(new URL('./links.html', import.meta.url)),
        ...getProjectEntries(),
      },
    },
  },
})
