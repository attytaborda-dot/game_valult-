# Documentación consolidada ��� GAME VAULT

La documentación del proyecto está **separada por módulos** para facilitar el mantenimiento.

## ��ndice

| Documento | Descripción |
|---|---|
| [README.md](../README.md) | Inicio rápido y estructura del repositorio |
| [spec.md](../spec.md) | Especificación general y criterios de aceptación |
| [database.md](./database.md) | Supabase + media local (`horas_promedio`, portada, enlace) |
| [architecture.md](./architecture.md) | Capas, layout responsive, RAWG, funciones clave |

## Código de la aplicación

Todo el HTML, CSS y JS vive en **[`app/`](../app/)**:

- Entrada: [`app/index.html`](../app/index.html)
- Estilos: [`app/css/`](../app/css/)
- Lógica: [`app/js/`](../app/js/)
- Temas: [`app/editions/`](../app/editions/)

## Módulos

| Módulo | Spec | Implementación |
|---|---|---|
| Catálogo CRUD | [catalogo-videojuegosSpec.md](./modules/catalogo-videojuegos/catalogo-videojuegosSpec.md) | [catalogo-videojuegosImplementation.md](./modules/catalogo-videojuegos/catalogo-videojuegosImplementation.md) |
| Verificación y ranking | [verificacion-rankingSpec.md](./modules/verificacion-ranking/verificacion-rankingSpec.md) | [verificacion-rankingImplementation.md](./modules/verificacion-ranking/verificacion-rankingImplementation.md) |
| Comunidad y fichas | [comunidad-fichasSpec.md](./modules/comunidad-fichas/comunidad-fichasSpec.md) | [comunidad-fichasImplementation.md](./modules/comunidad-fichas/comunidad-fichasImplementation.md) |
| Interfaz y temas | [interfaz-temasSpec.md](./modules/interfaz-temas/interfaz-temasSpec.md) | [interfaz-temasImplementation.md](./modules/interfaz-temas/interfaz-temasImplementation.md) |

## Regla

No dupliques información entre archivos; enlaza al documento fuente correspondiente.
