<script setup>
import { ref } from 'vue'
import config from '@config/site.config.json'
import IconDisplay from './IconDisplay.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => config.nav.items,
  },
  logoText: {
    type: String,
    default: config.nav.logo.text,
  },
  logoIcon: {
    type: String,
    default: config.nav.logo.icon,
  },
  logoHref: {
    type: String,
    default: '#hero',
  },
})

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <a :href="logoHref" class="logo">
        <IconDisplay :icon="logoIcon" :size="22" />
        <span>{{ logoText }}</span>
      </a>
      <ul class="nav-menu" :class="{ active: isMenuOpen }">
        <li v-for="item in items" :key="item.label">
          <a :href="item.href" @click="closeMenu">{{ item.label }}</a>
        </li>
      </ul>
      <button class="menu-toggle" @click="toggleMenu" aria-label="菜单">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background: var(--bg-nav);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
  backdrop-filter: blur(16px);
}

.navbar::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.4;
}

.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.logo i {
  color: var(--accent);
  font-size: 1.3rem;
  filter: drop-shadow(0 0 6px var(--accent-glow));
}

.nav-menu {
  display: flex;
  gap: 0.25rem;
}

.nav-menu a {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.88rem;
  transition: var(--transition);
  padding: 0.4rem 1rem;
  position: relative;
  border-radius: 6px;
  letter-spacing: 0.04em;
}

.nav-menu a:hover {
  color: var(--accent);
  background: var(--accent-subtle);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.25rem;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 58px;
    left: -100%;
    width: 100%;
    flex-direction: column;
    background: var(--bg-nav);
    backdrop-filter: blur(15px);
    text-align: center;
    gap: 0;
    transition: 0.3s;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-menu a {
    padding: 0.85rem 0;
    border-radius: 0;
  }
}
</style>
