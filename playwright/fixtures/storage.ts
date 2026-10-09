import { type Page } from '@playwright/test';
import { storageKeys } from './test-data';

export interface CartSnapshotItem {
  id: string;
  quantity: number;
}

function parseJson(raw: string, key: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    throw new Error(`Invalid JSON in ${key}: ${message}`);
  }
}

function isCartSnapshotItem(value: unknown): value is { product: { id: string }; quantity: number } {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const item = value as { product?: { id?: unknown }; quantity?: unknown };
  return typeof item.product?.id === 'string' && typeof item.quantity === 'number';
}

export async function readStorage(page: Page, key: string): Promise<string | null> {
  return page.evaluate((storageKey) => localStorage.getItem(storageKey), key);
}

export async function readOrderType(page: Page): Promise<string | null> {
  return readStorage(page, storageKeys.orderType);
}

export async function readCurrentOrder(page: Page): Promise<string | null> {
  return readStorage(page, storageKeys.currentOrder);
}

export async function readCartItems(page: Page): Promise<CartSnapshotItem[]> {
  const raw = await readStorage(page, storageKeys.cartItems);
  if (raw === null) {
    return [];
  }

  const parsed = parseJson(raw, storageKeys.cartItems);
  if (!Array.isArray(parsed) || !parsed.every(isCartSnapshotItem)) {
    throw new Error(`${storageKeys.cartItems} does not contain a cart item list`);
  }

  return parsed.map((item) => ({ id: item.product.id, quantity: item.quantity }));
}
