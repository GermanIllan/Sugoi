<script setup lang="ts">
/**
 * Generic Confirmation Modal (Neo-Brutalist Style)
 */
defineProps<{
  show: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}>();

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <Transition name="confirm-fade">
    <div v-if="show" class="confirm-overlay" @click="$emit('cancel')">
      <div class="confirm-modal border-thick shadow-lg" @click.stop>
        <div class="confirm-body">
          <div class="confirm-icon shadow-xs border-thick">!</div>
          <h3 class="confirm-title">{{ title || '¿ESTÁS SEGURO?' }}</h3>
          <p class="confirm-text">{{ message || 'Esta acción no se puede deshacer.' }}</p>
          <div class="confirm-actions">
            <button class="button-neo-modal cancel-btn border-thick shadow-xs" @click="$emit('cancel')">
              <span class="kanji-btn">キャンセル</span>
              {{ cancelText || 'CANCELAR' }}
            </button>
            <button class="button-neo-modal confirm-btn border-thick shadow-xs" @click="$emit('confirm')">
              <span class="kanji-btn">確認する</span>
              {{ confirmText || 'CONFIRMAR' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: var(--spacing-lg);
  backdrop-filter: blur(4px);
}

.confirm-modal {
  max-width: 420px;
  width: 100%;
  background-color: var(--color-white-snow);
  position: relative;
  overflow: hidden;
}

.confirm-body {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: radial-gradient(var(--color-accent-gris-azulado) 1px, transparent 1px);
  background-size: 15px 15px;
}

.confirm-icon {
  width: 60px;
  height: 60px;
  background-color: var(--color-accent-rosa);
  border-color: var(--color-black-carbon);
  font-size: 2rem;
  font-weight: var(--font-weight-black);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  color: var(--color-black-carbon);
}

.confirm-title {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
  color: var(--color-black-carbon);
  text-transform: uppercase;
}

.confirm-text {
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xl);
  color: #333;
  line-height: 1.5;
}

.confirm-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  width: 100%;
}

.kanji-btn {
  display: block;
  font-size: 0.6rem;
  opacity: 0.7;
}

.button-neo-modal {
  border: 3px solid var(--color-black-carbon);
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-neo-modal:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.cancel-btn {
  background-color: var(--color-accent-gris-azulado);
  color: var(--color-black-carbon);
}

.confirm-btn {
  background-color: var(--color-primary);
  color: white;
}

.confirm-btn:hover {
  background-color: var(--color-primary-dark, #ff5e3a);
}

.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.3s ease;
}

.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}

.confirm-fade-enter-active .confirm-modal {
  animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-pop {
  from { transform: scale(0.9) translateY(10px); }
  to { transform: scale(1) translateY(0); }
}

@media (max-width: 480px) {
  .confirm-actions {
    grid-template-columns: 1fr;
  }
}
</style>
