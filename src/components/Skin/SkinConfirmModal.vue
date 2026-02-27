<script setup lang="ts">
defineProps<{
  show: boolean;
  title?: string;
  message?: string;
}>();

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <div v-if="show" class="confirm-overlay" @click="$emit('cancel')">
    <div class="confirm-modal card shadow-lg" @click.stop>
      <h3 class="confirm-title">{{ title || '¿ESTÁS SEGURO?' }}</h3>
      <p class="confirm-text">{{ message || 'Esta acción no se puede deshacer.' }}</p>
      <div class="confirm-actions">
        <button class="button-primary cancel-btn" @click="$emit('cancel')">CANCELAR</button>
        <button class="button-primary delete-btn" @click="$emit('confirm')">ELIMINAR</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: var(--spacing-xl);
}

.confirm-modal {
  max-width: 400px;
  width: 100%;
  text-align: center;
  background-color: var(--color-white-snow);
}

.confirm-title {
  margin-bottom: var(--spacing-md);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
}

.confirm-text {
  margin-bottom: var(--spacing-xl);
  font-weight: var(--font-weight-medium);
}

.confirm-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.cancel-btn {
  background-color: var(--color-accent-gris-azulado);
}

.delete-btn {
  background-color: var(--color-primary);
}
</style>
