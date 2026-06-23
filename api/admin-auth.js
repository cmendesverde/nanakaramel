// POST   /api/admin-auth  → login (devuelve cookie nk_admin)
// GET    /api/admin-auth  → verifica si la sesión es válida
// DELETE /api/admin-auth  → logout (borra la cookie)
import { makeToken, isValidToken, setCookieHeader } from './_lib/auth.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'same-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'POST') {
    const b        = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
      // Sin password configurado: modo dev, acceso libre
      setCookieHeader(res);
      return res.status(200).json({ ok: true, dev: true });
    }

    if (b.password !== password) {
      return res.status(401).json({ ok: false, error: 'contraseña incorrecta' });
    }

    setCookieHeader(res);
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'GET') {
    const cookie = req.headers.cookie || '';
    const match  = cookie.match(/nk_admin=([^;]+)/);
    const token  = match?.[1] || '';
    const valid  = !process.env.ADMIN_PASSWORD || isValidToken(token);
    return res.status(valid ? 200 : 401).json({ ok: valid });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', 'nk_admin=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ ok: false, error: 'método no permitido' });
}
