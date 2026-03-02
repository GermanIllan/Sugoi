# Historias de Usuario - Gestión de Sesión (Auth)

---

# Historia de Usuario

## ID HU-SESSION-002

## Título Integración de Sesión en Navbar (Dropdown & Avatar)

## Descripción

**Como** usuario autenticado
**Quiero** ver mi estado de sesión en la barra de navegación
**Para** poder gestionar mi cuenta y cerrar sesión fácilmente

## Criterios de Aceptación

### Escenario 1: Usuario No Autenticado
```gherkin
Dado que el usuario no ha iniciado sesión
Cuando visualiza el Navbar
Entonces debe ver un icono de usuario genérico que al hacer clic redirija a la vista de Auth
```

### Escenario 2: Usuario Autenticado (Dropdown)
```gherkin
Dado que el usuario ha iniciado sesión
Cuando visualiza el Navbar
Entonces el icono debe poder mostrar un avatar del usuario
Y al hacer clic debe desplegar un menú dropdown con la opción de "Cerrar Sesión" (Sign Out)
```

### Escenario 3: Estilo del Dropdown
```gherkin
Dado que el menú desplegable está abierto
Cuando el usuario interactúa con él
Entonces debe tener bordes gruesos, sombra sólida y efectos de hover característicos del Neo-Brutalismo
```

## Notas

* El dropdown debe ser accesible y cerrarse al hacer clic fuera.
* Se debe usar Pinia para gestionar el estado de autenticación (AuthStore).

## Estimación

M

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SESSION-002-01 | Implementar AuthStore en Pinia | Frontend |
| HU-SESSION-002-02 | Crear componente de Dropdown en Navbar | Frontend |
| HU-SESSION-002-03 | Lógica de visualización condicional (Login/Avatar) | Frontend |
| HU-SESSION-002-04 | Implementar funcionalida de Logout | Frontend |

---
