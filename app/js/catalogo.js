/**
 * Catálogo GAME VAULT — portadas, tiendas, sinopsis y comunidad.
 * Prioridad portada: catálogo > localStorage (override manual) > fallback.
 */
const MEDIA_LS_KEY = 'gamevault_media';
const CATALOGO_PORTADAS_REVISION = 2;
const MEDIA_REVISION_KEY = 'gamevault_media_revision';

/** Al actualizar portadas en el catálogo, sube la revisión y limpia URLs antiguas en localStorage. */
(function migrarPortadasCatalogo() {
  try {
    if (Number(localStorage.getItem(MEDIA_REVISION_KEY) || 0) >= CATALOGO_PORTADAS_REVISION) return;
    const all = JSON.parse(localStorage.getItem(MEDIA_LS_KEY) || '{}');
    for (const id of Object.keys(all)) {
      delete all[id].portada;
      if (!all[id]?.enlace_compra && all[id]?.horas_promedio == null) delete all[id];
    }
    localStorage.setItem(MEDIA_LS_KEY, JSON.stringify(all));
    localStorage.setItem(MEDIA_REVISION_KEY, String(CATALOGO_PORTADAS_REVISION));
  } catch { /* ignore */ }
})();

const CATALOGO_JUEGOS = {
  'animal crossing: new horizons': {
    portada: 'https://static0.thegamerimages.com/wordpress/wp-content/uploads/2020/08/Animal-Crossing-New-Horizons.jpg?w=1600&h=900&fit=crop',
    enlace_compra: 'https://www.nintendo.com/us/store/products/animal-crossing-new-horizons-switch/',
    sinopsis: 'Tras llegar a una isla desierta, construyes tu comunidad ideal, decoras tu hogar y convives con vecinos antropomórficos en un ciclo relajado de días y estaciones.'
  },
  'the last of us part ii': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2531310/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2531310/The_Last_of_Us_Part_II_Remastered/',
    sinopsis: 'Cinco años después del brote, Ellie emprende un viaje de venganza por un mundo devastado donde cada decisión cuestiona la moral y el coste de la violencia.'
  },
  'cyberpunk 2077': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    sinopsis: 'En Night City encarnas a V, un mercenario que busca un implante único mientras te enfrentas a corporaciones, gánsteres y el destino de tu propia conciencia.'
  },
  "demon's souls": {
    portada: 'https://wallpapercave.com/wp/wp12749681.jpg',
    enlace_compra: 'https://store.playstation.com/en-us/product/UP9000-PPSA01342_00-DEMONSSOULS00000',
    sinopsis: 'En el reino de Boletaria, un caballero debe atravesar fortalezas malditas y derrotar a demonios ancestrales en un RPG de acción implacable y atmosférico.'
  },
  'metroid dread': {
    portada: 'https://metroid.nintendo.com/dread/assets/images/media/videos/planet-zdr-dread-report-8-trailer.jpg',
    enlace_compra: 'https://www.nintendo.com/us/store/products/metroid-dread-switch/',
    sinopsis: 'Samus Aran investiga planetas alienígenas perseguida por máquinas letales E.M.M.I., combinando exploración, sigilo y comben en un thriller de ciencia ficción.'
  },
  'halo infinite': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg',
    enlace_compra: 'https://www.xbox.com/es-ES/games/store/halo-infinite/9NXVBB1N9G6H',
    sinopsis: 'El Jefe Maestro regresa para enfrentarse a los Banished en un anillo halo dañado, con campaña épica y combates multijugador en arenas abiertas.'
  },
  'forza horizon 5': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/',
    sinopsis: 'Explora un México ficticio lleno de festivales, biomas variados y cientos de coches mientras compites en carreras arcade de mundo abierto.'
  },
  'elden ring': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    sinopsis: 'Como Sinldizado, recorres las Tierras Intermedias buscando fragmentos del Círculo de Elden para restaurar el orden en un mundo abierto oscuro y misterioso.'
  },
  'god of war ragnarok': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2322010/God_of_War_Ragnarok/',
    sinopsis: 'Kratos y Atreus enfrentan el destino del Ragnarök mientras viajan por los Nueve Reinos en una epopeya sobre padre, hijo y el precio del poder.'
  },
  'stray': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1332010/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1332010/Stray/',
    sinopsis: 'Un gato callejero recorre una ciudad cyberpunk habitada por robots, resolviendo puzzles y descubriendo qué quedó de la humanidad.'
  },
  'pokemon scarlet & violet': {
    portada: 'https://wallpapercave.com/wp/wp11250860.jpg',
    enlace_compra: 'https://www.nintendo.com/us/store/products/pokemon-scarlet-switch/',
    sinopsis: 'En Paldea estudias en la academia, recorres un mapa abierto en busca de tesoros legendarios y vives el camino hacia convertirte en campeón.'
  },
  'the legend of zelda: tears of the kingdom': {
    portada: 'https://wallpapercave.com/wp/wp12278132.jpg',
    enlace_compra: 'https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/',
    sinopsis: 'Link despierta tras el cataclismo y debe reunir fragmentos de Hyrule flotante usando nuevas habilidades de ultrahand y fusión para salvar el reino.'
  },
  "baldur's gate 3": {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',
    sinopsis: 'Infectado por un parásito mental, lideras un grupo de aventureros en los Reinos Olvidados buscando cura mientras tus decisiones redefinen el destino del mundo.'
  },
  "marvel's spider-man 2": {
    portada: 'https://mcdn.wallpapersafari.com/medium/64/85/9uBS4g.jpg',
    enlace_compra: 'https://store.playstation.com/en-us/concept/10002456',
    sinopsis: 'Peter Parker y Miles Morales protegen Nueva York del simbionte Venom y nuevas amenazas en un blockbuster de acción con dos héroes intercambiables.'
  },
  'starfield': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1716740/Starfield/',
    sinopsis: 'Como miembro de Constelación exploras más de mil planetas, construyes naves y desentrañas misterios cósmicos en un RPG espacial de Bethesda.'
  },
  'helldivers 2': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/553850/HELLDIVERS_2/',
    sinopsis: 'Lucha por la Super Tierra en misiones cooperativas contra hordas alienígenas, donde el fuego amigo y el caos táctico son parte del espectáculo.'
  },
  'elden ring: shadow of the erdtree': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2778580/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2778580/ELDEN_RING_Shadow_of_the_Erdtree/',
    sinopsis: 'Expansión que lleva al Sinldizado a las Tierras de la Sombra, un reino paralelo lleno de jefes legendarios y secretos sobre Miquella.'
  },
  'black myth: wukong': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
    sinopsis: 'Basado en Viaje al Oeste, controlas al Rey Mono en un action RPG con combates espectaculares y mitología china llevada al extremo visual.'
  },
  'astro bot': {
    portada: 'https://wallpapercg.com/media/ts_orig/27032.webp',
    enlace_compra: 'https://store.playstation.com/en-us/concept/10003923',
    sinopsis: 'Astro lidera una misión de rescate galáctica en un platform 3D lleno de referencias al catálogo PlayStation y mecánicas creativas.'
  },
  'resident evil 4 remake': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2050650/Resident_Evil_4/',
    sinopsis: 'Leon S. Kennedy rescata a la hija del presidente en una aldea europea infectada, reimaginando el clásico con terror, acción y tensión renovados.'
  },
  'final fantasy vii rebirth': {
    portada: 'https://cdn.mos.cms.futurecdn.net/cCxRTVWPFoGwxy8aEaAg5T-768-80.jpg.webp',
    enlace_compra: 'https://store.playstation.com/en-us/concept/10002684',
    sinopsis: 'Cloud y sus aliados abandonan Midgar para explorar un mundo abierto y enfrentar el legado de Sephiroth en la segunda parte del remake de FFVII.'
  },
};

/** Horas promedio para completar (historia principal; fuente catálogo). */
const HORAS_PROMEDIO = {
  'animal crossing: new horizons': 200,
  'the last of us part ii': 26,
  'cyberpunk 2077': 62,
  "demon's souls": 38,
  'metroid dread': 13,
  'halo infinite': 16,
  'forza horizon 5': 42,
  'elden ring': 78,
  'god of war ragnarok': 36,
  'stray': 8,
  'pokemon scarlet & violet': 58,
  'the legend of zelda: tears of the kingdom': 82,
  "baldur's gate 3": 100,
  "marvel's spider-man 2": 28,
  'starfield': 52,
  'helldivers 2': 55,
  'elden ring: shadow of the erdtree': 35,
  'black myth: wukong': 38,
  'astro bot': 14,
  'resident evil 4 remake': 22,
  'final fantasy vii rebirth': 54,
};

function normalizarNombre(nombre) {
  return (nombre || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function catalogoDe(juego) {
  return CATALOGO_JUEGOS[normalizarNombre(juego.nombre)] || {};
}

function portadaPlaceholder(nombre) {
  const texto = escHtml((nombre || '?').slice(0, 16));
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="340" viewBox="0 0 240 340">
      <rect width="240" height="340" fill="#0c0c0c"/>
      <rect x="10" y="10" width="220" height="320" fill="none" stroke="#c9a227" stroke-width="2"/>
      <text x="120" y="165" text-anchor="middle" fill="#888" font-family="sans-serif" font-size="13">SIN PORTADA</text>
      <text x="120" y="190" text-anchor="middle" fill="#e8e4dc" font-family="sans-serif" font-size="11">${texto}</text>
    </svg>`
  )}`;
}

function cargarMediaLocal() {
  try { return JSON.parse(localStorage.getItem(MEDIA_LS_KEY)) || {}; } catch { return {}; }
}

function mediaLocalDe(id) { return cargarMediaLocal()[String(id)] || null; }

function guardarMediaLocal(id, datos) {
  const all = cargarMediaLocal();
  const key = String(id);
  const prev = all[key] || {};
  const next = { ...prev, ...datos };
  if (!next.portada && !next.enlace_compra && next.horas_promedio == null) delete all[key];
  else all[key] = next;
  localStorage.setItem(MEDIA_LS_KEY, JSON.stringify(all));
}

function aplicarMediaLocal(juego) {
  const m = mediaLocalDe(juego.id);
  if (m?.enlace_compra) juego.enlace_compra = m.enlace_compra;
  if (m?.horas_promedio != null) juego.horas_promedio = m.horas_promedio;
  return juego;
}

function portadaDe(juego) {
  const catalog = catalogoDe(juego).portada;
  const custom = mediaLocalDe(juego.id)?.portada;
  if (catalog) return catalog;
  if (custom) return custom;
  return portadaPlaceholder(juego.nombre);
}

function enlaceCompraDe(juego) {
  if (juego.enlace_compra) return juego.enlace_compra;
  if (catalogoDe(juego).enlace_compra) return catalogoDe(juego).enlace_compra;
  return `https://store.steampowered.com/search/?term=${encodeURIComponent(juego.nombre)}`;
}

function sinopsisDe(juego) {
  return catalogoDe(juego).sinopsis
    || `Aventura en ${juego.genero || 'videojuegos'} desarrollada por ${juego.desarrollador || 'estudio desconocido'}. Explora, completa objetivos y vive una experiencia única en ${juego.consola || 'múltiples plataformas'}.`;
}


function horasPromedioDe(juego) {
  if (juego.horas_promedio != null && juego.horas_promedio !== '') {
    const n = Number(juego.horas_promedio);
    return Number.isFinite(n) ? n : null;
  }
  const cat = catalogoDe(juego).horas_promedio;
  if (cat != null) return cat;
  return HORAS_PROMEDIO[normalizarNombre(juego.nombre)] ?? null;
}

function formatearHoras(horas) {
  if (horas == null || !Number.isFinite(horas)) return '—';
  return `~${horas} h`;
}

window.PORTADA_FALLBACK = portadaPlaceholder('');

function deduplicarJuegos(juegos) {
  const unicos = new Map();
  for (const j of juegos) {
    const clave = normalizarNombre(j.nombre);
    const prev = unicos.get(clave);
    if (!prev || j.id < prev.id) unicos.set(clave, j);
  }
  return Array.from(unicos.values()).sort((a, b) => a.id - b.id);
}
