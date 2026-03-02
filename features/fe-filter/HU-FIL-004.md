# Historia de Usuario - Refactorización de la Vista de Filtros

---

# Historia de Usuario

## ID HU-FIL-004

## Título Refactorización, Modularización y Optimización de la Vista de Filtros

## Descripción

**Como** desarrollador de SUGOI
**Quiero** descomponer la vista actual de filtros en componentes modulares y optimizar su diseño visual
**Para** mejorar la mantenibilidad del código, la experiencia de usuario (UX) y asegurar un comportamiento profesional y responsivo.

## Criterios de Aceptación

### Escenario 1: Modularización de la Estructura
```gherkin
Dado que la vista "FilterView.vue" tiene una lógica y template extensos
Cuando se realice la refactorización
Entonces se deben crear componentes independientes para:
  - Tarjetas de Categoría (Anime/Manga)
  - Panel de Controles (Buscador, Orden, Géneros)
  - Rejilla de Resultados
  - Tarjeta de Resultado Individual
  - Paginación
```

### Escenario 2: Optimización del Layout y Contenedores
```gherkin
Dado que el contenedor de resultados actual tiene márgenes laterales amplios
Cuando se aplique el nuevo diseño
Entonces el ancho máximo del contenedor de la rejilla debe aumentarse (max-width)
Y el espacio lateral (padding/margin) debe reducirse para aprovechar mejor el espacio en pantallas grandes
```

### Escenario 3: Diseño Profesional y Responsividad
```gherkin
Dado que los elementos deben seguir el estilo Neo-Brutalista
Cuando se visualice en diferentes dispositivos (Mobile, Tablet, Desktop)
Entonces la rejilla de resultados debe adaptarse de forma fluida (grid auto-fill)
Y se deben mantener los bordes gruesos, sombras sólidas y alto contraste definidos en design.md
```

## Notas

*   **Alcance:** No agregar nuevas funcionalidades de búsqueda, solo refactorizar la estructura y diseño existente.
*   **Diseño:** Respetar estrictamente `design.md` (Neo-Brutalismo Editorial Japonés).
*   **Estilos:** Usar CSS puro con metodología BEM para los nuevos componentes.
*   **Tipado:** Utilizar TypeScript estricto para las props y eventos de los nuevos componentes.
*   **Rendimiento:** Asegurar que el paso de props y la emisión de eventos (props down, events up) sea eficiente entre la vista y los componentes.

## Estimación

L

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-FIL-004-01 | Identificar y extraer componentes lógicos de FilterView.vue | Frontend |
| HU-FIL-004-02 | Crear componentes de UI (FilterControls, FilterResults, etc.) | Frontend |
| HU-FIL-004-03 | Migrar lógica de búsqueda y estado a props/emits | Frontend |
| HU-FIL-004-04 | Ajustar ancho de contenedores y espaciado lateral | Frontend |
| HU-FIL-004-05 | Asegurar responsividad completa del conjunto modular | Frontend |
| HU-FIL-004-06 | Verificación final contra design.md y rules.md | Frontend |

---
