import { type Locator, type Page } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly cartBar: Locator;
  readonly cartTotalLabel: Locator;
  readonly viewOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBar = page.getByRole('region', { name: 'Total dos pedidos' });
    this.cartTotalLabel = this.cartBar.getByText('Total dos pedidos');
    this.viewOrder = this.cartBar.getByRole('button', { name: 'Ver pedido' });
  }

  category(name: string): Locator {
    return this.page.getByRole('button', { name });
  }

  productCard(name: string): Locator {
    return this.page.getByRole('button').filter({
      has: this.page.getByRole('heading', { name, exact: true, level: 3 }),
    });
  }

  total(formattedPrice: string): Locator {
    return this.cartBar.getByText(formattedPrice, { exact: true });
  }

  itemCount(label: string): Locator {
    return this.cartBar.getByText(label);
  }

  async selectCategory(name: string): Promise<void> {
    await this.category(name).click();
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).click();
  }

  async openCart(): Promise<void> {
    await this.viewOrder.click();
  }
}
