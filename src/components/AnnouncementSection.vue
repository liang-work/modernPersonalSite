<script setup>
import { ref, computed } from 'vue'
import announcement from '@config/announcement.config.json'

const dismissed = ref(false)
const visible = computed(() => announcement.enabled && !dismissed.value)
</script>

<template>
  <div v-if="visible" class="announcement">
    <div class="announcement-inner">
      <i class="fas fa-bullhorn announcement-icon"></i>
      <span class="announcement-text">{{ announcement.text }}</span>
      <a v-if="announcement.link" :href="announcement.link" class="announcement-link">
        {{ announcement.linkText || '了解详情' }}
      </a>
      <button
        v-if="announcement.dismissible"
        class="announcement-close"
        @click="dismissed = true"
        aria-label="关闭"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.announcement {
  background: var(--accent-subtle);
  border-bottom: 1px solid rgba(14, 165, 233, 0.12);
}

.announcement-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.7rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  position: relative;
}

.announcement-icon {
  color: var(--accent);
  font-size: 0.9rem;
  flex-shrink: 0;
}

.announcement-text {
  color: var(--text-secondary);
  flex: 1;
}

.announcement-link {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.85rem;
  white-space: nowrap;
  transition: var(--transition);
  flex-shrink: 0;
}

.announcement-link:hover {
  text-shadow: 0 0 12px var(--accent-glow);
}

.announcement-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  font-size: 0.85rem;
  transition: var(--transition);
  flex-shrink: 0;
}

.announcement-close:hover {
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .announcement-inner {
    padding: 0.6rem 1rem;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .announcement-link {
    margin-left: 1.3rem;
  }
}
</style>
