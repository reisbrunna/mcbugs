import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly dineIn: Locator;
  readonly takeaway: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Seja bem-vindo!' });
    this.dineIn = page.getByRole('button', { name: 'Para comer aqui' });
    this.takeaway = page.getByRole('button', { name: 'Para levar' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async chooseDineIn(): Promise<void> {
    await this.dineIn.click();
  }

  async chooseTakeaway(): Promise<void> {
    await this.takeaway.click();
  }
}
