# Implementación — Verificación y ranking

## Archivos

| Archivo | Función |
|---|---|
| `app/js/app.js` | `mostrar()` — orden, badges, tags verificado y horas |
| `app/index.html` | `#filtro`, `#verificado`, stats en header |
| `app/css/vault.css` | `.card.verified`, `.rank-badge`, `.tag-horas` |

## Ordenamiento

```javascript
juegos.sort((a, b) => (b.puntuacion ?? -1) - (a.puntuacion ?? -1));
```

## Datos visibles por ficha (sin expandir)

- Ranking `#N`
- Nombre, desarrollador, año
- Consola, género, puntuación, horas, verificado
- Modalidad

## Horas en listado

```javascript
const horas = formatearHoras(horasPromedioDe(j));
// → "~62 h" o "—"
```

Ver [comunidad-fichas](../comunidad-fichas/comunidad-fichasImplementation.md) para fuente de datos.
