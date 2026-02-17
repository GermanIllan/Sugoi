<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForumStore } from '@/stores/forum'
import ReplyCard from '@/components/Forum/ReplyCard.vue'
import ReplyForm from '@/components/Forum/ReplyForm.vue'

const route = useRoute()
const router = useRouter()
const forumStore = useForumStore()

onMounted(async () => {
  const id = route.params.id as string
  await forumStore.fetchTopicById(id)
  
  if (!forumStore.currentTopic) {
    router.push({ name: 'forum' })
  }
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="topic-detail-container" v-if="forumStore.currentTopic">
    <RouterLink :to="{ name: 'forum' }" class="back-link">
      ← Volver al Foro
    </RouterLink>

    <article class="card main-topic">
      <header class="topic-header">
        <h1 class="topic-title">{{ forumStore.currentTopic.title }}</h1>
        <div class="topic-meta badge-rosa">
          Por <span class="text-bold text-primary">{{ forumStore.currentTopic.author }}</span> 
          el <span class="date">{{ formatDate(forumStore.currentTopic.createdAt) }}</span>
        </div>
      </header>
      
      <div class="topic-content">
        {{ forumStore.currentTopic.content }}
      </div>
    </article>

    <section class="replies-section">
      <h3 class="section-title">Respuestas ({{ forumStore.replies.length }})</h3>
      
      <div v-if="forumStore.replies.length === 0" class="card no-replies">
        Aún no hay respuestas. Sé el primero en opinar.
      </div>
      
      <div class="replies-list" v-else>
        <ReplyCard 
          v-for="reply in forumStore.replies" 
          :key="reply.id" 
          :reply="reply" 
        />
      </div>

      <div class="card reply-form-container">
        <ReplyForm :topic-id="forumStore.currentTopic.id" />
      </div>
    </section>
  </div>
  <div v-else-if="forumStore.loading" class="loading-state">
    Cargando tema...
  </div>
</template>

<style scoped>
.topic-detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-md);
}

.back-link {
  display: inline-block;
  margin-bottom: var(--spacing-lg);
  color: var(--color-black-carbon);
  text-decoration: none;
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  border-bottom: var(--border-thin);
}

.back-link:hover {
  color: var(--color-primary);
}

.main-topic {
  margin-bottom: var(--spacing-xxl);
}

.topic-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
}

.topic-meta {
  display: inline-block;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);
}

.topic-content {
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-md);
  white-space: pre-wrap;
  padding-top: var(--spacing-md);
  border-top: var(--border-thin);
}

.replies-section {
  padding-top: var(--spacing-xl);
}

.section-title {
  margin-bottom: var(--spacing-lg);
}

.no-replies {
  text-align: center;
  padding: var(--spacing-xl);
  opacity: 0.6;
}

.reply-form-container {
  margin-top: var(--spacing-xxl);
}

.loading-state {
  text-align: center;
  padding: var(--spacing-xxl);
  font-family: var(--font-heading);
  text-transform: uppercase;
}
</style>
