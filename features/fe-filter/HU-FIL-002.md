# Historias de Usuario - Filtros Web SUGOI

---

# Historia de Usuario

## ID HU-FIL-002

## Título Visualización de descripciones (sinopsis) en resultados de búsqueda

## Descripción

**Como** usuario de SUGOI
**Quiero** visualizar tanto el título como la descripción de cada anime o manga obtenido
**Para** leer el contenido y conocer la trama antes de seleccionar un elemento

## Criterios de Aceptación

### Escenario 1: Visualización de sinopsis en resultados de Anime
```gherkin
Dado que el usuario ha realizado una búsqueda de Anime en FilterView
Cuando se muestran los resultados obtenidos de animeService.getAnimeList()
Entonces cada tarjeta de resultado debe incluir el campo 'synopsis' del objeto Anime
Y el texto de la sinopsis debe estar limitado a 3 líneas con puntos suspensivos (line-clamp)
```

### Escenario 2: Visualización de sinopsis en resultados de Manga
```gherkin
Dado que el usuario ha realizado una búsqueda de Manga en FilterView
Cuando se muestran los resultados obtenidos de mangaService.getMangaList()
Entonces cada tarjeta de resultado debe incluir el campo 'synopsis' del objeto Manga
Y el texto de la sinopsis debe estar limitado a 3 líneas con puntos suspensivos (line-clamp)
```

### Escenario 3: Integración con los Servicios
```gherkin
Dado que se renderizan los resultados de búsqueda
Cuando el sistema obtiene los datos de src/services/animeService.ts (para anime) o src/services/mangaService.ts (para manga)
Entonces debe mapear correctamente el campo de descripción/sinopsis proveído por la API de Jikan
```

### Escenario 4: Estilo Neo-Brutalista de la Información
```gherkin
Dado que se muestra la descripción en la tarjeta de resultado
Cuando el elemento se renderiza en pantalla
Entonces debe cumplir con el sistema de diseño:
  - Tipografía sans-serif limpia (regular/medium) para el cuerpo
  - Color de texto con alto contraste (negro carbón sobre blanco nieve)
  - Espaciado modular consistente dentro de la tarjeta
```

## Notas

* Se debe utilizar el campo `synopsis` que ya viene en las interfaces de TypeScript definidas en el proyecto.
* El truncado de texto debe manejarse preferiblemente con CSS (`-webkit-line-clamp`) para optimizar el rendimiento.
* Si la sinopsis es `null` o está vacía, se debe mostrar un texto por defecto como "Sin descripción disponible".

## Estimación

S

## Prioridad

Media

## Tareas

| Código | Nombre | Responsable |
| ------------- | ---------------------------------- | ----------- |
| HU-FIL-002-01 | Agregar elemento de descripción en las tarjetas de resultados de Anime | Frontend |
| HU-FIL-002-02 | Agregar elemento de descripción en las tarjetas de resultados de Manga | Frontend |
| HU-FIL-002-03 | Implementar truncado de texto CSS para las sinopsis | Frontend |
| HU-FIL-002-04 | Asegurar el correcto mapeo de datos desde los servicios de API | Frontend |

---
