<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isLoginMode = ref(true);

// Set mode based on route
onMounted(() => {
  if (route.name === 'sign-up') {
    isLoginMode.value = false;
  }
});

const loginData = reactive({
  email: '',
  password: ''
});

const registerData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const formErrors = ref<string[]>([]);

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  formErrors.value = [];
  authStore.error = null;
};

const validateForm = () => {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (isLoginMode.value) {
    if (!loginData.email) errors.push('El email es obligatorio');
    else if (!emailRegex.test(loginData.email)) errors.push('Email inválido');
    if (!loginData.password) errors.push('La contraseña es obligatoria');
  } else {
    if (!registerData.username) errors.push('El nombre de usuario es obligatorio');
    else if (registerData.username.length < 3) errors.push('Usuario muy corto (min 3)');
    
    if (!registerData.email) errors.push('El email es obligatorio');
    else if (!emailRegex.test(registerData.email)) errors.push('Email inválido');
    
    if (!registerData.password) errors.push('La contraseña es obligatoria');
    else if (registerData.password.length < 6) errors.push('Contraseña muy corta (min 6)');
    
    if (registerData.password !== registerData.confirmPassword) {
      errors.push('Las contraseñas no coinciden');
    }
  }

  formErrors.value = errors;
  return errors.length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    if (isLoginMode.value) {
      await authStore.login({
        email: loginData.email,
        password: loginData.password
      });
    } else {
      await authStore.register({
        username: registerData.username,
        email: registerData.email,
        password: registerData.password
      });
    }
    router.push('/');
  } catch (err) {
    // Error handled by store
  }
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
          
          <form @submit.prevent="handleSubmit" class="auth-form">
            <!-- Register logic -->
            <div v-if="!isLoginMode" class="input-group">
              <label>NOMBRE DE USUARIO</label>
              <input 
                v-model="registerData.username" 
                type="text" 
                placeholder="Ex: SugoiOtaku"
                class="border-thick"
              />
            </div>

            <div class="input-group">
              <label>EMAIL</label>
              <input 
                v-if="isLoginMode"
                v-model="loginData.email" 
                type="email" 
                placeholder="tu@correo.com"
                class="border-thick"
              />
              <input 
                v-else
                v-model="registerData.email" 
                type="email" 
                placeholder="tu@correo.com"
                class="border-thick"
              />
            </div>

            <div class="input-group">
              <label>CONTRASEÑA</label>
              <input 
                v-if="isLoginMode"
                v-model="loginData.password" 
                type="password" 
                placeholder="••••••••"
                class="border-thick"
              />
              <input 
                v-else
                v-model="registerData.password" 
                type="password" 
                placeholder="••••••••"
                class="border-thick"
              />
            </div>

            <div v-if="!isLoginMode" class="input-group">
              <label>CONFIRMAR CONTRASEÑA</label>
              <input 
                v-model="registerData.confirmPassword" 
                type="password" 
                placeholder="••••••••"
                class="border-thick"
              />
            </div>

            <div v-if="formErrors.length > 0 || authStore.error" class="error-container">
              <div v-for="err in formErrors" :key="err" class="badge-rosa uppercase text-bold">
                {{ err }}
              </div>
              <div v-if="authStore.error" class="badge-rosa uppercase text-bold">
                {{ authStore.error }}
              </div>
            </div>

            <button 
              type="submit" 
              class="button-primary submit-btn"
              :disabled="authStore.isLoading"
            >
              {{ authStore.isLoading ? 'PROCESANDO...' : (isLoginMode ? 'ACCEDER' : 'REGISTRARME') }}
            </button>
          </form>

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
