# Historias de Usuario - Generación de Avatar (Skin)

---

# Historia de Usuario

## ID HU-SKIN-002

## Título Integración con API de Pollinations y Lógica de Generación

## Descripción

**Como** desarrollador frontend
**Quiero** integrar la API de Pollinations AI y gestionar los límites de uso
**Para** permitir la generación controlada de avatares de estilo anime

## Criterios de Aceptación

### Escenario 1: Generación de Imagen Exitosa
```gherkin
Dado un prompt válido del usuario
Cuando se solicita la generación de la imagen
Entonces el sistema debe anteponer la palabra "ANIME" al prompt
Y realizar la petición usando la URL y Token configurados en el .env
```

### Escenario 2: Estado de Carga
```gherkin
Dado que una petición de imagen está en curso
Cuando el usuario espera la respuesta
Entonces debe visualizarse un Skeleton Loader en el contenedor de la imagen
```

### Escenario 3: Validación de Límites (Rate Limit)
```gherkin
Dado que un usuario ha generado 2 imágenes recientemente
Cuando intenta generar una tercera imagen antes de cumplirse los 5 días
Entonces el sistema debe mostrar un mensaje de error o deshabilitar la acción
```

## Notas

* Endpoint: https://gen.pollinations.ai/image/...
* Modelo obligatorio: flux.
* Dimensiones: 1024x1024.
* Las credenciales se deben manejar mediante variables de entorno.

## Estimación

L

## Prioridad

Crítica

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SKIN-002-01 | Configurar servicio pollinationsService | Frontend |
| HU-SKIN-002-02 | Implementar lógica de límites (2/5 días) | Frontend |
| HU-SKIN-002-03 | Añadir Skeleton Loader para el estado loading | Frontend |

---
