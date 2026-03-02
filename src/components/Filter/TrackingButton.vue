<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    isTracked: boolean;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'toggle'): void;
}>();

const buttonClass = computed(() => {
    return {
        'is-tracked': props.isTracked,
        'is-loading': props.isLoading,
        'is-guest': !props.isAuthenticated
    };
});

const buttonText = computed(() => {
    if (props.isTracked) return 'EN SEGUIMIENTO ✓';
    return 'HACER SEGUIMIENTO';
});

const kanjiText = computed(() => {
    if (props.isTracked) return '追跡中';
    return '追跡する';
});
</script>

<template>
    <div class="tracking-container">
        <p class="tracking-description">
            Haz un seguimiento de este anime si ya lo has visto o si te interesa por ver y clasifícalos.
        </p>
        
        <div class="button-wrapper">
            <button 
                class="tracking-btn border-thick" 
                :class="buttonClass"
                :disabled="isLoading || !isAuthenticated"
                @click="emit('toggle')"
            >
                <span class="kanji">{{ kanjiText }}</span>
                <span class="text">{{ buttonText }}</span>
                <span class="hover-text" v-if="isTracked">QUITAR SEGUIMIENTO</span>
            </button>
            
            <p v-if="!isAuthenticated" class="auth-warning">
                Debes <router-link to="/sign-in">iniciar sesión</router-link> para usar esta función.
            </p>
        </div>
    </div>
</template>

<style scoped>
.tracking-container {
    margin: var(--spacing-xl) 0;
    padding: var(--spacing-md);
    background: rgba(255, 255, 255, 0.5);
    border: var(--border-thin);
    border-style: dashed;
}

.tracking-description {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-black-carbon);
    margin-bottom: var(--spacing-md);
    font-style: italic;
    opacity: 0.8;
}

.button-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.tracking-btn {
    position: relative;
    padding: var(--spacing-sm) var(--spacing-xl);
    background: var(--color-white-snow);
    color: var(--color-black-carbon);
    font-family: var(--font-heading);
    font-weight: var(--font-weight-black);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    min-width: 280px;
}

.tracking-btn .kanji {
    font-size: 1.2rem;
    line-height: 1;
    margin-bottom: 2px;
}

.tracking-btn .text {
    font-size: 0.9rem;
    letter-spacing: 1px;
}

.tracking-btn .hover-text {
    display: none;
    font-size: 0.9rem;
    letter-spacing: 1px;
}

/* Hover effect for normal state */
.tracking-btn:hover:not(:disabled):not(.is-tracked) {
    background: var(--color-primary);
    color: white;
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

/* Tracked state */
.tracking-btn.is-tracked {
    background: var(--color-primary);
    color: white;
}

.tracking-btn.is-tracked:hover:not(:disabled) {
    background: #ff4d4d; /* Darker red for removal */
    transform: translate(-4px, -4px);
    box-shadow: 6px 6px 0 var(--color-black-carbon);
}

.tracking-btn.is-tracked:hover .kanji,
.tracking-btn.is-tracked:hover .text {
    display: none;
}

.tracking-btn.is-tracked:hover .hover-text {
    display: block;
    margin: 10px 0;
}

/* Disabled/Guest state */
.tracking-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #e0e0e0;
}

.auth-warning {
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: bold;
}

.auth-warning a {
    text-decoration: underline;
    color: inherit;
}

/* Loading state animation */
.is-loading {
    animation: pulse 1s infinite alternate;
}

@keyframes pulse {
    from { opacity: 0.6; }
    to { opacity: 1; }
}
</style>
