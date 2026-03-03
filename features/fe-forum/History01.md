# Historias de Usuario - Forum Search

---

# Historia de Usuario

## ID HU-FORUM-001

## Título Implementación de Buscador de Temas en el Forum

## Descripción

**Como** usuario de la comunidad SUGOI
**Quiero** disponer de un buscador de temas dentro del forum
**Para** localizar rápidamente hilos de discusión específicos sin tener que navegar por toda la lista

## Criterios de Aceptación

### Escenario 1: Ubicación y Visualización
```gherkin
Dado que el usuario accede a la vista del Forum
Cuando la página carga
Entonces debe visualizar un campo de búsqueda (input) cerca del botón "Nuevo Tema"
Y el diseño debe seguir el estilo Neo-Brutalista (bordes gruesos de 2px-4px, sin border-radius, alto contraste)
```

### Escenario 2: Funcionalidad de Búsqueda
```gherkin
Dado que el usuario escribe en el buscador
Cuando presiona "Enter" o el texto cambia
Entonces la lista de temas debe filtrarse dinámicamente para mostrar solo aquellos que coincidan con el término buscado en el título
```

### Escenario 3: Estado de Búsqueda sin Resultados
```gherkin
Dado que el usuario realiza una búsqueda
Cuando no existen temas que coincidan con el criterio
Entonces el sistema debe mostrar un mensaje claro de "No se encontraron resultados" siguiendo la estética del sitio
```

## Notas

* El buscador debe ubicarse en la cabecera del forum, alineado con el botón de creación de temas.
* Utilizar las variables de CSS de `base.css` para mantener la consistencia.
* La búsqueda debe ser insensible a mayúsculas/minúsculas.
* Mantener la responsividad en dispositivos móviles (apilar elementos si es necesario).

## Estimación

S

## Prioridad

Media-Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-FORUM-001-01 | Crear componente de búsqueda o integrar input en ForumView | Frontend |
| HU-FORUM-001-02 | Aplicar estilos Neo-Brutalistas al buscador | Frontend |
| HU-FORUM-001-03 | Implementar lógica de filtrado en el store o componente | Frontend |
| HU-FORUM-001-04 | Validar estados vacíos y feedback visual | Frontend |

---
