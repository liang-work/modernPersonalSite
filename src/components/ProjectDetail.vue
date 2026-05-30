<script setup>
import { computed } from 'vue'
import config from '@config/site.config.json'
import projectsConfig from '@config/projects.config.json'
import NavBar from './NavBar.vue'
import IconDisplay from './IconDisplay.vue'
import AnnouncementSection from './AnnouncementSection.vue'
import FooterSection from './FooterSection.vue'

const props = defineProps({
  projectIndex: { type: Number, required: true },
})

const project = computed(() => projectsConfig.items[props.projectIndex])

const navItems = [
  { label: '首页', href: '/' },
  { label: '作品', href: '/projects.html' },
]

const hasBgImage = computed(() => !!config.background.image)
const showGrid = computed(() => config.background.gridOverlay)

const statusMap = {
  active: { label: '活跃中', color: '#22c55e' },
  'semi-abandoned': { label: '半弃坑', color: '#eab308' },
  discontinued: { label: '已停更', color: '#ef4444' },
  archived: { label: '已归档', color: '#6b7280' },
}

const statusInfo = computed(() => statusMap[project.value.status] || null)
const natureLabel = computed(() => project.value.nature === 'profit' ? '盈利性' : '非盈利性')

import { onMounted } from 'vue'
onMounted(() => {
  if (project.value) {
    document.title = `${project.value.title} · ${config.site.title}`
  }
})
</script>

<template>
  <div v-if="hasBgImage" class="bg-image"></div>
  <div v-if="showGrid" class="bg-grid"></div>
  <div class="bg-glow"></div>

  <NavBar :items="navItems" />

  <main>
    <AnnouncementSection />

    <section class="detail-section" v-if="project">
      <div class="container">
        <div class="detail-header">
          <div class="detail-icon">
            <IconDisplay :icon="project.icon" :size="32" />
          </div>
          <div>
            <h1>{{ project.title }}</h1>
            <div class="detail-badges">
              <span v-if="project.type" class="badge badge-type">{{ project.type }}</span>
              <span v-if="statusInfo" class="badge badge-status" :style="{ background: statusInfo.color + '20', color: statusInfo.color, borderColor: statusInfo.color + '40' }">
                <span class="status-dot" :style="{ background: statusInfo.color }"></span>
                {{ statusInfo.label }}
              </span>
              <span v-if="project.nature" class="badge badge-nature">{{ natureLabel }}</span>
              <span v-if="project.license" class="badge badge-license">{{ project.license }}</span>
            </div>
          </div>
        </div>

        <div v-if="project.authors && project.authors.length" class="detail-authors">
          <span class="authors-label">作者：</span>
          <span v-for="(author, i) in project.authors" :key="author" class="author-tag">
            {{ author }}<span v-if="i < project.authors.length - 1">、</span>
          </span>
        </div>

        <p class="detail-description">{{ project.fullDescription || project.description }}</p>

        <div v-if="project.tags && project.tags.length" class="detail-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div v-if="project.links && project.links.length" class="detail-links">
          <a
            v-for="link in project.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="link-card"
          >
            <span class="link-label">{{ link.label }}</span>
            <i class="fas fa-external-link-alt link-icon"></i>
          </a>
        </div>

        <div class="detail-nav-back">
          <a href="/projects.html" class="btn btn-outline">
            <i class="fas fa-arrow-left"></i> 返回作品列表
          </a>
        </div>
      </div>
    </section>
  </main>

  <FooterSection />
</template>

<style scoped>
.detail-section {
  padding: 4rem 0;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-icon {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: var(--accent-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.detail-header h1 {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.detail-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  font-size: 0.78rem;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  font-weight: 500;
  border: 1px solid;
  letter-spacing: 0.03em;
}

.badge-type {
  background: var(--accent-subtle);
  color: var(--accent);
  border-color: rgba(14, 165, 233, 0.12);
}

.badge-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.badge-nature {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  border-color: var(--border-color);
}

.badge-license {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  border-color: var(--border-color);
}

.detail-authors {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.authors-label {
  color: var(--text-muted);
}

.author-tag {
  color: var(--text-secondary);
}

.detail-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 800px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.tag {
  background: var(--accent-subtle);
  color: var(--accent);
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: 500;
  border: 1px solid rgba(14, 165, 233, 0.12);
}

.detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.link-card {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-decoration: none;
  transition: var(--transition);
}

.link-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 15px var(--accent-glow);
  transform: translateY(-2px);
}

.link-label {
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
}

.link-icon {
  color: var(--accent);
  font-size: 0.8rem;
}

.detail-nav-back {
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .detail-section {
    padding: 2.5rem 0;
  }

  .detail-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .detail-badges {
    justify-content: center;
  }

  .detail-links {
    flex-direction: column;
  }

  .link-card {
    width: 100%;
    justify-content: center;
  }
}
</style>
