# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-008

## Título Conexión para noticias de anime y manga

## Descripción

**Como** desarrollador frontend
**Quiero** implementar las conexiones GET /anime/{id}/news y GET /manga/{id}/news
**Para** mostrar las últimas noticias relacionadas con un título específico

## Criterios de Aceptación

### Escenario 1: Obtener noticias de anime

```gherkin
Dado un id (mal_id) de anime válido
Cuando se ejecuta GET /anime/{id}/news
Entonces debe retornarse la lista de noticias dentro de la propiedad 'data'
Y almacenarse en el estado correspondiente del store
```

### Escenario 2: Obtener noticias de manga

```gherkin
Dado un id (mal_id) de manga válido
Cuando se ejecuta GET /manga/{id}/news
Entonces debe retornarse la lista de noticias dentro de la propiedad 'data'
Y almacenarse en el estado correspondiente del store
```

## Notas

* Endpoint Anime: GET /anime/{id}/news
* Endpoint Manga: GET /manga/{id}/news
* La respuesta sigue la estructura { data: News[] }

## Estimación

S

## Prioridad

Baja

## Tareas

| Código        | Nombre                           | Responsable |
| ------------- | -------------------------------- | ----------- |
| HU-API-008-01 | Implementar fetchAnimeNews en store | Frontend    |
| HU-API-008-02 | Implementar fetchMangaNews en store | Frontend    |

---
