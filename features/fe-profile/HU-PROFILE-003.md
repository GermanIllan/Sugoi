# Historias de Usuario - Perfil de Usuario (Secciones Dinámicas)

---

# Historia de Usuario

## ID HU-PROFILE-003

## Título Implementación Dinámica de la Sección de Tracking en el Perfil

## Descripción

**Como** usuario autenticado de SUGOI
**Quiero** visualizar un resumen de mi actividad de seguimiento de anime y manga en mi perfil
**Para** tener una vista rápida de mis estadísticas y poder acceder fácilmente al panel completo de tracking

## Criterios de Aceptación

### Escenario 1: Visualización de Estadísticas en el Perfil
```gherkin
Dado que el usuario accede a su "Perfil"
Cuando la sección de Tracking carga
Entonces debe visualizar un resumen de sus estadísticas (ej. total de animes vistos, mangas completados, puntuación media)
Y la información debe provenir dinámicamente del `trackingStore`
```

### Escenario 2: Navegación al Panel de Tracking
```gherkin
Dado que el usuario está visualizando la sección de Tracking en su perfil
Cuando hace clic en el botón o enlace "VISUALIZAR MÁS" (o similar)
Entonces debe ser redirigido a la vista completa de Tracking (`/tracking`)
```

### Escenario 3: Estética Neo-Brutalista Premium
```gherkin
Dado que se muestra la información de tracking en el perfil
Cuando se renderiza el componente
Entonces debe utilizar el diseño definido en @design.md (bordes gruesos, sombras sólidas, tipografías destacadas)
Y no debe usar bordes redondeados, manteniendo la esencia visual del proyecto
```

## Notas

* Reutilizar la lógica de estadísticas definida en el `trackingStore`.
* El componente `ProfileTracking.vue` debe dejar de ser un placeholder dashed para ser una card sólida.
* Mantener la consistencia con el componente `TrackingDashboard` pero en una versión reducida.

## Estimación

S

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-PROFILE-003-01 | Refactorizar `ProfileTracking.vue` para recibir datos dinámicos | Frontend |
| HU-PROFILE-003-02 | Implementar visualización de estadísticas resumen | Frontend |
| HU-PROFILE-003-03 | Agregar enlace de redirección a la vista completa de Tracking | Frontend |

---
