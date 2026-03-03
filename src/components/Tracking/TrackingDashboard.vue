<script setup lang="ts">
import type { TrackingRecord } from '@/types/tracking';

interface Stats {
    totalAnime: number;
    totalManga: number;
    watched: number;
    planToWatch: number;
    topRatedItems: TrackingRecord[];
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
        <div v-if="stats.topRatedItems.length > 0" class="top-rated-container">
            <div class="highlight-badge-global">MEJORES PUNTUADOS</div>
            <div class="top-rated-grid">
                <div v-for="item in stats.topRatedItems" :key="item.id" class="top-rated-card border-thick shadow-md">
                    <div class="top-rated-content">
                        <div class="top-rated-image border-thick">
                            <img :src="item.imageUrl" :alt="item.title">
                        </div>
                        <div class="top-rated-info">
                            <h3 class="top-rated-title">{{ item.title }}</h3>
                            <div class="personal-score">
                                <span class="score-label">TU NOTA</span>
                                <div class="score-value border-thin">
                                    {{ item.personalScore }} / 10
                                </div>
                            </div>
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

.top-rated-container {
    position: relative;
    margin-top: var(--spacing-xl);
}

.top-rated-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-md);
}

.top-rated-card {
    background: var(--color-white-snow);
    padding: var(--spacing-lg);
}

.top-rated-empty {
    background: var(--color-white-snow);
    padding: var(--spacing-xl);
    position: relative;
    display: flex;
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

.highlight-badge-global {
    position: absolute;
    top: -15px;
    left: var(--spacing-md);
    background: var(--color-black-carbon);
    color: white;
    padding: 4px 16px;
    font-weight: var(--font-weight-black);
    font-size: 0.8rem;
    letter-spacing: 2px;
    z-index: 2;
}

.top-rated-content {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
}

.top-rated-image {
    width: 60px;
    height: 90px;
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
    min-width: 0;
}

.top-rated-title {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: var(--font-weight-black);
    margin-bottom: var(--spacing-xs);
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.personal-score {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.score-label {
    font-size: 0.6rem;
    font-weight: bold;
    color: #666;
    letter-spacing: 1px;
}

.score-value {
    display: inline-block;
    padding: 4px 10px;
    background: var(--color-primary);
    color: white;
    font-weight: var(--font-weight-black);
    font-size: 0.9rem;
    width: fit-content;
}

@media (max-width: 768px) {
    .top-rated-content {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
