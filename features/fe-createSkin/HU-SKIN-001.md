# Historias de Usuario - Generación de Avatar (Skin)

---

# Historia de Usuario

## ID HU-SKIN-001

## Título Implementación de la Vista de Avatar (UI/UX)

## Descripción

**Como** usuario de SUGOI
**Quiero** acceder a una interfaz intuitiva y con estilo Neo-Brutalista
**Para** poder personalizar y generar mi propio avatar de anime

## Criterios de Aceptación

### Escenario 1: Visualización del Formulario
```gherkin
Dado que el usuario accede a la vista de "Crear Skin"
Cuando la página carga
Entonces debe visualizar un campo de texto para el prompt y un botón de "Generar"
Y el diseño debe seguir estrictamente el estilo Neo-Brutalista (bordes gruesos, sombras sólidas, sin border-radius)
```

### Escenario 2: Restricción del Prompt
```gherkin
Dado que el usuario intenta escribir un prompt
Cuando el texto supera el límite definido
Entonces el sistema debe impedir la escritura o mostrar una validación visual
```

## Notas

* Seguir estrictamente el archivo design.md.
* El input debe ser responsivo.
* Utilizar las variables de CSS definidas en base.css.

## Estimación

M

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SKIN-001-01 | Crear estructura base de la vista | Frontend |
| HU-SKIN-001-02 | Aplicar estilos Neo-Brutalistas | Frontend |
| HU-SKIN-001-03 | Implementar input con límite de texto | Frontend |

---
