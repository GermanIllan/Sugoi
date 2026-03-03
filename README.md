# すごい SUGOI!

> Plataforma web de comunidad anime y manga con estilo **Neo-Brutalismo Editorial Japonés**.

Aplicación frontend construida con Vue 3 + TypeScript que conecta con la API de [Jikan](https://jikan.moe/) (MyAnimeList) y un mock-server local (JSON Server). Permite explorar, filtrar, seguir anime/manga, leer noticias, participar en foros y generar avatares con IA.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Lenguaje | TypeScript estricto |
| Estado global | Pinia |
| Routing | Vue Router 5 |
| HTTP Client | Axios |
| Mock API | JSON Server |
| Build tool | Vite 7 |
| Testing | Vitest + Vue Test Utils + jsdom |
| Estilos | CSS puro (scoped + design tokens en `base.css`) |
| Iconos | Lucide Vue Next |
| Generación de imágenes | Pollinations AI |

---

## 📁 Estructura del Proyecto

```
SUGOI!/
├── features/              # Historias de usuario y documentación funcional
│   ├── design.md          # Sistema de diseño (Neo-Brutalismo Editorial)
│   ├── rules.md           # Reglas del proyecto
│   ├── fe-conectionApi/   # HU de conexión con API
│   ├── fe-filter/         # HU de filtros
│   ├── fe-forum/          # HU del foro
│   ├── fe-news/           # HU de noticias
│   ├── fe-tracking/       # HU de seguimiento
│   ├── fe-createSkin/     # HU de generación de avatares
│   ├── fe-profile/        # HU de perfil de usuario
│   ├── fe-sessionView/    # HU de autenticación
│   ├── fe-home/           # HU de página de inicio
│   └── fe-privacidad/     # HU de políticas legales
├── mock-api/
│   └── db.json            # Base de datos mock (JSON Server)
├── src/
│   ├── assets/            # CSS global, imágenes y GIFs
│   │   ├── base.css       # Design tokens y variables globales
│   │   └── images/        # Recursos visuales
│   ├── components/        # Componentes reutilizables
│   │   ├── Auth/          # LoginForm, RegisterForm
│   │   ├── Common/        # ConfirmModal, Programanding2Loader
│   │   ├── Filter/        # FilterCategoryCard, FilterControls, FilterResultCard, etc.
│   │   ├── Forum/         # CreateTopicForm, ReplyCard, ReplyForm, TopicCard
│   │   ├── Layout/        # NavBar, Footer
│   │   ├── Profile/       # ProfileForum, ProfileTracking
│   │   ├── Skin/          # SkinGenerator, SkinGallery, SkinGalleryItem, modales
│   │   └── Tracking/      # TrackingDashboard, TrackingFilters, TrackingGrid, TrackingItemCard
│   ├── composables/       # Lógica reactiva reutilizable
│   │   └── useScroll.ts   # Scroll-to-top automático
│   ├── router/            # Configuración de rutas con guards de autenticación
│   ├── services/          # Capa de acceso a datos (Axios)
│   │   ├── axiosClient.ts     # Cliente Axios para Jikan API
│   │   ├── localApiClient.ts  # Cliente Axios para JSON Server
│   │   ├── animeService.ts    # Endpoints de anime
│   │   ├── mangaService.ts    # Endpoints de manga
│   │   ├── authService.ts     # Autenticación local
│   │   ├── avatarService.ts   # CRUD de avatares
│   │   ├── trackingService.ts # CRUD de seguimiento
│   │   └── pollinationsService.ts # Generación de imágenes IA
│   ├── stores/            # Estado global (Pinia)
│   │   ├── animeStore.ts      # Búsqueda, ranking, géneros, noticias de anime
│   │   ├── mangaStore.ts      # Búsqueda, ranking, géneros, noticias de manga
│   │   ├── newsStore.ts       # Feed de noticias unificado
│   │   ├── authStore.ts       # Sesión de usuario
│   │   ├── trackingStore.ts   # Seguimiento personal
│   │   ├── skinStore.ts       # Generación y galería de avatares
│   │   ├── searchStore.ts     # Estado de filtros de búsqueda
│   │   └── forum.ts           # Estado del foro
│   ├── testing/           # Tests unitarios
│   │   ├── authStore.test.ts
│   │   ├── avatarStore.test.ts
│   │   ├── forumStore.test.ts
│   │   ├── skinStore.test.ts
│   │   ├── trackingStore.test.ts
│   │   └── DOCUMENTACION_TESTS.md
│   ├── types/             # Interfaces TypeScript
│   │   ├── anime.ts, manga.ts, genre.ts, news.ts
│   │   ├── tracking.ts, recommendation.ts, skin.ts, auth.ts
│   └── views/             # Páginas de la aplicación
│       ├── HomeView.vue           # Página principal con ranking y comentarios
│       ├── FilterView.vue         # Buscador y filtros de anime/manga
│       ├── DescriptionView.vue    # Detalle de anime/manga
│       ├── NewsView.vue           # Feed de noticias
│       ├── NewsDetailView.vue     # Detalle de noticia
│       ├── ForumView.vue          # Foro de la comunidad
│       ├── TopicDetailView.vue    # Detalle de hilo del foro
│       ├── TrackingView.vue       # Seguimiento personal del usuario
│       ├── SkinView.vue           # Generador de avatares con IA
│       ├── ProfileView.vue        # Perfil de usuario
│       ├── AuthView.vue           # Login / Registro
│       ├── PrivacyPolicyView.vue  # Política de privacidad
│       └── TermsOfServiceView.vue # Términos de servicio
├── .env.example           # Variables de entorno necesarias
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## ⚡ Inicio Rápido

### Requisitos previos

- **Node.js** `^20.19.0` o `>=22.12.0`
- **npm** (incluido con Node.js)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/GermanIllan/Sugoi.git
cd Sugoi

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores:
#   VITE_API_BASE_URL    → URL de la API de Jikan
#   VITE_API_SKIN_URL    → URL del servicio de generación de imágenes
#   VITE_CREATE_SKIN_KEY → API key para generación de avatares
```

### Desarrollo

```bash
# Inicia el cliente (Vite) + mock API (JSON Server en puerto 5174) simultáneamente
npm run dev
```

### Tests

```bash
npm run test
```

### Build de producción

```bash
npm run build
npm run preview
```

---

## 🌐 Rutas de la Aplicación

| Ruta | Vista | Acceso |
|------|-------|--------|
| `/` | Home | Público |
| `/filtros` | Buscador de anime/manga | Público |
| `/description/:type/:id` | Detalle de anime/manga | Público |
| `/noticias` | Feed de noticias | Público |
| `/noticias/:source/:parentId/:newsId` | Detalle de noticia | Público |
| `/forum` | Foro de la comunidad | Público |
| `/forum/topic/:id` | Hilo del foro | Público |
| `/sign-in` | Login | Solo invitados |
| `/sign-up` | Registro | Solo invitados |
| `/profile` | Perfil de usuario | Requiere auth |
| `/tracking` | Seguimiento personal | Requiere auth |
| `/create-skin` | Generador de avatares | Público (genera requiere auth) |
| `/privacidad` | Política de privacidad | Público |
| `/terminos` | Términos de servicio | Público |

---

## 🎨 Sistema de Diseño

El proyecto sigue el estilo **Neo-Brutalismo Editorial Japonés**, documentado en [`features/design.md`](features/design.md):

- Bordes negros gruesos (2px–4px), sin border-radius
- Sombras sólidas desplazadas (sin blur)
- Alto contraste: rojo vibrante, negro carbón, blanco
- Tipografía pesada en mayúsculas para titulares
- Caracteres japoneses (kanji) como elementos decorativos
- Animaciones cortas y rígidas (120ms–200ms)
- Responsive para dispositivos móviles

Los design tokens están en `src/assets/base.css`. Los estilos específicos de componente usan `<style scoped>`.

---

## 🔌 APIs Externas

| API | Uso | Base URL |
|-----|-----|----------|
| [Jikan v4](https://docs.api.jikan.moe/) | Datos de anime/manga (MyAnimeList) | `https://api.jikan.moe/v4` |
| [Pollinations AI](https://pollinations.ai/) | Generación de avatares anime | Configurada en `.env` |
| JSON Server (local) | Autenticación, tracking, foro, avatares | `http://localhost:5174` |

---

## 🧪 Testing

Tests unitarios para los stores principales con Vitest:

- `authStore.test.ts` — Autenticación y sesión
- `avatarStore.test.ts` — Gestión de avatares
- `forumStore.test.ts` — Operaciones del foro
- `skinStore.test.ts` — Generación de skins
- `trackingStore.test.ts` — Seguimiento de anime/manga

Documentación detallada en `src/testing/DOCUMENTACION_TESTS.md`.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Cliente + Mock API en paralelo |
| `npm run dev:client` | Solo Vite dev server |
| `npm run dev:api` | Solo JSON Server (puerto 5174) |
| `npm run build` | Build de producción con type-check |
| `npm run preview` | Preview del build |
| `npm run test` | Ejecutar tests con Vitest |
| `npm run type-check` | Verificación de tipos TypeScript |

---

## 👥 Equipo

Repositorio: [github.com/GermanIllan/Sugoi](https://github.com/GermanIllan/Sugoi)

---

## 📄 Licencia

ISC
