<script setup lang="ts">
/**
 * Individual card for anime or manga search results.
 */

interface Props {
    imageUrl: string;
    title: string;
    score: number | null;
    typeLabel: string;
    synopsis: string;
}

defineProps<Props>();

defineEmits<{
    (e: 'click'): void;
}>();
</script>

<template>
    <article class="result-card" @click="$emit('click')">
        <div class="result-image">
            <img :src="imageUrl" :alt="title" loading="lazy">
            <span class="result-score" v-if="score">★ {{ score }}</span>
        </div>
        <div class="result-info">
            <h4 class="result-title">{{ title }}</h4>
            <p class="result-type">{{ typeLabel }}</p>
            <p class="result-synopsis">{{ synopsis || 'Sin descripción disponible.' }}</p>
        </div>
    </article>
</template>

<style scoped>
.result-card {
    background: var(--color-white-snow);
    border: var(--border-thick);
    transition: all 0.2s ease-out;
    cursor: pointer;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.result-card:hover {
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.result-image {
    position: relative;
    aspect-ratio: 2/3;
    overflow: hidden;
    border-bottom: var(--border-thick);
}

.result-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.result-card:hover .result-image img {
    transform: scale(1.1);
}

.result-score {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--color-primary);
    color: white;
    padding: 4px 8px;
    font-size: 0.8rem;
    font-weight: bold;
    border: 2px solid var(--color-black-carbon);
    box-shadow: 2px 2px 0 var(--color-black-carbon);
}

.result-info {
    padding: var(--spacing-sm);
    flex: 1;
    display: flex;
    flex-direction: column;
}

.result-title {
    margin: 0;
    font-size: 0.9rem;
    font-weight: bold;
    color: var(--color-black-carbon);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    overflow: hidden;
    line-height: 1.2;
}

.result-type {
    margin: 4px 0 0;
    font-size: 0.7rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.result-synopsis {
    margin: 8px 0 0;
    font-size: 0.75rem;
    color: #444;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    overflow: hidden;
    line-height: 1.4;
    font-family: var(--font-body);
    flex-grow: 1;
}
</style>
