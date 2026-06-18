# GAME VAULT

Aplicación CRUD para verificar y rankear videojuegos con Supabase REST API, fichas enriquecidas con **RAWG API** (puntuación y opiniones en tiempo real).

## Estructura del repositorio

```text
game-vault/
├── README.md
├── spec.md
├── docs/                   # Documentación modular
└── app/                    # Código de la aplicación
    ├── index.html          # Edición principal Cyberpunk 2077
    ├── audio/              # Música de fondo (ver spec § Audio)
    ├── css/
    │   └── vault.css
    ├── js/
    │   ├── catalogo.js     # Sinopsis, portadas, horas
    │   ├── rawg.js         # RAWG: puntuación y reviews
    │   └── app.js          # CRUD, ranking, ficha
    └── editions/           # Temas alternativos (sin RAWG)
```

## Inicio

Abre **`app/index.html`** en el navegador — edición principal **Cyberpunk 2077** (ranking, ficha, sinopsis, opiniones RAWG, horas promedio).

## Documentación

| Documento | Contenido |
|---|---|
| [spec.md](./spec.md) | Objetivo, alcance, RAWG §9, audio §10, módulos |
| [docs/GAME-VAULT.md](./docs/GAME-VAULT.md) | Índice de documentación |
| [docs/database.md](./docs/database.md) | Tabla `videojuegos`, endpoints, campos |
| [docs/architecture.md](./docs/architecture.md) | Carpetas, capas, RAWG, layout responsive |
| [docs/modules/](./docs/modules/) | Spec + implementación por módulo |

## Integración RAWG (ficha de detalle)

| Dato | Fuente en pantalla | Persistencia |
|---|---|---|
| Orden del ranking | Supabase `puntuacion` | Supabase |
| `★` en listado | Supabase `puntuacion` | Supabase |
| `★` en ficha detalle | RAWG `metacritic` o `rating` | No (tiempo real) |
| Opiniones | RAWG `/games/{id}/reviews` | No |

Detalle en [spec.md §9](./spec.md#9-integración-rawg-api).

## Layout responsive

| Viewport | Comportamiento |
|---|---|
| **≤ 520px** | Fichas **apiladas** (carátula arriba, datos, botones abajo); formulario y buscador a ancho completo |
| **521–899px** | Ficha en fila con acciones al pie; drawer de detalle al seleccionar |
| **≥ 900px** | Ficha horizontal estilo desktop (portada + datos + acciones) |
| **≥ 1100px** | Galería y panel detalle en dos columnas a igual altura |

Ver criterios completos en [spec.md § Mobile-first](./spec.md#8-mobile-first-dispositivos-móviles).

> Tras actualizar estilos o scripts, recarga forzada (**Cmd+Shift+R**) para cargar `vault.css?v=6`, `rawg.js?v=2`, `app.js?v=3`.

## Música de fondo

La edición principal incluye música ambiental **"Horizon of the Unknown"** (SoundFlakes, CC BY 4.0).

1. Copia el archivo a:
   ```text
   app/audio/Soundflakes - Horizon of the Unknown.mp3
   ```
2. Abre `app/index.html` — verás la **pantalla de entrada** (splash).
3. Pulsa **ENTER GAME VAULT** para entrar; la música arranca automáticamente en bucle.
4. Usa el botón flotante **🔊 / 🔇** (esquina inferior derecha) para silenciar o reanudar.

Protocolo completo: [spec.md § Audio](./spec.md#10-audio-de-fondo).

## Tecnologías

HTML · CSS · JavaScript puro · Supabase REST · RAWG API · `localStorage` para media extendida
