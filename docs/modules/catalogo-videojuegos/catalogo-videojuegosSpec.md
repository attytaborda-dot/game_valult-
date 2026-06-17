# Especificación — Catálogo de videojuegos

## 1. Objetivo

Gestionar el CRUD de la tabla `videojuegos` en Supabase y la media extendida en `localStorage`.

## 2. Funcionalidades

| Acción | Comportamiento |
|---|---|
| Listar | GET al cargar; deduplicación por nombre |
| Crear | Validar → POST (solo campos Supabase) → media local → recargar |
| Editar | Rellenar formulario → PATCH → media local → recargar |
| Eliminar | Confirmación → DELETE |
| Filtrar | Cliente: nombre, consola, género, desarrollador |

### Campos media local (no Supabase)

- `portada`, `enlace_compra`, `horas_promedio`
- Formulario: `#portada`, `#enlace_compra`, `#horas`
- Persistencia: `guardarMediaLocal()` → clave `gamevault_media`

## 3. Reglas

- Obligatorios: nombre, consola, género, modalidad, desarrollador, año.
- `verificado` default `false`.
- `horas` opcional (entero, horas para completar historia principal).
- No enviar campos media en POST/PATCH a Supabase.
- Tras cada operación, recargar listado.

## 4. Datos

La estructura de la tabla está en [database.md](../../database.md).

## 5. Criterios de aceptación

- [x] GET carga registros al iniciar.
- [x] POST, PATCH, DELETE funcionan con mensajes de estado.
- [x] Filtro sin llamadas extra a la API.
- [x] Horas, portada y enlace se guardan en localStorage.

## 6. Implementación

Ver [catalogo-videojuegosImplementation.md](./catalogo-videojuegosImplementation.md).
