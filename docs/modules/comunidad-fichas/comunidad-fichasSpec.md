# Especificación — Comunidad y fichas

## 1. Objetivo

Al **seleccionar un juego** del ranking, mostrar ficha con carátula ajustada, sinopsis, horas promedio y 3 comentarios de jugadores. Las horas deben ser visibles también **en el listado** sin expandir.

## 2. Funcionalidades

### Panel detalle (`#detalle-panel`)

- Carátula horizontal ajustada (`object-fit: contain`, marco ~200×96px).
- Título, tags (incluye `⏱ ~N h`), meta, sinopsis.
- Botón adquirir.
- Sección **Comunidad — 3 opiniones**.

### Vista apilada (&lt; 1100px)

- Panel como **drawer inferior** con animación `translateY`.
- Backdrop `#detalle-backdrop` bloquea scroll del body.
- Cierre: botón ✕, clic en backdrop, tecla Escape.
- **No** hace `scrollIntoView` al pie de la página.

### Horas promedio

- Etiqueta `⏱ ~N h` en cada ficha del ranking.
- Fuente: `horasPromedioDe(j)` en `catalogo.js`.
- Mapa estático `HORAS_PROMEDIO` (21 juegos) + override en `localStorage`.
- Campo opcional `#horas` en formulario (guarda en media local).

### Sinopsis

Resumen de la trama por juego. Fuente: `sinopsisDe(j)`.

### Comentarios

Tres entradas `{ autor, texto }` por juego. Fuente: `comentariosDe(j)`.

### Media

Prioridad: localStorage → catálogo → fallback (ver [database.md](../../database.md)).

## 3. Reglas

- Clic en ficha (no en botones Editar/Borrar) activa selección.
- Clase `.selected` en ficha activa.
- Formulario permite editar URL carátula y horas (guarda en localStorage).

## 4. Criterios de aceptación

- [x] Cada juego del catálogo tiene sinopsis y 3 comentarios.
- [x] Horas visibles en listado y detalle.
- [x] Panel se actualiza al seleccionar otra ficha.
- [x] Overlay en tablet/móvil sin desplazar al final de la página.
- [x] Carátula detalle ajustada sin exceso de espacio negro.

## 5. Implementación

Ver [comunidad-fichasImplementation.md](./comunidad-fichasImplementation.md).
