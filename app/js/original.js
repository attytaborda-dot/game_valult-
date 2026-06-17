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
  }
}

class ListaJuegos {
  constructor() {
    this.juegos    = [];
    this.filtroTxt = '';
  }

  async recuperar() {
    msg('█ ACCEDIENDO A BASE DE DATOS...', 'info');
    try {
      const res = await fetch(URL_API + '?order=id.asc', {
        method: 'GET', headers: HEADERS,
      });
      if (!res.ok) throw new Error(await res.text());
      const datos = await res.json();
      this.juegos = deduplicarJuegos(datos.map(d => new Videojuego(d)));
      this.mostrar();
      actualizarStats(this.juegos);
      msg('', '');
    } catch (e) {
      msg('■ ERROR DE CONEXIÓN: ' + e.message, 'error');
      console.error(e);
    }
  }

  async guardar() {
    const datos = leerFormulario();
    if (!datos) return;
    msg('█ PROCESANDO...', 'info');
    try {
      const res = await fetch(URL_API, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify([datos]),
      });
      if (!res.ok) throw new Error(await res.text());
      msg('✓ REGISTRO INSERTADO', 'ok');
      limpiar();
      await this.recuperar();
    } catch (e) {
      msg('■ ERROR: ' + e.message, 'error');
      console.error(e);
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
    document.getElementById('verificado').checked = j.verificado;
    actualizarToggleLabel(j.verificado);
    document.getElementById('idJuego').value = j.id;
    document.getElementById('form-title').textContent    = 'MODIFICAR REGISTRO';
    document.getElementById('btnGuardar').textContent    = '▶ ACTUALIZAR';
    document.getElementById('btnCancelar').style.display = 'inline-block';
    document.getElementById('btnGuardar').onclick = () => lista.actualizar();
    msg('█ MODO EDICIÓN ACTIVO', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async actualizar() {
    const id    = document.getElementById('idJuego').value;
    const datos = leerFormulario();
    if (!datos) return;
    msg('█ ACTUALIZANDO...', 'info');
    try {
      const res = await fetch(`${URL_API}?id=eq.${id}`, {
        method: 'PATCH', headers: HEADERS,
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error(await res.text());
      msg('✓ REGISTRO ACTUALIZADO', 'ok');
      modoCrear();
      await this.recuperar();
    } catch (e) {
      msg('■ ERROR: ' + e.message, 'error');
      console.error(e);
    }
  }

  async borrar(id) {
    if (!confirm('¿ELIMINAR ESTE REGISTRO?')) return;
    msg('█ ELIMINANDO...', 'info');
    try {
      const res = await fetch(`${URL_API}?id=eq.${id}`, {
        method: 'DELETE', headers: HEADERS,
      });
      if (!res.ok) throw new Error(await res.text());
      msg('✓ REGISTRO ELIMINADO', 'ok');
      await this.recuperar();
    } catch (e) {
      msg('■ ERROR: ' + e.message, 'error');
      console.error(e);
    }
  }

  filtrar(txt) {
    this.filtroTxt = txt.toUpperCase();
    this.mostrar();
  }

  mostrar() {
    const el = document.getElementById('listado');
    let juegos = this.juegos;

    if (this.filtroTxt) {
      juegos = juegos.filter(j =>
        j.nombre.toUpperCase().includes(this.filtroTxt) ||
        j.consola.toUpperCase().includes(this.filtroTxt) ||
        j.genero.toUpperCase().includes(this.filtroTxt) ||
        j.desarrollador.toUpperCase().includes(this.filtroTxt)
      );
    }

    if (!juegos.length) {
      el.innerHTML = '<p class="loading-txt">█ SIN RESULTADOS</p>';
      return;
    }

    el.innerHTML = juegos.map(j => `
      <div class="card${j.verificado ? ' verified' : ''}">
        <div class="card-left">
          <div class="card-name">${j.nombre}</div>
          <div class="card-meta">
            <span class="tag tag-consola">${j.consola}</span>
            <span class="tag tag-genero">${j.genero}</span>
            <span class="tag tag-modal">${j.modalidad}</span>
          </div>
          <div class="card-meta" style="margin-top:.3rem">
            <span class="dev-info">${j.desarrollador} · ${j.anio}</span>
            <span class="tag tag-score">★ ${j.puntuacion}</span>
            <span class="tag ${j.verificado ? 'tag-verified' : 'tag-pending'}">${j.verificado ? '✓ VERIFICADO' : '? PENDIENTE'}</span>
          </div>
        </div>
        <div class="card-right">
          <button class="btn-edit" onclick="lista.editar(${j.id})">EDITAR</button>
          <button class="btn-del"  onclick="lista.borrar(${j.id})">BORRAR</button>
        </div>
      </div>
    `).join('');
  }
}

function leerFormulario() {
  const nombre        = getVal('nombre');
  const consola       = getVal('consola');
  const genero        = getVal('genero');
  const modalidad     = getVal('modalidad');
  const desarrollador = getVal('desarrollador');
  const anio          = parseInt(getVal('anio'));
  const puntuacion    = parseFloat(getVal('puntuacion'));
  const verificado    = document.getElementById('verificado').checked;

  if (!nombre || !consola || !genero || !modalidad || !desarrollador || !anio) {
    msg('■ ERROR: COMPLETA TODOS LOS CAMPOS', 'error');
    return null;
  }
  return { nombre, consola, genero, modalidad, desarrollador, 'año_lanzamiento': anio, puntuacion, verificado };
}

function getVal(id) { return document.getElementById(id).value.trim(); }
function setVal(id, v) { document.getElementById(id).value = v; }

function limpiar() {
  ['nombre','consola','genero','modalidad','desarrollador','anio','puntuacion','idJuego']
    .forEach(id => setVal(id, ''));
  document.getElementById('verificado').checked = false;
  actualizarToggleLabel(false);
}

function modoCrear() {
  limpiar();
  document.getElementById('form-title').textContent    = 'INSERTAR NUEVO REGISTRO';
  document.getElementById('btnGuardar').textContent    = '▶ EJECUTAR';
  document.getElementById('btnCancelar').style.display = 'none';
  document.getElementById('btnGuardar').onclick = () => lista.guardar();
}

function msg(txt, tipo) {
  const el = document.getElementById('msg');
  el.textContent = txt;
  el.className = 'msg-line ' + tipo;
}

function actualizarStats(juegos) {
  document.getElementById('total-count').textContent    = `REGISTROS: ${juegos.length}`;
  document.getElementById('verified-count').textContent = `VERIFICADOS: ${juegos.filter(j=>j.verificado).length}`;
}

function actualizarToggleLabel(checked) {
  document.getElementById('toggle-label').textContent = checked ? 'VERIFICADO' : 'NO VERIFICADO';
}

const lista = new ListaJuegos();
document.getElementById('btnGuardar').onclick  = () => lista.guardar();
document.getElementById('btnCancelar').onclick = () => modoCrear();
document.getElementById('verificado').onchange = function() { actualizarToggleLabel(this.checked); };
lista.recuperar();