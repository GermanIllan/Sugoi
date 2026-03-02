<script setup lang="ts">
import { Activity } from 'lucide-vue-next';
</script>

<template>
  <section class="placeholder-card border-thick shadow-sm">
    <h3 class="section-title">
      <Activity :size="20" /> TRACKING DE ACTIVIDAD
    </h3>
    <div class="placeholder-content">
      <p>Próximamente: Visualiza tus estadísticas de generación y actividad en el foro.</p>
      <div class="dummy-bar-container">
        <div class="dummy-bar border-thin" style="width: 70%"></div>
        <div class="dummy-bar border-thin" style="width: 40%"></div>
        <div class="dummy-bar border-thin" style="width: 90%"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.placeholder-card {
  background-color: rgba(255, 255, 255, 0.6);
  padding: var(--spacing-xl);
  border-style: dashed;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-black-carbon);
}

.placeholder-content p {
  font-style: italic;
  opacity: 0.7;
  margin-bottom: var(--spacing-md);
}

.dummy-bar-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dummy-bar {
  height: 12px;
  background-color: var(--color-accent-gris-azulado);
}
</style>
