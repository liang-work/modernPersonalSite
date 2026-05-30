<script setup>
import SkillCard from './SkillCard.vue'
import config from '@config/site.config.json'
</script>

<template>
  <section class="skills-section" id="skills">
    <div class="container">
      <h2 class="section-title">专业技能</h2>
      <div class="cards-grid">
        <SkillCard
          v-for="(skill, index) in config.skills"
          :key="index"
          :icon="skill.icon"
          :title="skill.title"
          :description="skill.description"
          :tags="skill.tags"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 5rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .skills-section {
    padding: 3rem 0;
  }
}
</style>
