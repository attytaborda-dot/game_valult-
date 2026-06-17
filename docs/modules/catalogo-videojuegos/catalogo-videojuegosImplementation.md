# Implementación — Catálogo de videojuegos

## Archivos

| Archivo | Rol |
|---|---|
| `app/js/app.js` | `ListaJuegos`, `leerFormulario`, CRUD fetch |
| `app/js/catalogo.js` | `guardarMediaLocal`, `aplicarMediaLocal`, dedup |
| `app/index.html` | Formulario `#panel-form` |

## CRUD Supabase

```javascript
// POST / PATCH — solo campos core
const { portada, enlace_compra, horas_promedio, ...core } = leerFormulario();
await fetch(URL_API, { method: 'POST', body: JSON.stringify([core]) });
guardarMediaLocal(id, { portada, enlace_compra, horas_promedio });
```

## leerFormulario()

Devuelve objeto con campos API + media local:

```javascript
{
  nombre, consola, genero, modalidad, desarrollador,
  'año_lanzamiento': anio,
  puntuacion, verificado,
  portada, enlace_compra,
  horas_promedio: number | null
}
```

## aplicarMediaLocal

Al cargar juegos desde GET, enriquece cada `Videojuego` con datos de `localStorage` antes de renderizar.

## Deduplicación

`deduplicarJuegos()` — conserva el registro con `id` menor por nombre normalizado.
