# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-005

## Título Conexión para búsqueda de mangas

## Descripción

**Como** desarrollador frontend
**Quiero** implementar la conexión GET /manga
**Para** obtener listados de mangas

## Criterios de Aceptación

### Escenario 1: Petición exitosa

```gherkin
Dado un término de búsqueda (q)
Cuando se ejecuta GET /manga
Entonces debe retornarse la lista dentro de la propiedad 'data'
Y almacenarse en mangaStore
```

### Escenario 2: Manejo de errores

```gherkin
Dado que ocurre un error HTTP
Cuando falla la petición
Entonces el estado error debe actualizarse
```

## Notas

* Endpoint: GET /manga
* Implementación paralela a animeStore.

## Estimación

M

## Prioridad

Alta

## Tareas

| Código        | Nombre                     | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-API-005-01 | Crear mangaStore           | Frontend    |
| HU-API-005-02 | Implementar fetchMangaList | Frontend    |

---
