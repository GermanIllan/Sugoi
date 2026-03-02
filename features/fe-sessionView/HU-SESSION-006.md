# HU-SESSION-006: Ampliación de Opciones de Sesión y Avatar Dinámico

## Descripción
**Como** usuario autenticado de SUGOI!,  
**Quiero** tener acceso rápido a mi perfil y al tracking de mis actividades desde el menú de sesión,  
**Y** ver mi avatar seleccionado actualmente en la barra de navegación,  
**Para** tener una experiencia de usuario más personalizada, inmersiva y eficiente.

---

## Criterios de Aceptación

### 1. Nuevas Opciones en el Menú de Sesión
- [ ] El menú desplegable (dropdown) que aparece al hacer clic en el nombre del usuario debe incluir dos nuevas opciones: **Perfil** y **Tracking**.
- [ ] Cada opción debe tener un icono representativo (estilo Lucide) acorde a la estética Neo-Brutalista.
- [ ] Al hacer clic en estas opciones, se debe redirigir al usuario a las rutas correspondientes (`/profile` y `/tracking`).
- [ ] Estas opciones deben aparecer antes de la opción "Cerrar Sesión".

### 2. Avatar Dinámico en el Navbar
- [ ] La burbuja del usuario en el Navbar debe mostrar la imagen marcada como `activeHomeAvatarUrl` en el `skinStore`.
- [ ] Si el campo `activeHomeAvatarUrl` es `null` o está vacío, el sistema debe mostrar la **inicial** del nombre de usuario (comportamiento actual) con el fondo de color generado.
- [ ] La imagen del avatar en el Navbar debe tener un borde grueso y sombra Neo-Brutalista suave para destacar del fondo.
- [ ] Cuando el usuario selecciona una nueva imagen como "Usar en Home" en el generador de skins, el avatar del Navbar debe actualizarse de forma reactiva sin necesidad de recargar la página.

### 3. Diseño y Estética
- [ ] El diseño de los nuevos elementos debe ser 100% responsivo.
- [ ] Se deben respetar los tokens de color del sistema (Rosa Sugoi, Negro Carbón, Blanco Nieve).
- [ ] Las transiciones al abrir/cerrar el dropdown o cambiar el avatar deben ser fluidas (micro-animaciones).

---

## Especificaciones Técnicas (Referencia)
- **Store**: Se debe consumir `activeHomeAvatarUrl` de `useSkinStore`.
- **Componentes**: Modificar `NavBar.vue`.
- **Iconos**: Utilizar `User` para Perfil y `Activity` o `BarChart` para Tracking.
- **Seguridad**: Asegurar que las nuevas opciones solo son visibles para usuarios con sesión activa.
