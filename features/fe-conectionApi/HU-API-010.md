# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-010

## Título Conexión para próximas temporadas (Upcoming Seasons)

## Descripción

**Como** desarrollador frontend
**Quiero** implementar la conexión GET /seasons/upcoming
**Para** mostrar los animes que se estrenarán próximamente

## Criterios de Aceptación

### Escenario 1: Obtener animes por estrenar

```gherkin
Dado que se solicita la lista de animes "upcoming"
Cuando se ejecuta GET /seasons/upcoming
Entonces debe retornarse la lista paginada dentro de la propiedad 'data'
Y almacenarse en el store para su visualización
```

## Notas

* Endpoint: GET /seasons/upcoming
* Esencial para la sección de estrenos futuristas.

## Estimación

S

## Prioridad

Alta

## Tareas

| Código        | Nombre                          | Responsable |
| ------------- | ------------------------------- | ----------- |
| HU-API-010-01 | Implementar fetchUpcomingSeason | Frontend    |
| HU-API-010-02 | Definir estado upcoming en store | Frontend    |

---
