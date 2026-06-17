# Implementación — Comunidad y fichas

## Archivos

| Archivo | Responsabilidad |
|---|---|
| `app/js/catalogo.js` | `sinopsisDe`, `comentariosDe`, `horasPromedioDe`, `formatearHoras`, `HORAS_PROMEDIO` |
| `app/js/app.js` | `seleccionar`, `cerrarDetalle`, `renderDetalle`, `mostrar` |
| `app/index.html` | `#detalle-panel`, `#detalle-backdrop`, `#detalle-cerrar`, campo `#horas` |
| `app/css/vault.css` | `.detalle-grid`, `.detalle-cover-wrap`, overlay drawer |

## Flujo de selección

```text
Clic en .card
    → lista.seleccionar(id)
    → mostrar() + renderDetalle()
    → actualizarVistaDetalle()
         ├─ ≥1100px: panel sticky lateral (sin overlay)
         └─ <1100px: drawer + backdrop (sin scrollIntoView)
```

## Horas promedio

```javascript
// Prioridad en horasPromedioDe(j):
juego.horas_promedio          // desde localStorage vía aplicarMediaLocal
catalogoDe(j).horas_promedio  // entrada en CATALOGO_JUEGOS (opcional)
HORAS_PROMEDIO[nombre]        // mapa estático
null                          // muestra "—"
```

Persistencia en `guardarMediaLocal(id, { portada, enlace_compra, horas_promedio })`.

## Plantilla listado (extracto)

```html
<span class="tag-horas">⏱ ~62 h</span>
```

## Plantilla detalle (extracto)

```html
<span class="tag-horas">⏱ ~62 h</span>
<p class="detalle-meta">… · ~62 h promedio</p>
```

## CSS carátula detalle

- `.detalle-cover-wrap`: flex, padding 6px, ancho 200px.
- `.detalle-cover`: `max-height: 96px`, `object-fit: contain` (formato header Steam 16:9).
