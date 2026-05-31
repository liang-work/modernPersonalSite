<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  searchFields: { type: Array, default: () => ['title', 'description'] },
  placeholder: { type: String, default: '搜索...' },
  filterGroups: { type: Array, default: () => [] },
})

const searchQuery = ref('')

const filterState = ref({})
for (const group of props.filterGroups) {
  filterState.value[group.field] = ''
}

const filtered = computed(() => {
  let result = props.items
  const query = searchQuery.value.trim().toLowerCase()

  if (query) {
    result = result.filter((item) =>
      props.searchFields.some((field) => {
        const val = item[field]
        if (Array.isArray(val)) {
          return val.some((v) => String(v).toLowerCase().includes(query))
        }
        return String(val || '').toLowerCase().includes(query)
      })
    )
  }

  for (const group of props.filterGroups) {
    const activeVal = filterState.value[group.field]
    if (activeVal) {
      result = result.filter((item) => item[group.field] === activeVal)
    }
  }

  return result
})

function setFilter(field, value) {
  filterState.value[field] = filterState.value[field] === value ? '' : value
}
</script>

<template>
  <div class="search-filter">
    <div class="search-bar">
      <i class="fas fa-search search-icon"></i>
      <input
        v-model="searchQuery"
        :placeholder="placeholder"
        class="search-input"
      />
    </div>

    <div
      v-for="group in filterGroups"
      :key="group.field"
      class="filter-row"
    >
      <span class="filter-label">{{ group.label }}</span>
      <button
        v-for="opt in group.options"
        :key="opt.value"
        :class="['filter-chip', { active: filterState[group.field] === opt.value }]"
        @click="setFilter(group.field, opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>

    <div v-if="filtered.length" class="filter-results">
      <slot :filtered="filtered" />
    </div>
    <p v-else class="no-results">未找到匹配项</p>
  </div>
</template>

<style scoped>
.search-filter {
  margin-bottom: 1rem;
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.search-input {
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: var(--transition);
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 12px var(--accent-glow);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.filter-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-right: 0.25rem;
  letter-spacing: 0.03em;
}

.filter-chip {
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-family: inherit;
  cursor: pointer;
  transition: var(--transition);
  letter-spacing: 0.03em;
}

.filter-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-chip.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.filter-results {
  margin-top: 1.5rem;
}

.no-results {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.95rem;
  padding: 3rem 0;
}
</style>
