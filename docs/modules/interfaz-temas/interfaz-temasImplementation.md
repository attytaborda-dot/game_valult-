# Implementación — Interfaz y temas

## Archivo principal

`app/css/vault.css` — todos los estilos de `app/index.html`.

## Enfoque mobile-first

1. **Base sin media query**: fichas del ranking en **columna** (carátula arriba, datos, botones abajo).
2. **`min-width: 521px`**: fila con wrap (tablet).
3. **`min-width: 900px`**: fila única desktop.
4. **`min-width: 1100px`**: grid de dos columnas ranking + detalle.

## Breakpoints

```css
/* Móvil estrecho — apilado total */
@media (max-width: 520px) { … }

/* Tablet — fichas con wrap */
@media (max-width: 900px) { … }

/* Vista apilada — drawer de ficha */
@media (max-width: 1099px) { … }

/* Desktop dos columnas */
@media (min-width: 1100px) { … }
```

## Desktop — igual altura

```css
.layout-ranking {
  min-height: calc(100vh - 14rem);
  grid-template-columns: 1fr 1fr;
}
.panel-list, .panel-detalle {
  max-height: calc(100vh - 14rem);
}
.panel-list .card-list,
.detalle-contenido {
  flex: 1;
  overflow-y: auto;
}
```

## Overlay drawer (tablet/móvil)

```css
.panel-detalle {
  position: fixed;
  bottom: 0;
  transform: translateY(105%);
}
.panel-detalle.detalle-overlay-open {
  transform: translateY(0);
}
```

Activado por `ListaJuegos.actualizarVistaDetalle()` cuando `matchMedia('(max-width: 1099px)')`.

Cierre: botón `#detalle-cerrar`, clic en `#detalle-backdrop`, tecla Escape (`app.js`).

## Carátulas

| Contexto | Viewport | Comportamiento |
|---|---|---|
| Listado `.card-cover` | Base (móvil) | Ancho 100%, `aspect-ratio: 16/9` |
| Listado `.card-cover` | ≥ 521px | 200×112px |
| Listado `.card-cover` | ≥ 900px | 240×135px (16:9) |
| Detalle `.detalle-cover` | ≤ 520px | Ancho completo, max-height 420px |
| Detalle `.detalle-cover` | ≥ 1100px | max-height 260px |

## Mobile-first — reglas CSS aplicadas

| Regla | Selector / archivo |
|---|---|
| Sin scroll horizontal | `body { overflow-x: hidden }` |
| Safe area (notch) | `env(safe-area-inset-*)` en body y drawer |
| Formulario una columna | `.field-row` @ 520px |
| Buscador ancho completo | `.search-input` @ 520px |
| Targets táctiles 44px | `.btn`, `.btn-edit`, `.btn-del` @ 1099px |
| Fichas apiladas en móvil | `.card { flex-direction: column }` base; desktop `@media (min-width: 900px)` |
| Cache bust CSS | `vault.css?v=4` en `index.html` |
| Menos movimiento | `@media (prefers-reduced-motion: reduce)` |

## HTML

`app/index.html` incluye:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

## Splash screen + audio

Flujo de entrada (`index.html`, script inline antes de `</body>`):

1. `body.splash-active` bloquea scroll.
2. `#splash-screen` (z-index 9999) con `#splash-enter`.
3. Clic en **ENTER GAME VAULT** → clase `splash-screen--out`, quita `splash-active`, elimina splash, `audio.play()`, muestra `#music-toggle`.
4. `#music-toggle` alterna play/pause; iconos 🔊 / 🔇.

```css
.splash-screen { position: fixed; inset: 0; z-index: 9999; }
.splash-enter-btn { /* Cyberpunk amarillo / Orbitron */ }
.music-toggle { position: fixed; bottom/right; z-index: 220; }
```

## Ediciones legacy

Cada edición usa su CSS en `app/css/` (`original.css`, etc.) y JS dedicado en `app/js/` sin overlay ni ficha detalle. Incluyen meta viewport estándar; el layout CRUD pasa a una columna en ≤ 900px (`original.css`).
