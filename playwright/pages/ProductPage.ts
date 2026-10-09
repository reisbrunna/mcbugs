import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly quantity: Locator;
  readonly increaseQuantityButton: Locator;
  readonly about: Locator;
  readonly ingredientsHeading: Locator;
  readonly ingredients: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantity = page.getByRole('status', { name: 'Quantidade' });
    this.increaseQuantityButton = page.getByRole('button', { name: 'Aumentar quantidade' });
    this.about = page.getByRole('heading', { name: 'Sobre' });
    this.ingredientsHeading = page.getByRole('heading', { name: 'Ingredientes' });
    this.ingredients = page.getByRole('list').getByRole('listitem');
  }

  image(name: string): Locator {
    return this.page.getByRole('img', { name, exact: true });
  }

  title(name: string): Locator {
    return this.page.getByRole('heading', { name, level: 1 });
  }

  price(formattedPrice: string): Locator {
    return this.page.getByText(formattedPrice, { exact: true });
  }

  description(excerpt: string): Locator {
    return this.page.getByText(excerpt);
  }

  addButton(formattedTotal: string): Locator {
    return this.page.getByRole('button', { name: `Quero • ${formattedTotal}` });
  }

  async increaseQuantity(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.increaseQuantityButton.click();
    }
  }

  async addToCart(formattedTotal: string): Promise<void> {
    await this.addButton(formattedTotal).click();
  }
}
