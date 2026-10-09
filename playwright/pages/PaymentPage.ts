import { type Locator, type Page } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly orderNumber: Locator;
  readonly heading: Locator;
  readonly orderSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderNumber = page.getByText(/^#\d+$/);
    this.heading = page.getByRole('heading', { name: 'Escolha a forma de pagamento' });
    this.orderSummary = page.getByRole('group', { name: 'Total do pedido' });
  }

  total(formattedPrice: string): Locator {
    return this.orderSummary.getByText(formattedPrice, { exact: true });
  }

  method(name: string): Locator {
    return this.page.getByRole('button', { name });
  }

  async readOrderId(): Promise<number> {
    const text = (await this.orderNumber.textContent()) ?? '';
    const match = text.match(/^#(\d+)$/);
    if (!match?.[1]) {
      throw new Error(`Order number is missing or invalid: ${text || 'empty'}`);
    }
    return Number(match[1]);
  }

  async payWith(name: string): Promise<void> {
    await this.method(name).click();
  }
}
