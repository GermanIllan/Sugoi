<script setup lang="ts">
import pikachuGif from '@/assets/images/gif/pikachucat.gif';

defineProps<{
    show: boolean;
}>();
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="pikachu-overlay">
        <div class="pikachu-card border-thick shadow-lg">
            <div class="gif-container border-thin">
                <img :src="pikachuGif" alt="Adding..." class="pikachu-img" />
            </div>
            <div class="text-content">
                <p class="pikachu-text">¡AÑADIENDO A TU LISTA...!</p>
                <span class="kanji-text">リストに追加中</span>
            </div>
        </div>
    </div>
  </Transition>
</template>

<style scoped>
.pikachu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(4px);
}

.pikachu-card {
    background: var(--color-white-snow);
    padding: var(--spacing-xl);
    text-align: center;
    max-width: 320px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gif-container {
    background: white;
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.pikachu-img {
    width: 180px;
    height: auto;
}

.text-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.pikachu-text {
    font-family: var(--font-heading);
    font-weight: var(--font-weight-black);
    font-size: 1.3rem;
    color: var(--color-black-carbon);
    letter-spacing: -0.5px;
}

.kanji-text {
    font-size: 0.7rem;
    color: var(--color-primary);
    font-weight: var(--font-weight-black);
    letter-spacing: 3px;
    text-transform: uppercase;
}

@keyframes bounce-in {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
