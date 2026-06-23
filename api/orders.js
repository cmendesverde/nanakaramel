// GET  /api/orders  → lista de pedidos (panel /admin)
// POST /api/orders  → alta de pedido (web pública + alta manual del panel)
// PATCH / DELETE    → api/orders/[id].js
import { sql, ensureTable, VALID_STATUS } from './_lib/db.js';
import { requireAdmin }                   from './_lib/auth.js';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-admin-token');
}

// Normaliza el body del POST — acepta el formato de la web pública y del panel.
// Web pública:  { origen, estado, cliente:{nombre,telefono}, tarta, recogida:{fecha}, mensaje }
// Alta manual:  { nombre, telefono, tipo, fecha, hora, estado, … }
// Canónico API: { customer, phone, cake, pickup_date, status, message }
function parsePost(b) {
  const statusRaw = b.status || b.estado || 'nuevo';
  const status    = VALID_STATUS.includes(statusRaw) ? statusRaw : 'nuevo';

  const customer = b.customer || b.nombre || b.cliente?.nombre || null;
  const phone    = b.phone    || b.telefono || b.cliente?.telefono || null;
  const email    = b.email    || b.cliente?.email || null;
  const cake     = b.cake || b.tarta || null;

  const pickup_date = b.pickup_date || b.recogida?.fecha || b.fecha || null;
  const pickup_note = b.pickup_note
    || (b.recogida?.negociar ? 'a concretar por WhatsApp' : null)
    || (b.hora ? `hora aprox.: ${b.hora}` : null)
    || null;

  const items       = b.items || b.productos || [];
  const total_units = b.total_units != null
    ? Number(b.total_units)
    : items.reduce((s, i) => s + (i.qty || 1), 0);

  const source  = b.source || b.origen || 'web';
  const message = b.message || b.mensaje || null;

  return {
    ref: b.ref || ('NK-' + Date.now().toString(36).toUpperCase()),
    customer, phone, email,
    items: JSON.stringify(items),
    cake:  cake ? JSON.stringify(cake) : null,
    pickup_date, pickup_note, total_units, status, source, message,
    historial: JSON.stringify([{ estado: status, ts: new Date().toISOString() }]),
  };
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await ensureTable();

    if (req.method === 'GET') {
      if (!requireAdmin(req, res)) return;
      // Aliases para compatibilidad con normalize() del panel /admin sin tocar su código
      const rows = await sql`
        SELECT *,
          status      AS estado,
          customer    AS nombre,
          phone       AS telefono,
          pickup_date AS fecha
        FROM orders ORDER BY created_at DESC LIMIT 500;`;
      // Añade tipo (resumen de items) que el panel /admin muestra en tarjetas Kanban
      const enriched = rows.map(r => ({
        ...r,
        tipo: r.tipo || (Array.isArray(r.items) && r.items.length
          ? r.items.map(i => `${i.qty || 1}× ${i.name || i.id || '?'}`).join(', ')
          : ''),
      }));
      return res.status(200).json(enriched); // array plano: syncFromApi() lo espera así
    }

    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const p = parsePost(b);
      const rows = await sql`
        INSERT INTO orders
          (ref, customer, phone, email, items, cake, pickup_date, pickup_note,
           total_units, status, source, message, historial)
        VALUES (
          ${p.ref}, ${p.customer}, ${p.phone}, ${p.email},
          ${p.items}, ${p.cake},
          ${p.pickup_date}, ${p.pickup_note}, ${p.total_units},
          ${p.status}, ${p.source}, ${p.message},
          ${p.historial}
        )
        ON CONFLICT (ref) DO NOTHING
        RETURNING *;`;
      return res.status(201).json({ ok: true, order: rows[0] || null });
    }

    return res.status(405).json({ ok: false, error: 'método no permitido' });
  } catch (e) {
    console.error('api/orders error:', e);
    return res.status(500).json({ ok: false, error: String(e.message || e) });
  }
}
