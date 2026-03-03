# Historias de Usuario - Filtros Web SUGOI

---

# Historia de Usuario

## ID HU-FIL-001

## Título Visualización de categorías (géneros) dinámicas para Anime y Manga

## Descripción

**Como** usuario de SUGOI
**Quiero** visualizar selectores con categorías (géneros) cargadas desde la API
**Para** poder filtrar el contenido según mis preferencias de forma dinámica

## Criterios de Aceptación

### Escenario 1: Carga de géneros de Anime
```gherkin
Dado que el usuario ha seleccionado la sección de Anime en la vista de filtros
Cuando el componente se inicializa
Entonces se debe llamar a la función animeService.getAnimeGenres()
Y el selector de categorías debe mostrar la lista de géneros obtenida de la API (mal_id y name)
```

### Escenario 2: Carga de géneros de Manga
```gherkin
Dado que el usuario ha seleccionado la sección de Manga en la vista de filtros
Cuando el componente se inicializa
Entonces se debe llamar a la función mangaService.getMangaGenres()
Y el selector de categorías debe mostrar la lista de géneros obtenida de la API (mal_id y name)
```

### Escenario 3: Estilo Neo-Brutalista Editorial Japonés
```gherkin
Dado que el componente muestra los selectores de categorías
Cuando se renderizan los elementos HTML
Entonces deben cumplir con el sistema de diseño:
  - Bordes negros gruesos (2px - 4px)
  - Sombras sólidas desplazadas (4px) sin desenfoque
  - Tipografía sans-serif pesada para etiquetas
  - Sin border-radius (esquinas rectas)
```

## Notas

* Se deben utilizar exclusivamente los servicios ya existentes en `src/services/animeService.ts` y `src/services/mangaService.ts`.
* No se debe implementar lógica de filtrado final en esta historia, solo la visualización y carga de los datos en el selector.
* El diseño debe ser responsivo.

## Estimación

M

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | ---------------------------------- | ----------- |
| HU-FIL-001-01 | Integrar carga de géneros en FilterView usando animeService | Frontend |
| HU-FIL-001-02 | Integrar carga de géneros en FilterView usando mangaService | Frontend |
| HU-FIL-001-03 | Aplicar estilos Neo-Brutalistas a los elementos select | Frontend |

---
