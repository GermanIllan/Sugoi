<script setup lang="ts">
import { MessageSquare } from 'lucide-vue-next';
</script>

<template>
  <section class="placeholder-card border-thick shadow-sm">
    <h3 class="section-title">
      <MessageSquare :size="20" /> MIS APORTACIONES EN EL FORO
    </h3>
    <div class="placeholder-content">
      <p>Sección visual: Tus temas y respuestas aparecerán aquí para acceso rápido.</p>
      <ul class="dummy-list">
        <li class="dummy-item border-thin">¿Cuál es vuestro anime favorito de esta temporada?</li>
        <li class="dummy-item border-thin">Duda con el registro de nuevos usuarios</li>
      </ul>
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

.dummy-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dummy-item {
  padding: 8px 12px;
  font-size: 0.85rem;
  background-color: var(--color-white-snow);
  opacity: 0.6;
}
</style>
