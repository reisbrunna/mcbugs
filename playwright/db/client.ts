import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

export interface OrdersTable {
  id: number;
  customer_name: string;
  order_type: string;
  payment_method: string | null;
  status: string;
  total: string;
  items: unknown;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  orders: OrdersTable;
}

function sslConfig(connectionString: string): false | { rejectUnauthorized: false } {
  try {
    const url = new URL(connectionString);
    if (url.searchParams.get('sslmode') === 'disable') {
      return false;
    }
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return false;
    }
  } catch {
    // Connection strings that are not URLs still need TLS for a hosted database.
  }

  // Hosted Postgres (Supabase) presents a certificate chain Node does not trust by default.
  return { rejectUnauthorized: false };
}

export function createDb(): Kysely<Database> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set (see .env.local)');
  }

  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString,
        ssl: sslConfig(connectionString),
        max: 2,
        connectionTimeoutMillis: 10_000,
      }),
    }),
  });
}
