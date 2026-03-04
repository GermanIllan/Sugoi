<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LoginForm from '@/components/Auth/LoginForm.vue';
import RegisterForm from '@/components/Auth/RegisterForm.vue';

const route = useRoute();
const authStore = useAuthStore();

const isLoginMode = ref(true);
const showLoader = ref(false);
const router = useRouter();

// Set mode based on route
onMounted(() => {
  if (route.name === 'sign-up') {
    isLoginMode.value = false;
  }
});

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  authStore.error = null;
};

const handleLoginSuccess = () => {
  showLoader.value = true;
  setTimeout(() => {
    router.push('/');
  }, 2000);
};
</script>

<template>
  <div class="auth-view container" :class="{ 'view-blurred': showLoader }">
    <!-- Rombacat Animation -->
    <img src="@/assets/images/gif/rombacat.gif" alt="Rombacat" class="rombacat" />

    <!-- Loader Overlay -->
    <div v-if="showLoader" class="loader-overlay">
      <div class="loader-content">
        <img src="@/assets/images/gif/runcat_nobg.svg" alt="Loading..." class="loader-cat" />
        <p class="loader-text text-bold">INICIANDO SESIÓN...</p>
      </div>
    </div>

    <div class="auth-card-container">
      <div class="auth-card card shadow-lg">
        <!-- Decoration side -->
        <div class="auth-decoration">
          <div class="kanji-large">{{ isLoginMode ? 'ログイン' : '登録' }}</div>
          <div class="decoration-text">SUGOI! AUTH</div>
          <div class="decoration-line"></div>
        </div>

        <!-- Form side -->
        <div class="auth-form-container">
          <h1 class="auth-title">
            {{ isLoginMode ? 'BIENVENIDO' : 'ÚNETE AHORA' }}
          </h1>
          
          <LoginForm v-if="isLoginMode" @success="handleLoginSuccess" />
          <RegisterForm v-else />

          <div class="auth-switch">
            <p v-if="isLoginMode">
              ¿No tienes cuenta? 
              <button @click="toggleMode" class="text-primary text-bold">Regístrate aquí</button>
            </p>
            <p v-else>
              ¿Ya tienes cuenta? 
              <button @click="toggleMode" class="text-primary text-bold">Inicia sesión</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rombacat {
  position: absolute;
  top: -140px;
  left: 45%;
  transform: translateX(-50%);
  width: 170px;
  height: auto;
  z-index: 15; /* Above card (5), below NavBar (1000) and Footer (20) */
  pointer-events: none;
  animation: rombaSweep 16s linear infinite;
  animation-delay: 15s;
  
}

@keyframes rombaSweep {
  0% {
    top: -150px;
  }
  100% {
    top: calc(100% + 150px);
  }
}

.auth-view {
  min-height: calc(100vh - 80px); /* Adjust based on navbar height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

.auth-card-container {
  width: 100%;
  max-width: 900px;
  position: relative;
  z-index: 5; /* Ensure it's below the rombacat (z-index 15) */
}

.auth-card {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  padding: 0;
  overflow: hidden;
}

.auth-decoration {
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xxl);
  position: relative;
  overflow: hidden;
}

.kanji-large {
  font-size: 8rem;
  opacity: 0.1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  white-space: nowrap;
}

.decoration-text {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  letter-spacing: 4px;
  z-index: 1;
}

.decoration-line {
  width: 60px;
  height: 6px;
  background-color: var(--color-primary);
  margin-top: var(--spacing-md);
  z-index: 1;
}

.auth-form-container {
  padding: var(--spacing-xxl);
  background-color: var(--color-white-snow);
}

.auth-title {
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-xl);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-group label {
  font-family: var(--font-heading);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-black);
}

.input-group input {
  padding: var(--spacing-md);
  font-family: var(--font-body);
  font-size: var(--font-size-md);
  outline: none;
}

.input-group input:focus {
  border-color: var(--color-primary);
}

.error-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-sm);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-switch {
  margin-top: var(--spacing-xl);
  text-align: center;
  font-size: var(--font-size-sm);
}

.auth-switch button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-transform: uppercase;
  margin-left: var(--spacing-xs);
}

.auth-switch button:hover {
  text-decoration: underline;
}

/* Loader Styles */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s ease;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--color-white-snow);
  padding: var(--spacing-xl);
  border: 4px solid var(--color-black-carbon);
  box-shadow: 10px 10px 0px var(--color-black-carbon);
}

.loader-cat {
  width: 200px;
  height: auto;
}

.loader-text {
  font-family: var(--font-heading);
  letter-spacing: 2px;
  color: var(--color-black-carbon);
}

.view-blurred > .auth-card-container {
  filter: blur(4px);
  transition: filter 0.3s ease;
}

@media (max-width: 768px) {
  .rombacat {
    z-index: 1; /* Pass behind the card (z-index 5) in mobile */
  }

  .auth-card {
    grid-template-columns: 1fr;
  }
  
  .auth-decoration {
    padding: var(--spacing-xl);
  }
  
  .kanji-large {
    font-size: 5rem;
  }
  
  .auth-form-container {
    padding: var(--spacing-xl);
  }
}
</style>
