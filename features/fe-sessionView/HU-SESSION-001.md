# Historias de Usuario - Gestión de Sesión (Auth)

---

# Historia de Usuario

## ID HU-SESSION-001

## Título Implementación de la Vista de Autenticación (Login & Register)

## Descripción

**Como** usuario de SUGOI
**Quiero** disponer de una vista dedicada para iniciar sesión y registrarme
**Para** poder acceder a funcionalidades personalizadas y guardar mi progreso

## Criterios de Aceptación

### Escenario 1: Alternancia entre Login y Registro
```gherkin
Dado que el usuario accede a la vista AuthView.vue
Cuando la página carga
Entonces debe visualizar un formulario que permita alternar entre "Iniciar Sesión" y "Registrarse" sin recargar la página
Y el diseño debe seguir el estilo Neo-Brutalista (bordes de 4px, sombras sólidas #000)
```

### Escenario 2: Validación de Campos
```gherkin
Dado que el usuario completa el formulario de registro
Cuando los campos no cumplen con los requisitos (ej: contraseña corta, email inválido)
Entonces el sistema debe mostrar mensajes de error con el componente de "badge" Neo-Brutalista
```

### Escenario 3: Estética de la Vista
```gherkin
Dado que el usuario está en la vista de autenticación
Cuando observa los elementos visuales
Entonces debe ver colores vibrantes, tipografía "Outfit" y "Kanji" decorativos, manteniendo la coherencia con el resto de la web
```

## Notas

* La vista se ubicará en `src/views/AuthView.vue`.
* Utilizar Vue 3 Composition API.
* Referencia de diseño en `features/design.md`.

## Estimación

L

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SESSION-001-01 | Crear estructura base de AuthView.vue | Frontend |
| HU-SESSION-001-02 | Implementar lógica de alternancia Login/Register | Frontend |
| HU-SESSION-001-03 | Aplicar estilos Neo-Brutalistas y responsivos | Frontend |
| HU-SESSION-001-04 | Implementar validaciones básicas de formulario | Frontend |

---
