# Especificación — Comunidad y fichas

## 1. Objetivo

Al **seleccionar un juego** del ranking, mostrar ficha con carátula ajustada, sinopsis, **puntuación RAWG**, horas promedio y **opiniones RAWG** paginadas. Las horas deben ser visibles también **en el listado** sin expandir.

## 2. Funcionalidades

### Panel detalle (`#detalle-panel`)

- Carátula horizontal ajustada (`object-fit: contain`, marco ~200×96px).
- Título, tags (incluye puntuación RAWG `★ N`, `⏱ ~N h`), meta, sinopsis.
- Botón adquirir.
- Sección **Comunidad** con contador dinámico de opiniones RAWG.

### Puntuación en ficha (RAWG)

- Elemento `#detalle-puntuacion-rawg`; estado inicial `★ …`.
- Búsqueda: `GET /api/games?search=NOMBRE_DEL_JUEGO`.
- Cálculo solo en pantalla (no escribe en Supabase):
  - `metacritic` → `(metacritic / 10).toFixed(1)`
  - si vacío → `(rating * 2).toFixed(1)` (rating RAWG 0–5)
  - si ninguno → `N/A`
- El listado del ranking sigue mostrando `puntuacion` de Supabase.

### Opiniones (RAWG)

- Contenedor `#comentarios-rawg` (inyección dinámica).
- 5 opiniones iniciales; botón **Ver más opiniones** carga la siguiente página.
- Si no hay más: **Sin más opiniones disponibles**.
- Endpoint: `GET /api/games/{id}/reviews`.

### Vista apilada (&lt; 1100px)

- Panel como **drawer inferior** con animación `translateY`.
- Backdrop `#detalle-backdrop` bloquea scroll del body.
- Cierre: botón ✕, clic en backdrop, tecla Escape.
- Footer oculto mientras el overlay está activo.

### Horas promedio

- Etiqueta `⏱ ~N h` en cada ficha del ranking.
- Fuente: `horasPromedioDe(j)` en `catalogo.js`.
- Mapa estático `HORAS_PROMEDIO` (21 juegos) + override en `localStorage`.
- Campo opcional `#horas` en formulario (guarda en media local).

### Sinopsis

Resumen de la trama por juego. Fuente: `sinopsisDe(j)` en `catalogo.js`.

### Media

Prioridad portada: catálogo → localStorage → fallback (ver [database.md](../../database.md)).

## 3. Reglas

- Clic en ficha (no en botones Editar/Borrar) activa selección.
- Clase `.selected` en ficha activa.
- Formulario permite editar URL carátula y horas (guarda en localStorage).
- Una sola búsqueda RAWG por juego en memoria (caché compartida puntuación + reviews).

## 4. Criterios de aceptación

- [x] Puntuación en ficha desde RAWG; Supabase sin cambios.
- [x] Mínimo 5 opiniones al cargar (o las disponibles si son menos).
- [x] Paginación «Ver más opiniones» sin recargar página.
- [x] Horas visibles en listado y detalle.
- [x] Panel se actualiza al seleccionar otra ficha.
- [x] Overlay en tablet/móvil sin desplazar al final de la página.
- [x] Estilo Cyberpunk en comentarios y controles RAWG.

## 5. Implementación

Ver [comunidad-fichasImplementation.md](./comunidad-fichasImplementation.md).
