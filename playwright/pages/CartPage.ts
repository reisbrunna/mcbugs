import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly items: Locator;
  readonly orderSummary: Locator;
  readonly orderTotalLabel: Locator;
  readonly completeOrder: Locator;
  readonly drawer: Locator;
  readonly drawerTitle: Locator;
  readonly customerName: Locator;
  readonly submitOrder: Locator;
  readonly sendingToKitchen: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Meu pedido' });
    this.items = page.getByRole('listitem');
    this.orderSummary = page.getByRole('group', { name: 'Total do pedido' });
    this.orderTotalLabel = this.orderSummary.getByText('Total do pedido');
    this.completeOrder = page.getByRole('button', { name: 'Finalizar pedido' });
    this.drawer = page.getByRole('dialog');
    this.drawerTitle = this.drawer.getByRole('heading', { name: 'Finalizar Pedido' });
    this.customerName = this.drawer.getByLabel('Seu nome');
    this.submitOrder = this.drawer.getByRole('button', { name: 'Finalizar', exact: true });
    this.sendingToKitchen = this.drawer.getByRole('heading', { name: 'enviando a cozinha....' });
  }

  itemFor(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  itemHeading(name: string): Locator {
    return this.itemFor(name).getByRole('heading', { name, exact: true });
  }

  lineTotal(name: string, formattedPrice: string): Locator {
    return this.itemFor(name).getByText(formattedPrice, { exact: true });
  }

  itemQuantity(name: string): Locator {
    return this.itemFor(name).getByRole('status', { name: 'Quantidade' });
  }

  orderTotal(formattedPrice: string): Locator {
    return this.orderSummary.getByText(formattedPrice, { exact: true });
  }

  async increaseItemQuantity(name: string): Promise<void> {
    await this.itemFor(name).getByRole('button', { name: 'Aumentar quantidade' }).click();
  }

  async startCheckout(): Promise<void> {
    await this.completeOrder.click();
  }

  async enterCustomerName(name: string): Promise<void> {
    await this.customerName.fill(name);
  }

  async confirmOrder(): Promise<void> {
    await this.submitOrder.click();
  }
}
