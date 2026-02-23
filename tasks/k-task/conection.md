# TAREA: Integración API MyAnimeList (Vue 3 + TypeScript + Pinia)

## Contexto del Proyecto

Stack actual:

- Vue 3 (Composition API)
- TypeScript (modo estricto)
- Pinia para state management
- Arquitectura modular
- Separación obligatoria por capas:
  - /types
  - /services
  - /stores

La API a integrar es:
https://api.myanimelist.net/v2

NO modificar estructura del proyecto.
NO instalar dependencias adicionales.
NO refactorizar código existente.
Implementar únicamente lo solicitado.

---

# OBJETIVO

Implementar conexión a la API de MyAnimeList para:

1. Buscar animes por nombre
2. Obtener detalles de un anime por ID

La implementación debe estar correctamente tipada y desacoplada.

---

# REGLAS DE ARQUITECTURA

## 1. Separación de responsabilidades

- /types → Definiciones estrictas de interfaces
- /services → Lógica de llamadas HTTP
- /stores → Estado global y consumo del service
- Componentes NO deben llamar directamente a la API

---

# IMPLEMENTACIÓN REQUERIDA

## 1️⃣ TYPES

Crear archivo:

src/types/anime.types.ts

Debe incluir:

- Interface para AnimeNode (según respuesta API)
- Interface para AnimeSearchResponse
- Interface para AnimeDetails

No usar `any`.
Tipado explícito obligatorio.

---

## 2️⃣ SERVICE

Crear archivo:

src/services/myAnimeList.service.ts

Responsabilidades:

- Configurar base URL
- Manejar headers (Client-ID)
- Función searchAnime(query: string)
- Función getAnimeById(id: number)

Requisitos:

- Usar fetch nativo
- Manejar errores con try/catch
- Retornar datos tipados
- No manejar estado aquí
- No usar librerías externas

La API requiere header:

X-MAL-CLIENT-ID: 97f3dfbd6bf9909699c65d368f54cce2

Debe quedar parametrizable (no hardcodear directamente en funciones).

---

## 3️⃣ STORE (Pinia)

Crear archivo:

src/stores/anime.store.ts

Debe contener:

State:
- animes: AnimeNode[]
- selectedAnime: AnimeDetails | null
- loading: boolean
- error: string | null

Actions:
- search(query: string)
- fetchById(id: number)

La store debe:

- Llamar al service
- Manejar loading
- Manejar errores
- No contener lógica HTTP

---

# REGLAS ESTRICTAS

- No usar any
- No mezclar responsabilidades
- No escribir código innecesario
- No anticipar futuras funcionalidades
- No modificar otras carpetas
- No crear archivos adicionales

---

# FORMATO DE RESPUESTA ESPERADO

Para cada archivo:

1. Ruta del archivo
2. Explicación breve
3. Código completo
4. Justificación técnica breve

Sin texto adicional.
Sin sugerencias fuera del alcance.

# Detalles

Estos son los endpoints que tiene
    - https://api.myanimelist.net/v2/anime
    - https://api.myanimelist.net/v2/anime/{anime_id}
    - https://api.myanimelist.net/v2/anime/ranking
    - https://api.myanimelist.net/v2/anime/season/{year}/{season}
    - https://api.myanimelist.net/v2/anime/suggestions
    - https://api.myanimelist.net/v2/manga
    - https://api.myanimelist.net/v2/manga/{manga_id}
    - https://api.myanimelist.net/v2/manga/ranking 
    