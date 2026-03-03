import { defineStore } from 'pinia'
import { ref } from 'vue'
import { animeService } from '@/services/animeService'
import { mangaService } from '@/services/mangaService'
import type { PromoItem } from '@/services/animeService'
import type { AnimeReviewItem } from '@/services/animeService'
import type { MangaReviewItem } from '@/services/mangaService'
import type { News } from '@/types/news'
import type { SavedNewsItem, SavedNewsStatus } from '@/types/news'
import type { Anime } from '@/types/anime'
import type { ApiError } from '@/services/axiosClient'

export type NewsSource = 'anime' | 'manga'
export type NewsTab = 'all' | 'anime' | 'manga' | 'most-commented'

export interface NewsCard extends News {
  source: NewsSource
  parentId: number
  coverImageUrl: string
}

export interface EditorialReviewCard {
  id: number
  source: NewsSource
  title: string
  excerpt: string
  score: number
  reactions: number
  date: string
  reviewer: string
  url: string
  imageUrl: string
}

interface LoadNewsDetailParams {
  source: NewsSource
  parentId: number
  newsId: number
}

export const useNewsStore = defineStore('news', () => {
  const SAVED_NEWS_STORAGE_PREFIX = 'sugoi_saved_news'

  const allAnimeNews = ref<NewsCard[]>([])
  const allMangaNews = ref<NewsCard[]>([])
  const selectedAnimeNews = ref<NewsCard | null>(null)
  const selectedMangaNews = ref<NewsCard | null>(null)
  const activeTab = ref<NewsTab>('all')

  const loading = ref<boolean>(false)
  const loadingMore = ref<boolean>(false)
  const error = ref<string | null>(null)
  const extrasError = ref<string | null>(null)
  const lastFetchedAt = ref<string | null>(null)
  const lastSyncStatus = ref<string>('')
  const seedLimit = ref<number>(8)

  const promos = ref<PromoItem[]>([])
  const popularPromos = ref<PromoItem[]>([])
  const scheduleItems = ref<Anime[]>([])
  const editorialReviews = ref<EditorialReviewCard[]>([])

  const detailLoading = ref<boolean>(false)
  const detailError = ref<string | null>(null)
  const detailSource = ref<NewsSource>('anime')
  const detailParentId = ref<number>(0)
  const detailNewsId = ref<number>(0)
  const detailSelectedNews = ref<NewsCard | null>(null)
  const detailRelatedNews = ref<NewsCard[]>([])
  const detailParentTitle = ref<string>('')
  const detailParentImage = ref<string>('')
  const detailParentSynopsis = ref<string>('')

  const savedNews = ref<SavedNewsItem[]>([])
  const savedNewsError = ref<string | null>(null)

  const getSavedNewsStorageKey = (userId: number): string => `${SAVED_NEWS_STORAGE_PREFIX}_${userId}`

  const buildNewsKey = (item: NewsCard): string => `${item.source}-${item.parentId}-${item.mal_id}`

  const persistSavedNews = (userId: number): void => {
    localStorage.setItem(getSavedNewsStorageKey(userId), JSON.stringify(savedNews.value))
  }

  const loadSavedNews = (userId: number): void => {
    savedNewsError.value = null
    try {
      const raw = localStorage.getItem(getSavedNewsStorageKey(userId))
      if (!raw) {
        savedNews.value = []
        return
      }

      const parsed = JSON.parse(raw) as SavedNewsItem[]
      savedNews.value = Array.isArray(parsed) ? parsed : []
    } catch (err: unknown) {
      console.error('Error loading saved news', err)
      savedNewsError.value = 'No fue posible cargar tus noticias guardadas.'
      savedNews.value = []
    }
  }

  const mapToSavedNewsItem = (item: NewsCard, userId: number, status: SavedNewsStatus = 'pending'): SavedNewsItem => ({
    userId,
    newsKey: buildNewsKey(item),
    source: item.source,
    parentId: item.parentId,
    mal_id: item.mal_id,
    title: item.title,
    date: item.date,
    author_name: item.author_name,
    excerpt: item.excerpt,
    coverImageUrl: item.coverImageUrl,
    url: item.url,
    status,
    savedAt: new Date().toISOString(),
  })

  const isNewsSaved = (item: NewsCard): boolean => {
    const newsKey = buildNewsKey(item)
    return savedNews.value.some((savedItem) => savedItem.newsKey === newsKey && savedItem.status === 'pending')
  }

  const isNewsSeen = (item: NewsCard): boolean => {
    const newsKey = buildNewsKey(item)
    return savedNews.value.some((savedItem) => savedItem.newsKey === newsKey && savedItem.status === 'seen')
  }

  const toggleSaveNews = (item: NewsCard, userId: number): void => {
    const newsKey = buildNewsKey(item)
    const index = savedNews.value.findIndex((savedItem) => savedItem.newsKey === newsKey)

    if (index >= 0) {
      const existing = savedNews.value[index]
      if (!existing) return

      if (existing.status === 'pending') {
        savedNews.value.splice(index, 1)
      } else {
        savedNews.value[index] = {
          ...existing,
          status: 'pending',
        }
      }

      persistSavedNews(userId)
      return
    }

    savedNews.value.unshift(mapToSavedNewsItem(item, userId, 'pending'))
    persistSavedNews(userId)
  }

  const setSavedNewsStatus = (item: NewsCard, userId: number, status: SavedNewsStatus): void => {
    const newsKey = buildNewsKey(item)
    const index = savedNews.value.findIndex((savedItem) => savedItem.newsKey === newsKey)

    if (index >= 0) {
      const existing = savedNews.value[index]
      if (!existing) return
      savedNews.value[index] = {
        ...existing,
        status,
      }
      persistSavedNews(userId)
      return
    }

    savedNews.value.unshift(mapToSavedNewsItem(item, userId, status))
    persistSavedNews(userId)
  }

  const setSavedNewsStatusByKey = (newsKey: string, status: SavedNewsStatus, userId: number): void => {
    const index = savedNews.value.findIndex((savedItem) => savedItem.newsKey === newsKey)
    if (index < 0) return

    const existing = savedNews.value[index]
    if (!existing) return
    savedNews.value[index] = {
      ...existing,
      status,
    }
    persistSavedNews(userId)
  }

  const removeSavedNewsByKey = (newsKey: string, userId: number): void => {
    savedNews.value = savedNews.value.filter((item) => item.newsKey !== newsKey)
    persistSavedNews(userId)
  }

  const mapNewsToCards = (
    items: News[],
    source: NewsSource,
    parentId: number,
    parentCoverUrl: string
  ): NewsCard[] =>
    items.map((item) => ({
      ...item,
      source,
      parentId,
      coverImageUrl: item.images.jpg.image_url || parentCoverUrl,
    }))

  const uniqueByUrl = (items: NewsCard[]): NewsCard[] => {
    const seen = new Set<string>()
    return items.filter((item) => {
      if (seen.has(item.url)) return false
      seen.add(item.url)
      return true
    })
  }

  const sortDescByDate = (items: NewsCard[]): NewsCard[] =>
    [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const buildSignature = (animeItems: NewsCard[], mangaItems: NewsCard[]): string =>
    `${animeItems.map((item) => item.url).join('|')}::${mangaItems.map((item) => item.url).join('|')}`

  const fetchTopSeedIds = async (limit: number): Promise<{
    animeIds: number[]
    mangaIds: number[]
    animeCoverById: Record<number, string>
    mangaCoverById: Record<number, string>
  }> => {
    const [animeRanking, mangaRanking] = await Promise.all([
      animeService.getAnimeRanking(1),
      mangaService.getMangaRanking(1),
    ])

    const animeTop = animeRanking.data.slice(0, limit)
    const mangaTop = mangaRanking.data.slice(0, limit)

    const animeCoverById = Object.fromEntries(
      animeTop.map((item) => [item.mal_id, item.images.jpg.large_image_url || item.images.jpg.image_url])
    )
    const mangaCoverById = Object.fromEntries(
      mangaTop.map((item) => [item.mal_id, item.images.jpg.large_image_url || item.images.jpg.image_url])
    )

    return {
      animeIds: animeTop.map((item) => item.mal_id),
      mangaIds: mangaTop.map((item) => item.mal_id),
      animeCoverById,
      mangaCoverById,
    }
  }

  const fetchNewsByIds = async (
    ids: number[],
    source: NewsSource,
    coverById: Record<number, string>
  ): Promise<NewsCard[]> => {
    const responses = await Promise.allSettled(
      ids.map((id) => (source === 'anime' ? animeService.getAnimeNews(id) : mangaService.getMangaNews(id)))
    )

    const collected: NewsCard[] = []

    responses.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const id = ids[index] ?? 0
        collected.push(...mapNewsToCards(result.value.data, source, id, coverById[id] || ''))
      }
    })

    return uniqueByUrl(sortDescByDate(collected))
  }

  const mapAnimeReviews = (items: AnimeReviewItem[]): EditorialReviewCard[] =>
    items.map((item) => ({
      id: item.mal_id,
      source: 'anime',
      title: item.entry.title,
      excerpt: item.review,
      score: item.score,
      reactions: item.reactions.overall,
      date: item.date,
      reviewer: item.user.username,
      url: item.url,
      imageUrl: item.entry.images.jpg.image_url,
    }))

  const mapMangaReviews = (items: MangaReviewItem[]): EditorialReviewCard[] =>
    items.map((item) => ({
      id: item.mal_id,
      source: 'manga',
      title: item.entry.title,
      excerpt: item.review,
      score: item.score,
      reactions: item.reactions.overall,
      date: item.date,
      reviewer: item.user.username,
      url: item.url,
      imageUrl: item.entry.images.jpg.image_url,
    }))

  const loadEditorialExtras = async (): Promise<void> => {
    extrasError.value = null

    const [promosResult, popularPromosResult, animeReviewsResult, mangaReviewsResult, scheduleResult] =
      await Promise.allSettled([
        animeService.getWatchPromos(),
        animeService.getPopularWatchPromos(),
        animeService.getAnimeReviews(1),
        mangaService.getMangaReviews(1),
        animeService.getSchedules(1),
      ])

    if (promosResult.status === 'fulfilled') {
      promos.value = promosResult.value.data.slice(0, 4)
    } else {
      promos.value = []
    }

    if (popularPromosResult.status === 'fulfilled') {
      popularPromos.value = popularPromosResult.value.data.slice(0, 4)
    } else {
      popularPromos.value = []
    }

    const animeReviews =
      animeReviewsResult.status === 'fulfilled' ? mapAnimeReviews(animeReviewsResult.value.data.slice(0, 4)) : []
    const mangaReviews =
      mangaReviewsResult.status === 'fulfilled' ? mapMangaReviews(mangaReviewsResult.value.data.slice(0, 4)) : []
    editorialReviews.value = [...animeReviews, ...mangaReviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6)

    if (scheduleResult.status === 'fulfilled') {
      scheduleItems.value = scheduleResult.value.data.slice(0, 6)
    } else {
      scheduleItems.value = []
    }

    if (
      promosResult.status === 'rejected' &&
      popularPromosResult.status === 'rejected' &&
      animeReviewsResult.status === 'rejected' &&
      mangaReviewsResult.status === 'rejected' &&
      scheduleResult.status === 'rejected'
    ) {
      extrasError.value = 'No fue posible cargar módulos editoriales adicionales.'
    }
  }

  const loadNewsFeed = async (): Promise<void> => {
    loading.value = true
    error.value = null
    seedLimit.value = 8
    const previousSignature = buildSignature(allAnimeNews.value, allMangaNews.value)

    try {
      const { animeIds, mangaIds, animeCoverById, mangaCoverById } = await fetchTopSeedIds(seedLimit.value)

      const [animeNews, mangaNews] = await Promise.all([
        fetchNewsByIds(animeIds, 'anime', animeCoverById),
        fetchNewsByIds(mangaIds, 'manga', mangaCoverById),
      ])
      const currentSignature = buildSignature(animeNews, mangaNews)

      allAnimeNews.value = animeNews
      allMangaNews.value = mangaNews
      selectedAnimeNews.value = animeNews[0] ?? null
      selectedMangaNews.value = mangaNews[0] ?? null
      lastFetchedAt.value = new Date().toISOString()
      lastSyncStatus.value =
        currentSignature === previousSignature
          ? 'Sin cambios desde la última sincronización'
          : 'Noticias sincronizadas correctamente'

      if (animeNews.length === 0 && mangaNews.length === 0) {
        error.value = 'No se encontraron noticias recientes en Jikan para este momento.'
      }
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.message || 'No fue posible cargar noticias de Jikan. Intenta nuevamente.'
      allAnimeNews.value = []
      allMangaNews.value = []
      selectedAnimeNews.value = null
      selectedMangaNews.value = null
      lastSyncStatus.value = ''
    } finally {
      loading.value = false
    }

    await loadEditorialExtras()
  }

  const loadMoreNewsFeed = async (): Promise<void> => {
    if (loading.value || loadingMore.value) return

    loadingMore.value = true
    error.value = null
    seedLimit.value += 4

    try {
      const { animeIds, mangaIds, animeCoverById, mangaCoverById } = await fetchTopSeedIds(seedLimit.value)

      const [animeNews, mangaNews] = await Promise.all([
        fetchNewsByIds(animeIds, 'anime', animeCoverById),
        fetchNewsByIds(mangaIds, 'manga', mangaCoverById),
      ])

      allAnimeNews.value = animeNews
      allMangaNews.value = mangaNews
      selectedAnimeNews.value = selectedAnimeNews.value || animeNews[0] || null
      selectedMangaNews.value = selectedMangaNews.value || mangaNews[0] || null
      lastFetchedAt.value = new Date().toISOString()
      lastSyncStatus.value = 'Noticias sincronizadas correctamente'
    } catch (err: unknown) {
      const apiError = err as ApiError
      error.value = apiError.message || 'No fue posible cargar más noticias en este momento.'
    } finally {
      loadingMore.value = false
    }
  }

  const selectAnimeNews = (item: NewsCard | null): void => {
    selectedAnimeNews.value = item
  }

  const selectMangaNews = (item: NewsCard | null): void => {
    selectedMangaNews.value = item
  }

  const setNewsTab = (tab: NewsTab): void => {
    activeTab.value = tab
  }

  const loadNewsDetail = async ({ source, parentId, newsId }: LoadNewsDetailParams): Promise<void> => {
    detailLoading.value = true
    detailError.value = null
    detailSource.value = source
    detailParentId.value = parentId
    detailNewsId.value = newsId

    try {
      if (source === 'anime') {
        const [parentResponse, newsResponse] = await Promise.all([
          animeService.getAnimeById(parentId),
          animeService.getAnimeNews(parentId),
        ])

        detailParentTitle.value = parentResponse.data.title
        detailParentImage.value =
          parentResponse.data.images.jpg.large_image_url || parentResponse.data.images.jpg.image_url
        detailParentSynopsis.value = parentResponse.data.synopsis || ''

        const mapped: NewsCard[] = newsResponse.data.map((item) => ({
          ...item,
          source,
          parentId,
          coverImageUrl: item.images.jpg.image_url || detailParentImage.value,
        }))

        detailSelectedNews.value = mapped.find((item) => item.mal_id === newsId) || mapped[0] || null
        detailRelatedNews.value = mapped
          .filter((item) => item.mal_id !== detailSelectedNews.value?.mal_id)
          .slice(0, 4)
      } else {
        const [parentResponse, newsResponse] = await Promise.all([
          mangaService.getMangaById(parentId),
          mangaService.getMangaNews(parentId),
        ])

        detailParentTitle.value = parentResponse.data.title
        detailParentImage.value =
          parentResponse.data.images.jpg.large_image_url || parentResponse.data.images.jpg.image_url
        detailParentSynopsis.value = parentResponse.data.synopsis || ''

        const mapped: NewsCard[] = newsResponse.data.map((item) => ({
          ...item,
          source,
          parentId,
          coverImageUrl: item.images.jpg.image_url || detailParentImage.value,
        }))

        detailSelectedNews.value = mapped.find((item) => item.mal_id === newsId) || mapped[0] || null
        detailRelatedNews.value = mapped
          .filter((item) => item.mal_id !== detailSelectedNews.value?.mal_id)
          .slice(0, 4)
      }

      if (!detailSelectedNews.value) {
        detailError.value = 'No se encontró la noticia solicitada.'
      }
    } catch (err: unknown) {
      const apiError = err as ApiError
      detailError.value = apiError.message || 'No se pudo cargar el detalle de la noticia desde Jikan.'
      detailSelectedNews.value = null
      detailRelatedNews.value = []
    } finally {
      detailLoading.value = false
    }
  }

  return {
    allAnimeNews,
    allMangaNews,
    selectedAnimeNews,
    selectedMangaNews,
    activeTab,
    loading,
    loadingMore,
    error,
    extrasError,
    lastFetchedAt,
    lastSyncStatus,
    promos,
    popularPromos,
    scheduleItems,
    editorialReviews,
    detailLoading,
    detailError,
    detailSource,
    detailParentId,
    detailNewsId,
    detailSelectedNews,
    detailRelatedNews,
    detailParentTitle,
    detailParentImage,
    detailParentSynopsis,
    savedNews,
    savedNewsError,
    loadSavedNews,
    buildNewsKey,
    isNewsSaved,
    isNewsSeen,
    toggleSaveNews,
    setSavedNewsStatus,
    setSavedNewsStatusByKey,
    removeSavedNewsByKey,
    loadNewsFeed,
    loadMoreNewsFeed,
    selectAnimeNews,
    selectMangaNews,
    setNewsTab,
    loadNewsDetail,
  }
})
