<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <RouterLink to="/" class="navbar-logo">
        <span class="logo-text">SUGOI</span>
        <span class="logo-kanji">すごい</span>
      </RouterLink>

      <!-- Desktop Menu -->
      <div class="navbar-menu">
        <RouterLink to="/" class="navbar-link">Inicio</RouterLink>
        <RouterLink to="/anime" class="navbar-link">Anime</RouterLink>
        <RouterLink to="/manga" class="navbar-link">Manga</RouterLink>
        <RouterLink to="/blog" class="navbar-link">Blog</RouterLink>
        <RouterLink to="/merch" class="navbar-link">Merch</RouterLink>
      </div>

      <!-- Mobile Menu Button -->
      <button class="navbar-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="navbar-toggle-bar"></span>
        <span class="navbar-toggle-bar"></span>
        <span class="navbar-toggle-bar"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="navbar-mobile" :class="{ 'is-open': mobileMenuOpen }">
      <RouterLink to="/" class="navbar-mobile-link" @click="toggleMobileMenu">Inicio</RouterLink>
      <RouterLink to="/anime" class="navbar-mobile-link" @click="toggleMobileMenu">Anime</RouterLink>
      <RouterLink to="/manga" class="navbar-mobile-link" @click="toggleMobileMenu">Manga</RouterLink>
      <RouterLink to="/blog" class="navbar-mobile-link" @click="toggleMobileMenu">Blog</RouterLink>
      <RouterLink to="/merch" class="navbar-mobile-link" @click="toggleMobileMenu">Merch</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--color-white-snow);
  border-bottom: var(--border-thick);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 0 var(--color-black-carbon);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-black-carbon);
  transition: transform 0.15s ease-out;
}

.navbar-logo:hover {
  transform: translate(-2px, -2px);
}

.logo-text {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-primary);
}

.logo-kanji {
  font-size: var(--font-size-md);
  color: var(--color-black-carbon);
  font-weight: var(--font-weight-medium);
}

.navbar-menu {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.navbar-link {
  font-family: var(--font-heading);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-black-carbon);
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid transparent;
  transition: all 0.15s ease-out;
  position: relative;
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: var(--color-primary);
  transition: width 0.2s ease-out;
}

.navbar-link:hover::after {
  width: 100%;
}

.navbar-link:hover {
  color: var(--color-primary);
}

.navbar-link.router-link-active {
  color: var(--color-primary);
  border: 2px solid var(--color-black-carbon);
  box-shadow: 3px 3px 0 var(--color-black-carbon);
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
}

.navbar-toggle-bar {
  width: 25px;
  height: 3px;
  background-color: var(--color-black-carbon);
  transition: all 0.2s ease;
}

.navbar-mobile {
  display: none;
  flex-direction: column;
  background-color: var(--color-white-snow);
  border-top: var(--border-thin);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.navbar-mobile.is-open {
  max-height: 400px;
  padding: var(--spacing-md);
}

.navbar-mobile-link {
  font-family: var(--font-heading);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-black-carbon);
  padding: var(--spacing-md);
  border: var(--border-thin);
  margin-bottom: var(--spacing-sm);
  background-color: var(--color-white-snow);
  transition: all 0.15s ease-out;
}

.navbar-mobile-link:hover {
  background-color: var(--color-primary);
  color: var(--color-white-snow);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-black-carbon);
}

.navbar-mobile-link.router-link-active {
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .navbar-toggle {
    display: flex;
  }

  .navbar-mobile {
    display: flex;
  }
}
</style>
