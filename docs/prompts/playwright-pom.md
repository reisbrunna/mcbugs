# Code Examples — Page Object Model (Playwright + TS)

Implementation reference for the prompt in `docs/playwright-pom.prompt.md`.

The decisions defined here are fixed: **pure PO** (actions + locators, assertions
in the `.spec`), **fixtures** for injection, and **testid as a documented
exception** according to the Escape Rule.

The examples use an **illustrative** domain (a fictional coffee shop). Copy the
structure — signatures, organization, and separation of responsibilities — but
never the screen names, locators, or data: those must come from analyzing the
actual application codebase.

## Folder Structure

```text
project/
├── e2e/                  # .spec.ts files (business narrative + assertions)
├── pages/                # one class per significant page/component
├── fixtures/
│   ├── pages.fixture.ts  # Page Object injection via test.extend
│   └── test-data.ts      # test data (nothing hardcoded)
└── playwright.config.ts  # baseURL, headed mode, etc.
```

## Page Object (Pure PO)

Declare `readonly` locators in the constructor; action methods should use
business-oriented verbs; no `expect()` inside the class.

The PO exposes public locators so the `.spec` can perform assertions.

```typescript
import { type Page, type Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly quantity: Locator;
  readonly increaseButton: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { level: 1 });
    // No stable accessible name; testid used as a documented exception (Escape Rule).
    // Gap reported to the team: add data-testid to the quantity control.
    this.quantity = page.getByTestId('quantity-value');
    this.increaseButton = page.getByTestId('quantity-increase');
    this.addButton = page.getByRole('button', { name: /Add • R\$/ });
  }

  async increaseQuantity(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.increaseButton.click();
    }
  }

  async confirm(): Promise<void> {
    await this.addButton.click();
  }
}
```

## Lists and Repeated Items

`.first()`, `.last()`, and `.nth()` remain forbidden — an index represents DOM
structure, not business intent.

To select an item among repeated elements such as a cart row, product card, or
table record, the correct pattern is to **scope by a parent locator** and filter
by content visible to the user.

This does not require `data-testid`: the target is the item's own
business-visible text.

```typescript
import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByRole('listitem');
  }

  /** Locator for the product row, allowing the .spec to assert visibility, quantity, etc. */
  itemFor(productName: string): Locator {
    return this.items.filter({ hasText: productName });
  }

  async removeItem(productName: string): Promise<void> {
    await this.itemFor(productName).getByRole('button', { name: 'Remove' }).click();
  }
}
```

In the `.spec`:

```typescript
await expect(cart.itemFor(products.doubleEspresso.name)).toBeVisible();
await cart.removeItem(products.doubleEspresso.name);
```

## Fixtures (PO Injection)

POs are injected through `test.extend`.

Never instantiate them with `new` inside the test.

```typescript
// fixtures/pages.fixture.ts
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MenuPage } from '../pages/MenuPage';
import { ProductPage } from '../pages/ProductPage';

type Pages = {
  home: HomePage;
  menu: MenuPage;
  product: ProductPage;
};

export const test = base.extend<Pages>({
  home: async ({ page }, use) => { await use(new HomePage(page)); },
  menu: async ({ page }, use) => { await use(new MenuPage(page)); },
  product: async ({ page }, use) => { await use(new ProductPage(page)); },
});

export { expect } from '@playwright/test';
```

## Test Data

```typescript
// fixtures/test-data.ts
export const products = {
  doubleEspresso: { name: 'Double Espresso' },
  cheeseBread: { name: 'Cheese Bread' },
} as const;

export const customer = {
  name: 'Ana Souza',
} as const;
```

## Test (.spec) — Narrative + Assertions

Locators must only be accessed through POs — zero inline locators, including
inside `expect`.

Assertions, including checkpoints, belong only here.

`test.step()` groups the business narrative and improves readability in the
HTML report.

```typescript
// e2e/order-journey.spec.ts
import { test, expect } from '../fixtures/pages.fixture';
import { products } from '../fixtures/test-data';

test.describe('CT001 — Journey: "Takeaway" Order', () => {
  test('should build the order and complete the payment', async ({ home, menu, product }) => {
    await test.step('Access the home page', async () => {
      await home.goto();
      await expect(home.heading).toBeVisible();
    });

    await test.step('Choose a product from the menu', async () => {
      await home.chooseTakeaway();
      await menu.openProduct(products.doubleEspresso.name);
      await expect(product.title).toHaveText(products.doubleEspresso.name);
    });

    await test.step('Adjust the quantity', async () => {
      await product.increaseQuantity(1);
      await expect(product.quantity).toHaveText('2');
      await product.confirm();
    });

    // ...continue the narrative, always following:
    // action in the PO, assertion in the spec
  });
});
```