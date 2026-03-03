# Historias de Usuario - Perfil de Usuario (Foro)

---

# Historia de Usuario

## ID HU-PROFILE-004

## Título Implementación Dinámica de la Sección de Aportaciones al Foro en el Perfil

## Descripción

**Como** usuario autenticado de SUGOI
**Quiero** ver mis últimas 3 aportaciones al foro en mi perfil
**Para** acceder rápidamente a mis discusiones o sentirme parte activa de la comunidad

## Criterios de Aceptación

### Escenario 1: Visualización de las últimas 3 aportaciones
```gherkin
Dado que el usuario accede a su "Perfil"
Cuando la sección de "Mis Aportaciones en el Foro" carga
Entonces debe visualizar sus últimas 3 aportaciones (título de los temas)
Y la información debe provenir dinámicamente del `forumStore` filtrada por su identificador de usuario
```

### Escenario 2: Estado vacío (Sin aportaciones)
```gherkin
Dado que el usuario no tiene ninguna aportación registrada en el foro
Cuando accede a su perfil
Entonces la sección debe mostrar el mensaje: "Aún no has hecho aportaciones en la comunidad"
Y debe incluir un enlace o botón para ir al Foro a realizar su primera publicación
```

### Escenario 3: Navegación al Foro
```gherkin
Dado que el usuario está en la sección de Foro en su perfil
Cuando hace clic en el botón o enlace de redirección
Entonces debe ser dirigido a la vista principal del Foro (`/forum`)
```

## Notas

* Reutilizar lógica del `forumStore` para filtrar aportaciones por autor.
* Seguir diseño del componente `ProfileForum.vue` pero dejando de ser un placeholder dashed.
* Utilizar estética Neo-Brutalista Premium acorde al diseño general.

## Estimación

S

## Prioridad

Media

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-PROFILE-004-01 | Configurar la obtención de aportaciones del usuario en `ProfileView.vue` | Frontend |
| HU-PROFILE-004-02 | Refactorizar `ProfileForum.vue` para mostrar lista dinámica o estado vacío | Frontend |
| HU-PROFILE-004-03 | Agregar enlaces de navegación al Foro | Frontend |

---
