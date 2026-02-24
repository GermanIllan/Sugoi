<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 100)
})

const ratings = [
  {
    title: 'Attack on Titan: Final Season',
    genres: 'ACCIÓN • DRAMA • FANTASÍA',
    score: '9.8',
    color: 'var(--color-accent-rosa)',
  },
  {
    title: 'Demon Slayer: Kimetsu no Yaiba',
    genres: 'ACCIÓN • SUPERNATURAL • HISTÓRICO',
    score: '9.5',
    color: '#D8E4F2',
  },
  {
    title: 'Jujutsu Kaisen',
    genres: 'ACCIÓN • SOBRENATURAL • MISTERIO',
    score: '9.2',
    color: '#EFEFEF',
  },
]



const comments = [
  {
    initials: 'TY',
    name: 'Takeshi Yamamoto',
    text: 'SUGOI es increíble. Encuentro todas las noticias de anime que necesito y la comunidad es muy activa.',
  },
  {
    initials: 'SN',
    name: 'Sakura Nakamura',
    text: 'La mejor web de anime en español. Las calificaciones son muy precisas y no puedo dejar de visitar.',
  },
  {
    initials: 'CO',
    name: 'Carlos Otaku',
    text: 'Los videojuegos recomendados siempre son los mejores. Gracias a SUGOI descubrí Persona 5.',
  },
]
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
          <button class="hero-button">EXPLORAR AHORA</button>
        </div>

        <!-- Right Image -->
        <div class="hero-image">
          <div class="hero-image-container">
            <img src="/unnamed.png" alt="Anime Character" />
          </div>
        </div>
      </div>
    </section>

    <!-- Content Cards Section -->
    <section class="content-cards">
      <div class="cards-container">
        <!-- Calificaciones Card -->
        <div class="content-card">
          <div class="card-inner">
            <span class="card-kanji">ニュース</span>
            <h3 class="card-title">NOTICIAS</h3>
          </div>
        </div>

        <!-- Videojuegos Card -->
        <div class="content-card">
          <div class="card-inner">
            <span class="card-kanji orange">フィルター</span>
            <h3 class="card-title">FILTROS</h3>
          </div>
        </div>

        <!-- Merchandising Card -->
        <div class="content-card full-width">
          <div class="card-inner">
            <span class="card-kanji">アバターを作成</span>
            <h3 class="card-title">CREAR AVATAR</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="ratings-section">
      <div class="section-header">
        <h2 class="section-kanji">評価</h2>
        <p class="section-subtitle">CALIFICACIONES DE LA COMUNIDAD</p>
      </div>

      <div class="ratings-list">
        <article v-for="item in ratings" :key="item.title" class="rating-item">
          <div class="rating-cover" :style="{ backgroundColor: item.color }"></div>
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
        <article v-for="item in comments" :key="item.name" class="comment-item">
          <div class="comment-avatar">{{ item.initials }}</div>
          <div class="comment-content">
            <h3 class="comment-name">{{ item.name }}</h3>
            <p class="comment-text">{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

  </main>
</template>

<style scoped>
h1 {
  color: rgb(139, 153, 182);
}
.home {
  
  min-height: 100vh;
  background-image: 
    linear-gradient(rgba(246, 247, 247, 0.85), rgba(255, 255, 255, 0.85)),
    url('/lineas4.jpg');
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
  cursor: pointer;
  box-shadow: 4px 4px 0 var(--color-white-snow);
  transition: all 0.15s ease-out;
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
  margin-bottom: 28px;
}

.section-kanji {
  font-size: 3rem;
  margin: 0;
  color: var(--color-primary);
  letter-spacing: 2px;
}

.section-subtitle {
  font-family: var(--font-heading);
  font-size: 0.56rem;
  letter-spacing: 3.2px;
  margin: 6px 0 0;
  color: #4f5560;
}

.ratings-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 760px;
  margin: 0 auto;
}

.rating-item {
  background: var(--color-white-snow);
  border: var(--border-thick);
  box-shadow: var(--shadow-offset-sm);
  padding: 8px;
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  gap: var(--spacing-md);
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.rating-item:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.rating-cover {
  width: 28px;
  height: 28px;
  border: var(--border-thin);
}

.rating-title {
  font-family: var(--font-body);
  font-size: 0.78rem;
  margin: 0;
  text-transform: none;
  font-weight: var(--font-weight-extra-bold);
}

.rating-genres {
  margin: 0;
  font-size: 0.48rem;
  letter-spacing: 1px;
  color: #666c77;
}

.rating-score {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stars {
  color: var(--color-primary);
  letter-spacing: 1px;
  font-size: 0.75rem;
  font-weight: var(--font-weight-bold);
}

.score-box {
  background: var(--color-primary);
  color: var(--color-white-snow);
  font-family: var(--font-heading);
  font-size: 0.62rem;
  padding: 4px 7px;
  line-height: 1;
}



.comments-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 720px;
  margin: 0 auto;
}

.comment-item {
  border: var(--border-thick);
  box-shadow: var(--shadow-offset-sm);
  background: var(--color-white-snow);
  display: grid;
  grid-template-columns: 34px 1fr;
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
  font-size: 0.72rem;
}

.comment-content {
  padding: 8px 9px;
}

.comment-name {
  margin: 0 0 3px;
  font-family: var(--font-body);
  text-transform: none;
  font-size: 0.72rem;
}

.comment-text {
  margin: 0;
  font-size: 0.62rem;
  line-height: 1.4;
  color: #444;
}



@media (max-width: 900px) {
  .merch-grid {
    grid-template-columns: 1fr;
  }

  .rating-item {
    grid-template-columns: 28px 1fr;
  }

  .rating-score {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}
</style>
