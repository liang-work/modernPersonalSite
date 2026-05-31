<script setup>
import { computed } from 'vue'
import config from '@config/site.config.json'
import linksConfig from '@config/links.config.json'
import NavBar from '../components/NavBar.vue'
import AnnouncementSection from '../components/AnnouncementSection.vue'
import LinkCard from '../components/LinkCard.vue'
import FooterSection from '../components/FooterSection.vue'

const hasBgImage = computed(() => !!config.background.image)
const showGrid = computed(() => config.background.gridOverlay)
const hasLinks = computed(() => linksConfig.items && linksConfig.items.length > 0)
</script>

<template>
  <div v-if="hasBgImage" class="bg-image"></div>
  <div v-if="showGrid" class="bg-grid"></div>
  <div class="bg-glow"></div>

  <NavBar />
  <main>
    <AnnouncementSection />

    <section class="links-section" id="links">
      <div class="container">
        <h2 class="section-title">{{ linksConfig.title }}</h2>
        <p v-if="linksConfig.description" class="section-desc">{{ linksConfig.description }}</p>
        <div v-if="hasLinks" class="links-grid">
          <LinkCard
            v-for="(item, index) in linksConfig.items"
            :key="index"
            :name="item.name"
            :url="item.url"
            :icon="item.icon"
            :type="item.type"
            :description="item.description"
          />
        </div>
        <p v-else class="empty-tip">暂无链接</p>
      </div>
    </section>
  </main>

  <FooterSection />
</template>

<style scoped>
.links-section {
  padding: 5rem 0;
}

.section-desc {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: -2rem;
  margin-bottom: 3rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.empty-tip {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  padding: 4rem 0;
}

@media (max-width: 768px) {
  .links-section {
    padding: 3rem 0;
  }
}
</style>
