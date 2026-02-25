# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-004

## Título Conexión para ranking de animes (Top Anime)

## Descripción

**Como** desarrollador frontend
**Quiero** implementar la conexión GET /top/anime
**Para** obtener el listado de los animes mejor valorados

## Criterios de Aceptación

### Escenario 1: Ranking exitoso

```gherkin
Dado que se solicita el ranking de animes
Cuando se ejecuta GET /top/anime
Entonces debe retornarse la lista dentro de la propiedad 'data'
Y almacenarse en estado ranking del store
```

### Escenario 2: Estado de carga

```gherkin
Dado que la petición está en curso
Cuando se ejecuta la acción
Entonces el estado loadingRanking debe ser true
```

## Notas

* Endpoint: GET /top/anime
* Puede reutilizarse animeStore con módulo ranking o similar.

## Estimación

S

## Prioridad

Media

## Tareas

| Código        | Nombre                          | Responsable |
| ------------- | ------------------------------- | ----------- |
| HU-API-004-01 | Crear acción fetchAnimeRanking  | Frontend    |
| HU-API-004-02 | Definir estado ranking en store | Frontend    |

---
