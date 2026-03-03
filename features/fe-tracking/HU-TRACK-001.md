# Historias de Usuario - Seguimiento y Registro Personal (Tracking)

---

# Historia de Usuario

## ID HU-TRACK-001

## Título Dashboard y Registro Modular de Contenidos

## Descripción

**Como** usuario registrado de SUGOI
**Quiero** gestionar mis animes y mangas en una vista estructurada por componentes que mantenga la esencia de un cuaderno de registro
**Para** organizar mis contenidos vistos y pendientes de forma profesional, modular y visualmente impactante.

## Criterios de Aceptación

### Escenario 1: Estructura de Vista Basada en Componentes
```gherkin
Dado que un usuario accede a la vista /tracking
Cuando la página carga
Entonces la interfaz debe estar descompuesta en los siguientes componentes modulares:
  - TrackingDashboard: Panel principal con estadísticas rápidas.
  - TrackingFilters: Sistema de filtrado por categoría (Anime/Manga) y estado.
  - TrackingItemCard: Tarjeta individual con acceso a notas y puntuación.
  - TrackingGrid: Contenedor responsivo optimizado para el listado.
```

### Escenario 2: Esencia de Cuaderno vs Estética Visual
```gherkin
Dado el diseño de la vista de Tracking
Cuando el usuario interactúe con el Dashboard
Entonces no debe visualizarse un cuaderno físico (sin anillas ni texturas de papel antiguo)
Sino que debe sentirse como un "registro organizado" o "journal" mediante:
  - Uso de tipografía editorial y jerarquizada.
  - Elementos de UI que simulen entradas de registro (grid lines sutiles, sellos o etiquetas).
  - Un layout limpio pero con la fuerza del estilo Neo-Brutalista.
```

### Escenario 3: Organización y Categorización
```gherkin
Dado el listado de tracking
Cuando el usuario cambie el estado de un ítem
Entonces debe poder categorizarlo como: "Visto", "Por Ver" o "En Progreso"
Y los contadores del Dashboard (TrackingStats) deben actualizarse en tiempo real.
```

## Notas

* Seguir estrictamente el archivo `design.md` (Neo-Brutalismo Editorial Japonés).
* La "esencia de cuaderno" se logra mediante orden, claridad y pequeños acentos visuales (ej. numeración de ítems, micro-etiquetas).
* Utilizar TypeScript estricto para definir las interfaces de los componentes.

## Estimación

L

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-TRACK-001-01 | Crear la vista base y el sistema de ruteo para Tracking | Frontend |
| HU-TRACK-001-02 | Desarrollar el componente `TrackingDashboard` (Estadísticas) | Frontend |
| HU-TRACK-001-03 | Desarrollar `TrackingGrid` y `TrackingItemCard` modulares | Frontend |
| HU-TRACK-001-04 | Implementar `TrackingFilters` para gestión de estados | Frontend |

---

# Historia de Usuario

## ID HU-TRACK-002

## Título Anotaciones y Evaluación Personal (Ranking)

## Descripción

**Como** usuario registrado de SUGOI
**Quiero** puntuar mis contenidos y añadir notas de registro personal
**Para** tener un histórico detallado de mis sensaciones y preferencias sobre cada obra.

## Criterios de Aceptación

### Escenario 1: Sistema de Puntuación (Score)
```gherkin
Dado un ítem en el TrackingItemCard
Cuando el usuario interactúe con el control de puntuación
Entonces debe poder asignar una nota numérica
Y el sistema debe destacar automáticamente el anime/manga con la puntuación más alta del usuario.
```

### Escenario 2: Notas de Registro
```gherkin
Dado un ítem en el listado
Cuando el usuario abra la sección de notas
Entonces debe poder registrar comentarios sobre la obra
Y el diseño de esta sección debe evocar la sensación de una anotación manual rápida pero profesional.
```

### Escenario 3: Clasificación Inteligente
```gherkin
Dado el listado de tracking
Cuando el usuario aplique el orden de "Mejor Puntuados"
Entonces la lista debe reorganizarse basándose en el score personal guardado en el json-server.
```

## Notas

* La persistencia se realizará en el endpoint `/tracking` del JSON Server.
* Los componentes de notas y ranking deben ser reutilizables.
* Mantener el esquema de colores y bordes definidos en las reglas del proyecto.

## Estimación

M

## Prioridad

Media-Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-TRACK-002-01 | Implementar la lógica de puntuación en `TrackingItemCard` | Frontend |
| HU-TRACK-002-02 | Crear el sistema de notas con persistencia local | Frontend |
| HU-TRACK-002-03 | Desarrollar botones de ordenamiento dinámico | Frontend |

---
