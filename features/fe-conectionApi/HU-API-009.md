# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-009

## Título Conexión para recomendaciones de anime y manga

## Descripción

**Como** desarrollador frontend
**Quiero** implementar las conexiones GET /recommendations/anime y GET /recommendations/manga
**Para** obtener sugerencias de contenido para los usuarios

## Criterios de Aceptación

### Escenario 1: Recomendaciones de Anime

```gherkin
Dado que se solicitan recomendaciones globales de anime
Cuando se ejecuta GET /recommendations/anime
Entonces debe retornarse la lista de recomendaciones dentro de la propiedad 'data'
```

### Escenario 2: Recomendaciones de Manga

```gherkin
Dado que se solicitan recomendaciones globales de manga
Cuando se ejecuta GET /recommendations/manga
Entonces debe retornarse la lista de recomendaciones dentro de la propiedad 'data'
```

## Notas

* Endpoint Anime: GET /recommendations/anime
* Endpoint Manga: GET /recommendations/manga
* Útil para secciones de "Descubrimiento" en la Home.

## Estimación

S

## Prioridad

Media

## Tareas

| Código        | Nombre                                    | Responsable |
| ------------- | ----------------------------------------- | ----------- |
| HU-API-009-01 | Implementar fetchAnimeRecommendations      | Frontend    |
| HU-API-009-02 | Implementar fetchMangaRecommendations      | Frontend    |

---
