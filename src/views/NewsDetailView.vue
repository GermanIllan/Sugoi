<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/newsStore'
import type { NewsSource } from '@/stores/newsStore'
import type { NewsCard } from '@/stores/newsStore'

const route = useRoute()
const newsStore = useNewsStore()
const {
  detailLoading: loading,
  detailError: error,
  detailSource: source,
  detailParentId: parentId,
  detailNewsId: newsId,
  detailSelectedNews: selectedNews,
  detailRelatedNews: relatedNews,
  detailParentTitle: parentTitle,
  detailParentSynopsis: parentSynopsis,
} = storeToRefs(newsStore)

const isAnime = computed<boolean>(() => source.value === 'anime')
const firstRelated = computed<NewsCard | null>(() => relatedNews.value[0] ?? null)

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const truncate = (text: string, limit: number): string => {
  if (text.length <= limit) return text
  return `${text.slice(0, limit).trim()}...`
}

const parseRouteParams = (): boolean => {
  const sourceParam = String(route.params.source || '')
  const parentIdParam = Number(route.params.parentId)
  const newsIdParam = Number(route.params.newsId)

  if ((sourceParam !== 'anime' && sourceParam !== 'manga') || Number.isNaN(parentIdParam) || Number.isNaN(newsIdParam)) {
    error.value = 'Parámetros de noticia inválidos.'
    return false
  }

  source.value = sourceParam as NewsSource
  parentId.value = parentIdParam
  newsId.value = newsIdParam
  return true
}

const loadDetail = async (): Promise<void> => {
  if (!parseRouteParams()) {
    return
  }

  await newsStore.loadNewsDetail({
    source: source.value,
    parentId: parentId.value,
    newsId: newsId.value,
  })
}

const getDetailRoute = (item: NewsCard) => ({
  name: 'news-detail',
  params: {
    source: item.source,
    parentId: String(item.parentId),
    newsId: String(item.mal_id),
  },
})

onMounted(async () => {
  await loadDetail()
})

watch(
  () => [route.params.source, route.params.parentId, route.params.newsId],
  async () => {
    await loadDetail()
  }
)
</script>

<template>
  <section class="news-detail-page">
    <div class="detail-topbar" aria-hidden="true"></div>

    <RouterLink :to="{ name: 'news' }" class="back-link">← Volver a Noticias</RouterLink>

    <div v-if="loading" class="card status-block">Cargando detalle...</div>
    <div v-else-if="error" class="card status-block">{{ error }}</div>

    <template v-else-if="selectedNews">
      <article class="card detail-main">
        <div class="detail-header">
          <span class="badge-rosa">{{ isAnime ? 'NOTICIA ANIME' : 'NOTICIA MANGA' }}</span>
          <span class="detail-date">{{ formatDateTime(selectedNews.date) }}</span>
        </div>

        <h1 class="detail-title">{{ selectedNews.title }}</h1>
        <p class="detail-parent">Obra relacionada: <span>{{ parentTitle }}</span></p>
        <p class="detail-parent">Autor: <span>{{ selectedNews.author_name || 'Staff MAL' }}</span></p>
        <p v-if="parentSynopsis" class="parent-synopsis">{{ truncate(parentSynopsis, 320) }}</p>

        <div class="detail-image-wrap">
          <img :src="selectedNews.coverImageUrl" :alt="selectedNews.title" class="detail-image" />
        </div>

        <p class="detail-excerpt">{{ selectedNews.excerpt }}</p>

        <div class="detail-actions">
          <RouterLink :to="{ name: 'news' }" class="button-secondary">Volver al listado</RouterLink>
          <RouterLink v-if="firstRelated" :to="getDetailRoute(firstRelated)" class="button-primary">
            Siguiente noticia
          </RouterLink>
        </div>
      </article>

      <aside class="card related-block" v-if="relatedNews.length > 0">
        <h2>Más noticias relacionadas</h2>
        <article v-for="item in relatedNews" :key="item.mal_id" class="related-item">
          <img :src="item.coverImageUrl" :alt="item.title" class="related-thumb" />
          <div class="related-content">
            <h3>{{ item.title }}</h3>
            <p>{{ truncate(item.excerpt, 95) }}</p>
            <RouterLink :to="getDetailRoute(item)">Leer más</RouterLink>
          </div>
        </article>
      </aside>
    </template>
  </section>
</template>

<style scoped>
.news-detail-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: var(--spacing-lg) 12px var(--spacing-xxl);
}

.detail-topbar {
  height: 14px;
  background: var(--color-primary);
  border: var(--border-thin);
  margin-bottom: var(--spacing-md);
}

.back-link {
  display: inline-block;
  margin-bottom: var(--spacing-md);
  text-decoration: none;
  color: var(--color-black-carbon);
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.detail-main {
  margin-bottom: var(--spacing-lg);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.detail-date {
  font-family: var(--font-heading);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
}

.detail-title {
  margin-bottom: var(--spacing-sm);
}

.detail-parent {
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);
}

.detail-parent span {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.parent-synopsis {
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.detail-image-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: var(--border-thin);
  overflow: hidden;
  background: #111;
  margin-bottom: var(--spacing-md);
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.detail-excerpt {
  font-size: var(--font-size-md);
  line-height: var(--line-height-relaxed);
}

.detail-actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: var(--spacing-md);
}

.button-secondary {
  display: inline-block;
  border: var(--border-thick);
  box-shadow: var(--shadow-offset-sm);
  padding: var(--button-padding-y) var(--button-padding-x);
  text-transform: uppercase;
  font-family: var(--font-heading);
  text-decoration: none;
  color: var(--color-black-carbon);
  background: var(--color-white-snow);
}

.related-block h2 {
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.related-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--spacing-sm);
  border: var(--border-thin);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.related-thumb {
  width: 100%;
  height: 100%;
  min-height: 90px;
  object-fit: cover;
  border: var(--border-thin);
}

.related-content h3 {
  margin: 0 0 4px;
  font-size: var(--font-size-sm);
}

.related-content p {
  margin: 0 0 8px;
  font-size: var(--font-size-xs);
}

.related-content a {
  color: var(--color-primary);
  text-decoration: none;
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: var(--font-size-xs);
}

.status-block {
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-heading);
}

@media (max-width: 700px) {
  .related-item {
    grid-template-columns: 1fr;
  }
}
</style>
