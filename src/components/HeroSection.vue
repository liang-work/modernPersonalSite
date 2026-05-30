<script setup>
import profile from '../data/profile'
</script>

<template>
  <section class="hero" id="hero">
    <div class="hero-container">
      <div class="avatar">
        <span>{{ profile.hero.avatar }}</span>
      </div>
      <h1 class="hero-name">{{ profile.hero.name }}</h1>
      <p class="hero-title">{{ profile.hero.title }}</p>
      <p class="hero-desc">{{ profile.hero.description }}</p>
      <div class="hero-actions">
        <a href="#skills" class="btn btn-primary">
          查看技能 <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 58px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

.hero-container {
  max-width: 700px;
  position: relative;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--accent), #0284c7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 0 30px var(--accent-glow);
  animation: avatar-pulse 3s ease-in-out infinite;
}

@keyframes avatar-pulse {
  0%, 100% { box-shadow: 0 0 20px var(--accent-glow); }
  50% { box-shadow: 0 0 40px var(--accent-glow), 0 0 60px rgba(14, 165, 233, 0.15); }
}

.hero-name {
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.hero-title {
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-shadow: 0 0 20px var(--accent-glow);
}

.hero-desc {
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
