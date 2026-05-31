<script setup>
import { computed } from 'vue'
import IconDisplay from './IconDisplay.vue'

const props = defineProps({
  name: String,
  url: String,
  icon: { type: String, default: '' },
  type: { type: String, default: '' },
  description: { type: String, default: '' },
})

const typeLabel = computed(() => {
  const map = { personal: '个人账号', collaboration: '合作账号', friend: '友链' }
  return map[props.type] || props.type
})

const typeColor = computed(() => {
  const map = { personal: '#0ea5e9', collaboration: '#8b5cf6', friend: '#22c55e' }
  return map[props.type] || '#6b7280'
})
</script>

<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="link-card">
    <div class="link-icon">
      <IconDisplay :icon="icon" :size="22" />
    </div>
    <div class="link-body">
      <div class="link-top">
        <span class="link-name">{{ name }}</span>
        <span class="link-type" :style="{ color: typeColor, borderColor: typeColor + '30', background: typeColor + '15' }">
          {{ typeLabel }}
        </span>
      </div>
      <p v-if="description" class="link-desc">{{ description }}</p>
    </div>
    <i class="fas fa-external-link-alt link-out"></i>
  </a>
</template>

<style scoped>
.link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.link-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 20px var(--accent-glow);
  transform: translateY(-2px);
}

.link-icon {
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

.link-body {
  flex: 1;
  min-width: 0;
}

.link-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.link-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.02em;
}

.link-type {
  font-size: 0.68rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  border: 1px solid;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.link-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-out {
  color: var(--text-muted);
  font-size: 0.75rem;
  flex-shrink: 0;
  transition: var(--transition);
}

.link-card:hover .link-out {
  color: var(--accent);
}
</style>
