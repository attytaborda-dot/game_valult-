const URL_API = 'https://uxgmyuissisxphghujox.supabase.co/rest/v1/videojuegos';
const KEY     = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4Z215dWlzc2lzeHBoZ2h1am94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDc1NDcsImV4cCI6MjA5NTk4MzU0N30.It8fA7oGOFFo3ZdQtEZmW3NNuz6Hj-De7FJoTD3uKgA';

const HEADERS = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

class Videojuego {
  constructor(d) {
    this.id            = d.id;
    this.nombre        = d.nombre;
    this.consola       = d.consola;
    this.genero        = d.genero;
    this.modalidad     = d.modalidad;
    this.desarrollador = d.desarrollador;
    this.anio          = d['año_lanzamiento'];
    this.puntuacion    = d.puntuacion;
    this.verificado    = d.verificado;
    this.portada       = d.portada || null;
    this.enlace_compra = d.enlace_compra || null;
    this.horas_promedio = d.horas_promedio ?? null;
  }
}

class ListaJuegos {
  constructor() {
    this.juegos           = [];
    this.filtroTxt        = '';
    this.seleccionadoId   = null;
  }

  async recuperar() {
    msg('Accediendo al archivo de juegos...', 'info');
    try {
      const res = await fetch(URL_API + '?order=id.asc', { method: 'GET', headers: HEADERS });
      if (!res.ok) throw new Error(await res.text());
      const datos = await res.json();
      this.juegos = deduplicarJuegos(datos.map(d => aplicarMediaLocal(new Videojuego(d))));
      if (this.seleccionadoId && !this.juegos.find(j => j.id === this.seleccionadoId)) {
        this.seleccionadoId = null;
      }
      this.mostrar();
      this.renderDetalle();
      this.actualizarVistaDetalle();
      actualizarStats(this.juegos);
      msg('', '');
    } catch (e) {
      msg('Error de conexión: ' + e.message, 'error');
      console.error(e);
    }
  }

  async guardar() {
    const datos = leerFormulario();
    if (!datos) return;
    const { portada, enlace_compra, horas_promedio, ...core } = datos;
    msg('Procesando...', 'info');
    try {
      const res = await fetch(URL_API, { method: 'POST', headers: HEADERS, body: JSON.stringify([core]) });
      if (!res.ok) throw new Error(await res.text());
      const creado = await res.json();
      if (creado[0]?.id) guardarMediaLocal(creado[0].id, { portada, enlace_compra, horas_promedio });
      msg('Registro insertado', 'ok');
      limpiar();
      await this.recuperar();
    } catch (e) {
      msg('Error: ' + e.message, 'error');
    }
  }

  editar(id) {
    const j = this.juegos.find(j => j.id === id);
    if (!j) return;
    setVal('nombre', j.nombre);
    setVal('consola', j.consola);
    setVal('genero', j.genero);
    setVal('modalidad', j.modalidad);
    setVal('desarrollador', j.desarrollador);
    setVal('anio', j.anio);
    setVal('puntuacion', j.puntuacion);
    setVal('portada', mediaLocalDe(j.id)?.portada || catalogoDe(j).portada || '');
    setVal('enlace_compra', j.enlace_compra || catalogoDe(j).enlace_compra || '');
    setVal('horas', horasPromedioDe(j) ?? '');
    actualizarVistaPrevia();
    document.getElementById('verificado').checked = j.verificado;
    actualizarToggleLabel(j.verificado);
    document.getElementById('idJuego').value = j.id;
    document.getElementById('form-title').textContent = 'Modificar registro';
    document.getElementById('btnGuardar').textContent = 'Actualizar';
    document.getElementById('btnCancelar').style.display = 'inline-block';
    document.getElementById('btnGuardar').onclick = () => lista.actualizar();
    msg('Modo edición activo', 'info');
    document.querySelector('.panel-form').scrollIntoView({ behavior: 'smooth' });
  }

  async actualizar() {
    const id = document.getElementById('idJuego').value;
    const datos = leerFormulario();
    if (!datos) return;
    const { portada, enlace_compra, horas_promedio, ...core } = datos;
    msg('Actualizando...', 'info');
    try {
      const res = await fetch(`${URL_API}?id=eq.${id}`, { method: 'PATCH', headers: HEADERS, body: JSON.stringify(core) });
      if (!res.ok) throw new Error(await res.text());
      guardarMediaLocal(id, { portada, enlace_compra, horas_promedio });
      msg('Registro actualizado', 'ok');
      modoCrear();
      await this.recuperar();
    } catch (e) {
      msg('Error: ' + e.message, 'error');
    }
  }

  async borrar(id) {
    if (!confirm('¿Eliminar este registro?')) return;
    if (this.seleccionadoId === id) this.seleccionadoId = null;
    try {
      const res = await fetch(`${URL_API}?id=eq.${id}`, { method: 'DELETE', headers: HEADERS });
      if (!res.ok) throw new Error(await res.text());
      msg('Registro eliminado', 'ok');
      await this.recuperar();
    } catch (e) {
      msg('Error: ' + e.message, 'error');
    }
  }

  filtrar(txt) {
    this.filtroTxt = txt.toUpperCase();
    this.mostrar();
  }

  seleccionar(id) {
    this.seleccionadoId = id;
    this.mostrar();
    this.renderDetalle();
    this.actualizarVistaDetalle();
  }

  cerrarDetalle() {
    this.seleccionadoId = null;
    this.mostrar();
    this.renderDetalle();
    this.actualizarVistaDetalle();
  }

  esVistaApilada() {
    return window.matchMedia('(max-width: 1099px)').matches;
  }

  actualizarVistaDetalle() {
    const panel = document.getElementById('detalle-panel');
    const backdrop = document.getElementById('detalle-backdrop');
    const cerrar = document.getElementById('detalle-cerrar');
    const abierto = Boolean(this.seleccionadoId && this.esVistaApilada());

    document.body.classList.toggle('detalle-abierto', abierto);
    panel?.classList.toggle('detalle-overlay-open', abierto);
    if (backdrop) backdrop.hidden = !abierto;
    if (cerrar) cerrar.hidden = !abierto;
  }

  renderDetalle() {
    const panel = document.getElementById('detalle-contenido');
    const wrap  = document.getElementById('detalle-panel');
    if (!panel || !wrap) return;

    if (!this.seleccionadoId) {
      wrap.classList.remove('is-open');
      panel.innerHTML = '<p class="detalle-placeholder">Selecciona un juego del ranking para ver carátula, sinopsis y opiniones de la comunidad.</p>';
      this.actualizarVistaDetalle();
      return;
    }

    const j = this.juegos.find(x => x.id === this.seleccionadoId);
    if (!j) {
      this.seleccionadoId = null;
      this.renderDetalle();
      return;
    }

    wrap.classList.add('is-open');
    const portada = escHtml(portadaDe(j));
    const compra  = escHtml(enlaceCompraDe(j));
    const coms    = comentariosDe(j);
    const horas   = formatearHoras(horasPromedioDe(j));

    panel.innerHTML = `
      <div class="detalle-grid">
        <div class="detalle-cover-wrap">
          <img class="detalle-cover" src="${portada}" alt="Carátula de ${escHtml(j.nombre)}"
            onerror="this.onerror=null;this.src=window.PORTADA_FALLBACK">
        </div>
        <div class="detalle-info">
          <h2 class="detalle-title">${escHtml(j.nombre)}</h2>
          <div class="detalle-tags">
            <span>${escHtml(j.consola)}</span>
            <span>${escHtml(j.genero)}</span>
            <span>★ ${j.puntuacion ?? '—'}</span>
            <span class="tag-horas">⏱ ${horas}</span>
            <span class="${j.verificado ? 'tag-ok' : 'tag-pend'}">${j.verificado ? 'Verificado' : 'Pendiente'}</span>
          </div>
          <p class="detalle-meta">${escHtml(j.desarrollador)} · ${escHtml(j.anio)} · ${escHtml(j.modalidad)} · ${horas} promedio</p>
          <h3 class="detalle-sub">Sinopsis</h3>
          <p class="detalle-sinopsis">${escHtml(sinopsisDe(j))}</p>
          <a href="${compra}" class="btn-buy btn-grow" target="_blank" rel="noopener noreferrer">Adquirir juego</a>
        </div>
      </div>
      <section class="comunidad">
        <h3 class="detalle-sub">Comunidad — 3 opiniones</h3>
        <div class="comentarios-list">
          ${coms.map(c => `
            <article class="comentario">
              <header class="comentario-head">
                <span class="comentario-autor">${escHtml(c.autor)}</span>
              </header>
              <p class="comentario-texto">${escHtml(c.texto)}</p>
            </article>
          `).join('')}
        </div>
      </section>`;
    this.actualizarVistaDetalle();
  }

  mostrar() {
    const el = document.getElementById('listado');
    let juegos = [...this.juegos];

    if (this.filtroTxt) {
      juegos = juegos.filter(j =>
        j.nombre.toUpperCase().includes(this.filtroTxt) ||
        j.consola.toUpperCase().includes(this.filtroTxt) ||
        j.genero.toUpperCase().includes(this.filtroTxt) ||
        j.desarrollador.toUpperCase().includes(this.filtroTxt)
      );
    }

    juegos.sort((a, b) => (b.puntuacion ?? -1) - (a.puntuacion ?? -1));

    if (!juegos.length) {
      el.innerHTML = '<p class="loading-txt">Sin resultados en el ranking</p>';
      return;
    }

    el.innerHTML = juegos.map((j, i) => {
      const portada = escHtml(portadaDe(j));
      const horas   = formatearHoras(horasPromedioDe(j));
      const sel = this.seleccionadoId === j.id ? ' selected' : '';
      return `
      <article class="card${j.verificado ? ' verified' : ''}${sel}" role="button" tabindex="0"
        onclick="lista.seleccionar(${j.id})"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();lista.seleccionar(${j.id})}">
        <div class="card-cover">
          <span class="rank-badge">#${i + 1}</span>
          <img src="${portada}" alt="" loading="lazy" class="cover-img"
            onerror="this.onerror=null;this.src=window.PORTADA_FALLBACK">
        </div>
        <div class="card-body">
          <h3 class="card-name">${escHtml(j.nombre)}</h3>
          <p class="card-dev">${escHtml(j.desarrollador)} · ${escHtml(j.anio)}</p>
          <div class="card-tags">
            <span class="tag-consola">${escHtml(j.consola)}</span>
            <span class="tag-genero">${escHtml(j.genero)}</span>
            <span class="tag-score">★ ${j.puntuacion ?? '—'}</span>
            <span class="tag-horas">⏱ ${horas}</span>
            <span class="${j.verificado ? 'tag-ok' : 'tag-pend'}">${j.verificado ? '✓ Verificado' : 'Pendiente'}</span>
          </div>
          <p class="card-meta">${escHtml(j.modalidad)}</p>
        </div>
        <div class="card-actions" onclick="event.stopPropagation()">
          <button class="btn-edit btn-grow" onclick="lista.editar(${j.id})">Editar</button>
          <button class="btn-del btn-grow" onclick="lista.borrar(${j.id})">Borrar</button>
        </div>
      </article>`;
    }).join('');
  }
}

function esUrlValida(valor) {
  if (!valor) return true;
  try {
    const u = new URL(valor);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function marcarCampo(id, invalido) {
  document.getElementById(id)?.classList.toggle('is-invalid', invalido);
}

function limpiarMarcasInvalidas() {
  document.querySelectorAll('.panel-form .is-invalid').forEach((el) => el.classList.remove('is-invalid'));
}

function leerFormulario() {
  limpiarMarcasInvalidas();

  const nombre = getVal('nombre');
  const consola = getVal('consola');
  const genero = getVal('genero');
  const modalidad = getVal('modalidad');
  const desarrollador = getVal('desarrollador');
  const anioRaw = getVal('anio');
  const puntuacionRaw = getVal('puntuacion');
  const horasRaw = getVal('horas');
  const portada = getVal('portada');
  const enlace_compra = getVal('enlace_compra');
  const verificado = document.getElementById('verificado').checked;

  if (!nombre) {
    marcarCampo('nombre', true);
    msg('El nombre del juego es obligatorio', 'error');
    return null;
  }
  if (!consola) {
    marcarCampo('consola', true);
    msg('Selecciona una plataforma', 'error');
    return null;
  }
  if (!genero) {
    marcarCampo('genero', true);
    msg('Selecciona un género', 'error');
    return null;
  }
  if (!modalidad) {
    marcarCampo('modalidad', true);
    msg('Selecciona una modalidad', 'error');
    return null;
  }
  if (!desarrollador) {
    marcarCampo('desarrollador', true);
    msg('El desarrollador es obligatorio', 'error');
    return null;
  }

  const anio = parseInt(anioRaw, 10);
  if (!anioRaw || !Number.isInteger(anio) || anio < 1980 || anio > 2030) {
    marcarCampo('anio', true);
    msg('El año debe ser un número entero entre 1980 y 2030', 'error');
    return null;
  }

  let puntuacion = null;
  if (puntuacionRaw) {
    puntuacion = parseFloat(puntuacionRaw);
    if (!Number.isFinite(puntuacion) || puntuacion < 1 || puntuacion > 10) {
      marcarCampo('puntuacion', true);
      msg('La puntuación debe estar entre 1 y 10', 'error');
      return null;
    }
  }

  let horas_promedio = null;
  if (horasRaw) {
    const horas = parseInt(horasRaw, 10);
    if (!Number.isInteger(horas) || horas < 1 || horas > 500) {
      marcarCampo('horas', true);
      msg('Las horas deben ser un entero entre 1 y 500', 'error');
      return null;
    }
    horas_promedio = horas;
  }

  if (!esUrlValida(portada)) {
    marcarCampo('portada', true);
    msg('La URL de carátula no es válida (usa http:// o https://)', 'error');
    return null;
  }
  if (!esUrlValida(enlace_compra)) {
    marcarCampo('enlace_compra', true);
    msg('El enlace de compra no es válido (usa http:// o https://)', 'error');
    return null;
  }

  return {
    nombre, consola, genero, modalidad, desarrollador,
    'año_lanzamiento': anio, puntuacion, verificado,
    portada: portada || null,
    enlace_compra: enlace_compra || null,
    horas_promedio,
  };
}

function actualizarVistaPrevia() {
  const url = getVal('portada');
  const wrap = document.getElementById('portada-preview-wrap');
  const img = document.getElementById('portada-preview');
  if (!wrap || !img) return;
  if (!url) { wrap.hidden = true; img.removeAttribute('src'); return; }
  wrap.hidden = false;
  img.src = url;
  img.onerror = () => { img.onerror = null; img.src = window.PORTADA_FALLBACK; };
}

function getVal(id) { return document.getElementById(id).value.trim(); }
function setVal(id, v) { document.getElementById(id).value = v; }

function limpiar() {
  limpiarMarcasInvalidas();
  ['nombre','consola','genero','modalidad','desarrollador','anio','puntuacion','horas','portada','enlace_compra','idJuego']
    .forEach(id => setVal(id, ''));
  document.getElementById('verificado').checked = false;
  actualizarToggleLabel(false);
  actualizarVistaPrevia();
}

function modoCrear() {
  limpiar();
  document.getElementById('form-title').textContent = 'Insertar nuevo registro';
  document.getElementById('btnGuardar').textContent = 'Ejecutar';
  document.getElementById('btnCancelar').style.display = 'none';
  document.getElementById('btnGuardar').onclick = () => lista.guardar();
}

function msg(txt, tipo) {
  const el = document.getElementById('msg');
  el.textContent = txt;
  el.className = 'msg-line ' + tipo;
}

function actualizarStats(juegos) {
  document.getElementById('total-count').textContent = `Registros: ${juegos.length}`;
  document.getElementById('verified-count').textContent = `Verificados: ${juegos.filter(j => j.verificado).length}`;
}

function actualizarToggleLabel(checked) {
  document.getElementById('toggle-label').textContent = checked ? 'Verificado' : 'No verificado';
}

const lista = new ListaJuegos();
document.getElementById('btnGuardar').onclick = () => lista.guardar();
document.getElementById('btnCancelar').onclick = () => modoCrear();
document.getElementById('verificado').onchange = function() { actualizarToggleLabel(this.checked); };
document.getElementById('portada').oninput = actualizarVistaPrevia;
document.getElementById('detalle-cerrar')?.addEventListener('click', () => lista.cerrarDetalle());
document.getElementById('detalle-backdrop')?.addEventListener('click', () => lista.cerrarDetalle());
window.addEventListener('resize', () => lista.actualizarVistaDetalle());
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lista.seleccionadoId && lista.esVistaApilada()) lista.cerrarDetalle();
});
lista.recuperar();
