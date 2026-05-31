<script setup>
import { computed } from 'vue'
import config from '@config/site.config.json'
import projectsData from '@config/_projects-data.json'
import NavBar from '../components/NavBar.vue'
import ProjectCard from '../components/ProjectCard.vue'
import AnnouncementSection from '../components/AnnouncementSection.vue'
import SearchFilter from '../components/SearchFilter.vue'
import FooterSection from '../components/FooterSection.vue'

const hasBgImage = computed(() => !!config.background.image)
const showGrid = computed(() => config.background.gridOverlay)
const hasProjects = computed(() => projectsData.items && projectsData.items.length > 0)

function slugify(title) {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/--+/g, '-')
    .replace(/(^-|-$)/g, '')
  if (!slug || /^[\d-]+$/.test(slug)) {
    slug = 'project-' + title.length.toString(36)
  }
  return slug
}

const projects = computed(() =>
  projectsData.items.map((item, index) => ({
    ...item,
    slug: slugify(item.title) || `project-${index}`,
  }))
)

const filterGroups = [
  {
    field: 'status',
    label: '状态',
    options: [
      { label: '全部', value: '' },
      { label: '活跃中', value: 'active' },
      { label: '半弃坑', value: 'semi-abandoned' },
      { label: '已停更', value: 'discontinued' },
      { label: '已归档', value: 'archived' },
    ],
  },
  {
    field: 'nature',
    label: '性质',
    options: [
      { label: '全部', value: '' },
      { label: '盈利性', value: 'profit' },
      { label: '非盈利性', value: 'non-profit' },
    ],
  },
]
</script>

<template>
  <div v-if="hasBgImage" class="bg-image"></div>
  <div v-if="showGrid" class="bg-grid"></div>
  <div class="bg-glow"></div>

  <NavBar />

  <main>
    <AnnouncementSection />

    <section class="projects-section" id="projects">
      <div class="container">
        <h2 class="section-title">{{ projectsData.title }}</h2>
        <p v-if="projectsData.description" class="section-desc">{{ projectsData.description }}</p>

        <div v-if="hasProjects">
          <SearchFilter
            :items="projects"
            :search-fields="['title', 'description', 'tags', 'type', 'authors']"
            placeholder="搜索作品..."
            :filter-groups="filterGroups"
          >
            <template #default="{ filtered }">
              <div v-if="filtered.length" class="projects-grid">
                <ProjectCard
                  v-for="(item, index) in filtered"
                  :key="index"
                  :icon="item.icon"
                  :title="item.title"
                  :description="item.description"
                  :type="item.type"
                  :tags="item.tags"
                  :status="item.status"
                  :nature="item.nature"
                  :slug="item.slug"
                />
              </div>
              <p v-else class="empty-tip">未找到匹配项</p>
            </template>
          </SearchFilter>
        </div>
        <p v-else class="empty-tip">暂无作品</p>
      </div>
    </section>
  </main>

  <FooterSection />
</template>

<style scoped>
.projects-section {
  padding: 5rem 0;
}

.section-desc {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: -2rem;
  margin-bottom: 3rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.empty-tip {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  padding: 4rem 0;
}

@media (max-width: 768px) {
  .projects-section {
    padding: 3rem 0;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
