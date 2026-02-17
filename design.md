# diseño.md  
## Sistema de Diseño Web — SUGOI

---

# 1. Nombre del Estilo de Diseño

**Neo-Brutalismo Editorial Japonés**

También puede clasificarse como:

- Neo-Brutalism UI
- Hard-Edge Editorial Web
- Minimalismo de Alto Contraste
- Pop-Cultural Brutalist Interface

Es una estética basada en:
- Bordes gruesos visibles
- Sombras sólidas desplazadas (sin blur)
- Alto contraste cromático
- Tipografía fuerte y dominante
- Estructura modular rígida

---

# 2. Características del Estilo Visual

## 2.1 Sistema Cromático

- Rojo vibrante como color dominante y de identidad
- Negro carbón como estructura base
- Blanco como área de respiración
- Fondos gris claro neutro
- Acentos pastel suaves para variación visual
- Uso estratégico del rojo únicamente en:
  - CTAs
  - Indicadores
  - Elementos activos

Contraste fuerte y controlado.

---

## 2.2 Bordes

- Bordes negros gruesos (2px – 4px)
- Sin border-radius
- Bordes siempre visibles
- Refuerzan estructura modular

Lenguaje visual rígido y geométrico.

---

## 2.3 Sombras

- Sombras sólidas
- Sin difuminado
- Desplazadas en diagonal (4px–8px)
- Color negro puro
- No se usan sombras suaves ni elevación material

Estética inspirada en Neo-Brutalismo.

---

## 2.4 Tipografía

- Titulares:
  - Sans-serif pesada
  - Extra bold / Black
  - Uso frecuente de mayúsculas
  - Tracking ligeramente aumentado
- Cuerpo:
  - Sans-serif moderna y limpia
  - Peso regular / medium
- Uso estratégico de caracteres japoneses como elemento gráfico

Jerarquía clara y agresiva.

---

## 2.5 Layout

- Sistema modular por bloques
- Secciones claramente separadas
- Grid rígido de 2–3 columnas
- Mucho espacio vertical
- Alineación centrada
- Estructura limpia y repetible

Estética editorial estructurada.

---

## 2.6 Botones

- Rectangulares
- Fondo sólido (rojo o negro)
- Texto en mayúsculas
- Bordes gruesos
- Sombra desplazada
- Sin gradientes
- Sin efectos glossy

Aspecto fuerte y contundente.

---

# 3. Sensación y Personalidad Visual

El diseño transmite:

- Energía
- Comunidad activa
- Cultura pop japonesa
- Autoridad editorial
- Modernidad estructurada
- Impacto visual fuerte

No es minimalismo suave.
Es minimalismo estructural con carácter.

---

# 4. Sistema de Animaciones y Micro-Interacciones

Las animaciones deben respetar el lenguaje Neo-Brutalista:
Sin efectos suaves excesivos.
Sin animaciones orgánicas.
Sin easing exagerado.

---

## 4.1 Principios de Animación

- Duraciones cortas (120ms – 200ms)
- Easing: ease-out o linear
- Movimientos rígidos
- Desplazamientos en X/Y
- Nada de bounce
- Nada de blur

---

## 4.2 Micro-Interacciones Recomendadas

### 🔘 Botones

Hover:
- Transform: translate(-4px, -4px)
- Sombra aumenta desplazamiento
- Cambio leve de contraste

Active:
- Transform: translate(2px, 2px)
- Sombra reduce tamaño

Sensación: botón físico presionado.

---

### 🧱 Tarjetas (Cards)

Hover:
- Elevación por desplazamiento
- Aumento de shadow-offset
- Imagen interna escala 1.02–1.04

Entrada en viewport:
- Fade-in + translateY(10px)
- Stagger de 60ms entre tarjetas

---

### 🧭 Navegación

Hover links:
- Línea inferior animada desde izquierda
- Cambio de color a rojo

Elemento activo:
- Indicador sólido (barra o fondo rojo)

Scroll:
- Navbar reduce altura ligeramente
- Fondo se vuelve más sólido

---

### 📰 Listados

Hover:
- Resaltado leve del borde
- Cambio de color en título
- Pequeño desplazamiento lateral

---

### ⭐ Ratings / Indicadores

- Animación progresiva de estrellas al cargar
- Fade + scale(0.95 → 1)
- Duración 150ms

---

### 📩 CTA Final

- Fade-in al entrar en viewport
- Campo input con borde que cambia a rojo en focus
- Botón con animación física al presionar

---

# 5. Animaciones de Entrada Globales

Recomendado:

- Fade + translateY (8–12px)
- Stagger en grids
- Hero con fade escalonado
- Nada de animaciones continuas innecesarias

Evitar:
- Parallax exagerado
- Scroll animations complejas
- Efectos líquidos
- Glassmorphism
- Sombras difusas

---

# 6. Qué NO pertenece a este estilo

- Border-radius grandes
- Gradientes complejos
- Sombras suaves
- Transparencias blur
- Animaciones elásticas
- UI tipo Material Design
- Diseño neumórfico

---

# 7. Resumen del Lenguaje Visual

Estilo:  
**Neo-Brutalismo Editorial Japonés**

Características clave:

- Alto contraste
- Bordes negros gruesos
- Sombras sólidas desplazadas
- Modularidad rígida
- Tipografía pesada
- Rojo dominante
- Animaciones cortas y físicas

Es un diseño fuerte, estructurado y con identidad clara.


# NOTA:
  - Los diseños deben ser responsivos para dispositivos móviles.
  - Los estilos los encuentras en el archivo base.css
  - Las animaciones que no las encuentres en el archivo base.css, Crealas en main.css
  - Los demas estilos que necesites, crealos dentro de los componentes o vistas en style scoped