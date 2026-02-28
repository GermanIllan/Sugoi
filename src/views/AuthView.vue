<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import LoginForm from '@/components/Auth/LoginForm.vue';
import RegisterForm from '@/components/Auth/RegisterForm.vue';

const route = useRoute();
const authStore = useAuthStore();

const isLoginMode = ref(true);

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
</script>

<template>
  <div class="auth-view container">
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
          
          <LoginForm v-if="isLoginMode" />
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
.auth-view {
  min-height: calc(100vh - 80px); /* Adjust based on navbar height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
}

.auth-card-container {
  width: 100%;
  max-width: 900px;
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

@media (max-width: 768px) {
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
