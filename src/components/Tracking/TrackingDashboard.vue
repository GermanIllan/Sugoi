<script setup lang="ts">
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
    <div class="tracking-dashboard">
        <!-- Stats Row -->
        <div class="stats-grid">
            <div class="stat-card border-thick shadow-sm">
                <span class="stat-kanji">アニメ</span>
                <span class="stat-label">TOTAL ANIME</span>
                <span class="stat-value">{{ stats.totalAnime }}</span>
            </div>
            <div class="stat-card border-thick shadow-sm">
                <span class="stat-kanji">漫画</span>
                <span class="stat-label">TOTAL MANGA</span>
                <span class="stat-value">{{ stats.totalManga }}</span>
            </div>
            <div class="stat-card border-thick shadow-sm watched">
                <span class="stat-kanji">完了</span>
                <span class="stat-label">VISTOS</span>
                <span class="stat-value">{{ stats.watched }}</span>
            </div>
            <div class="stat-card border-thick shadow-sm pending">
                <span class="stat-kanji">保留</span>
                <span class="stat-label">PENDIENTES</span>
                <span class="stat-value">{{ stats.planToWatch }}</span>
            </div>
        </div>

        <!-- Highlight Section -->
        <div v-if="stats.topRated" class="top-rated-section border-thick shadow-md">
            <div class="highlight-badge">MEJOR PUNTUADO</div>
            <div class="top-rated-content">
                <div class="top-rated-image border-thick">
                    <img :src="stats.topRated.imageUrl" :alt="stats.topRated.title">
                </div>
                <div class="top-rated-info">
                    <h3 class="top-rated-title">{{ stats.topRated.title }}</h3>
                    <div class="personal-score">
                        <span class="score-label">TU NOTA</span>
                        <div class="score-value border-thin">
                            {{ stats.topRated.personalScore }} / 10
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="top-rated-empty border-thick shadow-sm">
            <div class="empty-icon">★</div>
            <div class="empty-text">
                <h3>AÚN NO HAS PUNTUADO NINGUNA OBRA</h3>
                <p>Usa los selectores en tu lista para asignar notas a tus favoritos.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tracking-dashboard {
    margin-bottom: var(--spacing-xxl);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.stat-card {
    background: var(--color-white-snow);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.stat-kanji {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 4rem;
    font-weight: var(--font-weight-black);
    color: rgba(0, 0, 0, 0.05);
    z-index: 0;
    pointer-events: none;
}

.stat-label {
    font-family: var(--font-heading);
    font-size: 0.8rem;
    font-weight: var(--font-weight-black);
    letter-spacing: 2px;
    color: #666;
    z-index: 1;
}

.stat-value {
    font-size: 3rem;
    font-weight: var(--font-weight-black);
    color: var(--color-black-carbon);
    line-height: 1;
    margin-top: var(--spacing-xs);
    z-index: 1;
}

.stat-card.watched .stat-value {
    color: var(--color-primary);
}

.stat-card.pending .stat-value {
    color: var(--color-accent-blue);
}

.top-rated-section, .top-rated-empty {
    background: var(--color-white-snow);
    padding: var(--spacing-xl);
    position: relative;
    display: flex;
    flex-direction: column;
}

.top-rated-empty {
    border-style: dashed;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-xl);
    justify-content: center;
    color: #888;
}

.empty-icon {
    font-size: 3rem;
    color: #eee;
}

.empty-text h3 {
    font-size: 1.2rem;
    font-weight: var(--font-weight-black);
    color: #aaa;
}

.empty-text p {
    font-size: 0.9rem;
}

.highlight-badge {
    position: absolute;
    top: -15px;
    left: var(--spacing-xl);
    background: var(--color-black-carbon);
    color: white;
    padding: 4px 16px;
    font-weight: var(--font-weight-black);
    font-size: 0.8rem;
    letter-spacing: 2px;
}

.top-rated-content {
    display: flex;
    gap: var(--spacing-xl);
    align-items: center;
}

.top-rated-image {
    width: 100px;
    height: 140px;
    flex-shrink: 0;
    overflow: hidden;
}

.top-rated-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.top-rated-info {
    flex-grow: 1;
}

.top-rated-title {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: var(--font-weight-black);
    margin-bottom: var(--spacing-md);
    text-transform: uppercase;
}

.personal-score {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.score-label {
    font-size: 0.7rem;
    font-weight: bold;
    color: #666;
    letter-spacing: 1px;
}

.score-value {
    display: inline-block;
    padding: 8px 16px;
    background: var(--color-primary);
    color: white;
    font-weight: var(--font-weight-black);
    font-size: 1.2rem;
    width: fit-content;
}

@media (max-width: 768px) {
    .top-rated-content {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
