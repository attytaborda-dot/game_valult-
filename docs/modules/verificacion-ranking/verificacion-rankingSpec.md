# Especificación — Verificación y ranking

## 1. Objetivo

Marcar juegos como verificados y mostrar ranking por `puntuacion`, con datos básicos y **horas promedio** visibles en cada ficha del listado.

## 2. Funcionalidades

### Verificación

- Toggle `#verificado` en formulario.
- Etiqueta en ficha detalle y listado: Verificado / Pendiente.
- Contadores en header.
- Borde verde izquierdo en `.card.verified`.

### Ranking

- Orden descendente por `puntuacion`.
- Badge `#1`, `#2`… en carátula del listado.
- Sin puntuación al final del ranking.
- Filtro aplicado antes de ordenar.
- Etiqueta `⏱ ~N h` en cada ficha (horas promedio).

### Galería desktop

- Lista con scroll interno alineada en altura con panel de ficha.

## 3. Reglas

- Verificación independiente del ranking.
- Contadores se recalculan tras CRUD.
- Horas no afectan el orden del ranking.

## 4. Criterios de aceptación

- [x] `verificado` persiste en Supabase.
- [x] `#1` = mayor puntuación visible.
- [x] Ranking respeta filtro activo.
- [x] Horas visibles en cada ficha del ranking.

## 5. Implementación

Ver [verificacion-rankingImplementation.md](./verificacion-rankingImplementation.md).
