<script setup lang="ts">
import type { Topic } from '@/stores/forum'

defineProps<{
  topic: Topic
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <RouterLink :to="{ name: 'topic-detail', params: { id: topic.id } }" class="card topic-card">
    <div class="topic-header">
      <h3 class="topic-title">{{ topic.title }}</h3>
      <span class="badge-rosa topic-date">{{ formatDate(topic.createdAt) }}</span>
    </div>
    <p class="topic-excerpt">{{ topic.content.substring(0, 180) }}{{ topic.content.length > 180 ? '...' : '' }}</p>
    <div class="topic-footer">
      <span class="topic-author">Escrito por <span class="text-bold text-primary">{{ topic.author }}</span></span>
    </div>
  </RouterLink>
</template>

<style scoped>
.topic-card {
  display: block;
  margin-bottom: var(--spacing-lg);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.topic-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: var(--shadow-offset-lg);
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
  gap: var(--spacing-sm);
}

.topic-title {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-black-carbon);
}

.topic-date {
  font-size: var(--font-size-xs);
  white-space: nowrap;
}

.topic-excerpt {
  color: var(--color-black-carbon);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-md);
}

.topic-footer {
  font-size: var(--font-size-sm);
  border-top: var(--border-thin);
  padding-top: var(--spacing-sm);
}
</style>
