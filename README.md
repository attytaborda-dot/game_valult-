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
| **&lt; 1100px** | Ficha como **panel deslizante** (overlay inferior); sin scroll al final de la página |
| **≤ 520px** | Mobile-first: fichas apiladas, carátulas centradas |

## Tecnologías

HTML · CSS · JavaScript puro · Supabase REST (`fetch`, `async`/`await`) · `localStorage` para media extendida
