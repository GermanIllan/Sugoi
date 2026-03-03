<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/stores/newsStore'
import { useScrollToTopOnUpdate } from '@/composables/useScroll'
import type { NewsCard } from '@/stores/newsStore'

type NewsFilter = 'latest' | 'weekly' | 'strategy' | 'popular'

const activeFilter = ref<NewsFilter>('latest')

// Auto-scroll on filter change
useScrollToTopOnUpdate(activeFilter)
const searchQuery = ref<string>('')
const newsStore = useNewsStore()
const {
  allAnimeNews,
  allMangaNews,
  selectedAnimeNews,
  selectedMangaNews,
  loading,
  loadingMore,
  error,
} = storeToRefs(newsStore)

const toTimestamp = (dateString: string): number => new Date(dateString).getTime()

const formatDateTime = (dateString: string): string =>
  new Date(dateString).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const truncate = (text: string, limit: number): string => {
  if (text.length <= limit) return text
  return `${text.slice(0, limit).trim()}...`
}

const sortDescByDate = (items: NewsCard[]): NewsCard[] =>
  [...items].sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))

const sortDescByComments = (items: NewsCard[]): NewsCard[] =>
  [...items].sort((a, b) => b.comments - a.comments)

const STRATEGY_KEYWORDS: string[] = [
  'estrategia',
  'strategy',
  'top',
  'ranking',
  'analysis',
  'análisis',
  'guide',
  'guía',
  'guia',
  'project',
  'proyecto',
]

const applyFilter = (items: NewsCard[], filter: NewsFilter): NewsCard[] => {
  const base = sortDescByDate(items)

  if (filter === 'latest') return base

  if (filter === 'weekly') {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return base.filter((item) => toTimestamp(item.date) >= sevenDaysAgo)
  }

  if (filter === 'strategy') {
    const result = base.filter((item) => {
      const haystack = `${item.title} ${item.excerpt}`.toLowerCase()
      return STRATEGY_KEYWORDS.some((keyword) => haystack.includes(keyword))
    })
    return result.length > 0 ? result : base
  }

  return sortDescByComments(base)
}

const applySearch = (items: NewsCard[]): NewsCard[] => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return items

  return items.filter((item) => {
    const haystack = `${item.title} ${item.excerpt} ${item.author_name}`.toLowerCase()
    return haystack.includes(query)
  })
}

const filteredAnimeNews = computed<NewsCard[]>(() =>
  applySearch(applyFilter(allAnimeNews.value, activeFilter.value))
)
const filteredMangaNews = computed<NewsCard[]>(() =>
  applySearch(applyFilter(allMangaNews.value, activeFilter.value))
)

const featuredAnime = computed<NewsCard | null>(() => filteredAnimeNews.value[0] ?? null)
const animeCards = computed<NewsCard[]>(() => filteredAnimeNews.value.slice(1, 4))
const animeCardsForGrid = computed<NewsCard[]>(() => {
  if (animeCards.value.length > 0) return animeCards.value
  return featuredAnime.value ? [featuredAnime.value] : []
})

const mangaMain = computed<NewsCard | null>(() => filteredMangaNews.value[0] ?? null)
const mangaSideCards = computed<NewsCard[]>(() => filteredMangaNews.value.slice(1, 4))

const hasVisibleNews = computed<boolean>(
  () => filteredAnimeNews.value.length > 0 || filteredMangaNews.value.length > 0
)

const detailAnime = computed<NewsCard | null>(() => selectedAnimeNews.value ?? featuredAnime.value)
const detailManga = computed<NewsCard | null>(() => selectedMangaNews.value ?? mangaMain.value)

const weeklyTrending = computed<NewsCard[]>(() => {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const combined = [...filteredAnimeNews.value, ...filteredMangaNews.value].filter(
    (item) => toTimestamp(item.date) >= sevenDaysAgo
  )
  return sortDescByComments(combined).slice(0, 4)
})

const getNewsDetailRoute = (item: NewsCard) => ({
  name: 'news-detail',
  params: {
    source: item.source,
    parentId: String(item.parentId),
    newsId: String(item.mal_id),
  },
})

const setFilter = (filter: NewsFilter): void => {
  activeFilter.value = filter
  newsStore.selectAnimeNews(filteredAnimeNews.value[0] ?? null)
  newsStore.selectMangaNews(filteredMangaNews.value[0] ?? null)
}

const selectAnimeNews = (item: NewsCard): void => {
  newsStore.selectAnimeNews(item)
}

const selectMangaNews = (item: NewsCard): void => {
  newsStore.selectMangaNews(item)
}

const loadNews = async (): Promise<void> => {
  await newsStore.loadNewsFeed()
}

const loadMoreNews = async (): Promise<void> => {
  await newsStore.loadMoreNewsFeed()
}

onMounted(async () => {
  await loadNews()
})
</script>

<template>
  <section class="news-page">
    <div class="editorial-topbar" aria-hidden="true"></div>

    <header class="featured-block" v-if="featuredAnime">
      <article class="featured-media card">
        <img :src="featuredAnime.coverImageUrl" :alt="featuredAnime.title" class="featured-image" />
      </article>

      <article class="featured-content card">
        <span class="featured-tag">TOP ANIME NEWS</span>
        <h1 class="featured-title">{{ featuredAnime.title }}</h1>
        <p class="featured-excerpt">{{ truncate(featuredAnime.excerpt, 180) }}</p>
        <div class="featured-meta">
          <span class="badge-rosa">{{ formatDateTime(featuredAnime.date) }}</span>
          <RouterLink
            :to="getNewsDetailRoute(featuredAnime)"
            class="button-primary featured-link"
            @click="selectAnimeNews(featuredAnime)"
          >
            Leer más
          </RouterLink>
        </div>
      </article>
    </header>

    <div class="filter-strip card" v-if="!loading">
      <button class="pill" :class="{ 'pill-active': activeFilter === 'latest' }" @click="setFilter('latest')">Ultima Hora</button>
      <button class="pill" :class="{ 'pill-active': activeFilter === 'weekly' }" @click="setFilter('weekly')">Semanal</button>
      <button class="pill" :class="{ 'pill-active': activeFilter === 'strategy' }" @click="setFilter('strategy')">Estrategia</button>
      <button class="pill" :class="{ 'pill-active': activeFilter === 'popular' }" @click="setFilter('popular')">Populares</button>
      <form class="search-form" @submit.prevent>
        <input v-model="searchQuery" type="text" class="search-input" placeholder="BUSCA NOTICIA..." />
        <button type="submit" class="search-btn" aria-label="Buscar noticia">Buscar</button>
      </form>
    </div>

    <div class="section-separator" aria-hidden="true"></div>

    <div v-if="loading" class="card status-block">Sincronizando noticias...</div>
    <div v-else-if="error" class="card status-block">{{ error }}</div>
    <div v-else-if="!hasVisibleNews" class="card status-block">NO HAY NOTICIAS POR EL MOMENTO</div>

    <section class="section-block" v-if="!loading && weeklyTrending.length > 0">
      <div class="section-heading">
        <h2>TENDENCIA SEMANAL</h2>
        <p>TOP COMENTARIOS</p>
      </div>
      <div class="trending-grid">
        <article v-for="item in weeklyTrending" :key="item.url" class="news-card card">
          <div class="news-thumb-wrap">
            <img :src="item.coverImageUrl" :alt="item.title" class="news-thumb" />
            <span class="news-label">{{ item.source === 'anime' ? 'Anime' : 'Manga' }}</span>
          </div>
          <h3 class="news-title">{{ item.title }}</h3>
          <p class="news-excerpt">{{ truncate(item.excerpt, 110) }}</p>
          <p class="news-author">Autor: {{ item.author_name || 'Staff' }}</p>
          <div class="news-bottom">
            <span class="news-date">{{ item.comments }} comentarios</span>
            <RouterLink
              :to="getNewsDetailRoute(item)"
              class="button-primary small-link"
              @click="item.source === 'anime' ? selectAnimeNews(item) : selectMangaNews(item)"
            >
              Leer más
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <div class="section-separator" aria-hidden="true"></div>

    <section class="section-block" v-if="!loading && animeCardsForGrid.length > 0">
      <div class="section-heading">
        <h2>ANIME <span class="section-kanji-inline">ニュース</span></h2>
        <p>NOTICIAS ANIME</p>
      </div>

      <div class="news-layout">
        <div class="anime-grid">
          <article v-for="item in animeCardsForGrid" :key="item.url" class="news-card card" @click="selectAnimeNews(item)">
            <div class="news-thumb-wrap">
              <img :src="item.coverImageUrl" :alt="item.title" class="news-thumb" />
              <span class="news-label">Anime</span>
            </div>

            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-excerpt">{{ truncate(item.excerpt, 120) }}</p>
            <p class="news-author">Autor: {{ item.author_name || 'Staff MAL' }}</p>

            <div class="news-bottom">
              <span class="news-date">{{ formatDateTime(item.date) }}</span>
              <RouterLink :to="getNewsDetailRoute(item)" class="button-primary small-link" @click.stop>
                Leer más
              </RouterLink>
            </div>
          </article>
        </div>

        <aside class="detail-panel card" v-if="detailAnime">
          <h3>Noticia seleccionada</h3>
          <img :src="detailAnime.coverImageUrl" :alt="detailAnime.title" class="detail-image" />
          <h4>{{ detailAnime.title }}</h4>
          <p>{{ truncate(detailAnime.excerpt, 220) }}</p>
          <p class="news-author">Autor: {{ detailAnime.author_name || 'Staff MAL' }}</p>
          <span class="detail-meta">{{ formatDateTime(detailAnime.date) }} · {{ detailAnime.comments }} comentarios</span>
          <RouterLink :to="getNewsDetailRoute(detailAnime)" class="button-primary">Leer más</RouterLink>
        </aside>
      </div>
    </section>

    <div class="section-separator" aria-hidden="true"></div>

    <section class="section-block" v-if="!loading && mangaMain">
      <div class="section-heading section-heading-manga">
        <h2>MANGA <span class="section-kanji-inline">ニュース</span></h2>
        <p>NOTICIAS MANGAS</p>
      </div>

      <div class="manga-layout">
        <article class="manga-main card" @click="selectMangaNews(mangaMain)">
          <img :src="mangaMain.coverImageUrl" :alt="mangaMain.title" class="manga-main-image" />
          <span class="news-label">Especial Manga</span>
          <h3 class="news-title">{{ mangaMain.title }}</h3>
          <p class="news-excerpt">{{ truncate(mangaMain.excerpt, 170) }}</p>
          <p class="news-author">Autor: {{ mangaMain.author_name || 'Staff MAL' }}</p>
          <RouterLink :to="getNewsDetailRoute(mangaMain)" class="button-primary small-link" @click.stop>
            Continuar leyendo
          </RouterLink>
        </article>

        <div class="manga-side-list">
          <article v-for="item in mangaSideCards" :key="item.url" class="manga-side-card card" @click="selectMangaNews(item)">
            <img :src="item.coverImageUrl" :alt="item.title" class="manga-side-thumb" />
            <div class="manga-side-content">
              <h4>{{ item.title }}</h4>
              <p>{{ truncate(item.excerpt, 90) }}</p>
              <p class="news-author">Autor: {{ item.author_name || 'Staff MAL' }}</p>
              <RouterLink :to="getNewsDetailRoute(item)" @click.stop>Leer más</RouterLink>
            </div>
          </article>
        </div>
      </div>

      <aside class="detail-panel card" v-if="detailManga">
        <h3>Noticia seleccionada</h3>
        <img :src="detailManga.coverImageUrl" :alt="detailManga.title" class="detail-image" />
        <h4>{{ detailManga.title }}</h4>
        <p>{{ truncate(detailManga.excerpt, 220) }}</p>
        <p class="news-author">Autor: {{ detailManga.author_name || 'Staff MAL' }}</p>
        <span class="detail-meta">{{ formatDateTime(detailManga.date) }} · {{ detailManga.comments }} comentarios</span>
        <RouterLink :to="getNewsDetailRoute(detailManga)" class="button-primary">Leer más</RouterLink>
      </aside>
    </section>

    <div class="section-separator" aria-hidden="true"></div>

    <div class="load-more-wrap" v-if="!loading && hasVisibleNews">
      <button class="button-primary" :disabled="loadingMore" @click="loadMoreNews">
        {{ loadingMore ? 'Cargando...' : 'Cargar más noticias' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.news-page {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  max-width: 1480px;
  margin: 0 auto;
  padding: var(--spacing-lg) 10px var(--spacing-xxl);
  border-left: var(--border-thick);
  border-right: var(--border-thick);
}

.news-page::before {
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

.news-page > * {
  position: relative;
  z-index: 1;
}

.editorial-topbar {
  height: 18px;
  background: var(--color-primary);
  border: var(--border-thin);
  margin-bottom: var(--spacing-sm);
}

.section-separator {
  height: 10px;
  background: #d0d0d0;
  border-top: var(--border-thin);
  border-bottom: var(--border-thin);
  margin-bottom: var(--spacing-lg);
}


.featured-block {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.featured-image {
  width: 100%;
  height: 100%;
  min-height: 340px;
  object-fit: cover;
  object-position: center 30%;
  border: var(--border-thin);
}

.featured-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-offset-sm);
}

.featured-tag {
  display: inline-block;
  align-self: flex-start;
  font-size: var(--font-size-xs);
  background: var(--color-primary);
  color: var(--color-white-snow);
  padding: 6px 10px;
  margin-bottom: var(--spacing-md);
  border: var(--border-thin);
  text-transform: uppercase;
  font-family: var(--font-heading);
}

.featured-title {
  margin-bottom: var(--spacing-md);
  font-size: clamp(1.9rem, 3.2vw, 3rem);
  line-height: 1.05;
}

.featured-excerpt {
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);
}

.featured-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
}

.featured-link {
  text-decoration: none;
}

.filter-strip {
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  overflow-x: auto;
}

.pill {
  border: var(--border-thin);
  padding: 6px 10px;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  font-family: var(--font-heading);
  white-space: nowrap;
  background: var(--color-white-snow);
  cursor: pointer;
}

.pill-active {
  background: var(--color-primary);
  color: var(--color-white-snow);
}

.search-form {
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto;
  min-width: 270px;
  border: var(--border-thin);
  background: var(--color-white-snow);
}

.search-input {
  border: 0;
  border-right: var(--border-thin);
  background: transparent;
  padding: 6px 10px;
  font-size: 0.66rem;
  font-family: var(--font-heading);
  text-transform: uppercase;
  outline: none;
}

.search-input::placeholder {
  color: #6f6f6f;
}

.search-btn {
  border: 0;
  background: #efefef;
  padding: 6px 12px;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  font-family: var(--font-heading);
  cursor: pointer;
  white-space: nowrap;
}

.section-block {
  margin-bottom: var(--spacing-xxl);
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--spacing-lg);
  border-bottom: var(--border-thick);
  padding-bottom: var(--spacing-sm);
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2.2rem, 6vw, 3.7rem);
  letter-spacing: 2px;
}

.section-kanji-inline {
  color: var(--color-primary);
}

.section-heading p {
  margin: 0;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: var(--font-size-md);
  text-transform: uppercase;
}

.news-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-md);
}

.anime-grid,
.trending-grid,
.promo-grid,
.schedule-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.news-card,
.promo-card,
.schedule-card {
  display: flex;
  flex-direction: column;
  min-height: 390px;
  cursor: pointer;
}

.news-thumb-wrap {
  position: relative;
  margin-bottom: var(--spacing-md);
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: var(--border-thin);
  background: #111;
}

.news-thumb,
.promo-image,
.schedule-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 55%;
  transition: transform 0.2s ease-out;
}

.promo-image,
.schedule-image {
  min-height: 170px;
  border: var(--border-thin);
  margin-bottom: var(--spacing-sm);
}

.news-card:hover .news-thumb,
.manga-main:hover .manga-main-image,
.manga-side-card:hover .manga-side-thumb,
.detail-panel:hover .detail-image,
.promo-card:hover .promo-image,
.schedule-card:hover .schedule-image {
  transform: scale(1.03);
}

.news-label {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--color-primary);
  color: var(--color-white-snow);
  border: var(--border-thin);
  font-size: 0.65rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 7px;
  font-family: var(--font-heading);
}

.news-title {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-sm);
}

.news-excerpt {
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
}

.news-author {
  margin: 0 0 6px;
  font-size: var(--font-size-xs);
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.news-forum-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.68rem;
  text-transform: uppercase;
  font-family: var(--font-heading);
  margin-bottom: var(--spacing-xs);
}

.news-bottom {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
}

.news-date {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  font-family: var(--font-heading);
}

.small-link {
  text-decoration: none;
  font-size: 0.7rem;
  padding: 8px 12px;
}

.manga-layout {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.manga-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.manga-main-image {
  width: 100%;
  height: 205px;
  object-fit: cover;
  object-position: center center;
  border: var(--border-thin);
  transition: transform 0.2s ease-out;
}

.manga-side-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.manga-side-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--spacing-sm);
  align-items: stretch;
  padding: var(--spacing-sm);
  cursor: pointer;
}

.manga-side-thumb {
  width: 100%;
  height: 100%;
  min-height: 84px;
  object-fit: cover;
  object-position: center center;
  border: var(--border-thin);
  transition: transform 0.2s ease-out;
}

.manga-side-content h4,
.review-content h4 {
  margin: 0 0 4px;
  font-size: var(--font-size-sm);
}

.manga-side-content p,
.review-content p {
  margin: 0 0 8px;
  font-size: var(--font-size-xs);
  line-height: 1.35;
}

.manga-side-content a,
.review-content a {
  color: var(--color-primary);
  text-decoration: none;
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: 0.7rem;
}

.detail-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.detail-panel h3 {
  font-size: var(--font-size-sm);
  margin-bottom: 0;
}

.detail-panel h4 {
  font-size: var(--font-size-md);
  margin-bottom: 0;
}

.detail-panel p {
  font-size: var(--font-size-sm);
  margin-bottom: 0;
}

.detail-image,
.review-thumb {
  width: 100%;
  height: 170px;
  object-fit: cover;
  object-position: center center;
  border: var(--border-thin);
  transition: transform 0.2s ease-out;
}

.review-card {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}

.detail-meta {
  font-size: var(--font-size-xs);
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.status-block {
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-heading);
  margin-bottom: var(--spacing-xl);
}

.load-more-wrap {
  display: flex;
  justify-content: center;
}

@media (max-width: 1200px) {
  .news-layout,
  .anime-grid,
  .manga-layout,
  .trending-grid,
  .promo-grid,
  .schedule-grid,
  .review-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .featured-block {
    grid-template-columns: 1fr;
  }

  .section-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .search-form {
    min-width: 100%;
    margin-left: 0;
  }

  .manga-side-card,
  .review-card {
    grid-template-columns: 1fr;
  }
}
</style>
