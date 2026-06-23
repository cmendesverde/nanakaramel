// Shared Neon SQL client — importado por las funciones serverless.
// Prefijo _ evita que Vercel lo exponga como endpoint.
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

// Estados del panel /admin (UI aprobada — fuente de verdad)
export const VALID_STATUS = ['nuevo','confirmado','pagado','elaboracion','listo','entregado','anulado'];

let tableReady = false;

export async function ensureTable() {
  if (tableReady) return;
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id            BIGSERIAL     PRIMARY KEY,
      ref           TEXT          UNIQUE,
      customer      TEXT,
      phone         TEXT,
      email         TEXT,
      items         JSONB         NOT NULL DEFAULT '[]',
      cake          JSONB,
      pickup_date   DATE,
      pickup_note   TEXT,
      total_units   INTEGER       NOT NULL DEFAULT 0,
      status        TEXT          NOT NULL DEFAULT 'nuevo'
                                  CHECK (status IN ('nuevo','confirmado','pagado','elaboracion','listo','entregado','anulado')),
      source        TEXT          NOT NULL DEFAULT 'web',
      message       TEXT,
      importe_final NUMERIC(10,2),
      nota_interna  TEXT,
      historial     JSONB         NOT NULL DEFAULT '[]',
      created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),
      updated_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
    );`;
  // Migraciones idempotentes (tabla existente sin estas columnas)
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS email         TEXT;`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS importe_final NUMERIC(10,2);`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS nota_interna  TEXT;`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS historial     JSONB NOT NULL DEFAULT '[]';`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMPTZ NOT NULL DEFAULT now();`;
  tableReady = true;
}
