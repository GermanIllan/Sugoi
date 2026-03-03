# HU-FIL-003: Refactorización de FilterView

## Objetivo
Optimizar la mantenibilidad y legibilidad del código mediante la refactorización de `FilterView.vue`. Actualmente, el archivo es demasiado extenso y contiene toda la lógica de filtros, visualización de resultados y paginación en un solo lugar. Se busca separar estas responsabilidades en componentes atómicos y reutilizables dentro de una nueva carpeta `src/components/Filters`.

## Criterios de Aceptación
1. **Extracción de Componentes**:
   - `FilterHeader.vue`: Título y estilo Kanji de la cabecera.
   - `CategorySelector.vue`: Las tarjetas de selección inicial (Anime/Manga) con su lógica de cierre y desplazamiento.
   - `FilterControls.vue`: Fila unificada de filtros (Buscador, Orden, Géneros y el botón +18).
   - `ResultsGrid.vue`: La cuadrícula de resultados con las tarjetas de anime/manga.
   - `ResultItem.vue`: El componente individual para mostrar la información del anime/manga.
   - `Pagination.vue`: El componente de navegación por páginas.
2. **Ubicación**: Todos los componentes nuevos deben residir en `src/components/Filters/`.
3. **Funcionalidad Intacta**: La refactorización no debe alterar el comportamiento actual de los filtros combinados, la visualización exclusiva +18 ni las animaciones de transición.
4. **Tipado**: Mantener el uso estricto de TypeScript en los nuevos componentes.

## Tareas
- [ ] Crear el directorio `src/components/Filters`.
- [ ] Identificar y extraer la lógica de estado compartida (props vs emits vs store).
- [ ] Implementar el componente `FilterControls` asegurando que mantenga la reactividad de los filtros combinados.
- [ ] Implementar `ResultsGrid` y `ResultItem` con el diseño Neo-Brutalist actual.
- [ ] Limpiar `FilterView.vue` para que actúe únicamente como orquestador de los nuevos componentes.
