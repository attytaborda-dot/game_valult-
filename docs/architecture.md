# Arquitectura técnica — GAME VAULT

## 1. Objetivo

Única fuente de verdad sobre la organización técnica del código en `game-vault/`.

## 2. Principios

- Cliente puro: HTML + CSS + JS.
- Supabase REST con `fetch`.
- RAWG API para puntuación y opiniones en ficha (solo visualización).
- Sin bundlers ni SDK Supabase.
- **Mobile-first** en CSS; breakpoints progresivos.
- Documentación en `docs/`; código en `app/`.

## 3. Estructura de carpetas

```text
game-vault/
├── README.md
├── spec.md
├── docs/
│   ├── GAME-VAULT.md
│   ├── database.md
│   ├── architecture.md
│   └── modules/
└── app/
    ├── index.html              # Edición Cyberpunk 2077 (principal)
    ├── audio/                  # Música de fondo
    ├── css/vault.css
    ├── js/
    │   ├── catalogo.js         # Media, sinopsis, horas, dedup
    │   ├── rawg.js             # RAWG: búsqueda, puntuación, reviews
    │   └── app.js              # CRUD, ranking, ficha, overlay
    └── editions/               # Temas alternativos (solo CRUD, sin RAWG)
        ├── original.html
        ├── gameboy.html
        ├── pokemon.html
        └── cyberpunk.html
```

## 4. Capas

```text
Presentación (app/index.html + app/css/vault.css)
        ↓
Lógica (app/js/app.js + app/js/catalogo.js + app/js/rawg.js)
        ↓
Datos
  ├─ Supabase REST (videojuegos: CRUD, ranking, verificación)
  ├─ localStorage (portada, enlace_compra, horas_promedio)
  ├─ catalogo.js (sinopsis, portadas por defecto, HORAS_PROMEDIO)
  └─ RAWG API (puntuación y opiniones en ficha — tiempo real)
```

## 5. Layout responsive

| Breakpoint | Componentes |
|---|---|
| **≤ 520px** | Fichas en columna; carátula 16:9 ancho completo |
| **521–899px** | Fichas en fila con wrap |
| **≥ 900px** | Fichas en fila única (desktop) |
| **521–1099px** | Ficha en **drawer inferior** (`#detalle-panel.detalle-overlay-open`) + backdrop |
| **≥ 1100px** | Grid 50/50: `.panel-list` y `.panel-detalle` a **igual altura** con scroll interno |

### DOM clave

| ID / clase | Rol |
|---|---|
| `#listado.card-list` | Galería de juegos (ranking) |
| `#detalle-panel` | Panel ficha (sticky desktop / overlay móvil) |
| `#detalle-backdrop` | Fondo oscuro al abrir ficha en vista apilada |
| `#detalle-cerrar` | Cierra overlay (también Escape y clic en backdrop) |
| `#detalle-puntuacion-rawg` | Puntuación 1–10 desde RAWG en ficha |
| `#comentarios-rawg` | Contenedor dinámico de opiniones RAWG |
| `#btn-mas-opiniones` | Carga siguiente página de reviews |
| `.layout-ranking` | Contenedor galería + ficha |
| `#splash-screen` | Pantalla de entrada (splash) al cargar |
| `#splash-enter` | Botón ENTER GAME VAULT — inicia música y muestra la app |
| `#bg-music` | Audio de fondo en bucle |
| `#music-toggle` | Botón flotante 🔊 / 🔇 |

## 6. Clases y funciones principales

### `Videojuego` / `ListaJuegos` (`app/js/app.js`)

| Método | Rol |
|---|---|
| `recuperar` | GET + deduplicar + media local |
| `guardar` / `actualizar` / `borrar` | CRUD |
| `seleccionar` | Activa ficha; abre overlay si vista apilada |
| `cerrarDetalle` | Cierra overlay y limpia selección |
| `actualizarVistaDetalle` | Sincroniza backdrop, body scroll, botón cerrar |
| `renderDetalle` | Sinopsis, carátula, horas, contenedor RAWG |
| `cargarOpinionesRawg` | Reviews paginadas + actualiza puntuación |
| `actualizarPuntuacionDetalle` | Escribe `★ N` en `#detalle-puntuacion-rawg` |
| `mostrar` | Ranking en listado (puntuación Supabase en cards) |

### `app/js/rawg.js`

| Función | Rol |
|---|---|
| `buscarJuegoRawg` | `GET /games?search=` → id, metacritic, rating (caché) |
| `formatearPuntuacionRawg` | metacritic/10 o rating×2 → escala 1–10 |
| `obtenerReviewsRawg` | `GET /games/{id}/reviews` paginado |

### `app/js/catalogo.js`

| Función | Rol |
|---|---|
| `portadaDe` | URL carátula |
| `enlaceCompraDe` | URL tienda |
| `sinopsisDe` | Texto sinopsis |
| `horasPromedioDe` | Horas completar (localStorage → catálogo → `HORAS_PROMEDIO`) |
| `formatearHoras` | Formato `~62 h` |
| `guardarMediaLocal` | Persiste media extendida |
| `deduplicarJuegos` | Elimina duplicados por nombre |

## 7. Convenciones

| Contexto | Convención |
|---|---|
| CSS edición principal | `app/css/vault.css`, clase `cyberpunk-edition` |
| Campo API | `año_lanzamiento` |
| IDs DOM | español camelCase |
| Breakpoint desktop | `1100px` |
| Breakpoint móvil estrecho | `520px` |
| Puntuación listado | Supabase `j.puntuacion` |
| Puntuación ficha | RAWG en tiempo real (no persiste) |

## 8. Reglas de cambio

1. Campos BD → actualizar [database.md](./database.md) primero.
2. Lógica CRUD → módulo [catálogo](./modules/catalogo-videojuegos/).
3. Estilos Cyberpunk y layout → `app/css/vault.css` + módulo [interfaz](./modules/interfaz-temas/).
4. Sinopsis/horas → `app/js/catalogo.js` + módulo [comunidad](./modules/comunidad-fichas/).
5. RAWG (puntuación/opiniones ficha) → `app/js/rawg.js` + [spec.md §9](../spec.md).
