# Base de datos — GAME VAULT

## 1. Objetivo

Única fuente de verdad sobre la base de datos Supabase existente. No propone creación de tablas.

## 2. Conexión

| Parámetro | Valor |
|---|---|
| Proyecto | `uxgmyuissisxphghujox` |
| URL base | `https://uxgmyuissisxphghujox.supabase.co` |
| Endpoint | `/rest/v1/videojuegos` |

## 3. Tabla `videojuegos`

| Campo | En Supabase | Descripción |
|---|---|---|
| `id` | Sí | PK autogenerada |
| `nombre` | Sí | Nombre del juego |
| `consola` | Sí | Plataforma |
| `genero` | Sí | Género |
| `modalidad` | Sí | Single / online / etc. |
| `desarrollador` | Sí | Estudio |
| `año_lanzamiento` | Sí | Año (API con tilde; JS: `anio`) |
| `puntuacion` | Sí | 1–10 |
| `verificado` | Sí | Boolean |
| `portada` | **No** | Ver media local |
| `enlace_compra` | **No** | Idem |
| `horas_promedio` | **No** | Horas para completar (historia principal) |

**Registros actuales:** 21 únicos.

### Media extendida (fuera de Supabase)

Clave `localStorage`: `gamevault_media`

```json
{
  "42": {
    "portada": "https://...",
    "enlace_compra": "https://...",
    "horas_promedio": 62
  }
}
```

Prioridad de lectura: **localStorage** → **catálogo** (`catalogo.js`, mapa `HORAS_PROMEDIO`) → fallback.

## 4. Relaciones

Tabla autocontenida; sin foreign keys conocidas.

## 5. Endpoints REST

| Operación | Método | URL |
|---|---|---|
| Listar | GET | `?order=id.asc` |
| Crear | POST | `/videojuegos` body `[{...}]` |
| Actualizar | PATCH | `?id=eq.{id}` |
| Eliminar | DELETE | `?id=eq.{id}` |

### Headers

```text
apikey: <ANON_KEY>
Authorization: Bearer <ANON_KEY>
Content-Type: application/json     (POST, PATCH)
Prefer: return=representation      (POST, PATCH)
```

## 6. Integridad

- No enviar `id` en POST.
- No enviar `portada`, `enlace_compra` ni `horas_promedio` en POST/PATCH (error `PGRST204`).
- `verificado`: boolean.

> Pendiente: confirmar políticas RLS exactas.
