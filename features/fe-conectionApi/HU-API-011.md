# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-011

## Título Conexión para catálogos de géneros (Anime y Manga)

## Descripción

**Como** desarrollador frontend
**Quiero** implementar las conexiones GET /genres/anime y GET /genres/manga
**Para** obtener los listados oficiales de géneros y permitir el filtrado de contenidos

## Criterios de Aceptación

### Escenario 1: Obtener géneros de anime

```gherkin
Dado que se solicita el catálogo de géneros para anime
Cuando se ejecuta GET /genres/anime
Entonces debe retornarse la lista de géneros dentro de la propiedad 'data'
Y almacenarse en el store para su uso en filtros
```

### Escenario 2: Obtener géneros de manga

```gherkin
Dado que se solicita el catálogo de géneros para manga
Cuando se ejecuta GET /genres/manga
Entonces debe retornarse la lista de géneros dentro de la propiedad 'data'
Y almacenarse en el store correspondiente
```

## Notas

* Endpoint Anime: GET /genres/anime
* Endpoint Manga: GET /genres/manga
* Estructura de respuesta: 
```json
{
  "data": [
    {
      "mal_id": 0,
      "name": "string",
      "url": "string",
      "count": 0
    }
  ]
}
```

## Estimación

S

## Prioridad

Media

## Tareas

| Código        | Nombre                             | Responsable |
| ------------- | ---------------------------------- | ----------- |
| HU-API-011-01 | Implementar fetchAnimeGenres       | Frontend    |
| HU-API-011-02 | Implementar fetchMangaGenres       | Frontend    |
| HU-API-011-03 | Definir interfaces para Genre      | Frontend    |

---
