# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-003

## Título Conexión para detalle de anime

## Descripción

**Como** desarrollador frontend
**Quiero** implementar la conexión GET /anime/{anime_id}
**Para** obtener información detallada de un anime

## Criterios de Aceptación

### Escenario 1: Consulta por ID

```gherkin
Dado un id (mal_id) válido
Cuando se ejecuta GET /anime/{id}
Entonces debe retornarse el objeto detallado dentro de la propiedad 'data'
Y guardarse en el estado detail del store
```

### Escenario 2: Error por ID inválido

```gherkin
Dado un anime_id inexistente
Cuando la API responde con error
Entonces el store debe actualizar estado error
```

## Notas

* Endpoint: GET /anime/{anime_id}
* Estado separado: list vs detail.

## Estimación

S

## Prioridad

Alta

## Tareas

| Código        | Nombre                      | Responsable |
| ------------- | --------------------------- | ----------- |
| HU-API-003-01 | Crear acción fetchAnimeById | Frontend    |
| HU-API-003-02 | Definir tipado AnimeDetail  | Frontend    |

---