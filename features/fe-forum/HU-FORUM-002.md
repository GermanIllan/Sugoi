# Historias de Usuario - Publicación en el Foro

---

# Historia de Usuario

## ID HU-FORUM-002

## Título Restricción de Autenticación y Autocompletado de Usuario en Publicaciones

## Descripción

**Como** usuario de la comunidad SUGOI
**Quiero** que el sistema gestione mi identidad automáticamente al publicar en el foro
**Para** asegurar que solo usuarios registrados participen y agilizar el proceso de creación de temas sin repetir mis datos

## Criterios de Aceptación

### Escenario 1: Usuario No Autenticado intenta publicar
```gherkin
Dado que un usuario visitante (no logueado) accede a la vista del Foro
Cuando intenta visualizar la opción para "Publicar un tema" o "Nuevo Tema"
Entonces el sistema debe ocultar o bloquear el botón de creación
Y debe mostrar un mensaje: "Debes iniciar sesión para publicar un tema"
Y el mensaje debe contener un enlace funcional a la página de inicio de sesión
```

### Escenario 2: Usuario Autenticado accede al formulario de publicación
```gherkin
Dado que un usuario logueado accede al formulario de creación de un nuevo tema
Cuando la vista carga
Entonces el sistema NO debe solicitar el nombre de usuario o autor manualmente
Y debe obtener automáticamente el username e ID de la sesión activa (authStore)
Y los datos de la sesión deben quedar vinculados de forma transparente al enviar el formulario
```

### Escenario 3: Diseño y Estética Neo-Brutalista
```gherkin
Dado que el usuario visualiza el mensaje de restricción o el formulario
Cuando interactúa con los elementos
Entonces el diseño debe seguir estrictamente el archivo design.md (bordes gruesos, sombras sólidas, tipografía impactante)
Y el enlace de inicio de sesión debe usar el color primario (#C7E14C o similar según design.md) con decoración de subrayado al pasar el ratón
```

## Notas

* El sistema debe utilizar el `authStore` para verificar el estado de `isAuthenticated`.
* El enlace de inicio de sesión debe redirigir a `/auth` o la ruta correspondiente definida en el router.
* No se debe permitir el envío de publicaciones (vía API) si el token o la sesión no son válidos (validación en frontend y sugerida para backend/json-server).
* Los datos del autor deben ser inyectados en el objeto de la publicación antes de realizar la petición POST al `json-server`.

## Estimación

M

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-FORUM-002-01 | Implementar renderizado condicional del botón basado en authStore | Frontend |
| HU-FORUM-002-02 | Crear banner/mensaje de restricción con enlace a login | Frontend |
| HU-FORUM-002-03 | Lógica de autocompletado de autor desde la sesión | Frontend |
| HU-FORUM-002-04 | Aplicar estilos Neo-Brutalistas al mensaje de aviso | Frontend |

---
