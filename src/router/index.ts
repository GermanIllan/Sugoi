import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
import TopicDetailView from '../views/TopicDetailView.vue'
import TestAnimeConnection from '../views/TestAnimeConnection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumView,
    },
    {
      path: '/forum/topic/:id',
      name: 'topic-detail',
      component: TopicDetailView,
    },
    {
      path: '/test-anime-connection',
      name: 'test-anime-connection',
      component: TestAnimeConnection,
    },
    {
      path: '/create-skin',
      name: 'create-skin',
      component: () => import('../views/SkinView.vue'),
    }
  ],
})

export default router
