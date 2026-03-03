<script setup lang="ts">
import { ref } from 'vue';
import type { TrackingRecord, WatchStatus } from '@/types/tracking';

const props = defineProps<{
    item: TrackingRecord;
}>();

const emit = defineEmits<{
    (e: 'update', id: number, data: Partial<TrackingRecord>): void;
    (e: 'remove', id: number): void;
}>();

const isEditingNotes = ref(false);
const isStatusDropdownOpen = ref(false);
const isScoreDropdownOpen = ref(false);
const localNotes = ref(props.item.notes);

const statusOptions = [
    { label: 'PLAN POR VER', value: 'plan_to_watch' },
    { label: 'VIENDO', value: 'watching' },
    { label: 'VISTO', value: 'watched' }
] as const;

const scoreOptions = Array.from({ length: 10 }, (_, i) => ({
    label: (10 - i).toString(),
    value: 10 - i
}));

const handleStatusChange = (status: WatchStatus) => {
    if (props.item.id) {
        emit('update', props.item.id, { watchStatus: status });
        isStatusDropdownOpen.value = false;
    }
};

const handleScoreChange = (score: number | null) => {
    if (props.item.id) {
        emit('update', props.item.id, { personalScore: score });
        isScoreDropdownOpen.value = false;
    }
};

const saveNotes = () => {
    if (props.item.id) {
        emit('update', props.item.id, { notes: localNotes.value });
        isEditingNotes.value = false;
    }
};
</script>

<template>
    <div 
        class="tracking-item-card border-thick shadow-sm" 
        :class="[item.watchStatus, { 'dropdown-open': isStatusDropdownOpen || isScoreDropdownOpen, 'is-watched': item.watchStatus === 'watched' }]"
    >
        <!-- Status Stamp (Japanese Style) -->
        <div v-if="item.watchStatus === 'watched'" class="status-stamp">
            <span class="kanji">完了</span>
            <span class="romaji">COMPLETADO</span>
        </div>

        <div class="card-badges">
            <span class="type-badge">{{ item.type }}</span>
            <span class="category-badge">{{ item.category.toUpperCase() }}</span>
        </div>

        <div class="card-main">
            <router-link :to="{ name: 'description', params: { type: item.category, id: item.malId } }" class="image-area border-thick">
                <img :src="item.imageUrl" :alt="item.title">
                <div class="mal-score" v-if="item.score">★ {{ item.score }}</div>
                <div class="view-overlay">VER DETALLE</div>
            </router-link>

            <div class="content-area">
                <div class="item-header">
                    <router-link :to="{ name: 'description', params: { type: item.category, id: item.malId } }" class="title-link">
                        <h3 class="item-title">{{ item.title }}</h3>
                    </router-link>
                </div>
                
                <div class="controls-grid">
                    <!-- Status Dropdown -->
                    <div class="control">
                        <label class="control-label">ESTADO</label>
                        <div class="neo-dropdown" :class="{ 'is-open': isStatusDropdownOpen }">
                            <button class="neo-dropdown-toggle border-thin" @click="isStatusDropdownOpen = !isStatusDropdownOpen">
                                {{ statusOptions.find(o => o.value === item.watchStatus)?.label || 'Estado' }}
                                <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m6 9 12 0-6 6z" fill="currentColor"/>
                                </svg>
                            </button>
                            <div v-if="isStatusDropdownOpen" class="neo-dropdown-menu border-thin">
                                <div 
                                    v-for="opt in statusOptions" 
                                    :key="opt.value" 
                                    class="dropdown-item"
                                    :class="{ active: item.watchStatus === opt.value }"
                                    @click="handleStatusChange(opt.value)"
                                >
                                    {{ opt.label }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Score Dropdown -->
                    <div class="control score-control">
                        <label class="control-label">TU NOTA</label>
                        <div class="neo-dropdown" :class="{ 'is-open': isScoreDropdownOpen }">
                            <button class="neo-dropdown-toggle border-thin" @click="isScoreDropdownOpen = !isScoreDropdownOpen">
                                {{ item.personalScore || '-' }}
                                <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m6 9 12 0-6 6z" fill="currentColor"/>
                                </svg>
                            </button>
                            <div v-if="isScoreDropdownOpen" class="neo-dropdown-menu border-thin">
                                <div class="dropdown-item" @click="handleScoreChange(null)">-</div>
                                <div 
                                    v-for="opt in scoreOptions" 
                                    :key="opt.value" 
                                    class="dropdown-item"
                                    :class="{ active: item.personalScore === opt.value }"
                                    @click="handleScoreChange(opt.value)"
                                >
                                    {{ opt.label }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="notes-area">
                    <div v-if="!isEditingNotes" class="notes-display" @click="isEditingNotes = true">
                        <p v-if="item.notes" class="notes-text">"{{ item.notes }}"</p>
                        <p v-else class="notes-placeholder">+ ESCRIBIR NOTA / IMPRESIÓN...</p>
                    </div>
                    <div v-else class="notes-edit">
                        <textarea v-model="localNotes" placeholder="Escribe tus impresiones..." class="border-thin"></textarea>
                        <div class="edit-actions">
                            <button @click="saveNotes" class="btn-neo btn-save">GUARDAR</button>
                            <button @click="isEditingNotes = false" class="btn-neo btn-cancel">CANCELAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="remove-btn" @click="item.id && emit('remove', item.id)" title="Quitar de seguimiento">
            ×
        </button>
    </div>
</template>

<style scoped>
.tracking-item-card {
    background: white;
    padding: var(--spacing-lg);
    position: relative;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    overflow: visible; /* Important for dropdowns */
}

.tracking-item-card:hover {
    transform: translate(-6px, -6px);
    box-shadow: 10px 10px 0 var(--color-black-carbon);
}

.tracking-item-card.dropdown-open {
    z-index: 100 !important;
}

/* Status Stamp */
.status-stamp {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 65px;
    height: 65px;
    background: var(--color-primary);
    border: 3px solid var(--color-black-carbon);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 20;
    transform: rotate(15deg);
    box-shadow: 3px 3px 0 var(--color-black-carbon);
    pointer-events: none;
    animation: stampIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.status-stamp .kanji {
    font-size: 1.2rem;
    font-weight: var(--font-weight-black);
    line-height: 1;
}

.status-stamp .romaji {
    font-size: 0.45rem;
    font-weight: var(--font-weight-black);
    letter-spacing: 0.5px;
}

@keyframes stampIn {
    from { transform: scale(3) rotate(45deg); opacity: 0; }
    to { transform: scale(1) rotate(15deg); opacity: 1; }
}

.card-badges {
    position: absolute;
    top: -12px;
    left: var(--spacing-md);
    display: flex;
    gap: 4px;
    z-index: 10;
}

.type-badge, .category-badge {
    padding: 3px 10px;
    font-size: 0.65rem;
    font-weight: var(--font-weight-black);
    color: white;
    background: var(--color-black-carbon);
    letter-spacing: 1px;
}

.category-badge {
    background: var(--color-primary);
}

.card-main {
    display: flex;
    gap: var(--spacing-lg);
}

.image-area {
    width: 100px;
    height: 145px;
    flex-shrink: 0;
    position: relative;
    border: var(--border-thick);
    cursor: pointer;
    overflow: hidden;
    display: block;
    background: #eee;
}

.image-area img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.image-area:hover img {
    transform: scale(1.15);
}

.view-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: var(--font-weight-black);
    opacity: 0;
    transition: opacity 0.3s ease;
    letter-spacing: 1px;
}

.image-area:hover .view-overlay {
    opacity: 1;
}

.mal-score {
    position: absolute;
    bottom: -8px;
    right: -8px;
    background: var(--color-accent-gris-azulado);
    color: var(--color-black-carbon);
    padding: 2px 8px;
    font-size: 0.75rem;
    font-weight: var(--font-weight-black);
    border: var(--border-thick);
    z-index: 5;
}

.content-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.title-link {
    text-decoration: none;
    color: inherit;
    display: block;
    margin-bottom: var(--spacing-sm);
}

.item-title {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: var(--font-weight-black);
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.5px;
    transition: color 0.2s ease;
}

.title-link:hover .item-title {
    color: var(--color-primary);
}

.controls-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}

.score-control {
    min-width: 80px;
}

.control {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.control-label {
    font-size: 0.65rem;
    font-weight: var(--font-weight-black);
    color: #888;
    letter-spacing: 1px;
    text-transform: uppercase;
}

/* Custom Dropdown Styles */
.neo-dropdown {
    position: relative;
}

.neo-dropdown-toggle {
    width: 100%;
    padding: 6px 12px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-heading);
    font-size: 0.8rem;
    font-weight: var(--font-weight-black);
    cursor: pointer;
    text-align: left;
    height: 36px;
    transition: all 0.2s ease;
}

.neo-dropdown-toggle:hover {
    background: #f8f8f8;
    border-color: var(--color-primary);
}

.dropdown-arrow {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.neo-dropdown.is-open .dropdown-arrow {
    transform: rotate(180deg);
}

.neo-dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background: white;
    z-index: 200;
    max-height: 250px;
    overflow-y: auto;
    box-shadow: 6px 6px 0 var(--color-black-carbon);
    animation: menuSlide 0.2s ease-out;
}

@keyframes menuSlide {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
    padding: 8px 12px;
    font-size: 0.75rem;
    font-family: var(--font-heading);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    border-bottom: 1px solid #eee;
    transition: all 0.2s ease;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover, .dropdown-item.active {
    background: var(--color-primary);
    color: white;
}

.notes-area {
    margin-top: auto;
}

.notes-display {
    cursor: pointer;
    font-style: italic;
    background: #fafafa;
    padding: 10px;
    border: 2px dashed #ddd;
    min-height: 45px;
    transition: all 0.2s ease;
}

.notes-display:hover {
    border-color: var(--color-primary);
    background: white;
}

.notes-text {
    font-size: 0.85rem;
    color: #333;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.notes-placeholder {
    font-size: 0.7rem;
    font-weight: var(--font-weight-bold);
    color: #bbb;
    letter-spacing: 1px;
}

.notes-edit textarea {
    width: 100%;
    height: 80px;
    padding: var(--spacing-sm);
    font-size: 0.85rem;
    resize: none;
    font-family: var(--font-body);
    outline: none;
    background: white;
}

.edit-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: 10px;
}

/* Neo-Brutalist Buttons */
.btn-neo {
    padding: 8px 16px;
    font-family: var(--font-heading);
    font-size: 0.75rem;
    font-weight: var(--font-weight-black);
    cursor: pointer;
    text-transform: uppercase;
    border: var(--border-thick);
    transition: all 0.2s ease;
    position: relative;
    letter-spacing: 1.5px;
}

.btn-save {
    background: var(--color-primary);
    color: white;
    box-shadow: 4px 4px 0 var(--color-black-carbon);
}

.btn-save:hover {
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.btn-save:active {
    transform: translate(1px, 1px);
    box-shadow: 2px 2px 0 var(--color-black-carbon);
}

.btn-cancel {
    background: white;
    color: var(--color-black-carbon);
    box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
}

.btn-cancel:hover {
    background: #f0f0f0;
    transform: translate(-3px, -3px);
    box-shadow: 7px 7px 0 var(--color-black-carbon);
}

.remove-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    background: none;
    border: none;
    color: rgba(0,0,0,0.15);
    font-size: 1.8rem;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s ease;
}

.remove-btn:hover {
    color: var(--color-primary);
}

/* Status specific accents */
.tracking-item-card.watched {
    border-left: 10px solid var(--color-primary);
}
.tracking-item-card.watching {
    border-left: 10px solid var(--color-accent-blue);
}
.tracking-item-card.plan_to_watch {
    border-left: 10px solid #eee;
}
</style>
