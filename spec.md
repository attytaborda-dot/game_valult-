# Especificación general — GAME VAULT

## 1. Objetivo general

Gestionar y **verificar** un catálogo de videojuegos en Supabase, con **ranking por puntuación** (orden desde Supabase), **ficha detallada** al seleccionar un juego, **sinopsis**, **opiniones RAWG** en tiempo real y **horas promedio de completado** visibles en el listado.

## 2. Alcance funcional

- CRUD sobre la tabla `videojuegos`.
- Marcar registros como verificados.
- Filtrar por texto.
- Estadísticas en header (total y verificados).
- Ranking ordenado por `puntuacion` de Supabase (solo orden del listado).
- Panel de ficha con carátula ajustada, sinopsis, **puntuación RAWG** (solo visualización) y opiniones RAWG.
- **Horas promedio** visibles en cada ficha del ranking (sin expandir).
- Carátulas, enlaces de compra y horas (localStorage + catálogo).
- Layout **mobile-first** con overlay de ficha en tablet/móvil.
- Música de fondo con splash de entrada (ver §10).

## 3. Módulos

| Módulo | Spec | Implementación |
|---|---|---|
| Catálogo | [catalogo-videojuegosSpec.md](./docs/modules/catalogo-videojuegos/catalogo-videojuegosSpec.md) | [catalogo-videojuegosImplementation.md](./docs/modules/catalogo-videojuegos/catalogo-videojuegosImplementation.md) |
| Verificación y ranking | [verificacion-rankingSpec.md](./docs/modules/verificacion-ranking/verificacion-rankingSpec.md) | [verificacion-rankingImplementation.md](./docs/modules/verificacion-ranking/verificacion-rankingImplementation.md) |
| Comunidad y fichas | [comunidad-fichasSpec.md](./docs/modules/comunidad-fichas/comunidad-fichasSpec.md) | [comunidad-fichasImplementation.md](./docs/modules/comunidad-fichas/comunidad-fichasImplementation.md) |
| Interfaz y temas | [interfaz-temasSpec.md](./docs/modules/interfaz-temas/interfaz-temasSpec.md) | [interfaz-temasImplementation.md](./docs/modules/interfaz-temas/interfaz-temasImplementation.md) |

## 4. Relación entre módulos

```text
[Interfaz y temas] ──presenta──▶ [Catálogo]
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
            [Verificación]    [Comunidad/fichas]    [Media local]
```

## 5. Reglas globales

- JavaScript puro; sin Node.js ni frameworks.
- Supabase solo vía REST API; sin `@supabase/supabase-js`.
- HTML, CSS y JS en archivos separados.
- La tabla `videojuegos` ya existe — no proponer migraciones salvo petición.
- Solo `anon public key`.

## 6. Restricciones

- `portada`, `enlace_compra` y `horas_promedio` no están en Supabase → `localStorage` (`gamevault_media`) + `catalogo.js`.
- 21 registros únicos (duplicados eliminados).

## 7. Criterios de aceptación globales

- [x] Carga 21 juegos únicos.
- [x] CRUD operativo.
- [x] Clic en ficha abre detalle con sinopsis y opiniones RAWG (mín. 5, paginación).
- [x] Puntuación en ficha detalle desde RAWG (no modifica Supabase).
- [x] Horas promedio visibles en listado sin expandir ficha.
- [x] Desktop: galería y panel detalle a igual altura.
- [x] Tablet/móvil: ficha en overlay sin scroll al pie de página.
- [x] Hover en fichas no solapa texto sobre carátula.
- [x] Estética Cyberpunk 2077 con glitch en título.

## 8. Mobile-first (dispositivos móviles)

La edición principal (`app/index.html`) debe ser usable desde **320px** de ancho sin scroll horizontal ni contenido recortado.

### Principios

- Estilos base para móvil; breakpoints con `min-width` solo para ampliar en tablet y desktop.
- Meta viewport en HTML: `width=device-width, initial-scale=1.0, viewport-fit=cover`.
- Formulario en una columna en viewports ≤ 520px.
- Ficha de detalle en **drawer inferior** (≤ 1099px) con backdrop y botón cerrar; `body` sin scroll de fondo al abrir; footer y navegación de ediciones ocultos mientras el overlay está activo.
- Áreas táctiles mínimas de **44px** en botones y navegación en vista apilada.

### Breakpoints

| Viewport | Comportamiento |
|---|---|
| **≤ 520px** | Fichas **apiladas** (carátula 16:9 arriba, datos, botones Editar/Borrar en fila inferior a ancho completo); buscador a ancho completo; safe area en notch |
| **521–899px** | Ficha en fila con wrap: portada + datos arriba, acciones en fila inferior |
| **900–1099px** | Igual que tablet + drawer de ficha al seleccionar juego |
| **≥ 1100px** | Dos columnas a igual altura; fichas en fila única (portada + datos + acciones laterales) |

### Fichas del ranking (protocolo responsive)

| Viewport | Layout `.card` |
|---|---|
| Base (móvil) | `flex-direction: column` — carátula ancho 100%, aspect-ratio 16:9 |
| ≤ 520px | Contenido centrado; botones Editar/Borrar apilados o a ancho completo |
| ≥ 521px | Fila con wrap; acciones al pie de la ficha |
| ≥ 900px | Fila única desktop; acciones en columna a la derecha |

### Criterios de aceptación móvil

- [x] Sin desbordamiento horizontal (`overflow-x: hidden` en body).
- [x] Formulario CRUD usable con campos apilados en pantallas estrechas.
- [x] Ranking legible: nombre, tags y horas visibles sin ampliar.
- [x] Botones Editar/Borrar **no** comprimen la ficha en columna lateral en móvil.
- [x] Detalle accesible con cierre por botón, backdrop o tecla Escape.
- [x] Animaciones reducidas si el usuario tiene `prefers-reduced-motion`.
- [x] CSS con cache bust (`vault.css?v=N`) tras cambios de layout.

Especificación detallada de interfaz: [interfaz-temasSpec.md](./docs/modules/interfaz-temas/interfaz-temasSpec.md).

## 9. Integración RAWG API

La edición principal consume [RAWG.io](https://rawg.io/apidocs) en tiempo real para **puntuación** y **opiniones** en la ficha de detalle. Los datos de Supabase **no se modifican**.

### Archivos

| Archivo | Rol |
|---|---|
| `app/js/rawg.js` | Búsqueda por nombre, reviews paginadas, cálculo de puntuación |
| `app/js/app.js` | `renderDetalle`, `cargarOpinionesRawg`, `actualizarPuntuacionDetalle` |

### Puntuación en ficha (`#detalle-puntuacion-rawg`)

1. Al abrir la ficha se busca el juego: `GET /api/games?search=NOMBRE`.
2. Cálculo (solo pantalla):
   - `metacritic` disponible → `(metacritic / 10).toFixed(1)` (escala 1–10).
   - Si no → `rating` RAWG (0–5) × 2 → `.toFixed(1)`.
   - Si ninguno → `"N/A"`.
3. Mientras carga se muestra `★ …`; mismo estilo visual que el tag de puntuación del listado.
4. El listado y el orden del ranking siguen usando `puntuacion` de Supabase.

### Opiniones en ficha

- 5 reviews iniciales por página; botón **Ver más opiniones** carga la siguiente página sin recargar.
- Si no hay más: mensaje **Sin más opiniones disponibles**.
- Fuente: `GET /api/games/{id}/reviews`.

### Criterios de aceptación RAWG

- [x] Puntuación en detalle desde RAWG; Supabase intacto.
- [x] Opiniones dinámicas con paginación.
- [x] Caché en memoria del ID RAWG por nombre (compartida entre puntuación y reviews).
- [x] Estilo Cyberpunk en comentarios y botón «Ver más».

## 10. Audio de fondo

Música ambiental en la edición principal (`app/index.html`) para reforzar la atmósfera Cyberpunk.

### Archivo

| Elemento | Valor |
|---|---|
| Carpeta | `app/audio/` |
| Nombre del archivo | `Soundflakes - Horizon of the Unknown.mp3` |
| Ruta en HTML | `audio/Soundflakes - Horizon of the Unknown.mp3` |
| Fuente | [Freesound #592086](https://freesound.org/s/592086/) |
| Autor | SoundFlakes |
| Licencia | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

> El archivo **no** se versiona automáticamente: debe copiarse manualmente a `app/audio/` antes de desplegar.

### Comportamiento (protocolo)

1. El `<audio>` tiene `loop` y `preload="auto"`; volumen por defecto **0.45**.
2. **No** hay autoplay al cargar (política de navegadores).
3. Al abrir la web aparece un **splash screen** (`#splash-screen`) que bloquea el contenido.
4. El usuario pulsa **ENTER GAME VAULT** (`#splash-enter`):
   - El splash se oculta con animación y se elimina del DOM.
   - La música inicia automáticamente en bucle.
   - Se muestra el botón flotante `#music-toggle`.
5. Botón flotante `#music-toggle` (esquina inferior derecha):
   - 🔇 = silenciado / en pausa
   - 🔊 = reproduciendo
6. Clic en el botón alterna play/pause en cualquier momento.
7. Crédito visible en el footer con enlace a Freesound.

### Criterios de aceptación audio

- [x] Carpeta `app/audio/` definida en el repositorio.
- [x] Splash screen Cyberpunk con botón **ENTER GAME VAULT**.
- [x] Música inicia al pulsar entrar (interacción explícita del usuario).
- [x] Botón flotante con estilo Cyberpunk (`vault.css` → `.music-toggle`).
- [x] Toggle 🔊 / 🔇 operativo tras entrar.
- [x] Atribución CC BY 4.0 en footer.

## 11. Referencias

- Base de datos: [docs/database.md](./docs/database.md)
- Arquitectura: [docs/architecture.md](./docs/architecture.md)
