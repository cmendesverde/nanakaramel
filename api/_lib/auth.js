// Autenticación del panel /admin — HMAC diario, sin estado en servidor.
import { createHmac } from 'crypto';

const SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';

function dayToken(offset = 0) {
  const day = Math.floor(Date.now() / 86_400_000) + offset;
  return createHmac('sha256', SECRET || 'dev').update(String(day)).digest('hex');
}

export function makeToken() {
  return dayToken(0);
}

export function isValidToken(token) {
  // Válido durante el día actual y el anterior (margen zona horaria)
  return token === dayToken(0) || token === dayToken(-1);
}

// Middleware: devuelve false y escribe 401 si no está autenticado.
// En dev (ADMIN_PASSWORD no configurado) deja pasar con aviso.
export function requireAdmin(req, res) {
  if (!process.env.ADMIN_PASSWORD) {
    console.warn('[auth] ADMIN_PASSWORD no configurado — acceso sin restricciones');
    return true;
  }
  const cookie = req.headers.cookie || '';
  const match  = cookie.match(/nk_admin=([^;]+)/);
  const token  = match?.[1] || req.headers['x-admin-token'] || '';
  if (isValidToken(token)) return true;
  res.status(401).json({ ok: false, error: 'no autorizado' });
  return false;
}

export function setCookieHeader(res) {
  const token = makeToken();
  res.setHeader('Set-Cookie', [
    `nk_admin=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=172800`
  ]);
  return token;
}
