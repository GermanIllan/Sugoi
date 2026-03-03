<script setup lang="ts">
import { MessageSquare, ExternalLink, PlusCircle } from 'lucide-vue-next';
import type { Topic } from '@/stores/forum';

const props = defineProps<{
  topics: Topic[];
}>();

const latestTopics = props.topics.slice(0, 3);
</script>

<template>
  <section class="profile-forum-card border-thick shadow-md">
    <div class="card-header">
        <h3 class="section-title">
            <MessageSquare :size="22" /> MIS APORTACIONES EN EL FORO
        </h3>
        <router-link to="/forum" class="view-more-link">IR AL FORO →</router-link>
    </div>

    <div class="forum-content">
        <div v-if="topics.length > 0" class="topics-list">
            <div v-for="topic in latestTopics" :key="topic.id" class="topic-item border-thin">
                <div class="topic-main">
                    <span class="topic-date">{{ new Date(topic.createdAt).toLocaleDateString() }}</span>
                    <h4 class="topic-title">{{ topic.title }}</h4>
                </div>
                <!-- Navigation to the actual topic if route exists, using /forum as fallback -->
                <router-link :to="{ name: 'forum' }" class="topic-link border-thin shadow-xs">
                    <ExternalLink :size="14" />
                </router-link>
            </div>
            
            <p v-if="topics.length > 3" class="more-topics-meta">
                Y {{ topics.length - 3 }} aportaciones más en la comunidad...
            </p>
        </div>

        <div v-else class="empty-forum-state border-thin">
            <div class="empty-icon-wrap">
                <MessageSquare :size="40" stroke-width="1.5" />
            </div>
            <div class="empty-text">
                <h4>TU VOZ AÚN NO SE HA ESCUCHADO</h4>
                <p>Aún no has hecho aportaciones en la comunidad Sugoi.</p>
                <router-link to="/forum" class="create-first-btn border-thick shadow-sm">
                    <PlusCircle :size="16" /> CREAR MI PRIMER TEMA
                </router-link>
            </div>
        </div>
    </div>
  </section>
</template>

<style scoped>
.profile-forum-card {
  background-color: var(--color-white-snow);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-title {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-black);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-black-carbon);
  margin: 0;
}

.view-more-link {
    font-size: 0.75rem;
    font-weight: var(--font-weight-black);
    color: var(--color-primary);
    text-decoration: none;
    letter-spacing: 1px;
}

.forum-content {
    flex-grow: 1;
}

/* Topics List */
.topics-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.topic-item {
    padding: var(--spacing-md);
    background: #fdfdfd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s ease;
}

.topic-item:hover {
    transform: translateX(4px);
    background: #fff;
    border-color: var(--color-primary);
}

.topic-date {
    font-size: 0.65rem;
    font-weight: bold;
    color: #888;
    display: block;
    margin-bottom: 2px;
}

.topic-title {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: var(--font-weight-black);
    margin: 0;
    color: var(--color-black-carbon);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.topic-link {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-white-snow);
    color: var(--color-black-carbon);
    text-decoration: none;
    flex-shrink: 0;
}

.topic-link:hover {
    background: var(--color-primary);
    color: white;
}

.more-topics-meta {
    font-size: 0.75rem;
    font-style: italic;
    color: #777;
    margin-top: var(--spacing-xs);
    text-align: right;
}

/* Empty State */
.empty-forum-state {
    padding: var(--spacing-xl);
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
    background: #fafafa;
    border-style: dashed;
}

.empty-icon-wrap {
    color: #ddd;
    flex-shrink: 0;
}

.empty-text h4 {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-black);
    margin: 0 0 4px;
    font-size: 1rem;
    color: #888;
}

.empty-text p {
    font-size: 0.8rem;
    color: #999;
    margin-bottom: var(--spacing-md);
}

.create-first-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--color-primary);
    color: white;
    text-decoration: none;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    font-weight: var(--font-weight-black);
    letter-spacing: 1px;
}

.create-first-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
}

@media (max-width: 600px) {
    .empty-forum-state {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);
    }
}
</style>
