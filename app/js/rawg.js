/**
 * RAWG API — búsqueda de juegos y opiniones de jugadores.
 */
const RAWG_API_KEY = 'a31fe3d2d3fc45a79f044d5e54e4e169';
const RAWG_API_BASE = 'https://api.rawg.io/api';
const RAWG_PAGE_SIZE = 5;

const rawgGameIdCache = new Map();

async function rawgFetch(path, params = {}) {
  const url = new URL(`${RAWG_API_BASE}${path}`);
  url.searchParams.set('key', RAWG_API_KEY);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`RAWG respondió ${res.status}`);
  return res.json();
}

/**
 * Busca un juego por nombre y devuelve { id, name, reviewsCount } o null.
 */
async function buscarJuegoRawg(nombre) {
  const key = normalizarNombre(nombre);
  if (rawgGameIdCache.has(key)) return rawgGameIdCache.get(key);

  const data = await rawgFetch('/games', { search: nombre, page_size: 20 });
  if (!data.results?.length) return null;

  const exact = data.results.find(g => normalizarNombre(g.name) === key);
  const partial = data.results.find(g => {
    const n = normalizarNombre(g.name);
    return n.includes(key) || key.includes(n);
  });
  const game = exact || partial || data.results[0];
  const entry = {
    id: game.id,
    name: game.name,
    reviewsCount: game.reviews_text_count ?? game.reviews_count ?? 0,
    metacritic: game.metacritic ?? null,
    rating: game.rating ?? null,
  };
  rawgGameIdCache.set(key, entry);
  return entry;
}

/**
 * Calcula puntuación 1–10 desde metacritic (/10) o rating RAWG (×2).
 */
function formatearPuntuacionRawg(juego) {
  if (juego?.metacritic != null && juego.metacritic !== '') {
    return (Number(juego.metacritic) / 10).toFixed(1);
  }
  if (juego?.rating != null && juego.rating !== '') {
    return (Number(juego.rating) * 2).toFixed(1);
  }
  return 'N/A';
}

function rawgReviewANormalizado(review) {
  const user = review.user || {};
  return {
    autor: user.username || user.full_name || 'Jugador RAWG',
    texto: (review.text || '').trim(),
    rating: review.rating ?? null,
  };
}

/**
 * Obtiene una página de reviews de un juego RAWG.
 */
async function obtenerReviewsRawg(gameId, page = 1, pageSize = RAWG_PAGE_SIZE) {
  const data = await rawgFetch(`/games/${gameId}/reviews`, { page, page_size: pageSize });
  return {
    count: data.count ?? 0,
    next: data.next,
    results: (data.results || []).map(rawgReviewANormalizado).filter(r => r.texto),
  };
}

window.RAWG_PAGE_SIZE = RAWG_PAGE_SIZE;
window.buscarJuegoRawg = buscarJuegoRawg;
window.obtenerReviewsRawg = obtenerReviewsRawg;
window.formatearPuntuacionRawg = formatearPuntuacionRawg;
