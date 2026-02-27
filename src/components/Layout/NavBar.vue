<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import loadingGif from '@/assets/images/gif/loading.webp';

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);
const router = useRouter();

const isUserDropdownOpen = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);

const toggleUserDropdown = (event: Event) => {
  event.stopPropagation();
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    isUserDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleLogout = () => {
  authStore.logout();
  isUserDropdownOpen.value = false;
  router.push('/sign-in');
};

const handleLogoutMobile = () => {
  isMobileMenuOpen.value = false;
  handleLogout();
};

interface MenuItem {
  label: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { label: 'Inicio', link: '/' },
  { label: 'Noticias', link: '/noticias' },
  { label: 'Filtros', link: '/filtros' },
  { label: 'Foro', link: '/forum' },
  { label: 'Crear Avatar', link: '/create-skin' },
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
        <img src="@/assets/images/image/sugoiw.jpg" alt="sugoi" class="logo-img" />
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

      <!-- Auth Section -->
      <div class="auth-section">
        <!-- Not Authenticated: Login Icon -->
        <router-link v-if="!isAuthenticated" to="/sign-in" class="auth-btn" title="Iniciar sesión">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="auth-icon">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </router-link>

        <!-- Authenticated: User Dropdown -->
        <div v-else class="user-dropdown-wrapper" ref="dropdownContainer">
          <button class="auth-btn user-btn" @click="toggleUserDropdown" :class="{ 'active': isUserDropdownOpen }">
            <div class="user-avatar-placeholder border-thin">
              <img v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="user.username" class="user-avatar-img" />
              <template v-else>
                {{ user?.username.charAt(0).toUpperCase() }}
              </template>
            </div>
          </button>

          <div v-if="isUserDropdownOpen" class="user-dropdown card shadow-md">
            <div class="dropdown-header">
              <span class="user-name">{{ user?.username }}</span>
              <span class="user-email">{{ user?.email }}</span>
            </div>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" @click="handleLogout">
              <span class="kanji-item">ログアウト</span>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

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
        <!-- User Info in Mobile -->
        <li v-if="isAuthenticated" class="mobile-user-info-item">
          <div class="mobile-user-box border-thin shadow-sm">
            <div class="user-avatar-placeholder border-thin">
              <img v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="user.username" class="user-avatar-img" />
              <template v-else>
                {{ user?.username.charAt(0).toUpperCase() }}
              </template>
            </div>
            <div class="mobile-user-details">
              <span class="user-name">{{ user?.username }}</span>
              <span class="user-email">{{ user?.email }}</span>
            </div>
          </div>
        </li>

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

        <!-- Auth Actions in Mobile -->
        <li v-if="!isAuthenticated" class="auth-mobile-item">
          <router-link 
            to="/sign-in" 
            class="mobile-nav-item" 
            @click="handleNavigation('/sign-in')"
          >
            <span class="kanji-item">ログイン</span>
            ACCEDER
          </router-link>
        </li>
        <li v-else class="auth-mobile-item">
          <button class="mobile-nav-item logout-mobile" @click="handleLogoutMobile">
            <span class="kanji-item">ログアウト</span>
            CERRAR SESIÓN
          </button>
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
  border-bottom: var(--border-thick-primary);
  width: 100%;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  max-width: 1840px;
  margin: 0px auto;
  height: 80px;
}


.logo-img {
  height: 70px; /* Adjust as needed */
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


/* Auth Section Styles */
.auth-section {
  display: flex;
  align-items: center;
  margin-left: var(--spacing-md);
}

.auth-btn {
  background: none;
  border: none;
  color: var(--color-white-snow);
  cursor: pointer;
  padding: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.auth-btn:hover {
  color: var(--color-primary);
  transform: scale(1.1);
}

.user-btn {
  padding: 0;
}

.user-avatar-placeholder {
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: var(--color-white-snow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-md);
  border: 2px solid var(--color-white-snow);
  overflow: hidden;
}

.user-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-dropdown-wrapper {
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-md);
  min-width: 200px;
  z-index: 1002;
  padding: var(--spacing-md) !important;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.dropdown-header {
  display: flex;
  flex-direction: column;
  padding-bottom: var(--spacing-sm);
}

.user-name {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  color: var(--color-black-carbon);
}

.user-email {
  font-size: 10px;
  color: #666;
}

.dropdown-divider {
  height: 2px;
  background-color: var(--color-black-carbon);
  margin: var(--spacing-xs) 0;
}

.dropdown-item {
  background: none;
  border: none;
  padding: var(--spacing-sm) 0;
  text-align: left;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xs);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  color: var(--color-black-carbon);
  transition: color 0.1s ease;
}

.dropdown-item:hover {
  color: var(--color-primary);
}

.kanji-item {
  font-size: 0.6rem;
  opacity: 0.6;
}

/* Mobile Auth Styles */
.mobile-user-info-item {
  padding: var(--spacing-md);
  list-style: none;
}

.mobile-user-box {
  background-color: var(--color-white-snow);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.mobile-user-details {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.logout-mobile {
  color: var(--color-primary) !important;
}

.auth-mobile-item {
  list-style: none;
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

