# Historias de Usuario - Gestión de Sesión (Auth)

---

# Historia de Usuario

## ID HU-SESSION-003

## Título Persistencia de Avatares Vinculados al Usuario

## Descripción

**Como** usuario registrado
**Quiero** que mis avatares generados se guarden vinculados a mi cuenta
**Para** que mi galería sea personal y no se mezcle con la de otros usuarios o se pierda al limpiar caché general

## Criterios de Aceptación

### Escenario 1: Guardado con ID de Usuario
```gherkin
Dado que un usuario está logueado
Cuando genera un nuevo avatar
Entonces el objeto guardado en el backend/localStorage debe incluir el userId o estar dentro de su perfil
```

### Escenario 2: Filtrado de Galería
```gherkin
Dado un usuario que inicia sesión
Cuando accede a su galería
Entonces solo debe visualizar las imágenes que él mismo ha generado
```

## Notas

* Adaptar el `skinStore.ts` para que dependa del estado del `authStore`.
* El guardado debe ser persistente (Backend o LocalStorage segmentado por usuario).

## Estimación

M

## Prioridad

Media

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-SESSION-003-01 | Refactorizar SkinStore para incluir userId | Frontend |
| HU-SESSION-003-02 | Implementar lógica de filtrado por usuario | Frontend |

---
