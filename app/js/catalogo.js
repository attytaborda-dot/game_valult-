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
    sinopsis: 'Tras llegar a una isla desierta, construyes tu comunidad ideal, decoras tu hogar y convives con vecinos antropomórficos en un ciclo relajado de días y estaciones.',
    comentarios: [
      { autor: 'LunaIsla', texto: 'Perfecto para desconectar. Cada día tiene su ritmo y nunca presiona.' },
      { autor: 'TomNookFan', texto: 'La personalización de la isla es infinita. Llevo 200 horas y sigo encontrando detalles.' },
      { autor: 'PescaPro', texto: 'Jugar con amigos multiplica la diversión. Ideal para sesiones cortas.' },
    ],
  },
  'the last of us part ii': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2531310/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2531310/The_Last_of_Us_Part_II_Remastered/',
    sinopsis: 'Cinco años después del brote, Ellie emprende un viaje de venganza por un mundo devastado donde cada decisión cuestiona la moral y el coste de la violencia.',
    comentarios: [
      { autor: 'JoelForever', texto: 'Narrativa brutal y madura. La banda sonora te rompe el alma.' },
      { autor: 'StealthQueen', texto: 'El combate sigue siendo tenso. Cada recursos cuenta en modo supervivencia.' },
      { autor: 'CineGamer', texto: 'Parece una película interactiva. Actuaciones faciales de otro nivel.' },
    ],
  },
  'cyberpunk 2077': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    sinopsis: 'En Night City encarnas a V, un mercenario que busca un implante único mientras te enfrentas a corporaciones, gánsteres y el destino de tu propia conciencia.',
    comentarios: [
      { autor: 'NightCityFixer', texto: 'Phantom Liberty lo redime todo. Misiones con decisiones que duelen.' },
      { autor: 'NeonRider', texto: 'Recorrer la ciudad de noche con synthwave de fondo es hipnótico.' },
      { autor: 'BuildMaster', texto: 'Cada build de personaje cambia por completo la forma de jugar.' },
    ],
  },
  "demon's souls": {
    portada: 'https://wallpapercave.com/wp/wp12749681.jpg',
    enlace_compra: 'https://store.playstation.com/en-us/product/UP9000-PPSA01342_00-DEMONSSOULS00000',
    sinopsis: 'En el reino de Boletaria, un caballero debe atravesar fortalezas malditas y derrotar a demonios ancestrales en un RPG de acción implacable y atmosférico.',
    comentarios: [
      { autor: 'ParryKing', texto: 'Cada victoria se siente ganada a pulso. La tensión no afloja nunca.' },
      { autor: 'LoreHunter', texto: 'El lore está escondido en descripciones de objetos. Adictivo descifrarlo.' },
      { autor: 'OneMoreTry', texto: 'Morir forma parte del aprendizaje. Cuando lo entiendes, engancha.' },
    ],
  },
  'metroid dread': {
    portada: 'https://metroid.nintendo.com/dread/assets/images/media/videos/planet-zdr-dread-report-8-trailer.jpg',
    enlace_compra: 'https://www.nintendo.com/us/store/products/metroid-dread-switch/',
    sinopsis: 'Samus Aran investiga planetas alienígenas perseguida por máquinas letales E.M.M.I., combinando exploración, sigilo y comben en un thriller de ciencia ficción.',
    comentarios: [
      { autor: 'SamusMain', texto: 'Los momentos de huida de los E.M.M.I. son puro terror en 2D.' },
      { autor: 'MapExplorer', texto: 'El diseño de niveles es magistral. Siempre hay un atajo nuevo.' },
      { autor: 'SpeedRunner_01', texto: 'Fluidez increíble en Switch. Ideal para rejugar al 100%.' },
    ],
  },
  'halo infinite': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg',
    enlace_compra: 'https://www.xbox.com/es-ES/games/store/halo-infinite/9NXVBB1N9G6H',
    sinopsis: 'El Jefe Maestro regresa para enfrentarse a los Banished en un anillo halo dañado, con campaña épica y combates multijugador en arenas abiertas.',
    comentarios: [
      { autor: 'Spartan117', texto: 'El gunplay de Halo sigue siendo referencia. Satisfacción pura.' },
      { autor: 'ForgeBuilder', texto: 'El modo Forge da vida infinita a la comunidad creativa.' },
      { autor: 'CampaignFan', texto: 'La campaña mezcla escala cinematográfica con libertad táctica.' },
    ],
  },
  'forza horizon 5': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/',
    sinopsis: 'Explora un México ficticio lleno de festivales, biomas variados y cientos de coches mientras compites en carreras arcade de mundo abierto.',
    comentarios: [
      { autor: 'DriftMX', texto: 'Visualmente espectacular. Cada atardecer merece una foto.' },
      { autor: 'GarageKing', texto: 'Tuning profundo y eventos comunitarios cada semana.' },
      { autor: 'CasualRacer', texto: 'Accesible para novatos pero con reto para puristas.' },
    ],
  },
  'elden ring': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    sinopsis: 'Como Sinldizado, recorres las Tierras Intermedias buscando fragmentos del Círculo de Elden para restaurar el orden en un mundo abierto oscuro y misterioso.',
    comentarios: [
      { autor: 'TarnishedOne', texto: 'Explorar sin mapa es una aventura en sí misma. Cada rincón esconde secretos.' },
      { autor: 'BossBreaker', texto: 'Derrotar un jefe tras 30 intentos no tiene precio. Pura dopamina.' },
      { autor: 'CoopSunbro', texto: 'Jugar en cooperativo transforma la experiencia. Comunidad legendaria.' },
    ],
  },
  'god of war ragnarok': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2322010/God_of_War_Ragnarok/',
    sinopsis: 'Kratos y Atreus enfrentan el destino del Ragnarök mientras viajan por los Nueve Reinos en una epopeya sobre padre, hijo y el precio del poder.',
    comentarios: [
      { autor: 'BoyListen', texto: 'La relación Kratos-Atreus es el corazón del juego. Te emociona.' },
      { autor: 'AxeThrower', texto: 'Combate visceral y cinematográfico. Cada encuentro es un espectáculo.' },
      { autor: 'NorseMyth', texto: 'Reinterpretación brillante de la mitología nórdica.' },
    ],
  },
  'stray': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1332010/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1332010/Stray/',
    sinopsis: 'Un gato callejero recorre una ciudad cyberpunk habitada por robots, resolviendo puzzles y descubriendo qué quedó de la humanidad.',
    comentarios: [
      { autor: 'CatPerson', texto: 'Ser un gato es divertidísimo. Maullar y tirar objetos nunca pasó de moda.' },
      { autor: 'RobotFriend', texto: 'B-12 es el compañero perfecto. Historia corta pero muy emotiva.' },
      { autor: 'PhotoMode', texto: 'La estética neón invita a perderse explorando cada callejón.' },
    ],
  },
  'pokemon scarlet & violet': {
    portada: 'https://wallpapercave.com/wp/wp11250860.jpg',
    enlace_compra: 'https://www.nintendo.com/us/store/products/pokemon-scarlet-switch/',
    sinopsis: 'En Paldea estudias en la academia, recorres un mapa abierto en busca de tesoros legendarios y vives el camino hacia convertirte en campeón.',
    comentarios: [
      { autor: 'PaldeaWalk', texto: 'Por fin un mundo Pokémon verdaderamente abierto. Explorar engancha.' },
      { autor: 'TeamStar', texto: 'Las misiones de gimnasio son las más originales de la saga.' },
      { autor: 'ShinyHunter', texto: 'Cazar variocolor en coop es adictivo. Cientos de horas garantizadas.' },
    ],
  },
  'the legend of zelda: tears of the kingdom': {
    portada: 'https://wallpapercave.com/wp/wp12278132.jpg',
    enlace_compra: 'https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/',
    sinopsis: 'Link despierta tras el cataclismo y debe reunir fragmentos de Hyrule flotante usando nuevas habilidades de ultrahand y fusión para salvar el reino.',
    comentarios: [
      { autor: 'Ultrahand', texto: 'Construir vehículos absurdos es mitad del juego. Creatividad sin límites.' },
      { autor: 'SkyExplorer', texto: 'Los cielos y las profundidades duplican el mapa. Siempre hay algo nuevo.' },
      { autor: 'ZeldaFan99', texto: 'Secuela que supera a Breath of the Wild. Obra maestra absoluta.' },
    ],
  },
  "baldur's gate 3": {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',
    sinopsis: 'Infectado por un parásito mental, lideras un grupo de aventureros en los Reinos Olvidados buscando cura mientras tus decisiones redefinen el destino del mundo.',
    comentarios: [
      { autor: 'DiceRoller', texto: 'Cada diálogo puede cambiar la campaña. Rejugabilidad infinita.' },
      { autor: 'RomanceClub', texto: 'Las relaciones entre compañeros están increíblemente escritas.' },
      { autor: 'Tactician', texto: 'El combate por turnos en altura y cobertura es profundísimo.' },
    ],
  },
  "marvel's spider-man 2": {
    portada: 'https://mcdn.wallpapersafari.com/medium/64/85/9uBS4g.jpg',
    enlace_compra: 'https://store.playstation.com/en-us/concept/10002456',
    sinopsis: 'Peter Parker y Miles Morales protegen Nueva York del simbionte Venom y nuevas amenazas en un blockbuster de acción con dos héroes intercambiables.',
    comentarios: [
      { autor: 'WebSlinger', texto: 'Balancearse por Manhattan nunca fue tan fluido. Puro poder fantasía.' },
      { autor: 'SymbioteFan', texto: 'La historia del simbionte está muy lograda. Momentos oscuros y épicos.' },
      { autor: 'DualHero', texto: 'Alternar entre Peter y Miles mantiene el combate siempre fresco.' },
    ],
  },
  'starfield': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/1716740/Starfield/',
    sinopsis: 'Como miembro de Constelación exploras más de mil planetas, construyes naves y desentrañas misterios cósmicos en un RPG espacial de Bethesda.',
    comentarios: [
      { autor: 'SpaceTrucker', texto: 'Personalizar la nave es adictivo. Cada planeta es una nueva historia.' },
      { autor: 'Constellation', texto: 'La campaña principal engancha si le das tiempo. Muy Bethesda.' },
      { autor: 'ModReady', texto: 'Con mods de la comunidad el juego mejora muchísimo.' },
    ],
  },
  'helldivers 2': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/553850/HELLDIVERS_2/',
    sinopsis: 'Lucha por la Super Tierra en misiones cooperativas contra hordas alienígenas, donde el fuego amigo y el caos táctico son parte del espectáculo.',
    comentarios: [
      { autor: 'DemocracyNow', texto: 'Jugar en squad de 4 es caos glorioso. Nunca sabes si sobrevivirás.' },
      { autor: 'FriendlyFire', texto: 'Te matan tus amigos más que los enemigos. Risas aseguradas.' },
      { autor: 'GalaxyWar', texto: 'La guerra global persistente hace que cada misión importe.' },
    ],
  },
  'elden ring: shadow of the erdtree': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2778580/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2778580/ELDEN_RING_Shadow_of_the_Erdtree/',
    sinopsis: 'Expansión que lleva al Sinldizado a las Tierras de la Sombra, un reino paralelo lleno de jefes legendarios y secretos sobre Miquella.',
    comentarios: [
      { autor: 'DLCChampion', texto: 'Dificultad al máximo. Messmer es de los mejores jefes de FromSoftware.' },
      { autor: 'MapAddict', texto: 'El mapa vertical de la expansión es una maravilla de diseño.' },
      { autor: 'LoreSeeker', texto: 'Cierra hilos narrativos de forma ambigua y brillante.' },
    ],
  },
  'black myth: wukong': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
    sinopsis: 'Basado en Viaje al Oeste, controlas al Rey Mono en un action RPG con combates espectaculares y mitología china llevada al extremo visual.',
    comentarios: [
      { autor: 'MonkeyKing', texto: 'Las transformaciones en combate son espectaculares. Puro espectáculo.' },
      { autor: 'MythLover', texto: 'Cada escenario parece una pintura tradicional en movimiento.' },
      { autor: 'SoulsFan', texto: 'Dificultad exigente pero justa. Muy gratificante dominarlo.' },
    ],
  },
  'astro bot': {
    portada: 'https://wallpapercg.com/media/ts_orig/27032.webp',
    enlace_compra: 'https://store.playstation.com/en-us/concept/10003923',
    sinopsis: 'Astro lidera una misión de rescate galáctica en un platform 3D lleno de referencias al catálogo PlayStation y mecánicas creativas.',
    comentarios: [
      { autor: 'DualSenseFan', texto: 'El mando DualSense cobra vida. Cada mundo explota el hardware.' },
      { autor: 'NostalgiaGamer', texto: 'Las referencias a PlayStation son un regalo para fans de largo recorrido.' },
      { autor: 'PlatformPro', texto: 'Plataformas precisas y alegres. Joya del año para muchos.' },
    ],
  },
  'resident evil 4 remake': {
    portada: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
    enlace_compra: 'https://store.steampowered.com/app/2050650/Resident_Evil_4/',
    sinopsis: 'Leon S. Kennedy rescata a la hija del presidente en una aldea europea infectada, reimaginando el clásico con terror, acción y tensión renovados.',
    comentarios: [
      { autor: 'AshleyHelp', texto: 'El remake mejora todo sin traicionar el original. Ashley ya no es un peso.' },
      { autor: 'KnifeOnly', texto: 'El combate es más táctico. Parry con cuchillo es adictivo.' },
      { autor: 'HorrorFan', texto: 'Atmósfera opresiva y diseño de sonido que te pone los pelos de punta.' },
    ],
  },
  'final fantasy vii rebirth': {
    portada: 'https://cdn.mos.cms.futurecdn.net/cCxRTVWPFoGwxy8aEaAg5T-768-80.jpg.webp',
    enlace_compra: 'https://store.playstation.com/en-us/concept/10002684',
    sinopsis: 'Cloud y sus aliados abandonan Midgar para explorar un mundo abierto y enfrentar el legado de Sephiroth en la segunda parte del remake de FFVII.',
    comentarios: [
      { autor: 'AerithCloud', texto: 'El mundo abierto invita a perderse. Minijuegos y side quests de lujo.' },
      { autor: 'ATBBattler', texto: 'El combate en tiempo real con pausas tácticas es el mejor de la saga.' },
      { autor: 'FF7Forever', texto: 'Emocionalmente devastador. La banda sonora te acompaña días después.' },
    ],
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

function comentariosDe(juego) {
  const c = catalogoDe(juego).comentarios;
  if (c?.length) return c;
  return [
    { autor: 'JugadorAnon', texto: 'Muy recomendable si te gusta el género. Vale la pena probarlo.' },
    { autor: 'ComunidadVault', texto: 'Buena relación calidad-precio y horas de entretenimiento.' },
    { autor: 'RankChecker', texto: 'Puntuación sólida en nuestro ranking. Experiencia memorable.' },
  ];
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
