<script setup>
defineProps({
  icon: { type: String, default: '' },
  title: String,
  description: String,
  type: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  image: { type: String, default: '' },
  license: { type: String, default: '' },
  url: { type: String, default: '' },
})
</script>

<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="project-card">
    <div class="card-top">
      <div v-if="icon" class="card-icon">
        <i :class="icon"></i>
      </div>
      <div class="card-meta">
        <span v-if="type" class="card-type">{{ type }}</span>
        <span v-if="license" class="card-license">{{ license }}</span>
      </div>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div v-if="tags.length" class="card-tags">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="card-footer">
      <span class="card-link">
        查看详情 <i class="fas fa-arrow-right"></i>
      </span>
    </div>
  </a>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: var(--transition);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.project-card::before {
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

.project-card:hover {
  transform: translateY(-6px);
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 0 30px rgba(14, 165, 233, 0.08), var(--shadow-hover);
}

.project-card:hover::before {
  opacity: 1;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: var(--accent-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: var(--accent);
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-end;
}

.card-type,
.card-license {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.card-type {
  background: var(--accent-subtle);
  color: var(--accent);
  border: 1px solid rgba(14, 165, 233, 0.12);
}

.card-license {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.project-card h3 {
  font-size: 1.15rem;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.project-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.card-tags span {
  background: var(--accent-subtle);
  color: var(--accent);
  padding: 0.2rem 0.65rem;
  border-radius: 4px;
  font-size: 0.73rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  border: 1px solid rgba(14, 165, 233, 0.12);
}

.card-footer {
  margin-top: auto;
}

.card-link {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: var(--transition);
}

.project-card:hover .card-link {
  gap: 0.7rem;
}
</style>
