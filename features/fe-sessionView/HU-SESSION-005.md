# Historias de Usuario - Gestión de Sesión (Auth)

---

# Historia de Usuario

## ID HU-SESSION-005

## Título Restricción de Acceso a Generación de Avatar

## Descripción

**Como** administrador del sistema
**Quiero** que solo los usuarios autenticados puedan acceder a la funcionalidad de generación de avatares
**Para** asegurar que las creaciones queden vinculadas a una cuenta y evitar el uso anónimo de la API

## Criterios de Aceptación

### Escenario 1: Intento de acceso sin sesión (Ruta)
```gherkin
Dado que un usuario no ha iniciado sesión
Cuando intenta navegar a la ruta /create-skin
Entonces el sistema debe redirigirlo automáticamente a la vista de /auth (Login)
```

### Escenario 2: Bloqueo en la vista
```gherkin
Dado un usuario que se encuentra en la vista de generación
Cuando cierra sesión
Entonces el sistema debe impedirle continuar generando imágenes y redirigirlo o mostrar un mensaje de bloqueo descriptivo
```

### Escenario 3: Mensaje informativo en Home
```gherkin
Dado que el usuario está en la Home
Cuando no está logueado y ve la sección de "Crea tu Avatar"
Entonces el botón de acción debe indicar claramente "Inicia sesión para crear" o similar
```

## Notas

* Utilizar "Navigation Guards" de Vue Router para proteger la ruta.
* La lógica debe centralizarse en el `authStore` para verificar el estado de `isAuthenticated`.

## Estimación

S

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SESSION-005-01 | Implementar Navigation Guard en router/index.ts | Frontend |
| HU-SESSION-005-02 | Proteger el acceso a la vista SkinView.vue | Frontend |
| HU-SESSION-005-03 | Actualizar llamadas a generación para validar token/session | Frontend |

---
