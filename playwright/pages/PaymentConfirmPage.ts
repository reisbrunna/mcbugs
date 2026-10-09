import { type Locator, type Page } from '@playwright/test';

export class PaymentConfirmPage {
  readonly page: Page;
  readonly orderSummary: Locator;
  readonly counterPayment: Locator;
  readonly orderDetails: Locator;
  readonly paymentMethodLabel: Locator;
  readonly createdAt: Locator;
  readonly newOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderSummary = page.getByRole('group', { name: 'Total do pedido' });
    this.counterPayment = page.getByRole('heading', { name: 'Pagamento no Balcão' });
    this.orderDetails = page.getByRole('heading', { name: 'Detalhes do pedido' });
    this.paymentMethodLabel = page.getByText('Forma de pagamento');
    this.createdAt = page.getByText(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}$/);
    this.newOrder = page.getByRole('button', { name: 'Fazer Novo Pedido' });
  }

  orderNumber(id: number): Locator {
    return this.page.getByText(`#${id}`, { exact: true });
  }

  total(formattedPrice: string): Locator {
    return this.orderSummary.getByText(formattedPrice, { exact: true });
  }

  instructions(value: string): Locator {
    return this.page.getByText(value);
  }

  customer(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  orderType(label: string): Locator {
    return this.page.getByText(label, { exact: true });
  }

  lineItem(label: string): Locator {
    return this.page.getByText(label, { exact: true });
  }

  waitMessage(value: string): Locator {
    return this.page.getByText(value, { exact: true });
  }

  async startNewOrder(): Promise<void> {
    await this.newOrder.click();
  }
}
