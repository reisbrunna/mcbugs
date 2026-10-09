import { categories as menuCategories, products as menuProducts } from '../../src/data/products';
import { formatPrice } from '../../src/utils/format';

export const customer = {
  name: 'João Silva',
} as const;

export const takeawayCustomer = {
  name: 'Maria Santos',
} as const;

export const routes = {
  home: '/',
  menu: '/menu',
  product: (id: string) => `/product/${id}`,
  cart: '/cart',
  payment: '/payment',
  paymentConfirm: (method: string) => `/payment/${method}/confirm`,
} as const;

export const storageKeys = {
  orderType: 'mcbugs-order-type',
  currentOrder: 'mcbugs-current-order',
  cartItems: 'mcbugs-cart-items',
} as const;

export const paymentMethods = {
  pix: { id: 'pix', label: 'PIX' },
  debit: { id: 'debit', label: 'Cartão de Débito' },
  credit: { id: 'credit', label: 'Cartão de Crédito' },
} as const;

export const orderTypes = {
  dineIn: { id: 'dine-in', label: 'Comer no local' },
  takeaway: { id: 'takeaway', label: 'Para levar' },
} as const;

export const copy = {
  waitMessage: 'Após o pagamento, aguarde ser chamado pelo número do seu pedido.',
} as const;

export interface ScenarioProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  lineLabel: string;
  descriptionExcerpt: string;
  ingredientCount: number;
}

export interface AdjustedProduct extends ScenarioProduct {
  updatedQuantity: number;
  updatedLineTotal: string;
  updatedLineLabel: string;
}

function categoryName(id: (typeof menuCategories)[number]['id']): string {
  const category = menuCategories.find((item) => item.id === id);
  if (!category) {
    throw new Error(`Unknown category: ${id}`);
  }
  return category.name;
}

function catalogProduct(id: string) {
  const product = menuProducts.find((item) => item.id === id);
  if (!product) {
    throw new Error(`Unknown product: ${id}`);
  }
  return product;
}

function cents(value: number): number {
  return Math.round(value * 100) / 100;
}

function descriptionExcerpt(description: string): string {
  const comma = description.indexOf(',');
  if (comma > 0) {
    return description.slice(0, comma);
  }
  return description.split(' ').slice(0, 3).join(' ');
}

function itemCountLabel(count: number): string {
  return `/ ${count} ${count === 1 ? 'item' : 'itens'}`;
}

function scenarioProduct(id: string, quantity: number): ScenarioProduct {
  const product = catalogProduct(id);
  const lineTotal = cents(product.price * quantity);
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity,
    unitPrice: formatPrice(product.price),
    lineTotal: formatPrice(lineTotal),
    lineLabel: `${quantity}x ${product.name}`,
    descriptionExcerpt: descriptionExcerpt(product.description),
    ingredientCount: product.ingredients?.length ?? 0,
  };
}

function withUpdatedQuantity(product: ScenarioProduct, updatedQuantity: number): AdjustedProduct {
  const lineTotal = cents(product.price * updatedQuantity);
  return {
    ...product,
    updatedQuantity,
    updatedLineTotal: formatPrice(lineTotal),
    updatedLineLabel: `${updatedQuantity}x ${product.name}`,
  };
}

function sum(values: number[]): number {
  return cents(values.reduce((total, value) => total + value, 0));
}

export function counterInstructions(methodLabel: string): string {
  return `Dirija-se ao balcão para efetuar o pagamento com ${methodLabel}`;
}

export const categories = menuCategories.map((category) => category.name);
export const friesCategory = categoryName('fritas');
export const drinksCategory = categoryName('bebidas');

export const friesMenu = menuProducts
  .filter((product) => product.category === 'fritas')
  .map((product) => product.name);

export const drinksMenu = menuProducts
  .filter((product) => product.category === 'bebidas')
  .map((product) => product.name);

export const products = {
  bigMock: scenarioProduct('big-mock', 2),
  cocaCrash: scenarioProduct('coca-crash', 1),
  batatasFullStack: withUpdatedQuantity(scenarioProduct('batatas-fullstack', 1), 2),
  fantaWarning: scenarioProduct('fanta-warning', 3),
};

const dineInTotal = sum([
  products.bigMock.price * products.bigMock.quantity,
  products.cocaCrash.price * products.cocaCrash.quantity,
]);

export const dineInOrder = {
  type: orderTypes.dineIn.id,
  typeLabel: orderTypes.dineIn.label,
  paymentMethod: paymentMethods.pix.id,
  status: 'pending',
  total: dineInTotal,
  totalLabel: formatPrice(dineInTotal),
  itemCountAfterBurger: itemCountLabel(products.bigMock.quantity),
  itemCountAfterDrink: itemCountLabel(products.bigMock.quantity + products.cocaCrash.quantity),
  instructions: counterInstructions(paymentMethods.pix.label),
} as const;

const takeawayTotal = sum([
  products.batatasFullStack.price * products.batatasFullStack.updatedQuantity,
  products.fantaWarning.price * products.fantaWarning.quantity,
]);

const takeawayCartBarTotal = sum([
  products.batatasFullStack.price * products.batatasFullStack.quantity,
  products.fantaWarning.price * products.fantaWarning.quantity,
]);

export const takeawayOrder = {
  type: orderTypes.takeaway.id,
  typeLabel: orderTypes.takeaway.label,
  paymentMethod: paymentMethods.credit.id,
  status: 'pending',
  itemCountAfterFries: itemCountLabel(products.batatasFullStack.quantity),
  cartBarTotal: formatPrice(takeawayCartBarTotal),
  cartBarItemCount: itemCountLabel(products.batatasFullStack.quantity + products.fantaWarning.quantity),
  total: takeawayTotal,
  totalLabel: formatPrice(takeawayTotal),
  instructions: counterInstructions(paymentMethods.credit.label),
} as const;
