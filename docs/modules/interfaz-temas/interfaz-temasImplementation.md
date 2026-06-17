# Implementación — Interfaz y temas

## Archivo principal

`app/css/vault.css` — todos los estilos de `app/index.html`.

## Breakpoints

```css
/* Móvil estrecho */
@media (max-width: 520px) { … }

/* Tablet / ventana media */
@media (max-width: 900px) { … }

/* Overlay drawer (vista apilada) */
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

## Overlay drawer

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

## Carátulas

| Contexto | Tamaño | Ratio |
|---|---|---|
| Listado `.card-cover` | 240×135px | 16:9 |
| Detalle `.detalle-cover-wrap` | 200px ancho, max-height 96px | contain |

## Ediciones legacy

Cada edición usa su CSS en `app/css/` (`original.css`, etc.) y JS dedicado en `app/js/` sin overlay ni ficha detalle.
