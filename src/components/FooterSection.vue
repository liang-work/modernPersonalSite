<script setup>
import config from '@config/site.config.json'
</script>

<template>
  <footer class="footer" id="contact">
    <div class="footer-container">
      <div class="social-links">
        <a
          v-for="link in config.social"
          :key="link.name"
          :href="link.url"
          :title="link.name"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i :class="link.icon"></i>
        </a>
      </div>
      <p class="copyright">{{ config.footer.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border-color);
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.25;
}

.footer-container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.social-links a {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: var(--transition);
}

.social-links a:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 0 15px var(--accent-glow);
}

.copyright {
  color: var(--text-muted);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}
</style>
