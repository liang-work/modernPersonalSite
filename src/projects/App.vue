<script setup>
import { computed } from 'vue'
import config from '@config/site.config.json'
import projectsConfig from '@config/projects.config.json'
import NavBar from '../components/NavBar.vue'
import ProjectCard from '../components/ProjectCard.vue'
import AnnouncementSection from '../components/AnnouncementSection.vue'
import FooterSection from '../components/FooterSection.vue'

const navItems = [
  { label: '首页', href: '/' },
  { label: '作品', href: '#projects' },
]

const hasBgImage = computed(() => !!config.background.image)
const showGrid = computed(() => config.background.gridOverlay)
const hasProjects = computed(() => projectsConfig.items && projectsConfig.items.length > 0)
</script>

<template>
  <div v-if="hasBgImage" class="bg-image"></div>
  <div v-if="showGrid" class="bg-grid"></div>
  <div class="bg-glow"></div>

  <NavBar :items="navItems" />

  <main>
    <AnnouncementSection />

    <section class="projects-section" id="projects">
      <div class="container">
        <h2 class="section-title">{{ projectsConfig.title }}</h2>
        <p v-if="projectsConfig.description" class="section-desc">{{ projectsConfig.description }}</p>
        <div v-if="hasProjects" class="projects-grid">
          <ProjectCard
            v-for="(item, index) in projectsConfig.items"
            :key="index"
            :icon="item.icon"
            :title="item.title"
            :description="item.description"
            :type="item.type"
            :tags="item.tags"
            :image="item.image"
            :license="item.license"
            :url="item.url"
          />
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
