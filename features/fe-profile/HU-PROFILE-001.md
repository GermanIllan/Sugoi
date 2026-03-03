# Historias de Usuario - Perfil de Usuario

---

# Historia de Usuario

## ID HU-PROFILE-001

## Título Implementación de la Vista de Perfil y Datos de Usuario (UI/UX)

## Descripción

**Como** usuario autenticado de SUGOI
**Quiero** acceder a mi perfil personal
**Para** ver mi información registrada y mi avatar activo

## Criterios de Aceptación

### Escenario 1: Visualización de Información Básica
```gherkin
Dado que el usuario accede a la vista de "Perfil" (ruta /profile)
Cuando la página carga
Entonces debe visualizar su nombre de usuario, correo electrónico y su avatar activo actual
Y el diseño debe seguir estrictamente el estilo Neo-Brutalista (bordes gruesos, sombras sólidas, sin border-radius)
```

### Escenario 2: Datos desde JSON-Server
```gherkin
Dado que el usuario tiene una sesión activa
Cuando accede al perfil
Entonces el sistema debe realizar una petición al JSON-Server para obtener los datos más recientes del usuario
Y mostrarlos de manera dinámica en la interfaz
```

## Notas

* Seguir estrictamente el archivo design.md.
* Utilizar las variables de CSS definidas en base.css.
* Reutilizar componentes de avatar existentes.
* La vista debe ser 100% responsiva.

## Estimación

M

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-PROFILE-001-01 | Crear estructura base de la vista de perfil | Frontend |
| HU-PROFILE-001-02 | Integración con JSON-Server para datos de usuario | Frontend |
| HU-PROFILE-001-03 | Implementar visualización de avatar dinámico | Frontend |

---
