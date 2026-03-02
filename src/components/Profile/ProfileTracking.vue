<script setup lang="ts">
import { Activity, Trophy, TrendingUp } from 'lucide-vue-next';
import type { TrackingRecord } from '@/types/tracking';

interface Stats {
    totalAnime: number;
    totalManga: number;
    watched: number;
    planToWatch: number;
    topRated: TrackingRecord | null;
}

defineProps<{
    stats: Stats;
}>();
</script>

<template>
  <section class="profile-tracking-card border-thick shadow-md">
    <div class="card-header">
        <h3 class="section-title">
            <Activity :size="22" /> MI ACTIVIDAD DE SEGUIMIENTO
        </h3>
        <router-link to="/tracking" class="view-more-link">VER TODO EL REGISTRO →</router-link>
    </div>

    <!-- Stats Summary Grid -->
    <div class="stats-summary-grid">
        <div class="mini-stat border-thin">
            <span class="mini-label">ANIMES</span>
            <span class="mini-value text-primary">{{ stats.totalAnime }}</span>
        </div>
        <div class="mini-stat border-thin">
            <span class="mini-label">MANGAS</span>
            <span class="mini-value">{{ stats.totalManga }}</span>
        </div>
        <div class="mini-stat border-thin">
            <span class="mini-label">VISTOS</span>
            <span class="mini-value text-success">{{ stats.watched }}</span>
        </div>
        <div class="mini-stat border-thin">
            <span class="mini-label">PENDIENTES</span>
            <span class="mini-value text-blue">{{ stats.planToWatch }}</span>
        </div>
    </div>

    <!-- Top Highlight in Profile -->
    <div class="tracking-highlight-area">
        <div v-if="stats.topRated" class="profile-top-rated border-thick">
            <div class="highlight-tag border-thin shadow-xs">
                <Trophy :size="14" /> TU MEJOR PUNTUADO
            </div>
            <div class="highlight-content">
                <div class="highlight-image border-thin">
                    <img :src="stats.topRated.imageUrl" :alt="stats.topRated.title">
                </div>
                <div class="highlight-info">
                    <h4 class="highlight-title">{{ stats.topRated.title }}</h4>
                    <div class="highlight-score">
                        <span class="score-num">{{ stats.topRated.personalScore }}</span>
                        <span class="score-total">/ 10</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="empty-stats-msg border-thin">
            <TrendingUp :size="24" />
            <p>Comienza a puntuar tus obras para ver tus destacados aquí.</p>
        </div>
    </div>

    <router-link to="/tracking" class="btn-neo-full border-thick shadow-sm">
        ACCEDER A MI PANEL DE TRACKING COMPLETO
    </router-link>
  </section>
</template>

<style scoped>
.profile-tracking-card {
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

/* Mini Stats */
.stats-summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-sm);
}

.mini-stat {
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fdfdfd;
}

.mini-label {
    font-size: 0.6rem;
    font-weight: var(--font-weight-black);
    color: #888;
    letter-spacing: 1px;
}

.mini-value {
    font-size: 1.5rem;
    font-weight: var(--font-weight-black);
    line-height: 1;
    margin-top: 4px;
}

.text-primary { color: var(--color-primary); }
.text-success { color: #008f39; }
.text-blue { color: #0056b3; }

/* Highlight Area */
.tracking-highlight-area {
    margin: var(--spacing-sm) 0;
}

.profile-top-rated {
    position: relative;
    padding: var(--spacing-md);
    background: #f8f8f8;
}

.highlight-tag {
    position: absolute;
    top: -12px;
    left: var(--spacing-md);
    background: var(--color-black-carbon);
    color: white;
    padding: 2px 10px;
    font-size: 0.6rem;
    font-weight: var(--font-weight-black);
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 1px;
}

.highlight-content {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
}

.highlight-image {
    width: 60px;
    height: 85px;
    flex-shrink: 0;
    overflow: hidden;
}

.highlight-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.highlight-info {
    flex-grow: 1;
}

.highlight-title {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: var(--font-weight-black);
    margin-bottom: 4px;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.highlight-score {
    display: flex;
    align-items: baseline;
    gap: 2px;
}

.score-num {
    font-size: 1.4rem;
    font-weight: var(--font-weight-black);
    color: var(--color-primary);
}

.score-total {
    font-size: 0.7rem;
    font-weight: bold;
    color: #888;
}

.empty-stats-msg {
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    text-align: center;
    background: #fafafa;
    color: #aaa;
    border-style: dashed;
}

.empty-stats-msg p {
    font-size: 0.8rem;
    font-style: italic;
    margin: 0;
}

/* Button */
.btn-neo-full {
    width: 100%;
    background: var(--color-black-carbon);
    color: white;
    padding: 12px;
    text-align: center;
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: var(--font-weight-black);
    text-decoration: none;
    transition: all 0.2s ease;
    letter-spacing: 1px;
}

.btn-neo-full:hover {
    background: var(--color-primary);
    transform: translate(-3px, -3px);
    box-shadow: 6px 6px 0 rgba(0,0,0,0.2);
}

.btn-neo-full:active {
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
}

@media (max-width: 600px) {
    .stats-summary-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
