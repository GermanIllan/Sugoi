# Historia de Usuario - Seguimiento de Animes y Mangas (Tracking)

---

# Historia de Usuario

## ID HU-FIL-005

## Título Implementación de Sistema de Seguimiento (Tracking) y Optimización de la Vista de Detalle

## Descripción

**Como** usuario registrado de SUGOI
**Quiero** poder realizar un seguimiento de los animes y mangas que me interesan o que ya he visto, y visualizar la información detallada en un formato más amplio
**Para** gestionar mi catálogo personal de contenidos y disfrutar de una experiencia de lectura de información más cómoda y profesional.

## Criterios de Aceptación

### Escenario 1: Optimización del Layout en la Vista de Detalle
```gherkin
Dado que un usuario navega a la vista de detalle (DescriptionView.vue)
Cuando se cargue la información del anime o manga
Entonces el contenedor principal de la información debe abarcar un mayor ancho de página (max-width ampliado)
Y el diseño debe mantenerse fiel al estilo Neo-Brutalista (bordes gruesos, sombras sólidas).
```

### Escenario 2: Botón de Seguimiento y Contexto
```gherkin
Dado que un usuario está visualizando el detalle de un anime o manga
Cuando el usuario esté autenticado
Entonces debe visualizarse un botón con el texto "Hacer seguimiento" (o "En seguimiento" si ya existe)
Y debe mostrarse un texto explicativo: "Haz un seguimiento de este anime si ya lo has visto o si te interesa por ver y clasificalos".
```

### Escenario 3: Persistencia de Datos (Tracking)
```gherkin
Dado que un usuario autenticado hace clic en el botón de "Hacer seguimiento"
Cuando el anime o manga NO está en su lista de seguimiento
Entonces la información importante (ID, título, imagen, tipo, categoría) debe guardarse en el servidor local (json-server) en el endpoint `/tracking`
Y el botón debe actualizar su estado visual para indicar que ya está en seguimiento.
```

### Escenario 4: Eliminación de Seguimiento (Toggle)
```gherkin
Dado que un anime o manga ya se encuentra en la lista de seguimiento del usuario
Cuando el usuario haga clic nuevamente en el botón "En seguimiento"
Entonces el registro correspondiente debe eliminarse del endpoint `/tracking`
Y el botón debe volver a su estado inicial.
```

### Escenario 5: Control de Autenticación
```gherkin
Dado que un usuario NO ha iniciado sesión (Visitante/Guest)
Cuando intente interactuar con el botón de seguimiento
Entonces el botón debe estar deshabilitado o redirigir al inicio de sesión
Y se debe mostrar un mensaje indicando que es necesario estar logueado para usar esta función.
```

## Notas

*   **Diseño:** Seguir estrictamente las guías de `design.md` para el botón y el contenedor (estilo Neo-Brutalista Editorial Japonés).
*   **API:** Utilizar el cliente de Axios del proyecto para interactuar con el endpoint `/tracking` del JSON Server.
*   **Estado:** Manejar correctamente el estado de carga (`isLoading`) y errores durante la sincronización con el servidor.
*   **Reglas:** Adherirse a `rules.md` (TypeScript estricto, Vue 3 Composition API, CSS estructurado).
*   **Seguridad:** Asegurarse de que cada usuario solo pueda ver/gestionar su propio tracking (asociar `userId` al registro).

## Estimación

M

## Prioridad

Media-Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-FIL-005-01 | Ampliar el ancho del contenedor en `DescriptionView.vue` | Frontend |
| HU-FIL-005-02 | Implementar componente de botón de Seguimiento con Neo-Brutalismo | Frontend |
| HU-FIL-005-03 | Crear servicio/método para gestionar el endpoint `/tracking` | Backend/Service |
| HU-FIL-005-04 | Implementar lógica de toggle (Agregar/Quitar) con feedback visual | Frontend |
| HU-FIL-005-05 | Integrar validación de sesión para el uso de la funcionalidad | Frontend |
| HU-FIL-005-06 | Verificación estética y funcional | QA / Frontend |

---
