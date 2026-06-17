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
| **≥ 1100px** | Galería y ficha en dos columnas a **igual altura**; scroll independiente en cada panel |
| **521–1099px** | Ficha como **panel deslizante** (overlay inferior); sin scroll al final de la página |
| **≤ 520px** | Mobile-first: fichas apiladas, carátulas centradas, formulario y buscador a ancho completo |

Ver criterios completos en [spec.md § Mobile-first](./spec.md#8-mobile-first-dispositivos-móviles).

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
