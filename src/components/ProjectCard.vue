<script setup>
import { computed } from 'vue'
import IconDisplay from './IconDisplay.vue'

const props = defineProps({
  icon: { type: String, default: '' },
  title: String,
  description: String,
  type: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  status: { type: String, default: '' },
  nature: { type: String, default: '' },
  slug: { type: String, default: '' },
})

const detailUrl = computed(() => `/project-${props.slug}.html`)

const statusMap = {
  active: { label: '活跃中', color: '#22c55e' },
  'semi-abandoned': { label: '半弃坑', color: '#eab308' },
  discontinued: { label: '已停更', color: '#ef4444' },
  archived: { label: '已归档', color: '#6b7280' },
}

const statusInfo = computed(() => statusMap[props.status] || null)
const natureLabel = computed(() => props.nature === 'profit' ? '盈利性' : '非盈利性')
</script>

<template>
  <a :href="detailUrl" class="project-card">
    <div class="card-top">
      <div class="card-icon">
        <IconDisplay :icon="icon" :size="22" />
      </div>
      <div class="card-meta">
        <span v-if="type" class="card-type">{{ type }}</span>
      </div>
    </div>

    <div class="card-badges">
      <span v-if="statusInfo" class="badge-status" :style="{ color: statusInfo.color }">
        <span class="status-dot" :style="{ background: statusInfo.color }"></span>
        {{ statusInfo.label }}
      </span>
      <span v-if="nature" class="badge-nature">{{ natureLabel }}</span>
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
  padding: 1.5rem;
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
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--accent-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.card-type {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.03em;
  white-space: nowrap;
  background: var(--accent-subtle);
  color: var(--accent);
  border: 1px solid rgba(14, 165, 233, 0.12);
}

.card-badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.badge-status {
  font-size: 0.72rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  letter-spacing: 0.03em;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.badge-nature {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 0.03em;
}

.project-card h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.project-card p {
  font-size: 0.83rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.85rem;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.card-tags span {
  background: var(--accent-subtle);
  color: var(--accent);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  border: 1px solid rgba(14, 165, 233, 0.12);
}

.card-footer {
  margin-top: auto;
}

.card-link {
  color: var(--accent);
  font-size: 0.82rem;
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
