# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-006

## Título Conexión para detalle de manga

## Descripción

**Como** desarrollador frontend
**Quiero** implementar la conexión GET /manga/{manga_id}
**Para** obtener información detallada de un manga

## Criterios de Aceptación

### Escenario 1: Consulta exitosa

```gherkin
Dado un id (mal_id) válido
Cuando se ejecuta GET /manga/{id}
Entonces debe almacenarse el detalle (dentro de la propiedad 'data') en el store
```

### Escenario 2: Manejo de error

```gherkin
Dado un manga_id inválido
Cuando la API retorna error
Entonces debe actualizarse el estado error
```

## Notas

* Endpoint: GET /manga/{manga_id}

## Estimación

S

## Prioridad

Media

## Tareas

| Código        | Nombre                     | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-API-006-01 | Implementar fetchMangaById | Frontend    |
| HU-API-006-02 | Definir tipado MangaDetail | Frontend    |

---
