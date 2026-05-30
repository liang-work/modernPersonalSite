<script setup>
import { computed } from 'vue'
import config from '@config/site.config.json'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AnnouncementSection from './components/AnnouncementSection.vue'
import CardGrid from './components/CardGrid.vue'
import FooterSection from './components/FooterSection.vue'

const hasBgImage = computed(() => !!config.background.image)
const showGrid = computed(() => config.background.gridOverlay)
</script>

<template>
  <div v-if="hasBgImage" class="bg-image"></div>
  <div v-if="showGrid" class="bg-grid"></div>
  <div class="bg-glow"></div>

  <NavBar />
  <main>
    <HeroSection />
    <AnnouncementSection />
    <CardGrid />
  </main>
  <FooterSection />
</template>
