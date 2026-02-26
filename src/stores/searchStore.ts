import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
    const selectedCategory = ref<string | null>(null);
    const searchQuery = ref<string>('');
    const selectedGenre = ref<string | number>('');
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(1);

    const orderBy = ref<string>('');
    const sort = ref<'desc' | 'asc'>('desc');

    const resetFilters = () => {
        selectedCategory.value = null;
        searchQuery.value = '';
        selectedGenre.value = '';
        currentPage.value = 1;
        totalPages.value = 1;
        orderBy.value = '';
        sort.value = 'desc';
    };

    return {
        selectedCategory,
        searchQuery,
        selectedGenre,
        currentPage,
        totalPages,
        orderBy,
        sort,
        resetFilters
    };
});
