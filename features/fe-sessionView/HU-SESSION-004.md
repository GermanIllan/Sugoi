# Historias de Usuario - Gestión de Sesión (Auth)

---

# Historia de Usuario

## ID HU-SESSION-004

## Título Gestión de Galería: Eliminación de Avatares

## Descripción

**Como** usuario con múltiples avatares
**Quiero** poder eliminar imágenes de mi galería
**Para** liberar espacio (debido al límite de 8) o quitar diseños que ya no me gusten

## Criterios de Aceptación

### Escenario 1: Botón de Eliminación
```gherkin
Dado que el usuario visualiza su galería o el modal de detalles
Cuando hace clic en el botón de eliminar (ícono de papelera)
Entonces el sistema debe pedir una confirmación Neo-Brutalista
```

### Escenario 2: Confirmación y Borrado
```gherkin
Dado el diálogo de confirmación abierto
Cuando el usuario confirma la acción
Entonces la imagen debe desaparecer de la galería y del almacenamiento (localStorage/DB)
Y el espacio libre en el límite de 8 imágenes debe actualizarse inmediatamente
```

## Notas

* El modal de confirmación debe seguir el estilo Visual Excellence y Neo-Brutalismo.

## Estimación

S

## Prioridad

Media

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SESSION-004-01 | Añadir botón de borrar en SkinGalleryItem y Modal | Frontend |
| HU-SESSION-004-02 | Crear componente de confirmación modal | Frontend |
| HU-SESSION-004-03 | Implementar lógica de borrado en SkinStore | Frontend |

---
