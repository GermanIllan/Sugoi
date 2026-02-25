# Historias de Usuario - Generación de Avatar (Skin)

---

# Historia de Usuario

## ID HU-SKIN-004

## Título Refactorización de la Vista de Avatar (Modularización por Componentes)

## Descripción

**Como** desarrollador frontend
**Quiero** refactorizar la vista SkinView separando las funcionalidades en componentes modulares
**Para** mejorar la mantenibilidad, legibilidad y escalabilidad del código, respetando el estilo Neo-Brutalista y la responsividad

## Criterios de Aceptación

### Escenario 1: Creación de Componente de Generación
```gherkin
Dado un componente llamado SkinGenerator.vue
Cuando se integra en la vista principal SkinView.vue
Entonces debe contener la lógica del prompt, el contador de caracteres, el botón de generar y el contenedor de la imagen previa (incluyendo estados de carga y errores)
Y debe mantener el diseño de 2 columnas en desktop y 1 en mobile
```

### Escenario 2: Creación de Componente de Galería
```gherkin
Dado un componente llamado SkinGallery.vue
Cuando la lista de imágenes cargada desde el localStorage está vacía
Entonces el componente debe mostrar un mensaje amigable indicando que "No hay imágenes en tu galería"
Y si hay imágenes, debe renderizar el grid de la galería con scroll vertical
```

### Escenario 3: Modularización de Items de Galería
```gherkin
Dado un componente llamado SkinGalleryItem.vue
Cuando se itera la lista de imágenes en la galería
Entonces cada item debe ser una instancia de este componente, gestionando sus propios estilos Neo-Brutalistas, hover y botones de acción rápidos (Descarga/Home)
```

### Escenario 4: Creación de Componente de Modal de Detalles
```gherkin
Dado un componente llamado SkinDetailsModal.vue
Cuando el usuario selecciona una imagen de la galería
Entonces este componente debe encargarse de mostrar el prompt y las acciones ampliadas, recibiendo los datos mediante props
```

## Notas

* Seguir estrictamente las guías de `features/design.md`.
* Utilizar TypeScript estricto y Vue 3 Composition API (`<script setup lang="ts">`).
* Las comunicaciones con el store deben mantenerse centralizadas para evitar redundancia.
* Los estilos deben permanecer en bloques `scoped` dentro de cada componente o hacer uso de las variables globales de `base.css`.

## Estimación

M

## Prioridad

Media

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SKIN-004-01 | Extraer sección de creación a SkinGenerator.vue | Frontend |
| HU-SKIN-004-02 | Crear SkinGallery.vue con lógica de visualización (Empty State / Grid) | Frontend |
| HU-SKIN-004-03 | Componentizar SkinGalleryItem.vue | Frontend |
| HU-SKIN-004-04 | Componentizar SkinDetailsModal.vue | Frontend |
| HU-SKIN-004-05 | Integrar componentes en SkinView.vue y verificar responsividad | Frontend |

---
