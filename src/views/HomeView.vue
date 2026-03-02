<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSkinStore } from '@/stores/skinStore'
import { useAuthStore } from '@/stores/authStore'
import { useAnimeStore } from '@/stores/animeStore'
import { useMangaStore } from '@/stores/mangaStore'
import { useForumStore } from '@/stores/forum'
import { storeToRefs } from 'pinia'
import fallbackAvatar from '@/assets/images/gif/eatingramen_cropped_processed_by_imagy.gif'
import type { Anime } from '@/types/anime'
import type { Manga } from '@/types/manga'

const visible = ref(false)
const router = useRouter()
const skinStore = useSkinStore()
const authStore = useAuthStore()
const { activeHomeAvatarUrl } = storeToRefs(skinStore)
const { isAuthenticated } = storeToRefs(authStore)
const animeStore = useAnimeStore()
const mangaStore = useMangaStore()
const forumStore = useForumStore()
const { animeRanking } = storeToRefs(animeStore)
const { mangaRanking } = storeToRefs(mangaStore)

interface RatingItem {
  title: string
  genres: string
  score: string
  color: string
  imageUrl: string | null
  detailType: 'anime' | 'manga' | null
  detailId: number | null
}

interface CommentItem {
  id: string
  initials: string
  name: string
  text: string
}

const defaultRatings: RatingItem[] = [
  {
    title: 'Attack on Titan: Final Season',
    genres: 'ACCIÓN • DRAMA • FANTASÍA',
    score: '9.8',
    color: 'var(--color-accent-rosa)',
    imageUrl: null,
    detailType: null,
    detailId: null,
  },
  {
    title: 'Demon Slayer: Kimetsu no Yaiba',
    genres: 'ACCIÓN • SUPERNATURAL • HISTÓRICO',
    score: '9.5',
    color: '#D8E4F2',
    imageUrl: null,
    detailType: null,
    detailId: null,
  },
  {
    title: 'Jujutsu Kaisen',
    genres: 'ACCIÓN • SOBRENATURAL • MISTERIO',
    score: '9.2',
    color: '#EFEFEF',
    imageUrl: null,
    detailType: null,
    detailId: null,
  },
]

const ratings = ref<RatingItem[]>([...defaultRatings])

const ratingColors: string[] = ['var(--color-accent-rosa)', '#D8E4F2', '#EFEFEF']

const formatGenres = (genres: Array<{ name: string }>): string => {
  const label = genres.slice(0, 3).map((genre) => genre.name.toUpperCase()).join(' • ')
  return label || 'SIN GÉNERO'
}

const toRatingItem = (item: Anime | Manga, index: number, detailType: 'anime' | 'manga'): RatingItem => ({
  title: item.title,
  genres: formatGenres(item.genres),
  score: item.score !== null ? item.score.toFixed(1) : 'N/A',
  color: ratingColors[index % ratingColors.length] ?? '#EFEFEF',
  imageUrl: item.images.jpg.large_image_url || item.images.jpg.image_url || null,
  detailType,
  detailId: item.mal_id,
})

const syncRatingsFromApi = (): void => {
  const merged = [
    ...animeRanking.value.slice(0, 6).map((item) => ({ item, type: 'anime' as const })),
    ...mangaRanking.value.slice(0, 6).map((item) => ({ item, type: 'manga' as const })),
  ]
    .filter(({ item }) => item.score !== null)
    .sort((a, b) => (b.item.score ?? 0) - (a.item.score ?? 0))
    .slice(0, 3)

  if (merged.length === 0) return

  ratings.value = merged.map(({ item, type }, index) => toRatingItem(item, index, type))
}

const goToRatingDetail = (rating: RatingItem): void => {
  if (!rating.detailType || !rating.detailId) return
  router.push({ name: 'description', params: { type: rating.detailType, id: String(rating.detailId) } })
}

onMounted(async () => {
  setTimeout(() => {
    visible.value = true
  }, 100)
  await Promise.all([
    animeStore.fetchAnimeRanking(),
    mangaStore.fetchMangaRanking(),
    syncCommentsFromForum(),
  ])
  syncRatingsFromApi()
  commentsPollingId = window.setInterval(() => {
    void syncCommentsFromForum()
  }, 5000)
})

onUnmounted(() => {
  if (commentsPollingId !== null) {
    window.clearInterval(commentsPollingId)
    commentsPollingId = null
  }
})

const comments = ref<CommentItem[]>([
  {
    id: 'fallback-1',
    initials: 'TY',
    name: 'Takeshi Yamamoto',
    text: 'SUGOI es increíble. Encuentro todas las noticias de anime que necesito y la comunidad es muy activa.',
  },
  {
    id: 'fallback-2',
    initials: 'SN',
    name: 'Sakura Nakamura',
    text: 'La mejor web de anime en español. Las calificaciones son muy precisas y no puedo dejar de visitar.',
  },
  {
    id: 'fallback-3',
    initials: 'CO',
    name: 'Carlos Otaku',
    text: 'Los videojuegos recomendados siempre son los mejores. Gracias a SUGOI descubrí Persona 5.',
  },
])

let commentsPollingId: number | null = null

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '??'
  const first = parts[0] ?? ''
  const second = parts[1] ?? ''
  if (!second) return first.slice(0, 2).toUpperCase()
  return `${first[0] ?? ''}${second[0] ?? ''}`.toUpperCase()
}

const syncCommentsFromForum = async (): Promise<void> => {
  const latestComments = await forumStore.fetchLatestComments(3)
  if (latestComments.length === 0) return

  const liveComments = latestComments.map((comment) => ({
    id: comment.id,
    initials: getInitials(comment.author),
    name: comment.author,
    text: comment.content,
  }))

  comments.value = [...liveComments, ...comments.value].slice(0, 3)
}
</script>

<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero" :class="{ 'fade-in': visible }">
      <div class="hero-container">
        <!-- Left Content -->
        <div class="hero-content">
          <h1 class="hero-kanji">すごい</h1>
          <div class="hero-title-box">
            <h2 class="hero-title">TU PORTAL DEFINITIVO</h2>
          </div>
          <p class="hero-description">
            De Anime, Manga y Cultura Japonesa.<br />
            Noticias, reseñas y la comunidad más<br />
            vibrante.
          </p>
          <router-link to="/noticias" class="hero-button">EXPLORAR AHORA</router-link>
        </div>

        <!-- Right Image -->
        <div class="hero-image">
          <div class="hero-image-container">
            <img :src="activeHomeAvatarUrl || fallbackAvatar" alt="Anime Character" />
          </div>
        </div>
      </div>
    </section>

    <!-- Content Cards Section -->
    <section class="content-cards">
      <div class="cards-container">
        <!-- Calificaciones Card -->
        <router-link to="/noticias" class="card-link content-card" aria-label="Ir a noticias">
          <div class="card-inner">
            <span class="card-kanji">ニュース</span>
            <h3 class="card-title">NOTICIAS</h3>
          </div>
        </router-link>

        <!-- Filtros Card -->
        <router-link to="/filtros" class="card-link content-card" aria-label="Ir a filtros">
          <div class="card-inner">
            <span class="card-kanji orange">フィルター</span>
            <h3 class="card-title">FILTROS</h3>
          </div>
        </router-link>


        <!-- Crear Avatar Card -->
        <router-link :to="isAuthenticated ? '/create-skin' : '/sign-in'" class="card-link content-card full-width">
          <div class="">
            <div class="card-inner">
              <span class="card-kanji">{{ isAuthenticated ? 'アバターを作成' : 'ログインして作成' }}</span>
              <h3 class="card-title">{{ isAuthenticated ? 'CREAR AVATAR' : 'INICIA SESIÓN PARA CREAR' }}</h3>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <section class="ratings-section">
      <div class="section-header">
        <h2 class="section-kanji">評価</h2>
        <p class="section-subtitle">CALIFICACIONES DE LA COMUNIDADES</p>
      </div>

      <div class="ratings-list">
        <article
          v-for="item in ratings"
          :key="`${item.title}-${item.detailType}-${item.detailId}`"
          class="rating-item"
          :class="{ 'is-clickable': !!item.detailType && !!item.detailId }"
          :tabindex="item.detailType && item.detailId ? 0 : -1"
          @click="goToRatingDetail(item)"
          @keydown.enter="goToRatingDetail(item)"
        >
          <div
            class="rating-cover"
            :style="{
              backgroundColor: item.color,
              backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none',
            }"
          ></div>
          <div class="rating-content">
            <h3 class="rating-title">{{ item.title }}</h3>
            <p class="rating-genres">{{ item.genres }}</p>
          </div>
          <div class="rating-score">
            <span class="stars">★★★★★</span>
            <span class="score-box">{{ item.score }}</span>
          </div>
        </article>
      </div>
    </section>


    <section class="comments-section">
      <div class="section-header">
        <h2 class="section-kanji">コメント</h2>
        <p class="section-subtitle">LO QUE DICE NUESTRA COMUNIDAD</p>
      </div>

      <div class="comments-list">
        <article v-for="item in comments" :key="item.id" class="comment-item">
          <div class="comment-avatar">{{ item.initials }}</div>
          <div class="comment-content">
            <h3 class="comment-name">{{ item.name }}</h3>
            <p class="comment-text">{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="home-footer-cta">
      <RouterLink to="/forum" class="community-link">IR A LA COMUNIDAD</RouterLink>
    </section>

  </main>
</template>

<style scoped>
.card-link{
  text-decoration: none;
}
.home {
  
  min-height: 100vh;
  background-image: 
    linear-gradient(rgba(246, 247, 247, 0.85), rgba(255, 255, 255, 0.85)),
    url('@/assets/images/image/lineas4.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
}

/* Hero Section */
.hero {
  background-color: var(--color-primary);
  box-shadow: 0 10px 7px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 35px,
    rgba(0, 0, 0, 0.1) 35px,
    rgba(0, 0, 0, 0.1) 38px
  );
  min-height: 500px;
  display: flex;
  align-items: center;
  padding: var(--spacing-xxl) var(--spacing-lg);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.hero.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
}

.hero-content {
  color: var(--color-white-snow);
}

.hero-kanji {
  font-size: 5rem;
  font-weight: var(--font-weight-black);
  line-height: 1;
  margin: 0 0 var(--spacing-md);
  color: var(--color-white-snow);
  text-shadow: 
    4px 0 0 var(--color-black-carbon),
    -4px 0 0 var(--color-black-carbon),
    0 4px 0 var(--color-black-carbon),
    0 -4px 0 var(--color-black-carbon);
  letter-spacing: 8px;
}

.hero-title-box {
  background-color: var(--color-white-snow);
  border: var(--border-thick);
  padding: var(--spacing-sm) var(--spacing-lg);
  display: inline-block;
  margin-bottom: var(--spacing-lg);
  box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: var(--font-weight-black);
  color: var(--color-black-carbon);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-description {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
  font-weight: var(--font-weight-bold);
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
  border: var(--border-thick);
  border-color: var(--color-white-snow);
  padding: 16px 40px;
  font-family: var(--font-heading);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 4px 4px 0 var(--color-white-snow);
  transition: all 0.15s ease-out;
  text-decoration: none;
}

.hero-button:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--color-white-snow);
}

.hero-button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--color-white-snow);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-container {
  background-color: #F5EFE0;
  border: var(--border-thick);
  box-shadow: var(--shadow-offset-lg);
  padding: 24px;
  max-width: 420px;
  width: 100%;
}

.hero-image-container img {
  width: 100%;
  height: auto;
  display: block;
  border: var(--border-thin);
}

/* Content Cards Section */
.content-cards {
  padding: 56px var(--spacing-lg) 24px;
  background-color: transparent;
}

.home-footer-cta {
  display: flex;
  justify-content: center;
  padding: 16px var(--spacing-lg) 56px;
}

.cards-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.content-card {
  background-color: var(--color-white-snow);
  border: var(--border-thick);
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-out;
}

.content-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--color-black-carbon);
  z-index: 10;
}

.content-card.full-width {
  grid-column: 1 / -1;
}

.card-inner {
  text-align: center;
  padding: var(--spacing-xl);
}

.card-kanji {
  display: block;
  font-size: 4rem;
  font-weight: var(--font-weight-black);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  line-height: 1;
}

.card-kanji.orange {
  color: #FF6B00;
}

.card-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-black);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: var(--color-black-carbon);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .hero-kanji {
    font-size: 4rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-image-container {
    max-width: 100%;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }

  .content-card.full-width {
    grid-column: 1;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: var(--spacing-lg);
  }

  .hero-kanji {
    font-size: 3rem;
  }

  .hero-title {
    font-size: 1.25rem;
  }

  .hero-description {
    font-size: var(--font-size-md);
  }

  .hero-button {
    width: 100%;
    padding: 14px 24px;
  }

  .card-kanji {
    font-size: 3rem;
  }

  .card-title {
    font-size: var(--font-size-md);
  }
}

.ratings-section,
.comments-section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 56px var(--spacing-lg) 24px;
  background: transparent; /* Fondo transparente para mostrar la imagen */
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-kanji {
  font-size: 5rem;
  margin: 0;
  color: var(--color-primary);
  letter-spacing: 4px;
  line-height: 1;
}

.section-subtitle {
  font-family: var(--font-heading);
  font-size: 1rem;
  letter-spacing: 6px;
  margin: 12px 0 0;
  color: var(--color-black-carbon);
  text-transform: uppercase;
  font-weight: var(--font-weight-black);
}

.community-link {
  display: inline-block;
  margin-top: var(--spacing-md);
  padding: 8px 14px;
  border: var(--border-thin);
  background: var(--color-white-snow);
  color: var(--color-black-carbon);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-decoration: none;
  box-shadow: var(--shadow-offset-sm);
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.community-link:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.ratings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.rating-item {
  background: var(--color-white-snow);
  border: var(--border-thick);
  box-shadow: var(--shadow-offset-sm);
  padding: 16px;
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  gap: 24px;
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.rating-item.is-clickable {
  cursor: pointer;
}

.rating-item:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.rating-cover {
  width: 60px;
  height: 60px;
  border: var(--border-thin);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.rating-title {
  font-family: var(--font-body);
  font-size: 1.1rem;
  margin: 0 0 4px;
  text-transform: none;
  font-weight: var(--font-weight-extra-bold);
}

.rating-genres {
  margin: 0;
  font-size: 0.9rem;
  letter-spacing: 1px;
  color: #333;
  font-weight: var(--font-weight-bold);
}

.rating-score {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stars {
  color: var(--color-primary);
  letter-spacing: 1px;
  font-size: 1rem;
  font-weight: var(--font-weight-bold);
}

.score-box {
  background: var(--color-primary);
  color: var(--color-white-snow);
  font-family: var(--font-heading);
  font-size: 1rem;
  padding: 8px 12px;
  line-height: 1;
}



.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.comment-item {
  border: var(--border-thick);
  box-shadow: var(--shadow-offset-sm);
  background: var(--color-white-snow);
  display: grid;
  grid-template-columns: 80px 1fr;
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.comment-item:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.comment-avatar {
  background: var(--color-primary);
  color: var(--color-white-snow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 1.25rem;
  min-height: 80px;
}

.comment-content {
  padding: 16px 20px;
}

.comment-name {
  margin: 0 0 6px;
  font-family: var(--font-body);
  text-transform: none;
  font-size: 1.15rem;
  font-weight: var(--font-weight-black);
}

.comment-text {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #000;
  font-weight: var(--font-weight-medium);
}



@media (max-width: 900px) {
  .rating-item {
    grid-template-columns: 48px 1fr;
    gap: 16px;
  }

  .rating-cover {
    width: 48px;
    height: 48px;
  }

  .rating-score {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }

  .comment-item {
    grid-template-columns: 60px 1fr;
  }

  .comment-avatar {
    font-size: 1rem;
    min-height: 60px;
  }
}
</style>
