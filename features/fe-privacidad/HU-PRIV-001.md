# Historias de Usuario - Privacidad y Términos de Servicio

---

# Historia de Usuario

## ID HU-PRIV-001

## Título Implementación de Vistas Legales y Enlaces de Footer

## Descripción

**Como** usuario de SUGOI
**Quiero** acceder a las secciones de Política de Privacidad y Términos de Servicio desde el footer
**Para** informarme sobre el tratamiento de mis datos, las reglas de la plataforma y entender el carácter educativo del proyecto por motivos de copyright.

## Criterios de Aceptación

### Escenario 1: Visualización de la Política de Privacidad
```gherkin
Dado que el usuario hace clic en "Política de Privacidad" en el footer
Cuando la página de privacidad se carga
Entonces debe visualizar un texto estructurado siguiendo el estilo Neo-Brutalista
Y debe incluir una cláusula específica aclarando que "Esta página tiene inicialmente fines educativos" por temas de copyright.
```

### Escenario 2: Visualización de los Términos de Servicio
```gherkin
Dado que el usuario hace clic en "Términos de Servicio" en el footer
Cuando la página de términos se carga
Entonces debe visualizar las condiciones de uso de la plataforma
Y el diseño debe mantener la coherencia con el resto del sitio (bordes gruesos, sombras sólidas).
```

### Escenario 3: Funcionamiento de los Enlaces en el Footer
```gherkin
Dado que el usuario se encuentra en cualquier vista de la aplicación
Cuando navega hasta el footer
Entonces debe encontrar enlaces funcionales para "Política de Privacidad" y "Términos de Servicio"
Y al hacer clic, debe ser redirigido a las rutas correspondientes sin recargar la aplicación completa (SPA navigation).
```

## Notas

* Seguir estrictamente el archivo `design.md` (Estilo Neo-Brutalismo Editorial Japonés).
* Usar tipografía editorial y jerarquía clara definida en las reglas de diseño.
* Todas las vistas deben ser responsivas.
* La aclaración de "Fines Educativos" debe ser visible y clara en ambas páginas.
* Seguir las reglas de `rules.md` para la implementación (TypeScript, Vue 3 Composition API).

## Estimación

S

## Prioridad

Media

## Tareas

| Código | Nombre | Responsable |
| ------------- | -------------------------- | ----------- |
| HU-PRIV-001-01 | Crear las rutas en el router para Privacidad y Términos | Frontend |
| HU-PRIV-001-02 | Desarrollar la vista `PrivacyPolicyView.vue` con el disclaimer educativo | Frontend |
| HU-PRIV-001-03 | Desarrollar la vista `TermsOfServiceView.vue` | Frontend |
| HU-PRIV-001-04 | Vincular los enlaces del componente Footer a las nuevas rutas | Frontend |
| HU-PRIV-001-05 | Aplicar estilos Neo-Brutalistas a las nuevas vistas | Frontend |

---
