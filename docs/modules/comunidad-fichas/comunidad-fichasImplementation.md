# Implementación — Comunidad y fichas

## Archivos

| Archivo | Responsabilidad |
|---|---|
| `app/js/rawg.js` | `buscarJuegoRawg`, `formatearPuntuacionRawg`, `obtenerReviewsRawg` |
| `app/js/catalogo.js` | `sinopsisDe`, `horasPromedioDe`, `formatearHoras`, `HORAS_PROMEDIO` |
| `app/js/app.js` | `renderDetalle`, `cargarOpinionesRawg`, `actualizarPuntuacionDetalle` |
| `app/index.html` | `#detalle-panel`, `#detalle-backdrop`, scripts `rawg.js` + `app.js` |
| `app/css/vault.css` | `.detalle-grid`, `.comentario`, `.btn-mas-opiniones`, overlay drawer |

## Flujo de selección

```text
Clic en .card
    → lista.seleccionar(id)
    → mostrar() + renderDetalle()
         ├─ HTML ficha + #detalle-puntuacion-rawg (★ …)
         └─ cargarOpinionesRawg(j)
              ├─ buscarJuegoRawg(nombre)  [caché]
              ├─ actualizarPuntuacionDetalle(found)
              └─ obtenerReviewsRawg(id, page) × N
    → actualizarVistaDetalle()
         ├─ ≥1100px: panel sticky lateral
         └─ <1100px: drawer + backdrop
```

## Puntuación RAWG

```javascript
// formatearPuntuacionRawg(juegoRawg) en rawg.js
if (metacritic != null) return (metacritic / 10).toFixed(1);
if (rating != null)       return (rating * 2).toFixed(1);
return 'N/A';
```

Se escribe en `#detalle-puntuacion-rawg` como `★ 7.3`. No altera `videojuegos.puntuacion` en Supabase.

## Opiniones RAWG

- `RAWG_PAGE_SIZE = 5`
- Primera carga: página 1
- Clic «Ver más opiniones»: página siguiente, `insertAdjacentHTML`
- Token `_rawgToken` cancela peticiones si el usuario cambia de ficha

## Horas promedio

```javascript
// Prioridad en horasPromedioDe(j):
juego.horas_promedio          // desde localStorage vía aplicarMediaLocal
catalogoDe(j).horas_promedio  // entrada en CATALOGO_JUEGOS (opcional)
HORAS_PROMEDIO[nombre]        // mapa estático
null                          // muestra "—"
```

## Plantilla detalle (extracto)

```html
<span id="detalle-puntuacion-rawg">★ …</span>
<span class="tag-horas">⏱ ~62 h</span>
<div id="comentarios-rawg" class="comentarios-list"></div>
<button id="btn-mas-opiniones" class="btn btn-mas-opiniones">Ver más opiniones</button>
```

## CSS relevante

- `.comentario`, `.comentario-head`, `.comentario-rating`
- `.btn-mas-opiniones`, `.comentarios-estado`, `.comentarios-fin`
- `.detalle-cover-wrap` / `.detalle-cover` (carátula 16:9)
