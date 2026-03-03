# 🧪 Documentación de Pruebas Unitarias - SUGOI!

Este documento detalla las pruebas unitarias implementadas para asegurar el correcto funcionamiento de la lógica de negocio en los almacenes (stores) de Pinia y su interacción con los servicios de API.

---

## 🛠️ Tecnologías Utilizadas

*   **Vitest**: Framework de pruebas principal.
*   **Pinia**: Gestión de estado global.
*   **Mocks/Spy**: Simulación de servicios externos y peticiones `fetch`.
*   **JSDOM**: Entorno de navegador simulado.

---

## 📂 Detalle de los Tests

### 1. 💬 Foro (`forumStore.test.ts`)
Pruebas sobre la comunicación directa con la API del foro.

| Caso de Prueba | Descripción | Acción Realizada | Validación (Expect) |
| :--- | :--- | :--- | :--- |
| **Agregar un tema** | Verifica que se pueda crear un nuevo hilo de discusión. | Llama a `createTopic()` con datos de prueba. | El tema aparece en `store.topics` y se hizo un POST a `/topics`. |
| **Agregar respuesta** | Asegura que las respuestas se vinculen correctamente a un tema. | Llama a `addReply()` para un ID de tema específico. | La respuesta aparece en la lista `store.replies`. |

> **Nota Técnica**: Se utiliza `globalThis.fetch` mockeado para interceptar las llamadas directas de este store.

---

### 2. 🔐 Autenticación (`authStore.test.ts`)
Validación del flujo de usuarios y persistencia de sesión.

*   **Crear un usuario**: 
    *   **Flujo**: Envía datos de registro al `authService`.
    *   **Validación**: Se comprueba que el objeto `user` en el store se actualice y que los datos se guarden en el `localStorage`.
*   **Verificar usuario registrado (Login)**:
    *   **Flujo**: Simula un inicio de sesión con credenciales válidas.
    *   **Validación**: Comprueba que `isAuthenticated` pase a `true` y el error sea `null`.

---

### 3. 👤 Galería de Avatares (`avatarStore.test.ts`)
Validación de la integridad de los datos generados por IA.

*   **Validar existencia de avatares**:
    *   **Propósito**: Confirmar que los avatares creados previamente por el usuario se cargan correctamente en la interfaz.
    *   **Acción**: Mokea una respuesta de `avatarService` con una lista de imágenes.
    *   **Resultado**: Verifica que la longitud de `galleryItems` sea correcta y las URLs coincidan con las esperadas.

---

### 4. 📺 Seguimiento de Anime (`trackingStore.test.ts`)
Gestión de la lista personal de anime/manga.

*   **Agregar y Validar en Tracking**:
    *   **Visual**: Durante esta prueba se gestionan los temporizadores del "Programanding2 Loader" (`vi.useFakeTimers`).
    *   **Lógica**: Se añade un anime (ej: *Beck*) al seguimiento.
    *   **Validación**: 
        1.  El objeto existe en la lista `userTracking`.
        2.  La función `isTracked(malId, 'anime')` retorna correctamente `true`.

---

## 🧠 Glosario de Funciones de Test (Vitest)

Para entender mejor el código de las pruebas, aquí tienes el detalle de las funciones clave:

### 1. `vi.fn()`
Crea una **función simulada** (mock function) o "espía". Esta función no hace nada por sí sola, pero **registra** cuántas veces ha sido llamada y qué datos recibió. Se usa para sustituir funciones originales y observar su comportamiento.

### 2. `vi.mocked(...).mockResolvedValue(...)`
Esta combinación se usa para simular llamadas a APIs o servicios asíncronos:
*   **`vi.mocked`**: Es un ayudante de TypeScript que le dice al editor que esa función es un "mock", permitiendo acceder a métodos especiales de Vitest.
*   **`mockResolvedValue(datos)`**: Configura la función para que, cuando sea llamada, devuelva una **Promesa resuelta** con los `datos` indicados. 
    *   *Uso*: `vi.mocked(authService.register).mockResolvedValue(mockUser)` permite que el store reciba un usuario simulado inmediatamente al intentar registrarse.

### 3. El bloque `beforeEach`
Este bloque se encarga de "limpiar el escenario" antes de que empiece cada prueba individual:
```typescript
beforeEach(() => {
    setActivePinia(createPinia()); // Crea un Pinia nuevo para que los datos no se mezclen.
    vi.clearAllMocks();            // Resetea los contadores de las funciones espía.
});
```

### 4. `globalThis.fetch = vi.fn()`
Configura el entorno de pruebas para que la función estándar `fetch` (la que usa el navegador para pedir datos) sea un espía controlado por nosotros. Gracias a esto, podemos simular el éxito o fallo de la API del foro sin conectarnos a internet.

### 5. `vi.runAllTimers()`
Se utiliza en combinación con `vi.useFakeTimers()`. Si el código tiene un retardo (como el `setTimeout` de 2 segundos de nuestro **Programanding2 Loader**), esta función le dice a Vitest: *"No esperes de verdad, salta el tiempo e ignora la espera"*. Esto hace que los tests sean ultrarrápidos.

---

## 🚀 Cómo ejecutar los tests

Para ejecutar todas las pruebas y ver el informe de resultados:

```bash
npx vitest run src/testing/
```

Para ejecutar en modo observador (watch mode) mientras desarrollas:

```bash
npx vitest src/testing/
```

---

## 📝 Convenciones adoptadas
1.  **Limpieza de estado**: Se usa `beforeEach` para resetear Pinia (`setActivePinia`) y los mocks (`vi.clearAllMocks`) antes de cada test.
2.  **Aislamiento**: Ningún test depende de datos reales de la base de datos; todos usan datos simulados (fixtures).
3.  **Idioma**: Código en inglés (variables/comentarios técnicos) y documentación en español.
