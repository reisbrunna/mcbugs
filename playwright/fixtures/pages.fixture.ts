/* Playwright fixture callbacks are named `use`; they are not React hooks. */
import { test as base } from '@playwright/test';
import { type Kysely } from 'kysely';
import { createDb, type Database } from '../db/client';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { MenuPage } from '../pages/MenuPage';
import { PaymentConfirmPage } from '../pages/PaymentConfirmPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ProductPage } from '../pages/ProductPage';

type Pages = {
  home: HomePage;
  menu: MenuPage;
  product: ProductPage;
  cart: CartPage;
  payment: PaymentPage;
  confirmation: PaymentConfirmPage;
};

type Workers = {
  db: Kysely<Database>;
};

export const test = base.extend<Pages, Workers>({
  db: [
    // Playwright requires a destructuring pattern for the fixture argument.
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const db = createDb();
      await use(db);
      await db.destroy();
    },
    { scope: 'worker' },
  ],
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  menu: async ({ page }, use) => {
    await use(new MenuPage(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  payment: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  confirmation: async ({ page }, use) => {
    await use(new PaymentConfirmPage(page));
  },
});

export { expect } from '@playwright/test';
