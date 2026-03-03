# Historias de Usuario - Generación de Avatar (Skin)

---

# Historia de Usuario

## ID HU-SKIN-003

## Título Acciones de Imagen, Persistencia y Galería Local

## Descripción

**Como** usuario de SUGOI
**Quiero** poder descargar mis avatares generados, usarlos en la página de inicio y ver un historial de mis creaciones
**Para** gestionar mi colección de skins personalizadas y personalizar mi perfil

## Criterios de Aceptación

### Escenario 1: Acciones sobre la imagen recién generada
```gherkin
Dado que el usuario ha generado una imagen con éxito
Cuando la imagen se muestra en el contenedor principal
Entonces deben aparecer dos opciones claramente visibles: "Descargar Imagen" y "Usar en Home"
Y el diseño de los botones debe seguir el estilo Neo-Brutalista definido en design.md
```

### Escenario 2: Descarga de la imagen
```gherkin
Dado que el usuario hace clic en "Descargar Imagen"
Cuando el sistema procesa la solicitud
Entonces se debe iniciar la descarga de la imagen en formato .png o .jpg en el dispositivo del usuario
```

### Escenario 3: Uso de la imagen en la página de HOME
```gherkin
Dado que el usuario hace clic en "Usar en Home"
Cuando la acción se confirma
Entonces la URL de la imagen debe guardarse en el localStorage (bajo una clave específica para el avatar activo)
Y el usuario debe ser notificado de que su avatar ha sido actualizado para la página principal
```

### Escenario 4: Persistencia en Galería Local
```gherkin
Dado que una imagen ha sido generada con éxito
Cuando el sistema guarda el estado
Entonces la URL de la nueva imagen debe añadirse a un array de "historial" en el localStorage
Y este array no debe perderse al recargar la página
```

### Escenario 5: Visualización de la Galería
```gherkin
Dado que el usuario se encuentra en la vista de "Crear Skin"
Cuando existen imágenes en el historial del localStorage
Entonces se debe mostrar una sección de "Galería de Creaciones" debajo del recuadro principal
Y las imágenes deben mostrarse en un grid modular con bordes gruesos y sombras sólidas (Neo-Brutalismo)
```

## Notas

* Consultar `features/design.md` para los estilos de la galería y los botones (sombras desplazadas, bordes de 2-4px).
* Respetar las reglas de `features/rules.md` (TypeScript estricto, Vue 3 Composition API).
* El array de la galería en `localStorage` debe limitarse si es necesario para evitar saturar el almacenamiento (aunque las URLs de Pollinations son cortas).
* La descarga puede implementarse creando un enlace temporal `<a>` con el atributo `download`.

## Estimación

M

## Prioridad

Media-Alta

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SKIN-003-01 | Implementar lógica de descarga de imagen | Frontend |
| HU-SKIN-003-02 | Implementar persistencia de "Avatar Activo" en localStorage | Frontend |
| HU-SKIN-003-03 | Modificar Store para manejar el array de galería en localStorage | Frontend |
| HU-SKIN-003-04 | Crear componente de Galería Neo-Brutalista | Frontend |
| HU-SKIN-003-05 | Integrar galería en la vista de Create Skin | Frontend |

---
