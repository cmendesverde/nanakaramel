// PATCH  /api/orders/:id  → actualiza estado / importe / nota / fecha
// DELETE /api/orders/:id  → elimina el pedido
// Acepta tanto el dialecto del panel /admin (estado, importeFinal, notaInterna, fecha)
// como el canónico (status, importe_final, nota_interna, pickup_date).
import { sql, VALID_STATUS } from '../_lib/db.js';
import { requireAdmin }      from '../_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-admin-token');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (!requireAdmin(req, res)) return;

  const id = req.query.id ?? (req.url?.split('/').pop() ?? '').split('?')[0];
  if (!id || isNaN(Number(id))) return res.status(400).json({ ok: false, error: 'id inválido' });

  try {
    if (req.method === 'DELETE') {
      await sql`DELETE FROM orders WHERE id = ${id};`;
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'PATCH') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

      // Acepta status (canónico) o estado (panel /admin)
      const statusRaw = b.status || b.estado || null;
      const status    = statusRaw && VALID_STATUS.includes(statusRaw) ? statusRaw : null;

      // Acepta nombres canónicos y camelCase del panel
      const pickup_date   = b.pickup_date   || b.fecha        || null;
      const pickup_note   = b.pickup_note   || null;
      const importe_final = b.importe_final ?? b.importeFinal ?? null;
      const nota_interna  = b.nota_interna  || b.notaInterna  || null;
      const customer      = b.customer      || b.nombre       || null;
      const phone         = b.phone         || b.telefono     || null;
      const email         = b.email         || null;

      // Actualizar historial con entrada { estado, ts } — compatible con normalize() del panel
      if (status) {
        await sql`
          UPDATE orders
          SET historial = historial || ${JSON.stringify([{ estado: status, ts: new Date().toISOString() }])}::jsonb
          WHERE id = ${id};`;
      }

      const rows = await sql`
        UPDATE orders SET
          status        = COALESCE(${status},        status),
          pickup_date   = COALESCE(${pickup_date},   pickup_date),
          pickup_note   = COALESCE(${pickup_note},   pickup_note),
          importe_final = COALESCE(${importe_final != null ? Number(importe_final) : null}, importe_final),
          nota_interna  = COALESCE(${nota_interna},  nota_interna),
          customer      = COALESCE(${customer},      customer),
          phone         = COALESCE(${phone},         phone),
          email         = COALESCE(${email},         email),
          updated_at    = now()
        WHERE id = ${id}
        RETURNING *;`;

      if (!rows[0]) return res.status(404).json({ ok: false, error: 'pedido no encontrado' });
      return res.status(200).json({ ok: true, order: rows[0] });
    }

    return res.status(405).json({ ok: false, error: 'método no permitido' });
  } catch (err) {
    console.error('api/orders/[id] error:', err);
    return res.status(500).json({ ok: false, error: String(err.message || err) });
  }
}
