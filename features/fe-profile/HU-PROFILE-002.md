# Historias de Usuario - Perfil de Usuario (Secciones)

---

# Historia de Usuario

## ID HU-PROFILE-002

## Título Implementación de Secciones de Seguimiento, Galería y Foro en el Perfil

## Descripción

**Como** usuario autenticado de SUGOI
**Quiero** visualizar las diferentes secciones de mi actividad en mi perfil
**Para** tener una visión global de mis aportaciones, seguimiento y colecciones de avatares

## Criterios de Aceptación

### Escenario 1: Secciones Visuales de Tracking y Foro
```gherkin
Dado que el usuario accede al perfil
Cuando carga la página
Entonces debe visualizar una sección de Tracking y otra de "Mis Aportaciones en el Foro"
Y estas secciones se mostrarán de forma estática (visual) por el momento, conforme al diseño Neo-Brutalista
```

### Escenario 2: Galería de Avatares Generados
```gherkin
Dado que el usuario accede al perfil
Cuando se desplaza a la sección de Galería
Entonces debe visualizar una lista dinámica de los avatares generados previamente
Y esta sección debe reutilizar los componentes del `SkinGallery` para asegurar consistencia
```

## Notas

* Seguir estrictamente el archivo design.md.
* Utilizar las variables de CSS definidas en base.css.
* Reutilizar el SkinGallery (y sus subcomponentes) para la sección de avatares.
* Las secciones de Tracking y Foro se implementarán solo de forma visual (maquetación), con lógica dinámica en futuras iteraciones.

## Estimación

L

## Prioridad

Media

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-PROFILE-002-01 | Implementar la sección de Tracking (UI visual) | Frontend |
| HU-PROFILE-002-02 | Integrar SkinGallery en la vista de perfil | Frontend |
| HU-PROFILE-002-03 | Implementar la sección de Foro (UI visual) | Frontend |

---
