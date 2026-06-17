# GAME VAULT

Aplicación CRUD para verificar y rankear videojuegos con Supabase REST API.

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
    ├── js/
    └── editions/
```

## Inicio

Abre **`app/index.html`** en el navegador — edición principal **Cyberpunk 2077** (ranking, ficha, sinopsis, comunidad, horas promedio).

## Documentación

| Documento | Contenido |
|---|---|
| [spec.md](./spec.md) | Objetivo, alcance, reglas globales, módulos |
| [docs/GAME-VAULT.md](./docs/GAME-VAULT.md) | Índice de documentación |
| [docs/database.md](./docs/database.md) | Tabla `videojuegos`, endpoints, campos |
| [docs/architecture.md](./docs/architecture.md) | Carpetas, capas, clases, layout responsive |
| [docs/modules/](./docs/modules/) | Spec + implementación por módulo |

## Layout responsive

| Viewport | Comportamiento |
|---|---|
| **≤ 520px** | Fichas **apiladas** (carátula arriba, datos, botones abajo); formulario y buscador a ancho completo |
| **521–899px** | Ficha en fila con acciones al pie; drawer de detalle al seleccionar |
| **≥ 900px** | Ficha horizontal estilo desktop (portada + datos + acciones) |
| **≥ 1100px** | Galería y panel detalle en dos columnas a igual altura |

Ver criterios completos en [spec.md § Mobile-first](./spec.md#8-mobile-first-dispositivos-móviles).

> Tras actualizar estilos, recarga forzada (**Cmd+Shift+R**) para cargar `vault.css?v=4`.

## Música de fondo

La edición principal incluye música ambiental **"Horizon of the Unknown"** (SoundFlakes, CC BY 4.0).

1. Copia el archivo a:
   ```text
   app/audio/Soundflakes - Horizon of the Unknown.mp3
   ```
2. Abre `app/index.html` — verás la **pantalla de entrada** (splash).
3. Pulsa **ENTER GAME VAULT** para entrar; la música arranca automáticamente en bucle.
4. Usa el botón flotante **🔊 / 🔇** (esquina inferior derecha) para silenciar o reanudar.

Protocolo completo, licencia y criterios: [spec.md § Audio de fondo](./spec.md#10-audio-de-fondo).

## Tecnologías

HTML · CSS · JavaScript puro · Supabase REST (`fetch`, `async`/`await`) · `localStorage` para media extendida
