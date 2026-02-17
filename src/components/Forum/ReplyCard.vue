<script setup lang="ts">
import type { Reply } from '@/stores/forum'

defineProps<{
  reply: Reply
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="reply-card">
    <div class="reply-header">
      <span class="reply-author text-bold text-primary">{{ reply.author }}</span>
      <span class="badge-crema reply-date">{{ formatDate(reply.createdAt) }}</span>
    </div>
    <div class="reply-content">
      {{ reply.content }}
    </div>
  </div>
</template>

<style scoped>
.reply-card {
  background-color: var(--color-white-snow);
  border-left: var(--border-thick);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  border-top: var(--border-thin);
  border-right: var(--border-thin);
  border-bottom: var(--border-thin);
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.reply-author {
  font-size: var(--font-size-md);
}

.reply-date {
  font-size: var(--font-size-xs);
}

.reply-content {
  color: var(--color-black-carbon);
  line-height: var(--line-height-normal);
  white-space: pre-wrap;
  font-size: var(--font-size-md);
}
</style>
