# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-007

## Título Conexión para ranking de mangas (Top Manga)

## Descripción

**Como** desarrollador frontend
**Quiero** implementar la conexión GET /top/manga
**Para** obtener el ranking de los mejores mangas

## Criterios de Aceptación

### Escenario 1: Ranking exitoso

```gherkin
Dado que se solicita ranking de mangas
Cuando se ejecuta GET /top/manga
Entonces debe almacenarse la lista (dentro de la propiedad 'data') en rankingManga
```

### Escenario 2: Estado de carga

```gherkin
Dado que la petición está en proceso
Cuando se ejecuta la acción
Entonces loadingRankingManga debe ser true
```

## Notas

* Endpoint: GET /top/manga
* No se implementan vistas ni componentes.

## Estimación

S

## Prioridad

Media

## Tareas

| Código        | Nombre                        | Responsable |
| ------------- | ----------------------------- | ----------- |
| HU-API-007-01 | Implementar fetchMangaRanking | Frontend    |
| HU-API-007-02 | Definir estado                |             |
