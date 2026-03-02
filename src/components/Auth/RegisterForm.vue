<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const registerData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const formErrors = ref<string[]>([]);

const validateForm = () => {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!registerData.username) errors.push('El nombre de usuario es obligatorio');
  else if (registerData.username.length < 3) errors.push('Usuario muy corto (min 3)');
  
  if (!registerData.email) errors.push('El email es obligatorio');
  else if (!emailRegex.test(registerData.email)) errors.push('Email inválido');
  
  if (!registerData.password) errors.push('La contraseña es obligatoria');
  else if (registerData.password.length < 6) errors.push('Contraseña muy corta (min 6)');
  
  if (registerData.password !== registerData.confirmPassword) {
    errors.push('Las contraseñas no coinciden');
  }

  formErrors.value = errors;
  return errors.length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    await authStore.register({
      username: registerData.username,
      email: registerData.email,
      password: registerData.password
    });
    router.push('/');
  } catch (err) {
    // Error handled by store
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <div class="input-group">
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
        v-model="registerData.email" 
        type="email" 
        placeholder="tu@correo.com"
        class="border-thick"
      />
    </div>

    <div class="input-group">
      <label>CONTRASEÑA</label>
      <input 
        v-model="registerData.password" 
        type="password" 
        placeholder="••••••••"
        class="border-thick"
      />
    </div>

    <div class="input-group">
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
      {{ authStore.isLoading ? 'PROCESANDO...' : 'REGISTRARME' }}
    </button>
  </form>
</template>

<style scoped>
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
</style>
