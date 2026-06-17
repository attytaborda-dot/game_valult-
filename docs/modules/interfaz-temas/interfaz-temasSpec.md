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

Enfoque **mobile-first**: los estilos base en `vault.css` apuntan a una sola columna; los media queries con `min-width` añaden el layout de dos columnas en desktop.

| Viewport | Comportamiento |
|---|---|
| **≤ 520px** | Fichas apiladas; carátula 16:9 ancho completo; botones Editar/Borrar bajo los datos (no en columna lateral) |
| **521–899px** | Fila con wrap: portada + datos, acciones en fila inferior |
| **≥ 900px** | Fila única desktop con acciones laterales |
| **≥ 1100px** | `.layout-ranking` en 2 columnas iguales; scroll interno en cada panel |
| **≤ 1099px** | Drawer de ficha al seleccionar; `body.detalle-abierto` bloquea scroll de fondo |

### Formulario y navegación móvil

- `.field-row` pasa a una columna en ≤ 520px.
- `.panel-head` apila título y buscador en ≤ 520px.
- Botones y enlaces del footer: altura táctil mínima 44px en ≤ 1099px.
- `prefers-reduced-motion`: desactiva glitch, orbes y animaciones decorativas.

### HTML requerido

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

### Audio de fondo y splash screen

- Archivo: `app/audio/Soundflakes - Horizon of the Unknown.mp3`
- **Splash** (`#splash-screen`): pantalla de entrada al cargar; botón `#splash-enter` → **ENTER GAME VAULT**
- Al entrar: splash desaparece, música en bucle, visible `#music-toggle`
- Control posterior: botón flotante 🔊 / 🔇
- Estilos: `.splash-screen`, `.splash-enter-btn`, `.music-toggle`, `.audio-credit` en `vault.css`
- Spec global: [spec.md §10](../../spec.md#10-audio-de-fondo)

### Fichas del listado (`.card`)

Enfoque **mobile-first** en `vault.css`:

| Base (sin media query) | `flex-direction: column`; carátula `aspect-ratio: 16/9`; acciones en fila inferior |
| **≤ 520px** | Datos centrados; botones a ancho completo |
| **≥ 521px** | Fila con wrap; portada 200×112px |
| **≥ 900px** | Fila única; portada 240×135px; acciones en columna lateral |

- **Sin** `transform: scale` en hover (evita solapamiento).
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
- [x] Responsive desde 320px sin scroll horizontal.
- [x] Formulario y ranking usables en pantalla táctil (targets ≥ 44px).
- [x] Viewport meta con `viewport-fit=cover` para dispositivos con notch.
- [x] Splash de entrada con **ENTER GAME VAULT**; música al entrar.
- [x] Botón flotante 🔊 / 🔇 tras el splash.

## 6. Implementación

Ver [interfaz-temasImplementation.md](./interfaz-temasImplementation.md).
