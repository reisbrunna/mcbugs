import { type Kysely } from 'kysely';
import { type Database } from '../db/client';

export interface PersistedOrderItem {
  name: string;
  price: number;
  quantity: number;
  productId: string;
}

export interface PersistedOrder {
  id: number;
  customer_name: string;
  order_type: string;
  payment_method: string | null;
  status: string;
  total: number;
  items: PersistedOrderItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseItems(value: unknown, orderId: number): PersistedOrderItem[] {
  const parsed = typeof value === 'string' ? (JSON.parse(value) as unknown) : value;
  if (!Array.isArray(parsed)) {
    throw new Error(`Order ${orderId} items are not an array`);
  }

  return parsed.map((item, index) => {
    if (
      !isRecord(item) ||
      typeof item.name !== 'string' ||
      typeof item.price !== 'number' ||
      typeof item.quantity !== 'number' ||
      typeof item.productId !== 'string'
    ) {
      throw new Error(`Order ${orderId} has an invalid item at index ${index}`);
    }

    return {
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      productId: item.productId,
    };
  });
}

function parseTotal(value: string, orderId: number): number {
  const total = Number(value);
  if (!Number.isFinite(total)) {
    throw new Error(`Order ${orderId} has an invalid total`);
  }
  return total;
}

export async function fetchOrder(db: Kysely<Database>, orderId: number): Promise<PersistedOrder> {
  const row = await db.selectFrom('orders').where('id', '=', orderId).selectAll().executeTakeFirst();
  if (!row) {
    throw new Error(`Order ${orderId} not found in public.orders`);
  }

  return {
    id: row.id,
    customer_name: row.customer_name,
    order_type: row.order_type,
    payment_method: row.payment_method,
    status: row.status,
    total: parseTotal(row.total, orderId),
    items: parseItems(row.items, orderId),
  };
}
