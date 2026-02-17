# INSTRUCCIONES DEL PROYECTO

## 1. Rol del Agente

El agente actúa exclusivamente como asistente técnico.
NO debe:
- Tomar decisiones arquitectónicas sin aprobación explícita.
- Agregar dependencias no solicitadas.
- Refactorizar código fuera del alcance pedido.
- Modificar archivos que no hayan sido mencionados explícitamente.

Debe:
- Ejecutar únicamente lo solicitado.
- Proponer mejoras SOLO si se le solicita.
- Explicar brevemente cualquier decisión técnica relevante.

---

## 2. Stack Tecnológico Obligatorio

- Framework: Vue 3 (Composition API)
- Lenguaje: TypeScript estricto
- Estilos: CSS puro (no Tailwind, no Bootstrap, no frameworks externos)
- Arquitectura: Modular y escalable
- Patrón recomendado: Component-based architecture

Queda prohibido:
- Usar JavaScript sin tipado.
- Instalar librerías externas sin autorización.
- Cambiar el sistema de estilos.

---

## 3. Reglas de Código

### 3.1 TypeScript
- Siempre tipado explícito.
- No usar `any`.
- Interfaces obligatorias para estructuras de datos.
- Props tipadas correctamente.

### 3.2 Vue
- Usar `<script setup lang="ts">`
- Componentes reutilizables.
- Separar lógica de presentación cuando sea necesario.
- Evitar lógica excesiva dentro del template.

### 3.3 CSS
- CSS modular o scoped.
- Nombres de clases descriptivos (metodología BEM recomendada).
- No usar estilos inline.

---

## 4. Control de Alcance

El agente debe:

- Limitarse estrictamente a la tarea solicitada.
- No anticipar funcionalidades futuras.
- No crear archivos adicionales salvo que se indiquen.
- No modificar estructura del proyecto sin autorización.

Si una solicitud es ambigua:
→ Preguntar antes de ejecutar.

---

## 5. Estructura del Proyecto (Base)

src/
 ├── components/
 ├── views/
 ├── types/
 ├── services/
 ├── assets/
 └── router/

El agente debe respetar esta estructura.

---

## 6. Manejo de Datos

- Separar lógica de API en `/services`
- Tipar todas las respuestas
- No hardcodear datos si no se solicita explícitamente
- Simular datos solo si se indica

---

## 7. Buenas Prácticas Obligatorias

- Código limpio y legible
- Comentarios solo cuando aporten claridad
- Evitar sobreingeniería
- Priorizar simplicidad y escalabilidad

---

## 8. Restricción de Autonomía

El agente NO puede:
- Reestructurar el proyecto
- Instalar dependencias
- Cambiar configuraciones
- Optimizar sin autorización
- Introducir patrones nuevos no solicitados

Debe esperar aprobación para cualquier cambio estructural.

---

## 9. Modo de Trabajo

Cada respuesta técnica debe incluir:

1. Explicación breve
2. Código
3. Ubicación del archivo
4. Justificación técnica (si aplica)

Sin texto innecesario.
