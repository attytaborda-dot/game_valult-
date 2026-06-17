# Especificación — Interfaz y temas

## 1. Objetivo

Capa visual y UX: edición principal Cyberpunk 2077 y temas alternativos en `app/editions/`. Layout **mobile-first** con galería y ficha equilibradas en desktop.

## 2. Edición principal (`app/index.html`)

Estética **Cyberpunk 2077**:

- Fondo rejilla + orbes neón cyan/magenta.
- Efecto eléctrico (`electric-flash`).
- Scanlines.
- Título `.glitch-title` con animación RGB.
- Paleta: amarillo `#fcee0a`, cyan `#00e5ff`, magenta `#ff2a6d`, verde `#00ff88`.
- Fuentes: Orbitron + Rajdhani (legibles).

### Layout galería + ficha

| Viewport | Comportamiento |
|---|---|
| **≥ 1100px** | `.layout-ranking` en 2 columnas iguales; `.panel-list` y `.panel-detalle` misma altura (`calc(100vh - 14rem)`); scroll interno en cada panel |
| **521–1099px** | Una columna; ficha en drawer fijo inferior al seleccionar |
| **≤ 520px** | Fichas apiladas; carátulas 16:9 centradas |

### Fichas del listado (`.card`)

- Flex horizontal: carátula 240×135px (16:9) + datos + acciones.
- **Sin** `transform: scale` (evita solapamiento).
- Brillo neón en borde + `filter: brightness` en imagen.

### Panel detalle

- Marco carátula compacto (sin ratio vertical 3:4).
- Botón cerrar visible solo en overlay.

### Hover en fichas

- `overflow: visible` en `.card` (desktop).
- `isolation: isolate` para capas hover.

## 3. Ediciones alternativas

| Archivo | Tema |
|---|---|
| `app/editions/original.html` | Terminal retro |
| `app/editions/gameboy.html` | Game Boy |
| `app/editions/pokemon.html` | Pokémon |
| `app/editions/cyberpunk.html` | Cyberpunk clásico |

Solo CRUD + filtro; sin panel ficha en ediciones legacy.

## 4. Navegación

`edition-nav` en footer enlaza entre temas. Activo: Cyberpunk 2077 → `app/index.html`.

## 5. Criterios de aceptación

- [x] Glitch visible en título sin bloquear lectura.
- [x] Texto legible sobre fondo oscuro.
- [x] Hover no tapa nombre del juego.
- [x] Galería y ficha a igual altura en desktop.
- [x] Overlay de ficha en tablet sin scroll al pie.
- [x] Responsive desde 320px.

## 6. Implementación

Ver [interfaz-temasImplementation.md](./interfaz-temasImplementation.md).
