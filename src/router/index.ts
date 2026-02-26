import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ForumView from "../views/ForumView.vue";
import TopicDetailView from "../views/TopicDetailView.vue";
import FilterView from "../views/FilterView.vue";
import TestAnimeConnection from '../views/TestAnimeConnection.vue'
import NewsView from '../views/NewsView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/noticias',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/noticias/:source/:parentId/:newsId',
      name: 'news-detail',
      component: NewsDetailView,
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumView,
    },
    {
      path: "/filtros",
      name: "filter",
      component: FilterView,
    },
    {
      path: "/forum/topic/:id",
      name: "topic-detail",
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
    },
    {
      path: '/description/:type/:id',
      name: 'description',
      component: () => import('../views/DescriptionView.vue'),
      props: true
    }
  ],
});

export default router;
