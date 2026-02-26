<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useForumStore } from '@/stores/forum'
import TopicCard from '@/components/Forum/TopicCard.vue'
import CreateTopicForm from '@/components/Forum/CreateTopicForm.vue'

const forumStore = useForumStore()
const showCreateForm = ref(false)

onMounted(async () => {
  await forumStore.fetchTopics()
})

const handleTopicCreated = () => {
  showCreateForm.value = false
}
</script>

<template>
  <div class="forum-container">
    <header class="forum-header">
      <div class="header-content">
        <h1 class="forum-title">Comunidad Sugoi</h1>
        <p class="forum-subtitle">Discute, comparte y explora el mundo del manga y el anime.</p>
      </div>
      <button 
        @click="showCreateForm = !showCreateForm" 
        class="button-primary"
      >
        {{ showCreateForm ? 'Cancelar' : 'Nuevo Tema' }}
      </button>
    </header>

    <div v-if="showCreateForm" class="create-section card">
      <CreateTopicForm @created="handleTopicCreated" />
    </div>

    <main class="topics-list">
      <div v-if="forumStore.loading" class="loading">
        Cargando temas...
      </div>
      <template v-else>
        <TopicCard 
          v-for="topic in forumStore.topics" 
          :key="topic.id" 
          :topic="topic" 
        />
        <div v-if="forumStore.topics.length === 0" class="empty-state card">
          No hay temas aún. ¡Sé el primero en crear uno!
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.forum-container {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-md);
}

.forum-container::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(246, 247, 247, 0.85), rgba(255, 255, 255, 0.85)),
    url('@/assets/images/image/lineas4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.forum-container > * {
  position: relative;
  z-index: 1;
}

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--spacing-xxl);
  border-bottom: var(--border-thick);
  padding-bottom: var(--spacing-lg);
  gap: var(--spacing-lg);
}

@media (max-width: 600px) {
  .forum-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

.forum-title {
  font-size: var(--font-size-xxl);
  margin-bottom: var(--spacing-xs);
  color: var(--color-black-carbon);
}

.forum-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-black-carbon);
  opacity: 0.8;
  margin: 0;
}

.create-section {
  margin-bottom: var(--spacing-xxl);
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.loading, .empty-state {
  text-align: center;
  padding: var(--spacing-xxl);
  font-family: var(--font-heading);
  text-transform: uppercase;
}
</style>
