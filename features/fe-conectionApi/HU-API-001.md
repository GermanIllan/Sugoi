# Historias de Usuario Técnicas - Conexiones API Vue 3 + Pinia + Axios

---

# Historia de Usuario

## ID HU-API-001

## Título Configuración base de cliente Axios para Jikan API (v4)

## Descripción

**Como** desarrollador frontend
**Quiero** configurar una instancia centralizada de Axios
**Para** gestionar de forma estandarizada las conexiones hacia la API de Jikan

## Criterios de Aceptación

### Escenario 1: Creación de instancia Axios

```gherkin
Dado que el proyecto utiliza Vue 3 con Pinia
Cuando se configura el cliente HTTP
Entonces debe existir una instancia Axios con baseURL https://api.jikan.moe/v4
Y debe exportarse para reutilización en servicios
```

### Escenario 2: Manejo global de errores

```gherkin
Dado que ocurre un error HTTP
Cuando la API responde con código >= 400
Entonces el interceptor debe capturar el error
Y debe propagar una excepción controlada
```

## Notas

* No se crean componentes ni vistas.
* La configuración debe incluir interceptores request/response.
* El cliente será reutilizado por los stores de Pinia.

## Estimación

S

## Prioridad

Alta

## Tareas

| Código        | Nombre                             | Responsable |
| ------------- | ---------------------------------- | ----------- |
| HU-API-001-01 | Crear instancia axiosClient.ts     | Frontend    |
| HU-API-001-02 | Implementar interceptores globales | Frontend    |

---
