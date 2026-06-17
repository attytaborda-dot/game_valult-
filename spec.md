# Especificación general — GAME VAULT

## 1. Objetivo general

Gestionar y **verificar** un catálogo de videojuegos en Supabase, con **ranking por puntuación**, **ficha detallada** al seleccionar un juego, **sinopsis**, **feedback comunitario** (3 comentarios) y **horas promedio de completado** visibles en el listado.

## 2. Alcance funcional

- CRUD sobre la tabla `videojuegos`.
- Marcar registros como verificados.
- Filtrar por texto.
- Estadísticas en header (total y verificados).
- Ranking ordenado por `puntuacion`.
- Panel de ficha con carátula ajustada, sinopsis, horas y comentarios.
- **Horas promedio** visibles en cada ficha del ranking (sin expandir).
- Carátulas, enlaces de compra y horas (localStorage + catálogo).
- Layout **mobile-first** con overlay de ficha en tablet/móvil.

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
- [x] Clic en ficha abre detalle con sinopsis y 3 comentarios.
- [x] Horas promedio visibles en listado sin expandir ficha.
- [x] Desktop: galería y panel detalle a igual altura.
- [x] Tablet/móvil: ficha en overlay sin scroll al pie de página.
- [x] Hover en fichas no solapa texto sobre carátula.
- [x] Estética Cyberpunk 2077 con glitch en título.

## 8. Referencias

- Base de datos: [docs/database.md](./docs/database.md)
- Arquitectura: [docs/architecture.md](./docs/architecture.md)
