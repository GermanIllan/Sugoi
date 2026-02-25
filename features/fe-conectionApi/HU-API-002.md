# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-002

## Título Conexión para búsqueda de animes

## Descripción

**Como** desarrollador frontend
**Quiero** implementar la conexión GET /anime
**Para** obtener listados paginados de animes

## Criterios de Aceptación

### Escenario 1: Petición exitosa

```gherkin
Dado un término de búsqueda (q) y parámetros opcionales
Cuando se ejecuta GET /anime usando axios
Entonces debe retornarse la estructura de datos contenida en la propiedad 'data'
Y debe almacenarse en el estado de Pinia
```

### Escenario 2: Paginación

```gherkin
Dado que la respuesta contiene el objeto 'pagination'
Cuando se invoque la acción de carga de siguiente página
Entonces debe consumirse el endpoint con el parámetro 'page' incrementado
Y concatenarse los nuevos resultados al estado existente
```

## Notas

* Endpoint: GET /anime
* Mapear respuesta a estructura tipada.
* Manejar estados loading y error en store.

## Estimación

M

## Prioridad

Alta

## Tareas

| Código        | Nombre                                    | Responsable |
| ------------- | ----------------------------------------- | ----------- |
| HU-API-002-01 | Crear acción fetchAnimeList en animeStore | Frontend    |
| HU-API-002-02 | Implementar manejo de paginación en store | Frontend    |

---