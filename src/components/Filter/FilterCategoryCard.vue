<script setup lang="ts">
/**
 * Component representing a filter category (Anime/Manga).
 * Handles the selection and expansion logic.
 */
import paperCat from '@/assets/images/gif/papercat.gif';
import fishCat from '@/assets/images/gif/fishcat.gif';

interface Props {
    category: 'anime' | 'manga';
    isSelected: boolean;
    isClosing: boolean;
    kanji: string;
    title: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'select', category: 'anime' | 'manga'): void;
    (e: 'close'): void;
}>();

const handleCardClick = () => {
    if (!props.isSelected) {
        emit('select', props.category);
    }
};

const handleClose = (e: Event) => {
    e.stopPropagation();
    emit('close');
};
</script>

<template>
    <div 
        class="filter-card" 
        :class="[
            `card-${category}`, 
            { 'is-selected': isSelected }
        ]"
        v-if="!isClosing || isSelected"
        @click="handleCardClick"
    >
        <!-- Paper Cat walking on the top border -->
        <img 
            v-if="category === 'manga' && isSelected" 
            :src="paperCat" 
            class="paper-cat-walker" 
            alt="Paper Cat" 
            aria-hidden="true" 
        />

        <!-- Fish Cat for Anime category -->
        <img 
            v-if="category === 'anime' && isSelected" 
            :src="fishCat" 
            class="fish-cat-anime" 
            alt="Fish Cat" 
            aria-hidden="true" 
        />

        <!-- Close button (only visible when selected) -->
        <button 
            v-if="isSelected" 
            class="close-button" 
            @click="handleClose"
            aria-label="Cerrar"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <div class="card-inner">
            <span class="card-kanji">{{ kanji }}</span>
            <h3 class="card-title">{{ title }}</h3>
        </div>
        
        <transition name="fade">
            <div v-if="isSelected" class="filter-content" @click.stop>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.filter-card {
    flex: 1 1 calc(50% - var(--spacing-xl));
    min-width: 300px;
    background-color: var(--color-white-snow);
    border: var(--border-thick);
    padding: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-height: 350px;
    overflow: hidden;
}

.filter-card.is-selected {
    flex: 1 1 100%;
    min-height: calc(100vh - 200px);
    height: auto;
    cursor: default;
    justify-content: flex-start;
    padding-top: 100px;
    overflow: visible;
}

.filter-card:hover:not(.is-selected) {
    transform: translate(-6px, -6px);
    box-shadow: 12px 12px 0 var(--color-black-carbon);
}

.card-inner {
    text-align: center;
    transition: all 0.5s ease;
}

.filter-card.is-selected .card-inner {
    position: absolute;
    top: var(--spacing-lg);
    left: var(--spacing-lg);
    text-align: left;
    margin-bottom: 0;
    pointer-events: none;
}

.card-kanji {
    display: block;
    font-size: 5rem;
    font-weight: var(--font-weight-black);
    color: var(--color-primary);
    margin-bottom: var(--spacing-md);
    line-height: 1;
    transition: all 0.5s ease;
}

.filter-card.is-selected .card-kanji {
    font-size: 1.8rem;
    margin-bottom: 0;
}

.card-title {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: var(--font-weight-black);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 0;
    color: var(--color-black-carbon);
    transition: all 0.5s ease;
}

.filter-card.is-selected .card-title {
    font-size: 0.8rem;
    letter-spacing: 1px;
}

.close-button {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 44px;
    height: 44px;
    background: var(--color-white-snow);
    border: var(--border-thick);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 0;
}

.close-button:hover {
    background-color: var(--color-primary);
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.close-button svg {
    width: 20px;
    height: 20px;
    stroke: var(--color-black-carbon);
}

.close-button:hover svg {
    stroke: white;
}

.filter-content {
    width: 100%;
    max-width: 1700px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    animation: fadeIn 0.5s ease forwards;
}

/* Specific colors */
.card-manga .card-kanji {
    color: var(--color-primary);
}

.card-anime .card-kanji {
    color: #FF6B00;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .filter-card {
        min-height: 200px;
        padding: var(--spacing-lg);
        flex: 1 1 auto;
        width: 100%;
    }

    .filter-card.is-selected {
        min-height: 70vh;
        padding-top: 140px;
        padding-left: var(--spacing-md);
        padding-right: var(--spacing-md);
    }
    
    .card-kanji {
        font-size: 3.5rem;
    }

    .paper-cat-walker {
        width: 50px;
        top: -52px;
    }

    .fish-cat-anime {
        width: 80px;
        top: -65px;
    }
}

.paper-cat-walker {
    position: absolute;
    top: -80px; /* Adjusting height relative to the border */
    left: -100px;
    width: 100px;
    height: auto;
    z-index: 100;
    pointer-events: none;
    animation: walk-on-border 74s linear infinite;
}

.fish-cat-anime {
    position: absolute;
    top: -115px; /* Positioned at the level of the top border */
    right: 40px;
    width: 180px;
    rotate: -4deg;
    height: auto;
    z-index: 100;
    pointer-events: none;
}

@keyframes walk-on-border {
    /* Total 74s: L->R(20s) + Wait(17s) + R->L(20s) + Wait(17s) */
    
    /* 1. Walk Left to Right (across the screen) */
    0% { left: -40vw; transform: scaleX(1); }
    27% { left: 120vw; transform: scaleX(1); }
    
    /* 2. Wait at Right (Stay outside at 120vw) */
    27.1%, 49.9% { left: 120vw; transform: scaleX(-1); }
    
    /* 3. Walk Right to Left (mirrored) */
    50% { left: 120vw; transform: scaleX(-1); }
    77% { left: -40vw; transform: scaleX(-1); }
    
    /* 4. Wait at Left (Stay outside at -40vw) */
    77.1%, 100% { left: -40vw; transform: scaleX(1); }
}
</style>
