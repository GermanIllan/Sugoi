# Historias de Usuario - Módulo de Noticias

---

# Historia de Usuario

## ID HU-NEWS-001

## Título Visualización y Navegación de Noticias de Anime y Manga

## Descripción

**Como** usuario de SUGOI  
**Quiero** ver noticias recientes de anime y manga con filtros, búsqueda y vista de detalle  
**Para** mantenerme informado y navegar fácilmente entre contenidos relevantes

## Criterios de Aceptación

### Escenario 1: Carga inicial de noticias
```gherkin
Dado que el usuario ingresa al apartado de Noticias
Cuando la vista termina de cargar
Entonces el sistema debe mostrar noticias de Anime y Manga obtenidas desde la API
Y debe reflejar estados de carga y error cuando corresponda
```

### Escenario 2: Filtros de contenido
```gherkin
Dado que existen noticias disponibles
Cuando el usuario selecciona un filtro (Ultima Hora, Semanal, Estrategia o Populares)
Entonces el listado debe actualizarse según el criterio elegido
Y debe mantenerse el estilo visual definido en design.md
```

### Escenario 3: Búsqueda en noticias
```gherkin
Dado que el usuario escribe un texto en el buscador
Cuando el término coincide con título o extracto de una noticia
Entonces el sistema debe mostrar solo los resultados relacionados
Y si no hay coincidencias debe mostrar "NO HAY NOTICIAS POR EL MOMENTO"
```

### Escenario 4: Acceso al detalle
```gherkin
Dado que el usuario selecciona "Leer más" en una noticia
Cuando se navega al detalle
Entonces debe mostrarse la información completa de la noticia seleccionada
Y deben mostrarse noticias relacionadas del mismo origen (anime o manga)
```

### Escenario 5: Cargar más noticias
```gherkin
Dado que el usuario se encuentra al final del listado
Cuando presiona el botón "Cargar más noticias"
Entonces el sistema debe ampliar el contenido mostrado usando nuevas noticias de la API
Y al finalizar debe regresar suavemente al inicio del módulo
```

## Notas

* Respetar reglas de `features/rules.md` (Vue 3 + TypeScript estricto + CSS puro scoped).
* Respetar estilo de `features/design.md` (Neo-Brutalismo Editorial Japonés).
* Reutilizar servicios API existentes y centralizar estado en store.
* No agregar dependencias nuevas.

## Estimación

M

## Prioridad

Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-NEWS-001-01 | Implementar store para feed y detalle de noticias | Frontend |
| HU-NEWS-001-02 | Integrar filtros y búsqueda en la vista de noticias | Frontend |
| HU-NEWS-001-03 | Implementar navegación a vista de detalle con relacionadas | Frontend |
| HU-NEWS-001-04 | Implementar carga incremental de noticias | Frontend |
| HU-NEWS-001-05 | Validar estilos del módulo según design.md | Frontend |

---
