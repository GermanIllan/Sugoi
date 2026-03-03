import { watch, type Ref } from 'vue';

/**
 * Custom composable to scroll to top whenever a reactive source changes.
 * Useful for pagination or filter changes.
 */
export function useScrollToTopOnUpdate(source: Ref<any>) {
    watch(source, () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Helper to scroll to top manually with the project's default behavior
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
