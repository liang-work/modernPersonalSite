<script setup>
import IconDisplay from './IconDisplay.vue'

defineProps({
  icon: String,
  title: String,
  description: String,
  tags: Array
})
</script>

<template>
  <div class="skill-card">
    <div class="card-icon">
      <IconDisplay :icon="icon" :size="22" />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="card-tags">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 2rem;
  transition: var(--transition);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0;
  transition: var(--transition);
}

.skill-card:hover {
  transform: translateY(-6px);
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.08), var(--shadow-hover);
}

.skill-card:hover::before {
  opacity: 1;
}

.card-icon {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: var(--accent-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 1.3rem;
  color: var(--accent);
}

.skill-card h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.skill-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.card-tags span {
  background: var(--accent-subtle);
  color: var(--accent);
  padding: 0.2rem 0.7rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  font-family: 'Inter', monospace;
  border: 1px solid rgba(14, 165, 233, 0.12);
}
</style>
