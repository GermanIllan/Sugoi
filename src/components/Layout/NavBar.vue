<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import loadingGif from '@/assets/images/gif/loading.gif';

interface MenuItem {
  label: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Filtros', link: '/filtros' },
  { label: 'Noticias', link: '/noticias' },
  { label: 'Blog', link: '/blog' },
  { label: 'Crear Avatar', link: '/avatar' },
];

const isMobileMenuOpen = ref(false);
const route = useRoute();
const isLoading = ref(false);

function startLoading() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 5000);
}

function handleNavigation(link: string) {
  isMobileMenuOpen.value = false; 
  startLoading();
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function isActive(path: string): boolean {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
    
      <!-- Logo -->
      <router-link to="/" class="logo">
        <img src="@/assets/images/image/sugoiw.jpg" alt="SUGOI" class="logo-img" />
      </router-link>

      <!-- Desktop Menu -->
      <ul class="nav-links desktop-menu">
        <li v-for="item in menuItems" :key="item.label">
          <router-link 
            :to="item.link" 
            class="nav-link"
            :class="{ 'button-primary small-btn active-btn': isActive(item.link) }"
            @click="handleNavigation(item.link)"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>

      <!-- Burger Icon -->
      <button class="burger-menu" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="burger-bar" :class="{ 'open': isMobileMenuOpen }"></span>
        <span class="burger-bar" :class="{ 'open': isMobileMenuOpen }"></span>
        <span class="burger-bar" :class="{ 'open': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" :class="{ 'active': isMobileMenuOpen }">
      <ul class="mobile-nav-links">
        <li v-for="item in menuItems" :key="item.label">
          <router-link 
            :to="item.link" 
            class="mobile-nav-item" 
            :class="{ 'button-primary mobile-btn active-btn': isActive(item.link) }" 
            @click="handleNavigation(item.link)"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
    
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="loading-overlay">
        <img :src="loadingGif" alt="Loading..." class="loading-gif" />
    </div>
  </nav>
</template>


<style scoped>
.loading-overlay {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2000;
}

.loading-gif {
    width: 120px;
    height: auto;
    display: block;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color:#000000;
  border-bottom: var(--border-thick);
  width: 100%;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  max-width: 1440px;
  margin: 0 auto;
  height: 80px;
}


.logo-img {
  height: 40px; /* Adjust as needed */
  width: auto;
  display: block;
}

/* Desktop Menu */
.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-md); /* Reduced gap to fit buttons */
  margin: 0;
  padding: 0;
}

.nav-link {
  font-size: var(--font-size-xs);
  padding: 8px 16px;
  color: var(--color-white-snow);
  text-decoration: none;
  display: inline-block;
  /* Ensure inactive links are simple text */
  background: none;
  border: none;
  box-shadow: none;
  font-family: var(--font-heading); /* Or default font? Using heading likely intended for nav */
  text-transform: uppercase; /* Match button style usually */
  font-weight: var(--font-weight-bold);
  letter-spacing: 1px;
}

/* Base styles are bare, active state adds button styles */
.active-btn.small-btn {
    background-color: var(--color-primary);
    box-shadow: 2px 2px 0 var(--color-white-snow); /* Contrast shadow on black header */
    border-color: var(--color-black-carbon);
}
.active-btn.small-btn:hover {
    box-shadow: 4px 4px 0 var(--color-white-snow);
    transform: translate(-2px, -2px);
}
.active-btn.small-btn:active {
    box-shadow: 1px 1px 0 var(--color-white-snow);
    transform: translate(1px, 1px);
}


/* Burger Menu */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 32px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.burger-bar {
  display: block;
  width: 100%;
  height: 4px;
  background-color: var(--color-white-snow);
  transition: all 0.3s ease;
}

.burger-bar.open:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
  background-color: var(--color-white-snow);
}

.burger-bar.open:nth-child(2) {
  opacity: 0;
}

.burger-bar.open:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
  background-color: var(--color-primary);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 80px; /* Height of navbar */
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: var(--color-black-carbon);
  display: flex;
  flex-direction: column; /* Ensure vertical stacking */
  justify-content: center; /* Center vertically */
  align-items: stretch; /* Stretch children to full width */
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  border-top: var(--border-thick);
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-nav-links {
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0; /* Remove gap to allows items to touch if needed, or keep spacing via padding */
  width: 100%;
}

.mobile-nav-links li {
  width: 100%;
}

.mobile-nav-item {
  display: block;
  width: 100%;
  color: var(--color-white-snow);
  text-decoration: none;
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  text-transform: uppercase;
  padding: var(--spacing-lg) 0; /* Vertical padding */
  border: none;
  background: none;
  transition: transform 0.2s ease, color 0.2s ease;
}

.mobile-nav-item:hover {
  transform: translateY(3px);
  
}

/* Apply active styles */
.active-btn.mobile-btn {
    background-color: transparent;
    color: var(--color-white-snow);
    border: none; 
    border-top: 4px solid var(--color-primary);
    border-bottom: 4px solid var(--color-primary);
    width: 100%;
}


/* Responsive Breakpoints */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .burger-menu {
    display: flex;
  }
  
  .navbar-container {
      padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>

