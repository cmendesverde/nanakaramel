-- Nana Karamel — esquema canónico (Neon Postgres)
-- Estados: nuevo|confirmado|pagado|elaboracion|listo|entregado|anulado
-- (coinciden con los 7 estados del panel /admin)

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
);

-- Migraciones idempotentes (tabla ya existente sin estas columnas)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS email         TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS importe_final NUMERIC(10,2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS nota_interna  TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS historial     JSONB NOT NULL DEFAULT '[]';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMPTZ NOT NULL DEFAULT now();

-- Actualizar CHECK si la tabla existía con los estados anteriores
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE orders ADD  CONSTRAINT orders_status_check
  CHECK (status IN ('nuevo','confirmado','pagado','elaboracion','listo','entregado','anulado'));

-- Índices
CREATE INDEX IF NOT EXISTS orders_status_idx  ON orders (status);
CREATE INDEX IF NOT EXISTS orders_pickup_idx  ON orders (pickup_date);
CREATE INDEX IF NOT EXISTS orders_created_idx ON orders (created_at DESC);
